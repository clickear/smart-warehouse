package com.deer.wms.system.manage.web;

import java.util.List;

import com.deer.wms.system.manage.service.HelpInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.deer.wms.project.seed.core.result.CommonCode;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.system.manage.model.help.HelpInfo;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

/**
 * Created by xuyingyang on 2017/10/14.
 */
@RestController
@RequestMapping( "/help/infos" )
public class HelpInfoController
{

	@Autowired
	private HelpInfoService helpInfoService;

	@ApiOperation( value = "修改帮助文档", notes = "修改帮助文档" )
	@ApiImplicitParams( { @ApiImplicitParam( name = "access-token", value = "token", paramType = "header", dataType = "String", required = false ),
	        @ApiImplicitParam( name = "title", value = "标题", paramType = "form", dataType = "String", required = true ),
	        @ApiImplicitParam( name = "content", value = "标题", paramType = "form", dataType = "String", required = true ),
	        @ApiImplicitParam( name = "id", value = "标识，没有则为空", paramType = "form", dataType = "String", required = false ) } )
	@PutMapping
	public Result update( HelpInfo helpInfo )
	{
		if (helpInfo != null && helpInfo.getId() != null)
		{
			HelpInfo help = helpInfoService.findById( helpInfo.getId() );
			if (help == null)
			{
				return ResultGenerator.genFailResult( CommonCode.SERVICE_ERROR, "该帮忙文档不存在" );
			}
			helpInfoService.update( helpInfo );
		}
		else
		{ /* 不存在则添加 */
			helpInfoService.save( helpInfo );
		}

		return ResultGenerator.genSuccessResult();
	}

	@ApiOperation( value = "查询帮助文档详情", notes = "查询帮助文档详情" )
	@ApiImplicitParams( { @ApiImplicitParam( name = "access-token", value = "token", paramType = "header", dataType = "String", required = false ) } )
	@GetMapping
	public Result detail()
	{
		List<HelpInfo> list = helpInfoService.findAll();
		if (list != null && list.size() > 0)
		{
			return ResultGenerator.genSuccessResult( list.get( 0 ) );
		}
		return ResultGenerator.genSuccessResult();
	}
}
