package com.deer.wms.device.manage.model;

public class DeviceCheckMasterDto extends DeviceCheckMaster {

    private String dutyUserName;
    private String recordUserName;

    public String getDutyUserName() {
        return dutyUserName;
    }

    public void setDutyUserName(String dutyUserName) {
        this.dutyUserName = dutyUserName;
    }

    public String getRecordUserName() {
        return recordUserName;
    }

    public void setRecordUserName(String recordUserName) {
        this.recordUserName = recordUserName;
    }
}
