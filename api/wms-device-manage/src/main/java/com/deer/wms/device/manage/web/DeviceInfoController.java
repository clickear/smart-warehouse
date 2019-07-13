package com.deer.wms.device.manage.web;

import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.device.manage.model.DeviceInfo;
import com.deer.wms.device.manage.model.DeviceInfoCriteria;
import com.deer.wms.device.manage.service.DeviceInfoService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.deer.wms.device.manage.model.DeviceInfoDto;


/**
* Created by GuoJingXun on 2018/10/11.
*/
@RestController
@RequestMapping("/device/infos")
public class DeviceInfoController {

    @Autowired
    private DeviceInfoService deviceInfoService;

    @PostMapping("/insert")
    public Result add(@RequestBody DeviceInfo deviceInfo) {
        deviceInfoService.save(deviceInfo);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/delete")
    public Result delete( Integer deviceId) {
        deviceInfoService.deleteById(deviceId);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/update")
    public Result update(@RequestBody DeviceInfo deviceInfo) {
        deviceInfoService.update(deviceInfo);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/{id}")
    public Result detail(@PathVariable Integer id) {
        DeviceInfo deviceInfo = deviceInfoService.findById(id);
        return ResultGenerator.genSuccessResult(deviceInfo);
    }

    @GetMapping("/list")
    public Result list(DeviceInfoCriteria criteria) {
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<DeviceInfoDto> list = deviceInfoService.findList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

}
