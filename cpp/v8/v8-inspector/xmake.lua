add_cxxflags("--debug")
set_kind("binary")
set_languages("c++17")
add_includedirs("/Users/bopeng/c/tools/v8/v8")
add_includedirs("/Users/bopeng/c/tools/v8/v8/include")
add_linkdirs("/Users/bopeng/c/tools/v8/lib")
add_links("v8_monolith")
-- https://www.mail-archive.com/v8-dev@googlegroups.com/msg160061.html
add_defines("V8_COMPRESS_POINTERS")
set_rundir("$(projectdir)/js")
target("inspector")
	add_files("main.cc") 