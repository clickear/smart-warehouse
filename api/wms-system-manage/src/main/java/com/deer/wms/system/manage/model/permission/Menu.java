package com.deer.wms.system.manage.model.permission;

/**
 * 权限菜单信息类
 *
 * Created by Floki on 2017/11/6.
 */
public class Menu {
    /**
     * 菜单id
     */
    private Integer id;

    /**
     * 父级菜单id
     */
    private Integer parentId;

    /**
     * 菜单代码
     */
    private String code;

    /**
     * 菜单名称
     */
    private String name;

    /**
     * 图标
     */
    private String icon;

    /**
     * 样式
     */
    private String style;

    /**
     * 菜单路径
     */
    private String url;

    /**
     * 菜单层级
     */
    private Integer level;

    /**
     * group
     */
    private Integer group;

    public Integer getGroup() {
        return group;
    }

    public void setGroup(Integer group) {
        this.group = group;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
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

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getStyle() {
        return style;
    }

    public void setStyle(String style) {
        this.style = style;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }
}