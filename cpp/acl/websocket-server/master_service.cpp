#include "master_service.h"

#include "http_servlet.h"

master_service::master_service() {}

master_service::~master_service() {}

bool master_service::thread_on_read(acl::socket_stream* conn) {
  // logger("read from %s", conn->get_peer(true));
  http_servlet* servlet = (http_servlet*)conn->get_ctx();
  if (servlet == NULL)
    logger_fatal("servlet null!");

  acl::session& session = servlet->get_session();
  while (true) {
    bool ret = servlet->doRun(session, conn);
    if (ret == false)
      return false;
    return true;
  }
}

bool master_service::thread_on_accept(acl::socket_stream* conn) {
  logger("connect from %s, fd: %d", conn->get_peer(true), conn->sock_handle());
  conn->set_rw_timeout(0);
  conn->set_tcp_non_blocking(false);

  // 使用 redis 集群来存储 session
  http_servlet* servlet = new http_servlet();
  conn->set_ctx(servlet);

  return true;
}

bool master_service::thread_on_timeout(acl::socket_stream* conn) {
  logger("read timeout from %s, fd: %d", conn->get_peer(), conn->sock_handle());
  return false;
}

void master_service::thread_on_close(acl::socket_stream* conn) {
  logger("disconnect from %s, fd: %d", conn->get_peer(true), conn->sock_handle());

  http_servlet* servlet = (http_servlet*)conn->get_ctx();
  if (servlet)
    delete servlet;
}

bool master_service::proc_exit_timer(size_t nclients, size_t nthreads) {
  if (nclients == 0 || nthreads == 0) {
    logger("clients count: %d, threads count: %d", (int)nclients, (int)nthreads);
    return true;
  }

  return false;
}
