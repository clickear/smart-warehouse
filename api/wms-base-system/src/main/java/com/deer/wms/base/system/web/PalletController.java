package com.deer.wms.base.system.web;
import com.deer.wms.base.system.model.Pallet;
import com.deer.wms.base.system.model.PalletCriteria;
import com.deer.wms.base.system.model.PalletDto;

import com.deer.wms.base.system.model.WareInfoCriteria;
import com.deer.wms.base.system.service.PalletService;
import com.deer.wms.intercept.annotation.User;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.project.seed.core.result.CommonCode;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;

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
 * Created by  on 2018/06/29.
 */
@Api(description = "托盘管理接口")
@RestController
@RequestMapping("/pallets")
public class PalletController {

    @Autowired
    private PalletService palletService;
    @PostMapping("/insert")
    @ApiOperation(value="添加物料类型信息",notes="添加物料类型信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    public Result add(@RequestBody Pallet pallet ,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        Integer companyId = currentUser.getCompanyId();
        String palletCode="TP"+companyId+RandomNo.createTimeString().substring(7,14);
        pallet.setCompanyId(companyId);
        pallet.setPalletCode(palletCode);
        palletService.save(pallet);
        return ResultGenerator.genSuccessResult();
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/delete")
    @ApiOperation(value="删除托盘信息",notes="删除托盘信息")
    public Result delete( String palletCode,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        Integer companyId ;
       PalletCriteria criteria = new PalletCriteria();
        criteria.setPalletCode(palletCode);
        if(currentUser.getCompanyType() != -1){
            companyId    = currentUser.getCompanyId();
            criteria.setCompanyId(companyId);
        }

        palletService.deleteByCodeAndCom(criteria);
        return ResultGenerator.genSuccessResult();
    }
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @PostMapping("/update")
    @ApiOperation(value = "更新托盘信息",notes = "更新托盘信息")
    public Result update(@RequestBody Pallet pallet, @ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        Integer companyId = currentUser.getCompanyId();
        pallet.setCompanyId(companyId);
        palletService.update(pallet);
        return ResultGenerator.genSuccessResult();
    }



    @GetMapping("/detail")
    @ApiOperation(value="单个托盘查询",notes="单个托盘查询")
    public Result detail( Integer id) {
        Pallet pallet = palletService.findById(id);
        return ResultGenerator.genSuccessResult(pallet);
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/list")
    @ApiOperation(value="托盘列表查询",notes="托盘列表查询")
    public Result list(PalletCriteria criteria, @ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType() != -1){
            Integer companyId    = currentUser.getCompanyId();
            criteria.setCompanyId(companyId);
        }
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());

        List<PalletDto> list = palletService.findList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

}
