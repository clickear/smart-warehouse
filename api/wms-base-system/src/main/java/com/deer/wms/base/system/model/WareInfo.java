package com.deer.wms.base.system.model;

import java.util.Date;
import javax.persistence.*;

@Table(name = "ware_info")
public class WareInfo {
    /**
     * 仓库ID
     */
    @Id
    @Column(name = "ware_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer wareId;

    /**
     * 仓库编码
     */
    @Column(name = "ware_code")
    private String wareCode;

    /**
     * 仓库名
     */
    @Column(name = "ware_name")
    private String wareName;

    /**
     * 添加时间
     */
    @Column(name = "add_time")
    private String addTime;


    /**
     * 备注
     */
    private String memo;

    /**
     * 公司ID
     */
    private Integer companyId;
    /**
     * 获取仓库ID
     *
     * @return ware_id - 仓库ID
     */
    public Integer getWareId() {
        return wareId;
    }

    /**
     * 设置仓库ID
     *
     * @param wareId 仓库ID
     */
    public void setWareId(Integer wareId) {
        this.wareId = wareId;
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
     * 获取仓库名
     *
     * @return ware_name - 仓库名
     */
    public String getWareName() {
        return wareName;
    }

    /**
     * 设置仓库名
     *
     * @param wareName 仓库名
     */
    public void setWareName(String wareName) {
        this.wareName = wareName;
    }

    public String getAddTime() {
        return addTime;
    }

    public void setAddTime(String addTime) {
        this.addTime = addTime;
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

    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }
}