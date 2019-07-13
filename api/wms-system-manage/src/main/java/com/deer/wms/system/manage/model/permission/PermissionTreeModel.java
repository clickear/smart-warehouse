package com.deer.wms.system.manage.model.permission;

/**
 * 权限树形结构模型
 *
 * Created by Floki on 2017/10/8.
 */
public class PermissionTreeModel {
    /**
     * 资源id
     */
    private Integer id;

    /**
     * 资源代码
     */
    private String code;

    /**
     * 资源名称
     */
    private String name;

    /**
     * 资源父级id
     */
    private Integer parentId;

    /**
     * 资源类型
     */
    private String type;

    /**
     * 是否有权限：false=没有权限；true=有权限；
     */
    private Boolean checked = false;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Boolean getChecked() {
        return checked;
    }

    public void setChecked(Boolean checked) {
        this.checked = checked;
    }
}
