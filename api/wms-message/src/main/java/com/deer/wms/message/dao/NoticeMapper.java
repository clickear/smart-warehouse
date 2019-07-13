package com.deer.wms.message.dao;

import com.deer.wms.message.model.Notice;
import com.deer.wms.message.model.NoticeCriteria;
import com.deer.wms.message.model.NoticeDto;
import com.deer.wms.project.seed.core.mapper.Mapper;

import java.util.List;

public interface NoticeMapper extends Mapper<Notice> {
	
	public List<NoticeDto> findByBusinessNo(String businessNo);

	/**
	 * 运单下的托盘围栏告警列表
	 * @param criteria
	 * @return
	 */
	public List<NoticeDto> findByBusinessNoForTransportBillNo(NoticeCriteria criteria);
	
	/**
     * 根据设备id查找告警位置
     * @param criteria
     * @return
     */
    List<NoticeDto> getAlarmList(NoticeCriteria criteria);
}