package com.deer.wms.message.model;

import java.util.Date;
import javax.persistence.*;

@Table(name = "notice_send_record")
public class NoticeSendRecord {
    /**
     * 发送记录信息id
     */
    @Id
    @Column(name = "record_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recordId;

    /**
     * 消息id
     */
    @Column(name = "notice_id")
    private Long noticeId;

    /**
     * 接收方信息id
     */
    @Column(name = "receive_id")
    private Integer receiveId;

    /**
     * 发送时间
     */
    @Column(name = "send_time")
    private Date sendTime;

    /**
     * 消息查看状态
     */
    private Boolean see;

    /**
     * 修改时间
     */
    @Column(name = "modify_time")
    private Date modifyTime;

    /**
     * 消息查看时间
     */
    @Column(name = "see_time")
    private Date seeTime;

    /**
     * 创建时间
     */
    @Column(name = "create_time")
    private Date createTime;

    /**
     * 获取发送记录信息id
     *
     * @return record_id - 发送记录信息id
     */
    public Long getRecordId() {
        return recordId;
    }

    /**
     * 设置发送记录信息id
     *
     * @param recordId 发送记录信息id
     */
    public void setRecordId(Long recordId) {
        this.recordId = recordId;
    }

    /**
     * 获取消息id
     *
     * @return notice_id - 消息id
     */
    public Long getNoticeId() {
        return noticeId;
    }

    /**
     * 设置消息id
     *
     * @param noticeId 消息id
     */
    public void setNoticeId(Long noticeId) {
        this.noticeId = noticeId;
    }

    /**
     * 获取接收方信息id
     *
     * @return receive_id - 接收方信息id
     */
    public Integer getReceiveId() {
        return receiveId;
    }

    /**
     * 设置接收方信息id
     *
     * @param receiveId 接收方信息id
     */
    public void setReceiveId(Integer receiveId) {
        this.receiveId = receiveId;
    }

    /**
     * 获取发送时间
     *
     * @return send_time - 发送时间
     */
    public Date getSendTime() {
        return sendTime;
    }

    /**
     * 设置发送时间
     *
     * @param sendTime 发送时间
     */
    public void setSendTime(Date sendTime) {
        this.sendTime = sendTime;
    }

    /**
     * 获取消息查看状态
     *
     * @return see - 消息查看状态
     */
    public Boolean getSee() {
        return see;
    }

    /**
     * 设置消息查看状态
     *
     * @param see 消息查看状态
     */
    public void setSee(Boolean see) {
        this.see = see;
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

    /**
     * 获取消息查看时间
     *
     * @return see_time - 消息查看时间
     */
    public Date getSeeTime() {
        return seeTime;
    }

    /**
     * 设置消息查看时间
     *
     * @param seeTime 消息查看时间
     */
    public void setSeeTime(Date seeTime) {
        this.seeTime = seeTime;
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
}