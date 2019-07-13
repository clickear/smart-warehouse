package com.deer.wms.message.model;

import java.util.Date;
import javax.persistence.*;

public class Notice {
    /**
     * 系统消息id
     */
    @Id
    @Column(name = "notice_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long noticeId;

    /**
     * 标题
     */
    private String title;

    /**
     * 业务单号
     */
    @Column(name = "business_no")
    private String businessNo;

    /**
     * 业务类型
     */
    @Column(name = "business_type")
    private Integer businessType;

    /**
     * 消息类型
     */
    @Column(name = "notice_type")
    private Integer noticeType;

    /**
     * 消息规则
     */
    @Column(name = "notice_rule")
    private Integer noticeRule;

    /**
     * 终端位置
     */
    @Column(name = "terminal_position")
    private String terminalPosition;

    /**
     * 消息内容
     */
    private String content;

    /**
     * 信息状态
     */
    private String state;
    /**
     * 设备Id
     */
    private String deviceId;
    /**
     * 纠偏后的经度(适用于百度/图吧地图显示)
     */
    private String bLng;
    /**
     * 纠偏后的纬度(适用于百度/图吧地图显示)
     */
    private String bLat;


    /**
     * 创建时间
     */
    @Column(name = "create_time")
    private Date createTime;

    /**
     * 修改时间
     */
    @Column(name = "modify_time")
    private Date modifyTime;

    /**
     * 获取系统消息id
     *
     * @return notice_id - 系统消息id
     */
    public Long getNoticeId() {
        return noticeId;
    }

    /**
     * 设置系统消息id
     *
     * @param noticeId 系统消息id
     */
    public void setNoticeId(Long noticeId) {
        this.noticeId = noticeId;
    }

    /**
     * 获取标题
     *
     * @return title - 标题
     */
    public String getTitle() {
        return title;
    }

    /**
     * 设置标题
     *
     * @param title 标题
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * 获取业务单号
     *
     * @return business_no - 业务单号
     */
    public String getBusinessNo() {
        return businessNo;
    }

    /**
     * 设置业务单号
     *
     * @param businessNo 业务单号
     */
    public void setBusinessNo(String businessNo) {
        this.businessNo = businessNo;
    }

    /**
     * 获取业务类型
     *
     * @return business_type - 业务类型
     */
    public Integer getBusinessType() {
        return businessType;
    }

    /**
     * 设置业务类型
     *
     * @param businessType 业务类型
     */
    public void setBusinessType(Integer businessType) {
        this.businessType = businessType;
    }

    /**
     * 获取消息类型
     *
     * @return notice_type - 消息类型
     */
    public Integer getNoticeType() {
        return noticeType;
    }

    /**
     * 设置消息类型
     *
     * @param noticeType 消息类型
     */
    public void setNoticeType(Integer noticeType) {
        this.noticeType = noticeType;
    }

    /**
     * 获取消息规则
     *
     * @return notice_rule - 消息规则
     */
    public Integer getNoticeRule() {
        return noticeRule;
    }

    /**
     * 设置消息规则
     *
     * @param noticeRule 消息规则
     */
    public void setNoticeRule(Integer noticeRule) {
        this.noticeRule = noticeRule;
    }

    /**
     * 获取终端位置
     *
     * @return terminal_position - 终端位置
     */
    public String getTerminalPosition() {
        return terminalPosition;
    }

    /**
     * 设置终端位置
     *
     * @param terminalPosition 终端位置
     */
    public void setTerminalPosition(String terminalPosition) {
        this.terminalPosition = terminalPosition;
    }

    /**
     * 获取消息内容
     *
     * @return content - 消息内容
     */
    public String getContent() {
        return content;
    }

    /**
     * 设置消息内容
     *
     * @param content 消息内容
     */
    public void setContent(String content) {
        this.content = content;
    }

    /**
     * 获取信息状态
     *
     * @return state - 信息状态
     */
    public String getState() {
        return state;
    }

    /**
     * 设置信息状态
     *
     * @param state 信息状态
     */
    public void setState(String state) {
        this.state = state;
    }

    /**
     * 获取创建时间
     *
     * @return create_time - 创建时间
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * 设置创建时间
     *
     * @param createTime 创建时间
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    /**
     * 获取修改时间
     *
     * @return modify_time - 修改时间
     */
    public Date getModifyTime() {
        return modifyTime;
    }

    /**
     * 设置修改时间
     *
     * @param modifyTime 修改时间
     */
    public void setModifyTime(Date modifyTime) {
        this.modifyTime = modifyTime;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public String getbLng() {
        return bLng;
    }

    public void setbLng(String bLng) {
        this.bLng = bLng;
    }

    public String getbLat() {
        return bLat;
    }

    public void setbLat(String bLat) {
        this.bLat = bLat;
    }
}