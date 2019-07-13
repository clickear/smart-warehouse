package com.deer.wms.operation.web;
import com.deer.wms.operation.model.SaleDetailDto;
import com.deer.wms.operation.model.SaleMaster;
import com.deer.wms.operation.service.SaleMasterService;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.operation.model.SaleDetail;
import com.deer.wms.operation.model.SaleDetailCriteria;
import com.deer.wms.operation.service.SaleDetailService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
* Created by  on 2018/07/25.
*/
@RestController
@Api(description = "销售管理Detail接口")
@RequestMapping("/sale/details")
public class SaleDetailController {

    @Autowired
    private SaleDetailService saleDetailService;
    @Autowired
    private SaleMasterService saleMasterService;

    @PostMapping("/insert")
    public Result add(@RequestBody SaleDetail saleDetail) {

        saleDetailService.save(saleDetail);
        return ResultGenerator.genSuccessResult();
    }

    @DeleteMapping("/{id}")
    public Result delete( Integer id) {
        saleDetailService.deleteById(id);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/update")
    public Result update(@RequestBody SaleDetail saleDetail) {
        saleDetailService.update(saleDetail);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/{id}")
    public Result detail( Integer id) {
        SaleDetail saleDetail = saleDetailService.findById(id);
        return ResultGenerator.genSuccessResult(saleDetail);
    }

    @GetMapping("/list")
    public Result list(SaleDetailCriteria criteria) {
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<SaleDetailDto> list = saleDetailService.findList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }
    @GetMapping("/buy")
    public Result buy(SaleDetailCriteria  criteria) {

        String saleNo = criteria.getSaleNo();
        SaleDetail saleDetail = saleDetailService.findById(criteria.getId());
        saleDetail.setStatus(1);
        saleDetailService.update(saleDetail);
        criteria.setKeyWords(null);
        criteria.setStatus(0);

        List<SaleDetailDto> list = saleDetailService.findBySaleNoAndStatus(criteria);
        SaleMaster saleMaster =saleMasterService.findBy("saleNo",saleNo);
        if(list.size()==0){
            saleMaster.setStatus(2);

        }else if(list.size()>0){
            saleMaster.setStatus(1);
        }
        saleMasterService.update(saleMaster);



        return ResultGenerator.genSuccessResult();
    }
}
