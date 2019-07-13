package com.deer.wms.ware.task.model;

import javax.persistence.*;

@Table(name = "count_detail")
public class CountDetail {
    @Id
    @Column(name = "count_detail_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer countDetailId;

    @Column(name = "count_id")
    private Integer countId;

    @Column(name = "area_code")
    private String areaCode;

    @Column(name = "shelf_code")
    private String shelfCode;

    @Column(name = "item_code")
    private String itemCode;


    //1-新建  2-作业中  3-初盘完成  4-复盘作业中 5-复盘完成 6-完成
    @Column(name = "state")
    private Integer state;


    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    /**
     * @return count_detail_id
     */
    public Integer getCountDetailId() {
        return countDetailId;
    }

    /**
     * @param countDetailId
     */
    public void setCountDetailId(Integer countDetailId) {
        this.countDetailId = countDetailId;
    }

    /**
     * @return count_id
     */
    public Integer getCountId() {
        return countId;
    }

    /**
     * @param countId
     */
    public void setCountId(Integer countId) {
        this.countId = countId;
    }

    /**
     * @return area_code
     */
    public String getAreaCode() {
        return areaCode;
    }

    /**
     * @param areaCode
     */
    public void setAreaCode(String areaCode) {
        this.areaCode = areaCode;
    }

    /**
     * @return shelf_code
     */
    public String getShelfCode() {
        return shelfCode;
    }

    /**
     * @param shelfCode
     */
    public void setShelfCode(String shelfCode) {
        this.shelfCode = shelfCode;
    }

    /**
     * @return item_code
     */
    public String getItemCode() {
        return itemCode;
    }

    /**
     * @param itemCode
     */
    public void setItemCode(String itemCode) {
        this.itemCode = itemCode;
    }
}