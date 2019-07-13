package com.deer.wms.device.manage.model;

import javax.persistence.*;

@Table(name = "device_check_detail")
public class DeviceCheckDetail {
    @Id
    @Column(name = "device_check_detail_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer deviceCheckDetailId;

    @Column(name = "device_check_master_id")
    private Integer deviceCheckMasterId;

    @Column(name = "device_single_id")
    private Integer deviceSingleId;

    private String memo;

    @Column(name = "task_user_id")
    private Integer taskUserId;

    private Integer state;
    private String taskTime;

    public String getTaskTime() {
        return taskTime;
    }

    public void setTaskTime(String taskTime) {
        this.taskTime = taskTime;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }


    /**
     * @return device_check_detail_id
     */
    public Integer getDeviceCheckDetailId() {
        return deviceCheckDetailId;
    }

    /**
     * @param deviceCheckDetailId
     */
    public void setDeviceCheckDetailId(Integer deviceCheckDetailId) {
        this.deviceCheckDetailId = deviceCheckDetailId;
    }

    /**
     * @return device_check_master_id
     */
    public Integer getDeviceCheckMasterId() {
        return deviceCheckMasterId;
    }

    /**
     * @param deviceCheckMasterId
     */
    public void setDeviceCheckMasterId(Integer deviceCheckMasterId) {
        this.deviceCheckMasterId = deviceCheckMasterId;
    }

    /**
     * @return device_single_id
     */
    public Integer getDeviceSingleId() {
        return deviceSingleId;
    }

    /**
     * @param deviceSingleId
     */
    public void setDeviceSingleId(Integer deviceSingleId) {
        this.deviceSingleId = deviceSingleId;
    }

    /**
     * @return memo
     */
    public String getMemo() {
        return memo;
    }

    /**
     * @param memo
     */
    public void setMemo(String memo) {
        this.memo = memo;
    }

    /**
     * @return task_user_id
     */
    public Integer getTaskUserId() {
        return taskUserId;
    }

    /**
     * @param taskUserId
     */
    public void setTaskUserId(Integer taskUserId) {
        this.taskUserId = taskUserId;
    }
}