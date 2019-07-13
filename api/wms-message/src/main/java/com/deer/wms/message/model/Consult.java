package com.deer.wms.message.model;

import java.util.Date;
import javax.persistence.*;

public class Consult {
    @Id
    @Column(name = "consult_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer consultId;

    @Column(name = "consult_user_id")
    private Integer consultUserId;

    @Column(name = "consult_user_name")
    private String consultUserName;

    @Column(name = "consult_user_mobile")
    private String consultUserMobile;

    @Column(name = "consult_time")
    private Date consultTime;

    private Boolean reply;

    @Column(name = "reply_user_id")
    private Integer replyUserId;

    @Column(name = "reply_time")
    private Date replyTime;

    @Column(name = "create_time")
    private Date createTime;

    @Column(name = "modify_time")
    private Date modifyTime;

    @Column(name = "consult_content")
    private String consultContent;

    @Column(name = "reply_content")
    private String replyContent;

    /**
     * @return consult_id
     */
    public Integer getConsultId() {
        return consultId;
    }

    /**
     * @param consultId
     */
    public void setConsultId(Integer consultId) {
        this.consultId = consultId;
    }

    /**
     * @return consult_user_id
     */
    public Integer getConsultUserId() {
        return consultUserId;
    }

    /**
     * @param consultUserId
     */
    public void setConsultUserId(Integer consultUserId) {
        this.consultUserId = consultUserId;
    }

    /**
     * @return consult_user_name
     */
    public String getConsultUserName() {
        return consultUserName;
    }

    /**
     * @param consultUserName
     */
    public void setConsultUserName(String consultUserName) {
        this.consultUserName = consultUserName;
    }

    /**
     * @return consult_user_mobile
     */
    public String getConsultUserMobile() {
        return consultUserMobile;
    }

    /**
     * @param consultUserMobile
     */
    public void setConsultUserMobile(String consultUserMobile) {
        this.consultUserMobile = consultUserMobile;
    }

    /**
     * @return consult_time
     */
    public Date getConsultTime() {
        return consultTime;
    }

    /**
     * @param consultTime
     */
    public void setConsultTime(Date consultTime) {
        this.consultTime = consultTime;
    }

    /**
     * @return reply
     */
    public Boolean getReply() {
        return reply;
    }

    /**
     * @param reply
     */
    public void setReply(Boolean reply) {
        this.reply = reply;
    }

    /**
     * @return reply_user_id
     */
    public Integer getReplyUserId() {
        return replyUserId;
    }

    /**
     * @param replyUserId
     */
    public void setReplyUserId(Integer replyUserId) {
        this.replyUserId = replyUserId;
    }

    /**
     * @return reply_time
     */
    public Date getReplyTime() {
        return replyTime;
    }

    /**
     * @param replyTime
     */
    public void setReplyTime(Date replyTime) {
        this.replyTime = replyTime;
    }

    /**
     * @return create_time
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * @param createTime
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    /**
     * @return modify_time
     */
    public Date getModifyTime() {
        return modifyTime;
    }

    /**
     * @param modifyTime
     */
    public void setModifyTime(Date modifyTime) {
        this.modifyTime = modifyTime;
    }

    /**
     * @return consult_content
     */
    public String getConsultContent() {
        return consultContent;
    }

    /**
     * @param consultContent
     */
    public void setConsultContent(String consultContent) {
        this.consultContent = consultContent;
    }

    /**
     * @return reply_content
     */
    public String getReplyContent() {
        return replyContent;
    }

    /**
     * @param replyContent
     */
    public void setReplyContent(String replyContent) {
        this.replyContent = replyContent;
    }
}