package com.deer.wms.operation.model;

public class OrderDetailDto extends OrderDetail {

    private String unitName;
    private String  itemName;
    private String  itemClass;
    private String companyName;

    public String getUnitName() {
        return unitName;
    }

    public void setUnitName(String unitName) {
        this.unitName = unitName;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    @Override
    public String getItemClass() {
        return itemClass;
    }

    @Override
    public void setItemClass(String itemClass) {
        this.itemClass = itemClass;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }
}
