package com.deer.wms.operation.model;
import com.deer.wms.project.seed.core.service.QueryCriteria;


/**
* Created by  on 2018/07/25.
*/
public class SaleMasterCriteria extends QueryCriteria {
    private String keyWords;

    public String getKeyWords() {
        return keyWords;
    }

    public void setKeyWords(String keyWords) {
        this.keyWords = keyWords;
    }

    private String saleNo;
    private String status;

    public String getSaleNo() {
        return saleNo;
    }

    public void setSaleNo(String saleNo) {
        this.saleNo = saleNo;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
