package com.deer.wms.system.manage.web;

import com.deer.wms.intercept.annotation.Authority;
import com.deer.wms.intercept.annotation.User;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.project.seed.constant.Constants;
import com.deer.wms.project.seed.core.result.CommonCode;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.system.manage.model.param.*;
import com.deer.wms.system.manage.service.SystemParamService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.ArrayList;
import java.util.List;

/**
 * 告警参数api接口
 *
* Created by WUXB on 2017/10/06.
*/
@Api(description = "告警参数api接口")
@Authority
@RestController
@RequestMapping("/system/params/alarm")
public class AlarmParamController {

    @Autowired
    private SystemParamService systemParamService;


    /**
     * 分页查询告警参数信息
     *
     * @param criteria 查询条件
     * @return
     */
    @ApiOperation(value = "分页查询告警参数信息", notes = "获取告警参数信息列表")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
            , @ApiImplicitParam(name = "pageNum", value = "页码", paramType="query", dataType="int", required = true, defaultValue = "1")
            , @ApiImplicitParam(name = "pageSize", value = "每页显示的条数", paramType="query", dataType="int", required = true, defaultValue = "20")
            , @ApiImplicitParam(name = "state", value = "normal=正常的(启用)；invalid=无效的(停用)；", paramType="query", dataType="string")
            , @ApiImplicitParam(name = "keyword", value = "关键字：参数名称或者创建人", paramType="query", dataType="string")
    })
    @GetMapping("/list")
    public Result alarmList(SystemParamCriteria criteria) {
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<ParamAlarmListVO> list = systemParamService.findAlarmParamFormList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

    /**
     * 查看告警参数详情
     *
     * @param paramId 告警参数信息id
     * @return
     */
    @ApiOperation(value = "查看告警参数详情", notes = "查看告警参数详情")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
            , @ApiImplicitParam(name = "paramId", value = "告警参数信息id", paramType="path", dataType="int", required = true)
    })
    @GetMapping("/{paramId}")
    public Result alarmDetail(@PathVariable Integer paramId) {
        ParamAlarmDetail detail = systemParamService.findAlarmDetailByParamId(paramId);
        return ResultGenerator.genSuccessResult(detail);
    }

    /**
     * 添加告警参数信息
     *
     * @param create 告警参数信息
     * @param currentUser 当前操作用户信息
     * @return
     */
    @ApiOperation(value = "添加告警参数信息", notes = "添加告警参数信息")
    @PostMapping()
    public Result addAlarmParam(@RequestBody AlarmParamCreate create, @ApiIgnore @User CurrentUser currentUser) {
        systemParamService.addAlarmParam(create, currentUser);
        return ResultGenerator.genSuccessResult();
    }

    /**
     * 修改告警参数信息
     *
     * @param modify 告警参数信息
     * @param currentUser 当前操作用户信息
     * @return
     */
    @ApiOperation(value = "修改告警参数信息", notes = "修改告警参数信息")
    @PutMapping("/{alarmParamId}")
    public Result modifyAlarmParam(@PathVariable Integer alarmParamId, @RequestBody AlarmParamModify modify, @ApiIgnore @User CurrentUser currentUser) {
        modify.setAlarmParamId(alarmParamId);
        systemParamService.modifyAlarmParam(modify, currentUser);
        return ResultGenerator.genSuccessResult();
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
     * 删除告警参数
     *
     * @param paramId 告警参数信息id
     * @return
     */
    @ApiOperation(value = "删除系统参数", notes = "删除系统参数")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
            , @ApiImplicitParam(name = "paramId", value = "系统参数信息id", paramType="path", dataType="int", required = true)
    })
    @DeleteMapping("/{paramId}")
    public Result delete(@PathVariable Integer paramId, @ApiIgnore @User CurrentUser currentUser) {
        //如果消息参数不存在或者已经被删除，直接返回提示
        SystemParam param = systemParamService.findById(paramId);
        if (null == param || param.getState().equals(Constants.INFO_STATE_DELETED)) {
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR, "系统消息参数不存在", "");
        }

        //如果是消息参数，不允许删除
        if (param.getParamType() == Constants.SYSTEM_PARAM_MESSAGE) {
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR, "不能删除系统消息参数", "");
        }
        systemParamService.modifySystemParamState(paramId, Constants.INFO_STATE_DELETED, currentUser);
        return ResultGenerator.genSuccessResult();
    }

    /**
     * 获取动作类型及其动作参数信息
     *
     * @return
     */
    @ApiOperation(value = "获取动作类型及其动作参数信息", notes = "获取动作类型及其动作参数信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/action/param")
    public Result actionParamInfo() {
        //到货确认的子级(到货确认的告警参数)
        List<ParamAlarmAction> confirmSub = new ArrayList<>();
        confirmSub.add(new ParamAlarmAction(3, "确认地址与订单地址不一致"));
        confirmSub.add(new ParamAlarmAction(4, "到货确认人与下单人不一致"));

        //在途运输的子级(在途运输的告警参数)
        List<ParamAlarmAction> transportSub = new ArrayList<>();
        transportSub.add(new ParamAlarmAction(5, "超出地理围栏"));

        List<ParamAlarmAction> alarmActionList = new ArrayList<>();
        alarmActionList.add(new ParamAlarmAction(1, "到货确认", confirmSub));
        alarmActionList.add(new ParamAlarmAction(2, "在途运输", transportSub));

        return ResultGenerator.genSuccessResult(alarmActionList);
    }
}
