package com.deer.wms.ware.task.model;

import javax.persistence.*;

@Table(name = "count_task")
public class CountTask {
    /**
     * 任务ID
     */
    @Id
    @Column(name = "count_task_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer countTaskId;

    @Column(name = "count_detail_id")
    private Integer countDetailId;

    /**
     * 系统数
     */
    @Column(name = "sys_quantity")
    private Integer sysQuantity;

    @Column(name = "pallet_batch_id")
    private Integer palletBatchId;

    /**
     * 盘点数
     */
    @Column(name = "count_quantity")
    private Integer countQuantity;

    /**
     * 1-未盘 2-初盘  3-待复盘  4-已复盘  5完成
     */
    private Integer state;

    /**
     * 获取任务ID
     *
     * @return count_task_id - 任务ID
     */
    public Integer getCountTaskId() {
        return countTaskId;
    }

    /**
     * 设置任务ID
     *
     * @param countTaskId 任务ID
     */
    public void setCountTaskId(Integer countTaskId) {
        this.countTaskId = countTaskId;
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
     * 获取系统数
     *
     * @return sys_quantity - 系统数
     */
    public Integer getSysQuantity() {
        return sysQuantity;
    }

    /**
     * 设置系统数
     *
     * @param sysQuantity 系统数
     */
    public void setSysQuantity(Integer sysQuantity) {
        this.sysQuantity = sysQuantity;
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
     * 获取盘点数
     *
     * @return count_quantity - 盘点数
     */
    public Integer getCountQuantity() {
        return countQuantity;
    }

    /**
     * 设置盘点数
     *
     * @param countQuantity 盘点数
     */
    public void setCountQuantity(Integer countQuantity) {
        this.countQuantity = countQuantity;
    }

    /**
     * 获取1-未盘 2-初盘  3-待复盘  4-已复盘  5完成
     *
     * @return state - 1-未盘 2-初盘  3-待复盘  4-已复盘  5完成
     */
    public Integer getState() {
        return state;
    }

    /**
     * 设置1-未盘 2-初盘  3-待复盘  4-已复盘  5完成
     *
     * @param state 1-未盘 2-初盘  3-待复盘  4-已复盘  5完成
     */
    public void setState(Integer state) {
        this.state = state;
    }
}