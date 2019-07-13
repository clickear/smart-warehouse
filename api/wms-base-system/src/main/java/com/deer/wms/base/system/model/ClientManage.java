package com.deer.wms.base.system.model;

import java.util.Date;
import javax.persistence.*;

@Table(name = "client_manage")
public class ClientManage {
    /**
     * 客户ID
     */
    @Id
    @Column(name = "client_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer clientId;

    /**
     * 客户编码
     */
    @Column(name = "client_code")
    private String clientCode;

    /**
     * 客户名称
     */
    @Column(name = "client_name")
    private String clientName;

    /**
     * 客户地址
     */
    @Column(name = "client_site")
    private String clientSite;

    /**
     * 联系人
     */
    @Column(name = "client_contacts")
    private String clientContacts;

    /**
     * 联系电话
     */
    @Column(name = "contact_phone")
    private String contactPhone;

    /**
     * 备注
     */
    private String memo;

    /**
     * 邮箱
     */
    private String email;

    /**
     * 传真
     */
    private String fax;

    /**
     * 创建时间
     */
    @Column(name = "create_time")
    private String createTime;

    /**
     * 公司ID
     */
    @Column(name = "company_id")
    private Integer companyId;

    /**
     * 获取客户ID
     *
     * @return client_id - 客户ID
     */
    public Integer getClientId() {
        return clientId;
    }

    /**
     * 设置客户ID
     *
     * @param clientId 客户ID
     */
    public void setClientId(Integer clientId) {
        this.clientId = clientId;
    }

    /**
     * 获取客户编码
     *
     * @return client_code - 客户编码
     */
    public String getClientCode() {
        return clientCode;
    }

    /**
     * 设置客户编码
     *
     * @param clientCode 客户编码
     */
    public void setClientCode(String clientCode) {
        this.clientCode = clientCode;
    }

    /**
     * 获取客户名称
     *
     * @return client_name - 客户名称
     */
    public String getClientName() {
        return clientName;
    }

    /**
     * 设置客户名称
     *
     * @param clientName 客户名称
     */
    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    /**
     * 获取客户地址
     *
     * @return client_site - 客户地址
     */
    public String getClientSite() {
        return clientSite;
    }

    /**
     * 设置客户地址
     *
     * @param clientSite 客户地址
     */
    public void setClientSite(String clientSite) {
        this.clientSite = clientSite;
    }

    /**
     * 获取联系人
     *
     * @return client_contacts - 联系人
     */
    public String getClientContacts() {
        return clientContacts;
    }

    /**
     * 设置联系人
     *
     * @param clientContacts 联系人
     */
    public void setClientContacts(String clientContacts) {
        this.clientContacts = clientContacts;
    }

    /**
     * 获取联系电话
     *
     * @return contact_phone - 联系电话
     */
    public String getContactPhone() {
        return contactPhone;
    }

    /**
     * 设置联系电话
     *
     * @param contactPhone 联系电话
     */
    public void setContactPhone(String contactPhone) {
        this.contactPhone = contactPhone;
    }

    /**
     * 获取备注
     *
     * @return memo - 备注
     */
    public String getMemo() {
        return memo;
    }

    /**
     * 设置备注
     *
     * @param memo 备注
     */
    public void setMemo(String memo) {
        this.memo = memo;
    }

    /**
     * 获取邮箱
     *
     * @return email - 邮箱
     */
    public String getEmail() {
        return email;
    }

    /**
     * 设置邮箱
     *
     * @param email 邮箱
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * 获取传真
     *
     * @return fax - 传真
     */
    public String getFax() {
        return fax;
    }

    /**
     * 设置传真
     *
     * @param fax 传真
     */
    public void setFax(String fax) {
        this.fax = fax;
    }

    /**
     * 获取创建时间
     *
     * @return create_time - 创建时间
     */
    public String getCreateTime() {
        return createTime;
    }

    /**
     * 设置创建时间
     *
     * @param createTime 创建时间
     */
    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    /**
     * 获取公司ID
     *
     * @return company_id - 公司ID
     */
    public Integer getCompanyId() {
        return companyId;
    }

    /**
     * 设置公司ID
     *
     * @param companyId 公司ID
     */
    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }
}