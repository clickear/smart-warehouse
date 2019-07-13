package com.deer.wms.finance.model;

/**
 * Created by Administrator on 2018/7/4.
 */
public class ManageArDto extends ManageAr {
    private String companyName;
    private String  fTypeName;


    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getfTypeName() {
        return fTypeName;
    }

    public void setfTypeName(String fTypeName) {
        this.fTypeName = fTypeName;
    }
}
