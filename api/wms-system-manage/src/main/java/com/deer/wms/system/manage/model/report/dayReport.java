package com.deer.wms.system.manage.model.report;

public class dayReport {

    //开始库存---前一天的结束库存
    private Integer startInventory;

    //出库量
    private Integer outInventory;

    //入库量
    private Integer inInventory;

    //现有库存----从库存表中查询
    private Integer inventory;


    //损益量  == 现有库存 - （开始库存 + 出库量 - 入库量）
    private Integer lossInventory;

    public Integer getStartInventory() {
        return startInventory;
    }

    public void setStartInventory(Integer startInventory) {
        this.startInventory = startInventory;
    }

    public Integer getOutInventory() {
        return outInventory;
    }

    public void setOutInventory(Integer outInventory) {
        this.outInventory = outInventory;
    }

    public Integer getInInventory() {
        return inInventory;
    }

    public void setInInventory(Integer inInventory) {
        this.inInventory = inInventory;
    }

    public Integer getInventory() {
        return inventory;
    }

    public void setInventory(Integer inventory) {
        this.inventory = inventory;
    }

    public Integer getLossInventory() {
        return lossInventory;
    }

    public void setLossInventory(Integer lossInventory) {
        this.lossInventory = lossInventory;
    }
}
