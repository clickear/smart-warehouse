package com.deer.wms.system.manage.model.param;

import java.util.Date;
import javax.persistence.*;

@Table(name = "system_param")
public class SystemParam {
    /**
     * 消息参数信息id
     */
    @Id
    @Column(name = "param_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer paramId;

    /**
     * 参数名称
     */
    @Column(name = "param_name")
    private String paramName;

    /**
     * 参数代码
     */
    @Column(name = "param_code")
    private String paramCode;

    /**
     * 参数类型：消息参数；告警参数；
     */
    @Column(name = "param_type")
    private Integer paramType;

    /**
     * 参数描述
     */
    @Column(name = "param_describe")
    private String paramDescribe;

    /**
     * 排序号
     */
    @Column(name = "sort_number")
    private Integer sortNumber;

    /**
     * 信息状态：normal=正常的；invalid=无效的；deleted=已删除；默认正常的
     */
    private String state;

    /**
     * 创建人：如果为-1表示系统初始化
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
     * 获取消息参数信息id
     *
     * @return param_id - 消息参数信息id
     */
    public Integer getParamId() {
        return paramId;
    }

    /**
     * 设置消息参数信息id
     *
     * @param paramId 消息参数信息id
     */
    public void setParamId(Integer paramId) {
        this.paramId = paramId;
    }

    /**
     * 获取参数名称
     *
     * @return param_name - 参数名称
     */
    public String getParamName() {
        return paramName;
    }

    /**
     * 设置参数名称
     *
     * @param paramName 参数名称
     */
    public void setParamName(String paramName) {
        this.paramName = paramName;
    }

    /**
     * 获取参数代码
     *
     * @return param_code - 参数代码
     */
    public String getParamCode() {
        return paramCode;
    }

    /**
     * 设置参数代码
     *
     * @param paramCode 参数代码
     */
    public void setParamCode(String paramCode) {
        this.paramCode = paramCode;
    }

    /**
     * 获取参数类型：消息参数；告警参数；
     *
     * @return param_type - 参数类型：消息参数；告警参数；
     */
    public Integer getParamType() {
        return paramType;
    }

    /**
     * 设置参数类型：消息参数；告警参数；
     *
     * @param paramType 参数类型：消息参数；告警参数；
     */
    public void setParamType(Integer paramType) {
        this.paramType = paramType;
    }

    /**
     * 获取参数描述
     *
     * @return param_describe - 参数描述
     */
    public String getParamDescribe() {
        return paramDescribe;
    }

    /**
     * 设置参数描述
     *
     * @param paramDescribe 参数描述
     */
    public void setParamDescribe(String paramDescribe) {
        this.paramDescribe = paramDescribe;
    }

    /**
     * 获取排序号
     *
     * @return sort_number - 排序号
     */
    public Integer getSortNumber() {
        return sortNumber;
    }

    /**
     * 设置排序号
     *
     * @param sortNumber 排序号
     */
    public void setSortNumber(Integer sortNumber) {
        this.sortNumber = sortNumber;
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
     * 获取创建人：如果为-1表示系统初始化
     *
     * @return create_user_id - 创建人：如果为-1表示系统初始化
     */
    public Integer getCreateUserId() {
        return createUserId;
    }

    /**
     * 设置创建人：如果为-1表示系统初始化
     *
     * @param createUserId 创建人：如果为-1表示系统初始化
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