package com.deer.wms.operation.model;

import javax.persistence.*;

@Table(name = "order_manage")
public class OrderManage {

    /**
     * 公司ID
     */
    @Column(name = "company_id")
    private Integer companyId;

    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    @Column(name = "add_time")
    private String addTime;

    public String getAddTime() {
        return addTime;
    }

    public void setAddTime(String addTime) {
        this.addTime = addTime;
    }
    /**
     * 采购管理
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * 订单号
     */
    @Column(name = "order_code")
    private String orderCode;

    /**
     * 产品编码
     */
    @Column(name = "item_code")
    private String itemCode;

    /**
     * 产品规格
     */
    @Column(name = "item_class")
    private String itemClass;

    /**
     * 单价
     */
    private String price;

    /**
     * 计量单位编码
     */
    @Column(name = "unit_code")
    private String unitCode;

    /**
     * 数量
     */
    @Column(name = "order_num")
    private Integer orderNum;

    /**
     * 订单总额
     */
    @Column(name = "order_total")
    private Integer orderTotal;

    /**
     * 供应商编码
     */
    @Column(name = "supplier_code")
    private String supplierCode;

    /**
     * 状态
     */
    private String state;

    /**
     * 是否入账
     */
    @Column(name = "yn_bill")
    private String ynBill;

    /**
     * 获取采购管理
     *
     * @return id - 采购管理
     */
    public Integer getId() {
        return id;
    }

    /**
     * 设置采购管理
     *
     * @param id 采购管理
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * 获取订单号
     *
     * @return order_code - 订单号
     */
    public String getOrderCode() {
        return orderCode;
    }

    /**
     * 设置订单号
     *
     * @param orderCode 订单号
     */
    public void setOrderCode(String orderCode) {
        this.orderCode = orderCode;
    }

    /**
     * 获取产品编码
     *
     * @return item_code - 产品编码
     */
    public String getItemCode() {
        return itemCode;
    }

    /**
     * 设置产品编码
     *
     * @param itemCode 产品编码
     */
    public void setItemCode(String itemCode) {
        this.itemCode = itemCode;
    }

    /**
     * 获取产品规格
     *
     * @return item_class - 产品规格
     */
    public String getItemClass() {
        return itemClass;
    }

    /**
     * 设置产品规格
     *
     * @param itemClass 产品规格
     */
    public void setItemClass(String itemClass) {
        this.itemClass = itemClass;
    }

    /**
     * 获取单价
     *
     * @return price - 单价
     */
    public String getPrice() {
        return price;
    }

    /**
     * 设置单价
     *
     * @param price 单价
     */
    public void setPrice(String price) {
        this.price = price;
    }

    /**
     * 获取计量单位编码
     *
     * @return unit_code - 计量单位编码
     */
    public String getUnitCode() {
        return unitCode;
    }

    /**
     * 设置计量单位编码
     *
     * @param unitCode 计量单位编码
     */
    public void setUnitCode(String unitCode) {
        this.unitCode = unitCode;
    }

    /**
     * 获取数量
     *
     * @return order_num - 数量
     */
    public Integer getOrderNum() {
        return orderNum;
    }

    /**
     * 设置数量
     *
     * @param orderNum 数量
     */
    public void setOrderNum(Integer orderNum) {
        this.orderNum = orderNum;
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
     * 获取状态
     *
     * @return state - 状态
     */
    public String getState() {
        return state;
    }

    /**
     * 设置状态
     *
     * @param state 状态
     */
    public void setState(String state) {
        this.state = state;
    }

    /**
     * 获取是否入账
     *
     * @return yn_bill - 是否入账
     */
    public String getYnBill() {
        return ynBill;
    }

    /**
     * 设置是否入账
     *
     * @param ynBill 是否入账
     */
    public void setYnBill(String ynBill) {
        this.ynBill = ynBill;
    }
}