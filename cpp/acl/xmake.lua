add_cxxflags("--debug")
set_kind("binary")
target("template")
	add_files("websocket.cpp") 