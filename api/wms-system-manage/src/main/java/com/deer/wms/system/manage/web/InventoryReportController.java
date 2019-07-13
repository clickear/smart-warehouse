package com.deer.wms.system.manage.web;

import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.system.manage.model.InventoryReport;
import com.deer.wms.system.manage.model.InventoryReportCriteria;
import com.deer.wms.system.manage.model.InventoryReportDto;
import com.deer.wms.system.manage.service.InventoryReportService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
* Created by  on 2018/08/27.
*/
@RestController
@RequestMapping("/inventory/reports")
public class InventoryReportController {

    @Autowired
    private InventoryReportService inventoryReportService;

    @PostMapping
    public Result add(@RequestBody InventoryReport inventoryReport) {
        inventoryReportService.save(inventoryReport);
        return ResultGenerator.genSuccessResult();
    }

    @DeleteMapping("/{id}")
    public Result delete(@PathVariable Integer id) {
        inventoryReportService.deleteById(id);
        return ResultGenerator.genSuccessResult();
    }

    @PutMapping
    public Result update(@RequestBody InventoryReport inventoryReport) {
        inventoryReportService.update(inventoryReport);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/{id}")
    public Result detail(@PathVariable Integer id) {
        InventoryReport inventoryReport = inventoryReportService.findById(id);
        return ResultGenerator.genSuccessResult(inventoryReport);
    }

    @GetMapping("/list")
    public Result list(InventoryReportCriteria criteria) {
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<InventoryReportDto> list = inventoryReportService.findList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

}
