package com.deer.wms.bill.manage.web;

import com.deer.wms.bill.manage.model.BillDetailDto;
import com.deer.wms.bill.manage.model.BillMaster;
import com.deer.wms.bill.manage.service.BillMasterService;
import com.deer.wms.intercept.annotation.User;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.project.seed.core.result.CommonCode;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.bill.manage.model.BillDetail;
import com.deer.wms.bill.manage.model.BillDetailCriteria;
import com.deer.wms.bill.manage.service.BillDetailService;
import com.deer.wms.project.seed.util.DateUtils;
import com.deer.wms.project.seed.util.RandomNo;
import com.deer.wms.report.model.AreaItem;
import com.deer.wms.report.service.AreaItemService;
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
* Created by guo on 2018/07/05.
*/
@RestController
@Api(description = "Detail管理接口")
@RequestMapping("/bill/details")
public class BillDetailController {


    @Autowired
    private BillDetailService billDetailService;
    @Autowired
    private AreaItemService areaItemService;
    @Autowired
    private BillMasterService billMasterService;

    @ApiOperation(value = "新增billDetail以及billMaster列表", notes = "新增billDetail以及billMaster列表")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @PostMapping("insert")
    public Result add(@RequestBody BillDetail billDetail, @ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType() != -1){
            Integer companyId    = currentUser.getCompanyId();
            billDetail.setCompanyId(companyId);
        }
        Integer companyId = currentUser.getCompanyId();
        billDetail.setCompanyId(companyId);
        String  nowDate = DateUtils.getNowDateTimeString();
        billDetail.setAddTime(nowDate);
        billDetail.setState(1);
        billDetailService.save(billDetail);
        return ResultGenerator.genSuccessResult();
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/delete")
    @ApiOperation(value="根据id删除billDetail列表",notes="根据id删除billDetail列表")
    public Result delete( Integer id,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        Integer companyId ;
        BillDetailCriteria criteria = new BillDetailCriteria();
        criteria.setId(id);
        if(currentUser.getCompanyType() != -1){
            companyId    = currentUser.getCompanyId();
            criteria.setCompanyId(companyId);
        }
        billDetailService.deleteByC(criteria);
        return ResultGenerator.genSuccessResult();
    }
    @ApiOperation(value = "更新", notes = "更新")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @PostMapping("/update")
    public Result update(@RequestBody BillDetail billDetail,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }

        billDetailService.update(billDetail);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/{id}")
    public Result detail(@PathVariable String id) {
        BillDetail billDetail = billDetailService.findById(id);
        return ResultGenerator.genSuccessResult(billDetail);
    }

    @ApiOperation(value = "页面List", notes = "页面List")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("list")
    public Result list(BillDetailCriteria criteria,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType() != -1){
            criteria.setCompanyId(currentUser.getCompanyId());
        }

        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<BillDetailDto> list = billDetailService.findList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }



}
