package com.deer.wms.bill.manage.model;

/**
 * Created by Administrator on 2018/7/5.
 */
public class BillDetailDto extends BillDetail {
    private String wareName;
    private String areaName;
    private String cellName;
    private String toWareName;
    private String toAreaName;
    private String  toCellName;
    private String  itemName;
    private String  itemClass;
    private String  itemTypeCode;
    private String abcClass;
    private String upperLimit;

    public String getUpperLimit() {
        return upperLimit;
    }

    public void setUpperLimit(String upperLimit) {
        this.upperLimit = upperLimit;
    }

    private String  unitName;

    public String getAbcClass() {
        return abcClass;
    }

    public void setAbcClass(String abcClass) {
        this.abcClass = abcClass;
    }

    private String companyName;
    private Integer itemMasterId;

    public String getItemTypeCode() {
        return itemTypeCode;
    }

    public void setItemTypeCode(String itemTypeCode) {
        this.itemTypeCode = itemTypeCode;
    }

    public String getUnitName() {
        return unitName;
    }

    public void setUnitName(String unitName) {
        this.unitName = unitName;
    }

    public Integer getItemMasterId() {
        return itemMasterId;
    }

    public void setItemMasterId(Integer itemMasterId) {
        this.itemMasterId = itemMasterId;
    }

    public String getAreaName() {
        return areaName;
    }

    public void setAreaName(String areaName) {
        this.areaName = areaName;
    }

    public String getCellName() {
        return cellName;
    }

    public void setCellName(String cellName) {
        this.cellName = cellName;
    }

    public String getToWareName() {
        return toWareName;
    }

    public void setToWareName(String toWareName) {
        this.toWareName = toWareName;
    }

    public String getToAreaName() {
        return toAreaName;
    }

    public void setToAreaName(String toAreaName) {
        this.toAreaName = toAreaName;
    }

    public String getToCellName() {
        return toCellName;
    }

    public void setToCellName(String toCellName) {
        this.toCellName = toCellName;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
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

    public String getItemClass() {
        return itemClass;
    }

    public void setItemClass(String itemClass) {
        this.itemClass = itemClass;
    }
}
