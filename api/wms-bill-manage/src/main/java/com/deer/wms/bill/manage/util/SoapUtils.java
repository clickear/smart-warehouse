package com.deer.wms.bill.manage.util;

import javax.xml.soap.*;
import java.io.IOException;
import java.io.InputStream;

/**
 * @Author: jiangbangfa
 * @Description:
 * @Date: Create in 11:48 2018/12/22
 */
public class SoapUtils {

    //用于创建SOAPConnection对象的工厂
    private static SOAPConnectionFactory connFactory;

    static {
        try {
            connFactory = SOAPConnectionFactory.newInstance();
        } catch (SOAPException e) {
            e.printStackTrace();
        }
    }

    public static SOAPMessage soapReq(SOAPMessage soapMsg,String url){
        SOAPMessage respMsg = null;
        SOAPConnection soapConn = null;
        try {
            //创建SOAP连接
            soapConn = connFactory.createConnection();
            //发送请求
            respMsg = soapConn.call(soapMsg,url);
        } catch (SOAPException e) {
            e.printStackTrace();
        }finally {
            try {
                soapConn.close();
            } catch (SOAPException e) {
                e.printStackTrace();
            }
        }
        return respMsg;
    }

    public static SOAPMessage soapReq(String protocol, SOAPElement head, SOAPElement body,String url) throws SOAPException {
        MessageFactory msgFactory =  msgFactory = MessageFactory.newInstance(protocol);

        SOAPMessage soapMsg = msgFactory.createMessage();

        //设置SOAPHeader的子元素
        soapMsg.getSOAPHeader().addChildElement(head);
        //设置SOAPBody的子元素
        soapMsg.getSOAPBody().addChildElement(body);

        return soapReq(soapMsg,url);
    }

    public static SOAPMessage soapReq(String protocol, InputStream inputStream,String url) throws SOAPException, IOException {
        MessageFactory msgFactory =  msgFactory = MessageFactory.newInstance(protocol);

        //设置Mime类型
        MimeHeaders mimeHeaders = new MimeHeaders();
        if(SOAPConstants.SOAP_1_1_PROTOCOL.equals(protocol)){
            mimeHeaders.setHeader("Content-Type",SOAPConstants.SOAP_1_1_CONTENT_TYPE+";charset=UTF-8");
        }else if(SOAPConstants.SOAP_1_2_PROTOCOL.equals(protocol)){
            mimeHeaders.setHeader("Content-Type",SOAPConstants.SOAP_1_2_CONTENT_TYPE+";charset=UTF-8");
        }

        SOAPMessage soapMsg = msgFactory.createMessage(mimeHeaders,inputStream);

        return soapReq(soapMsg,url);
    }

}
