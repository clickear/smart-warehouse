package com.deer.wms.ware.task.web;
import com.deer.wms.ware.task.model.*;
import com.deer.wms.ware.task.service.CountDetailService;
import com.deer.wms.intercept.annotation.User;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.ware.task.service.CountMasterService;
import com.deer.wms.project.seed.util.DateUtils;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;


import java.util.List;

/**
* Created by guo on 2018/08/20.
*/
@RestController
@Api(description = "CountMasters管理接口")
@RequestMapping("/count/masters")
public class CountMasterController {

    @Autowired
    private CountMasterService countMasterService;

    @Autowired
    private CountDetailService countDetailService;
    @ApiOperation(value = "新增CountMaster以及CountMaster列表", notes = "新增CountMaster以及CountMaster列表")
    @PostMapping("/insert")
    public Result add(@RequestBody CountInsertData countInsertData, @ApiIgnore @User CurrentUser currentUser) {
        CountMaster countMaster = countInsertData.getCountMaster();

        String  nowDate = DateUtils.getNowDateTimeString();
        countMaster.setCreateTime(nowDate);
        countMaster.setCreateUserId(currentUser.getUserId());
        countMasterService.save(countMaster);

        Integer countId = countMaster.getCountId();
        for(CountDetail countDetail:countInsertData.getList()){
            countDetail.setCountId(countId);

            countDetailService.save(countDetail);
        }


        return ResultGenerator.genSuccessResult();
    }
    @ApiOperation(value = "根据id删除", notes = "根据id删除")
    @GetMapping("/delete")
    public Result delete( Integer countId) {
        countMasterService.deleteById(countId);
        return ResultGenerator.genSuccessResult();
    }

    @ApiOperation(value = "更新", notes = "更新")
    @PostMapping("/update")
    public Result update(@RequestBody CountMaster countMaster) {
        countMasterService.update(countMaster);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/{id}")
    public Result detail(@PathVariable Integer id) {
        CountMaster countMaster = countMasterService.findById(id);
        return ResultGenerator.genSuccessResult(countMaster);
    }

    @ApiOperation(value = "页面List", notes = "页面List")
    @GetMapping("/list")
    public Result list(CountMasterCriteria criteria) {
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<CountMasterDto> list = countMasterService.findList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

}
