package com.deer.wms.system.manage.model.param;

/**
 * 创建告警参数的信息类
 *
 * Created by Floki on 2017/10/6.
 */
public class AlarmParamCreate {
    /**
     * 参数名称
     */
    private String paramName;

    /**
     * 参数描述
     */
    private String paramDescribe;

    /**
     * 参数状态
     */
    private String state;

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

    public String getParamName() {
        return paramName;
    }

    public void setParamName(String paramName) {
        this.paramName = paramName;
    }

    public String getParamDescribe() {
        return paramDescribe;
    }

    public void setParamDescribe(String paramDescribe) {
        this.paramDescribe = paramDescribe;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
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
