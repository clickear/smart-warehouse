package com.deer.wms.base.system.model;

import javax.persistence.*;

public class Unit {
    /**
     * 单位id
     */
    @Id
    @Column(name = "unit_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer unitId;

    /**
     * 单位编码
     */
    @Column(name = "unit_code")
    private String unitCode;

    /**
     * 单位名称
     */
    @Column(name = "unit_name")
    private String unitName;

    /**
     * 备注
     */
    private String memo;

    /**
     * 公司id
     */
    @Column(name = "company_id")
    private Integer companyId;

    /**
     * 获取单位id
     *
     * @return unit_id - 单位id
     */
    public Integer getUnitId() {
        return unitId;
    }

    /**
     * 设置单位id
     *
     * @param unitId 单位id
     */
    public void setUnitId(Integer unitId) {
        this.unitId = unitId;
    }

    /**
     * 获取单位编码
     *
     * @return unit_code - 单位编码
     */
    public String getUnitCode() {
        return unitCode;
    }

    /**
     * 设置单位编码
     *
     * @param unitCode 单位编码
     */
    public void setUnitCode(String unitCode) {
        this.unitCode = unitCode;
    }

    /**
     * 获取单位名称
     *
     * @return unit_name - 单位名称
     */
    public String getUnitName() {
        return unitName;
    }

    /**
     * 设置单位名称
     *
     * @param unitName 单位名称
     */
    public void setUnitName(String unitName) {
        this.unitName = unitName;
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
     * 获取公司id
     *
     * @return company_id - 公司id
     */
    public Integer getCompanyId() {
        return companyId;
    }

    /**
     * 设置公司id
     *
     * @param companyId 公司id
     */
    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }
}