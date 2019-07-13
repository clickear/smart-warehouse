package com.deer.wms.device.manage.model;

import com.deer.wms.project.seed.core.service.QueryCriteria;

/**
* Created by GuoJingXun on 2018/10/11.
*/
public class CheckResultDto extends CheckResult {

    private String deviceCode;
    private String deviceName;
    private String checkProjectName;
    private Integer checkProjectId;
    private Integer checkContentId;
    private String checkContentName;
    private String step;
    private String standard;

    public String getDeviceCode() {
        return deviceCode;
    }

    public void setDeviceCode(String deviceCode) {
        this.deviceCode = deviceCode;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }

    public String getCheckProjectName() {
        return checkProjectName;
    }

    public void setCheckProjectName(String checkProjectName) {
        this.checkProjectName = checkProjectName;
    }

    public Integer getCheckProjectId() {
        return checkProjectId;
    }

    public void setCheckProjectId(Integer checkProjectId) {
        this.checkProjectId = checkProjectId;
    }

    @Override
    public Integer getCheckContentId() {
        return checkContentId;
    }

    @Override
    public void setCheckContentId(Integer checkContentId) {
        this.checkContentId = checkContentId;
    }

    public String getCheckContentName() {
        return checkContentName;
    }

    public void setCheckContentName(String checkContentName) {
        this.checkContentName = checkContentName;
    }

    public String getStep() {
        return step;
    }

    public void setStep(String step) {
        this.step = step;
    }

    public String getStandard() {
        return standard;
    }

    public void setStandard(String standard) {
        this.standard = standard;
    }
}
