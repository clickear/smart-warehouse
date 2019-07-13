package com.deer.wms.device.manage.model;

import javax.persistence.*;

@Table(name = "device_single")
public class DeviceSingle {
    /**
     * 设备一物一码id
     */
    @Id
    @Column(name = "device_single_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer deviceSingleId;

    /**
     * 设备ID
     */
    @Column(name = "device_id")
    private Integer deviceId;

    @Column(name = "device_code")
    private String deviceCode;

    private Integer state;

    /**
     * 获取设备一物一码id
     *
     * @return device_single_id - 设备一物一码id
     */
    public Integer getDeviceSingleId() {
        return deviceSingleId;
    }

    /**
     * 设置设备一物一码id
     *
     * @param deviceSingleId 设备一物一码id
     */
    public void setDeviceSingleId(Integer deviceSingleId) {
        this.deviceSingleId = deviceSingleId;
    }

    /**
     * 获取设备ID
     *
     * @return device_id - 设备ID
     */
    public Integer getDeviceId() {
        return deviceId;
    }

    /**
     * 设置设备ID
     *
     * @param deviceId 设备ID
     */
    public void setDeviceId(Integer deviceId) {
        this.deviceId = deviceId;
    }

    /**
     * @return device_code
     */
    public String getDeviceCode() {
        return deviceCode;
    }

    /**
     * @param deviceCode
     */
    public void setDeviceCode(String deviceCode) {
        this.deviceCode = deviceCode;
    }

    /**
     * @return state
     */
    public Integer getState() {
        return state;
    }

    /**
     * @param state
     */
    public void setState(Integer state) {
        this.state = state;
    }
}