// 直接在 全局对象上挂函数
// 调用 JS 的函数
// 通过 SetConsoleDelegate 方法实现 console
#include <include/libplatform/libplatform.h>
#include <include/v8.h>
#include <src/debug/debug-interface.h>
#include <src/d8/d8.h>

using namespace std;
using namespace v8;

// Extracts a C string from a V8 Utf8Value.
const char* ToCString(const v8::String::Utf8Value& value) {
  return *value ? *value : "<string conversion failed>";
}

// Reads a file into a v8 string.
v8::MaybeLocal<v8::String> ReadFile(v8::Isolate* isolate, const char* name) {
  FILE* file = fopen(name, "rb");
  if (file == NULL)
    return v8::MaybeLocal<v8::String>();

  fseek(file, 0, SEEK_END);
  size_t size = ftell(file);
  rewind(file);

  char* chars = new char[size + 1];
  chars[size] = '\0';
  for (size_t i = 0; i < size;) {
    i += fread(&chars[i], 1, size - i, file);
    if (ferror(file)) {
      fclose(file);
      return v8::MaybeLocal<v8::String>();
    }
  }
  fclose(file);
  v8::MaybeLocal<v8::String> result = v8::String::NewFromUtf8(isolate, chars, v8::NewStringType::kNormal, static_cast<int>(size));
  delete[] chars;
  return result;
}

void ReportException(v8::Isolate* isolate, v8::TryCatch* try_catch) {
  v8::HandleScope handle_scope(isolate);
  v8::String::Utf8Value exception(isolate, try_catch->Exception());
  const char* exception_string = ToCString(exception);
  v8::Local<v8::Message> message = try_catch->Message();
  if (message.IsEmpty()) {
    // V8 didn't provide any extra information about this error; just
    // print the exception.
    fprintf(stderr, "%s\n", exception_string);
  } else {
    // Print (filename):(line number): (message).
    v8::String::Utf8Value filename(isolate, message->GetScriptOrigin().ResourceName());
    v8::Local<v8::Context> context(isolate->GetCurrentContext());
    const char* filename_string = ToCString(filename);
    int linenum = message->GetLineNumber(context).FromJust();
    fprintf(stderr, "%s:%i: %s\n", filename_string, linenum, exception_string);
    // Print line of source code.
    v8::String::Utf8Value sourceline(isolate, message->GetSourceLine(context).ToLocalChecked());
    const char* sourceline_string = ToCString(sourceline);
    fprintf(stderr, "%s\n", sourceline_string);
    // Print wavy underline (GetUnderline is deprecated).
    int start = message->GetStartColumn(context).FromJust();
    for (int i = 0; i < start; i++) {
      fprintf(stderr, " ");
    }
    int end = message->GetEndColumn(context).FromJust();
    for (int i = start; i < end; i++) {
      fprintf(stderr, "^");
    }
    fprintf(stderr, "\n");
    v8::Local<v8::Value> stack_trace_string;
    if (try_catch->StackTrace(context).ToLocal(&stack_trace_string) && stack_trace_string->IsString() && v8::Local<v8::String>::Cast(stack_trace_string)->Length() > 0) {
      v8::String::Utf8Value stack_trace(isolate, stack_trace_string);
      const char* stack_trace_string = ToCString(stack_trace);
      fprintf(stderr, "%s\n", stack_trace_string);
    }
  }
}

// Executes a string within the current v8 context.
bool ExecuteString(v8::Isolate* isolate, v8::Local<v8::String> source, v8::Local<v8::Value> name, bool print_result, bool report_exceptions) {
  v8::HandleScope handle_scope(isolate);
  v8::TryCatch try_catch(isolate);
  v8::ScriptOrigin origin(name);
  v8::Local<v8::Context> context(isolate->GetCurrentContext());
  v8::Local<v8::Script> script;
  if (!v8::Script::Compile(context, source, &origin).ToLocal(&script)) {
    // Print errors that happened during compilation.
    if (report_exceptions)
      ReportException(isolate, &try_catch);
    return false;
  } else {
    v8::Local<v8::Value> result;
    if (!script->Run(context).ToLocal(&result)) {
      assert(try_catch.HasCaught());
      // Print errors that happened during execution.
      if (report_exceptions)
        ReportException(isolate, &try_catch);
      return false;
    } else {
      assert(!try_catch.HasCaught());
      if (print_result && !result->IsUndefined()) {
        // If all went well and the result wasn't undefined then print
        // the returned value.
        v8::String::Utf8Value str(isolate, result);
        const char* cstr = ToCString(str);
        printf("%s\n", cstr);
      }
      return true;
    }
  }
}

