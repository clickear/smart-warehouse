package com.deer.wms.system.manage.model.param;

/**
 * 订单费用参数对象
 *
 * Created by shilihua on 2017/10/17.
 */
public class OrderExpensesParam
{
	// 保证金（每个托盘的保证金）
	private float cautionMoney;
	
	// 租金(每日每天的租金)
	private float rentMoney;

	// 转租租金 （每日每天的租金）
	private float reletMoney;
	
	public float getCautionMoney()
	{
		return cautionMoney;
	}

	public void setCautionMoney( float cautionMoney )
	{
		this.cautionMoney = cautionMoney;
	}

	public float getRentMoney()
	{
		return rentMoney;
	}

	public void setRentMoney( float rentMoney )
	{
		this.rentMoney = rentMoney;
	}

	public float getReletMoney()
	{
		return reletMoney;
	}

	public void setReletMoney( float reletMoney )
	{
		this.reletMoney = reletMoney;
	}
}
