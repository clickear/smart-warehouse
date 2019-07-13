package com.deer.wms.device.manage.model;

import javax.persistence.*;

@Table(name = "check_content")
public class CheckContent {
    @Id
    @Column(name = "check_content_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer checkContentId;

    @Column(name = "check_project_id")
    private Integer checkProjectId;

    @Column(name = "check_content_name")
    private String checkContentName;

    /**
     * 步骤
     */
    private String step;

    /**
     * 标准
     */
    private String standard;

    /**
     * 备注
     */
    private String memo;

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
     * @return check_content_name
     */
    public String getCheckContentName() {
        return checkContentName;
    }

    /**
     * @param checkContentName
     */
    public void setCheckContentName(String checkContentName) {
        this.checkContentName = checkContentName;
    }

    /**
     * 获取步骤
     *
     * @return step - 步骤
     */
    public String getStep() {
        return step;
    }

    /**
     * 设置步骤
     *
     * @param step 步骤
     */
    public void setStep(String step) {
        this.step = step;
    }

    /**
     * 获取标准
     *
     * @return standard - 标准
     */
    public String getStandard() {
        return standard;
    }

    /**
     * 设置标准
     *
     * @param standard 标准
     */
    public void setStandard(String standard) {
        this.standard = standard;
    }

    /**
     * 获取备注
     *
     * @return memo - 备注
     */
    public String getMemo() {
        return memo;
    }

    /**
     * 设置备注
     *
     * @param memo 备注
     */
    public void setMemo(String memo) {
        this.memo = memo;
    }
}