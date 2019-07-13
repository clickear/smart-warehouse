package com.deer.wms.system.manage.runner;

import com.deer.wms.base.system.model.*;
import com.deer.wms.base.system.service.ItemInfoService;
import com.deer.wms.base.system.service.ItemMasterService;
import com.deer.wms.base.system.service.WareInfoService;
import com.deer.wms.bill.manage.model.BillDetail;
import com.deer.wms.bill.manage.model.BillDetailCriteria;
import com.deer.wms.bill.manage.model.BillDetailDto;
import com.deer.wms.bill.manage.service.BillDetailService;
import com.deer.wms.file.service.impl.FileServiceImpl;
import com.deer.wms.project.seed.util.DateUtils;
import com.deer.wms.report.model.InventoryCriteria;
import com.deer.wms.report.model.InventoryDto;
import com.deer.wms.report.service.InventoryService;
import com.deer.wms.system.manage.model.InventoryReport;
import com.deer.wms.system.manage.model.InventoryReportCriteria;
import com.deer.wms.system.manage.model.InventoryReportDto;
import com.deer.wms.system.manage.service.InventoryReportService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Slf4j
@Component
public class ScheduledService {

    private static Logger logger = LoggerFactory.getLogger(FileServiceImpl.class);

    @Autowired
    private ItemInfoService itemInfoService;

    @Autowired
    private InventoryReportService inventoryReportService;

    @Autowired
    private BillDetailService billDetailService;

    @Autowired
    private InventoryService inventoryService;

    @Autowired
    private WareInfoService wareInfoService;

    @Autowired
    private ItemMasterService itemMasterService;


    /*
    * 每天半夜2点 统计前一天每一种物料的库存
    * */
    @Async     //开启多线程
    @Scheduled(cron = "0 0 1 * * ?")   //每天半夜两点执行
    public void dayReport(){

                Date date = new Date();
               InventoryCriteria inventoryCriteria2 = new InventoryCriteria();

               List<InventoryDto> inventoryDtos2 = inventoryService.findList(inventoryCriteria2);
               for(InventoryDto inventoryDto :inventoryDtos2){
                   Integer inventory = inventoryDto.getQuantity();
                   //先获取前天的数据
                   InventoryReportCriteria inventoryReportCriteria = new InventoryReportCriteria();
                   inventoryReportCriteria.setWareCode(inventoryDto.getWareCode());
                   inventoryReportCriteria.setItemCode(inventoryDto.getItemCode());
                   inventoryReportCriteria.setItemMasterId(inventoryDto.getItemMasterId());
                   InventoryReport oldInventoryReport=inventoryReportService.findQianTian(inventoryReportCriteria);
                   Integer startInventory;
                   if(oldInventoryReport ==null){
                       startInventory = 0;
                   }else {
                       startInventory = oldInventoryReport.getInventory();
                   }
                   //从billDetail中获取昨天的数据
                   BillDetailCriteria billDetailCriteria = new BillDetailCriteria();
                   billDetailCriteria.setWareCode(inventoryDto.getWareCode());
                   billDetailCriteria.setItemMasterId(inventoryDto.getItemMasterId());
                   billDetailCriteria.setItemCode(inventoryDto.getItemCode());
                   List<BillDetailDto> billDetailDtos = billDetailService.findYesterday(billDetailCriteria);
                   Integer inInventory=0;
                   Integer outInventory=0;
                   if(billDetailDtos.size() ==0){
                       inInventory =0;
                       outInventory=0;
                   }else {
                       for(BillDetailDto billDetailDto :billDetailDtos){
                           if(billDetailDto.getBillType() ==1){
                               inInventory += billDetailDto.getAcceptQuantity();
                           }else if(billDetailDto.getBillType() ==2){
                               outInventory +=billDetailDto.getAcceptQuantity();
                           }
                       }
                   }
                   Integer lossInventory = inventory - (startInventory + inInventory - outInventory);
                   InventoryReport inventoryReport = new InventoryReport();
                   inventoryReport.setWareCode(inventoryDto.getWareCode());
                   inventoryReport.setItemCode(inventoryDto.getItemCode());
                   inventoryReport.setItemMasterId(inventoryDto.getItemMasterId());
                   inventoryReport.setStartInventory(startInventory);
                   inventoryReport.setInInventory(inInventory);
                   inventoryReport.setOutInventory(outInventory);
                   inventoryReport.setInventory(inventory);
                   inventoryReport.setLossInventory(lossInventory);
                   String yes = DateUtils.getYesterdayDateStr();
                   String startTime = yes + " 00:00:00";
                   String endTime = yes + " 23:59:59";
                   inventoryReport.setStartTime(startTime);
                   inventoryReport.setEndTime(endTime);
                   inventoryReport.setReportType(1);
                   inventoryReportService.save(inventoryReport);
                   logger.info("仓库："+inventoryDto.getWareName()+"--  货主："+inventoryDto.getItemMasterName()+"--  物料："+inventoryDto.getItemName()+"日收发统计完成", DateUtils.getNowDateTimeString());
               }
               String time =  DateUtils.getTimeDeltaToString(date);
                logger.info("日收发统计完成"+"-------用时："+time, DateUtils.getNowDateTimeString());


    }

