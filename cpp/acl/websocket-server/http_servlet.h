#include "acl_cpp/lib_acl.hpp"
#include "lib_acl.h"

class http_servlet : public acl::HttpServlet {
 public:
  http_servlet();
  ~http_servlet();

  acl::session& get_session() const { return *session_; }

 protected:

  // @override
  bool doWebSocket(acl::HttpServletRequest&, acl::HttpServletResponse&);

 private:
  acl::session* session_;

  bool doPing(acl::websocket&, acl::websocket&);
  bool doPong(acl::websocket&, acl::websocket&);
  bool doClose(acl::websocket&, acl::websocket&);
  bool doMsg(acl::websocket&, acl::websocket&);
  bool sendBannder(acl::websocket&);
};