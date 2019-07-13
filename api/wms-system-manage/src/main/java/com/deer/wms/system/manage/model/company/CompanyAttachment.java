package com.deer.wms.system.manage.model.company;

import java.util.Date;
import javax.persistence.*;

@Table(name = "company_attachment")
public class CompanyAttachment {
    /**
     * 附件信息id
     */
    @Id
    @Column(name = "attachment_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer attachmentId;

    /**
     * 企业信息id
     */
    @Column(name = "company_id")
    private Integer companyId;

    /**
     * 附件保存路径
     */
    @Column(name = "save_path")
    private String savePath;

    /**
     * 附件访问路径
     */
    private String url;

    /**
     * 附件大小，单位：kb
     */
    private Long size;

    /**
     * 附件类型：1=缩略图；2=原始图；
     */
    @Column(name = "attachment_type")
    private Integer attachmentType;

    /**
     * 附件类别：1=营业执照；2=法人身份证正面照；-2=法人身份证反面照；
     */
    private Integer category;

    /**
     * 信息状态：normal=正常的；invalid=无效的；deleted=已删除；默认正常的
     */
    private String state;

    /**
     * 创建人
     */
    @Column(name = "create_user_id")
    private Integer createUserId;

    /**
     * 创建时间
     */
    @Column(name = "create_time")
    private Date createTime;

    /**
     * 修改人
     */
    @Column(name = "modify_user_id")
    private Integer modifyUserId;

    /**
     * 修改时间
     */
    @Column(name = "modify_time")
    private Date modifyTime;

    /**
     * 获取附件信息id
     *
     * @return attachment_id - 附件信息id
     */
    public Integer getAttachmentId() {
        return attachmentId;
    }

    /**
     * 设置附件信息id
     *
     * @param attachmentId 附件信息id
     */
    public void setAttachmentId(Integer attachmentId) {
        this.attachmentId = attachmentId;
    }

    /**
     * 获取企业信息id
     *
     * @return company_id - 企业信息id
     */
    public Integer getCompanyId() {
        return companyId;
    }

    /**
     * 设置企业信息id
     *
     * @param companyId 企业信息id
     */
    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    /**
     * 获取附件保存路径
     *
     * @return save_path - 附件保存路径
     */
    public String getSavePath() {
        return savePath;
    }

    /**
     * 设置附件保存路径
     *
     * @param savePath 附件保存路径
     */
    public void setSavePath(String savePath) {
        this.savePath = savePath;
    }

    /**
     * 获取附件访问路径
     *
     * @return url - 附件访问路径
     */
    public String getUrl() {
        return url;
    }

    /**
     * 设置附件访问路径
     *
     * @param url 附件访问路径
     */
    public void setUrl(String url) {
        this.url = url;
    }

    /**
     * 获取附件大小，单位：kb
     *
     * @return size - 附件大小，单位：kb
     */
    public Long getSize() {
        return size;
    }

    /**
     * 设置附件大小，单位：kb
     *
     * @param size 附件大小，单位：kb
     */
    public void setSize(Long size) {
        this.size = size;
    }

    /**
     * 获取附件类型：1=缩略图；2=原始图；
     *
     * @return attachment_type - 附件类型：1=缩略图；2=原始图；
     */
    public Integer getAttachmentType() {
        return attachmentType;
    }

    /**
     * 设置附件类型：1=缩略图；2=原始图；
     *
     * @param attachmentType 附件类型：1=缩略图；2=原始图；
     */
    public void setAttachmentType(Integer attachmentType) {
        this.attachmentType = attachmentType;
    }

    /**
     * 获取附件类别：1=营业执照；2=法人身份证正面照；-2=法人身份证反面照；
     *
     * @return category - 附件类别：1=营业执照；2=法人身份证正面照；-2=法人身份证反面照；
     */
    public Integer getCategory() {
        return category;
    }

    /**
     * 设置附件类别：1=营业执照；2=法人身份证正面照；-2=法人身份证反面照；
     *
     * @param category 附件类别：1=营业执照；2=法人身份证正面照；-2=法人身份证反面照；
     */
    public void setCategory(Integer category) {
        this.category = category;
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
     * 获取创建人
     *
     * @return create_user_id - 创建人
     */
    public Integer getCreateUserId() {
        return createUserId;
    }

    /**
     * 设置创建人
     *
     * @param createUserId 创建人
     */
    public void setCreateUserId(Integer createUserId) {
        this.createUserId = createUserId;
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
     * 获取修改人
     *
     * @return modify_user_id - 修改人
     */
    public Integer getModifyUserId() {
        return modifyUserId;
    }

    /**
     * 设置修改人
     *
     * @param modifyUserId 修改人
     */
    public void setModifyUserId(Integer modifyUserId) {
        this.modifyUserId = modifyUserId;
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