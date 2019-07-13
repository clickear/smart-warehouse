package com.deer.wms.message.web;

import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.message.model.NoticeSendRecord;
import com.deer.wms.message.model.NoticeSendRecordCriteria;
import com.deer.wms.message.service.NoticeSendRecordService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
* Created by WUXB on 2017/10/09.
*/
@RestController
@RequestMapping("/notice/send/records")
public class NoticeSendRecordController {

    @Autowired
    private NoticeSendRecordService noticeSendRecordService;

    @PostMapping
    public Result add(@RequestBody NoticeSendRecord noticeSendRecord) {
        noticeSendRecordService.save(noticeSendRecord);
        return ResultGenerator.genSuccessResult();
    }

    @DeleteMapping("/{id}")
    public Result delete(@PathVariable Integer id) {
        noticeSendRecordService.deleteById(id);
        return ResultGenerator.genSuccessResult();
    }

    @PutMapping
    public Result update(@RequestBody NoticeSendRecord noticeSendRecord) {
        noticeSendRecordService.update(noticeSendRecord);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/{id}")
    public Result detail(@PathVariable Integer id) {
        NoticeSendRecord noticeSendRecord = noticeSendRecordService.findById(id);
        return ResultGenerator.genSuccessResult(noticeSendRecord);
    }

    @GetMapping
    public Result list(NoticeSendRecordCriteria criteria) {
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<NoticeSendRecord> list = noticeSendRecordService.findAll();
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

}
