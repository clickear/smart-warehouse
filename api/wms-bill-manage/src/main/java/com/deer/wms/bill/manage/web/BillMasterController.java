package com.deer.wms.bill.manage.web;

import com.deer.wms.base.system.model.ItemBatch;
import com.deer.wms.base.system.service.ItemBatchService;
import com.deer.wms.bill.manage.model.*;
import com.deer.wms.bill.manage.service.BillDetailService;
import com.deer.wms.bill.manage.service.BillRecordService;
import com.deer.wms.bill.manage.service.ChuanYunService;
import com.deer.wms.intercept.annotation.User;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.project.seed.core.result.CommonCode;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.bill.manage.service.BillMasterService;
import com.deer.wms.project.seed.util.DateUtils;
import com.deer.wms.project.seed.util.RandomNo;
import com.deer.wms.report.model.Inventory;
import com.deer.wms.report.model.InventoryCriteria;
import com.deer.wms.report.model.InventoryDto;
import com.deer.wms.report.service.InventoryService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;
import java.util.concurrent.locks.Condition;

/**
* Created by guo on 2018/07/05.
*/
@RestController
@RequestMapping("/bill/masters")
public class BillMasterController {

    @Autowired
    private BillMasterService billMasterService;

    @Autowired
    private BillDetailService billDetailService;

    @Autowired
    private ItemBatchService itemBatchService;

    @Autowired
    private InventoryService inventoryService;

    @Autowired
    private BillRecordService billRecordService;
    @Autowired
    private ChuanYunService chuanYunService;

