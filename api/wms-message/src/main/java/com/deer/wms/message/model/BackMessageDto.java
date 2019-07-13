package com.deer.wms.message.model;

/**
 * @description 待办消息拓展
 * @Author jixing ©redoor
 * @create 2017/10/23
 */
public class BackMessageDto extends BackMessage{

    // 消息类型:  order(消息通知) / warning （告警消息）
    private String businessTypeValue;
    
    // 消息状态 unread(未读) / read （已读） 
    private String backStateValue;
    
    // 消息规则
    private String noticeRuleValue;
    
    // 终端位置
    private String terminalPosition;
    
    // 业务类型 （：写死 托盘承租）
    private String noticeTypeValue;
    
    // 客户方
    private String customerName;
    
    // 出租方（业主方）
    private String leaseCustomer;
    
	public String getBusinessTypeValue()
	{
		return businessTypeValue;
	}

	public void setBusinessTypeValue( String businessTypeValue )
	{
		this.businessTypeValue = businessTypeValue;
	}

	public String getBackStateValue()
	{
		return backStateValue;
	}

	public void setBackStateValue( String backStateValue )
	{
		this.backStateValue = backStateValue;
	}

	public String getNoticeRuleValue()
	{
		return noticeRuleValue;
	}

	public void setNoticeRuleValue( String noticeRuleValue )
	{
		this.noticeRuleValue = noticeRuleValue;
	}

	public String getTerminalPosition()
	{
		return terminalPosition;
	}

	public void setTerminalPosition( String terminalPosition )
	{
		this.terminalPosition = terminalPosition;
	}

	public String getNoticeTypeValue()
	{
		return noticeTypeValue;
	}

	public void setNoticeTypeValue( String noticeTypeValue )
	{
		this.noticeTypeValue = noticeTypeValue;
	}

	public String getCustomerName()
	{
		return customerName;
	}

	public void setCustomerName( String customerName )
	{
		this.customerName = customerName;
	}

	public String getLeaseCustomer()
	{
		return leaseCustomer;
	}

	public void setLeaseCustomer( String leaseCustomer )
	{
		this.leaseCustomer = leaseCustomer;
	}
}
