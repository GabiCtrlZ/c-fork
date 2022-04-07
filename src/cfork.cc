// cfork.cc
#include <node.h>
#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <signal.h>

namespace cfork
{
  using v8::Exception;
  using v8::FunctionCallbackInfo;
  using v8::Isolate;
  using v8::Local;
  using v8::Number;
  using v8::Object;
  using v8::String;
  using v8::Value;

  void Fork(const v8::FunctionCallbackInfo<v8::Value> &args)
  {
    v8::Isolate *isolate = args.GetIsolate();
    pid_t pid = fork();
    auto pidVal = v8::Number::New(isolate, pid);
    args.GetReturnValue().Set(pidVal);
  }

  void IsRunning(const v8::FunctionCallbackInfo<v8::Value> &args)
  {
    v8::Isolate *isolate = args.GetIsolate();

    double value = args[0].As<Number>()->Value();
    int val = (int)value;
    pid_t pid = (pid_t)val;

    int status;
    pid_t result = waitpid(pid, &status, WNOHANG);
    auto resultVal = v8::Number::New(isolate, result);
    args.GetReturnValue().Set(resultVal);
  }

    void Kill(const v8::FunctionCallbackInfo<v8::Value> &args)
  {
    v8::Isolate *isolate = args.GetIsolate();

    double value = args[0].As<Number>()->Value();
    int val = (int)value;
    pid_t pid = (pid_t)val;

    int result = kill(pid, SIGKILL);
    auto resultVal = v8::Number::New(isolate, result);
    args.GetReturnValue().Set(resultVal);
  }

  void Exit(const v8::FunctionCallbackInfo<v8::Value> &args)
  {
    exit(0);
  }

  void Initialize(cfork::Local<cfork::Object> exports)
  {
    NODE_SET_METHOD(exports, "fork", cfork::Fork);
    NODE_SET_METHOD(exports, "isRunning", cfork::IsRunning);
    NODE_SET_METHOD(exports, "kill", cfork::Kill);
    NODE_SET_METHOD(exports, "exit", cfork::Exit);
  }

  NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize)
}