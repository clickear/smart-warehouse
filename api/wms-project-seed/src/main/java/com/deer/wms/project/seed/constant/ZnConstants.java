package com.deer.wms.project.seed.constant;

/**
 * 系统中文常量定义
 *
 * Created by Floki on 2017/9/28.
 */
public class ZnConstants
{
	////////------------------  租赁管理   ----------------- Start  ///////////////
	/**
	 * 租赁方式: 1 平台出租
	 */
	public static final String LEASE_MODE_PLATFORM = "平台出租";
	
	/**
	 * 租赁方式: 2平台出租
	 */
	public static final String LEASE_MODE_AGENT = "代理商出租";
	
	/**
	 * 租赁类型：1-短租
	 */
	public static final String LEASE_TYPE_SHORT = "短租";
	
	/**
	 * 租赁类型：2-长租
	 */
	public static final String LEASE_TYPE_LONG = "长租";
	
	/**
	 * 是否首单：0=不是
	 */
	public static final String FIRST_SINGE_NOT = "不是";
	
	/**
	 * 是否首单：1=是
	 */
	public static final String FIRST_SINGE_IS = "是";
	
	/**
	 * 取货方式：1-上门自取；
	 */
	public static final String PICkUP_MODE_TASK = "上门自取";
	
	/**
	 * 取货方式：2-送货上门
	 */
	public static final String PICkUP_MODE_GIVE = "送货上门";
	
	/**
	 * 付费方式：1=银行转账
	 */
	public static final String PAYMENT_METHOD_BANK = "银行转账";
	
	/**
	 * 付费方式：2=微信转账
	 */
	public static final String PAYMENT_METHOD_WECHAT = "微信转账";
	
	/**
	 * 付费方式：23=支付宝转账
	 */
	public static final String PAYMENT_METHOD_ALIPAY = "支付宝转账";
	
	/**
	 * 确认状态：0=未确认
	 */
	public static final String CONFIRM_STATUS_NO = "未审核";  
	
	/**
	 * 确认状态：1=已确认
	 */
	public static final String CONFIRM_STATUS_IS = "已审核";  
	
	/**
	 * 收货状态：0-未收货
	 */
	public static final String RECEIVE_STATUS_NOT = "未收货";
	
	/**
	 * 收货状态：1-部分收货
	 */
	public static final String RECEIVE_STATUS_PART = "部分收货";
	
	/**
	 * 收货状态：2-全部收货
	 */
	public static final String RECEIVE_STATUS_ALL = "全部收货";
	
	/**
	 * 收货状态：3：取消订单
	 */
	public static final String RECEIVE_STATUS_CANCEL = "取消订单";
	
	/**
	 * 退板类型：1到期退板
	 */
	public static final String RETURN_TYPE_EXPIRE = "到期退板"; 
	
	/**
	 * 退板类型：2其他原因
	 */
	public static final String RETURN_TYPE_OTHER = "其他原因"; 
	
	/**
	 * 退板方式：1全部退
	 */
	public static final String RETURN_MODE_ALL = "全部退";
	
	/**
	 * 退板方式：2部分退；
	 */
	public static final String RETURN_MODE_PART = "部分退";
	
	/**
	 * 退板配送方式：1租方自取；2承租方配送；
	 */
	public static final String RETURN_DISTRIBUTION_TAKE = "租方自取";
	
	/**
	 * 退板配送方式：1租方自取；2承租方配送；
	 */
	public static final String RETURN_DISTRIBUTION_GIVE = "承租方配送";
	
	
	////////------------------  租赁管理   ----------------- End  ///////////////

	/////////// ------------------消息管理------------------ Start  ////////////
	/**
	 * 消息类型：order(消息通知)
	 */
	public static final String BUSINESS_TYPE_ORDER = "消息通知";
	
	/**
	 * 消息类型：warning （告警消息）
	 */
	public static final String BUSINESS_TYPE_WARN = "告警消息";
	
	/**
	 * 消息状态:unread(未读) 
	 */
	public static final String BACK_STATE_UNREAD = "未读";
	
	/**
	 * 消息状态 : read （已读） 
	 */
	public static final String BACK_STATE_READ = "已读";
	
	
	
	/////////// ------------------消息类型------------------ End  ////////////
	
	/**
	 * 信息状态：normal=正常的
	 */
	public static final String INFO_STATE_NORMAL = "正常的";
	

	/**
	 * 信息状态：invalid=无效的
	 */
	public static final String INFO_STATE_INVALID = "无效的";
	
	/**
	 * 信息状态：deleted=已删除
	 */
	public static final String INFO_STATE_DELETED = "已删除";
	

}
