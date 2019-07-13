package com.deer.wms.report.model;

import java.util.Date;
import javax.persistence.*;

@Table(name = "scan_record")
public class ScanRecord {
    @Column(name = "scan_record_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer scanRecordId;

    @Column(name = "scan_code")
    private String scanCode;

    @Column(name = "scan_time")
    private Date scanTime;

    /**
     * 0-入库  1-出库
     */
    private Integer type;

    /**
     * 0-不在库   1-在库
     */
    private Integer state;

    /**
     * @return scan_record_id
     */
    public Integer getScanRecordId() {
        return scanRecordId;
    }

    /**
     * @param scanRecordId
     */
    public void setScanRecordId(Integer scanRecordId) {
        this.scanRecordId = scanRecordId;
    }

    /**
     * @return scan_code
     */
    public String getScanCode() {
        return scanCode;
    }

    /**
     * @param scanCode
     */
    public void setScanCode(String scanCode) {
        this.scanCode = scanCode;
    }

    /**
     * @return scan_time
     */
    public Date getScanTime() {
        return scanTime;
    }

    /**
     * @param scanTime
     */
    public void setScanTime(Date scanTime) {
        this.scanTime = scanTime;
    }

    /**
     * 获取0-入库  1-出库
     *
     * @return type - 0-入库  1-出库
     */
    public Integer getType() {
        return type;
    }

    /**
     * 设置0-入库  1-出库
     *
     * @param type 0-入库  1-出库
     */
    public void setType(Integer type) {
        this.type = type;
    }

    /**
     * 获取0-不在库   1-在库
     *
     * @return state - 0-不在库   1-在库
     */
    public Integer getState() {
        return state;
    }

    /**
     * 设置0-不在库   1-在库
     *
     * @param state 0-不在库   1-在库
     */
    public void setState(Integer state) {
        this.state = state;
    }
}