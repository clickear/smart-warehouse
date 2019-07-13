package com.deer.wms.bill.manage.model;

public class TongJiItem {

    private String dateTime;
    private Integer inData;
    private Integer outData;
    private Integer inventory;

    public String getDateTime() {
        return dateTime;
    }

    public void setDateTime(String dateTime) {
        this.dateTime = dateTime;
    }

    public Integer getInData() {
        return inData;
    }

    public void setInData(Integer inData) {
        this.inData = inData;
    }

    public Integer getOutData() {
        return outData;
    }

    public void setOutData(Integer outData) {
        this.outData = outData;
    }

    public Integer getInventory() {
        return inventory;
    }

    public void setInventory(Integer inventory) {
        this.inventory = inventory;
    }
}
