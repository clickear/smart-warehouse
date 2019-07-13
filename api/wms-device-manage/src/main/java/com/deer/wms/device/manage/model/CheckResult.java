package com.deer.wms.device.manage.model;

import java.util.Date;
import javax.persistence.*;

@Table(name = "check_result")
public class CheckResult {
    @Id
    @Column(name = "check_result_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer checkResultId;

    @Column(name = "device_check_detail_id")
    private Integer deviceCheckDetailId;

    @Column(name = "check_content_id")
    private Integer checkContentId;

    private Integer result;

    @Column(name = "check_time")
    private String checkTime;

    @Column(name = "check_user_id")
    private Integer checkUserId;

    private String memo;


    /**
     * @return check_result_id
     */
    public Integer getCheckResultId() {
        return checkResultId;
    }

    public void setCheckResultId(Integer checkResultId) {
        this.checkResultId = checkResultId;
    }

    /**
     * @return check_content_id
     */
    public Integer getCheckContentId() {
        return checkContentId;
    }

    /**
     * @param checkContentId
     */
    public void setCheckContentId(Integer checkContentId) {
        this.checkContentId = checkContentId;
    }

    public Integer getResult() {
        return result;
    }

    public void setResult(Integer result) {
        this.result = result;
    }

    public String getCheckTime() {
        return checkTime;
    }

    public void setCheckTime(String checkTime) {
        this.checkTime = checkTime;
    }

    /**
     * @return check_user_id
     */
    public Integer getCheckUserId() {
        return checkUserId;
    }

    /**
     * @param checkUserId
     */
    public void setCheckUserId(Integer checkUserId) {
        this.checkUserId = checkUserId;
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

    public Integer getDeviceCheckDetailId() {
        return deviceCheckDetailId;
    }

    public void setDeviceCheckDetailId(Integer deviceCheckDetailId) {
        this.deviceCheckDetailId = deviceCheckDetailId;
    }
}