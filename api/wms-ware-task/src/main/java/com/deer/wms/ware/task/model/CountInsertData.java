package com.deer.wms.ware.task.model;

import com.deer.wms.ware.task.model.CountMaster;

import java.util.List;

public class CountInsertData {

    private CountMaster countMaster;

    private List<CountDetail> list;

    public CountMaster getCountMaster() {
        return countMaster;
    }

    public void setCountMaster(CountMaster countMaster) {
        this.countMaster = countMaster;
    }

    public List<CountDetail> getList() {
        return list;
    }

    public void setList(List<CountDetail> list) {
        this.list = list;
    }
}
