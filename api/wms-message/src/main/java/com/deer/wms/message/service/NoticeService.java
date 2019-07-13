package com.deer.wms.message.service;

import com.deer.wms.message.model.Notice;
import com.deer.wms.message.model.NoticeCriteria;
import com.deer.wms.message.model.NoticeDto;
import com.deer.wms.project.seed.core.service.Service;

import java.util.List;

/**
 * Created by WUXB on 2017/10/09.
 */
public interface NoticeService extends Service<Notice, Integer> {
	public List<NoticeDto> findByBusinessNo(String  businessNo);


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
