package com.deer.wms.operation.model;

import javax.persistence.*;

@Table(name = "sale_manage")
public class SaleManage {

    @Column(name = "add_time")
    private String addTime;

    public String getAddTime() {
        return addTime;
    }

    public void setAddTime(String addTime) {
        this.addTime = addTime;
    }

    /**
     * 销售管理
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * 销售订单号
     */
    @Column(name = "sale_code")
    private String saleCode;

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
    private Integer price;

    /**
     * 计量单位编码
     */
    @Column(name = "unit_code")
    private String unitCode;

    /**
     * 出库数量
     */
    @Column(name = "sale_num")
    private Integer saleNum;

    /**
     * 订单总额
     */
    @Column(name = "sale_total")
    private Integer saleTotal;

    /**
     * 客户编号
     */
    @Column(name = "client_code")
    private String clientCode;


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
     * 获取销售订单号
     *
     * @return sale_code - 销售订单号
     */
    public String getSaleCode() {
        return saleCode;
    }

    /**
     * 设置销售订单号
     *
     * @param saleCode 销售订单号
     */
    public void setSaleCode(String saleCode) {
        this.saleCode = saleCode;
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
    public Integer getPrice() {
        return price;
    }

    /**
     * 设置单价
     *
     * @param price 单价
     */
    public void setPrice(Integer price) {
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
     * 获取出库数量
     *
     * @return sale_num - 出库数量
     */
    public Integer getSaleNum() {
        return saleNum;
    }

    /**
     * 设置出库数量
     *
     * @param saleNum 出库数量
     */
    public void setSaleNum(Integer saleNum) {
        this.saleNum = saleNum;
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