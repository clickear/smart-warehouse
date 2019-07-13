package com.deer.wms.finance.model;

import java.util.Date;
import javax.persistence.*;

@Table(name = "manage_pay")
public class ManagePay {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * 流水号
     */
    @Column(name = "pay_flow_code")
    private String payFlowCode;

    /**
     * 流水名称
     */
    @Column(name = "pay_flow_name")
    private String payFlowName;

    /**
     * 财务类别编码
     */
    @Column(name = "f_type_code")
    private String fTypeCode;

    public String getfTypeCode() {
        return fTypeCode;
    }

    public void setfTypeCode(String fTypeCode) {
        this.fTypeCode = fTypeCode;
    }

    public String getAddDatetime() {
        return addDatetime;
    }

    public void setAddDatetime(String addDatetime) {
        this.addDatetime = addDatetime;
    }

    /**
     * 付款方
     */
    private String payer;

    /**
     * 剩余金额
     */
    @Column(name = "pay_rest_money")
    private String payRestMoney;

    /**
     * 状态
     */
    @Column(name = "money_state")
    private String moneyState;

    /**
     * 添加时间
     */
    private String addDatetime;

    /**
     * 应付金额
     */
    @Column(name = "should_pay_money")
    private String shouldPayMoney;

    /**
     * 实付金额
     */
    @Column(name = "fact_pay_money")
    private String factPayMoney;

    private String memo;

    @Column(name = "company_id")
    private Integer companyId;

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
     * 获取流水号
     *
     * @return pay_flow_code - 流水号
     */
    public String getPayFlowCode() {
        return payFlowCode;
    }

    /**
     * 设置流水号
     *
     * @param payFlowCode 流水号
     */
    public void setPayFlowCode(String payFlowCode) {
        this.payFlowCode = payFlowCode;
    }

    /**
     * 获取流水名称
     *
     * @return pay_flow_name - 流水名称
     */
    public String getPayFlowName() {
        return payFlowName;
    }

    /**
     * 设置流水名称
     *
     * @param payFlowName 流水名称
     */
    public void setPayFlowName(String payFlowName) {
        this.payFlowName = payFlowName;
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
     * @return pay_rest_money - 剩余金额
     */
    public String getPayRestMoney() {
        return payRestMoney;
    }

    /**
     * 设置剩余金额
     *
     * @param payRestMoney 剩余金额
     */
    public void setPayRestMoney(String payRestMoney) {
        this.payRestMoney = payRestMoney;
    }

    /**
     * 获取状态
     *
     * @return money_state - 状态
     */
    public String getMoneyState() {
        return moneyState;
    }

    /**
     * 设置状态
     *
     * @param moneyState 状态
     */
    public void setMoneyState(String moneyState) {
        this.moneyState = moneyState;
    }

    /**
     * 获取添加时间
     *
     * @return adddatetime - 添加时间
     */

    /**
     * 获取应付金额
     *
     * @return should_pay_money - 应付金额
     */
    public String getShouldPayMoney() {
        return shouldPayMoney;
    }

    /**
     * 设置应付金额
     *
     * @param shouldPayMoney 应付金额
     */
    public void setShouldPayMoney(String shouldPayMoney) {
        this.shouldPayMoney = shouldPayMoney;
    }

    /**
     * 获取实付金额
     *
     * @return fact_pay_money - 实付金额
     */
    public String getFactPayMoney() {
        return factPayMoney;
    }

    /**
     * 设置实付金额
     *
     * @param factPayMoney 实付金额
     */
    public void setFactPayMoney(String factPayMoney) {
        this.factPayMoney = factPayMoney;
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
}