package com.deer.wms.report.model;

import javax.persistence.*;

public class Inventory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;



    /**
     * 仓库
     */
    @Column(name = "ware_code")
    private String wareCode;

    /**
     * 批次ID
     */
    @Column(name = "batch_id")
    private Integer batchId;

    /**
     * 数量
     */
    private Integer quantity;

    /**
     * 备注
     */
    private String memo;



    /**
     * 库存类型   1-审核   2-上架
     */
    private Integer type;



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
     * 获取仓库
     *
     * @return ware_code - 仓库
     */
    public String getWareCode() {
        return wareCode;
    }

    /**
     * 设置仓库
     *
     * @param wareCode 仓库
     */
    public void setWareCode(String wareCode) {
        this.wareCode = wareCode;
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
     * 获取库存类型   1-审核   2-上架
     *
     * @return type - 库存类型   1-审核   2-上架
     */
    public Integer getType() {
        return type;
    }

    /**
     * 设置库存类型   1-审核   2-上架
     *
     * @param type 库存类型   1-审核   2-上架
     */
    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getBatchId() {
        return batchId;
    }

    public void setBatchId(Integer batchId) {
        this.batchId = batchId;
    }
}