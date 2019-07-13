package com.deer.wms.operation.web;
import com.deer.wms.intercept.annotation.User;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.operation.model.*;
import com.deer.wms.operation.service.OrderDetailService;
import com.deer.wms.project.seed.core.result.CommonCode;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.operation.service.OrderMasterService;
import com.deer.wms.project.seed.util.DateUtils;
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
* Created by  on 2018/08/02.
*/
@RestController
@Api(description = "orderMaster采购管理接口")
@RequestMapping("/order/masters")
public class OrderMasterController {

    @Autowired
    private OrderMasterService orderMasterService;
    @Autowired
    private OrderDetailService billDetailService;

    @ApiOperation(value = "新增orderMaster以及orderDetail列表", notes = "新增orderMaster以及orderDetail列表")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @PostMapping("/insert")
    public Result add(@RequestBody InsertData insertData,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null ){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        OrderMaster orderMaster = insertData.getOrderMaster();
        Integer companyId = currentUser.getCompanyId();
        orderMaster.setCompanyId(companyId);

        String  nowDate = DateUtils.getNowDateTimeString();
        orderMaster.setAddTime(nowDate);
        orderMaster.setAdder(currentUser.getUserName());
        orderMaster.setState(1);
//        Integer price = null;
//        Integer quantity=null;
//        Integer orderTotal=price*quantity;
//        orderMaster.setOrderTotal(orderTotal);
        orderMasterService.save(orderMaster);


    /**
     * 新增OrderDetail列表  12!@qwQW
     * */
    List<OrderDetail> orderDetails = insertData.getOrderDetails();
        for(OrderDetail orderDetail : orderDetails){
            orderDetail.setAddTime(nowDate);
            orderDetail.setOrderNo(orderMaster.getOrderNo());
            orderDetail.setCompanyId(orderMaster.getCompanyId());
        billDetailService.save(orderDetail);
    }
        return ResultGenerator.genSuccessResult();

}





    @ApiOperation(value = "根据id删除", notes = "根据id删除")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/delete")
    public Result delete( Integer id, @ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null ){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        Integer companyId =null;
        if(currentUser.getCompanyType()!=-1){
            companyId = currentUser.getCompanyId();
            OrderMaster orderMaster = orderMasterService.findById(id.toString());
            if(orderMaster.getCompanyId() == companyId){
                orderMasterService.deleteById(id.toString());
            }else {
                return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"非本公司单据！",null);
            }
        }
        orderMasterService.deleteById(id.toString());
        return ResultGenerator.genSuccessResult();
    }

    @ApiOperation(value = "更新", notes = "更新")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @PostMapping("/update")
    public Result update(@RequestBody OrderMaster orderMaster) {
        orderMasterService.update(orderMaster);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/{id}")
    public Result detail(@PathVariable String id) {
        OrderMaster orderMaster = orderMasterService.findById(id);
        return ResultGenerator.genSuccessResult(orderMaster);
    }

    @ApiOperation(value = "页面List", notes = "页面List")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/list")
    public Result list(OrderMasterCriteria criteria,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType() != -1){
            criteria.setCompanyId(currentUser.getCompanyId());
        }
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<OrderMasterDto> list = orderMasterService.findList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

}
