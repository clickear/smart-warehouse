package com.deer.wms.bill.manage.model;

import com.deer.wms.project.seed.core.service.QueryCriteria;

public class NoUpShelfCriteria extends QueryCriteria {

    private String wareCode;
    private Integer companyId;
    private String keyWords;

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

    public String getKeyWords() {
        return keyWords;
    }

    public void setKeyWords(String keyWords) {
        this.keyWords = keyWords;
    }
}
