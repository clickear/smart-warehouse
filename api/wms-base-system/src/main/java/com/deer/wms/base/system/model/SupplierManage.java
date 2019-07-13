package com.deer.wms.base.system.model;

import java.util.Date;
import javax.persistence.*;

@Table(name = "supplier_manage")
public class SupplierManage {
    /**
     * 供应商ID
     */
    @Id
    @Column(name = "supplier_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer supplierId;

    /**
     * 供应商编码
     */
    @Column(name = "supplier_code")
    private String supplierCode;

    /**
     * 供应商名字
     */
    @Column(name = "supplier_name")
    private String supplierName;

    /**
     * 供应商类型
     */
    @Column(name = "supplier_type")
    private String supplierType;

    /**
     * 供应商联系人
     */
    @Column(name = "supplier_contacts")
    private String supplierContacts;

    /**
     * 供应商联系电话
     */
    @Column(name = "supplier_phone")
    private String supplierPhone;

    /**
     * 供应商地址
     */
    @Column(name = "supplier_site")
    private String supplierSite;

    /**
     * 供应商邮箱
     */
    @Column(name = "supplier_email")
    private String supplierEmail;

    /**
     * 供应商传真
     */
    @Column(name = "supplier_fax")
    private String supplierFax;

    /**
     * 备注
     */
    private String memo;

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
     * 获取供应商ID
     *
     * @return supplier_id - 供应商ID
     */
    public Integer getSupplierId() {
        return supplierId;
    }

    /**
     * 设置供应商ID
     *
     * @param supplierId 供应商ID
     */
    public void setSupplierId(Integer supplierId) {
        this.supplierId = supplierId;
    }

    /**
     * 获取供应商编码
     *
     * @return supplier_code - 供应商编码
     */
    public String getSupplierCode() {
        return supplierCode;
    }

    /**
     * 设置供应商编码
     *
     * @param supplierCode 供应商编码
     */
    public void setSupplierCode(String supplierCode) {
        this.supplierCode = supplierCode;
    }

    /**
     * 获取供应商名字
     *
     * @return supplier_name - 供应商名字
     */
    public String getSupplierName() {
        return supplierName;
    }

    /**
     * 设置供应商名字
     *
     * @param supplierName 供应商名字
     */
    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }

    /**
     * 获取供应商类型
     *
     * @return supplier_type - 供应商类型
     */
    public String getSupplierType() {
        return supplierType;
    }

    /**
     * 设置供应商类型
     *
     * @param supplierType 供应商类型
     */
    public void setSupplierType(String supplierType) {
        this.supplierType = supplierType;
    }

    /**
     * 获取供应商联系人
     *
     * @return supplier_contacts - 供应商联系人
     */
    public String getSupplierContacts() {
        return supplierContacts;
    }

    /**
     * 设置供应商联系人
     *
     * @param supplierContacts 供应商联系人
     */
    public void setSupplierContacts(String supplierContacts) {
        this.supplierContacts = supplierContacts;
    }

    /**
     * 获取供应商联系电话
     *
     * @return supplier_phone - 供应商联系电话
     */
    public String getSupplierPhone() {
        return supplierPhone;
    }

    /**
     * 设置供应商联系电话
     *
     * @param supplierPhone 供应商联系电话
     */
    public void setSupplierPhone(String supplierPhone) {
        this.supplierPhone = supplierPhone;
    }

    /**
     * 获取供应商地址
     *
     * @return supplier_site - 供应商地址
     */
    public String getSupplierSite() {
        return supplierSite;
    }

    /**
     * 设置供应商地址
     *
     * @param supplierSite 供应商地址
     */
    public void setSupplierSite(String supplierSite) {
        this.supplierSite = supplierSite;
    }

    /**
     * 获取供应商邮箱
     *
     * @return supplier_email - 供应商邮箱
     */
    public String getSupplierEmail() {
        return supplierEmail;
    }

    /**
     * 设置供应商邮箱
     *
     * @param supplierEmail 供应商邮箱
     */
    public void setSupplierEmail(String supplierEmail) {
        this.supplierEmail = supplierEmail;
    }

    /**
     * 获取供应商传真
     *
     * @return supplier_fax - 供应商传真
     */
    public String getSupplierFax() {
        return supplierFax;
    }

    /**
     * 设置供应商传真
     *
     * @param supplierFax 供应商传真
     */
    public void setSupplierFax(String supplierFax) {
        this.supplierFax = supplierFax;
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