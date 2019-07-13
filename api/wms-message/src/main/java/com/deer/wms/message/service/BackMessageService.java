package com.deer.wms.message.service;

import java.util.List;

import com.deer.wms.message.model.BackMessage;
import com.deer.wms.message.model.BackMessageCriteria;
import com.deer.wms.message.model.BackMessageDto;
import com.deer.wms.project.seed.core.service.Service;

/**
 * Created by WUXB on 2017/10/17.
 */
public interface BackMessageService extends Service<BackMessage, Integer>
{
	/**
	 * 关联查询已读或者未读消息
	 * @description <描述>
	 * @param backMessage
	 * @return List<BackMessage> 返回类型
	 * @author xuYingYang
	 * @version V1.0
	 * @date 2017年10月17日
	 * @email xuyingyang_cloud@sina.com
	 */
	public List<BackMessageDto> selectBackList( BackMessage backMessage );
	
	/**
	 * 查询供应订单的数据
	 * @param criteria
	 * @return
	 */
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
