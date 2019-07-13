package com.deer.wms.message.web;

import java.util.ArrayList;
import java.util.List;

import com.deer.wms.message.model.HelpCategoryCriteria;
import com.deer.wms.message.model.HelpContent;
import com.deer.wms.message.model.HelpContentCriteria;
import com.deer.wms.message.model.HelpContentDto;
import com.deer.wms.message.service.HelpContentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.deer.wms.intercept.annotation.User;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.message.model.HelpCategory;
import com.deer.wms.message.service.HelpCategoryService;
import com.deer.wms.project.seed.core.result.CommonCode;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.project.seed.util.StringUtil;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import springfox.documentation.annotations.ApiIgnore;

/**
* Created by WUXB on 2017/10/09.
*/
@RestController
@RequestMapping("/help/categorys")
public class HelpCategoryController {
	
	private static Logger logger = LoggerFactory.getLogger( HelpCategoryController.class );

    @Autowired
    private HelpCategoryService helpCategoryService;
    
    @Autowired
    private HelpContentService helpContentService;

    @ApiOperation( value = "新增帮助文档目录", notes = "新增帮助文档目录" )
    @ApiImplicitParams( { @ApiImplicitParam( name = "access-token", value = "token", paramType = "header", dataType = "String", required = true ),
            @ApiImplicitParam( name = "categoryName", value = "目录名称", paramType = "query", dataType = "String", required = true ),
            @ApiImplicitParam( name = "parentId", value = "父级id(新增一级目录则为空)", paramType = "query", dataType = "Integer" )} )
    @PostMapping("/addHelpCategory")
    public Result add(@RequestBody HelpCategory helpCategory,@ApiIgnore @User CurrentUser currentUser) {
    	helpCategory.setCreateUserId(currentUser.getUserId());
        if(helpCategory.getParentId()!=null&&helpCategory.getParentId()!=-1){
        	helpCategory.setLevel(2);
        } else {
        	helpCategory.setLevel(1);
        }
        helpCategoryService.add(helpCategory);
        return ResultGenerator.genSuccessResult();
    }

    @ApiOperation( value = "根据id删除帮助文档目录", notes = "根据id删除帮助文档目录" )
    @ApiImplicitParams( { @ApiImplicitParam( name = "access-token", value = "token", paramType = "header", dataType = "String", required = true ),
            @ApiImplicitParam( name = "id", value = "目录id", paramType = "path", dataType = "Integer" , required=true )} )
    @DeleteMapping("/deleteHelpCategory/{id}")
    public Result delete(@PathVariable Integer id) {
    	HelpCategory category = helpCategoryService.findById(id);
    	//如果删除的是一级导航，删除时连同子导航一并删除
    	if (category.getLevel()==1){
    		HelpCategoryCriteria criteria = new HelpCategoryCriteria();
        	criteria.setParentId(id.toString());
        	List<HelpCategory> list = helpCategoryService.selectHelpCategoryByCriteria(criteria);
        	if (list != null && list.size()>0) {
        		for (HelpCategory item : list) {
            		//删除二级导航下的所有标题
            		HelpContentCriteria contentCriteria = new HelpContentCriteria();
            		//设置查询条件，二级目录级别
            		contentCriteria.setCategoryId(item.getCategoryId());
            		List<HelpContentDto> contentList = helpContentService.selectContentAll(contentCriteria);
            		if (contentList != null && contentList.size()>0) {
            			for (HelpContentDto dto : contentList) {
                			helpContentService.deleteById(dto.getContentId());
                		}
            		}
            		helpCategoryService.deleteById(item.getCategoryId());
            	}
        	}
    	} else {
    		//删除的是二级导航，删除二级导航下的所有标题
    		HelpContentCriteria contentCriteria = new HelpContentCriteria();
    		//设置查询条件，二级目录级别
    		contentCriteria.setCategoryId(id);
    		List<HelpContentDto> contentList = helpContentService.selectContentAll(contentCriteria);
    		if (contentList != null && contentList.size()>0) {
    			for (HelpContentDto dto : contentList) {
        			helpContentService.deleteById(dto.getContentId());
        		}
    		}
    	}
        helpCategoryService.deleteById(id);
        return ResultGenerator.genSuccessResult();
    }

    @PutMapping("/updateHelpCategory")
    public Result update(@RequestBody HelpCategory helpCategory) {
        helpCategoryService.update(helpCategory);
        return ResultGenerator.genSuccessResult();
    }

