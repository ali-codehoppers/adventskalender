<jsp:useBean id="Etn" scope="session" class="com.etn.beans.Contexte"/>
<%@page import="com.etn.beans.Etn"%>
<%@ page import="com.etn.lang.ResultSet.Set"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@page import="java.io.FileInputStream"%>
<%@page import="java.io.BufferedInputStream"%>
<%@page import="java.net.URL"%>
<%@page import="java.io.File"%>
<%@page import="java.io.InputStream"%>
<%@page import="javax.servlet.ServletOutputStream"%>



<%
	String filename = request.getParameter("filename");
	String attachId = request.getParameter("attachId");
	String fileAttachment="Select * from user_report_attachment where id="+attachId;
	Set rsAttach=Etn.execute(fileAttachment);
	rsAttach.next();
        BufferedInputStream buf = null;
        ServletOutputStream myOut = null;
        try {
            response.setContentType("APPLICATION/OCTET-STREAM");
            //String disHeader = "Attachment;Filename=\""+filename+"\"";
            //response.setHeader("Content-Disposition", disHeader);
            // transfer the file byte-by-byte to the response object
            File fileToDownload = new File(rsAttach.value("filepath")+"/"+rsAttach.value("filename"));
            FileInputStream fileInputStream = new FileInputStream(fileToDownload);

            myOut = response.getOutputStream( );
            response.addHeader("Content-Disposition","attachment; filename="+filename );
            response.setHeader("Cache-Control", "private");
            response.setHeader("Pragma", "private");
            response.setContentLength( (int) fileToDownload.length( ) );
            buf = new BufferedInputStream(fileInputStream);
            int readBytes = 0;

            //read from the file; write to the ServletOutputStream
            while((readBytes = buf.read( )) != -1) myOut.write(readBytes);
            if(fileInputStream != null) fileInputStream.close();
            if (myOut != null) myOut.close( );
            if (buf != null) buf.close( );
	}
	catch(Exception e)
	{
            // file IO errors
            if (myOut != null) myOut.close( );
            if (buf != null) buf.close( );
            //user1.log("report/download/ko"+filename,request, "");
            e.printStackTrace();
	}
%>
