add_cxxflags("--debug")
set_kind("binary")
set_languages("c++11")
target("ava")
	add_files("ava.cpp") 
target("oo")
	add_files("oo.cpp") 
target("hello")
	add_files("hello.cpp") 