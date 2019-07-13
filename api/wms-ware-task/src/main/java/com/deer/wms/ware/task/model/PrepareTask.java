package com.deer.wms.ware.task.model;

import java.util.Date;
import javax.persistence.*;

@Table(name = "prepare_task")
public class PrepareTask {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer quantity;

    @Column(name = "pallet_batch_id")
    private Integer palletBatchId;

    @Column(name = "bill_no")
    private String billNo;

    @Column(name = "create_time")
    private String createTime;

    @Column(name = "task_user_id")
    private Integer taskUserId;

    @Column(name = "task_time")
    private Date taskTime;

    @Column(name = "create_user_id")
    private Integer createUserId;


    /*
    * 0-待分拣  1-已分拣
    * */
    @Column(name = "state")
    private Integer state;


    private String taskBatch;

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public String getTaskBatch() {
        return taskBatch;
    }

    public void setTaskBatch(String taskBatch) {
        this.taskBatch = taskBatch;
    }

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
     * @return quantity
     */
    public Integer getQuantity() {
        return quantity;
    }

    /**
     * @param quantity
     */
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
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
     * @return bill_no
     */
    public String getBillNo() {
        return billNo;
    }

    /**
     * @param billNo
     */
    public void setBillNo(String billNo) {
        this.billNo = billNo;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
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

    /**
     * @return task_time
     */
    public Date getTaskTime() {
        return taskTime;
    }

    /**
     * @param taskTime
     */
    public void setTaskTime(Date taskTime) {
        this.taskTime = taskTime;
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
}