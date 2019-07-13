package com.deer.wms.ware.task.web;
import com.deer.wms.ware.task.model.CountDetailDto;
import com.deer.wms.intercept.annotation.User;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.project.seed.core.result.CommonCode;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.ware.task.model.CountDetail;
import com.deer.wms.ware.task.model.CountDetailCriteria;
import com.deer.wms.ware.task.service.CountDetailService;
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
* Created by guo on 2018/08/20.
*/

@RestController
@Api(description = "CountDetail管理接口")
@RequestMapping("/count/details")
public class CountDetailController {

    @Autowired
    private CountDetailService countDetailService;

    @ApiOperation(value = "新增countDetail以及countDetail列表", notes = "新增countDetail以及countDetail列表")
    @PostMapping("insert")
    public Result add(@RequestBody CountDetail countDetail ) {
        countDetailService.save(countDetail);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/delete")
    @ApiOperation(value="根据id删除countDetail列表",notes="根据id删除countDetail列表")
    public Result delete( Integer countDetailId) {
        countDetailService.deleteById(countDetailId);
        return ResultGenerator.genSuccessResult();
    }
    @ApiOperation(value = "更新", notes = "更新")
    @PostMapping("/update")
    public Result update(@RequestBody CountDetail countDetail) {
        countDetailService.update(countDetail);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/{id}")
    public Result detail(@PathVariable Integer id) {
        CountDetail countDetail = countDetailService.findById(id);
        return ResultGenerator.genSuccessResult(countDetail);
    }

    @ApiOperation(value = "页面List", notes = "页面List")
    @GetMapping("list")
    public Result list(CountDetailCriteria criteria) {
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<CountDetailDto> list = countDetailService.findList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

}
