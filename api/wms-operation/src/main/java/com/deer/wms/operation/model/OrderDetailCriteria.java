package com.deer.wms.operation.model;
import com.deer.wms.project.seed.core.service.QueryCriteria;

/**
* Created by  on 2018/08/02.
*/
public class OrderDetailCriteria extends QueryCriteria {

    private Integer companyId;
    private Integer id;
    private String keyWords;
    private Integer state;

    private String OrderNo;


    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getKeyWords() {
        return keyWords;
    }

    public void setKeyWords(String keyWords) {
        this.keyWords = keyWords;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public String getOrderNo() {
        return OrderNo;
    }

    public void setOrderNo(String orderNo) {
        OrderNo = orderNo;
    }
}
