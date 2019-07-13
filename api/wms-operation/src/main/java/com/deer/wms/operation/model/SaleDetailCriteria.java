package com.deer.wms.operation.model;
import com.deer.wms.project.seed.core.service.QueryCriteria;

/**
* Created by  on 2018/07/25.
*/
public class SaleDetailCriteria extends QueryCriteria {
    private Integer id;
    private String saleNo;
    private String keyWords;

    private Integer status;
    private String itemCode;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSaleNo() {
        return saleNo;
    }

    public void setSaleNo(String saleNo) {
        this.saleNo = saleNo;
    }

    public String getKeyWords() {
        return keyWords;
    }

    public void setKeyWords(String keyWords) {
        this.keyWords = keyWords;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getItemCode() {
        return itemCode;
    }

    public void setItemCode(String itemCode) {
        this.itemCode = itemCode;
    }
}
