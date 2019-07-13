package com.deer.wms.finance.model;

import java.util.Date;
import javax.persistence.*;

@Table(name = "finance_type")
public class FinanceType {
    /**
     * 类别ID主键
     */
    @Id
    @Column(name = "f_type_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer fTypeId;

    /**
     * 财务类别编码
     */
    @Column(name = "f_type_code")
    private String fTypeCode;

    /**
     * 财务类别名称
     */
    @Column(name = "f_type_name")
    private String fTypeName;

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
    @Column(name = "company_id")
    private Integer companyId;

    /**
     * 获取类别ID主键
     *
     * @return f_type_id - 类别ID主键
     */
    public Integer getfTypeId() {
        return fTypeId;
    }

    /**
     * 设置类别ID主键
     *
     * @param fTypeId 类别ID主键
     */
    public void setfTypeId(Integer fTypeId) {
        this.fTypeId = fTypeId;
    }

    /**
     * 获取财务类别编码
     *
     * @return f_type_code - 财务类别编码
     */
    public String getfTypeCode() {
        return fTypeCode;
    }

    /**
     * 设置财务类别编码
     *
     * @param fTypeCode 财务类别编码
     */
    public void setfTypeCode(String fTypeCode) {
        this.fTypeCode = fTypeCode;
    }

    /**
     * 获取财务类别名称
     *
     * @return f_type_name - 财务类别名称
     */
    public String getfTypeName() {
        return fTypeName;
    }

    /**
     * 设置财务类别名称
     *
     * @param fTypeName 财务类别名称
     */
    public void setfTypeName(String fTypeName) {
        this.fTypeName = fTypeName;
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
}