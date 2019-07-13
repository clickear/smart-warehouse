package com.deer.wms.ware.task.web;


import com.deer.wms.ware.task.model.CountDetail;
import com.deer.wms.ware.task.model.CountDetailCriteria;
import com.deer.wms.ware.task.model.CountDetailDto;
import com.deer.wms.ware.task.model.CountMaster;
import com.deer.wms.ware.task.service.CountDetailService;
import com.deer.wms.ware.task.service.CountMasterService;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.ware.task.model.*;
import com.deer.wms.ware.task.service.CountTaskService;
import com.deer.wms.ware.task.service.PalletBatchService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
* Created by guo on 2018/08/22.
*/
@RestController
@RequestMapping("/count/tasks")
public class CountTaskController {

    @Autowired
    private CountTaskService countTaskService;

    @Autowired
    private CountMasterService countMasterService;

    @Autowired
    private CountDetailService countDetailService;

    @Autowired
    private PalletBatchService palletBatchService;


    @ApiOperation(value ="生成盘点任务", notes ="生成盘点任务")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/add")
    public Result add(Integer countId) {
        CountMaster countMaster = countMasterService.findById(countId);
        countMaster.setState(3);
        countMasterService.update(countMaster);
        CountDetailCriteria countDetailCriteria = new CountDetailCriteria();
        countDetailCriteria.setCountId(countId);
        List<CountDetailDto> countDetailDtos = countDetailService.findList(countDetailCriteria)  ;

        PalletBatchCriteria palletBatchCriteria = new PalletBatchCriteria();
        for(CountDetail countDetail :countDetailDtos){
            palletBatchCriteria.setItemMasterId(countMaster.getItemMasterId());
            palletBatchCriteria.setWareCode(countMaster.getWareCode());
            palletBatchCriteria.setAreaCode(countDetail.getAreaCode());
            palletBatchCriteria.setShelfCode(countDetail.getShelfCode());
            palletBatchCriteria.setItemCode(countDetail.getItemCode());
            List<PalletBatchDto> palletBatchDtos = palletBatchService.findList(palletBatchCriteria);
            for(PalletBatch palletBatch :palletBatchDtos){
                CountTask countTask = new CountTask();
                countTask.setPalletBatchId(palletBatch.getPalletBatchId());
                countTask.setState(1);
                countTask.setCountDetailId(countDetail.getCountDetailId());
                countTask.setSysQuantity(palletBatch.getQuantity());
                countTaskService.save(countTask);
            }
        }
        return ResultGenerator.genSuccessResult();
    }

    @DeleteMapping("/{id}")
    public Result delete(@PathVariable Integer id) {
        countTaskService.deleteById(id);
        return ResultGenerator.genSuccessResult();
    }

    @PutMapping
    public Result update(@RequestBody CountTask countTask) {
        countTaskService.update(countTask);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/{id}")
    public Result detail(@PathVariable Integer id) {
        CountTask countTask = countTaskService.findById(id);
        return ResultGenerator.genSuccessResult(countTask);
    }

    @GetMapping("/list")
    public Result list(CountTaskCriteria criteria) {
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<CountTaskDto> list = countTaskService.findList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

}
