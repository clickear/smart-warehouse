package com.deer.wms.device.manage.web;

import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.device.manage.model.DeviceCheckDetail;
import com.deer.wms.device.manage.model.DeviceCheckDetailCriteria;
import com.deer.wms.device.manage.service.DeviceCheckDetailService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.deer.wms.device.manage.model.DeviceCheckDetailDto;


/**
* Created by GuoJingXun on 2018/10/16.
*/
@RestController
@RequestMapping("/device/check/details")
public class DeviceCheckDetailController {

    @Autowired
    private DeviceCheckDetailService deviceCheckDetailService;

    @PostMapping("/add")
    public Result add(@RequestBody DeviceCheckDetail deviceCheckDetail) {
        deviceCheckDetailService.save(deviceCheckDetail);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/delete")
    public Result delete( Integer deviceCheckDetailId) {
        deviceCheckDetailService.deleteById(deviceCheckDetailId);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/update")
    public Result update(@RequestBody DeviceCheckDetail deviceCheckDetail) {
        deviceCheckDetailService.update(deviceCheckDetail);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/{id}")
    public Result detail(@PathVariable Integer id) {
        DeviceCheckDetail deviceCheckDetail = deviceCheckDetailService.findById(id);
        return ResultGenerator.genSuccessResult(deviceCheckDetail);
    }

    @GetMapping("/list")
    public Result list(DeviceCheckDetailCriteria criteria) {
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<DeviceCheckDetailDto> list = deviceCheckDetailService.findList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

}