    /*
     * 每月1号半夜4点 统计上月每一种物料的库存
     * */
    @Async     //开启多线程
    @Scheduled(cron = "0 0 4 * * ?")   //每天半夜两点执行
    public void MonthReport(){

        Date date = new Date();
        InventoryCriteria inventoryCriteria2 = new InventoryCriteria();
        List<InventoryDto> inventoryDtos2 = inventoryService.findList(inventoryCriteria2);
        for(InventoryDto inventoryDto :inventoryDtos2){
            Integer inventory = inventoryDto.getQuantity();
            //先获取上上月的数据
            InventoryReportCriteria inventoryReportCriteria = new InventoryReportCriteria();
            inventoryReportCriteria.setWareCode(inventoryDto.getWareCode());
            inventoryReportCriteria.setItemCode(inventoryDto.getItemCode());
            inventoryReportCriteria.setItemMasterId(inventoryDto.getItemMasterId());
            InventoryReport oldInventoryReport=inventoryReportService.findShangShangYue(inventoryReportCriteria);
            Integer startInventory;
            if(oldInventoryReport ==null){
                startInventory = 0;
            }else {
                startInventory = oldInventoryReport.getInventory();
            }
            //从billDetail中获取上月的数据
            BillDetailCriteria billDetailCriteria = new BillDetailCriteria();
            billDetailCriteria.setWareCode(inventoryDto.getWareCode());
            billDetailCriteria.setItemMasterId(inventoryDto.getItemMasterId());
            billDetailCriteria.setItemCode(inventoryDto.getItemCode());
            List<BillDetailDto> billDetailDtos = billDetailService.findShangYue(billDetailCriteria);
            Integer inInventory=0;
            Integer outInventory=0;
            if(billDetailDtos.size() ==0){
                inInventory =0;
                outInventory=0;
            }else {
                for(BillDetailDto billDetailDto :billDetailDtos){
                    if(billDetailDto.getBillType() ==1){
                        inInventory += billDetailDto.getAcceptQuantity();
                    }else if(billDetailDto.getBillType() ==2){
                        outInventory +=billDetailDto.getAcceptQuantity();
                    }
                }
            }
            Integer lossInventory = inventory - (startInventory + inInventory - outInventory);
            InventoryReport inventoryReport = new InventoryReport();
            inventoryReport.setWareCode(inventoryDto.getWareCode());
            inventoryReport.setItemCode(inventoryDto.getItemCode());
            inventoryReport.setItemMasterId(inventoryDto.getItemMasterId());
            inventoryReport.setStartInventory(startInventory);
            inventoryReport.setInInventory(inInventory);
            inventoryReport.setOutInventory(outInventory);
            inventoryReport.setInventory(inventory);
            inventoryReport.setLossInventory(lossInventory);
            String yes = DateUtils.getYesterdayDateStr();
            String startTime = yes.substring(0,8) + "01 00:00:00";          //上月第一天
            String endTime = yes + " 23:59:59";
            inventoryReport.setStartTime(startTime);
            inventoryReport.setEndTime(endTime);
            inventoryReport.setReportType(2);
            inventoryReportService.save(inventoryReport);
            logger.info("仓库："+inventoryDto.getWareName()+"--  货主："+inventoryDto.getItemMasterName()+"--  物料："+inventoryDto.getItemName()+"月收发统计完成", DateUtils.getNowDateTimeString());
        }
        String time =  DateUtils.getTimeDeltaToString(date);
        logger.info("月收发统计完成"+"-------用时："+time, DateUtils.getNowDateTimeString());


    }


