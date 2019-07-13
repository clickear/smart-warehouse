package com.deer.wms.base.system.model;

import java.util.Date;
import javax.persistence.*;

@Table(name = "shelf_info")
public class ShelfInfo {
    /**
     * 货架ID
     */
    @Id
    @Column(name = "shelf_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer shelfId;



    /**
     * 货区编码
     */
    @Column(name = "area_code")
    private String areaCode;

    /**
     * 货架编码
     */
    @Column(name = "shelf_code")
    private String shelfCode;

    /**
     * 货架名
     */
    @Column(name = "shelf_name")
    private String shelfName;

    /**
     * 货区列
     */
    @Column(name = "a_column")
    private Integer aColumn;

    /**
     * 货区行
     */
    @Column(name = "a_row")
    private Integer aRow;

    /**
     * 添加时间
     */
    @Column(name = "add_time")
    private Date addTime;

    /**
     * 备注
     */
    @Column(name="memo")
    private String memo;
    @Column(name="shelf_row")
    private Integer shelfRow;
    @Column(name="shelf_column")
    private Integer shelfColumn;

    /**
     * ABC分类
     */
    private String abcClass;

    /**
     *
     */
    private Integer rCOrder;

    /**
     *
     */
    private Integer rOrder;

    /**
     *
     */
    private Integer cOrder;


    private Integer orderNo;

    public Integer getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(Integer orderNo) {
        this.orderNo = orderNo;
    }

    public Integer getrCOrder() {
        return rCOrder;
    }

    public void setrCOrder(Integer rCOrder) {
        this.rCOrder = rCOrder;
    }

    public Integer getrOrder() {
        return rOrder;
    }

    public void setrOrder(Integer rOrder) {
        this.rOrder = rOrder;
    }

    public Integer getcOrder() {
        return cOrder;
    }

    public void setcOrder(Integer cOrder) {
        this.cOrder = cOrder;
    }

    public String getAbcClass() {
        return abcClass;
    }

    public void setAbcClass(String abcClass) {
        this.abcClass = abcClass;
    }


    public Integer getShelfRow() {
        return shelfRow;
    }

    public void setShelfRow(Integer shelfRow) {
        this.shelfRow = shelfRow;
    }

    public Integer getShelfColumn() {
        return shelfColumn;
    }

    public void setShelfColumn(Integer shelfColumn) {
        this.shelfColumn = shelfColumn;
    }


    /**
     * 获取货架ID
     *
     * @return shelf_id - 货架ID
     */
    public Integer getShelfId() {
        return shelfId;
    }

    /**
     * 设置货架ID
     *
     * @param shelfId 货架ID
     */
    public void setShelfId(Integer shelfId) {
        this.shelfId = shelfId;
    }


    /**
     * 获取货区编码
     *
     * @return area_code - 货区编码
     */
    public String getAreaCode() {
        return areaCode;
    }

    /**
     * 设置货区编码
     *
     * @param areaCode 货区编码
     */
    public void setAreaCode(String areaCode) {
        this.areaCode = areaCode;
    }

    /**
     * 获取货架编码
     *
     * @return shelf_code - 货架编码
     */
    public String getShelfCode() {
        return shelfCode;
    }

    /**
     * 设置货架编码
     *
     * @param shelfCode 货架编码
     */
    public void setShelfCode(String shelfCode) {
        this.shelfCode = shelfCode;
    }

    /**
     * 获取货架名
     *
     * @return shelf_name - 货架名
     */
    public String getShelfName() {
        return shelfName;
    }

    /**
     * 设置货架名
     *
     * @param shelfName 货架名
     */
    public void setShelfName(String shelfName) {
        this.shelfName = shelfName;
    }

    /**
     * 获取货区列
     *
     * @return a_column - 货区列
     */
    public Integer getaColumn() {
        return aColumn;
    }

    /**
     * 设置货区列
     *
     * @param aColumn 货区列
     */
    public void setaColumn(Integer aColumn) {
        this.aColumn = aColumn;
    }

    /**
     * 获取货区行
     *
     * @return a_row - 货区行
     */
    public Integer getaRow() {
        return aRow;
    }

    /**
     * 设置货区行
     *
     * @param aRow 货区行
     */
    public void setaRow(Integer aRow) {
        this.aRow = aRow;
    }

    /**
     * 获取添加时间
     *
     * @return add_time - 添加时间
     */
    public Date getAddTime() {
        return addTime;
    }

    /**
     * 设置添加时间
     *
     * @param addTime 添加时间
     */
    public void setAddTime(Date addTime) {
        this.addTime = addTime;
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