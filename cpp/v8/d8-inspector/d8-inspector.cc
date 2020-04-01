#include <include/v8.h>
using namespace v8;

enum { kInspectorClientIndex };

class InspectorFrontend final : public v8_inspector::V8Inspector::Channel {
 public:
  explicit InspectorFrontend(Local<Context> context) {
    isolate_ = context->GetIsolate();
    context_.Reset(isolate_, context);
  }
  ~InspectorFrontend() override = default;

 private:
  void sendResponse(int callId, std::unique_ptr<v8_inspector::StringBuffer> message) override { Send(message->string()); }
  void sendNotification(std::unique_ptr<v8_inspector::StringBuffer> message) override { Send(message->string()); }
  void flushProtocolNotifications() override {}

  void Send(const v8_inspector::StringView& string) {
    v8::Isolate::AllowJavascriptExecutionScope allow_script(isolate_);
    v8::HandleScope handle_scope(isolate_);
    int length = static_cast<int>(string.length());
    DCHECK_LT(length, v8::String::kMaxLength);
    Local<String> message = (string.is8Bit() ? v8::String::NewFromOneByte(isolate_, reinterpret_cast<const uint8_t*>(string.characters8()), v8::NewStringType::kNormal, length) : v8::String::NewFromTwoByte(isolate_, reinterpret_cast<const uint16_t*>(string.characters16()), v8::NewStringType::kNormal, length)).ToLocalChecked();
    Local<String> callback_name = v8::String::NewFromUtf8Literal(isolate_, "receive", NewStringType::kInternalized);
    Local<Context> context = context_.Get(isolate_);
    Local<Value> callback = context->Global()->Get(context, callback_name).ToLocalChecked();
    if (callback->IsFunction()) {
      v8::TryCatch try_catch(isolate_);
      Local<Value> args[] = {message};
      USE(Local<Function>::Cast(callback)->Call(context, Undefined(isolate_), 1, args));
      if (try_catch.HasCaught()) {
        Local<Object> exception = Local<Object>::Cast(try_catch.Exception());
        Local<String> key = v8::String::NewFromUtf8Literal(isolate_, "message", NewStringType::kInternalized);
        Local<String> expected = v8::String::NewFromUtf8Literal(isolate_, "Maximum call stack size exceeded");
        Local<Value> value = exception->Get(context, key).ToLocalChecked();
        DCHECK(value->StrictEquals(expected));
      }
    }
  }

  Isolate* isolate_;
  Global<Context> context_;
};

class InspectorClient : public v8_inspector::V8InspectorClient {
 public:
  InspectorClient(Local<Context> context, bool connect) {
    if (!connect)
      return;
    isolate_ = context->GetIsolate();
    channel_.reset(new InspectorFrontend(context));
    inspector_ = v8_inspector::V8Inspector::create(isolate_, this);
    session_ = inspector_->connect(1, channel_.get(), v8_inspector::StringView());
    context->SetAlignedPointerInEmbedderData(kInspectorClientIndex, this);
    inspector_->contextCreated(v8_inspector::V8ContextInfo(context, kContextGroupId, v8_inspector::StringView()));

    Local<Value> function = FunctionTemplate::New(isolate_, SendInspectorMessage)->GetFunction(context).ToLocalChecked();
    Local<String> function_name = String::NewFromUtf8Literal(isolate_, "send", NewStringType::kInternalized);
    CHECK(context->Global()->Set(context, function_name, function).FromJust());

    context_.Reset(isolate_, context);
  }

  void runMessageLoopOnPause(int contextGroupId) override {
    v8::Isolate::AllowJavascriptExecutionScope allow_script(isolate_);
    v8::HandleScope handle_scope(isolate_);
    Local<String> callback_name = v8::String::NewFromUtf8Literal(isolate_, "handleInspectorMessage", NewStringType::kInternalized);
    Local<Context> context = context_.Get(isolate_);
    Local<Value> callback = context->Global()->Get(context, callback_name).ToLocalChecked();
    if (!callback->IsFunction())
      return;

    v8::TryCatch try_catch(isolate_);
    try_catch.SetVerbose(true);
    is_paused = true;

    while (is_paused) {
      USE(Local<Function>::Cast(callback)->Call(context, Undefined(isolate_), 0, {}));
      if (try_catch.HasCaught()) {
        is_paused = false;
      }
    }
  }

  void quitMessageLoopOnPause() override { is_paused = false; }

 private:
  static v8_inspector::V8InspectorSession* GetSession(Local<Context> context) {
    InspectorClient* inspector_client = static_cast<InspectorClient*>(context->GetAlignedPointerFromEmbedderData(kInspectorClientIndex));
    return inspector_client->session_.get();
  }

  Local<Context> ensureDefaultContextInGroup(int group_id) override {
    DCHECK(isolate_);
    DCHECK_EQ(kContextGroupId, group_id);
    return context_.Get(isolate_);
  }

  static void SendInspectorMessage(const v8::FunctionCallbackInfo<v8::Value>& args) {
    Isolate* isolate = args.GetIsolate();
    v8::HandleScope handle_scope(isolate);
    Local<Context> context = isolate->GetCurrentContext();
    args.GetReturnValue().Set(Undefined(isolate));
    Local<String> message = args[0]->ToString(context).ToLocalChecked();
    v8_inspector::V8InspectorSession* session = InspectorClient::GetSession(context);
    int length = message->Length();
    std::unique_ptr<uint16_t[]> buffer(new uint16_t[length]);
    message->Write(isolate, buffer.get(), 0, length);
    v8_inspector::StringView message_view(buffer.get(), length);
    {
      v8::SealHandleScope seal_handle_scope(isolate);
      session->dispatchProtocolMessage(message_view);
    }
    args.GetReturnValue().Set(True(isolate));
  }

  static const int kContextGroupId = 1;

  std::unique_ptr<v8_inspector::V8Inspector> inspector_;
  std::unique_ptr<v8_inspector::V8InspectorSession> session_;
  std::unique_ptr<v8_inspector::V8Inspector::Channel> channel_;
  bool is_paused = false;
  Global<Context> context_;
  Isolate* isolate_;
};