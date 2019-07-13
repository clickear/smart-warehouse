package com.deer.wms.system.manage.model;

import javax.persistence.*;
import java.util.Date;

public class InventoryReportDto extends InventoryReport{

    private String itemName;
    private String itemClass;
    private String unitName;
    private String wareName;
    private String itemMasterName;




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

    public String getWareName() {
        return wareName;
    }

    public void setWareName(String wareName) {
        this.wareName = wareName;
    }


    public String getItemMasterName() {
        return itemMasterName;
    }

    public void setItemMasterName(String itemMasterName) {
        this.itemMasterName = itemMasterName;
    }
}