package com.deer.wms.project.seed.core.service;

/**
 * 查询条件
 *
 * Created by Floki on 2017/9/30.
 */
public abstract class QueryCriteria {

    private String wareCode;

    private Integer itemMasterId;

    public String getWareCode() {
        return wareCode;
    }

    public void setWareCode(String wareCode) {
        this.wareCode = wareCode;
    }

    public Integer getItemMasterId() {
        return itemMasterId;
    }

    public void setItemMasterId(Integer itemMasterId) {
        this.itemMasterId = itemMasterId;
    }

    /**
     * 页码
     */
    private Integer pageNum =1;

    /**
     * 每页显示的条数
     */
    private Integer pageSize =199999;

    public Integer getPageNum() {
        return pageNum;
    }

    public void setPageNum(Integer pageNum) {
        this.pageNum = pageNum;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }
}
