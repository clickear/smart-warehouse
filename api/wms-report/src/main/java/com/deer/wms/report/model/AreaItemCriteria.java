package com.deer.wms.report.model;

import com.deer.wms.project.seed.core.service.QueryCriteria;

/**
* Created by 郭靖勋 on 2018/07/10.
*/
public class AreaItemCriteria extends QueryCriteria {

    private String wareCode;
    private Integer companyId;
    private String areaCode;
    private String itemCode;
    private String keyWords;

    public String getKeyWords() {
        return keyWords;
    }

    public void setKeyWords(String keyWords) {
        this.keyWords = keyWords;
    }

    public String getWareCode() {
        return wareCode;
    }

    public void setWareCode(String wareCode) {
        this.wareCode = wareCode;
    }

    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    public String getAreaCode() {
        return areaCode;
    }

    public void setAreaCode(String areaCode) {
        this.areaCode = areaCode;
    }

    public String getItemCode() {
        return itemCode;
    }

    public void setItemCode(String itemCode) {
        this.itemCode = itemCode;
    }
}
