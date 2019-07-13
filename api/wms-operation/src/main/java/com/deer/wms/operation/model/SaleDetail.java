package com.deer.wms.operation.model;

import java.util.Date;
import javax.persistence.*;

@Table(name = "sale_detail")
public class SaleDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

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
     * 数量
     */
    private Integer quantity;

    /**
     * 单位编码
     */
    @Column(name = "unit_code")
    private String unitCode;

    /**
     * 销售合同号
     */
    @Column(name = "sale_no")
    private String saleNo;

    /**
     * 添加时间
     */
    @Column(name = "add_time")
    private String addTime;

    @Column(name = "company_id")
    private Integer companyId;

    /**
     * 备注
     */
    private String memo;

    /**
     * 要求交期时间
     */
    @Column(name = "request_supply_time")
    private Date requestSupplyTime;

    /**
     * 实际交期时间
     */
    @Column(name = "real_supply_time")
    private Date realSupplyTime;

    /**
     * 0-未销售，1-已销售
     */
    private Integer status;

    /**
     * @return id
     */
    public Integer getId() {
        return id;
    }

    /**
     * @param id
     */
    public void setId(Integer id) {
        this.id = id;
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
     * 获取数量
     *
     * @return quantity - 数量
     */
    public Integer getQuantity() {
        return quantity;
    }

    /**
     * 设置数量
     *
     * @param quantity 数量
     */
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    /**
     * 获取单位编码
     *
     * @return unit_code - 单位编码
     */
    public String getUnitCode() {
        return unitCode;
    }

    /**
     * 设置单位编码
     *
     * @param unitCode 单位编码
     */
    public void setUnitCode(String unitCode) {
        this.unitCode = unitCode;
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
     * 获取添加时间
     *
     * @return add_time - 添加时间
     */
    public String getAddTime() {
        return addTime;
    }

    /**
     * 设置添加时间
     *
     * @param addTime 添加时间
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
     * 获取实际交期时间
     *
     * @return real_supply_time - 实际交期时间
     */
    public Date getRealSupplyTime() {
        return realSupplyTime;
    }

    /**
     * 设置实际交期时间
     *
     * @param realSupplyTime 实际交期时间
     */
    public void setRealSupplyTime(Date realSupplyTime) {
        this.realSupplyTime = realSupplyTime;
    }

    /**
     * 获取0-未销售，1-已销售
     *
     * @return status - 0-未销售，1-已销售
     */
    public Integer getStatus() {
        return status;
    }

    /**
     * 设置0-未销售，1-已销售
     *
     * @param status 0-未销售，1-已销售
     */
    public void setStatus(Integer status) {
        this.status = status;
    }
}