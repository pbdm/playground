target("hello")
	set_kind("binary")
	set_languages("c++11")
	add_includedirs("/Users/bopeng/c/tools/v8/include")
	add_linkdirs("/Users/bopeng/c/tools/v8/out.gn/x64.release.sample/obj")
	add_links("v8_monolith")
	add_files("*.cc") 