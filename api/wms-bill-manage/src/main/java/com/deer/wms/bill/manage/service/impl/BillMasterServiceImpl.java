package com.deer.wms.bill.manage.service.impl;

import com.deer.wms.base.system.model.ItemBatch;
import com.deer.wms.base.system.service.ItemBatchService;
import com.deer.wms.bill.manage.dao.BillDetailMapper;
import com.deer.wms.bill.manage.dao.BillMasterMapper;
import com.deer.wms.bill.manage.model.*;
import com.deer.wms.bill.manage.service.BillDetailService;
import com.deer.wms.bill.manage.service.BillMasterService;

import com.deer.wms.project.seed.core.service.AbstractService;
import com.deer.wms.project.seed.util.DateUtils;
import com.deer.wms.project.seed.util.RandomNo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by guo on 2018/07/05.
 */
@Service
@Transactional
public class BillMasterServiceImpl extends AbstractService<BillMaster, String> implements BillMasterService {

    @Autowired
    private BillMasterMapper billMasterMapper;

    @Autowired
    private BillDetailMapper billDetailMapper;

    @Autowired
    private BillDetailService billDetailService;

    @Autowired
    private ItemBatchService itemBatchService;

    @Override
    public List<BillMasterDto> findList(BillMasterCriteria criteria) {
        return billMasterMapper.findList(criteria);
    }

    @Override
    public TongJi tongji(BillMasterCriteria criteria) {
        return billMasterMapper.tongji(criteria);
    }

    @Override
    public void allotCreateInAndOut(BillMaster billMaster) {

        update(billMaster);
         Integer companyId = billMaster.getCompanyId();

         BillMaster inBillMaster = new BillMaster();
        String inBillNo = "RK"+"-"+companyId +"-"+ RandomNo.createNo();
        inBillMaster.setBillNo(inBillNo);
        inBillMaster.setState(1);
        inBillMaster.setType(1);
        inBillMaster.setContractNo(billMaster.getBillNo());
        inBillMaster.setCompanyId(billMaster.getCompanyId());
        inBillMaster.setInType(3);   //调拨入库
        String nowDate = DateUtils.getNowDateTimeString();
        inBillMaster.setAddTime(nowDate);
        inBillMaster.setAddUserId(billMaster.getAddUserId());
        inBillMaster.setItemMasterId(billMaster.getItemMasterId());
        inBillMaster.setId(null);
        String inWareCode = null;



        BillMaster outBillMaster = new BillMaster();
        String outBillNo = "CK"+"-"+companyId +"-"+ RandomNo.createNo();
        outBillMaster.setBillNo(outBillNo);
        outBillMaster.setState(1);
        outBillMaster.setType(2);
        outBillMaster.setContractNo(billMaster.getBillNo());
        outBillMaster.setCompanyId(billMaster.getCompanyId());
        outBillMaster.setAddTime(DateUtils.getNowDateTimeString());
        outBillMaster.setAddUserId(billMaster.getAddUserId());
        outBillMaster.setWareCode(billMaster.getWareCode());
        outBillMaster.setItemMasterId(billMaster.getItemMasterId());
        outBillMaster.setId(null);
        save(outBillMaster);












        /**
         * 新增billDetail列表  12!@qwQW
         * */
        BillDetailCriteria billDetailCriteria = new BillDetailCriteria();
        billDetailCriteria.setBillNo(billMaster.getBillNo());
        List<BillDetailDto> billDetails =billDetailMapper.findList(billDetailCriteria);

        if(billDetails.size()>0){
            inWareCode = billDetails.get(0).getToWareCode();
        }
        inBillMaster.setWareCode(inWareCode);
        save(inBillMaster);

        //入库
        int i= 1;
        for(BillDetail billDetail : billDetails){
            String detailNo = inBillNo + "-" +i;
            billDetail.setDetailNo(detailNo);
            billDetail.setAddTime(nowDate);
            billDetail.setBillType(1);
            billDetail.setBatch(nowDate+"-"+"调拨");
            billDetail.setBillNo(inBillNo);
            billDetail.setCompanyId(billMaster.getCompanyId());
            billDetail.setId(null);
            billDetailService.save(billDetail);

                ItemBatch itemBatch = new ItemBatch();
                String itemBatchBarCode = "IB-"+ RandomNo.createNo();
                itemBatch.setBatch(nowDate+"-"+"调拨");
                itemBatch.setItemBatchBarCode(itemBatchBarCode);
                itemBatch.setCreateTime(nowDate);
                itemBatch.setDetailNo(detailNo);
                itemBatch.setWareCode(billDetail.getToWareCode());
                itemBatch.setItemMasterId(billMaster.getItemMasterId());
                itemBatch.setItemCode(billDetail.getItemCode());
                itemBatchService.save(itemBatch);



            //出库
             detailNo = outBillNo + "-" +i;
            billDetail.setDetailNo(detailNo);
            billDetail.setAddTime(nowDate);
            billDetail.setBillType(2);
            billDetail.setBillNo(outBillNo);
            billDetail.setCompanyId(billMaster.getCompanyId());
            billDetail.setId(null);
            billDetailService.save(billDetail);


            i++;
        }


    }

    @Override
    public void updateState(String billNo) {
        billMasterMapper.updateState(billNo);
    }
}
