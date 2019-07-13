package com.deer.wms.base.system.model;
import com.deer.wms.project.seed.core.service.QueryCriteria;

/**
* Created by  on 2018/07/04.
*/
public class SupplierManageCriteria extends QueryCriteria {
    private String keyWords;
    private Integer companyId;
    private String supplierCode ;

    public String getKeyWords() {
        return keyWords;
    }

    public void setKeyWords(String keyWords) {
        this.keyWords = keyWords;
    }

    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    public String getSupplierCode() {
        return supplierCode;
    }

    public void setSupplierCode(String supplierCode) {
        this.supplierCode = supplierCode;
    }
}
