package com.deer.wms.operation.web;
import com.deer.wms.intercept.annotation.User;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.operation.model.OrderDetailDto;
import com.deer.wms.operation.model.OrderMaster;
import com.deer.wms.operation.service.OrderMasterService;
import com.deer.wms.project.seed.core.result.CommonCode;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.operation.model.OrderDetail;
import com.deer.wms.operation.model.OrderDetailCriteria;
import com.deer.wms.operation.service.OrderDetailService;
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
@Api(description = "orderDetail采购管理接口")
@RequestMapping("/order/details")
public class OrderDetailController {

    @Autowired
    private OrderDetailService orderDetailService;
    @Autowired
    private OrderMasterService orderMasterService;

    @ApiOperation(value = "新增billDetail以及billMaster列表", notes = "新增billDetail以及billMaster列表")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @PostMapping("insert")
    public Result add(@RequestBody OrderDetail orderDetail, @ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType() != -1){
            Integer companyId    = currentUser.getCompanyId();
            orderDetail.setCompanyId(companyId);
        }
        Integer companyId = currentUser.getCompanyId();
        orderDetail.setCompanyId(companyId);
        String  nowDate = DateUtils.getNowDateTimeString();
        orderDetail.setAddTime(nowDate);
        orderDetail.setState(1);
        orderDetailService.save(orderDetail);
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
        OrderDetailCriteria criteria = new OrderDetailCriteria();
        criteria.setId(id);
        if(currentUser.getCompanyType() != -1){
            companyId    = currentUser.getCompanyId();
            criteria.setCompanyId(companyId);
        }
        orderDetailService.deleteByC(criteria);
        return ResultGenerator.genSuccessResult();
    }

    @ApiOperation(value = "更新", notes = "更新")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @PostMapping("/update")
    public Result update(@RequestBody OrderDetail orderDetail,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }

        orderDetailService.update(orderDetail);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/{id}")
    public Result detail(@PathVariable String id) {
        OrderDetail orderDetail = orderDetailService.findById(id);
        return ResultGenerator.genSuccessResult(orderDetail);
    }

    @ApiOperation(value = "页面List", notes = "页面List")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("list")
    public Result list(OrderDetailCriteria criteria,@ApiIgnore @User CurrentUser currentUser) {

        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType() != -1){
            criteria.setCompanyId(currentUser.getCompanyId());
        }


        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<OrderDetailDto> list = orderDetailService.findList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }



    @ApiOperation(value = "验收", notes = "验收")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/accept")
    public Result accept( OrderDetail detail) {

        //改变detail的状态
        OrderDetail orderDetail = orderDetailService.findBy("id",detail.getId());
        orderDetail.setState(2);
        orderDetailService.update(orderDetail);

        String orderNo = orderDetail.getOrderNo();
        OrderMaster orderMaster = orderMasterService.findBy("orderNo",orderNo);






        //判断是否已经全部验收  如果全部验收 改变master的状态

        OrderDetailCriteria criteria = new OrderDetailCriteria();
        criteria.setOrderNo(orderNo);
        criteria.setState(1);
        List<OrderDetailDto> orderDetails = orderDetailService.findList(criteria);
        if(orderDetails.size() == 0){
            orderMaster.setState(3);
            orderMasterService.update(orderMaster);
        }


        return ResultGenerator.genSuccessResult();
    }


}
