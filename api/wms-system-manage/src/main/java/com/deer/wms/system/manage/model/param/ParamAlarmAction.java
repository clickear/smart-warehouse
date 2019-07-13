package com.deer.wms.system.manage.model.param;

import java.util.List;

/**
 * 告警动作信息实体类。
 *
 * Created by Floki on 2017/10/6.
 */
public class ParamAlarmAction {
    /**
     * 动作id
     */
    private Integer actionId;

    /**
     * 动作名称
     */
    private String actionName;

    /**
     * 子级动作信息列表
     */
    private List<ParamAlarmAction> subActionList;

    public ParamAlarmAction() {

    }

    public ParamAlarmAction(Integer actionId, String actionName) {
        this.actionId = actionId;
        this.actionName = actionName;
    }

    public ParamAlarmAction(Integer actionId, String actionName, List<ParamAlarmAction> subActionList) {
        this(actionId, actionName);
        this.subActionList = subActionList;
    }

    public Integer getActionId() {
        return actionId;
    }

    public void setActionId(Integer actionId) {
        this.actionId = actionId;
    }

    public String getActionName() {
        return actionName;
    }

    public void setActionName(String actionName) {
        this.actionName = actionName;
    }

    public List<ParamAlarmAction> getSubActionList() {
        return subActionList;
    }

    public void setSubActionList(List<ParamAlarmAction> subActionList) {
        this.subActionList = subActionList;
    }
}
