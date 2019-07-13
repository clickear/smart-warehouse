package com.deer.wms.project.seed.constant;

import java.util.Date;

import com.deer.wms.project.seed.util.DateUtils;

/**
 * 获取订单号（租赁、续租、转租、退板 订单号）
 * @author slh
 *{@link Date 2017-10-16
 */
public class GetOrderNoSingle
{
	private static GetOrderNoSingle instance;
	
	// 租赁 当前年月日
	private String zlCurrentTime;
	
	// 租赁订单当天订单号
	private int zlOrderIndex = 1;
	
	// 续租 当前年月日
	private String xzCurrentTime;
	
	// 续租订单当天订单号
	private int xzOrderIndex = 1;
	
	// 转租 当前年月日
	private String zzCurrentTime;
	
	// 转租订单当天订单号
	private int zzOrderIndex = 1;
	
	// 退板 当前年月日
	private String tbCurrentTime;
	
	// 退板订单当天订单号
	private int tbOrderIndex = 1;
	
	// 供应管理订单  当前年月日
	private String ddCurrentTime;
	
	// 供应管理订单 当天订单号
	private int ddOrderIndex = 1;
	
	// 网点作业信息  当前年月日
	private String zyCurrentTime;
	
	// 网点作业信息当天订单号
	private int zyOrderIndex = 1;
	
	private GetOrderNoSingle()
	{}

	/**
	 * 获取实例对象
	 * @return
	 */
	public static GetOrderNoSingle getInstance()
	{
		if(instance == null)
		{
			instance = new GetOrderNoSingle();
			
			// 初始化当前日期
			instance.zlCurrentTime = DateUtils.getCurrentDate( "yyyyMMdd" );
			instance.xzCurrentTime = instance.zlCurrentTime;
			instance.zzCurrentTime = instance.zlCurrentTime;
			instance.tbCurrentTime = instance.zlCurrentTime;
			instance.ddCurrentTime = instance.zlCurrentTime;
			instance.zyCurrentTime = instance.zlCurrentTime;
			
			// 初始化值
			instance.zlOrderIndex = 0;
			instance.xzOrderIndex = 0;
			instance.zzOrderIndex = 0;
			instance.tbOrderIndex = 0;
			instance.ddOrderIndex = 0;
			instance.zyOrderIndex = 0;
		}
		return instance;
	}

	public String getZlCurrentTime()
	{
		return zlCurrentTime;
	}

	public void setZlCurrentTime( String zlCurrentTime )
	{
		this.zlCurrentTime = zlCurrentTime;
	}

	public synchronized int getZlOrderIndex()
	{
		if (zlCurrentTime.equals( DateUtils.getCurrentDate( "yyyyMMdd" ) ))
		{
			zlOrderIndex = zlOrderIndex + 1;
		}
		else
		{
			zlCurrentTime =  DateUtils.getCurrentDate( "yyyyMMdd" );
			zlOrderIndex = 1;
		}
		return zlOrderIndex;
	}

	public void setZlOrderIndex( int zlOrderIndex )
	{
		this.zlOrderIndex = zlOrderIndex;
	}

	public String getXzCurrentTime()
	{
		return xzCurrentTime;
	}

	public void setXzCurrentTime( String xzCurrentTime )
	{
		this.xzCurrentTime = xzCurrentTime;
	}

	public synchronized int getXzOrderIndex()
	{
		if (xzCurrentTime.equals( DateUtils.getCurrentDate( "yyyyMMdd" ) ))
		{
			xzOrderIndex = xzOrderIndex + 1;
		}
		else
		{
			xzCurrentTime =  DateUtils.getCurrentDate( "yyyyMMdd" );
			xzOrderIndex = 1;
		}
		
		return xzOrderIndex;
	}

	public void setXzOrderIndex( int xzOrderIndex )
	{
		this.xzOrderIndex = xzOrderIndex;
	}

	public String getZzCurrentTime()
	{
		return zzCurrentTime;
	}

	public void setZzCurrentTime( String zzCurrentTime )
	{
		this.zzCurrentTime = zzCurrentTime;
	}

	public synchronized int getZzOrderIndex()
	{
		if (zzCurrentTime.equals( DateUtils.getCurrentDate( "yyyyMMdd" ) ))
		{
			zzOrderIndex = zzOrderIndex + 1;
		}
		else
		{
			zzCurrentTime =  DateUtils.getCurrentDate( "yyyyMMdd" );
			zzOrderIndex = 1;
		}
		
		return zzOrderIndex;
	}

	public void setZzOrderIndex( int zzOrderIndex )
	{
		this.zzOrderIndex = zzOrderIndex;
	}

	public String getTbCurrentTime()
	{
		return tbCurrentTime;
	}

	public void setTbCurrentTime( String tbCurrentTime )
	{
		this.tbCurrentTime = tbCurrentTime;
	}

	public synchronized int getTbOrderIndex()
	{
		if (tbCurrentTime.equals( DateUtils.getCurrentDate( "yyyyMMdd" ) ))
		{
			tbOrderIndex = tbOrderIndex + 1;
		}
		else
		{
			tbCurrentTime =  DateUtils.getCurrentDate( "yyyyMMdd" );
			tbOrderIndex = 1;
		}
		
		return tbOrderIndex;
	}

	public void setTbOrderIndex( int tbOrderIndex )
	{
		this.tbOrderIndex = tbOrderIndex;
	}

	public String getDdCurrentTime()
	{
		return ddCurrentTime;
	}

	public void setDdCurrentTime( String ddCurrentTime )
	{
		this.ddCurrentTime = ddCurrentTime;
	}

	public synchronized int getDdOrderIndex()
	{
		if (ddCurrentTime.equals( DateUtils.getCurrentDate( "yyyyMMdd" ) ))
		{
			ddOrderIndex = ddOrderIndex + 1;
		}
		else
		{
			ddCurrentTime =  DateUtils.getCurrentDate( "yyyyMMdd" );
			ddOrderIndex = 1;
		}
		
		return ddOrderIndex;
	}

	public void setDdOrderIndex( int ddOrderIndex )
	{
		this.ddOrderIndex = ddOrderIndex;
	}

	public String getZyCurrentTime()
	{
		return zyCurrentTime;
	}

	public void setZyCurrentTime( String zyCurrentTime )
	{
		this.zyCurrentTime = zyCurrentTime;
	}

	public synchronized int getZyOrderIndex()
	{
		if (zyCurrentTime.equals( DateUtils.getCurrentDate( "yyyyMMdd" ) ))
		{
			zyOrderIndex = zyOrderIndex + 1;
		}
		else
		{
			zyCurrentTime =  DateUtils.getCurrentDate( "yyyyMMdd" );
			zyOrderIndex = 1;
		}
		
		return zyOrderIndex;
	}

	public void setZyOrderIndex( int zyOrderIndex )
	{
		this.zyOrderIndex = zyOrderIndex;
	}
	
}
