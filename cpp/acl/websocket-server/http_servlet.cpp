#include "http_servlet.h"
#include "acl_cpp/http/websocket.hpp"

http_servlet::http_servlet() {}

http_servlet::~http_servlet(void) {}

bool http_servlet::doPing(acl::websocket& in, acl::websocket& out) {
  unsigned long long len = in.get_frame_payload_len();
  if (len == 0)
    return out.send_frame_pong((const void*)NULL, 0);

  out.reset().set_frame_fin(true).set_frame_opcode(acl::FRAME_PONG).set_frame_payload_len(len);

  char buf[8192];
  while (true) {
    int ret = in.read_frame_data(buf, sizeof(buf) - 1);
    if (ret == 0)
      break;
    if (ret < 0) {
      printf("read_frame_data error\r\n");
      return false;
    }

    buf[ret] = 0;
    printf("read: [%s]\r\n", buf);
    if (out.send_frame_data(buf, ret) == false) {
      printf("send_frame_data error\r\n");
      return false;
    }
  }

  return true;
}

bool http_servlet::doPong(acl::websocket& in, acl::websocket&) {
  unsigned long long len = in.get_frame_payload_len();
  if (len == 0)
    return true;

  char buf[8192];
  while (true) {
    int ret = in.read_frame_data(buf, sizeof(buf) - 1);
    if (ret == 0)
      break;
    if (ret < 0) {
      printf("read_frame_data error\r\n");
      return false;
    }

    buf[ret] = 0;
    printf("read: [%s]\r\n", buf);
  }

  return true;
}

bool http_servlet::doClose(acl::websocket&, acl::websocket&) {
  return false;
}

bool http_servlet::doMsg(acl::websocket& in, acl::websocket& out) {
  unsigned long long len = in.get_frame_payload_len();
  out.reset().set_frame_fin(true).set_frame_opcode(acl::FRAME_TEXT).set_frame_payload_len(len);

  char buf[8192];
  while (true) {
    int ret = in.read_frame_data(buf, sizeof(buf) - 1);
    if (ret == 0)
      break;
    if (ret < 0) {
      printf("read_frame_data error\r\n");
      return false;
    }

    buf[ret] = 0;
    printf("read: [%s]\r\n", buf);
    if (out.send_frame_data(buf, ret) == false) {
      printf("send_frame_data error\r\n");
      return false;
    }
  }

#if 1
  if (!sendBannder(out)) {
    return false;
  }
#endif

  sleep(1);
  char info[256];
  snprintf(info, sizeof(info), "hello world!\r\n");
  out.reset().set_frame_fin(true).set_frame_opcode(acl::FRAME_TEXT).set_frame_payload_len(strlen(info));
  if (out.send_frame_data(info, strlen(info)) == false) {
    printf("send_frame_data error\r\n");
    return false;
  }

  sleep(1);
  snprintf(info, sizeof(info), "hello zsx!\r\n");
  out.reset().set_frame_fin(true).set_frame_opcode(acl::FRAME_TEXT).set_frame_payload_len(strlen(info));
  if (out.send_frame_data(info, strlen(info)) == false) {
    printf("send_frame_data error\r\n");
    return false;
  }

  sleep(1);
  snprintf(info, sizeof(info), "GoodBye!\r\n");
  out.reset().set_frame_fin(true).set_frame_opcode(acl::FRAME_TEXT).set_frame_payload_len(strlen(info));
  if (out.send_frame_data(info, strlen(info)) == false) {
    printf("send_frame_data error\r\n");
    return false;
  }

  return true;
}

bool http_servlet::sendBannder(acl::websocket& out) {
  char banner[256];
  snprintf(banner, sizeof(banner), "Welcome!\r\n");

  for (int i = 0; i < 5; i++) {
    out.reset().set_frame_fin(true).set_frame_opcode(acl::FRAME_TEXT).set_frame_payload_len(strlen(banner));
    if (!out.send_frame_data(banner, strlen(banner))) {
      printf("send_frame_data error\r\n");
      return false;
    }
  }

  return true;
}

bool http_servlet::doWebSocket(acl::HttpServletRequest& req, acl::HttpServletResponse&) {
  acl::socket_stream& ss = req.getSocketStream();
  acl::websocket in(ss), out(ss);

  if (!sendBannder(out)) {
    return false;
  }

  while (true) {
    if (in.read_frame_head() == false) {
      printf("read_frame_head error\r\n");
      return false;
    }

    bool ret;
    unsigned char opcode = in.get_frame_opcode();

    printf("opcode: 0x%x\r\n", opcode);

    switch (opcode) {
      case acl::FRAME_PING:
        ret = doPing(in, out);
        break;
      case acl::FRAME_PONG:
        ret = doPong(in, out);
        break;
      case acl::FRAME_CLOSE:
        ret = doClose(in, out);
        break;
      case acl::FRAME_TEXT:
        ret = doMsg(in, out);
        break;
      case acl::FRAME_BINARY:
        ret = doMsg(in, out);
        break;
      case acl::FRAME_CONTINUATION:
        ret = false;
        break;
      default:
        printf(">>got invalid\r\n");
        ret = false;
        break;
    }

    if (ret == false)
      return false;
  }

  // XXX: NOT REACHED
  return false;
}
