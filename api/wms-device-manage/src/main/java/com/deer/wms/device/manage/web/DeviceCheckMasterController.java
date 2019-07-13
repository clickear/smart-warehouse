package com.deer.wms.device.manage.web;

import com.deer.wms.device.manage.model.InsertMaster;
import com.deer.wms.device.manage.service.CheckResultService;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.device.manage.model.DeviceCheckMaster;
import com.deer.wms.device.manage.model.DeviceCheckMasterCriteria;
import com.deer.wms.device.manage.service.DeviceCheckMasterService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.deer.wms.device.manage.model.DeviceCheckMasterDto;


/**
* Created by GuoJingXun on 2018/10/16.
*/

@EnableAsync
@RestController
@RequestMapping("/device/check/masters")
public class DeviceCheckMasterController {

    @Autowired
    private DeviceCheckMasterService deviceCheckMasterService;

    @Autowired
    private CheckResultService checkResultService;

    @PostMapping("/add")
    public Result add(@RequestBody DeviceCheckMaster deviceCheckMaster) {
        deviceCheckMasterService.save(deviceCheckMaster);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/insert")
    public Result insert(@RequestBody InsertMaster insertMaster) {
        deviceCheckMasterService.insert(insertMaster);

        checkResultService.insert(insertMaster.getDeviceCheckMaster().getDeviceCheckMasterId());
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/delete")
    public Result delete( Integer deviceCheckMasterId) {
        deviceCheckMasterService.deleteById(deviceCheckMasterId);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/update")
    public Result update(@RequestBody DeviceCheckMaster deviceCheckMaster) {
        deviceCheckMasterService.update(deviceCheckMaster);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/{id}")
    public Result detail(@PathVariable Integer id) {
        DeviceCheckMaster deviceCheckMaster = deviceCheckMasterService.findById(id);
        return ResultGenerator.genSuccessResult(deviceCheckMaster);
    }

    @GetMapping("/list")
    public Result list(DeviceCheckMasterCriteria criteria) {
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<DeviceCheckMasterDto> list = deviceCheckMasterService.findList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

}
