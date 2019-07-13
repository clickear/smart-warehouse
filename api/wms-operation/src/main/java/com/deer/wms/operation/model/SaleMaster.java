package com.deer.wms.operation.model;

import java.util.Date;
import javax.persistence.*;

@Table(name = "sale_master")
public class SaleMaster {
    /**
     * 销售管理
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * 销售合同号
     */
    @Column(name = "sale_no")
    private String saleNo;

    /**
     * 订单总额
     */
    @Column(name = "sale_total")
    private Integer saleTotal;

    /**
     * 客户地址
     */
    @Column(name = "client_site")
    private String clientSite;

    /**
     * 客户编号
     */
    @Column(name = "client_code")
    private String clientCode;

    /**
     * 联系电话
     */
    @Column(name = "contact_phone")
    private String contactPhone;

    /**
     * 联系人
     */
    @Column(name = "client_contacts")
    private String clientContacts;

    /**
     * 0-初始化；1-销售中；2-已销售；3-已完成
     */
    private Integer status;

    @Column(name = "add_time")
    private String addTime;

    @Column(name = "company_id")
    private Integer companyId;

    private String memo;

    @Column(name = "ware_code")
    private String wareCode;

    /**
     * 要求交期时间
     */
    @Column(name = "request_supply_time")
    private Date requestSupplyTime;

    /**
     * 发货时间
     */
    @Column(name = "transport_time")
    private Date transportTime;

    /**
     * 获取销售管理
     *
     * @return id - 销售管理
     */
    public Integer getId() {
        return id;
    }

    /**
     * 设置销售管理
     *
     * @param id 销售管理
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * 获取销售合同号
     *
     * @return sale_no - 销售合同号
     */
    public String getSaleNo() {
        return saleNo;
    }

    /**
     * 设置销售合同号
     *
     * @param saleNo 销售合同号
     */
    public void setSaleNo(String saleNo) {
        this.saleNo = saleNo;
    }

    /**
     * 获取订单总额
     *
     * @return sale_total - 订单总额
     */
    public Integer getSaleTotal() {
        return saleTotal;
    }

    /**
     * 设置订单总额
     *
     * @param saleTotal 订单总额
     */
    public void setSaleTotal(Integer saleTotal) {
        this.saleTotal = saleTotal;
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
     * 获取客户编号
     *
     * @return client_code - 客户编号
     */
    public String getClientCode() {
        return clientCode;
    }

    /**
     * 设置客户编号
     *
     * @param clientCode 客户编号
     */
    public void setClientCode(String clientCode) {
        this.clientCode = clientCode;
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
     * 获取0-初始化；1-销售中；2-已销售；3-已完成
     *
     * @return status - 0-初始化；1-销售中；2-已销售；3-已完成
     */
    public Integer getStatus() {
        return status;
    }

    /**
     * 设置0-初始化；1-销售中；2-已销售；3-已完成
     *
     * @param status 0-初始化；1-销售中；2-已销售；3-已完成
     */
    public void setStatus(Integer status) {
        this.status = status;
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
     * @return memo
     */
    public String getMemo() {
        return memo;
    }

    /**
     * @param memo
     */
    public void setMemo(String memo) {
        this.memo = memo;
    }

    /**
     * @return ware_code
     */
    public String getWareCode() {
        return wareCode;
    }

    /**
     * @param wareCode
     */
    public void setWareCode(String wareCode) {
        this.wareCode = wareCode;
    }

    /**
     * 获取要求交期时间
     *
     * @return request_supply_time - 要求交期时间
     */
    public Date getRequestSupplyTime() {
        return requestSupplyTime;
    }

    /**
     * 设置要求交期时间
     *
     * @param requestSupplyTime 要求交期时间
     */
    public void setRequestSupplyTime(Date requestSupplyTime) {
        this.requestSupplyTime = requestSupplyTime;
    }

    /**
     * 获取发货时间
     *
     * @return transport_time - 发货时间
     */
    public Date getTransportTime() {
        return transportTime;
    }

    /**
     * 设置发货时间
     *
     * @param transportTime 发货时间
     */
    public void setTransportTime(Date transportTime) {
        this.transportTime = transportTime;
    }
}