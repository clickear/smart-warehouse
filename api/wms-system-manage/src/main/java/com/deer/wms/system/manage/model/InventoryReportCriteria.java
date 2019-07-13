package com.deer.wms.system.manage.model;

import com.deer.wms.project.seed.core.service.QueryCriteria;

/**
* Created by  on 2018/08/27.
*/
public class InventoryReportCriteria extends QueryCriteria {
    private String itemCode;
    private Integer itemMasterId;
    private Integer companyId;

    private Integer type;

    private Integer reportType;
    private String keyWords;

    public String getKeyWords() {
        return keyWords;
    }

    public void setKeyWords(String keyWords) {
        this.keyWords = keyWords;
    }

    public Integer getReportType() {
        return reportType;
    }

    public void setReportType(Integer reportType) {
        this.reportType = reportType;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getItemCode() {
        return itemCode;
    }

    public void setItemCode(String itemCode) {
        this.itemCode = itemCode;
    }

    @Override
    public Integer getItemMasterId() {
        return itemMasterId;
    }

    @Override
    public void setItemMasterId(Integer itemMasterId) {
        this.itemMasterId = itemMasterId;
    }

    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }
}
