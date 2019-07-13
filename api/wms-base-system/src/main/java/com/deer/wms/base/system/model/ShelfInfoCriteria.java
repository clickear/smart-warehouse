package com.deer.wms.base.system.model;


import com.deer.wms.project.seed.core.service.QueryCriteria;

/**
* Created by  on 2018/06/20.
*/
public class ShelfInfoCriteria extends QueryCriteria {
    private  String  keyWords;
    private  String   areaCode;
    private  String   wareCode;
    private Integer companyId;
    private  String shelfCode;

    public String getShelfCode() {
        return shelfCode;
    }

    public void setShelfCode(String shelfCode) {
        this.shelfCode = shelfCode;
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

    public String getAreaCode() {
        return areaCode;
    }

    public void setAreaCode(String areaCode) {
        this.areaCode = areaCode;
    }

    public String getWareCode() {
        return wareCode;
    }

    public void setWareCode(String wareCode) {
        this.wareCode = wareCode;
    }
}
