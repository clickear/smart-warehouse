package com.deer.wms.finance.model;

import java.util.Date;
import javax.persistence.*;

@Table(name = "manage_ar")
public class ManageAr {
    @Id
    @Column(name = "ar_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer arId;

    /**
     * 流水号
     */
    @Column(name = "flow_code")
    private String flowCode;

    /**
     * 流水名称
     */
    @Column(name = "flow_name")
    private String flowName;

    /**
     * 财务类别编码
     */
    @Column(name = "f_type_code")
    private String fTypeCode;

    /**
     * 付款方
     */
    private String payer;

    /**
     * 剩余金额
     */
    @Column(name = "rest_money")
    private String restMoney;

    /**
     * 状态
     */
    private String state;

    /**
     * 添加时间
     */
    private String addDatetime;

    /**
     * 应收金额
     */
    @Column(name = "should_ar_money")
    private String shouldArMoney;

    /**
     * 实收金额
     */
    @Column(name = "fact_ar_money")
    private String factArMoney;

    private String memo;

    @Column(name = "company_id")
    private Integer companyId;

    /**
     * @return ar_id
     */
    public Integer getArId() {
        return arId;
    }

    /**
     * @param arId
     */
    public void setArId(Integer arId) {
        this.arId = arId;
    }

    /**
     * 获取流水号
     *
     * @return flow_code - 流水号
     */
    public String getFlowCode() {
        return flowCode;
    }

    /**
     * 设置流水号
     *
     * @param flowCode 流水号
     */
    public void setFlowCode(String flowCode) {
        this.flowCode = flowCode;
    }

    /**
     * 获取流水名称
     *
     * @return flow_name - 流水名称
     */
    public String getFlowName() {
        return flowName;
    }

    /**
     * 设置流水名称
     *
     * @param flowName 流水名称
     */
    public void setFlowName(String flowName) {
        this.flowName = flowName;
    }



    /**
     * 获取付款方
     *
     * @return payer - 付款方
     */
    public String getPayer() {
        return payer;
    }

    /**
     * 设置付款方
     *
     * @param payer 付款方
     */
    public void setPayer(String payer) {
        this.payer = payer;
    }

    /**
     * 获取剩余金额
     *
     * @return rest_money - 剩余金额
     */
    public String getRestMoney() {
        return restMoney;
    }

    /**
     * 设置剩余金额
     *
     * @param restMoney 剩余金额
     */
    public void setRestMoney(String restMoney) {
        this.restMoney = restMoney;
    }

    /**
     * 获取状态
     *
     * @return state - 状态
     */
    public String getState() {
        return state;
    }

    /**
     * 设置状态
     *
     * @param state 状态
     */
    public void setState(String state) {
        this.state = state;
    }

    public String getAddDatetime() {
        return addDatetime;
    }

    public void setAddDatetime(String addDatetime) {
        this.addDatetime = addDatetime;
    }

    /**
     * 获取应收金额
     *
     * @return should_ar_money - 应收金额
     */
    public String getShouldArMoney() {
        return shouldArMoney;
    }

    /**
     * 设置应收金额
     *
     * @param shouldArMoney 应收金额
     */
    public void setShouldArMoney(String shouldArMoney) {
        this.shouldArMoney = shouldArMoney;
    }

    /**
     * 获取实收金额
     *
     * @return fact_ar_money - 实收金额
     */
    public String getFactArMoney() {
        return factArMoney;
    }

    /**
     * 设置实收金额
     *
     * @param factArMoney 实收金额
     */
    public void setFactArMoney(String factArMoney) {
        this.factArMoney = factArMoney;
    }

    /**
     * @return memo
     */
    public String getMemo() {
        return memo;
    }

    /**
     * @param memo
     */
    public void setMemo(String memo) {
        this.memo = memo;
    }

    /**
     * @return company_id
     */
    public Integer getCompanyId() {
        return companyId;
    }

    /**
     * @param companyId
     */
    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    public String getfTypeCode() {
        return fTypeCode;
    }

    public void setfTypeCode(String fTypeCode) {
        this.fTypeCode = fTypeCode;
    }
}