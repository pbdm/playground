add_cxxflags("--debug")
set_kind("binary")
set_languages("c++11")
target("template")
	add_files("template.cpp") 
target("oo")
	add_files("oo.cpp") 
target("hello")
	add_files("hello.cpp") 
target("stl")
	add_files("stl.cpp") 