    @ApiOperation(value = "新增billMaster以及billDetail列表", notes = "新增billMaster以及billDetail列表")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
           })
    @PostMapping("/insert")
    public Result add(@RequestBody InsertData insertData, @ApiIgnore @User CurrentUser currentUser) {
        Integer companyId = null;
        if(currentUser == null ){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }else {
            companyId = currentUser.getCompanyId();
        }
        BillMaster billMaster = insertData.getBillMaster();
        System.out.println(billMaster.getWareCode());
        String  chuanyun=billMaster.getChaunyunid();
        billMaster.setCompanyId(companyId);
        Integer type = insertData.getBillMaster().getType();
        String billNo =null;
        if(type ==1){
              billNo = "RK"+"-"+companyId +"-"+RandomNo.createNo();
        }else if(type ==2){
              billNo = "CK"+"-"+companyId +"-"+RandomNo.createNo();
        }else if(type ==3){
              billNo = "DB"+"-"+companyId +"-"+RandomNo.createNo();
        }else if(type ==4){  //报损
            billNo = "BS"+"-"+companyId +"-"+RandomNo.createNo();
        }
        billMaster.setBillNo(billNo);
        String  nowDate = DateUtils.getNowDateTimeString();
        billMaster.setAddTime(nowDate);
        billMaster.setAddUserId(currentUser.getUserId());
        billMaster.setState(1);
        billMasterService.save(billMaster);
//        billMaster.setChaunyunid();
        /**
        * 新增billDetail列表  12!@qwQW
        * */
        List<BillDetail> billDetails = insertData.getBillDetails();
        int i= 1;
        for(BillDetail billDetail : billDetails){
            String detailNo = billNo + "-" +i;
            billDetail.setDetailNo(detailNo);
            billDetail.setAddTime(nowDate);
            billDetail.setBillType(billMaster.getType());
            billDetail.setBillNo(billMaster.getBillNo());
            billDetail.setCompanyId(billMaster.getCompanyId());
            billDetailService.save(billDetail);

            if(billMaster.getType() ==1){      //如果是入库  需要新增批次
                ItemBatch itemBatch = new ItemBatch();
                String batch = billDetail.getBatch();
                Integer batchId = billDetail.getBatchId();
                if( batchId != null ){
                    ItemBatch itemBatch1 = itemBatchService.findBy("batchId",batchId);
                    if(batch.equals(itemBatch1.getBatch()) == true){
                    }else {
                        String itemBatchBarCode = "IB-"+ RandomNo.createNo();
                        itemBatch.setItemBatchBarCode(itemBatchBarCode);
                        itemBatch.setBatch(batch);
                        itemBatch.setCreateTime(nowDate);
                        itemBatch.setDetailNo(detailNo);
                        itemBatch.setWareCode(billMaster.getWareCode());
                        itemBatch.setItemMasterId(billMaster.getItemMasterId());
                        itemBatch.setItemCode(billDetail.getItemCode());
                        itemBatchService.save(itemBatch);
                    }
                }else {
                    String itemBatchBarCode = "IB-"+ RandomNo.createNo();
                    itemBatch.setItemBatchBarCode(itemBatchBarCode);
                    itemBatch.setBatch(batch);
                    itemBatch.setCreateTime(nowDate);
                    itemBatch.setDetailNo(detailNo);
                    itemBatch.setWareCode(billMaster.getWareCode());
                    itemBatch.setItemMasterId(billMaster.getItemMasterId());
                    itemBatch.setItemCode(billDetail.getItemCode());
                    itemBatchService.save(itemBatch);
                }
            }
            i++;
        }
        //遍历出库详情  如果有需要返库的 自动生成入库单
//        if(billMaster.getType() ==2){   //出库
//            Integer index = 0;
//            List<BillDetail> billDetails1 = insertData.getBillDetails();
//            for(BillDetail billDetail : billDetails){
//                if(billDetail.getNeedReturn() ==1){     //需要返库
//                    billDetails1.add(billDetail);
//                    index +=1;
//                }
//            }
//            if(index>0){
//                if(billDetails1.size() >0){    //有需要返库的
//                    BillMaster newBillMaster = new BillMaster();
//                    newBillMaster.setType(1);   //入库
//                    newBillMaster.setInType(2);    //入库类型-返库
//                    newBillMaster.setAddUserId(currentUser.getUserId());
//                    newBillMaster.setAddTime(nowDate);
//                    newBillMaster.setCompanyId(currentUser.getCompanyId());
//                    newBillMaster.setWareCode(billMaster.getWareCode());
//                    newBillMaster.setItemMasterId(billMaster.getItemMasterId());
//                    newBillMaster.setState(1);  //初始化
//                    String newBillNo = "RK"+"-"+companyId +"-"+RandomNo.createNo();
//                    newBillMaster.setBillNo(newBillNo);
//                    newBillMaster.setContractNo(billMaster.getBillNo());
//                    billMasterService.save(newBillMaster);
//
//                    Integer j = 0;
//                    for(BillDetail billDetail : billDetails1){
//                        billDetail.setId(null);
//                        billDetail.setBillNo(newBillNo);
//                        String newDetailNo = newBillNo + "-" +j;
//                        billDetail.setDetailNo(newDetailNo);
//                        billDetail.setBillType(1);
//                        billDetail.setBatch(DateUtils.getNowDateString()+"--返库");
//                        billDetailService.save(billDetail);
//                        ItemBatch itemBatch = new ItemBatch();
//                        String itemBatchBarCode = "IB-"+ RandomNo.createNo();
//                        itemBatch.setItemBatchBarCode(itemBatchBarCode);
//                        itemBatch.setBatch(DateUtils.getNowDateString()+"--返库");
//                        itemBatch.setCreateTime(nowDate);
//                        itemBatch.setDetailNo(newDetailNo);
//                        itemBatch.setWareCode(billMaster.getWareCode());
//                        itemBatch.setItemMasterId(billMaster.getItemMasterId());
//                        itemBatch.setItemCode(billDetail.getItemCode());
//                        itemBatch.setDetailOut(billDetail.getDetailNo());
//                        itemBatchService.save(itemBatch);
//                        j+=1;
//                    }
//                }
//            }
//        }
        return ResultGenerator.genSuccessResult();
    }






    @ApiOperation(value = "根据id删除", notes = "根据id删除")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/delete")
    public Result delete( Integer id, @ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null ){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        Integer companyId =null;
        if(currentUser.getCompanyType()!=-1){
            companyId = currentUser.getCompanyId();
            BillMaster billMaster = billMasterService.findById(id.toString());
            if(billMaster.getCompanyId() == companyId){
                billMasterService.deleteById(id.toString());
            }else {
                return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"非本公司单据！",null);
            }
        }
        billMasterService.deleteById(id.toString());
        return ResultGenerator.genSuccessResult();
    }

    @ApiOperation(value = "更新", notes = "更新")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @PostMapping("/update")
    public Result update(@RequestBody BillMaster billMaster) {
        billMasterService.update(billMaster);
        return ResultGenerator.genSuccessResult();
    }

    @ApiOperation(value = "复核", notes = "复核")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/reCheck")
    public Result reCheck( String billNo) {
        BillMaster billMaster = billMasterService.findBy("billNo",billNo);
        billMaster.setState(5);    //5-已复核
        billMasterService.update(billMaster);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/{id}")
    public Result detail(@PathVariable String id) {
        BillMaster billMaster = billMasterService.findById(id);
        return ResultGenerator.genSuccessResult(billMaster);
    }

    @GetMapping("/check")
    public Result check( String billNo) {
        BillMaster billMaster = billMasterService.findBy("billNo",billNo);
        billMaster.setState(2);
        if(billMaster.getType()==3){
            billMasterService.allotCreateInAndOut(billMaster);
        }else {
            billMasterService.update(billMaster);
        }


        return ResultGenerator.genSuccessResult();
    }

    @ApiOperation(value = "页面List", notes = "页面List")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/list")
    public Result list(BillMasterCriteria criteria,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType() != -1){
           criteria.setCompanyId(currentUser.getCompanyId());
        }
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<BillMasterDto> list = billMasterService.findList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

    @ApiOperation(value = "验收", notes = "验收")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @PostMapping("/accept")
    public Result accept(@RequestBody InsertData insertData,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        Integer companyId = null;
        if(currentUser.getCompanyType() != -1){
            companyId = currentUser.getCompanyId();
        }

        String  nowDate = DateUtils.getNowDateTimeString();


        List<BillDetail> billDetails = insertData.getBillDetails();
        String wareCode = insertData.getBillMaster().getWareCode();
        boolean  bool=true;
        for(BillDetail billDetail : billDetails){
            Integer   quantity=billDetail.getQuantity();
            Integer  acceptQuantity=billDetail.getAcceptQuantity();
            if (acceptQuantity==null){
                billDetail.setAcceptQuantity(0);
            }
            if (quantity!=acceptQuantity){
                bool=false;
            }
            Integer  batchId = billDetail.getBatchId();
            Integer  billtype=billDetail.getBillType();
            if(batchId ==null){
                if (billtype==1){
                    batchId = itemBatchService.findBy("detailNo",billDetail.getDetailNo()).getBatchId();
                }else  if (billtype==2){
                    batchId=billDetail.getBatchId();
                }
            }
            InventoryCriteria criteria = new InventoryCriteria();
            criteria.setWareCode(wareCode);
            criteria.setBatchId(batchId);

            List<InventoryDto> inventorys= inventoryService.findBatchList(criteria);
            if(inventorys.size() ==0){
                Inventory inventory= new Inventory();
                inventory.setQuantity(billDetail.getAcceptQuantity());
                inventory.setBatchId(batchId);
                inventory.setWareCode(wareCode);
                inventoryService.save(inventory);
            }else {
                Inventory inventory= inventorys.get(0);
                inventory.setQuantity(billDetail.getAcceptQuantity()+inventory.getQuantity());
                inventoryService.update(inventory);
            }

             if (bool){
                 billDetail.setState(2);
             }
             billDetailService.update(billDetail);
        }
        try {
            //如果是全部验收  则修改billMaster状态
            BillMaster billMaster = billMasterService.findBy("billNo",insertData.getBillMaster().getBillNo());
            String  chaunyunid=billMaster.getChaunyunid();
            Integer type=billMaster.getType();
            if (bool){
              if(chaunyunid!=null&&chaunyunid!=""){
                  if (type==1){
                      String  json=chuanYunService.updateBizObject("sf3g327087wkcxxo45d9zqu77","{F0000021:'已入库'}",chaunyunid);
                  }else if (type==2){
                      String   mold=billMaster.getMold();
                      String  json="";
                      if (mold!=null&&mold!=""){
                          if (mold.equals("短租")){
                                json=chuanYunService.updateBizObject("bff0c6ozpa26by0rqj16eh7i1","{F0000159:'已出库'}",chaunyunid);
                          }else if (mold.equals("长租")){
                                json=chuanYunService.updateBizObject("l7ykmmqdtjh6jz7kkj479upd3","{F0000174:'已出库'}",chaunyunid);
                          }else if (mold.equals("销售")){
                                json=chuanYunService.updateBizObject("mbysd9tui72cgtnrer2fgoz96","{F0000135:'F0000135'}",chaunyunid);
                          }
                      }
                      System.out.println(json);
                  }
               }
                 billMaster.setState(2);
            }
            billMaster.setAcceptUserId(currentUser.getUserId());
            billMaster.setAcceptTime(nowDate);
            billMasterService.update(billMaster);
            return ResultGenerator.genSuccessResult();
        }catch (Exception e){
            return null;
        }
    }

    @ApiOperation(value = "无单收货", notes = "收货之前没有建预约入库单")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @PostMapping("/no_bill_accept")
    public Result no_bill_accept(@RequestBody InsertData insertData,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        Integer companyId = null;
        if(currentUser.getCompanyType() != -1){
            companyId = currentUser.getCompanyId();
        }

        //无单入库     先建一个入库单  以便后边统计
        BillMaster billMaster = insertData.getBillMaster();
        companyId = currentUser.getCompanyId();
        billMaster.setCompanyId(companyId);
        String billNo = "RK"+"-"+companyId +"-"+RandomNo.createNo();
        billMaster.setBillNo(billNo);
        billMaster.setMemo("无单入库");
        billMaster.setState(insertData.getBillMaster().getState());
        billMasterService.save(billMaster);


        //即使无单收货    也要建立单据
        List<BillDetail> billDetails = insertData.getBillDetails();
        String wareCode = insertData.getBillMaster().getWareCode();
        for(BillDetail billDetail : billDetails){
            billDetail.setBillNo(billNo);
            billDetailService.save(billDetail);

        }






        return ResultGenerator.genSuccessResult();
    }

    @ApiOperation(value = "首页统计", notes = "首页统计")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/tongji")
    public Result tongji( BillMasterCriteria criteria,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        Integer companyId = null;
        if(currentUser.getCompanyType() != -1){
            companyId = currentUser.getCompanyId();
        }

        criteria.setCompanyId(companyId);
        criteria.setPageNum(null);
        criteria.setPageSize(null );

        TongJi tongJi = billMasterService.tongji(criteria);



        return ResultGenerator.genSuccessResult(tongJi);
    }

    @ApiOperation(value = "首页统计物料", notes = "首页统计物料")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/tongjiItems")
    public Result tongjiItems( String itemCode,Integer Type ,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        Integer companyId = null;
        if(currentUser.getCompanyType() != -1){
            companyId = currentUser.getCompanyId();
        }




        return ResultGenerator.genSuccessResult( );
    }






}
