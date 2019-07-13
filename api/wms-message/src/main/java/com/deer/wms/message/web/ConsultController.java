package com.deer.wms.message.web;

import com.deer.wms.intercept.annotation.User;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.message.model.Consult;
import com.deer.wms.message.model.ConsultCriteria;
import com.deer.wms.message.model.ConsultDto;
import com.deer.wms.message.service.ConsultService;
import com.deer.wms.project.seed.core.result.CommonCode;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.project.seed.util.StringUtil;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.Date;
import java.util.List;

/**
* Created by WUXB on 2017/10/09.
*/
@RestController
@RequestMapping("/consults")
public class ConsultController {
	
	private static Logger logger = LoggerFactory.getLogger( ConsultController.class );

	/**
	 * 咨询管理service
	 */
    @Autowired
    private ConsultService consultService;

    /**
     * 未登录时新增咨询消息
	 *
     * @param consult
     * @return
     */
	@ApiOperation( value = "未登录时新增咨询消息", notes = "未登录时新增咨询消息" )
	@PostMapping("/addConsultInfo")
    public Result add(@RequestBody Consult consult) {
		consult.setConsultTime(new Date());
		consult.setReply(false);
		consult.setCreateTime(new Date());
		consultService.save(consult);
		return ResultGenerator.genSuccessResult();
    }

	/**
	 * 咨询管理新增
	 * @param consultContent
	 * @return
	 */
	@ApiOperation( value = "新增咨询消息", notes = "新增咨询消息" )
	@ApiImplicitParams( { @ApiImplicitParam( name = "access-token", value = "token", paramType = "header", dataType = "String", required = true )})
			 
