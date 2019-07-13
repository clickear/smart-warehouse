package com.deer.wms.ware.task.model;

import java.util.Date;
import javax.persistence.*;

@Table(name = "count_pallet_batch")
public class CountPalletBatch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "pallet_batch_id")
    private Integer palletBatchId;

    @Column(name = "count_quantity")
    private Integer countQuantity;

    /**
     * 0-初始化  1-完成
     */
    private Integer state;

    /**
     * 0-初盘  1-复盘
     */
    private Integer type;

    @Column(name = "create_user_id")
    private Integer createUserId;

    @Column(name = "create_time")
    private String createTime;

    @Column(name = "task_user_id")
    private Integer taskUserId;

    @Column(name = "task_time")
    private String taskTime;

    private String memo;

    @Column(name = "company_id")
    private Integer companyId;

    @Column(name = "ware_code")
    private String wareCode;

    @Column(name = "item_master_id")
    private String itemMasterId;

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
     * @return pallet_batch_id
     */
    public Integer getPalletBatchId() {
        return palletBatchId;
    }

    /**
     * @param palletBatchId
     */
    public void setPalletBatchId(Integer palletBatchId) {
        this.palletBatchId = palletBatchId;
    }

    /**
     * @return count_quantity
     */
    public Integer getCountQuantity() {
        return countQuantity;
    }

    /**
     * @param countQuantity
     */
    public void setCountQuantity(Integer countQuantity) {
        this.countQuantity = countQuantity;
    }

    /**
     * 获取0-初始化  1-完成
     *
     * @return state - 0-初始化  1-完成
     */
    public Integer getState() {
        return state;
    }

    /**
     * 设置0-初始化  1-完成
     *
     * @param state 0-初始化  1-完成
     */
    public void setState(Integer state) {
        this.state = state;
    }

    /**
     * 获取0-初盘  1-复盘
     *
     * @return type - 0-初盘  1-复盘
     */
    public Integer getType() {
        return type;
    }

    /**
     * 设置0-初盘  1-复盘
     *
     * @param type 0-初盘  1-复盘
     */
    public void setType(Integer type) {
        this.type = type;
    }

    /**
     * @return create_user_id
     */
    public Integer getCreateUserId() {
        return createUserId;
    }

    /**
     * @param createUserId
     */
    public void setCreateUserId(Integer createUserId) {
        this.createUserId = createUserId;
    }



    /**
     * @return task_user_id
     */
    public Integer getTaskUserId() {
        return taskUserId;
    }

    /**
     * @param taskUserId
     */
    public void setTaskUserId(Integer taskUserId) {
        this.taskUserId = taskUserId;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getTaskTime() {
        return taskTime;
    }

    public void setTaskTime(String taskTime) {
        this.taskTime = taskTime;
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
     * @return item_master_id
     */
    public String getItemMasterId() {
        return itemMasterId;
    }

    /**
     * @param itemMasterId
     */
    public void setItemMasterId(String itemMasterId) {
        this.itemMasterId = itemMasterId;
    }
}