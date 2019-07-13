package com.deer.wms.bill.manage.model;

import java.util.Date;
import javax.persistence.*;

@Table(name = "bill_record")
public class BillRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "bill_no")
    private String billNo;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "create_time")
    private String createTime;


    /***
     * 1-新建 2-修改 3-审核
     *
     * */
    private Integer type;

    private String demo;

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
     * @return bill_no
     */
    public String getBillNo() {
        return billNo;
    }

    /**
     * @param billNo
     */
    public void setBillNo(String billNo) {
        this.billNo = billNo;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    /**
     * @return type
     */
    public Integer getType() {
        return type;
    }

    /**
     * @param type
     */
    public void setType(Integer type) {
        this.type = type;
    }

    /**
     * @return demo
     */
    public String getDemo() {
        return demo;
    }

    /**
     * @param demo
     */
    public void setDemo(String demo) {
        this.demo = demo;
    }
}