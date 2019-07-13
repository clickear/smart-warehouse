package com.deer.wms.report.web;

import com.deer.wms.intercept.annotation.User;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.project.seed.core.result.CommonCode;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.report.model.AreaItem;
import com.deer.wms.report.model.AreaItemCriteria;
import com.deer.wms.report.model.AreaItemDto;
import com.deer.wms.report.service.AreaItemService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

/**
* Created by 郭靖勋 on 2018/07/10.
*/
@RestController
@RequestMapping("/area/items")
public class AreaItemController {

    @Autowired
    private AreaItemService areaItemService;

    @PostMapping("/insert")
    public Result add(@RequestBody AreaItem areaItem, @ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }

        areaItemService.save(areaItem);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/delete")
    public Result delete( Integer id) {
        areaItemService.deleteById(id);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/update")
    public Result update(@RequestBody AreaItem areaItem) {
        areaItemService.update(areaItem);
        return ResultGenerator.genSuccessResult();
    }


    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/list")
    public Result list(AreaItemCriteria criteria, @ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType()!= -1){
            criteria.setCompanyId(currentUser.getCompanyId());
        }
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<AreaItemDto> list = areaItemService.findList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

}
