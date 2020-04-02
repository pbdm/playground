target("hello")
	set_kind("binary")
	-- 这样写才会 include file.	
	add_files("*.cc") 