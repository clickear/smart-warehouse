package com.deer.wms.device.manage.model;

import com.deer.wms.project.seed.core.service.QueryCriteria;

/**
* Created by GuoJingXun on 2018/10/11.
*/
public class CheckResultCriteria extends QueryCriteria {

    private Integer deviceSingleId;
    private Integer deviceCheckDetailId;
    private Integer checkContentId;
    private Integer checkResultId;

    public Integer getDeviceSingleId() {
        return deviceSingleId;
    }

    public void setDeviceSingleId(Integer deviceSingleId) {
        this.deviceSingleId = deviceSingleId;
    }

    public Integer getDeviceCheckDetailId() {
        return deviceCheckDetailId;
    }

    public void setDeviceCheckDetailId(Integer deviceCheckDetailId) {
        this.deviceCheckDetailId = deviceCheckDetailId;
    }

    public Integer getCheckContentId() {
        return checkContentId;
    }

    public void setCheckContentId(Integer checkContentId) {
        this.checkContentId = checkContentId;
    }

    public Integer getCheckResultId() {
        return checkResultId;
    }

    public void setCheckResultId(Integer checkResultId) {
        this.checkResultId = checkResultId;
    }
}
