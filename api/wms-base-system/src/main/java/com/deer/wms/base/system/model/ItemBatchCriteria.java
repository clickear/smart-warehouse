package com.deer.wms.base.system.model;

import com.deer.wms.project.seed.core.service.QueryCriteria;

/**
* Created by guo on 2018/08/06.
*/
public class ItemBatchCriteria extends QueryCriteria {
    private String itemCode;

    private String itemBatchBarCode;
    private String batchId;

    private String detailNo;

    public String getDetailNo() {
        return detailNo;
    }

    public void setDetailNo(String detailNo) {
        this.detailNo = detailNo;
    }

    public String getBatchId() {
        return batchId;
    }

    public void setBatchId(String batchId) {
        this.batchId = batchId;
    }

    public String getItemCode() {
        return itemCode;
    }

    public void setItemCode(String itemCode) {
        this.itemCode = itemCode;
    }

    public String getItemBatchBarCode() {
        return itemBatchBarCode;
    }

    public void setItemBatchBarCode(String itemBatchBarCode) {
        this.itemBatchBarCode = itemBatchBarCode;
    }
}
