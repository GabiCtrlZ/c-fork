// cfork.cc
#include <node.h>
#include <stdio.h>
#include <sys/types.h>
#include <unistd.h>

namespace cfork
{
  using v8::FunctionCallbackInfo;
  using v8::Local;
  using v8::Object;
  using v8::Value;

  void Method(const FunctionCallbackInfo<Value> &args)
  {
    pid_t pid = fork();
    args.GetReturnValue().Set(pid);
  }

  void Initialize(Local<Object> exports)
  {
    NODE_SET_METHOD(exports, "fork", Method);
  }

  NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize)
}