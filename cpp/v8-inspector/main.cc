#include <include/libplatform/libplatform.h>
#include <include/v8.h>
#include <src/debug/debug-interface.h>

#include "d8-inspector.cc"
#include "util.cc"

using namespace std;
using namespace v8;

void Log(const v8::FunctionCallbackInfo<v8::Value>& args) {
  if (args.Length() < 1)
    return;
  v8::Isolate* isolate = args.GetIsolate();
  v8::HandleScope scope(isolate);
  v8::Local<v8::Value> arg = args[0];
  v8::String::Utf8Value value(isolate, arg);
  printf("vconsoe.log: %s\n", *value);
  args.GetReturnValue().SetUndefined();
}

void Version(const v8::FunctionCallbackInfo<v8::Value>& args) {
  args.GetReturnValue().Set(v8::String::NewFromUtf8(args.GetIsolate(), v8::V8::GetVersion()).ToLocalChecked());
}

v8::Local<v8::Context> CreateContext(v8::Isolate* isolate) {
  // Create a template for the global object.
  v8::Local<v8::ObjectTemplate> global = v8::ObjectTemplate::New(isolate);

  v8::Local<v8::ObjectTemplate> Console = v8::ObjectTemplate::New(isolate);
  Console->Set(v8::String::NewFromUtf8Literal(isolate, "log"), v8::FunctionTemplate::New(isolate, Log));

  global->Set(v8::String::NewFromUtf8Literal(isolate, "version"), v8::FunctionTemplate::New(isolate, Version));
  global->Set(v8::String::NewFromUtf8Literal(isolate, "vconsole"), Console);
  return v8::Context::New(isolate, NULL, global);
}

// Process remaining command line arguments and execute files
int RunMain(v8::Isolate* isolate, v8::Platform* platform, string& str) {
  v8::Local<v8::String> file_name = v8::String::NewFromUtf8(isolate, str.c_str()).ToLocalChecked();
  v8::Local<v8::String> source;
  if (!ReadFile(isolate, str.c_str()).ToLocal(&source)) {
    fprintf(stderr, "Error reading '%s'\n", str.c_str());
    return 1;
  }
  bool success = ExecuteString(isolate, source, file_name, false, true);
  while (v8::platform::PumpMessageLoop(platform, isolate))
    continue;
  if (!success) {
    return 1;
  }
  return 0;
}

class Console : public debug::ConsoleDelegate {
 public:
  Console(Isolate* isolate) : isolate_(isolate) {}

 private:
  void Log(const debug::ConsoleCallArguments& args, const v8::debug::ConsoleContext&) {
    Local<String> str_obj;
    if (!args[0]->ToString(isolate_->GetCurrentContext()).ToLocal(&str_obj)) {
      return;
    }
    v8::String::Utf8Value str(isolate_, str_obj);
    printf("Console.log: %s\n", *str);
  };
  Isolate* isolate_;
};

int main(int argc, char* argv[]) {
  v8::V8::InitializeICUDefaultLocation(argv[0]);
  v8::V8::InitializeExternalStartupData(argv[0]);
  std::unique_ptr<v8::Platform> platform = v8::platform::NewDefaultPlatform();
  v8::V8::InitializePlatform(platform.get());
  v8::V8::Initialize();

  v8::Isolate::CreateParams create_params;
  create_params.array_buffer_allocator = v8::ArrayBuffer::Allocator::NewDefaultAllocator();
  v8::Isolate* isolate = v8::Isolate::New(create_params);


  int result;
  {
    v8::Isolate::Scope isolate_scope(isolate);
    v8::HandleScope handle_scope(isolate);
    // 生成 global 对象, 并挂在全局作用域
    v8::Local<v8::Context> context = CreateContext(isolate);
    // 接入 Inspector
    InspectorClient inspector_client(context, true);
    // 自定义 console, 一定要写到接入 Inspector 后面...
    Console console = Console(isolate);
    v8::debug::SetConsoleDelegate(isolate, &console);
    if (context.IsEmpty()) {
      fprintf(stderr, "Error creating context\n");
      return 1;
    }
    v8::Context::Scope context_scope(context);
    string str = "inspector.js";
    result = RunMain(isolate, platform.get(), str);
  }
  isolate->Dispose();
  v8::V8::Dispose();
  v8::V8::ShutdownPlatform();
  delete create_params.array_buffer_allocator;
  return result;
}