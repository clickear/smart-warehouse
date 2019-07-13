package com.deer.wms.base.system.web;

import com.deer.wms.base.system.model.ItemMasterDto;
import com.deer.wms.intercept.annotation.User;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.project.seed.core.result.CommonCode;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.base.system.model.ItemMaster;
import com.deer.wms.base.system.model.ItemMasterCriteria;
import com.deer.wms.base.system.service.ItemMasterService;
import com.deer.wms.project.seed.util.DateUtils;
import com.deer.wms.project.seed.util.RandomNo;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

/**
* Created by guo on 2018/08/03.
*/
@RestController
@RequestMapping("/item/masters")
public class ItemMasterController {

    @Autowired
    private ItemMasterService itemMasterService;

    @PostMapping("/insert")
    @ApiOperation(value="添加货主信息",notes="添加货主信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    public Result add(@RequestBody ItemMaster itemMaster, @ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType() != -1){
            Integer companyId    = currentUser.getCompanyId();
            itemMaster.setCompanyId(companyId);
        }
        Integer companyId = currentUser.getCompanyId();
        itemMaster.setCompanyId(companyId);
        String  nowDate = DateUtils.getNowDateTimeString();
        itemMaster.setCreateTime(nowDate);
        itemMasterService.save(itemMaster);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/delete")
    public Result delete(Integer itemMasterId) {
        itemMasterService.deleteById(itemMasterId);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/update")
    public Result update(@RequestBody ItemMaster itemMaster) {
        itemMasterService.update(itemMaster);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/{id}")
    public Result detail(@PathVariable Integer id) {
        ItemMaster itemMaster = itemMasterService.findById(id);
        return ResultGenerator.genSuccessResult(itemMaster);
    }

    @GetMapping("/list")
    @ApiOperation(value="列表",notes="列表")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    public Result list(ItemMasterCriteria criteria, @ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType() != -1){
            Integer companyId    = currentUser.getCompanyId();
            criteria.setCompanyId(companyId);
        }
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<ItemMasterDto> list = itemMasterService.findList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

}
