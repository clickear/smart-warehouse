package com.deer.wms.system.manage.model.param;

/**
 * 修改告警参数的信息类
 *
 * Created by Floki on 2017/10/6.
 */
public class AlarmParamModify extends AlarmParamCreate {
    /**
     * 告警参数动作信息id
     */
    private Integer alarmParamId;

    /**
     * 参数信息id
     */
    private Integer paramId;

    public Integer getAlarmParamId() {
        return alarmParamId;
    }

    public void setAlarmParamId(Integer alarmParamId) {
        this.alarmParamId = alarmParamId;
    }

    public Integer getParamId() {
        return paramId;
    }

    public void setParamId(Integer paramId) {
        this.paramId = paramId;
    }
}
