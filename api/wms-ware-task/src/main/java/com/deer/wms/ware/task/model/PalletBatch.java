package com.deer.wms.ware.task.model;

import javax.persistence.*;

@Table(name = "pallet_batch")
public class PalletBatch {
    /**
     * id
     */
    @Id
    @Column(name = "pallet_batch_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer palletBatchId;

    /**
     * 托盘id
     */
    @Column(name = "pallet_id")
    private Integer palletId;

    /**
     * 批次id
     */
    @Column(name = "batch_id")
    private Integer batchId;

    /**
     * 数量
     */
    @Column(name = "quantity")
    private Integer quantity;


    /**
     * 获取id
     *
     * @return pallet_batch_id - id
     */
    public Integer getPalletBatchId() {
        return palletBatchId;
    }

    /**
     * 设置id
     *
     * @param palletBatchId id
     */
    public void setPalletBatchId(Integer palletBatchId) {
        this.palletBatchId = palletBatchId;
    }

    public Integer getPalletId() {
        return palletId;
    }

    public void setPalletId(Integer palletId) {
        this.palletId = palletId;
    }

    public Integer getBatchId() {
        return batchId;
    }

    public void setBatchId(Integer batchId) {
        this.batchId = batchId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}