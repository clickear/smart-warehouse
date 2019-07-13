package com.deer.wms.base.system.web;
import com.deer.wms.base.system.model.SupplierManageCriteria;
import com.deer.wms.intercept.annotation.User;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.project.seed.core.result.CommonCode;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.base.system.model.ClientManage;
import com.deer.wms.base.system.model.ClientManageCriteria;
import com.deer.wms.base.system.service.ClientManageService;
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
@RequestMapping("/client/manages")
@Api(description = "客户管理接口")
public class ClientManageController {

    @Autowired
    private ClientManageService clientManageService;

    @PostMapping("/insert")
    @ApiOperation(value="添加客户信息",notes="添加客户信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    public Result add(@RequestBody ClientManage clientManage,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType() != -1){
            Integer companyId    = currentUser.getCompanyId();
            clientManage.setCompanyId(companyId);
        }
        String  clientCode="KH"+currentUser.getCompanyId()+RandomNo.createTimeString().substring(2,14);
        clientManage.setClientCode(clientCode);
        String nowDate = DateUtils.getNowDateTimeString();
        clientManage.setCreateTime(nowDate);
        clientManageService.save(clientManage);
        return ResultGenerator.genSuccessResult();
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/delete")
    @ApiOperation(value="删除客户信息",notes="删除客户信息")
    public Result delete( String clientCode ,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        Integer companyId ;
        ClientManageCriteria criteria = new ClientManageCriteria();
        criteria.setClientCode(clientCode);
        if(currentUser.getCompanyType() != -1){
            companyId    = currentUser.getCompanyId();
            criteria.setCompanyId(companyId);
        }
        clientManageService.deleteByCodeAndCom(criteria);
        return ResultGenerator.genSuccessResult();
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @PostMapping("/update")
    @ApiOperation(value="更新客户信息",notes="更新客户信息")
    public Result update(@RequestBody ClientManage clientManage, @ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType() != -1){
            Integer companyId    = currentUser.getCompanyId();
            clientManage.setCompanyId(companyId);
        }
        clientManageService.update(clientManage);
        return ResultGenerator.genSuccessResult();
    }
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/detail")
    @ApiOperation(value="单客户信息查询",notes="单客户信息查询")
    public Result detail( Integer id, @ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        ClientManage clientManage = clientManageService.findById(id);
        return ResultGenerator.genSuccessResult(clientManage);
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/list")
    @ApiOperation(value="客户息查询列表",notes="客户息查询列表")
    public Result list(ClientManageCriteria criteria, @ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType() != -1){
            Integer companyId    = currentUser.getCompanyId();
            criteria.setCompanyId(companyId);
        }


        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<ClientManage> list = clientManageService.findList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

}
