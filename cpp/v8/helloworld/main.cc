// Copyright 2015 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "libplatform/libplatform.h"
#include "v8.h"

// using namespace v8;

int main(int argc, char* argv[]) {
  // 初始化 V8
  v8::V8::InitializeICUDefaultLocation(argv[0]);
  v8::V8::InitializeExternalStartupData(argv[0]);
  std::unique_ptr<v8::Platform> platform = v8::platform::NewDefaultPlatform();
  v8::V8::InitializePlatform(platform.get());
  v8::V8::Initialize();

  // 创建一个新的个隔离区(isolate), 并将这个隔离区设置为当前使用
  v8::Isolate::CreateParams create_params;
  create_params.array_buffer_allocator = v8::ArrayBuffer::Allocator::NewDefaultAllocator();
  v8::Isolate* isolate = v8::Isolate::New(create_params);
  // 以下是在隔离区的一系列操作
  {
    // 进入当前隔离区
    v8::Isolate::Scope isolate_scope(isolate);
    // 创建一个 HandleScope
    v8::HandleScope handle_scope(isolate);
    // 创建一个 context
    v8::Local<v8::Context> context = v8::Context::New(isolate);
    // 进入 context
    v8::Context::Scope context_scope(context);
    // 在上下文编译和运行脚本
    {
      // 创建一个包含 JS 源码的 String
      v8::Local<v8::String> source = v8::String::NewFromUtf8(isolate, "'Hello' + ', World!'", v8::NewStringType::kNormal).ToLocalChecked();
      // 编译源码
      v8::Local<v8::Script> script = v8::Script::Compile(context, source).ToLocalChecked();
      // 运行源码并得到结果
      v8::Local<v8::Value> result = script->Run(context).ToLocalChecked();
      // 将结果转换成 UTF8
      v8::String::Utf8Value utf8(isolate, result);
      // 打印
      printf("%s\n", *utf8);
    }
  }
  // 销毁 isolate 以及使用过的 buffer, 关掉 V8 进程
  isolate->Dispose();
  v8::V8::Dispose();
  v8::V8::ShutdownPlatform();
  delete create_params.array_buffer_allocator;
  return 0;
}