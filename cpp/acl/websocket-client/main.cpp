// https://github.com/acl-dev/acl/blob/v3.5.1/lib_acl_cpp/samples/aio/websocket/main.cpp
#include "acl_cpp/lib_acl.hpp"

static acl::atomic_long __aio_refer = 0;

class websocket_client : public acl::http_aclient {
 public:
  websocket_client(acl::aio_handle& handle) : http_aclient(handle) { ++__aio_refer; }

  ~websocket_client(void) {
    printf("delete websocket_client!\r\n");
    if (--__aio_refer == 0) {
      printf("%s: stop aio engine now!\r\n", __FUNCTION__);
      handle_.stop();
    }
  }

 protected:
  // @override
  void destroy(void) {
    printf("%s(%d): websocket_client will be deleted!\r\n", __FUNCTION__, __LINE__);
    fflush(stdout);

    delete this;
  }

  // @override
  bool on_connect(void) {
    printf("--------------- connect server ok ------------\r\n");
    printf(">>> begin ws_handshake\r\n");
    fflush(stdout);

    this->ws_handshake();
    return true;
  }

  // @override
  void ws_handshake_before(acl::http_header& reqhdr) {
    acl::string buf;
    reqhdr.build_request(buf);
    printf("---------------websocket request header---------\r\n");
    printf("[%s]\r\n", buf.c_str());
    fflush(stdout);
  }

  // @override
  void on_disconnect(void) {
    printf("%s(%d): disconnect from server\r\n", __FUNCTION__, __LINE__);
    fflush(stdout);
  }

  // @override
  void on_ns_failed(void) {
    printf("dns lookup failed\r\n");
    fflush(stdout);
  }

  // @override
  void on_connect_timeout(void) {
    printf("connect timeout\r\n");
    fflush(stdout);
  }

  // @override
  void on_connect_failed(void) {
    printf("connect failed\r\n");
    fflush(stdout);
  }

  // @override
  bool on_read_timeout(void) {
    printf("read timeout\r\n");
    return true;
  }

 protected:
  // @override
  bool on_http_res_hdr(const acl::http_header& header) {
    acl::string buf;
    header.build_response(buf);

    printf("-----------%s: response header----\r\n", __FUNCTION__);
    printf("[%s]\r\n", buf.c_str());
    fflush(stdout);

    return true;
  }

 protected:
  // @override
  bool on_ws_handshake(void) {
    printf(">>> websocket handshake ok\r\n");
    fflush(stdout);

    char buf[128];
    snprintf(buf, sizeof(buf), "hello, myname is jg\r\n");
    size_t len = strlen(buf);

    if (!this->ws_send_text(buf, len)) {
      return false;
    }

    // 开始进入 websocket 异步读过程
    this->ws_read_wait(5);
    return true;
  }

  // @override
  void on_ws_handshake_failed(int status) {
    printf(">>> websocket handshake failed, status=%d\r\n", status);
    fflush(stdout);
  }

  // @override
  bool on_ws_frame_text(void) {
    printf(">>> got frame text type\r\n");
    fflush(stdout);
    return true;
  }

  // @override
  bool on_ws_frame_binary(void) {
    printf(">>> got frame binaray type\r\n");
    fflush(stdout);
    return true;
  }

  // @override
  void on_ws_frame_closed(void) {
    printf(">>> got frame closed type\r\n");
    fflush(stdout);
  }

  // @override
  bool on_ws_frame_data(char* data, size_t dlen) {
    acl::string buf;
    buf.copy(data, dlen);
    printf("%s", buf.c_str());
    fflush(stdout);

    //(void) write(1, data, dlen);
    return true;
  }

  // @override
  bool on_ws_frame_finish(void) {
    printf(">>> frame finish\r\n");
    fflush(stdout);
    return true;
  }

};

int main(int argc, char* argv[]) {
  int ch, conn_timeout = 5, rw_timeout = 5;
  acl::string host("127.0.0.1:7777");

	// 初始化和打开 log
  acl::acl_cpp_init();
  acl::log::stdout_open(true);

  // 定义 AIO 事件引擎
  acl::aio_handle handle(acl::ENGINE_KERNEL);

  // 开始异步连接远程 WEB 服务器
  websocket_client* conn = new websocket_client(handle);
  if (!conn->open(host, conn_timeout, rw_timeout)) {
    printf("connect %s error\r\n", host.c_str());
    fflush(stdout);

    delete conn;
    return 1;
  }

  conn->unzip_body(true);       // 针对 HTTP 自动解压

  // 设置 HTTP 请求头，也可将此过程放在 conn->on_connect() 里
  acl::http_header& head = conn->request_header();
  head.set_url("/").set_content_length(0).set_host(host).accept_gzip(true).set_keep_alive(true);

  acl::string buf;
  head.build_request(buf);
  printf("---------------request header-----------------\r\n");
  printf("[%s]\r\n", buf.c_str());
  fflush(stdout);

  // 开始 AIO 事件循环过程
  while (true) {
    // 如果返回 false 则表示不再继续，需要退出
    auto b = handle.check();
    printf("%d\n", handle.last_nready());
    printf(b ? "true\n" : "false\n");
    if (!b) {
      break;
    }
  }

  return 0;
}
