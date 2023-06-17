#include <napi.h>

static Napi::Object Method(const Napi::CallbackInfo &info)
{
  // Napi::Env is the opaque data structure containing the environment in which the request is being run.
  // We will need this env when we want to create any new objects inside of the node.js environment
  Napi::Env env = info.Env();

  // Create a C++ level variable
  // std::string helloWorld = "{\"name\":\"alex\", age: 23}";

  /*
  {
    "status": "success",
    "data": ""
  }
  */

  Napi::Object obj = Napi::Object::New(env);
  obj["status"] = Napi::String::New(env, "success");
  obj["data"] = Napi::String::New(env, "");

  // Return a new javascript string that we copy-construct inside of the node.js environment
  // return Napi::String::New(env, helloWorld);
  return obj;
}

static Napi::Object Init(Napi::Env env, Napi::Object exports)
{
  exports.Set(Napi::String::New(env, "hello"),
              Napi::Function::New(env, Method));
  return exports;
}

NODE_API_MODULE(hello, Init)
