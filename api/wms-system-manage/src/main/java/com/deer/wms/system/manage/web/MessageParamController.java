package com.deer.wms.system.manage.web;

import com.deer.wms.system.manage.service.SystemParamService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import springfox.documentation.annotations.ApiIgnore;

import com.deer.wms.intercept.annotation.Authority;
import com.deer.wms.intercept.annotation.User;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.project.seed.constant.Constants;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.system.manage.model.param.OrderExpensesParam;
import com.deer.wms.system.manage.model.param.ParamMessageDetail;
import com.deer.wms.system.manage.model.param.ParamMessageListVO;
import com.deer.wms.system.manage.model.param.SystemParam;
import com.deer.wms.system.manage.model.param.SystemParamCriteria;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

/**
 * 消息参数api接口
 *
 * Created by WUXB on 2017/10/02.
 */
@Api(description = "消息参数api接口")
@Authority
@RestController
@RequestMapping("/system/params/message")
public class MessageParamController {
    @Autowired
    private SystemParamService systemParamService;


    /**
     * 分页查询消息参数信息
     *
     * @param criteria
     * @return
     */
    @ApiOperation(value = "分页查询消息参数信息", notes = "获取消息参数信息列表")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
            , @ApiImplicitParam(name = "pageNum", value = "页码", paramType="query", dataType="int", required = true, defaultValue = "1")
            , @ApiImplicitParam(name = "pageSize", value = "每页显示的条数", paramType="query", dataType="int", required = true, defaultValue = "20")
    })
    @GetMapping("/list")
    public Result messageList(SystemParamCriteria criteria) {
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<ParamMessageListVO> list = systemParamService.findMessageParamFormList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

    /**
     * 查看消息参数详情
     *
     * @param paramId 消息参数信息id
     * @return
     */
    @ApiOperation(value = "查看消息参数详情", notes = "查看消息参数详细信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
            , @ApiImplicitParam(name = "messageId", value = "系统参数信息id", paramType="path", dataType="int", required = true)
    })
    @GetMapping("/{paramId}")
    public Result detail(@PathVariable Integer paramId) {
        SystemParam systemParam = systemParamService.findById(paramId);
        ParamMessageDetail detail = new ParamMessageDetail();
        BeanUtils.copyProperties(systemParam, detail);
        return ResultGenerator.genSuccessResult(detail);
    }

    /**
     * 启用系统参数
     *
     * @param paramId 系统参数信息id
     * @return
     */
    @ApiOperation(value = "启用系统参数", notes = "启用系统参数")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
            , @ApiImplicitParam(name = "paramId", value = "系统参数信息id", paramType="path", dataType="int", required = true)
    })
    @PutMapping("/{paramId}/enable")
    public Result enable(@PathVariable Integer paramId, @ApiIgnore @User CurrentUser currentUser) {
        systemParamService.modifySystemParamState(paramId, Constants.INFO_STATE_NORMAL, currentUser);
        return ResultGenerator.genSuccessResult();
    }

    /**
     * 停用系统参数
     *
     * @param paramId 系统参数信息id
     * @return
     */
    @ApiOperation(value = "停用系统参数", notes = "停用系统参数")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
            , @ApiImplicitParam(name = "paramId", value = "系统参数信息id", paramType="path", dataType="int", required = true)
    })
    @PutMapping("/{paramId}/disable")
    public Result disable(@PathVariable Integer paramId, @ApiIgnore @User CurrentUser currentUser) {
        systemParamService.modifySystemParamState(paramId, Constants.INFO_STATE_INVALID, currentUser);
        return ResultGenerator.genSuccessResult();
    }

    
    /**
     * 获取订单租金/保证金参数值
     *
     * @param palletCount 托盘个数
     * @return
     */
    @ApiOperation(value = "获取订单租金/保证金参数值", notes = "获取订单租金/保证金参数值")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true), 
            @ApiImplicitParam(name = "palletCount", value = "托盘个数", paramType="path", dataType="long", required = true)})
    @PutMapping("/orderExpenseParam/{palletCount}")
    public Result orderExpenseParam(@PathVariable Long palletCount, @ApiIgnore @User CurrentUser currentUser) 
    {
    	// TODO 需要从数据库中查询对应的参数值；目前先写死
    	OrderExpensesParam param = new OrderExpensesParam();
    	param.setCautionMoney( 100 );
    	param.setRentMoney( 0.3f );
    	param.setReletMoney( 0.1f );
    	 return ResultGenerator.genSuccessResult(param);
    }
}
