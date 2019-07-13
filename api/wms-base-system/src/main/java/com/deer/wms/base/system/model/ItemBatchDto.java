package com.deer.wms.base.system.model;

import javax.persistence.*;
import java.util.Date;

@Table(name = "item_batch")
public class ItemBatchDto extends  ItemBatch {
    private String itemName;
    private String itemClass;
    private String  itemTypeName;

    private String wareName;
    private String itemMasterName;

    public String getItemTypeName() {
        return itemTypeName;
    }

    public void setItemTypeName(String itemTypeName) {
        this.itemTypeName = itemTypeName;
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

    public String getItemType() {
        return itemTypeName;
    }

    public void setItemType(String itemTypeName) {
        this.itemTypeName = itemTypeName;
    }
}