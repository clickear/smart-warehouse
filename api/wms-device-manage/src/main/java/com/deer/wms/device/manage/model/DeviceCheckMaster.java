package com.deer.wms.device.manage.model;

import java.util.Date;
import javax.persistence.*;

@Table(name = "device_check_master")
public class DeviceCheckMaster {
    @Id
    @Column(name = "device_check_master_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer deviceCheckMasterId;

    /**
     * 班组
     */
    private String team;

    /**
     * 1-周检  2-月检
     */
    private Integer type;

    @Column(name = "task_time")
    private String taskTime;

    private String memo;

    @Column(name = "duty_user_id")
    private Integer dutyUserId;

    @Column(name = "record_user_id")
    private Integer recordUserId;


    private Integer state;

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
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
     * 获取班组
     *
     * @return team - 班组
     */
    public String getTeam() {
        return team;
    }

    /**
     * 设置班组
     *
     * @param team 班组
     */
    public void setTeam(String team) {
        this.team = team;
    }

    /**
     * 获取1-周检  2-月检
     *
     * @return type - 1-周检  2-月检
     */
    public Integer getType() {
        return type;
    }

    /**
     * 设置1-周检  2-月检
     *
     * @param type 1-周检  2-月检
     */
    public void setType(Integer type) {
        this.type = type;
    }

    public String getTaskTime() {
        return taskTime;
    }

    public void setTaskTime(String taskTime) {
        this.taskTime = taskTime;
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
     * @return duty_user_id
     */
    public Integer getDutyUserId() {
        return dutyUserId;
    }

    /**
     * @param dutyUserId
     */
    public void setDutyUserId(Integer dutyUserId) {
        this.dutyUserId = dutyUserId;
    }

    /**
     * @return record_user_id
     */
    public Integer getRecordUserId() {
        return recordUserId;
    }

    /**
     * @param recordUserId
     */
    public void setRecordUserId(Integer recordUserId) {
        this.recordUserId = recordUserId;
    }
}