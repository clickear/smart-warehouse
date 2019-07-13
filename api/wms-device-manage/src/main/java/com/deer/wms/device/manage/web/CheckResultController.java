package com.deer.wms.device.manage.web;

import com.deer.wms.device.manage.model.InsertResult;
import com.deer.wms.intercept.annotation.User;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.device.manage.model.CheckResult;
import com.deer.wms.device.manage.model.CheckResultCriteria;
import com.deer.wms.device.manage.service.CheckResultService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.deer.wms.device.manage.model.CheckResultDto;
import springfox.documentation.annotations.ApiIgnore;


/**
* Created by GuoJingXun on 2018/10/11.
*/
@EnableAsync
@RestController
@RequestMapping("/check/results")
public class CheckResultController {

    @Autowired
    private CheckResultService checkResultService;

    @PostMapping("/insert")
    public Result add(@RequestBody CheckResult checkResult) {
        checkResultService.save(checkResult);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/delete")
    public Result delete( Integer checkResultId) {
        checkResultService.deleteById(checkResultId);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/update")
    public Result update(@RequestBody CheckResult checkResult) {
        checkResultService.update(checkResult);
        return ResultGenerator.genSuccessResult();
    }


    @PostMapping("/result")
    @ApiOperation(value="批量录入单个设备的检查结果",notes=" ")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    public Result result(@RequestBody InsertResult insertResult, @ApiIgnore @User CurrentUser currentUser) {

        List<CheckResult> checkResults = insertResult.getCheckResults();
        if(checkResults.size()>0){
            checkResultService.result(checkResults,currentUser);
            checkResultService.changeDetailState(checkResults.get(0).getDeviceCheckDetailId());
        }

        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/{id}")
    public Result detail(@PathVariable Integer id) {
        CheckResult checkResult = checkResultService.findById(id);
        return ResultGenerator.genSuccessResult(checkResult);
    }

    @GetMapping("/list")
    public Result list(CheckResultCriteria criteria) {
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<CheckResultDto> list = checkResultService.findList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

}
