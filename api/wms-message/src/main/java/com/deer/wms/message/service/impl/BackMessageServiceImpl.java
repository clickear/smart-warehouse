package com.deer.wms.message.service.impl;

import java.util.List;

import com.deer.wms.message.dao.BackMessageMapper;
import com.deer.wms.message.model.BackMessageCriteria;
import com.deer.wms.message.service.BackMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.deer.wms.message.model.BackMessage;
import com.deer.wms.message.model.BackMessageDto;
import com.deer.wms.project.seed.core.service.AbstractService;

/**
 * Created by WUXB on 2017/10/17.
 */
@Service
@Transactional
public class BackMessageServiceImpl extends AbstractService<BackMessage, Integer> implements BackMessageService
{

	@Autowired
	private BackMessageMapper backMessageMapper;

	@Override
	public List<BackMessageDto> selectBackList( BackMessage backMessage )
	{
		return backMessageMapper.selectBackList( backMessage );
	}

	@Override
	public List<BackMessageDto> selectSupplyBackList( BackMessageCriteria criteria )
	{
		return backMessageMapper.selectSupplyBackList( criteria );
	}
	
	public List<BackMessageDto> selectBackByBusinessNo( String businessNo )
	{
		return backMessageMapper.selectBackByBusinessNo( businessNo );
	}
	
	@Override
	public void updateStateByBusinessNo( BackMessage backMessage )
	{
		backMessageMapper.updateStateByBusinessNo( backMessage );
	}
}
