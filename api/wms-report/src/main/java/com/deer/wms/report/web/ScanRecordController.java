package com.deer.wms.report.web;

import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.report.model.ScanRecord;
import com.deer.wms.report.model.ScanRecordCriteria;
import com.deer.wms.report.service.ScanRecordService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;



/**
* Created by 郭靖勋 on 2018/10/17.
*/
@RestController
@RequestMapping("/scan/records")
public class ScanRecordController {

    @Autowired
    private ScanRecordService scanRecordService;

    @PostMapping("/add")
    public Result add(@RequestBody ScanRecord scanRecord) {
        scanRecordService.save(scanRecord);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/delete")
    public Result delete( Integer scanRecordId) {
        scanRecordService.deleteById(scanRecordId);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/update")
    public Result update(@RequestBody ScanRecord scanRecord) {
        scanRecordService.update(scanRecord);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/{id}")
    public Result detail(@PathVariable Integer id) {
        ScanRecord scanRecord = scanRecordService.findById(id);
        return ResultGenerator.genSuccessResult(scanRecord);
    }

    @GetMapping("/list")
    public Result list(ScanRecordCriteria criteria) {
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<ScanRecord> list = scanRecordService.findList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

}
