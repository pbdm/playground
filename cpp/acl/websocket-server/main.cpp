// https://github.com/acl-dev/acl/tree/master/lib_acl_cpp/samples/websocket/demo
#include "acl_cpp/lib_acl.hpp"
#include "lib_acl.h"
#include "master_service.h"

int main(int argc, char* argv[]) {
  // 初始化 acl 库
  acl::acl_cpp_init();

  master_service& ms = acl::singleton2<master_service>::get_instance();

  // 开始运行

  acl::log::stdout_open(true);  // 日志输出至标准输出
  const char* conf = NULL;
  const char* addr = "127.0.0.1:8885";
  printf("listen on: %s\r\n", addr);
  ms.run_alone(addr, conf, 0, 1000);  // 单独运行方式
  printf("Enter any key to exit now\r\n");
  getchar();

  // ms.run_daemon(argc, argv);  // acl_master 控制模式运行

  return 0;
}
