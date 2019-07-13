package com.deer.wms.message.dao;

import java.util.List;

import com.deer.wms.message.model.BackMessage;
import com.deer.wms.message.model.BackMessageCriteria;
import com.deer.wms.message.model.BackMessageDto;
import com.deer.wms.project.seed.core.mapper.Mapper;

public interface BackMessageMapper extends Mapper<BackMessage>
{
	public List<BackMessageDto> selectBackList( BackMessage backMessage );
	
	public List<BackMessageDto> selectSupplyBackList( BackMessageCriteria criteria );
	
	/**
	 * 根据业务单号查询对应的消息数据
	 * 
	 * @param businessNo 业务单号
	 * @return
	 */
	public List<BackMessageDto> selectBackByBusinessNo( String businessNo );
	
	/**
	 * 根据业务单号修改消息状态值
	 * @param backMessage
	 */
	void updateStateByBusinessNo( BackMessage backMessage );
	
	
	
}