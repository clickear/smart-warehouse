package com.deer.wms.message.service.impl;

import com.deer.wms.message.model.NoticeCriteria;
import com.deer.wms.message.dao.NoticeMapper;
import com.deer.wms.message.model.NoticeDto;
import com.deer.wms.message.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.deer.wms.message.model.Notice;
import com.deer.wms.project.seed.core.service.AbstractService;

import java.util.List;

/**
 * Created by WUXB on 2017/10/09.
 */
@Service
@Transactional
public class NoticeServiceImpl extends AbstractService<Notice, Integer> implements NoticeService {

    @Autowired
    private NoticeMapper noticeMapper;

	@Override
	public List<NoticeDto> findByBusinessNo(String businessNo) {
		
		return noticeMapper.findByBusinessNo(businessNo);
	}

	@Override
	public List<NoticeDto> findByBusinessNoForTransportBillNo(NoticeCriteria criteria) {
		return noticeMapper.findByBusinessNoForTransportBillNo(criteria);
	}

	@Override
	public List<NoticeDto> getAlarmList(NoticeCriteria criteria) {
		return noticeMapper.getAlarmList(criteria);
	}

}
