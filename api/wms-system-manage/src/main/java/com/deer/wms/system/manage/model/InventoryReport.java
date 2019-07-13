package com.deer.wms.system.manage.model;

import java.util.Date;
import javax.persistence.*;

@Table(name = "inventory_report")
public class InventoryReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "ware_code")
    private String wareCode;

    @Column(name = "item_master_id")
    private Integer itemMasterId;

    @Column(name = "item_code")
    private String itemCode;

    @Column(name = "start_inventory")
    private Integer startInventory;

    @Column(name = "in_inventory")
    private Integer inInventory;

    @Column(name = "out_inventory")
    private Integer outInventory;

    private Integer inventory;

    @Column(name = "loss_inventory")
    private Integer lossInventory;

    @Column(name = "start_time")
    private String startTime;

    @Column(name = "end_time")
    private String endTime;

    @Column(name = "report_type")
    private Integer reportType;


    public Integer getReportType() {
        return reportType;
    }

    public void setReportType(Integer reportType) {
        this.reportType = reportType;
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
    public Integer getItemMasterId() {
        return itemMasterId;
    }

    /**
     * @param itemMasterId
     */
    public void setItemMasterId(Integer itemMasterId) {
        this.itemMasterId = itemMasterId;
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

    /**
     * @return start_inventory
     */
    public Integer getStartInventory() {
        return startInventory;
    }

    /**
     * @param startInventory
     */
    public void setStartInventory(Integer startInventory) {
        this.startInventory = startInventory;
    }

    /**
     * @return in_inventory
     */
    public Integer getInInventory() {
        return inInventory;
    }

    /**
     * @param inInventory
     */
    public void setInInventory(Integer inInventory) {
        this.inInventory = inInventory;
    }

    /**
     * @return out_inventory
     */
    public Integer getOutInventory() {
        return outInventory;
    }

    /**
     * @param outInventory
     */
    public void setOutInventory(Integer outInventory) {
        this.outInventory = outInventory;
    }

    /**
     * @return inventory
     */
    public Integer getInventory() {
        return inventory;
    }

    /**
     * @param inventory
     */
    public void setInventory(Integer inventory) {
        this.inventory = inventory;
    }

    /**
     * @return loss_inventory
     */
    public Integer getLossInventory() {
        return lossInventory;
    }

    /**
     * @param lossInventory
     */
    public void setLossInventory(Integer lossInventory) {
        this.lossInventory = lossInventory;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }
}