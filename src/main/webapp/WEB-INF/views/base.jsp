<%@ page language="java" contentType="application/xml; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.io.*" %>
<%@ page import="com.nexacro.java.xapi.data.*" %>
<%@page import="com.nexacro.java.xapi.tx.*"%>

<%
	out.clearBuffer();
    // Create HttpPlatformRequest and process the request data
    HttpPlatformRequest req = new HttpPlatformRequest(request.getInputStream());
    req.receiveData();
    
    PlatformData pdata = req.getData();
    
    // Get the incoming dataset and variables
    DataSet inds = pdata.getDataSet("inDataset");
    VariableList varList = pdata.getVariableList();
    
    // Create the output dataset
    DataSet outds = new DataSet("outDataset");
    outds.addColumn("관리번호", DataTypes.STRING, 4);
    outds.addColumn("직책", DataTypes.STRING, 16);
    
    int row = outds.newRow(); 
    outds.set(row, "관리번호", "A-001");
    outds.set(row, "직책", "aaaaa");
    
    // Prepare the response data
    PlatformData respdata = new PlatformData();
    VariableList resVarList = respdata.getVariableList();
    respdata.addDataSet(outds);
    
    resVarList.add("ErrorCode", 0);
    resVarList.add("ErrorMsg", "SUCC");
    
    // Send the response
    HttpPlatformResponse res = new HttpPlatformResponse(response, PlatformType.CONTENT_TYPE_XML, "UTF-8");
    res.setData(respdata); 
    res.sendData();
%>
