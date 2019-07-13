package com.deer.wms.base.system.model;
import com.deer.wms.project.seed.core.service.QueryCriteria;
/**
* Created by  on 2018/07/04.
*/
public class ClientManageCriteria extends QueryCriteria {
    private String keyWords;
    private Integer companyId;
    private String clientCode ;

    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    public String getClientCode() {
        return clientCode;
    }

    public void setClientCode(String clientCode) {
        this.clientCode = clientCode;
    }

    public String getKeyWords() {

        return keyWords;
    }

    public void setKeyWords(String keyWords) {
        this.keyWords = keyWords;
    }
}
