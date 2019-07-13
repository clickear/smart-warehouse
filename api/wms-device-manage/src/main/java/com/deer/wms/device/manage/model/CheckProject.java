package com.deer.wms.device.manage.model;

import javax.persistence.*;

@Table(name = "check_project")
public class CheckProject {
    @Id
    @Column(name = "check_project_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer checkProjectId;

    /**
     * 检查项目名称
     */
    @Column(name = "check_project_name")
    private String checkProjectName;

    /**
     * 设备ID
     */
    @Column(name = "device_id")
    private Integer deviceId;

    /**
     * @return check_project_id
     */
    public Integer getCheckProjectId() {
        return checkProjectId;
    }

    /**
     * @param checkProjectId
     */
    public void setCheckProjectId(Integer checkProjectId) {
        this.checkProjectId = checkProjectId;
    }

    /**
     * 获取检查项目名称
     *
     * @return check_project_name - 检查项目名称
     */
    public String getCheckProjectName() {
        return checkProjectName;
    }

    /**
     * 设置检查项目名称
     *
     * @param checkProjectName 检查项目名称
     */
    public void setCheckProjectName(String checkProjectName) {
        this.checkProjectName = checkProjectName;
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
}