void Log(const v8::FunctionCallbackInfo<v8::Value>& args) {
  if (args.Length() < 1)
    return;
  v8::Isolate* isolate = args.GetIsolate();
  v8::Local<v8::Value> arg = args[0];
  v8::String::Utf8Value value(isolate, arg);
  printf("vconsoe.log: %s\n", *value);
  args.GetReturnValue().SetUndefined();
}

void Call(const v8::FunctionCallbackInfo<v8::Value>& args) {
  if (args.Length() < 1)
    return;
  v8::Isolate* isolate = args.GetIsolate();
  Local<Context> context = isolate->GetCurrentContext();
  v8::String::Utf8Value value(isolate, args[0]);

  // call vReceive with arg
  Local<String> callback_name = v8::String::NewFromUtf8Literal(isolate, "vReceive", NewStringType::kInternalized);
  Local<Value> callback = context->Global()->Get(context, callback_name).ToLocalChecked();
  if (callback->IsFunction()) {
    Local<String> message = v8::String::NewFromUtf8(isolate, *value).ToLocalChecked();
    Local<Value> arg[] = {message};
    MaybeLocal<v8::Value> a = Local<Function>::Cast(callback)->Call(context, Undefined(isolate), 1, arg);
    // 这个 warning 是因为函数没有返回值没 lint 了
    // Local<Function>::Cast(callback)->Call(context, Undefined(isolate), 1, arg);
    // 或者用 V8 里的这个宏解决
    // USE(Local<Function>::Cast(callback)->Call(context, Undefined(isolate), 1, arg));
  }
}

void Version(const v8::FunctionCallbackInfo<v8::Value>& args) {
  args.GetReturnValue().Set(v8::String::NewFromUtf8(args.GetIsolate(), v8::V8::GetVersion()).ToLocalChecked());
}

v8::Local<v8::Context> CreateContext(v8::Isolate* isolate) {
  // Create a template for the global object.
  v8::Local<v8::ObjectTemplate> global = v8::ObjectTemplate::New(isolate);

  // version
  global->Set(v8::String::NewFromUtf8Literal(isolate, "version"), v8::FunctionTemplate::New(isolate, Version));

  // vconsole
  v8::Local<v8::ObjectTemplate> Console = v8::ObjectTemplate::New(isolate);
  global->Set(v8::String::NewFromUtf8Literal(isolate, "vconsole"), Console);
  Console->Set(v8::String::NewFromUtf8Literal(isolate, "log"), v8::FunctionTemplate::New(isolate, Log));

  // vcall
  global->Set(v8::String::NewFromUtf8Literal(isolate, "vCall"), v8::FunctionTemplate::New(isolate, Call));

  return v8::Context::New(isolate, NULL, global);
}

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
    // 自定义 console
    Console console = Console(isolate);
    // TODO 貌似这里也可以用 D8 里的 console 来代替, 但是貌似要引入一些头文件
    // v8::D8Console console(isolate);
    v8::debug::SetConsoleDelegate(isolate, &console);
    if (context.IsEmpty()) {
      fprintf(stderr, "Error creating context\n");
      return 1;
    }
    v8::Context::Scope context_scope(context);
    string str = "custom.js";
    result = RunMain(isolate, platform.get(), str);
  }
  isolate->Dispose();
  v8::V8::Dispose();
  v8::V8::ShutdownPlatform();
  delete create_params.array_buffer_allocator;
  return result;
}