package com.deer.wms.operation.web;
import com.deer.wms.operation.model.Insert;
import com.deer.wms.operation.model.SaleMasterDto;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.operation.model.SaleMaster;
import com.deer.wms.operation.model.SaleMasterCriteria;
import com.deer.wms.operation.service.SaleMasterService;
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
@Api(description = "销售管理mater接口")
@RequestMapping("/sale/masters")
public class SaleMasterController {

    @Autowired
    private SaleMasterService saleMasterService;

    @PostMapping("/insert")
    public Result add(@RequestBody Insert insert) {

        SaleMaster saleMaster = insert.getSaleMaster();
        saleMaster.setClientCode(saleMaster.getClientCode());
        saleMaster.setAddTime(saleMaster.getAddTime());
        saleMaster.setClientSite(saleMaster.getClientSite());
        Integer price = Integer.valueOf(" ");
        Integer quantity= Integer.valueOf(" ");
        Integer saleTotal=price*quantity;
        saleMaster.setSaleTotal(saleTotal);
        insert.setSaleMaster(saleMaster);
        saleMasterService.insert(insert);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/delete")
    public Result delete( Integer id) {
        saleMasterService.deleteById(id);
        return ResultGenerator.genSuccessResult();
    }

    @PostMapping("/update")
    public Result update(@RequestBody SaleMaster saleMaster) {
        saleMasterService.update(saleMaster);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/{id}")
    public Result detail( Integer id) {
        SaleMaster saleMaster = saleMasterService.findById(id);
        return ResultGenerator.genSuccessResult(saleMaster);
    }

    @GetMapping
    public Result list(SaleMasterCriteria criteria) {
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<SaleMasterDto> list = saleMasterService.findList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }
//    //发货
//    @GetMapping("/send")
//    public Result send(SaleMasterCriteria criteria) {
//        SaleMaster saleMaster = saleMasterService.findBy("saleNo",criteria.getSaleNo());
//        saleMaster.setStatus(3);
//        saleMaster.setTransportNo(criteria.getTransportNo());
//        billMaster.setTransportTime(DateUtils.dateToStr(new Date(),"yyyy-MM-dd HH:mm:ss"));
//        billMasterService.update(billMaster);
//
//        return ResultGenerator.genSuccessResult( );
//    }

//    //安装
//    @GetMapping("/install")
//    public Result install(BillMasterCriteria criteria) {
//
//        BillMaster billMaster = billMasterService.findBy("billNo",criteria.getBillNo());
//        billMaster.setStatus(4);
//        billMaster.setInstallMan(criteria.getInstallMan());
//        billMaster.setInstallTime(DateUtils.dateToStr(new Date(),"yyyy-MM-dd HH:mm:ss"));
//        billMasterService.update(billMaster);
//
//        return ResultGenerator.genSuccessResult( );
//    }

    //完成
    @GetMapping("/check")
    public Result check(SaleMasterCriteria criteria) {

        SaleMaster saleMaster = saleMasterService.findBy("saleNo",criteria.getSaleNo());
        saleMaster.setStatus(3);
        saleMasterService.update(saleMaster);
        return ResultGenerator.genSuccessResult( );
    }

}
