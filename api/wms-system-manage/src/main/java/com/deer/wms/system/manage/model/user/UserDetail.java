package com.deer.wms.system.manage.model.user;

import com.deer.wms.system.manage.model.permission.Menu;

import java.util.List;

/**
 * 用户登录成功以后，返回的用户信息详情。
 *
 * Created by Floki on 2017/10/2.
 */
public class UserDetail {
    /**
     * 访问系统以及相关api接口的token
     */
    private String token;

    /**
     * 用户id
     */
    private Integer userId;

    /**
     * 用户姓名
     */
    private String userName;

    /**
     * 性别：1=先生；2=女士；
     */
    private Integer gender;

    /**
     * 手机号码
     */
    private String mobile;

    /**
     * 电子邮箱
     */
    private String email;

    /**
     * 头像地址
     */
    private String iconUrl;

    /**
     * 公司id
     */
    private Integer companyId;

    /**
     * 公司类型： -1=托盘运营商；1=托盘生产商；2=投资商；3=运营代理商；4=托盘承租方；5=POI；
     */
    private Integer companyType;

    /**
     * 公司名称
     */
    private String companyName;

    /**
     * 公司地址
     */
    private String linkmanAddress;

    /**
     * 公司电话
     */
    private String linkmanPhone;

    /**
     * 账户角色id
     */
    private Integer roleId;

    /**
     * 账户角色名称
     */
    private String roleName;

    /**
     * 权限范围内的页面路径信息列表
     */
    private List<String> urls;

    /**
     * 权限范围内的操作代码数组
     */
    private List<String> permission;

    /**
     * 权限范围内的菜单信息
     */
    private List<Menu> menus;

    /**
     * 权限范围内的菜单信息
     */
    private List<Menu> menus1;
    /**
     * 权限范围内的菜单信息
     */
    private List<Menu> menus2;
    /**
     * 权限范围内的菜单信息
     */
    private List<Menu> menus3;

    public List<Menu> getMenus1() {
        return menus1;
    }

    public void setMenus1(List<Menu> menus1) {
        this.menus1 = menus1;
    }

    public List<Menu> getMenus2() {
        return menus2;
    }

    public void setMenus2(List<Menu> menus2) {
        this.menus2 = menus2;
    }

    public List<Menu> getMenus3() {
        return menus3;
    }

    public void setMenus3(List<Menu> menus3) {
        this.menus3 = menus3;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Integer getGender() {
        return gender;
    }

    public void setGender(Integer gender) {
        this.gender = gender;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getIconUrl() {
        return iconUrl;
    }

    public void setIconUrl(String iconUrl) {
        this.iconUrl = iconUrl;
    }

    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    public Integer getCompanyType() {
        return companyType;
    }

    public void setCompanyType(Integer companyType) {
        this.companyType = companyType;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getLinkmanAddress() {
        return linkmanAddress;
    }

    public void setLinkmanAddress(String linkmanAddress) {
        this.linkmanAddress = linkmanAddress;
    }

    public String getLinkmanPhone() {
        return linkmanPhone;
    }

    public void setLinkmanPhone(String linkmanPhone) {
        this.linkmanPhone = linkmanPhone;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public List<String> getUrls() {
        return urls;
    }

    public void setUrls(List<String> urls) {
        this.urls = urls;
    }

    public List<String> getPermission() {
        return permission;
    }

    public void setPermission(List<String> permission) {
        this.permission = permission;
    }

    public List<Menu> getMenus() {
        return menus;
    }

    public void setMenus(List<Menu> menus) {
        this.menus = menus;
    }
}
