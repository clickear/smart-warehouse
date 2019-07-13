package com.deer.wms.finance.model;
import com.deer.wms.project.seed.core.service.QueryCriteria;

/**
* Created by  on 2018/07/04.
*/
public class ManagePayCriteria extends QueryCriteria {
    private String keyWords;
    private String fTypeCode ;
    private String  payFlowCode;

    public String getPayFlowCode() {
        return payFlowCode;
    }

    public void setPayFlowCode(String payFlowCode) {
        this.payFlowCode = payFlowCode;
    }

    public String getfTypeCode() {
        return fTypeCode;
    }

    public void setfTypeCode(String fTypeCode) {
        this.fTypeCode = fTypeCode;
    }


    public String getKeyWords() {
        return keyWords;
    }

    public void setKeyWords(String keyWords) {
        this.keyWords = keyWords;
    }

    private Integer companyId;

    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }
}
