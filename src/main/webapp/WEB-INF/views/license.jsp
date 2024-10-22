<%@page import="com.nexacro.java.xapi.util.JarInfo"%>
<%@ page import="com.nexacro.java.xapi.data.util.*" %>
<%@ page import="com.nexacro.java.xapi.tx.*" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<pre>
<%
		JarInfo jarInfo = new JarInfo();

		try {
			jarInfo.info(out);
		} catch(Exception e) {
			out.println("An error occurred: " + e.getMessage());
		}
	%>
</pre>
	
</body>
</html>