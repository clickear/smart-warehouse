package com.deer.wms.finance.model;

/**
 * Created by Administrator on 2018/7/5.
 */
public class ManagePayDto extends ManagePay{
    private String companyName;

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    private String  fTypeName;
    public String getfTypeName() {
        return fTypeName;
    }

    public void setfTypeName(String fTypeName) {
        this.fTypeName = fTypeName;
    }
}
