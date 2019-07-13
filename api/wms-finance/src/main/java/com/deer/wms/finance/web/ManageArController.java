package com.deer.wms.finance.web;
import com.deer.wms.finance.model.FinanceTypeCriteria;
import com.deer.wms.finance.model.ManageArDto;
import com.deer.wms.intercept.annotation.User;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.project.seed.core.result.CommonCode;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.finance.model.ManageAr;
import com.deer.wms.finance.model.ManageArCriteria;
import com.deer.wms.finance.service.ManageArService;
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
@Api(description = "应收管理接口")
@RequestMapping("/manage/ars")
public class ManageArController {

    @Autowired
    private ManageArService manageArService;

    @PostMapping("/insert")
    @ApiOperation(value="新增应收信息",notes="新增应收信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    public Result add(@RequestBody ManageAr manageAr,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType() != -1){
            Integer companyId    = currentUser.getCompanyId();
            manageAr.setCompanyId(companyId);
        }
        String  flowCode= "AR"+currentUser.getCompanyId()+RandomNo.createTimeString().substring(2,14);
        manageAr.setFlowCode(flowCode);
        Integer companyId = currentUser.getCompanyId();
        manageAr.setCompanyId(companyId);
        String nowDate = DateUtils.getNowDateTimeString();
        manageAr.setAddDatetime(nowDate);
        manageArService.save(manageAr);
        return ResultGenerator.genSuccessResult();
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/delete")
    @ApiOperation(value="删除应收信息",notes="删除应收信息")
    public Result delete(String flowCode,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        Integer companyId ;
        ManageArCriteria criteria = new ManageArCriteria();
        criteria.setFlowCode(flowCode);
        if(currentUser.getCompanyType() != -1){
            companyId    = currentUser.getCompanyId();
            criteria.setCompanyId(companyId);
        }
        manageArService.deleteByCodeAndCom(criteria);
        return ResultGenerator.genSuccessResult();
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @PostMapping("/update")
    @ApiOperation(value="更新应收信息",notes="更新应收信息")
    public Result update(@RequestBody ManageAr manageAr,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType() != -1){
            Integer companyId    = currentUser.getCompanyId();
            manageAr.setCompanyId(companyId);
        }
        manageArService.update(manageAr);
        return ResultGenerator.genSuccessResult();
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/detail")
    @ApiOperation(value="单个应收信息查询",notes="单个应收信息查询")
    public Result detail( Integer id,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }

        ManageAr manageAr = manageArService.findById(id);
        return ResultGenerator.genSuccessResult(manageAr);
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/list")
    @ApiOperation(value="应收信息查询列表",notes="应收信息查询列表")
    public Result list(ManageArCriteria criteria,@ApiIgnore @User CurrentUser currentUser) {

        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType() != -1){
            Integer companyId    = currentUser.getCompanyId();
            criteria.setCompanyId(companyId);
        }


        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<ManageArDto> list = manageArService.findList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

}
