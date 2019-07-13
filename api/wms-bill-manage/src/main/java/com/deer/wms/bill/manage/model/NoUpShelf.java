package com.deer.wms.bill.manage.model;

public class NoUpShelf {

    private String areaName;
    private String itemName;
    private String itemClass;
    private String unitName;
    private Integer NoUpQuantity;


    public String getAreaName() {
        return areaName;
    }

    public void setAreaName(String areaName) {
        this.areaName = areaName;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getItemClass() {
        return itemClass;
    }

    public void setItemClass(String itemClass) {
        this.itemClass = itemClass;
    }

    public String getUnitName() {
        return unitName;
    }

    public void setUnitName(String unitName) {
        this.unitName = unitName;
    }

    public Integer getNoUpQuantity() {
        return NoUpQuantity;
    }

    public void setNoUpQuantity(Integer noUpQuantity) {
        NoUpQuantity = noUpQuantity;
    }
}
