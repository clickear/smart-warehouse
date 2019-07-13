package com.deer.wms.base.system.model;


import com.deer.wms.project.seed.core.service.QueryCriteria;

/**
* Created by  on 2018/06/20.
*/
public class WareInfoCriteria extends QueryCriteria {
    private String keyWords;
    private Integer companyId;
    private String wareCode ;

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
