package com.deer.wms.bill.manage.model;

import com.deer.wms.base.system.model.ItemBatch;

import java.util.List;

public class InsertData  {

    private BillMaster billMaster;
    private List<BillDetail> billDetails;





    public BillMaster getBillMaster() {
        return billMaster;
    }

    public void setBillMaster(BillMaster billMaster) {
        this.billMaster = billMaster;
    }

    public List<BillDetail> getBillDetails() {
        return billDetails;
    }

    public void setBillDetails(List<BillDetail> billDetails) {
        this.billDetails = billDetails;
    }
}
