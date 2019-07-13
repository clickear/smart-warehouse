package com.deer.wms.message.model;

import java.util.List;

import com.deer.wms.project.seed.core.service.QueryCriteria;

/**
 * Created by WUXB on 2017/10/17.
 */
public class BackMessageCriteria extends QueryCriteria
{
	private Integer id;
	/**
	 * 业务编号
	 */
	private String businessNo;
	/**
	 * 业务类型 order / warning
	 */
	private String businessType;
	/**
	 * 消息状态 unread / read
	 */
	private String backState;
	/**
	 * 创建人id
	 */
	private Integer fromUserId;
	
	// 订单号集合
	private List<String> orderNoList;

	public Integer getId()
	{
		return id;
	}

	public void setId( Integer id )
	{
		this.id = id;
	}

	public String getBusinessType()
	{
		return businessType;
	}

	public void setBusinessType( String businessType )
	{
		this.businessType = businessType;
	}

	public String getBackState()
	{
		return backState;
	}

	public void setBackState( String backState )
	{
		this.backState = backState;
	}

	public Integer getFromUserId()
	{
		return fromUserId;
	}

	public void setFromUserId( Integer fromUserId )
	{
		this.fromUserId = fromUserId;
	}

	public String getBusinessNo()
	{
		return businessNo;
	}

	public void setBusinessNo( String businessNo )
	{
		this.businessNo = businessNo;
	}

	public List<String> getOrderNoList()
	{
		return orderNoList;
	}

	public void setOrderNoList( List<String> orderNoList )
	{
		this.orderNoList = orderNoList;
	}
}