    /*
     * 每天半夜2点 统计前一天每一种物料的库存
     * */
    /*@Async     //开启多线程
    @Scheduled(cron = "0 36 10 * * ?")   //每月1号半夜两点整
    public void MonthReport(){


        List<ItemInfo> itemInfos = itemInfoService.findAll();
        for(ItemInfo itemInfo : itemInfos){


            InventoryReport newInventory = new InventoryReport();
            newInventory.setItemCode(itemInfo.getItemCode());
            newInventory.setInInventory(0);
            newInventory.setOutInventory(0);



            Integer companyId = itemInfo.getCompanyId();
            WareInfoCriteria wareInfoCriteria = new WareInfoCriteria();
            wareInfoCriteria.setCompanyId(companyId);
            List<WareInfoDto> wareInfos = wareInfoService.findList(wareInfoCriteria);
            //遍历仓库
            for(WareInfo wareInfo :wareInfos){
                ItemMasterCriteria itemMasterCriteria = new ItemMasterCriteria();
                itemMasterCriteria.setCompanyId(companyId);
                List<ItemMasterDto> itemMasters = itemMasterService.findList(itemMasterCriteria);
                //遍历货主
                for(ItemMaster itemMaster :itemMasters){
                    InventoryCriteria inventoryCriteria = new InventoryCriteria();
                    inventoryCriteria.setWareCode(wareInfo.getWareCode());
                    inventoryCriteria.setItemMasterId(itemMaster.getItemMasterId());
                    inventoryCriteria.setItemCode(itemInfo.getItemCode());
                    List<InventoryDto> inventoryDtos = inventoryService.findList(inventoryCriteria);
                    Integer inventory = 0;
                    if(inventoryDtos.size()!=0){
                        InventoryDto inventoryDto = inventoryDtos.get(0);
                        inventory = inventoryDto.getQuantity();  //此种物料在当前仓库当前货主的库存
                    }




                    //先获取上月的数据
                    InventoryReportCriteria inventoryReportCriteria = new InventoryReportCriteria();
                    inventoryReportCriteria.setWareCode(wareInfo.getWareCode());
                    inventoryReportCriteria.setItemCode(itemInfo.getItemCode());
                    inventoryReportCriteria.setItemMasterId(itemMaster.getItemMasterId());
                    InventoryReport oldInventoryReport=inventoryReportService.findShangShangYue(inventoryReportCriteria);
                    Integer startInventory;
                    if(oldInventoryReport ==null){
                        startInventory = 0;
                    }else {
                        startInventory = oldInventoryReport.getInventory();
                    }



                    //从billDetail中获取上个月的数据
                    BillDetailCriteria billDetailCriteria = new BillDetailCriteria();
                    billDetailCriteria.setWareCode(wareInfo.getWareCode());
                    billDetailCriteria.setItemMasterId(itemMaster.getItemMasterId());
                    billDetailCriteria.setItemCode(itemInfo.getItemCode());
                    List<BillDetailDto> billDetailDtos = billDetailService.findShangYue(billDetailCriteria);
                    Integer inInventory=0;
                    Integer outInventory=0;
                    if(billDetailDtos.size() ==0){
                        inInventory =0;
                        outInventory=0;
                    }else {
                        for(BillDetailDto billDetailDto :billDetailDtos){
                            if(billDetailDto.getBillType() ==1){
                                inInventory += billDetailDto.getAcceptQuantity();
                            }else if(billDetailDto.getBillType() ==2){
                                outInventory +=billDetailDto.getAcceptQuantity();
                            }
                        }



                    }

                    Integer lossInventory = inventory - (startInventory + inInventory - outInventory);
                    InventoryReport inventoryReport = new InventoryReport();
                    inventoryReport.setWareCode(wareInfo.getWareCode());
                    inventoryReport.setItemCode(itemInfo.getItemCode());
                    inventoryReport.setItemMasterId(itemMaster.getItemMasterId());
                    inventoryReport.setStartInventory(startInventory);
                    inventoryReport.setInInventory(inInventory);
                    inventoryReport.setOutInventory(outInventory);
                    inventoryReport.setInventory(inventory);
                    inventoryReport.setLossInventory(lossInventory);

                    String yes = DateUtils.getYesterdayDateStr();

                    String startTime = yes.substring(0,8) + "01 00:00:00";          //上月第一天
                    String endTime = yes + " 23:59:59";                             //上月最后一天
                    inventoryReport.setStartTime(startTime);
                    inventoryReport.setEndTime(endTime);
                    inventoryReport.setReportType(2);


                    inventoryReportService.save(inventoryReport);



                    logger.info("仓库："+wareInfo.getWareName()+"--  货主："+itemMaster.getItemMasterName()+"--  物料："+itemInfo.getItemName()+"月收发统计完成", DateUtils.getNowDateTimeString());
                }
                logger.info("仓库："+wareInfo.getWareName()+"--  物料："+itemInfo.getItemName()+" 月收发统计完成", DateUtils.getNowDateTimeString());






            }
            logger.info("物料："+itemInfo.getItemName()+" 月收发统计完成", DateUtils.getNowDateTimeString());



        }








        logger.info("月收发统计完成", DateUtils.getNowDateTimeString());

    }*/
   /* @Scheduled(fixedRate = 5000)
    public void scheduled1() {
        System.out.println("=====>>>>>使用fixedRate{}"+ DateUtils.getNowDateTimeString());
    }
    @Scheduled(fixedDelay = 5000)
    public void scheduled2() {
        System.out.println("=====>>>>>fixedDelay{}"+ DateUtils.getNowDateTimeString());
    }*/


}
