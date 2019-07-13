package com.deer.wms.message.model;

import com.deer.wms.project.seed.serializer.YMDHMSDateSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Table( name = "back_message" )
public class BackMessage
{
	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY )
	private Integer id;

	/**
	 * 消息标题
	 */
	private String title;

	/**
	 * 业务编号
	 */
	@Column( name = "business_no" )
	private String businessNo;

	/**
	 * 业务类型 order / warning
	 */
	@Column( name = "business_type" )
	private String businessType;

	/**
	 * 消息状态 unread / read
	 */
	@Column( name = "back_state" )
	private String backState;

	/**
	 * 创建时间
	 */
	@Column( name = "create_time" )
	private Date createTime;

	/**
	 * 创建人id
	 */
	@Column( name = "create_user_id" )
	private Integer createUserId;

	/**
	 * 更新时间
	 */
	@Column( name = "UPDATE_time" )
	private Date updateTime;

	/**
	 * 更新人id
	 */
	@Column( name = "update_user_id" )
	private Integer updateUserId;
	/** 消息接收人id */
	@Column( name = "from_user_id" )
	private Integer fromUserId;

    /**
     * 信息状态：normal=正常的；invalid=无效的；deleted=已删除；默认正常的
     */
    private String state;
	
	/**
	 * @return id
	 */
	public Integer getId()
	{
		return id;
	}

	/**
	 * @param id
	 */
	public void setId( Integer id )
	{
		this.id = id;
	}

	/**
	 * 获取消息标题
	 *
	 * @return title - 消息标题
	 */
	public String getTitle()
	{
		return title;
	}

	/**
	 * 设置消息标题
	 *
	 * @param title 消息标题
	 */
	public void setTitle( String title )
	{
		this.title = title;
	}

	/**
	 * 获取业务编号
	 *
	 * @return business_no - 业务编号
	 */
	public String getBusinessNo()
	{
		return businessNo;
	}

	/**
	 * 设置业务编号
	 *
	 * @param businessNo 业务编号
	 */
	public void setBusinessNo( String businessNo )
	{
		this.businessNo = businessNo;
	}

	/**
	 * 获取业务类型 order / warning
	 *
	 * @return business_type - 业务类型 order / warning
	 */
	public String getBusinessType()
	{
		return businessType;
	}

	/**
	 * 设置业务类型 order / warning
	 *
	 * @param businessType 业务类型 order / warning
	 */
	public void setBusinessType( String businessType )
	{
		this.businessType = businessType;
	}

	/**
	 * 获取消息状态 unread / read
	 *
	 * @return back_state - 消息状态 unread / read
	 */
	public String getBackState()
	{
		return backState;
	}

	/**
	 * 设置消息状态 unread / read
	 *
	 * @param backState 消息状态 unread / read
	 */
	public void setBackState( String backState )
	{
		this.backState = backState;
	}

	/**
	 * 获取创建时间
	 *
	 * @return create_time - 创建时间
	 */
	@JsonSerialize(using = YMDHMSDateSerializer.class)
	public Date getCreateTime()
	{
		return createTime;
	}

	/**
	 * 设置创建时间
	 *
	 * @param createTime 创建时间
	 */
	public void setCreateTime( Date createTime )
	{
		this.createTime = createTime;
	}

	/**
	 * 获取创建人id
	 *
	 * @return create_user_id - 创建人id
	 */
	public Integer getCreateUserId()
	{
		return createUserId;
	}

	/**
	 * 设置创建人id
	 *
	 * @param createUserId 创建人id
	 */
	public void setCreateUserId( Integer createUserId )
	{
		this.createUserId = createUserId;
	}

	/**
	 * 获取更新时间
	 *
	 * @return UPDATE_time - 更新时间
	 */
	public Date getUpdateTime()
	{
		return updateTime;
	}

	/**
	 * 设置更新时间
	 *
	 * @param updateTime 更新时间
	 */
	public void setUpdateTime( Date updateTime )
	{
		this.updateTime = updateTime;
	}

	/**
	 * 获取更新人id
	 *
	 * @return update_user_id - 更新人id
	 */
	public Integer getUpdateUserId()
	{
		return updateUserId;
	}

	/**
	 * 设置更新人id
	 *
	 * @param updateUserId 更新人id
	 */
	public void setUpdateUserId( Integer updateUserId )
	{
		this.updateUserId = updateUserId;
	}

	public Integer getFromUserId()
	{
		return fromUserId;
	}

	public void setFromUserId( Integer fromUserId )
	{
		this.fromUserId = fromUserId;
	}

	public String getState()
	{
		return state;
	}

	public void setState( String state )
	{
		this.state = state;
	}

}