package com.deer.wms.base.system.web;

import com.deer.wms.base.system.model.ItemBatchDto;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.base.system.model.ItemBatch;
import com.deer.wms.base.system.model.ItemBatchCriteria;
import com.deer.wms.base.system.service.ItemBatchService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
* Created by guo on 2018/08/06.
*/
@RestController
@RequestMapping("/item/batchs")
public class ItemBatchController {

    @Autowired
    private ItemBatchService itemBatchService;

    @PostMapping
    public Result add(@RequestBody ItemBatch itemBatch) {
        itemBatchService.save(itemBatch);
        return ResultGenerator.genSuccessResult();
    }

    @DeleteMapping("/{id}")
    public Result delete(@PathVariable Integer id) {
        itemBatchService.deleteById(id);
        return ResultGenerator.genSuccessResult();
    }

    @PutMapping
    public Result update(@RequestBody ItemBatch itemBatch) {
        itemBatchService.update(itemBatch);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/{id}")
    public Result detail(@PathVariable Integer id) {
        ItemBatch itemBatch = itemBatchService.findById(id);
        return ResultGenerator.genSuccessResult(itemBatch);
    }

    @GetMapping("/list")
    public Result list(ItemBatchCriteria criteria) {
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<ItemBatchDto> list = itemBatchService.findList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

}
