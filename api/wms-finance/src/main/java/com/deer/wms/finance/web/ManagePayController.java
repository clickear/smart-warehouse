package com.deer.wms.finance.web;
import com.deer.wms.finance.model.ManagePayDto;
import com.deer.wms.intercept.annotation.User;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.project.seed.core.result.CommonCode;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.finance.model.ManagePay;
import com.deer.wms.finance.model.ManagePayCriteria;
import com.deer.wms.finance.service.ManagePayService;
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
@Api(description = "应付管理接口")
@RequestMapping("/manage/pays")
public class ManagePayController {

    @Autowired
    private ManagePayService managePayService;

    @PostMapping("/insert")
    @ApiOperation(value="添加应付信息",notes="添加应付信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    public Result add(@RequestBody ManagePay managePay, @ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType() != -1){
            Integer companyId    = currentUser.getCompanyId();
            managePay.setCompanyId(companyId);
        }
        String  payFlowCode= "PAY"+currentUser.getCompanyId()+RandomNo.createTimeString().substring(2,14);
        managePay.setPayFlowCode(payFlowCode);
        String nowDate = DateUtils.getNowDateTimeString();
        managePay.setAddDatetime(nowDate);
        managePayService.save(managePay);
        return ResultGenerator.genSuccessResult();
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/delete")
    @ApiOperation(value="删除应付信息",notes="删除应付信息")
    public Result delete( String payFlowCode,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        Integer companyId ;
        ManagePayCriteria criteria = new ManagePayCriteria();
        criteria.setPayFlowCode(payFlowCode);
        if(currentUser.getCompanyType() != -1){
            companyId    = currentUser.getCompanyId();
            criteria.setCompanyId(companyId);
        }
        managePayService.deleteByCodeAndCom(criteria);
        return ResultGenerator.genSuccessResult();
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @PostMapping("/update")
    @ApiOperation(value="更新应付信息",notes="更新应付信息")
    public Result update(@RequestBody ManagePay managePay,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType() != -1){
            Integer companyId    = currentUser.getCompanyId();
            managePay.setCompanyId(companyId);
        }


        managePayService.update(managePay);
        return ResultGenerator.genSuccessResult();
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/detail")
    @ApiOperation(value="单个应付信息查询",notes="单个应付信息查询")
    public Result detail(Integer id,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);

        }

        ManagePay managePay = managePayService.findById(id);
        return ResultGenerator.genSuccessResult(managePay);
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/list")
    @ApiOperation(value="应付信息查询列表",notes="应付信息查询列表")
    public Result list(ManagePayCriteria criteria,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType() != -1){
            Integer companyId    = currentUser.getCompanyId();
            criteria.setCompanyId(companyId);
        }

        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<ManagePayDto> list = managePayService.findList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

}
