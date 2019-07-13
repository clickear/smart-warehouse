package com.deer.wms.message.model;

import org.springframework.util.StringUtils;

import com.deer.wms.project.seed.core.service.QueryCriteria;

/**
* Created by WUXB on 2017/10/09.
*/
public class ConsultCriteria extends QueryCriteria {
	/**
	 * 咨询编号
	 */
	private Integer consultId;
	
	/**
	 * 是否回复
	 */
	private Boolean reply;
	
	/**
	 * 咨询时间
	 */
	private String consultTime;
	
	/**
	 * 关键字
	 */
	private String keywords;
	
	/**
	 * 咨询时间范围头
	 */
	private String consultStartTime;
	
	/**
	 * 咨询时间范围尾
	 */
	private String consultEndTime;
	
	/**
	 * 咨询回复内容
	 */
	private String replyContent;
	
	/**
	 * 回复人id
	 */
	private Integer replyUserId;
	
	/**
	 * 咨询人id
	 */
	private Integer consultUserId;

	public Boolean getReply() {
		return reply;
	}

	public void setReply(Boolean reply) {
		this.reply = reply;
	}

	public String getConsultTime() {
		return consultTime;
	}

	public void setConsultTime(String consultTime) {
		this.consultTime = consultTime;
	}

	public String getKeywords() {
		return keywords;
	}

	public void setKeywords(String keywords) {
		this.keywords = keywords;
	}

	public String getConsultStartTime() {
		return consultStartTime;
	}

	public void setConsultStartTime(String consultStartTime) {
		if(!StringUtils.isEmpty(consultStartTime)){
			consultStartTime = consultStartTime+" 00:00:00";
		}
		this.consultStartTime = consultStartTime;
	}

	public String getConsultEndTime() {
		return consultEndTime;
	}

	public void setConsultEndTime(String consultEndTime) {
		if(!StringUtils.isEmpty(consultEndTime)){
			consultEndTime = consultEndTime+" 23:59:59";
		}
		this.consultEndTime = consultEndTime;
	}

	public Integer getConsultId() {
		return consultId;
	}

	public void setConsultId(Integer consultId) {
		this.consultId = consultId;
	}

	public String getReplyContent() {
		return replyContent;
	}

	public void setReplyContent(String replyContent) {
		this.replyContent = replyContent;
	}

	public Integer getReplyUserId() {
		return replyUserId;
	}

	public void setReplyUserId(Integer replyUserId) {
		this.replyUserId = replyUserId;
	}

	public Integer getConsultUserId() {
		return consultUserId;
	}

	public void setConsultUserId(Integer consultUserId) {
		this.consultUserId = consultUserId;
	}
}
