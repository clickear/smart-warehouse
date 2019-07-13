package com.deer.wms.message.web;

import com.alibaba.druid.util.StringUtils;
import com.deer.wms.intercept.annotation.User;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.message.model.BackMessage;
import com.deer.wms.message.model.BackMessageCriteria;
import com.deer.wms.message.model.BackMessageDto;
import com.deer.wms.message.model.NoticeDto;
import com.deer.wms.message.service.BackMessageService;
import com.deer.wms.message.service.NoticeService;
import com.deer.wms.project.seed.constant.GetZnConstantUtil;
import com.deer.wms.project.seed.core.result.CommonCode;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by WUXB on 2017/10/17.
 */
@RestController
@RequestMapping( "/back/messages" )
public class BackMessageController
{

	@Autowired
	private BackMessageService backMessageService;

	@Autowired
	private NoticeService noticeService;



	private static Logger logger = LoggerFactory.getLogger( BackMessageController.class );

	@ApiOperation( value = "更新待办消息为已读", notes = "更新待办消息" )
	@ApiImplicitParams( { @ApiImplicitParam( name = "access-token", value = "token", paramType = "header", dataType = "String", required = true ),
	        @ApiImplicitParam( name = "id", value = "待办消息id", paramType = "path", dataType = "int", required = true ) } )
	@PutMapping( "/{id}" )
	public Result update( @PathVariable Integer id )
	{
		try
		{
			BackMessage backMessage = backMessageService.findById( id );
			backMessage.setBackState( "read" );
			backMessageService.update( backMessage );
			return ResultGenerator.genSuccessResult();
		}
		catch ( Exception e )
		{
			logger.error( "更新待办消息为已读失败", e );
		}
		return ResultGenerator.genFailResult( CommonCode.SERVER_INERNAL_ERROR );
	}

	@ApiOperation( value = "查询待办消息列表", notes = "查询待办消息列表" )
	@ApiImplicitParams( { @ApiImplicitParam( name = "access-token", value = "token", paramType = "header", dataType = "String", required = true ),
	        @ApiImplicitParam( name = "pageNum", value = "页数", paramType = "query", dataType = "int", required = true ),
	        @ApiImplicitParam( name = "pageSize", value = "每页数据大小", paramType = "query", dataType = "int", required = true ),
	        @ApiImplicitParam( name = "backState", value = "消息状态 unread / read", paramType = "query", dataType = "String" ),
	        @ApiImplicitParam( name = "businessType", value = "业务类型 order / warning", paramType = "query", dataType = "String" )} )
	@GetMapping( "/page" )
	public Result list(BackMessageCriteria criteria, @ApiIgnore @User CurrentUser currentUser)
	{
		//criteria.setPageNum(null);
		//criteria.setPageSize(null);
		if(null==currentUser){
			return ResultGenerator.genFailResult( CommonCode.TOKEN_INVALID);
		}
		BackMessage backMessage = new BackMessage();
		backMessage.setBackState(criteria.getBackState());
		backMessage.setFromUserId(currentUser.getUserId());
		backMessage.setBusinessType(criteria.getBusinessType());

		PageHelper.startPage( criteria.getPageNum(), criteria.getPageSize() );
		List<BackMessageDto> list = backMessageService.selectBackList( backMessage );
		
		// 获取供应订单的订单号
		List<String> orderList = new ArrayList<String>();
		for(BackMessageDto dto : list)
		{
			if(StringUtils.isEmpty( dto.getCustomerName() ))
			{
				orderList.add( dto.getBusinessNo() );
			}
		}
		
		if(orderList != null && orderList.size() > 0)
		{
			criteria.setOrderNoList( orderList );
			criteria.setFromUserId( currentUser.getUserId() );
			criteria.setBusinessType( criteria.getBusinessType() );
			criteria.setBackState( criteria.getBackState() );
			
			// 查询供应订单对应的    业主方 和 客户方;
			List<BackMessageDto> dtolist = backMessageService.selectSupplyBackList( criteria );
			
			for(BackMessageDto dto : list)
			{
				for(BackMessageDto supplyDto : dtolist)
				{
					if(dto.getBusinessNo().equals( supplyDto.getBusinessNo() ))
					{
						dto.setLeaseCustomer(supplyDto.getLeaseCustomer());
						dto.setCustomerName( supplyDto.getCustomerName() );
						break;
					}
				}
			}
		}
		
		PageInfo pageInfo = new PageInfo( list );
		return ResultGenerator.genSuccessResult( pageInfo );
	}

	@ApiOperation( value = "查询待办未读消息数量", notes = "查询待办未读消息数量" )
	@ApiImplicitParams( { @ApiImplicitParam( name = "access-token", value = "token", paramType = "header", dataType = "String", required = true ),
			@ApiImplicitParam( name = "businessType", value = "业务类型 order / warning", paramType = "path", dataType = "String" )} )
	@GetMapping( "/messageCount/{businessType}" )
	public Result messageCount(@PathVariable String businessType, @ApiIgnore @User CurrentUser currentUser)
	{
		BackMessage backMessage = new BackMessage();
		backMessage.setBackState("unread");
		backMessage.setFromUserId(currentUser.getUserId());
		backMessage.setBusinessType(businessType);
		List<BackMessageDto> list = backMessageService.selectBackList( backMessage );
		return ResultGenerator.genSuccessResult( list.size() );
	}
	
	/** 查询订单信息详情，续租订单详情，转租订单详情 */
	@ApiOperation( value = "查询消息信息详情", notes = "查询消息信息详情" )
	@ApiImplicitParams( { @ApiImplicitParam( name = "access-token", value = "token", paramType = "header", dataType = "String", required = true ) ,
			@ApiImplicitParam( name = "businessNo", value = "业务单号", paramType = "path", dataType = "String", required = true ) } )
	@GetMapping( "/info/{businessNo}" )
	public Result infoDetail( @PathVariable String businessNo )
	{
		BackMessageDto backMessageDto;
		// 查询消息详情信息
		List<BackMessageDto> backMessageDtoList = backMessageService.selectBackByBusinessNo( businessNo );
		if (backMessageDtoList!=null && !backMessageDtoList.isEmpty())
		{
			backMessageDto = backMessageDtoList.get(0);
		}
		else
		{
			return ResultGenerator.genSuccessResult(); 
		}
		
		// 设置转译字段
		backMessageDto.setNoticeTypeValue( "托盘承租" );
		backMessageDto.setBusinessTypeValue( GetZnConstantUtil.getBusinessType( backMessageDto.getBusinessType() ) );
		backMessageDto.setBackState(  GetZnConstantUtil.getBackState( backMessageDto.getBackState() )  );
		// 判断是否是消息告警
		if ("order".equals(backMessageDto.getBusinessType()))
		{
			backMessageDto.setNoticeRuleValue( "到货确认" );
		}
		else
		{
			List<NoticeDto> noticeDtoList = noticeService.findByBusinessNo( businessNo );
			if (noticeDtoList != null&&!noticeDtoList.isEmpty())
			{
				backMessageDto.setNoticeRuleValue(noticeDtoList.get(0).getNoticeRuleValue());
				backMessageDto.setTerminalPosition( noticeDtoList.get(0).getTerminalPosition() );
			}
		}
		
		return ResultGenerator.genSuccessResult( backMessageDto );
	}
	
}
