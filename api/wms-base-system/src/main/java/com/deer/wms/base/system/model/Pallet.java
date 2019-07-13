package com.deer.wms.base.system.model;

import javax.persistence.*;

public class Pallet {
    /**
     * 托盘ID
     */
    @Id
    @Column(name = "pallet_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer palletId;

    /**
     * 托盘编码
     */
    @Column(name = "pallet_code")
    private String palletCode;

    @Column(name = "memo")
    private String memo;

    @Column(name = "pallet_type")
    private Integer palletType;


    /**
     * 托盘名字
     */
    @Column(name = "pallet_name")
    private String palletName;

    /**
     * 公司ID
     */
    @Column(name = "company_id")
    private Integer companyId;

    /**
     * 托盘条形码编码
     */
    @Column(name = "pallet_bar_code")
    private String palletBarCode;

    /**
     * 货位
     */
    @Column(name = "cell_code")
    private String cellCode;

    public Integer getPalletId() {
        return palletId;
    }

    public void setPalletId(Integer palletId) {
        this.palletId = palletId;
    }

    public String getPalletCode() {
        return palletCode;
    }

    public void setPalletCode(String palletCode) {
        this.palletCode = palletCode;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }

    public Integer getPalletType() {
        return palletType;
    }

    public void setPalletType(Integer palletType) {
        this.palletType = palletType;
    }

    public String getPalletName() {
        return palletName;
    }

    public void setPalletName(String palletName) {
        this.palletName = palletName;
    }

    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    public String getPalletBarCode() {
        return palletBarCode;
    }

    public void setPalletBarCode(String palletBarCode) {
        this.palletBarCode = palletBarCode;
    }

    public String getCellCode() {
        return cellCode;
    }

    public void setCellCode(String cellCode) {
        this.cellCode = cellCode;
    }
}