    /**
     * 根据id获取帮助中心的内容
     * @author gmd
     * @param id
     * @return
     */
    @ApiOperation( value = "根据id获取帮助中心的内容", notes = "根据id获取帮助中心的内容" )
    @ApiImplicitParams( { @ApiImplicitParam( name = "access-token", value = "token", paramType = "header", dataType = "String", required = true ),
            @ApiImplicitParam( name = "id", value = "目录id", paramType = "path", dataType = "Integer" , required=true )} )
    @GetMapping("/getHelpCategoryById/{id}")
    public Result detail(@PathVariable Integer id) {
    	try{
    		 HelpCategory helpCategory = helpCategoryService.findById(id);
    		 // 从内容表中获取当前标题对应的内容
    		 if(null != helpCategory){
    			 HelpContent content = this.helpContentService.selectContentByCategoryId(helpCategory.getCategoryId());
    			 if(null != content){
    				 helpCategory.setContent(content.getContent());
    			 }
    		 }
    	     return ResultGenerator.genSuccessResult(helpCategory);
    	}catch(Exception e){
    		logger.error("查询帮助中心菜单失败!",e);
    		return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR);
    	}
       
    }

    /**
     * 查询帮助中心
     * @author gmd
     * @param criteria
     * @return
     */
    @ApiOperation( value = "联级帮助文档目录列表", notes = "联级帮助文档目录列表" )
    @GetMapping
    public Result list(HelpCategoryCriteria criteria) {
    	try{
    		StringUtil.trimObjectStringProperties(criteria);
    		List<HelpCategory> parentlist = new ArrayList<HelpCategory>();
        	List<HelpCategory> leve1list = new ArrayList<HelpCategory>();
        	List<HelpCategory> leve2list = new ArrayList<HelpCategory>();
        	List<HelpContentDto> contentList = new ArrayList<HelpContentDto>();
        	// 根据条件parent为-1查询父级元素
        	//criteria.setParentId("-1");
        	if(criteria.getLevel() == null && criteria.getParentId() == null){
        		//1级菜单level为1
        		criteria.setLevel(1);
        	}
            parentlist = helpCategoryService.selectHelpCategoryByCriteria(criteria);
            // 根据父级菜单id查询二级菜单集合
            if(parentlist.size()>0){
            	for(HelpCategory helpP : parentlist){
            		criteria = new HelpCategoryCriteria();
            		criteria.setParentId(String.valueOf(helpP.getCategoryId()));
            		leve1list = helpCategoryService.selectHelpCategoryByCriteria(criteria);
            		if(leve1list.size()>0){
            			// 保存2级菜单集合
            			helpP.setHelpCategoryList(leve1list);
            			// 查询二级菜单下的帮助文档集合
                    	for(HelpCategory helpL : leve1list){
                    		HelpContentCriteria contentCriteria = new HelpContentCriteria();
                    		//设置查询条件，二级目录级别
                    		contentCriteria.setCategoryId(helpL.getCategoryId());
                    		contentCriteria.setState("enable");
                    		contentList = helpContentService.selectContentAll(contentCriteria);
                    		if(contentList.size()>0){
                    			//保存帮助文档列表
                    			helpL.setHelpContentList(contentList);
                    		}
                    	}
                    }
            	}
            }
            
         return ResultGenerator.genSuccessResult(parentlist);   
            
    	}catch(Exception e){
    		logger.error("查询帮助中心菜单失败!",e);
    		return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR);
    	}  
    }
    
    /**
     * 获取一级/二级 帮助目录 下拉框内容
     * @param criteria
     * @return
     */
    @ApiOperation( value = "获取帮助文档目录列表", notes = "获取帮助文档目录列表" )
    @ApiImplicitParams( { @ApiImplicitParam( name = "access-token", value = "token", paramType = "header", dataType = "String", required = true ),
            @ApiImplicitParam( name = "parentId", value = "父级id", paramType = "query", dataType = "Integer" ),
            @ApiImplicitParam( name = "level", value = "目录级别(1为一级目录，2为二级目录)", paramType = "query", dataType = "String", required = true )} )
    @GetMapping("/getHelpCategoryList")
    public Result qryDropdownBox(HelpCategoryCriteria criteria) {
    	try{
    		StringUtil.trimObjectStringProperties(criteria);
    		List<HelpCategory> list = new ArrayList<HelpCategory>();
    		list = helpCategoryService.selectHelpCategoryByCriteria(criteria);
    	    return ResultGenerator.genSuccessResult(list);
    	}catch(Exception e){
    		logger.error("查询帮助中心菜单失败!",e);
    		return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR);
    	}
       
    }

}
