package com.deer.wms.device.manage.web;

import com.deer.wms.device.manage.model.InsertProject;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.device.manage.model.CheckProject;
import com.deer.wms.device.manage.model.CheckProjectCriteria;
import com.deer.wms.device.manage.service.CheckProjectService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.apache.ibatis.annotations.Insert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.deer.wms.device.manage.model.CheckProjectDto;


/**
* Created by GuoJingXun on 2018/10/11.
*/
@RestController
@RequestMapping("/check/projects")
public class CheckProjectController {

    @Autowired
    private CheckProjectService checkProjectService;

    @PostMapping("/insert")
    public Result add(@RequestBody CheckProject checkProject) {
        checkProjectService.save(checkProject);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/insertAll")
    public Result insertAll(@RequestBody InsertProject insertProject) {
        checkProjectService.insertAll(insertProject);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/delete")
    public Result delete( Integer checkProjectId) {
        checkProjectService.deleteById(checkProjectId);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/update")
    public Result update(@RequestBody CheckProject checkProject) {
        checkProjectService.update(checkProject);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/{id}")
    public Result detail(@PathVariable Integer id) {
        CheckProject checkProject = checkProjectService.findById(id);
        return ResultGenerator.genSuccessResult(checkProject);
    }

    @GetMapping("/list")
    public Result list(CheckProjectCriteria criteria) {
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<CheckProjectDto> list = checkProjectService.findList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

}
