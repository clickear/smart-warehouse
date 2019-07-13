package com.deer.wms.device.manage.web;

import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.device.manage.model.CheckContent;
import com.deer.wms.device.manage.model.CheckContentCriteria;
import com.deer.wms.device.manage.service.CheckContentService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.deer.wms.device.manage.model.CheckContentDto;


/**
* Created by GuoJingXun on 2018/10/11.
*/
@RestController
@RequestMapping("/check/contents")
public class CheckContentController {

    @Autowired
    private CheckContentService checkContentService;

    @PostMapping("/insert")
    public Result add(@RequestBody CheckContent checkContent) {
        checkContentService.save(checkContent);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/delete")
    public Result delete(Integer checkContentId) {
        checkContentService.deleteById(checkContentId);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/update")
    public Result update(@RequestBody CheckContent checkContent) {
        checkContentService.update(checkContent);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/{id}")
    public Result detail(@PathVariable Integer id) {
        CheckContent checkContent = checkContentService.findById(id);
        return ResultGenerator.genSuccessResult(checkContent);
    }

    @GetMapping("/list")
    public Result list(CheckContentCriteria criteria) {
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<CheckContentDto> list = checkContentService.findList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

}
