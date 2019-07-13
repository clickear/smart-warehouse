package com.deer.wms.device.manage.web;

import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.device.manage.model.DeviceSingle;
import com.deer.wms.device.manage.model.DeviceSingleCriteria;
import com.deer.wms.device.manage.service.DeviceSingleService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.deer.wms.device.manage.model.DeviceSingleDto;


/**
* Created by GuoJingXun on 2018/10/11.
*/
@RestController
@RequestMapping("/device/singles")
public class DeviceSingleController {

    @Autowired
    private DeviceSingleService deviceSingleService;

    @PostMapping("/insert")
    public Result add(@RequestBody DeviceSingle deviceSingle) {
        deviceSingleService.save(deviceSingle);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/delete")
    public Result delete(Integer deviceSingleId) {
        deviceSingleService.deleteById(deviceSingleId);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/update")
    public Result update(@RequestBody DeviceSingle deviceSingle) {
        deviceSingleService.update(deviceSingle);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/{id}")
    public Result detail(@PathVariable Integer id) {
        DeviceSingle deviceSingle = deviceSingleService.findById(id);
        return ResultGenerator.genSuccessResult(deviceSingle);
    }

    @GetMapping("/list")
    public Result list(DeviceSingleCriteria criteria) {
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<DeviceSingleDto> list = deviceSingleService.findList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

}
