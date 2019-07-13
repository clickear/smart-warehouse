package com.deer.wms.system.manage.model.param;

/**
 * 系统消息参数信息列表视图类
 *
 * Created by Floki on 2017/10/2.
 */
public class ParamMessageListVO {
    /**
     * 参数id
     */
    private Integer paramId;

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

    public Integer getParamId() {
        return paramId;
    }

    public void setParamId(Integer paramId) {
        this.paramId = paramId;
    }

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
}
