package com.deer.wms.system.manage.model.param;

/**
 * 告警参数列表视图类
 *
 * Created by Floki on 2017/10/6.
 */
public class ParamAlarmListVO extends ParamMessageListVO {
    /**
     * 创建人姓名
     */
    private String createUserName;

    /**
     * 创建时间
     */
    private String createTime;

    /**
     * 告警参数动作信息id
     */
    private Integer alarmParamId;

    public String getCreateUserName() {
        return createUserName;
    }

    public void setCreateUserName(String createUserName) {
        this.createUserName = createUserName;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public Integer getAlarmParamId() {
        return alarmParamId;
    }

    public void setAlarmParamId(Integer alarmParamId) {
        this.alarmParamId = alarmParamId;
    }
}
