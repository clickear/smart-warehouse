package com.deer.wms.system.manage.web;

import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.system.manage.model.resource.ResourceUrlParam;
import com.deer.wms.system.manage.model.resource.ResourceUrlParamCriteria;
import com.deer.wms.system.manage.service.ResourceUrlParamService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

/**
* Created by WUXB on 2017/10/07.
*/
@ApiIgnore
@RestController
@RequestMapping("/resource/url/params")
public class ResourceUrlParamController {

    @Autowired
    private ResourceUrlParamService resourceUrlParamService;

    @PostMapping
    public Result add(@RequestBody ResourceUrlParam resourceUrlParam) {
        resourceUrlParamService.save(resourceUrlParam);
        return ResultGenerator.genSuccessResult();
    }

    @DeleteMapping("/{id}")
    public Result delete(@PathVariable Integer id) {
        resourceUrlParamService.deleteById(id);
        return ResultGenerator.genSuccessResult();
    }

    @PutMapping
    public Result update(@RequestBody ResourceUrlParam resourceUrlParam) {
        resourceUrlParamService.update(resourceUrlParam);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/{id}")
    public Result detail(@PathVariable Integer id) {
        ResourceUrlParam resourceUrlParam = resourceUrlParamService.findById(id);
        return ResultGenerator.genSuccessResult(resourceUrlParam);
    }

    @GetMapping
    public Result list(ResourceUrlParamCriteria criteria) {
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<ResourceUrlParam> list = resourceUrlParamService.findAll();
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

}
