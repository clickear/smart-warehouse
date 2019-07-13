package com.deer.wms.project.seed.constant;

/**
 * 获取下拉框中对应的属性值
 * 
 * @author shilh
 * @date 2017-10-23
 */
public class GetZnConstantUtil
{
	/**
	 * 获取租赁方式的值; 租赁方式：1-平台出租；2-代理商出租
	 * @return
	 */
	public static String getLeaseMode(Integer leaseMode)
	{
		if (leaseMode == null)
		{
			return null;
		}
		else if(leaseMode.intValue() == 1)
		{
			return ZnConstants.LEASE_MODE_PLATFORM;
		}
		else if(leaseMode.intValue() == 2)
		{
			return ZnConstants.LEASE_MODE_AGENT;
		}
		return "";
	}
	
	/**
	 * 获取租赁类型的值; 租赁类型：1-短租；2-长租
	 * @return
	 */
	public static String getLeaseType(Integer leaseType)
	{
		if (leaseType == null)
		{
			return null;
		}
		else if(leaseType.intValue() == 1)
		{
			return ZnConstants.LEASE_TYPE_SHORT;
		}
		else if(leaseType.intValue() == 2)
		{
			return ZnConstants.LEASE_TYPE_LONG;
		}
		return "";
	}
	
	/**
	 * 获取是否首单的值; 是否首单，首单免租金：0=不是；1=是
	 * @return
	 */
	public static String getFirstSingle(Integer firstSingle)
	{
		if (firstSingle == null)
		{
			return null;
		}
		else if(firstSingle.intValue() == 0)
		{
			return ZnConstants.FIRST_SINGE_IS;
		}
		else if(firstSingle.intValue() == 1)
		{
			return ZnConstants.FIRST_SINGE_NOT;
		}
		return "";
	}
	
	/**
	 * 获取取货方式的值; 取货方式：1-上门自取；2-送货上门；
	 * @return
	 */
	public static String getPickupMode(Integer pickupMode)
	{
		if (pickupMode == null)
		{
			return null;
		}
		else if(pickupMode.intValue() == 1)
		{
			return ZnConstants.PICkUP_MODE_TASK;
		}
		else if(pickupMode.intValue() == 2)
		{
			return ZnConstants.PICkUP_MODE_GIVE;
		}
		return "";
	}
	
	/**
	 * 获取付费方式的值; 付费方式：1=银行转账；2=微信转账；3=支付宝转账
	 * @return
	 */
	public static String getPaymentMethod(Integer paymentMethod)
	{
		if (paymentMethod == null)
		{
			return null;
		}
		else if(paymentMethod.intValue() == 1)
		{
			return ZnConstants.PAYMENT_METHOD_BANK;
		}
		else if(paymentMethod.intValue() == 2)
		{
			return ZnConstants.PAYMENT_METHOD_WECHAT;
		}
		else if(paymentMethod.intValue() == 3)
		{
			return ZnConstants.PAYMENT_METHOD_ALIPAY;
		}
		return "";
	}
	
	/**
	 * 获取确认状态的值; 确认状态：0=未确认；1=已确认；默认未确认
	 * @return
	 */
	public static String getConfirmStatus(Integer confirmStatus)
	{
		if (confirmStatus == null)
		{
			return null;
		}
		else if(confirmStatus.intValue() == 0)
		{
			return ZnConstants.CONFIRM_STATUS_NO;
		}
		else if(confirmStatus.intValue() == 1)
		{
			return ZnConstants.CONFIRM_STATUS_IS;
		}
		
		return "";
	}
	
	/**
	 * 获取收货状态的值; 收货状态：0-未收货；1-部分收货；2-全部收货；3：取消订单
	 * @return
	 */
	public static String getReceiveStatus(String receiveStatus)
	{
		if (receiveStatus == null)
		{
			return null;
		}
		else if(receiveStatus.equals( "0" ))
		{
			return ZnConstants.RECEIVE_STATUS_NOT;
		}
		else if(receiveStatus.equals( "1" ))
		{
			return ZnConstants.RECEIVE_STATUS_PART;
		}
		else if(receiveStatus.equals( "2" ))
		{
			return ZnConstants.RECEIVE_STATUS_ALL;
		}
		else if(receiveStatus.equals( "3" ))
		{
			return ZnConstants.RECEIVE_STATUS_CANCEL;
		}
		
		return "";
	}
	
	/**
	 * 获取信息状态的值; 信息状态：normal=正常的；invalid=无效的；deleted=已删除；默认正常的
	 * @return
	 */
	public static String getInfoState(String infoState)
	{
		if (infoState == null)
		{
			return null;
		}
		else if(infoState.equals( "normal" ))
		{
			return ZnConstants.INFO_STATE_NORMAL;
		}
		else if(infoState.equals( "invalid" ))
		{
			return ZnConstants.INFO_STATE_INVALID;
		}
		else if(infoState.equals( "deleted" ))
		{
			return ZnConstants.INFO_STATE_DELETED;
		}
		
		return "";
	}
	
	/**
	 * 获取消息类型的值; 消息类型:  order(消息通知) / warning （告警消息）
	 * @return
	 */
	public static String getBusinessType(String businessType)
	{
		if (businessType == null)
		{
			return null;
		}
		else if(businessType.equals( "order" ))
		{
			return ZnConstants.BUSINESS_TYPE_ORDER;
		}
		else if(businessType.equals( "warning" ))
		{
			return ZnConstants.BUSINESS_TYPE_WARN;
		}
		
		return "";
	}
	
	/**
	 * 获取消息类型的值; 消息类型:  order(消息通知) / warning （告警消息）
	 * @return
	 */
	public static String getBackState(String backState)
	{
		if (backState == null)
		{
			return null;
		}
		else if(backState.equals( "unread" ))
		{
			return ZnConstants.BACK_STATE_UNREAD;
		}
		else if(backState.equals( "read" ))
		{
			return ZnConstants.BACK_STATE_READ;
		}
		return "";
	}
	
	/**
	 * 退板类型：1到期退板、2其他原因
	 * @return
	 */
	public static String getReturnType(Integer returnType)
	{
		if (returnType == null)
		{
			return null;
		}
		else if(returnType.intValue() == 1)
		{
			return ZnConstants.RETURN_TYPE_EXPIRE;
		}
		else if(returnType.intValue() == 2)
		{
			return ZnConstants.RETURN_TYPE_OTHER;
		}
		return "";
	}
	
	/**
	 * 退板类型：1到期退板、2其他原因
	 * @return
	 */
	public static String getReturnMode(Integer returnMode)
	{
		if (returnMode == null)
		{
			return null;
		}
		else if(returnMode.intValue() == 1)
		{
			return ZnConstants.RETURN_MODE_ALL;
		}
		else if(returnMode.intValue() == 2)
		{
			return ZnConstants.RETURN_MODE_PART;
		}
		return "";
	}
	
	/**
	 * 退板类型：1到期退板、2其他原因
	 * @return
	 */
	public static String getReturnDistribution(Integer returnDistribute)
	{
		if (returnDistribute == null)
		{
			return null;
		}
		else if(returnDistribute == 1)
		{
			return ZnConstants.RETURN_DISTRIBUTION_TAKE;
		}
		else if(returnDistribute == 2)
		{
			return ZnConstants.RETURN_DISTRIBUTION_GIVE;
		}
		return "";
	}
}
