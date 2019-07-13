package com.deer.wms.system.manage.model.permission;

/**
 * 操作按钮URL地址信息的模型类
 *
 * Created by Floki on 2017/10/11.
 */
public class PermissionUrl {
    /**
     * 资源代码
     */
    private String resourceCode;

    /**
     * 资源类型：M=模块；F=功能菜单；B=操作按钮；
     */
    private String resourceType;

    /**
     * 请求方法：GET、POST、PUT、DELETE等
     */
    private String method;

    /**
     * 操作按钮的类型：P=页面; I=接口；
     */
    private String urlType;

    /**
     * 操作按钮的URL地址
     */
    private String url;

    public String getResourceCode() {
        return resourceCode;
    }

    public void setResourceCode(String resourceCode) {
        this.resourceCode = resourceCode;
    }

    public String getResourceType() {
        return resourceType;
    }

    public void setResourceType(String resourceType) {
        this.resourceType = resourceType;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getUrlType() {
        return urlType;
    }

    public void setUrlType(String urlType) {
        this.urlType = urlType;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
