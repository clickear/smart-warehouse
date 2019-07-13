package com.deer.wms.system.manage.model.user;

import java.util.Date;
import javax.persistence.*;

@Table(name = "user_info")
public class UserInfo {
    /**
     * 用户信息id
     */
    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    /**
     * 企业信息id
     */
    @Column(name = "company_id")
    private Integer companyId;

    /**
     * 登录帐号
     */
    private String account;

    /**
     * 登录密码
     */
    private String password;

    /**
     * 密码盐值
     */
    private String salt;

    /**
     * 姓名
     */
    @Column(name = "user_name")
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
    @Column(name = "icon_url")
    private String iconUrl;

    /**
     * 是否管理员：0=否；1=是；
     */
    @Column(name = "is_admin")
    private Boolean admin;

    /**
     * 账户状态：enable=启用；disable=停用；默认启用
     */
    @Column(name = "account_status")
    private String accountStatus;

    /**
     * 信息状态：normal=正常的；invalid=无效的；deleted=已删除；默认正常的
     */
    private String state;

    /**
     * 创建人：如果为-1表示系统初始化
     */
    @Column(name = "create_user_id")
    private Integer createUserId;

    /**
     * 创建时间
     */
    @Column(name = "create_time")
    private Date createTime;

    /**
     * 修改人
     */
    @Column(name = "modify_user_id")
    private Integer modifyUserId;

    /**
     * 修改时间
     */
    @Column(name = "modify_time")
    private Date modifyTime;

    /**
     * 获取用户信息id
     *
     * @return user_id - 用户信息id
     */
    public Integer getUserId() {
        return userId;
    }

    /**
     * 设置用户信息id
     *
     * @param userId 用户信息id
     */
    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    /**
     * 获取企业信息id
     *
     * @return company_id - 企业信息id
     */
    public Integer getCompanyId() {
        return companyId;
    }

    /**
     * 设置企业信息id
     *
     * @param companyId 企业信息id
     */
    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    /**
     * 获取登录帐号
     *
     * @return account - 登录帐号
     */
    public String getAccount() {
        return account;
    }

    /**
     * 设置登录帐号
     *
     * @param account 登录帐号
     */
    public void setAccount(String account) {
        this.account = account;
    }

    /**
     * 获取登录密码
     *
     * @return password - 登录密码
     */
    public String getPassword() {
        return password;
    }

    /**
     * 设置登录密码
     *
     * @param password 登录密码
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * 获取密码盐值
     *
     * @return salt - 密码盐值
     */
    public String getSalt() {
        return salt;
    }

    /**
     * 设置密码盐值
     *
     * @param salt 密码盐值
     */
    public void setSalt(String salt) {
        this.salt = salt;
    }

    /**
     * 获取姓名
     *
     * @return user_name - 姓名
     */
    public String getUserName() {
        return userName;
    }

    /**
     * 设置姓名
     *
     * @param userName 姓名
     */
    public void setUserName(String userName) {
        this.userName = userName;
    }

    /**
     * 获取性别：1=先生；2=女士；
     *
     * @return gender - 性别：1=先生；2=女士；
     */
    public Integer getGender() {
        return gender;
    }

    /**
     * 设置性别：1=先生；2=女士；
     *
     * @param gender 性别：1=先生；2=女士；
     */
    public void setGender(Integer gender) {
        this.gender = gender;
    }

    /**
     * 获取手机号码
     *
     * @return mobile - 手机号码
     */
    public String getMobile() {
        return mobile;
    }

    /**
     * 设置手机号码
     *
     * @param mobile 手机号码
     */
    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    /**
     * 获取电子邮箱
     *
     * @return email - 电子邮箱
     */
    public String getEmail() {
        return email;
    }

    /**
     * 设置电子邮箱
     *
     * @param email 电子邮箱
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * 获取头像地址
     *
     * @return icon_url - 头像地址
     */
    public String getIconUrl() {
        return iconUrl;
    }

    /**
     * 设置头像地址
     *
     * @param iconUrl 头像地址
     */
    public void setIconUrl(String iconUrl) {
        this.iconUrl = iconUrl;
    }

    public Boolean getAdmin() {
        return admin;
    }

    public void setAdmin(Boolean admin) {
        this.admin = admin;
    }

    /**
     * 获取账户状态：enable=启用；disable=停用；默认启用
     *
     * @return account_status - 账户状态：enable=启用；disable=停用；默认启用
     */
    public String getAccountStatus() {
        return accountStatus;
    }

    /**
     * 设置账户状态：enable=启用；disable=停用；默认启用
     *
     * @param accountStatus 账户状态：enable=启用；disable=停用；默认启用
     */
    public void setAccountStatus(String accountStatus) {
        this.accountStatus = accountStatus;
    }

    /**
     * 获取信息状态：normal=正常的；invalid=无效的；deleted=已删除；默认正常的
     *
     * @return state - 信息状态：normal=正常的；invalid=无效的；deleted=已删除；默认正常的
     */
    public String getState() {
        return state;
    }

    /**
     * 设置信息状态：normal=正常的；invalid=无效的；deleted=已删除；默认正常的
     *
     * @param state 信息状态：normal=正常的；invalid=无效的；deleted=已删除；默认正常的
     */
    public void setState(String state) {
        this.state = state;
    }

    /**
     * 获取创建人：如果为-1表示系统初始化
     *
     * @return create_user_id - 创建人：如果为-1表示系统初始化
     */
    public Integer getCreateUserId() {
        return createUserId;
    }

    /**
     * 设置创建人：如果为-1表示系统初始化
     *
     * @param createUserId 创建人：如果为-1表示系统初始化
     */
    public void setCreateUserId(Integer createUserId) {
        this.createUserId = createUserId;
    }

    /**
     * 获取创建时间
     *
     * @return create_time - 创建时间
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * 设置创建时间
     *
     * @param createTime 创建时间
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    /**
     * 获取修改人
     *
     * @return modify_user_id - 修改人
     */
    public Integer getModifyUserId() {
        return modifyUserId;
    }

    /**
     * 设置修改人
     *
     * @param modifyUserId 修改人
     */
    public void setModifyUserId(Integer modifyUserId) {
        this.modifyUserId = modifyUserId;
    }

    /**
     * 获取修改时间
     *
     * @return modify_time - 修改时间
     */
    public Date getModifyTime() {
        return modifyTime;
    }

    /**
     * 设置修改时间
     *
     * @param modifyTime 修改时间
     */
    public void setModifyTime(Date modifyTime) {
        this.modifyTime = modifyTime;
    }
}