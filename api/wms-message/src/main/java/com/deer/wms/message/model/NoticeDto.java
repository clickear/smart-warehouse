package com.deer.wms.message.model;

import com.deer.wms.project.seed.util.DateUtils;

import java.util.Date;

/**
 * 新增供应订单实体类用户扩展同模块下的新增的字段
 * @author slh
 *{@link Date 2017-10-22}
 */
public class NoticeDto extends Notice
{
	// 消息规则  属性值值
	private String noticeRuleValue;

	private String createTimeStr;

	public String getNoticeRuleValue()
	{
		return noticeRuleValue;
	}

	public void setNoticeRuleValue( String noticeRuleValue )
	{
		this.noticeRuleValue = noticeRuleValue;
	}

	public String getCreateTimeStr() {
		if(super.getCreateTime()!=null){
			createTimeStr = DateUtils.dateToStr(super.getCreateTime(),DateUtils.DEFAULT_DATETIME_FORMAT);
		}
		return createTimeStr;
	}

	public void setCreateTimeStr(String createTimeStr) {
		this.createTimeStr = createTimeStr;
	}
}
