package com.deer.wms.base.system.model;

import java.util.Date;
import javax.persistence.*;

@Table(name = "cell_info")
public class CellInfo {
    /**
     * 货位ID
     */
    @Id
    @Column(name = "cell_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cellId;



    /**
     * 货架编码
     */
    @Column(name = "shelf_code")
    private String shelfCode;

    /**
     * 货物编码
     */
    @Column(name = "cell_code")
    private String cellCode;

    /**
     * 货架列
     */
    @Column(name = "s_column")
    private Integer sColumn;

    /**
     * 货架行
     */
    @Column(name = "s_row")
    private Integer sRow;

    /**
     * 添加时间
     */
    @Column(name = "add_time")
    private Date addTime;

    /**
     * 添加时间
     */
    @Column(name = "state")
    private Integer state;


    private Integer orderNo ;

    public Integer getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(Integer orderNo) {
        this.orderNo = orderNo;
    }

    /**
     * 备注
     */
    private String memo;


    /**
     * 货位条形码
     */
    @Column(name = "cell_bar_code")
    private String cellBarCode;

    /**
     * 获取货位ID
     *
     * @return cell_id - 货位ID
     */
    public Integer getCellId() {
        return cellId;
    }

    /**
     * 设置货位ID
     *
     * @param cellId 货位ID
     */
    public void setCellId(Integer cellId) {
        this.cellId = cellId;
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
     * 获取货物编码
     *
     * @return cell_code - 货物编码
     */
    public String getCellCode() {
        return cellCode;
    }

    /**
     * 设置货物编码
     *
     * @param cellCode 货物编码
     */
    public void setCellCode(String cellCode) {
        this.cellCode = cellCode;
    }

    /**
     * 获取货架列
     *
     * @return s_column - 货架列
     */
    public Integer getsColumn() {
        return sColumn;
    }

    /**
     * 设置货架列
     *
     * @param sColumn 货架列
     */
    public void setsColumn(Integer sColumn) {
        this.sColumn = sColumn;
    }

    /**
     * 获取货架行
     *
     * @return s_row - 货架行
     */
    public Integer getsRow() {
        return sRow;
    }

    /**
     * 设置货架行
     *
     * @param sRow 货架行
     */
    public void setsRow(Integer sRow) {
        this.sRow = sRow;
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





    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public String getCellBarCode() {
        return cellBarCode;
    }

    public void setCellBarCode(String cellBarCode) {
        this.cellBarCode = cellBarCode;
    }
}