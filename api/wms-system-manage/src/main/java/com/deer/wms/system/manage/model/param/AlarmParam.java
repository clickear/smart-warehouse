package com.deer.wms.system.manage.model.param;

import javax.persistence.*;

@Table(name = "alarm_param")
public class AlarmParam {
    /**
     * 参数动作信息id
     */
    @Id
    @Column(name = "alarm_param_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer alarmParamId;

    /**
     * 消息参数信息id
     */
    @Column(name = "param_id")
    private Integer paramId;

    /**
     * 参数代码
     */
    @Column(name = "param_code")
    private String paramCode;

    /**
     * 告警动作：1=到货确认；2=在途运输；
     */
    private Integer action;

    /**
     * 告警参数：3=确认地址与到货地址不一致；4=到货确认人与下单人不一致；5=超出地理围栏；
     */
    @Column(name = "alarm_param")
    private Integer alarmParam;

    /**
     * 告警时是否获取终端位置：0=否；1=是；
     */
    @Column(name = "terminal_position")
    private Boolean terminalPosition;

    /**
     * 获取参数动作信息id
     *
     * @return alarm_param_id - 参数动作信息id
     */
    public Integer getAlarmParamId() {
        return alarmParamId;
    }

    /**
     * 设置参数动作信息id
     *
     * @param alarmParamId 参数动作信息id
     */
    public void setAlarmParamId(Integer alarmParamId) {
        this.alarmParamId = alarmParamId;
    }

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
     * 获取告警动作：1=到货确认；2=在途运输；
     *
     * @return action - 告警动作：1=到货确认；2=在途运输；
     */
    public Integer getAction() {
        return action;
    }

    /**
     * 设置告警动作：1=到货确认；2=在途运输；
     *
     * @param action 告警动作：1=到货确认；2=在途运输；
     */
    public void setAction(Integer action) {
        this.action = action;
    }

    /**
     * 获取告警参数：3=确认地址与到货地址不一致；4=到货确认人与下单人不一致；5=超出地理围栏；
     *
     * @return alarm_param - 告警参数：3=确认地址与到货地址不一致；4=到货确认人与下单人不一致；5=超出地理围栏；
     */
    public Integer getAlarmParam() {
        return alarmParam;
    }

    /**
     * 设置告警参数：3=确认地址与到货地址不一致；4=到货确认人与下单人不一致；5=超出地理围栏；
     *
     * @param alarmParam 告警参数：3=确认地址与到货地址不一致；4=到货确认人与下单人不一致；5=超出地理围栏；
     */
    public void setAlarmParam(Integer alarmParam) {
        this.alarmParam = alarmParam;
    }

    /**
     * 获取告警时是否获取终端位置：0=否；1=是；
     *
     * @return terminal_position - 告警时是否获取终端位置：0=否；1=是；
     */
    public Boolean getTerminalPosition() {
        return terminalPosition;
    }

    /**
     * 设置告警时是否获取终端位置：0=否；1=是；
     *
     * @param terminalPosition 告警时是否获取终端位置：0=否；1=是；
     */
    public void setTerminalPosition(Boolean terminalPosition) {
        this.terminalPosition = terminalPosition;
    }
}