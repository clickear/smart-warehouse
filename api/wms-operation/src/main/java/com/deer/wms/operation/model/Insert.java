package com.deer.wms.operation.model;

import java.util.List;

public class Insert {

    private SaleMaster saleMaster;
    private List<SaleDetail> list;

    public SaleMaster getSaleMaster() {
        return saleMaster;
    }

    public void setSaleMaster(SaleMaster saleMaster) {
        this.saleMaster = saleMaster;
    }

    public List<SaleDetail> getList() {
        return list;
    }

    public void setList(List<SaleDetail> list) {
        this.list = list;
    }
}
