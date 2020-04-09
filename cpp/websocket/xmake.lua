add_cxxflags("--debug")
set_kind("binary")
set_languages("c++17")
add_includedirs("/Users/bopeng/c/include")
target("client")
	add_files("client.cc") 
target("server-sync")
	add_files("server-sync.cc") 
target("server-async")
	add_files("server-async.cc") 
target("server-coroutine")
	add_files("server-coroutine.cc") 