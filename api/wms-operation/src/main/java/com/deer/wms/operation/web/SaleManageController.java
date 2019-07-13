package com.deer.wms.operation.web;
import com.deer.wms.intercept.annotation.User;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.operation.model.SaleManageDto;
import com.deer.wms.project.seed.core.result.CommonCode;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.operation.model.SaleManage;
import com.deer.wms.operation.model.SaleManageCriteria;
import com.deer.wms.operation.service.SaleManageService;
import com.deer.wms.project.seed.util.DateUtils;
import com.deer.wms.project.seed.util.RandomNo;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;


/**
* Created by  on 2018/07/11.
*/
@RestController
@Api(description = "销售管理接口")
@RequestMapping("/sale/manages")
public class SaleManageController {

    @Autowired
    private SaleManageService saleManageService;

    @PostMapping("/insert")
    @ApiOperation(value="添加销售管理信息",notes="添加销售管理信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    public Result add(@RequestBody SaleManage saleManage, @ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType() != -1){
            Integer companyId    = currentUser.getCompanyId();
            saleManage.setCompanyId(companyId);
        }

        Integer companyId = currentUser.getCompanyId();
        saleManage.setCompanyId(companyId);
        String saleCode= saleManage.getCompanyId()+RandomNo.createTimeString().substring(10,14);
        saleManage.setSaleCode(saleCode);
        String nowDate = DateUtils.getNowDateTimeString();
        saleManage.setAddTime(nowDate);
        saleManageService.save(saleManage);
        return ResultGenerator.genSuccessResult();
    }





    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/delete")
    @ApiOperation(value="删除销售管理信息",notes="删除销售管理信息")
    public Result delete( String saleCode,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
        return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
    }
    Integer companyId ;
    SaleManageCriteria criteria = new SaleManageCriteria();
        criteria.setSaleCode(saleCode);
        if(currentUser.getCompanyType() != -1){
        companyId    = currentUser.getCompanyId();
        criteria.setCompanyId(companyId);
    }
        saleManageService.deleteByCodeAndCom(criteria);
        return ResultGenerator.genSuccessResult();
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @PostMapping("/update")
    @ApiOperation(value="更新销售管理信息",notes="更新销售管理信息")
    public Result update(@RequestBody SaleManage saleManage,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType() != -1){
            Integer companyId    = currentUser.getCompanyId();
            saleManage.setCompanyId(companyId);
        }
        saleManageService.update(saleManage);
        return ResultGenerator.genSuccessResult();
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/detail")
    @ApiOperation(value="dan销售管理信息查询",notes="dan销售管理信息查询")
    public Result detail( Integer id,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        SaleManage saleManage = saleManageService.findById(id);
        return ResultGenerator.genSuccessResult(saleManage);
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/list")
    @ApiOperation(value="销售管理信息查询",notes="销售管理信息查询")
    public Result list(SaleManageCriteria criteria,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType() != -1){
            Integer companyId    = currentUser.getCompanyId();
            criteria.setCompanyId(companyId);
        }
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<SaleManageDto> list = saleManageService.findList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

}
