package com.deer.wms.ware.task.web;

import com.deer.wms.base.system.model.Pallet;
import com.deer.wms.base.system.service.PalletService;
import com.deer.wms.bill.manage.model.*;
import com.deer.wms.bill.manage.service.BillDetailService;
import com.deer.wms.bill.manage.service.BillMasterService;
import com.deer.wms.intercept.annotation.User;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.project.seed.core.result.CommonCode;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.project.seed.util.DateUtils;
import com.deer.wms.report.model.Inventory;
import com.deer.wms.report.service.InventoryService;
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
* Created by guo on 2018/08/14.
*/
@RestController
@RequestMapping("/prepare/tasks")
public class PrepareTaskController {

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

    @Autowired
    private InventoryService inventoryService;

    @PostMapping
    public Result add(@RequestBody PrepareTask prepareTask) {
        prepareTaskService.save(prepareTask);
        return ResultGenerator.genSuccessResult();
    }

    @DeleteMapping("/{id}")
    public Result delete(@PathVariable Integer id) {
        prepareTaskService.deleteById(id);
        return ResultGenerator.genSuccessResult();
    }

    @PutMapping
    public Result update(@RequestBody PrepareTask prepareTask) {
        prepareTaskService.update(prepareTask);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/{id}")
    public Result detail(@PathVariable Integer id) {
        PrepareTask prepareTask = prepareTaskService.findById(id);
        return ResultGenerator.genSuccessResult(prepareTask);
    }

    @GetMapping("/list")
    public Result list(PrepareTaskCriteria criteria) {
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<PrepareTaskDto> list = prepareTaskService.findList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }


    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @ApiOperation(value="执行分拣",notes=" ")
    @GetMapping("/okTask")
    public Result list(Integer id, @ApiIgnore @User CurrentUser currentUser) {
        PrepareTask prepareTask =prepareTaskService.findById(id);
        Integer quantity = prepareTask.getQuantity();
        Integer palletBatchId = prepareTask.getPalletBatchId();
        PalletBatch palletBatch= palletBatchService.findById(palletBatchId);
        palletBatch.setQuantity(palletBatch.getQuantity()-quantity);
        palletBatchService.update(palletBatch);
        prepareTask.setState(1);
        prepareTaskService.update(prepareTask);

        String billNo = prepareTask.getBillNo();
        PrepareTaskCriteria criteria = new PrepareTaskCriteria();
        criteria.setBillNo(billNo);
        criteria.setState(0);
        List<PrepareTaskDto>  list = prepareTaskService.findList(criteria);
        if(list.size() ==0){
            BillMaster billMaster = billMasterService.findBy("billNo",billNo);
            billMaster.setState(4);   //3-

            billMasterService.update(billMaster);
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
    @ApiOperation(value="获得分拣批次列表",notes=" ")
    @GetMapping("/batchList")
    public Result batchList(PrepareTaskCriteria criteria) {

        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<PrepareTask> list = prepareTaskService.findBatchs(criteria);




        return ResultGenerator.genSuccessResult(list);
    }


    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @ApiOperation(value="自动配货",notes=" ")
    @GetMapping("/prepareTask")
    public Result prepareTask( PrepareInsert prepareInsert, @ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null ){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }

        List<PalletBatchDto> palletBatchDtos = new ArrayList<PalletBatchDto>();

        PageHelper.startPage(1, 99999);
        PalletBatchCriteria criteria = new PalletBatchCriteria();
        BillMaster billMaster = billMasterService.findBy("billNo",prepareInsert.getBillNo());
        billMaster.setState(3);
        billMasterService.update(billMaster);
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
            if(prepareInsert.getPrepareType()==1){
                criteria.setPrepareType(1);

            }else if(prepareInsert.getPrepareType()==2){
                criteria.setPrepareType(2);
            }
            palletBatchService.getPrepare(palletBatchDtos,criteria,quantity);

        }
        String  nowDate = DateUtils.getNowDateTimeString();
        for(PalletBatchDto palletBatchDto:palletBatchDtos){

            PrepareTask prepareTask = new PrepareTask();
            prepareTask.setBillNo(prepareInsert.getBillNo());
            prepareTask.setPalletBatchId(palletBatchDto.getPalletBatchId());
            prepareTask.setQuantity(palletBatchDto.getQuantity());
            prepareTask.setCreateTime(nowDate);
            prepareTask.setCreateUserId(currentUser.getUserId());
            prepareTask.setTaskBatch(prepareInsert.getTaskBatch());

            prepareTaskService.save(prepareTask);

        }



        return ResultGenerator.genSuccessResult();
    }



    @ApiOperation(value = "出库完成", notes = "出库完成")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/complete")
    public Result complete( String billNo,@ApiIgnore @User CurrentUser currentUser) {

        BillMasterCriteria billMasterCriteria = new BillMasterCriteria();
        billMasterCriteria.setBillNo(billNo);

        BillMaster billMaster =billMasterService.findBy("billNo",billNo);
        if(billMaster.getType() ==2){  //出库
            BillDetailCriteria billDetailCriteria = new BillDetailCriteria();
            billDetailCriteria.setBillNo(billNo);
            List<BillDetailDto> billDetailDtos = billDetailService.findList(billDetailCriteria);



            PrepareTaskCriteria prepareTaskCriteria = new PrepareTaskCriteria();
            prepareTaskCriteria.setBillNo(billNo);
            List<PrepareTaskDto> prepareTaskDtos = prepareTaskService.findList(prepareTaskCriteria);

            for(BillDetailDto billDetailDto:billDetailDtos){
                for(PrepareTaskDto prepareTaskDto:prepareTaskDtos){
                    if(prepareTaskDto.getItemCode() ==billDetailDto.getItemCode()){
                        billDetailDto.setAcceptQuantity(billDetailDto.getAcceptQuantity()+prepareTaskDto.getQuantity());
                    }
                    Inventory inventory =inventoryService.findBy("batchId",prepareTaskDto.getBatchId());
                    inventory.setQuantity(inventory.getQuantity()-prepareTaskDto.getQuantity());
                    inventoryService.update(inventory);
                }
                billDetailService.update(billDetailDto);
            }

        }
        return ResultGenerator.genSuccessResult( );
    }

}
