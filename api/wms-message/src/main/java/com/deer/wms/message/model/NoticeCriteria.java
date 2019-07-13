package com.deer.wms.message.model;

import java.util.List;

import com.alibaba.druid.util.StringUtils;
import com.deer.wms.project.seed.core.service.QueryCriteria;

/**
* Created by WUXB on 2017/10/09.
*/
public class NoticeCriteria extends QueryCriteria {
    /**
     * 托盘ID关键字
     */
    private String keyword;

    /**
     * 单号
     */
    private String transportBillNo;
    
    /**
     * 设备id列表
     */
    private List<String> deviceIdList;
    
    /**
     * 轨迹分析时间 - 开始时间
     */
    private String startDate;
    
    /**
     * 轨迹分析时间  - 结束时间
     */
    private String endDate;

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public String getTransportBillNo() {
        return transportBillNo;
    }

    public void setTransportBillNo(String transportBillNo) {
        this.transportBillNo = transportBillNo;
    }
    
    public List<String> getDeviceIdList() {
		return deviceIdList;
	}

	public void setDeviceIdList(List<String> deviceIdList) {
		this.deviceIdList = deviceIdList;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		if(!StringUtils.isEmpty(startDate)){
			startDate = startDate.trim()+" 00:00:00";
        }
        this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		if(!StringUtils.isEmpty(endDate)){
			endDate = endDate.trim()+" 23:59:59";
        }
        this.endDate = endDate;
	}
}
