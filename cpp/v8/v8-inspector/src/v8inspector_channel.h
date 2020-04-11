#pragma once
#include <v8-inspector.h>
#include <v8.h>

#include <functional>

class V8InspectorChannelImp final : public v8_inspector::V8Inspector::Channel {
 public:
  V8InspectorChannelImp(v8::Isolate* isolate, const std::function<void(std::string)>& onResponse);

  void sendResponse(int callId, std::unique_ptr<v8_inspector::StringBuffer> message) override;

  void sendNotification(std::unique_ptr<v8_inspector::StringBuffer> message) override;

  void flushProtocolNotifications() override;

 private:
  v8::Isolate* isolate_;
  std::function<void(std::string)> onResponse_;
};
