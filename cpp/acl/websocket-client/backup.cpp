#include "acl_cpp/lib_acl.hpp"
#include "lib_acl.h"

static bool handshake(acl::socket_stream& conn) {
  acl::http_request req(&conn);
  acl::http_header& hdr = req.request_header();
  hdr.set_ws_key("123456789").set_ws_version(13).set_upgrade("websocket").set_keep_alive(true);

  if (!req.request(NULL, 0)) {
    printf("request error\r\n");
    return false;
  }

  int status = req.http_status();
  if (status != 101) {
    printf("invalid http status: %d\r\n", status);
    return false;
  }

  return true;
}

static bool send_message(acl::websocket& ws) {

  acl::string buf;

  unsigned mask = ~0;
  ws.set_frame_fin(true).set_frame_opcode(acl::FRAME_TEXT).set_frame_payload_len(buf.size()).set_frame_masking_key(mask);

  if (!ws.send_frame_data(buf, buf.size())) {
    printf("send filenam error %s\r\n", acl::last_serror());
    return false;
  }

  ws.reset().set_frame_fin(true).set_frame_opcode(acl::FRAME_TEXT).set_frame_payload_len(buf.size());
  if (!ws.send_frame_data(buf, buf.size())) {
    printf("send file size error %s\r\n", acl::last_serror());
    return false;
  }

  
  return true;
}

static bool read_reply(acl::websocket& ws) {
  if (!ws.read_frame_head()) {
    printf("read_frame_head error %s\r\n", acl::last_serror());
    return false;
  }

  char cbuf[1024];
  unsigned char opcode = ws.get_frame_opcode();
  switch (opcode) {
    case acl::FRAME_TEXT:
    case acl::FRAME_BINARY:
      break;
    default:
      printf("invalid opcode: 0x%x\r\n", opcode);
      return false;
  }

  int ret = ws.read_frame_data(cbuf, sizeof(cbuf) - 1);
  if (ret <= 0) {
    printf("read_frame_data error\r\n");
    return false;
  }
  cbuf[ret] = 0;
  printf("reply from server: %s, len: %d\r\n", cbuf, ret);

  return true;
}

static bool upload(const char* addr) {
  acl::socket_stream conn;
  if (!conn.open(addr, 30, 30)) {
    printf("connect %s error %s\r\n", addr, acl::last_serror());
    return false;
  }

  if (!handshake(conn)) {
    return false;
  }

  acl::websocket ws(conn);

  if (!send_message(ws)) {
    return false;
  }

  if (!read_reply(ws)) {
    return false;
  }
  return true;
}

int main(int argc, char* argv[]) {
  // 初始化 acl
  acl::acl_cpp_init();
  acl::log::stdout_open(true);  // 日志输出至标准输出
	acl::string addr = "127.0.0.1:7777";

  upload(addr);
  return 0;
}
