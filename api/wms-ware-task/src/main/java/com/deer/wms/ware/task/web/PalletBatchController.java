package com.deer.wms.ware.task.web;

import com.deer.wms.base.system.model.Pallet;
import com.deer.wms.base.system.service.PalletService;
import com.deer.wms.bill.manage.model.BillDetail;
import com.deer.wms.bill.manage.model.BillDetailCriteria;
import com.deer.wms.bill.manage.model.BillDetailDto;
import com.deer.wms.bill.manage.model.BillMaster;
import com.deer.wms.bill.manage.service.BillDetailService;
import com.deer.wms.bill.manage.service.BillMasterService;
import com.deer.wms.intercept.annotation.User;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.project.seed.core.result.CommonCode;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.project.seed.util.DateUtils;
import com.deer.wms.ware.task.model.*;
import com.deer.wms.ware.task.service.PalletBatchService;
import com.deer.wms.ware.task.service.PrepareTaskService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.ArrayList;
import java.util.List;

/**
* Created by guo on 2018/08/08.
*/
@RestController
@RequestMapping("/pallet/batchs")
public class PalletBatchController {

    @Autowired
    private PalletBatchService palletBatchService;

    @Autowired
    private PalletService palletService;

    @Autowired
    private BillMasterService billMasterService;

    @Autowired
    private BillDetailService billDetailService;

    @Autowired
    private PrepareTaskService prepareTaskService;



    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @ApiOperation(value="上架",notes="上架")
    @PostMapping("/insert")
    public Result add(@RequestBody PalletBatch palletBatch) {
        PalletBatchCriteria criteria = new PalletBatchCriteria();
        criteria.setBatchId(palletBatch.getBatchId());
        criteria.setPalletId(palletBatch.getPalletId());
        PalletBatch oldPalletBatch  = palletBatchService.findList(criteria).get(0);
        if(oldPalletBatch ==null){
            palletBatchService.save(palletBatch);

        }else {
            oldPalletBatch.setQuantity(oldPalletBatch.getQuantity()+palletBatch.getQuantity());
            palletBatchService.update(palletBatch);

        }

        //设置货位状态
        Pallet pallet = palletService.findById(palletBatch.getPalletId());
        String cellCode = pallet.getCellCode();
        palletBatchService.setCellState(cellCode);


        return ResultGenerator.genSuccessResult();
    }


    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @ApiOperation(value="组盘",notes="组盘")
    @PostMapping("/groupPallet")
    public Result groupPallet(@RequestBody List<PalletBatch> palletBatchs) {
        for (PalletBatch palletBatch :palletBatchs){
            PalletBatchCriteria criteria = new PalletBatchCriteria();
            criteria.setBatchId(palletBatch.getBatchId());
            criteria.setPalletId(palletBatch.getPalletId());
            List<PalletBatchDto> oldPalletBatchs  = palletBatchService.findList(criteria);
            if(oldPalletBatchs.size() ==0){
                palletBatchService.save(palletBatch);

            }else {
                PalletBatch oldPalletBatch = oldPalletBatchs.get(0);
                oldPalletBatch.setQuantity(oldPalletBatch.getQuantity()+palletBatch.getQuantity());
                palletBatchService.update(oldPalletBatch);

            }
        }

        return ResultGenerator.genSuccessResult();
    }


    @GetMapping("/cell")
    @ApiImplicitParams( { @ApiImplicitParam( name = "access-token", value = "token", paramType = "header", dataType = "String", required = true ),
            @ApiImplicitParam( name = "palletId", value = "托盘", paramType = "query", dataType = "Integer", required = true ),
            @ApiImplicitParam( name = "cellCode", value = "货位", paramType = "query", dataType = "String", required = true  ) } )
    @ApiOperation(value = "上架（货位）",notes = "上架（货位）")
    public Result cell( Pallet pallet, @ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }

        //查询原始数据
        Pallet oldPallet = palletService.findById(pallet.getPalletId());
        String oldCellCode = oldPallet.getCellCode();



        //修改当前托盘所在货位
        oldPallet.setCellCode(pallet.getCellCode());
        palletService.update(oldPallet);


        //设置原来货位状态
        if(oldCellCode != null && oldCellCode != ""){
            palletBatchService.setCellState(oldCellCode);
        }

