package com.deer.wms.ware.task.web;

import com.deer.wms.intercept.annotation.User;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.project.seed.util.DateUtils;
import com.deer.wms.ware.task.model.CountPalletBatch;
import com.deer.wms.ware.task.model.CountPalletBatchCriteria;
import com.deer.wms.ware.task.service.CountPalletBatchService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

/**
* Created by guo on 2018/09/25.
*/
@RestController
@RequestMapping("/count/pallet/batchs")
public class CountPalletBatchController {

    @Autowired
    private CountPalletBatchService countPalletBatchService;

    @PostMapping("/add")
    public Result add(@RequestBody List<CountPalletBatch> countPalletBatchs, @ApiIgnore @User CurrentUser currentUser) {
        String now =  DateUtils.getNowDateTimeString();
        for(CountPalletBatch countPalletBatch :countPalletBatchs){
            countPalletBatch.setCompanyId(currentUser.getCompanyId());
            countPalletBatch.setCreateTime(now);
            countPalletBatch.setCreateUserId(currentUser.getUserId());
            countPalletBatchService.save(countPalletBatch);
        }

        return ResultGenerator.genSuccessResult();
    }

    @DeleteMapping("/{id}")
    public Result delete(@PathVariable Integer id) {
        countPalletBatchService.deleteById(id);
        return ResultGenerator.genSuccessResult();
    }

    @PutMapping
    public Result update(@RequestBody CountPalletBatch countPalletBatch) {
        countPalletBatchService.update(countPalletBatch);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/{id}")
    public Result detail(@PathVariable Integer id) {
        CountPalletBatch countPalletBatch = countPalletBatchService.findById(id);
        return ResultGenerator.genSuccessResult(countPalletBatch);
    }

    @GetMapping
    public Result list(CountPalletBatchCriteria criteria) {
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<CountPalletBatch> list = countPalletBatchService.findAll();
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

}
