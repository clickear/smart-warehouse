package com.deer.wms.system.manage.model.param;

/**
 * 告警参数详细信息
 *
 * Created by Floki on 2017/10/4.
 */
public class ParamAlarmDetail extends ParamMessageDetail {
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

    /**
     * 告警动作
     */
    private Integer action;

    /**
     * 告警参数
     */
    private Integer alarmParam;

    /**
     * 是否获取终端位置
     */
    private Boolean terminalPosition;

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

    public Integer getAction() {
        return action;
    }

    public void setAction(Integer action) {
        this.action = action;
    }

    public Integer getAlarmParam() {
        return alarmParam;
    }

    public void setAlarmParam(Integer alarmParam) {
        this.alarmParam = alarmParam;
    }

    public Boolean getTerminalPosition() {
        return terminalPosition;
    }

    public void setTerminalPosition(Boolean terminalPosition) {
        this.terminalPosition = terminalPosition;
    }
}
