package com.deer.wms.base.system.web;

import com.deer.wms.intercept.annotation.User;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.project.seed.core.result.CommonCode;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.base.system.model.SupplierManage;
import com.deer.wms.base.system.model.SupplierManageCriteria;
import com.deer.wms.base.system.service.SupplierManageService;
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
* Created by  on 2018/07/04.
*/
@RestController
@Api(description = "供应商管理接口")
@RequestMapping("/supplier/manages")
public class SupplierManageController {

    @Autowired
    private SupplierManageService supplierManageService;

    @PostMapping("/insert")
    @ApiOperation(value="添加供应商信息",notes="添加供应商信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    public Result add(@RequestBody SupplierManage supplierManage,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType() != -1){
            Integer companyId    = currentUser.getCompanyId();
            supplierManage.setCompanyId(companyId);
        }
        String  supplierCode="GYS"+currentUser.getCompanyId()+RandomNo.createTimeString().substring(2,14);
        supplierManage.setSupplierCode(supplierCode);
        String nowDate = DateUtils.getNowDateTimeString();
        supplierManage.setCreateTime(nowDate);
        supplierManageService.save(supplierManage);
        return ResultGenerator.genSuccessResult();
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/delete")
    @ApiOperation(value="删除供应商信息",notes="删除供应商信息")
    public Result delete( String supplierCode,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        Integer companyId ;
        SupplierManageCriteria criteria = new SupplierManageCriteria();
        criteria.setSupplierCode(supplierCode);
        if(currentUser.getCompanyType() != -1){
            companyId    = currentUser.getCompanyId();
            criteria.setCompanyId(companyId);
        }
        supplierManageService.deleteByCodeAndCom(criteria);
        return ResultGenerator.genSuccessResult();
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @PostMapping("/update")
    @ApiOperation(value="更新供应商信息",notes="更新供应商信息")
    public Result update(@RequestBody SupplierManage supplierManage, @ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType() != -1){
            Integer companyId    = currentUser.getCompanyId();
            supplierManage.setCompanyId(companyId);
        }
        supplierManageService.update(supplierManage);
        return ResultGenerator.genSuccessResult();
    }
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/detail")
    @ApiOperation(value="单供应商信息查询",notes="单供应商信息查询")
    public Result detail( Integer id, @ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }

        SupplierManage supplierManage = supplierManageService.findById(id);
        return ResultGenerator.genSuccessResult(supplierManage);
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/list")
    @ApiOperation(value="供应商信息查询列表",notes="供应商信息查询列表")
    public Result list(SupplierManageCriteria criteria, @ApiIgnore @User CurrentUser currentUser) {

        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType() != -1){
            Integer companyId    = currentUser.getCompanyId();
            criteria.setCompanyId(companyId);
        }

        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<SupplierManage> list = supplierManageService.findList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

}
