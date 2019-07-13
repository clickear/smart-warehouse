package com.deer.wms.report.web;


import com.deer.wms.intercept.annotation.User;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.project.seed.core.result.CommonCode;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.project.seed.util.RandomNo;
import com.deer.wms.report.model.Inventory;
import com.deer.wms.report.model.InventoryCriteria;
import com.deer.wms.report.model.InventoryDto;
import com.deer.wms.report.service.InventoryService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.lkx.util.ExcelUtil;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

/**
* Created by 郭靖勋 on 2018/06/28.
*/
@RestController
@RequestMapping("/inventorys")
public class InventoryController {

    @Value("${file.uploadTempDir}")
    private String bathPath;

    @Autowired
    private InventoryService inventoryService;

    @PostMapping
    public Result add(@RequestBody Inventory inventory) {
        inventoryService.save(inventory);
        return ResultGenerator.genSuccessResult();
    }

    @DeleteMapping("/{id}")
    public Result delete(@PathVariable Integer id) {
        inventoryService.deleteById(id);
        return ResultGenerator.genSuccessResult();
    }

    @PutMapping
    public Result update(@RequestBody Inventory inventory) {
        inventoryService.update(inventory);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/{id}")
    public Result detail(@PathVariable Integer id) {
        Inventory inventory = inventoryService.findById(id);
        return ResultGenerator.genSuccessResult(inventory);
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/list")
    public Result list(InventoryCriteria criteria, @ApiIgnore @User CurrentUser currentUser) throws Exception {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType() != -1){
            Integer companyId    = currentUser.getCompanyId();
            criteria.setCompanyId(companyId);
        }

        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<InventoryDto> list = inventoryService.findList(criteria);
         PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/batch/list")
    public Result batchlist(InventoryCriteria criteria, @ApiIgnore @User CurrentUser currentUser) throws Exception {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType() != -1){
            Integer companyId    = currentUser.getCompanyId();
            criteria.setCompanyId(companyId);
        }

        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<InventoryDto> list = inventoryService.findBatchList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }



    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/warning/list")
    public Result warning(InventoryCriteria criteria, @ApiIgnore @User CurrentUser currentUser) throws Exception {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType() != -1){
            Integer companyId    = currentUser.getCompanyId();
            criteria.setCompanyId(companyId);
        }

        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<InventoryDto> list = inventoryService.findList(criteria);
        List<InventoryDto> newList = new ArrayList<InventoryDto>() ;

        for(InventoryDto inventoryDto : list){

            if(inventoryDto.getQuantity() < inventoryDto.getFloorLimit() ){
                inventoryDto.setQuantityState("缺货");
                newList.add(inventoryDto);
            }
            if(inventoryDto.getQuantity() > inventoryDto.getUpperLimit() ){
                inventoryDto.setQuantityState("积压");
                newList.add(inventoryDto);
            }


        }
        PageInfo pageInfo = new PageInfo(newList);
        return ResultGenerator.genSuccessResult(pageInfo);
    }




    @GetMapping("/exportInventory")
    public Result exportInboundExcel(   ){

        String path=bathPath+"//inventory.xls";
        String inventoryPath =null;

        try {
            InputStream inputStream=new FileInputStream(new File(path));
            Workbook workbook= WorkbookFactory.create(inputStream);
            Sheet sheet=workbook.getSheetAt(0);



            for(int i=0;i<sheet.getLastRowNum();i++){


            }

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (InvalidFormatException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ResultGenerator.genSuccessResult(inventoryPath);
    }

    public static void main(String[] args) throws Exception {
        String keyValue ="仓库:wareName,物料名称:itemName,规格:itemClass,数量:quantity";
        List list2=ExcelUtil.readXls("D://inventory20180718205047.xls",ExcelUtil.getMap(keyValue),"com.deer.wms.report.model.InventoryDto");


        ExcelUtil.exportExcel("D://testsss.xls",keyValue,list2,"com.deer.wms.report.model.InventoryDto");
    }

}
