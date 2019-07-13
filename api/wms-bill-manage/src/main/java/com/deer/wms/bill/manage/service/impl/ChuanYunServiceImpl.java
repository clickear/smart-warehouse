package com.deer.wms.bill.manage.service.impl;


import com.deer.wms.bill.manage.service.ChuanYunService;
import com.deer.wms.bill.manage.util.SoapUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.xml.soap.*;

/**
 * @Author: jiangbangfa
 * @Description:
 * @Date: Create in 14:18 2018/12/22
 */
//@Service价格这个，然后在Controller里面@Autowired注入就行了
@Service
@Transactional
public class ChuanYunServiceImpl implements ChuanYunService {

    //氚云接口地址
    private final static String COLUD_URL = "https://www.h3yun.com/Webservices/BizObjectService.asmx";
    private final static String PROTOCOL = SOAPConstants.SOAP_1_1_PROTOCOL;
    private final static String XMLNS = "http://tempuri.org/";
    private String soapReq(SOAPElement body){
        String respResult = null;
        try {
            SOAPFactory soapFactory = SOAPFactory.newInstance(PROTOCOL);
            Name name = soapFactory.createName("Authentication", null, XMLNS);
            SOAPElement header = soapFactory.createElement(name);

            header.addChildElement("EngineCode",null,name.getURI()).addTextNode("ruoiw0zs5za99arpu893tduy3");
            header.addChildElement("CorpId",null,name.getURI()).addTextNode("ding6cbba9b11be88441");
            header.addChildElement("Secret",null,name.getURI()).addTextNode("c52+MAYSO5xjaGz5lDnHTgrCOFxeyC9EgMfvhbLgfdnouLy6wFKaSw==");

            SOAPMessage soapMessage = SoapUtils.soapReq(PROTOCOL, header, body,COLUD_URL);
            respResult = soapMessage.getSOAPPart().getEnvelope().getBody().getTextContent();
        } catch (SOAPException e) {
            e.printStackTrace();
        }
        return respResult;
    }

    @Override
    public String createBizObject(String schemaCode, String objData, boolean submit) throws SOAPException {
        SOAPFactory soapFactory = SOAPFactory.newInstance(PROTOCOL);

        Name name = soapFactory.createName("CreateBizObject", null, XMLNS);
        SOAPElement body = soapFactory.createElement(name);
        body.addChildElement("schemaCode",null,name.getURI()).addTextNode(schemaCode);
        body.addChildElement("objData",null,name.getURI()).addTextNode(objData);
        body.addChildElement("submit",null,name.getURI()).addTextNode(submit + "");

        return soapReq(body);
    }

    @Override
    public String createBizObjects(String schemaCode, String[] objDatas, boolean submit) throws SOAPException {
        SOAPFactory soapFactory = SOAPFactory.newInstance(PROTOCOL);

        Name name = soapFactory.createName("CreateBizObjects", null, XMLNS);
        SOAPElement body = soapFactory.createElement(name);
        body.addChildElement("schemaCode",null,name.getURI()).addTextNode(schemaCode);
        SOAPElement objDatasEle = body.addChildElement("objDatas",null,name.getURI());
        if(objDatas != null){
            for (String objData : objDatas) {
                objDatasEle.addChildElement("string",null,name.getURI()).addTextNode(objData);
            }
        }
        body.addChildElement("submit",null,name.getURI()).addTextNode(submit + "");

        return soapReq(body);
    }

    @Override
    public String loadBizObject(String schemaCode, String objectId) throws SOAPException {
        SOAPFactory soapFactory = SOAPFactory.newInstance(PROTOCOL);

        Name name = soapFactory.createName("LoadBizObject", null, XMLNS);
        SOAPElement body = soapFactory.createElement(name);
        body.addChildElement("schemaCode",null,name.getURI()).addTextNode(schemaCode);
        body.addChildElement("objectId",null,name.getURI()).addTextNode(objectId);

        return soapReq(body);
    }

    @Override
    public String loadBizObjects(String schemaCode, String filterStr) throws SOAPException {
        SOAPFactory soapFactory = SOAPFactory.newInstance(PROTOCOL);

        Name name = soapFactory.createName("LoadBizObjects", null, XMLNS);
        SOAPElement body = soapFactory.createElement(name);
        body.addChildElement("schemaCode",null,name.getURI()).addTextNode(schemaCode);
        body.addChildElement("filterStr",null,name.getURI()).addTextNode(filterStr);

        return soapReq(body);
    }

    @Override
    public String removeBizObject(String schemaCode, String objectId) throws SOAPException {
        SOAPFactory soapFactory = SOAPFactory.newInstance(PROTOCOL);

        Name name = soapFactory.createName("RemoveBizObject", null, XMLNS);
        SOAPElement body = soapFactory.createElement(name);
        body.addChildElement("schemaCode",null,name.getURI()).addTextNode(schemaCode);
        body.addChildElement("objectId",null,name.getURI()).addTextNode(objectId);

        return soapReq(body);
    }

    @Override
    public String updateBizObject(String schemaCode, String objData, String objectId) throws SOAPException {
        SOAPFactory soapFactory = SOAPFactory.newInstance(PROTOCOL);

        Name name = soapFactory.createName("UpdateBizObject", null, XMLNS);
        SOAPElement body = soapFactory.createElement(name);
        body.addChildElement("schemaCode",null,name.getURI()).addTextNode(schemaCode);
        body.addChildElement("objData",null,name.getURI()).addTextNode(objData);
        body.addChildElement("objectId",null,name.getURI()).addTextNode(objectId);

        return soapReq(body);
    }
}
