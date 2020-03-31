#include <include/v8.h>

void Log(const v8::FunctionCallbackInfo<v8::Value>& args) {
  if (args.Length() < 1)
    return;
  v8::Isolate* isolate = args.GetIsolate();
  v8::HandleScope scope(isolate);
  v8::Local<v8::Value> arg = args[0];
  v8::String::Utf8Value value(isolate, arg);
  printf("Logged: %s\n", *value);
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