        //设置新货位状态

        String cellCode = pallet.getCellCode();
        palletBatchService.setCellState(cellCode);

        return ResultGenerator.genSuccessResult();
    }


    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @ApiOperation(value="无托盘上架",notes="无托盘上架")
    @PostMapping("/noPalletUp")
    public Result noPalletUp(@RequestBody NoPalletUpInsert  noPalletUpInsert) {
        String cellCode = noPalletUpInsert.getCellCode();
        Pallet pallet = new Pallet();
        pallet.setPalletType(0);
        pallet.setPalletName("无托盘");
        pallet.setCellCode(noPalletUpInsert.getCellCode());
        palletService.save(pallet);

        List<BatchCell> batchCells = noPalletUpInsert.getBatchCells();
        for (BatchCell batchCell :batchCells){
            pallet.setCellCode(noPalletUpInsert.getCellCode());
            PalletBatch palletBatch = new PalletBatch();

            PalletBatchCriteria criteria = new PalletBatchCriteria();
            criteria.setCellCode(noPalletUpInsert.getCellCode());
            criteria.setBatchId(batchCell.getBatchId());
            List<PalletBatchDto> palletBatchDtos = palletBatchService.findList(criteria);
            if(palletBatchDtos.size()==0){
                palletBatch.setQuantity(batchCell.getQuantity());
                palletBatch.setBatchId(batchCell.getBatchId());
                palletBatch.setPalletId(pallet.getPalletId());
                palletBatchService.save(palletBatch);
            }else {
                palletBatch = palletBatchDtos.get(0);
                palletBatch.setQuantity(palletBatch.getQuantity()+batchCell.getQuantity());
                palletBatchService.update(palletBatch);
            }

        }


        //设置货位状态
        palletBatchService.setCellState(cellCode);

        return ResultGenerator.genSuccessResult();
    }

    @DeleteMapping("/{id}")
    public Result delete(@PathVariable Integer id) {
        palletBatchService.deleteById(id);
        return ResultGenerator.genSuccessResult();
    }

    @PutMapping
    public Result update(@RequestBody PalletBatch palletBatch) {
        palletBatchService.update(palletBatch);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/{id}")
    public Result detail(@PathVariable Integer id) {
        PalletBatch palletBatch = palletBatchService.findById(id);
        return ResultGenerator.genSuccessResult(palletBatch);
    }


    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @ApiOperation(value="list",notes="list")
    @GetMapping("/list")
    public Result list(PalletBatchCriteria criteria) {
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<PalletBatchDto> list = palletBatchService.findList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }



    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @ApiOperation(value="自动配货",notes="prepareType 1：先进先出 2：清理货位")
    @GetMapping("/prepare")
    public Result prepare(PrepareInsert prepareInsert) {
        List<PalletBatchDto> palletBatchDtos = new ArrayList<PalletBatchDto>();
        PrepareData prepareData = new PrepareData();
        prepareData.setQing( new ArrayList<PalletBatchDto>()) ;
        prepareData.setXian( new ArrayList<PalletBatchDto>()) ;
        prepareData.setLu( new ArrayList<PalletBatchDto>()); ;
        PageHelper.startPage(1, 99999);
        PalletBatchCriteria criteria = new PalletBatchCriteria();
        BillMaster billMaster = billMasterService.findBy("billNo",prepareInsert.getBillNo());
        String wareCode = billMaster.getWareCode();
        Integer itemMasterId = billMaster.getItemMasterId();
        criteria.setWareCode(wareCode);
        criteria.setItemMasterId(itemMasterId);


        //获取单据
        BillDetailCriteria billDetailCriteria = new BillDetailCriteria();
        billDetailCriteria.setBillNo(prepareInsert.getBillNo());
        List<BillDetailDto> billDetails = billDetailService.findList(billDetailCriteria);

        for(BillDetail billDetail :billDetails){
            criteria.setItemCode(billDetail.getItemCode());
            //如果出库单指定某个货区   则只配货这个货区
            if(billDetail.getAreaCode() !=null && billDetail.getAreaCode()!= ""){
                criteria.setAreaCode(billDetail.getAreaCode());
            }

            Integer sum = 0;
            Integer quantity =billDetail.getQuantity();
            criteria.setPrepareType(1);
            palletBatchService.getPrepare(prepareData.getQing(),criteria,quantity);
            criteria.setPrepareType(2);
            palletBatchService.getPrepare(prepareData.getXian(),criteria,quantity);



        }

        return ResultGenerator.genSuccessResult(prepareData);
    }



    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)

            , @ApiImplicitParam(name = "wareCode", value = "仓库编码", paramType="query", dataType="String", required = true)
            , @ApiImplicitParam(name = "itemCode", value = "物料编码", paramType="query", dataType="String", required = true)
            , @ApiImplicitParam(name = "batchId", value = "批次", paramType="query", dataType="int")
            , @ApiImplicitParam(name = "itemMasterId", value = "货主id", paramType="query", dataType="int", required = true)
    })
    @ApiOperation(value="通过物料或者批次 找货区",notes="通过物料或者批次 找货区")
    @GetMapping("/areaItem")
    public Result areaItem(String wareCode,String itemCode,Integer itemMasterId ) {
        PalletBatchCriteria criteria = new PalletBatchCriteria();
        criteria.setItemCode(itemCode);
        criteria.setWareCode(wareCode);
        criteria.setItemMasterId(itemMasterId);
        List<PalletBatchDto> list = palletBatchService.findAreaItem(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }


    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
            , @ApiImplicitParam(name = "wareCode", value = "仓库编码", paramType="query", dataType="String", required = true)
            , @ApiImplicitParam(name = "itemCode", value = "物料编码", paramType="query", dataType="String", required = true)
            , @ApiImplicitParam(name = "itemMasterId", value = "货主id", paramType="query", dataType="int", required = true)
    })
    @ApiOperation(value="获取物料信息",notes="通过物料编码查询 当前仓库中当前货主所拥有的该物料(含批次信息)")
    @GetMapping("/item")
    public Result wareItem(String wareCode,String itemCode,Integer itemMasterId ) {

        PalletBatchCriteria criteria = new PalletBatchCriteria();
        criteria.setWareCode(wareCode);
        criteria.setItemCode(itemCode);
        criteria.setItemMasterId(itemMasterId);

        List<PalletBatchDto> list = palletBatchService.findByItemCode(criteria);


        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
            , @ApiImplicitParam(name = "cellCode", value = "货位编码", paramType="query", dataType="String", required = true)

    })
    @ApiOperation(value="通过货位查找货位的物料信息",notes="通过物料编码查询 当前仓库中当前货主所拥有的该物料(含批次信息)")
    @GetMapping("/getCellInfo")
    public Result getCellInfo(String cellCode ) {

        PalletBatchCriteria criteria = new PalletBatchCriteria();
        criteria.setCellCode(cellCode);

        List<PalletBatchDto> list = palletBatchService.findList(criteria);


        List<Integer> palletIds = new ArrayList<Integer>();
        for(PalletBatchDto palletBatchDto:list){
            Integer palletId= palletBatchDto.getPalletId();
            Integer flag = 0;
            for (int i = 0; i < palletIds.size(); i++) {
                if(palletIds.get(i)== palletId){
                    flag=1;
                }
            }
            if(flag==0){
                palletIds.add(palletId);
            }

        }



        List<palletBatchs> palletBatchsList = new ArrayList<palletBatchs>();
        palletBatchs palletBatchs = new palletBatchs();
        for(int i = 0;i<palletIds.size();i++){
            palletBatchs = new palletBatchs();
             List<PalletBatchDto> palletBatchList = new ArrayList<>();
            for(int j = 0;j<list.size();j++){
                if(list.get(j).getPalletId() == palletIds.get(i)){
                    palletBatchList.add(list.get(j));
                    palletBatchs.setPalletId(list.get(j).getPalletId());
                    palletBatchs.setPalletCode(list.get(j).getPalletCode());
                    palletBatchs.setPalletName(list.get(j).getPalletName());
                    palletBatchs.setPalletType(list.get(j).getPalletType());
                }
            }
            palletBatchs.setPalletBatchList(palletBatchList);
            palletBatchsList.add(palletBatchs);
        }





        PageInfo pageInfo = new PageInfo(palletBatchsList);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

}
