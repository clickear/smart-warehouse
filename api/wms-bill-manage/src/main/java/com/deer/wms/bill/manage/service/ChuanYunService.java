package com.deer.wms.bill.manage.service;

import javax.xml.soap.SOAPException;

/**
 * @Author: jiangbangfa
 * @Description:
 * @Date: Create in 14:17 2018/12/22
 */
public interface ChuanYunService {
    public String createBizObject(String schemaCode, String objData, boolean submit) throws SOAPException;

    public String createBizObjects(String schemaCode, String[] objDatas, boolean submit) throws SOAPException;

    public String loadBizObject(String schemaCode, String objectId) throws SOAPException;

    public String loadBizObjects(String schemaCode, String filterStr) throws SOAPException;

    public String removeBizObject(String schemaCode, String objectId) throws SOAPException;

    public String updateBizObject(String schemaCode, String objData, String objectId) throws SOAPException;
}
