package com.deer.wms.report.model;

import com.deer.wms.project.seed.core.service.QueryCriteria;

/**
* Created by 郭靖勋 on 2018/10/17.
*/
public class ScanRecordCriteria extends QueryCriteria {

    private Integer state;
    private Integer type;

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }
}
