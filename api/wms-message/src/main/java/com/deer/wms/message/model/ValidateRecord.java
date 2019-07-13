package com.deer.wms.message.model;

import java.util.Date;
import javax.persistence.*;

@Table(name = "validate_record")
public class ValidateRecord {
    /**
     * 记录信息id
     */
    @Id
    @Column(name = "record_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recordId;

    /**
     * 业务类型：1=用户注册；2=找回密码；
     */
    @Column(name = "business_type")
    private String businessType;

    /**
     * 接收类型：1=手机号码；2=电子邮箱；
     */
    @Column(name = "receive_type")
    private String receiveType;

    /**
     * 接收对象
     */
    @Column(name = "receive_object")
    private String receiveObject;

    /**
     * 验证码
     */
    @Column(name = "validate_code")
    private String validateCode;

    /**
     * 生成时间
     */
    @Column(name = "generate_time")
    private Date generateTime;

    /**
     * 失效时间
     */
    @Column(name = "invalid_time")
    private Date invalidTime;

    /**
     * 验证时间
     */
    @Column(name = "validate_time")
    private Date validateTime;

    /**
     * 信息状态：normal=正常的；invalid=无效的；deleted=已删除；默认正常的
     */
    private String state;

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
     * 获取记录信息id
     *
     * @return record_id - 记录信息id
     */
    public Long getRecordId() {
        return recordId;
    }

    /**
     * 设置记录信息id
     *
     * @param recordId 记录信息id
     */
    public void setRecordId(Long recordId) {
        this.recordId = recordId;
    }

    /**
     * 获取业务类型：1=用户注册；2=找回密码；
     *
     * @return business_type - 业务类型：1=用户注册；2=找回密码；
     */
    public String getBusinessType() {
        return businessType;
    }

    /**
     * 设置业务类型：1=用户注册；2=找回密码；
     *
     * @param businessType 业务类型：1=用户注册；2=找回密码；
     */
    public void setBusinessType(String businessType) {
        this.businessType = businessType;
    }

    /**
     * 获取接收类型：1=手机号码；2=电子邮箱；
     *
     * @return receive_type - 接收类型：1=手机号码；2=电子邮箱；
     */
    public String getReceiveType() {
        return receiveType;
    }

    /**
     * 设置接收类型：1=手机号码；2=电子邮箱；
     *
     * @param receiveType 接收类型：1=手机号码；2=电子邮箱；
     */
    public void setReceiveType(String receiveType) {
        this.receiveType = receiveType;
    }

    /**
     * 获取接收对象
     *
     * @return receive_object - 接收对象
     */
    public String getReceiveObject() {
        return receiveObject;
    }

    /**
     * 设置接收对象
     *
     * @param receiveObject 接收对象
     */
    public void setReceiveObject(String receiveObject) {
        this.receiveObject = receiveObject;
    }

    /**
     * 获取验证码
     *
     * @return validate_code - 验证码
     */
    public String getValidateCode() {
        return validateCode;
    }

    /**
     * 设置验证码
     *
     * @param validateCode 验证码
     */
    public void setValidateCode(String validateCode) {
        this.validateCode = validateCode;
    }

    /**
     * 获取生成时间
     *
     * @return generate_time - 生成时间
     */
    public Date getGenerateTime() {
        return generateTime;
    }

    /**
     * 设置生成时间
     *
     * @param generateTime 生成时间
     */
    public void setGenerateTime(Date generateTime) {
        this.generateTime = generateTime;
    }

    /**
     * 获取失效时间
     *
     * @return invalid_time - 失效时间
     */
    public Date getInvalidTime() {
        return invalidTime;
    }

    /**
     * 设置失效时间
     *
     * @param invalidTime 失效时间
     */
    public void setInvalidTime(Date invalidTime) {
        this.invalidTime = invalidTime;
    }

    /**
     * 获取验证时间
     *
     * @return validate_time - 验证时间
     */
    public Date getValidateTime() {
        return validateTime;
    }

    /**
     * 设置验证时间
     *
     * @param validateTime 验证时间
     */
    public void setValidateTime(Date validateTime) {
        this.validateTime = validateTime;
    }

    /**
     * 获取信息状态：normal=正常的；invalid=无效的；deleted=已删除；默认正常的
     *
     * @return state - 信息状态：normal=正常的；invalid=无效的；deleted=已删除；默认正常的
     */
    public String getState() {
        return state;
    }

    /**
     * 设置信息状态：normal=正常的；invalid=无效的；deleted=已删除；默认正常的
     *
     * @param state 信息状态：normal=正常的；invalid=无效的；deleted=已删除；默认正常的
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
}