package com.deer.wms.ware.task.model;

import com.deer.wms.project.seed.core.service.QueryCriteria;

/**
* Created by guo on 2018/08/08.
*/
public class PalletBatchCriteria extends QueryCriteria {

    private Integer companyId;
    private String wareCode;
    private String areaCode;
    private String shelfCode;
    private String cellCode;
    private String itemCode;
    private String itemBatchBarCode;
    private String cellBarCode;
    private Integer prepareType;    /*  1：先进先出  2 ：清理货位优先  3：路径优先  */
    private String palletCode;
    private String palletBarCode;

    public String getPalletCode() {
        return palletCode;
    }

    public void setPalletCode(String palletCode) {
        this.palletCode = palletCode;
    }

    public String getPalletBarCode() {
        return palletBarCode;
    }

    public void setPalletBarCode(String palletBarCode) {
        this.palletBarCode = palletBarCode;
    }

    public Integer getPrepareType() {
        return prepareType;
    }

    public void setPrepareType(Integer prepareType) {
        this.prepareType = prepareType;
    }

    public String getItemBatchBarCode() {
        return itemBatchBarCode;
    }

    public void setItemBatchBarCode(String itemBatchBarCode) {
        this.itemBatchBarCode = itemBatchBarCode;
    }

    public String getCellBarCode() {
        return cellBarCode;
    }

    public void setCellBarCode(String cellBarCode) {
        this.cellBarCode = cellBarCode;
    }

    /**
     * 托盘id
     */

    private Integer palletId;

    /**
     * 批次id
     */

    private Integer batchId;


    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    public String getWareCode() {
        return wareCode;
    }

    public void setWareCode(String wareCode) {
        this.wareCode = wareCode;
    }

    public String getAreaCode() {
        return areaCode;
    }

    public void setAreaCode(String areaCode) {
        this.areaCode = areaCode;
    }

    public String getShelfCode() {
        return shelfCode;
    }

    public void setShelfCode(String shelfCode) {
        this.shelfCode = shelfCode;
    }

    public String getCellCode() {
        return cellCode;
    }

    public void setCellCode(String cellCode) {
        this.cellCode = cellCode;
    }

    public String getItemCode() {
        return itemCode;
    }

    public void setItemCode(String itemCode) {
        this.itemCode = itemCode;
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
}
