package com.deer.wms.base.system.model;

import javax.persistence.*;

public class Pllet {
    /**
     * 托盘ID
     */
    @Id
    @Column(name = "pllet_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer plletId;

    /**
     * 托盘编码
     */
    @Column(name = "pllet_code")
    private String plletCode;

    @Column(name = "memo")
    private String memo;

    @Column(name = "pllet_type")
    private String plletType;


    /**
     * 托盘名字
     */
    @Column(name = "pllet_name")
    private String plletName;

    /**
     * 公司ID
     */
    @Column(name = "company_id")
    private Integer companyId;

    /**
     * 托盘条形码编码
     */
    @Column(name = "pllet_bar_code")
    private String plletBarCode;

    /**
     * 获取托盘ID
     *
     * @return pllet_id - 托盘ID
     */
    public Integer getPlletId() {
        return plletId;
    }

    /**
     * 设置托盘ID
     *
     * @param plletId 托盘ID
     */
    public void setPlletId(Integer plletId) {
        this.plletId = plletId;
    }

    /**
     * 获取托盘编码
     *
     * @return pllet_code - 托盘编码
     */
    public String getPlletCode() {
        return plletCode;
    }

    /**
     * 设置托盘编码
     *
     * @param plletCode 托盘编码
     */
    public void setPlletCode(String plletCode) {
        this.plletCode = plletCode;
    }

    /**
     * 获取托盘名字
     *
     * @return pllet_name - 托盘名字
     */
    public String getPlletName() {
        return plletName;
    }

    /**
     * 设置托盘名字
     *
     * @param plletName 托盘名字
     */
    public void setPlletName(String plletName) {
        this.plletName = plletName;
    }

    /**
     * 获取公司ID
     *
     * @return company_id - 公司ID
     */
    public Integer getCompanyId() {
        return companyId;
    }

    /**
     * 设置公司ID
     *
     * @param companyId 公司ID
     */
    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    /**
     * 获取托盘条形码编码
     *
     * @return pllet_bar_code - 托盘条形码编码
     */
    public String getPlletBarCode() {
        return plletBarCode;
    }

    /**
     * 设置托盘条形码编码
     *
     * @param plletBarCode 托盘条形码编码
     */
    public void setPlletBarCode(String plletBarCode) {
        this.plletBarCode = plletBarCode;
    }


    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }

    public String getPlletType() {
        return plletType;
    }

    public void setPlletType(String plletType) {
        this.plletType = plletType;
    }
}