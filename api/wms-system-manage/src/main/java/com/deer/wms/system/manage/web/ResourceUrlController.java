package com.deer.wms.system.manage.web;

import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.system.manage.model.resource.ResourceUrl;
import com.deer.wms.system.manage.model.resource.ResourceUrlCriteria;
import com.deer.wms.system.manage.service.ResourceUrlService;
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
@RequestMapping("/resource/urls")
public class ResourceUrlController {

    @Autowired
    private ResourceUrlService resourceUrlService;

    @PostMapping
    public Result add(@RequestBody ResourceUrl resourceUrl) {
        resourceUrlService.save(resourceUrl);
        return ResultGenerator.genSuccessResult();
    }

    @DeleteMapping("/{id}")
    public Result delete(@PathVariable Integer id) {
        resourceUrlService.deleteById(id);
        return ResultGenerator.genSuccessResult();
    }


    @PutMapping
    public Result update(@RequestBody ResourceUrl resourceUrl) {
        resourceUrlService.update(resourceUrl);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/{id}")
    public Result detail(@PathVariable Integer id) {
        ResourceUrl resourceUrl = resourceUrlService.findById(id);
        return ResultGenerator.genSuccessResult(resourceUrl);
    }

    @GetMapping
    public Result list(ResourceUrlCriteria criteria) {
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<ResourceUrl> list = resourceUrlService.findAll();
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

}
