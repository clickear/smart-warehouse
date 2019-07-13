package com.deer.wms.ware.task.model;

import com.deer.wms.project.seed.core.service.QueryCriteria;

/**
* Created by guo on 2018/08/14.
*/
public class PrepareTaskCriteria extends QueryCriteria {


    private String billNo;
    private String taskBatch;
    private String wareCode;
    private Integer itemMasterId;
    private Integer state;

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public String getBillNo() {
        return billNo;
    }

    public void setBillNo(String billNo) {
        this.billNo = billNo;
    }

    public String getTaskBatch() {
        return taskBatch;
    }

    public void setTaskBatch(String taskBatch) {
        this.taskBatch = taskBatch;
    }

    @Override
    public String getWareCode() {
        return wareCode;
    }

    @Override
    public void setWareCode(String wareCode) {
        this.wareCode = wareCode;
    }

    @Override
    public Integer getItemMasterId() {
        return itemMasterId;
    }

    @Override
    public void setItemMasterId(Integer itemMasterId) {
        this.itemMasterId = itemMasterId;
    }
}
