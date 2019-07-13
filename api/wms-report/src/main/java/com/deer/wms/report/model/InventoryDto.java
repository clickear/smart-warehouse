package com.deer.wms.report.model;

/**
 * Created by Administrator on 2018/7/5.
 */
public class InventoryDto extends Inventory{
    private String itemCode;
    private String itemName;

    private  String  wareName;
    private String  companyName;
    private String itemClass;
    private Integer floorLimit;
    private Integer upperLimit;
    private Integer itemMasterId;
    private String unitName;


    private String batch;

    private String itemMasterName;

    private String quantityState;

    public String getQuantityState() {
        return quantityState;
    }

    public void setQuantityState(String quantityState) {
        this.quantityState = quantityState;
    }

    public Integer getFloorLimit() {
        return floorLimit;
    }

    public void setFloorLimit(Integer floorLimit) {
        this.floorLimit = floorLimit;
    }

    public Integer getUpperLimit() {
        return upperLimit;
    }

    public void setUpperLimit(Integer upperLimit) {
        this.upperLimit = upperLimit;
    }

    public String getItemMasterName() {
        return itemMasterName;
    }

    public void setItemMasterName(String itemMasterName) {
        this.itemMasterName = itemMasterName;
    }

    public String getItemCode() {
        return itemCode;
    }

    public void setItemCode(String itemCode) {
        this.itemCode = itemCode;
    }

    public String getBatch() {
        return batch;
    }

    public void setBatch(String batch) {
        this.batch = batch;
    }

    public String getItemClass() {
        return itemClass;
    }

    public void setItemClass(String itemClass) {
        this.itemClass = itemClass;
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

    public Integer getItemMasterId() {
        return itemMasterId;
    }

    public void setItemMasterId(Integer itemMasterId) {
        this.itemMasterId = itemMasterId;
    }

    public String getUnitName() {
        return unitName;
    }

    public void setUnitName(String unitName) {
        this.unitName = unitName;
    }
}
