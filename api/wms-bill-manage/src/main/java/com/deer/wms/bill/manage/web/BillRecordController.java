package com.deer.wms.bill.manage.web;

import com.deer.wms.bill.manage.model.BillRecordDto;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.bill.manage.model.BillRecord;
import com.deer.wms.bill.manage.model.BillRecordCriteria;
import com.deer.wms.bill.manage.service.BillRecordService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
* Created by guo on 2018/08/13.
*/
@RestController
@RequestMapping("/bill/records")
public class BillRecordController {

    @Autowired
    private BillRecordService billRecordService;

    @PostMapping
    public Result add(@RequestBody BillRecord billRecord) {
        billRecordService.save(billRecord);
        return ResultGenerator.genSuccessResult();
    }

    @DeleteMapping("/{id}")
    public Result delete(@PathVariable Integer id) {
        billRecordService.deleteById(id);
        return ResultGenerator.genSuccessResult();
    }

    @PutMapping
    public Result update(@RequestBody BillRecord billRecord) {
        billRecordService.update(billRecord);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/{id}")
    public Result detail(@PathVariable Integer id) {
        BillRecord billRecord = billRecordService.findById(id);
        return ResultGenerator.genSuccessResult(billRecord);
    }

    @GetMapping
    public Result list(BillRecordCriteria criteria) {
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<BillRecordDto> list = billRecordService.findList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

}
