package com.deer.wms.operation.web;
import com.deer.wms.intercept.annotation.User;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.operation.model.OrderManageDto;
import com.deer.wms.project.seed.core.result.CommonCode;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.operation.model.OrderManage;
import com.deer.wms.operation.model.OrderManageCriteria;
import com.deer.wms.operation.service.OrderManageService;
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
@RequestMapping("/order/manages")
@Api(description = "采购管理接口")
public class OrderManageController {

    @Autowired
    private OrderManageService orderManageService;

    @PostMapping("/insert")
    @ApiOperation(value="添加采购信息",notes="添加采购信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    public Result add(@RequestBody OrderManage orderManage,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType() != -1){
            Integer companyId    = currentUser.getCompanyId();
            orderManage.setCompanyId(companyId);
        }
        String orderCode= "00"+orderManage.getCompanyId()+orderManage.getId();
        orderManage.setOrderCode(orderCode);
        String nowDate = DateUtils.getNowDateTimeString();
        orderManage.setAddTime(nowDate);
        Integer companyId = currentUser.getCompanyId();
        orderManage.setCompanyId(companyId);
        orderManageService.save(orderManage);
        return ResultGenerator.genSuccessResult();
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/delete")
    @ApiOperation(value="删除采购信息",notes="删除采购信息")
    public Result delete( String orderCode,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        Integer companyId ;
        OrderManageCriteria criteria = new OrderManageCriteria();
        criteria.setOrderCode(orderCode);
        if(currentUser.getCompanyType() != -1){
            companyId    = currentUser.getCompanyId();
            criteria.setCompanyId(companyId);
        }
        orderManageService.deleteByCodeAndCom(criteria);
        return ResultGenerator.genSuccessResult();
    }
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @PostMapping("/update")
    @ApiOperation(value="更新采购信息",notes="更新采购信息")
    public Result update(@RequestBody OrderManage orderManage,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType() != -1){
            Integer companyId    = currentUser.getCompanyId();
            orderManage.setCompanyId(companyId);
        }

        orderManageService.update(orderManage);
        return ResultGenerator.genSuccessResult();
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/detail")
    @ApiOperation(value="单个采购信息查询",notes="单个采购信息查询")
    public Result detail( Integer id,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }

        OrderManage orderManage = orderManageService.findById(id);
        return ResultGenerator.genSuccessResult(orderManage);
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/list")
    @ApiOperation(value="采购信息查询列表",notes="采购信息查询列表")
    public Result list(OrderManageCriteria criteria, @ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType() != -1){
            Integer companyId    = currentUser.getCompanyId();
            criteria.setCompanyId(companyId);
        }

        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<OrderManageDto> list = orderManageService.findList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

}
