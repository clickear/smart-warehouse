package com.deer.wms.operation.model;

import java.util.Date;
import javax.persistence.*;

@Table(name = "order_master")
public class OrderMaster {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    /**
     * 采购单号
     */
    @Column(name = "order_no")
    private String orderNo;

    /**
     * 订单总额
     */
    @Column(name = "order_total")
    private Integer orderTotal;

    /**
     * 供应商地址
     */
    @Column(name = "supplier_site")
    private String supplierSite;

    /**
     * 供应商编码
     */
    @Column(name = "supplier_code")
    private String supplierCode;

    /**
     * 制单人
     */
    private String adder;

    /**
     * 1-初始化 2-审核；3-采购 4-采购中 5-完成
     */
    private Integer state;

    /**
     * 联系人
     */
    @Column(name = "supplier_contacts")
    private String supplierContacts;

    /**
     * 联系电话
     */
    @Column(name = "supplier_phone")
    private Integer supplierPhone;

    @Column(name = "add_time")
    private String addTime;

    /**
     * 审核时间
     */
    @Column(name = "check_time")
    private Date checkTime;

    /**
     * 审核人
     */
    private String checker;

    @Column(name = "company_id")
    private Integer companyId;

    /**
     * 备注
     */
    private String memo;

    /**
     * @return id
     */
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    /**
     * 获取采购单号
     *
     * @return order_no - 采购单号
     */
    public String getOrderNo() {
        return orderNo;
    }

    /**
     * 设置采购单号
     *
     * @param orderNo 采购单号
     */
    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    /**
     * 获取订单总额
     *
     * @return order_total - 订单总额
     */
    public Integer getOrderTotal() {
        return orderTotal;
    }

    /**
     * 设置订单总额
     *
     * @param orderTotal 订单总额
     */
    public void setOrderTotal(Integer orderTotal) {
        this.orderTotal = orderTotal;
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
     * 获取制单人
     *
     * @return adder - 制单人
     */
    public String getAdder() {
        return adder;
    }

    /**
     * 设置制单人
     *
     * @param adder 制单人
     */
    public void setAdder(String adder) {
        this.adder = adder;
    }

    /**
     * 获取1-初始化 2-审核；3-采购 4-采购中 5-完成
     *
     * @return state - 1-初始化 2-审核；3-采购 4-采购中 5-完成
     */
    public Integer getState() {
        return state;
    }

    /**
     * 设置1-初始化 2-审核；3-采购 4-采购中 5-完成
     *
     * @param state 1-初始化 2-审核；3-采购 4-采购中 5-完成
     */
    public void setState(Integer state) {
        this.state = state;
    }

    /**
     * 获取联系人
     *
     * @return supplier_contacts - 联系人
     */
    public String getSupplierContacts() {
        return supplierContacts;
    }

    /**
     * 设置联系人
     *
     * @param supplierContacts 联系人
     */
    public void setSupplierContacts(String supplierContacts) {
        this.supplierContacts = supplierContacts;
    }

    /**
     * 获取联系电话
     *
     * @return supplier_phone - 联系电话
     */
    public Integer getSupplierPhone() {
        return supplierPhone;
    }

    /**
     * 设置联系电话
     *
     * @param supplierPhone 联系电话
     */
    public void setSupplierPhone(Integer supplierPhone) {
        this.supplierPhone = supplierPhone;
    }

    /**
     * @return add_time
     */
    public String getAddTime() {
        return addTime;
    }

    /**
     * @param addTime
     */
    public void setAddTime(String addTime) {
        this.addTime = addTime;
    }

    /**
     * 获取审核时间
     *
     * @return check_time - 审核时间
     */
    public Date getCheckTime() {
        return checkTime;
    }

    /**
     * 设置审核时间
     *
     * @param checkTime 审核时间
     */
    public void setCheckTime(Date checkTime) {
        this.checkTime = checkTime;
    }

    /**
     * 获取审核人
     *
     * @return checker - 审核人
     */
    public String getChecker() {
        return checker;
    }

    /**
     * 设置审核人
     *
     * @param checker 审核人
     */
    public void setChecker(String checker) {
        this.checker = checker;
    }

    /**
     * @return company_id
     */
    public Integer getCompanyId() {
        return companyId;
    }

    /**
     * @param companyId
     */
    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
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
}