	@PostMapping()
	public Result create(@RequestBody Consult consult, @ApiIgnore @User CurrentUser currentUser) {
		try{
			System.out.println(consult.getConsultContent());
			//Consult consult = new Consult();
			consult.setConsultTime(new Date());
			consult.setConsultUserId(currentUser.getUserId());
			consult.setConsultUserMobile(currentUser.getMobile());
			consult.setConsultUserName(currentUser.getUserName());
			consult.setReply(false);
			consult.setCreateTime(new Date());
			consult.setConsultContent(consult.getConsultContent().replaceAll("&lt;", "<"));
			consultService.save(consult);
			return ResultGenerator.genSuccessResult();
		}catch(Exception e){
			logger.error("保存咨询信息失败!",e);
			return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR);
		}

	}

    /**
     * 根据id删除咨询信息
     * @param consultId
     * @return
     */
	@ApiOperation(value = "删除咨询信息", notes = "删除咨询信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
	@DeleteMapping("/delConsultById/{consultId}")
    public Result delete(@PathVariable Integer consultId) {
    	try{
    		consultService.deleteById(consultId);
            return ResultGenerator.genSuccessResult();	
    	}catch(Exception e){
    		logger.error("删除咨询信息失败!",e);
    		return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR);
    	}
        
    }

    /**
     * 咨询管理更新
     * @param ConsultCriteria
     * @return
     */
    @ApiOperation(value = "更新咨询信息", notes = "更新咨询信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
            , @ApiImplicitParam(name = "consultId", value = "咨询信息id", paramType="path", dataType="String", required = true)
            , @ApiImplicitParam(name = "replyUserId", value = "回复人信息id", paramType="path", dataType="Integer", required = true)
            , @ApiImplicitParam(name = "replyContent", value = "回复内容", paramType="path", dataType="String" )
          
    })
	@PutMapping("/updateConsult")
    public Result update(@RequestBody ConsultCriteria consultCriteria , @ApiIgnore @User CurrentUser currentUser) {
    	try{
    		consultCriteria.setReplyUserId(currentUser.getUserId());
    		Consult consult = new Consult();
    		consult.setConsultId(consultCriteria.getConsultId());
    		consult.setModifyTime(new Date());
    		consult.setReplyTime(new Date());
    		consult.setReplyUserId(currentUser.getUserId());
    		consult.setReplyContent(consultCriteria.getReplyContent());
    		consult.setReply(true);
    		consultService.update(consult);
//    		consultService.update(consultCriteria);
    	    return ResultGenerator.genSuccessResult();
    	}catch(Exception e){
    		logger.error("更新咨询信息失败!",e);
    		return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR);
    	}
    }

    /**
     * 根据id 查询咨询管理的详细信息
     * @param id
     * @return
     */
    @ApiOperation(value = "获取咨询管理详细信息", notes = "获取咨询管理详细信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
          
    })
	@GetMapping("/getConsultInfoById/{consultId}")
    public Result detail(@PathVariable Integer consultId) {
    	try{
    		ConsultDto consultDto = consultService.findById2(consultId);
    	    return ResultGenerator.genSuccessResult(consultDto);
    	}catch(Exception e){
    		logger.error("查询咨询信息失败!",e);
    		return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR);
    	}
       
    }

    /**
	 * 根据条件获取咨询管理列表
	 * @param criteria
	 * @return
	 * @author gmd
	 */
	@ApiOperation(value = "分页查询咨询管理列表列表", notes = "分页查询咨询管理列表列表")
	@ApiImplicitParams({
			@ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
         /*   , @ApiImplicitParam(name = "pageNum", value = "页码", paramType="query", dataType="integer", required = true, defaultValue = "1")
            , @ApiImplicitParam(name = "pageSize", value = "每页显示的条数", paramType="query", dataType="integer", required = true, defaultValue = "20")*/
			, @ApiImplicitParam(name = "reply", value = "是否回复", paramType="query", dataType="integer")
			, @ApiImplicitParam(name = "keyword", value = "关键字", paramType="query", dataType="string")
			, @ApiImplicitParam(name = "consultTime", value = "咨询时间，格式：yyyy-mm-dd", paramType="query", dataType="string")
	})
	@PostMapping("/getConsultList")
	public Result list(@RequestBody ConsultCriteria criteria) {
		StringUtil.trimObjectStringProperties(criteria);
		try{
			PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
			if ( !StringUtils.isEmpty(criteria.getKeywords()) ) {
				criteria.setKeywords(criteria.getKeywords().replaceAll("&lt;", "<"));
			}
			List<ConsultDto> list = consultService.selectConsultList(criteria);
			PageInfo pageInfo = new PageInfo(list);
			return ResultGenerator.genSuccessResult(pageInfo);
		}catch(Exception e){
			logger.error("查询咨询信息列表失败!",e);
			return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR);
		}

	}

	/**
	 * 根据条件获取咨询管理列表
	 * @param criteria
	 * @return
	 * @author gmd
	 */
	@ApiOperation(value = "分页查询咨询管理列表列表", notes = "分页查询咨询管理列表列表")
	@ApiImplicitParams({
			@ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
         /*   , @ApiImplicitParam(name = "pageNum", value = "页码", paramType="query", dataType="integer", required = true, defaultValue = "1")
            , @ApiImplicitParam(name = "pageSize", value = "每页显示的条数", paramType="query", dataType="integer", required = true, defaultValue = "20")*/
			, @ApiImplicitParam(name = "reply", value = "是否回复", paramType="query", dataType="integer")
			, @ApiImplicitParam(name = "keyword", value = "关键字", paramType="query", dataType="string")
			, @ApiImplicitParam(name = "consultTime", value = "咨询时间，格式：yyyy-mm-dd", paramType="query", dataType="string")
	})
	@GetMapping("/getConsultListAll")
	public Result listAll(ConsultCriteria criteria,@ApiIgnore @User CurrentUser currentUser) {
		StringUtil.trimObjectStringProperties(criteria);
		try{
			if(currentUser==null){
	            return ResultGenerator.genFailResult( CommonCode.SERVICE_ERROR,"未登录错误",null );
	        }
			criteria.setConsultUserId(currentUser.getUserId());
		//	PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
			List<ConsultDto> list = consultService.selectConsultList(criteria);
		//	PageInfo pageInfo = new PageInfo(list);
			return ResultGenerator.genSuccessResult(list);
		}catch(Exception e){
			logger.error("查询咨询信息列表失败!",e);
			return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR);
		}

	}

}
