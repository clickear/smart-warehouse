package com.deer.wms.ware.task.model;


/**
* Created by guo on 2018/08/08.
*/
public class PalletBatchDto extends PalletBatch {


    private  String companyName;
    private String wareName;
    private  String areaName;
    private String shelfName;
    private  String cellCode;
    private String palletName;
    private String palletCode;
    private Integer palletType;
    private  String batch;
    private String itemName;
    private  String itemClass;
    private String itemTypeName;
    private  String itemMasterName;
    private Integer totalQuantity;
    private Integer isAll =1;

    public Integer getIsAll() {
        return isAll;
    }

    public void setIsAll(Integer isAll) {
        this.isAll = isAll;
    }

    public Integer getTotalQuantity() {
        return totalQuantity;
    }

    public void setTotalQuantity(Integer totalQuantity) {
        this.totalQuantity = totalQuantity;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getWareName() {
        return wareName;
    }

    public void setWareName(String wareName) {
        this.wareName = wareName;
    }

    public String getAreaName() {
        return areaName;
    }

    public void setAreaName(String areaName) {
        this.areaName = areaName;
    }

    public String getShelfName() {
        return shelfName;
    }

    public void setShelfName(String shelfName) {
        this.shelfName = shelfName;
    }

    public String getCellCode() {
        return cellCode;
    }

    public void setCellCode(String cellCode) {
        this.cellCode = cellCode;
    }

    public String getPalletName() {
        return palletName;
    }

    public void setPalletName(String palletName) {
        this.palletName = palletName;
    }

    public String getBatch() {
        return batch;
    }

    public void setBatch(String batch) {
        this.batch = batch;
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

    public String getItemTypeName() {
        return itemTypeName;
    }

    public void setItemTypeName(String itemTypeName) {
        this.itemTypeName = itemTypeName;
    }

    public String getItemMasterName() {
        return itemMasterName;
    }

    public void setItemMasterName(String itemMasterName) {
        this.itemMasterName = itemMasterName;
    }

    public String getPalletCode() {
        return palletCode;
    }

    public void setPalletCode(String palletCode) {
        this.palletCode = palletCode;
    }

    public Integer getPalletType() {
        return palletType;
    }

    public void setPalletType(Integer palletType) {
        this.palletType = palletType;
    }
}
