package com.deer.wms.base.system.model;

/**
 * Created by Administrator on 2018/6/20.
 */
public class ShelfInfoDto extends ShelfInfo {
    private String  companyName;
    private  String   areaName;
    private  String   wareName;

    public String getAreaName() {
        return areaName;
    }

    public void setAreaName(String areaName) {
        this.areaName = areaName;
    }

    public String getWareName() {
        return wareName;
    }

    public void setWareName(String wareName) {
        this.wareName = wareName;
    }
    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }
}
