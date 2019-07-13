package com.deer.wms.ware.task.model;

import java.util.Date;
import javax.persistence.*;

@Table(name = "count_master")
public class CountMaster {
    @Id
    @Column(name = "count_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer countId;

    @Column(name = "create_user_id")
    private Integer createUserId;

    @Column(name = "create_time")
    private String createTime;

    /**
     * 1=明盘，2=暗盘
     */
    @Column(name = "count_type")
    private Integer countType;

    /**
     * 仓库编码
     */
    @Column(name = "ware_code")
    private String wareCode;

    /**
     * 货主ID
     */
    @Column(name = "item_master_id")
    private Integer itemMasterId;


    private Integer state;

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
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
     * @return create_time
     */
    public String getCreateTime() {
        return createTime;
    }

    /**
     * @param createTime
     */
    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    /**
     * 获取1=明盘，2=暗盘
     *
     * @return count_type - 1=明盘，2=暗盘
     */
    public Integer getCountType() {
        return countType;
    }

    /**
     * 设置1=明盘，2=暗盘
     *
     * @param countType 1=明盘，2=暗盘
     */
    public void setCountType(Integer countType) {
        this.countType = countType;
    }

    /**
     * 获取仓库编码
     *
     * @return ware_code - 仓库编码
     */
    public String getWareCode() {
        return wareCode;
    }

    /**
     * 设置仓库编码
     *
     * @param wareCode 仓库编码
     */
    public void setWareCode(String wareCode) {
        this.wareCode = wareCode;
    }

    /**
     * 获取货主ID
     *
     * @return item_master_id - 货主ID
     */
    public Integer getItemMasterId() {
        return itemMasterId;
    }

    /**
     * 设置货主ID
     *
     * @param itemMasterId 货主ID
     */
    public void setItemMasterId(Integer itemMasterId) {
        this.itemMasterId = itemMasterId;
    }
}