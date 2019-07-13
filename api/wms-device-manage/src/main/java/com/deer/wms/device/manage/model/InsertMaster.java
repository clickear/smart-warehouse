package com.deer.wms.device.manage.model;

import java.util.List;

public class InsertMaster {

    private DeviceCheckMaster deviceCheckMaster;
    List<DeviceCheckDetail> deviceCheckDetails;

    public DeviceCheckMaster getDeviceCheckMaster() {
        return deviceCheckMaster;
    }

    public void setDeviceCheckMaster(DeviceCheckMaster deviceCheckMaster) {
        this.deviceCheckMaster = deviceCheckMaster;
    }

    public List<DeviceCheckDetail> getDeviceCheckDetails() {
        return deviceCheckDetails;
    }

    public void setDeviceCheckDetails(List<DeviceCheckDetail> deviceCheckDetails) {
        this.deviceCheckDetails = deviceCheckDetails;
    }
}
