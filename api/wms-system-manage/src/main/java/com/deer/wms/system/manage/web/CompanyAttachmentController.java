package com.deer.wms.system.manage.web;

import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.system.manage.model.company.CompanyAttachment;
import com.deer.wms.system.manage.model.company.CompanyAttachmentCriteria;
import com.deer.wms.system.manage.service.CompanyAttachmentService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

/**
* Created by WUXB on 2017/10/01.
*/
@ApiIgnore
@RestController
@RequestMapping("/company/attachments")
public class CompanyAttachmentController {

    @Autowired
    private CompanyAttachmentService companyAttachmentService;

    @PostMapping
    public Result add(@RequestBody CompanyAttachment companyAttachment) {
        companyAttachmentService.save(companyAttachment);
        return ResultGenerator.genSuccessResult();
    }

    @DeleteMapping("/{id}")
    public Result delete(@PathVariable Integer id) {
        companyAttachmentService.deleteById(id);
        return ResultGenerator.genSuccessResult();
    }

    @PutMapping
    public Result update(@RequestBody CompanyAttachment companyAttachment) {
        companyAttachmentService.update(companyAttachment);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/{id}")
    public Result detail(@PathVariable Integer id) {
        CompanyAttachment companyAttachment = companyAttachmentService.findById(id);
        return ResultGenerator.genSuccessResult(companyAttachment);
    }

    @GetMapping
    public Result list(CompanyAttachmentCriteria criteria) {
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<CompanyAttachment> list = companyAttachmentService.findAll();
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

}
