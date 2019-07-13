package com.deer.wms.message.web;

import com.deer.wms.project.seed.core.result.CommonCode;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.project.seed.util.StringUtil;
import com.deer.wms.intercept.annotation.User;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.message.model.HelpCategory;
import com.deer.wms.message.model.HelpCategoryCriteria;
import com.deer.wms.message.model.HelpContent;
import com.deer.wms.message.model.HelpContentCriteria;
import com.deer.wms.message.model.HelpContentDto;
import com.deer.wms.message.service.HelpCategoryService;
import com.deer.wms.message.service.HelpContentService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import springfox.documentation.annotations.ApiIgnore;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
* Created by WUXB on 2017/10/09.
*/
@RestController
@RequestMapping("/help/contents")
public class HelpContentController {

    @Autowired
    private HelpContentService helpContentService;
    
    @Autowired
    private HelpCategoryService helpCategoryService;

    @ApiOperation( value = "新增帮助文档", notes = "新增帮助文档" )
    @ApiImplicitParams( { @ApiImplicitParam( name = "access-token", value = "token", paramType = "header", dataType = "String", required = true ),
            @ApiImplicitParam( name = "parentId", value = "所属1级目录id(手动输入时为null)", paramType = "query", dataType = "Integer" ),
            @ApiImplicitParam( name = "parentName", value = "所属1级目录name", paramType = "query", dataType = "String", required = true ),
            @ApiImplicitParam( name = "categoryId", value = "所属2级目录id(手动输入时为null)", paramType = "query", dataType = "Integer" ),
            @ApiImplicitParam( name = "categoryName", value = "所属2级目录name", paramType = "query", dataType = "String", required = true ),
            @ApiImplicitParam( name = "content", value = "内容", paramType = "query", dataType = "String" ),
            @ApiImplicitParam( name = "title", value = "标题", paramType = "query", dataType = "String", required = true ),
            @ApiImplicitParam( name = "state", value = "状态：enable=启用；disable=停用", paramType = "query", dataType = "String", required = true )} )
    @PostMapping("/addHelpContent")
    public Result add(@RequestBody HelpContentCriteria criteria, @ApiIgnore @User CurrentUser currentUser) {
    	try {
    		if (currentUser == null) {
                return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR, "未登录错误", null);
            }
        	//如果传入父级id为空，以传入的参数新增一级、二级目录
        	HelpContent helpContent = new HelpContent();
        	helpContent.setContent(criteria.getContent().replaceAll("&lt;", "<"));
        	helpContent.setTitle(criteria.getTitle());
        	helpContent.setState(criteria.getState());
        	if (criteria.getParentId() == null || criteria.getParentId() == ""){
        		//判断该一级目录是否已经存在
        		HelpCategoryCriteria cri = new HelpCategoryCriteria();
        		cri.setLevel(1);
        		cri.setCategoryName(criteria.getParentName());
        		List<HelpCategory> list = helpCategoryService.selectByName(cri);
        		if (list != null && list.size() > 0){
        			return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"该一级分类已经存在，请重新创建",null);
        		}
        		//新增一级目录
        		HelpCategory helpCategory = new HelpCategory();
        		helpCategory.setCategoryName(criteria.getParentName());
        		helpCategory.setLevel(1);
        		helpCategory.setCreateUserId(currentUser.getUserId());
        		helpCategoryService.add(helpCategory);
        		//新增二级目录
        		HelpCategory helpCategory2 = new HelpCategory();
        		helpCategory2.setCategoryName(criteria.getCategoryName());
        		helpCategory2.setLevel(2);
        		helpCategory2.setParentId(helpCategory.getCategoryId());
        		helpCategory2.setCreateUserId(currentUser.getUserId());
        		helpCategoryService.add(helpCategory2);
        		//将新增二级导航id填入 新增文档内容中
        		helpContent.setCategoryId(helpCategory2.getCategoryId());
        	} else if (criteria.getCategoryId() == null || criteria.getCategoryId() == 0) {
        		//判断新增的二级分类是否已经存在
        		HelpCategoryCriteria cri = new HelpCategoryCriteria();
        		cri.setLevel(2);
        		cri.setCategoryName(criteria.getCategoryName());
        		cri.setParentId(criteria.getParentId());
        		List<HelpCategory> list = helpCategoryService.selectByName(cri);
        		if (list != null && list.size() > 0){
        			return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"该二级分类已经存在，请重新创建",null);
        		}
        		//如果一级导航id存在但二级导航id不存在，新增二级导航
        		HelpCategory helpCategory = new HelpCategory();
        		helpCategory.setCategoryName(criteria.getCategoryName());
        		helpCategory.setLevel(2);
        		helpCategory.setParentId(Integer.parseInt(criteria.getParentId()));
        		helpCategory.setCreateUserId(currentUser.getUserId());
        		helpCategoryService.add(helpCategory);
        		//将新增二级导航id填入 新增文档内容中
        		helpContent.setCategoryId(helpCategory.getCategoryId());
        	} else {
        		HelpContentCriteria cri = new HelpContentCriteria();
        		cri.setTitle(criteria.getTitle());
        		cri.setCategoryId(criteria.getCategoryId());
        		List<HelpContent> list = helpContentService.selectByTitle(cri);
        		if (list != null && list.size() > 0){
        			return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"该标题已经存在，请重新创建",null);
        		}
        		//如果一级、二级导航id都存在，直接填入，无需新增导航
        		helpContent.setCategoryId(criteria.getCategoryId());
        	}
            helpContentService.insert(helpContent);
            return ResultGenerator.genSuccessResult();
		} catch (Exception e) {
			return ResultGenerator.genFailResult( CommonCode.SERVICE_ERROR );
		}
    	
    }

    @ApiOperation( value = "删除帮助文档", notes = "删除帮助文档" )
    @ApiImplicitParams( { @ApiImplicitParam( name = "access-token", value = "token", paramType = "header", dataType = "String", required = true ),
            @ApiImplicitParam( name = "contentId", value = "帮助文档id", paramType = "path", dataType = "Integer", required = true )} )
    @DeleteMapping("/deleteHelpContentById/{contentId}")
    public Result delete(@PathVariable Integer contentId,@ApiIgnore @User CurrentUser currentUser) {
    	try {
    		if (currentUser == null) {
                return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR, "未登录错误", null);
            }
            helpContentService.deleteById(contentId);
            return ResultGenerator.genSuccessResult();
		} catch (Exception e) {
			return ResultGenerator.genFailResult( CommonCode.SERVICE_ERROR );
		}    	
    }

    @ApiOperation( value = "更新帮助文档", notes = "更新帮助文档" )
    @ApiImplicitParams( { @ApiImplicitParam( name = "access-token", value = "token", paramType = "header", dataType = "String", required = true ),
    		@ApiImplicitParam( name = "contentId", value = "帮助文档id", paramType = "query", dataType = "Integer", required = true ),
            @ApiImplicitParam( name = "categoryId", value = "所属2级目录id", paramType = "query", dataType = "Integer" ,required = true),
            @ApiImplicitParam( name = "content", value = "内容", paramType = "query", dataType = "String" ),
            @ApiImplicitParam( name = "title", value = "标题", paramType = "query", dataType = "String", required = true ),
            @ApiImplicitParam( name = "state", value = "状态：enable=启用；disable=停用", paramType = "query", dataType = "String", required = true )} )
    @PutMapping("/updateHelpContent")
    public Result update(@RequestBody HelpContentDto helpContentDto, @ApiIgnore @User CurrentUser currentUser) {
    	try {
    		if (currentUser == null) {
                return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR, "未登录错误", null);
            }
        	HelpContent helpContent = new HelpContent();
        	helpContent.setContentId(helpContentDto.getContentId());
        	helpContent.setContent(helpContentDto.getContent().replaceAll("&lt;", "<"));
        	helpContent.setTitle(helpContentDto.getTitle());
        	helpContent.setState(helpContentDto.getState());
        	helpContent.setCategoryId(helpContentDto.getCategoryId());
            helpContentService.update2(helpContent);
            return ResultGenerator.genSuccessResult();
		} catch (Exception e) {
			return ResultGenerator.genFailResult( CommonCode.SERVICE_ERROR );
		}
    	
    }

    @ApiOperation( value = "根据id获取帮助文档详情", notes = "根据id获取帮助文档详情" )
    @ApiImplicitParams( { @ApiImplicitParam( name = "access-token", value = "token", paramType = "header", dataType = "String", required = true ),
            @ApiImplicitParam( name = "contentId", value = "帮助文档id", paramType = "path", dataType = "Integer", required = true )} )
    @GetMapping("/getHelpContentById/{contentId}")
    public Result detail(@PathVariable Integer contentId) {
    	try {
    		HelpContentDto helpContentDto = helpContentService.selectById(contentId);
            if ( helpContentDto.getParentId() == null ){
            	helpContentDto.setParentId(helpContentDto.getCategoryId());
            	helpContentDto.setParentName(helpContentDto.getCategoryName());
            	helpContentDto.setCategoryId(null);
            	helpContentDto.setCategoryName(null);
            }
            return ResultGenerator.genSuccessResult(helpContentDto);
		} catch (Exception e) {
			return ResultGenerator.genFailResult( CommonCode.SERVICE_ERROR );
		}
        
    }

    @ApiOperation( value = "根据条件获取帮助文档列表", notes = "根据条件获取帮助文档列表" )
    @ApiImplicitParams( { @ApiImplicitParam( name = "access-token", value = "token", paramType = "header", dataType = "String", required = true ),
    		@ApiImplicitParam( name = "parentId", value = "1级目录id", paramType = "query", dataType = "Integer" ),
            @ApiImplicitParam( name = "categoryId", value = "2级目录id", paramType = "query", dataType = "Integer" ),
            @ApiImplicitParam( name = "keywords", value = "关键字", paramType = "query", dataType = "String" )} )
    @GetMapping
    public Result list(HelpContentCriteria criteria) {
    	try {
    		StringUtil.trimObjectStringProperties(criteria);
            PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
            List<HelpContentDto> list = helpContentService.selectContentAll(criteria);
            PageInfo pageInfo = new PageInfo(list);
            return ResultGenerator.genSuccessResult(pageInfo);
		} catch (Exception e) {
			return ResultGenerator.genFailResult( CommonCode.SERVICE_ERROR );
		}
    	
    }

}
