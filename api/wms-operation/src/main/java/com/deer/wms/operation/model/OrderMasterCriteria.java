package com.deer.wms.operation.model;
import com.deer.wms.project.seed.core.service.QueryCriteria;

/**
* Created by  on 2018/08/02.
*/
public class OrderMasterCriteria extends QueryCriteria {
    private Integer companyId;
    private String keyWords;
    private Integer state;
    private String supplierCode;
    private String checkTime;

    public String getCheckTime() {
        return checkTime;
    }

    public void setCheckTime(String checkTime) {
        this.checkTime = checkTime;
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

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public String getSupplierCode() {
        return supplierCode;
    }

    public void setSupplierCode(String supplierCode) {
        this.supplierCode = supplierCode;
    }
}
