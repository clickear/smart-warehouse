package com.deer.wms.base.system.model;

import com.deer.wms.project.seed.core.service.QueryCriteria;

/**
* Created by  on 2018/06/29.
*/
public class PalletCriteria extends QueryCriteria {

    private String keyWords;
    private Integer companyId;
    private String palletCode;
    private String palletBarCode;
    private String cellCode;

    private Integer palletType;

    public Integer getPalletType() {
        return palletType;
    }

    public void setPalletType(Integer palletType) {
        this.palletType = palletType;
    }

    public String getCellCode() {
        return cellCode;
    }

    public void setCellCode(String cellCode) {
        this.cellCode = cellCode;
    }

    public String getPalletBarCode() {
        return palletBarCode;
    }

    public void setPalletBarCode(String palletBarCode) {
        this.palletBarCode = palletBarCode;
    }

    public String getPalletCode() {
        return palletCode;
    }

    public void setPalletCode(String palletCode) {
        this.palletCode = palletCode;
    }

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
}
