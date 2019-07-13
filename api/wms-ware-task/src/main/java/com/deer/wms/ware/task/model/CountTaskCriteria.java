package com.deer.wms.ware.task.model;

import com.deer.wms.project.seed.core.service.QueryCriteria;

/**
* Created by guo on 2018/08/22.
*/
public class CountTaskCriteria extends QueryCriteria {
    private Integer countId;

    public Integer getCountId() {
        return countId;
    }

    public void setCountId(Integer countId) {
        this.countId = countId;
    }
}
