package com.deer.wms.operation.model;

import java.util.Date;
import javax.persistence.*;

@Table(name = "order_detail")
public class OrderDetail {
    /**
     * 采购管理
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    /**
     * 采购订单号
     */
    @Column(name = "order_no")
    private String orderNo;

    /**
     * 备注
     */
    @Column(name = "memo")
    private String memo;

    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }

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
     * 采购数量
     */
    private Integer quantity;

    @Column(name = "add_time")
    private String addTime;

    @Column(name = "company_id")
    private Integer companyId;

    /**
     * 产品类型
     */
    @Column(name = "item_type")
    private String itemType;

    /**
     * 获取采购管理
     *
     * @return id - 采购管理
     */
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    /**
     * 获取采购订单号
     *
     * @return order_no - 采购订单号
     */
    public String getOrderNo() {
        return orderNo;
    }

    /**
     * 设置采购订单号
     *
     * @param orderNo 采购订单号
     */
    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
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
     * 获取采购数量
     *
     * @return quantity - 采购数量
     */
    public Integer getQuantity() {
        return quantity;
    }

    /**
     * 设置采购数量
     *
     * @param quantity 采购数量
     */
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    /**
     * @return add_time
     */

    public String getAddTime() {
        return addTime;
    }

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
     * 获取产品类型
     *
     * @return item_type - 产品类型
     */
    public String getItemType() {
        return itemType;
    }

    /**
     * 设置产品类型
     *
     * @param itemType 产品类型
     */
    public void setItemType(String itemType) {
        this.itemType = itemType;
    }


    private  Integer state;

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }
}