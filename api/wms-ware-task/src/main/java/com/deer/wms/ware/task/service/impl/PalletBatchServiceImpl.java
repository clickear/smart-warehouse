package com.deer.wms.ware.task.service.impl;

import com.deer.wms.base.system.model.*;
import com.deer.wms.base.system.service.CellInfoService;
import com.deer.wms.base.system.service.PalletService;
import com.deer.wms.bill.manage.model.CellItemCriteria;
import com.deer.wms.ware.task.dao.PalletBatchMapper;
import com.deer.wms.ware.task.model.PalletBatch;
import com.deer.wms.ware.task.model.PalletBatchCriteria;
import com.deer.wms.ware.task.model.PalletBatchDto;
import com.deer.wms.ware.task.model.PrepareData;
import com.deer.wms.ware.task.service.PalletBatchService;

import com.deer.wms.project.seed.core.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by guo on 2018/08/08.
 */
@Service
@Transactional
public class PalletBatchServiceImpl extends AbstractService<PalletBatch, Integer> implements PalletBatchService {

    @Autowired
    private PalletBatchMapper palletBatchMapper;
    @Autowired
    private CellInfoService cellInfoService;

    @Autowired
    private PalletService palletService;

    @Override
    public List<PalletBatchDto> findList(PalletBatchCriteria criteria) {
        if(criteria.getPrepareType() !=null){
            if(criteria.getPrepareType() ==1   ){   //先进先出
                return palletBatchMapper.findList(criteria);
            }else if(criteria.getPrepareType() ==2){  //清理货位
                return palletBatchMapper.findQList(criteria);
            }
        }

        return palletBatchMapper.findList(criteria);  //默认先进先出
    }

    @Override
    public List<PalletBatchDto> findAreaItem(PalletBatchCriteria criteria) {
        return palletBatchMapper.findAreaItemList(criteria);
    }

    @Override
    public List<PalletBatchDto> findByItemCode(PalletBatchCriteria criteria) {
        return palletBatchMapper.findByItemCode(criteria);
    }

    @Override
    public void getPrepare(List<PalletBatchDto> palletBatchDtos,PalletBatchCriteria criteria, Integer quantity) {


        criteria.setPrepareType(1);

        List<PalletBatchDto> list1 = findList(criteria);

        Integer sum = 0;
        for(int i = 0;i<list1.size();i++){
            sum += list1.get(i).getQuantity();
            if(sum < quantity ){
                palletBatchDtos.add(list1.get(i));
            }else if(sum ==quantity){
                palletBatchDtos.add(list1.get(i));
                break;
            }else if(sum >quantity){
                sum -=list1.get(i).getQuantity();
                Integer newQuantity = quantity - sum;
                list1.get(i).setQuantity(newQuantity) ;
                list1.get(i).setIsAll(0); ;
                palletBatchDtos.add(list1.get(i));
                break;
            }
        }




    }

    @Override
    public void setCellState(String cellCode) {
        CellInfoCriteria criteria = new CellInfoCriteria();
        criteria.setCellCode(cellCode);
        List<CellInfoDto> cellInfoDtoList = cellInfoService.findList(criteria);
        if(cellInfoDtoList.size()==1){
            CellInfo cellInfo = cellInfoDtoList.get(0);
            Integer state =0;
            if(cellInfo != null){

                PalletCriteria palletCriteria = new PalletCriteria();
                palletCriteria.setCellCode(cellCode);
                List<PalletDto> list = palletService.findList(palletCriteria);
                if(list.size() >0){
                    state =1;
                }

            }
            cellInfo.setState(state);
            cellInfoService.update(cellInfo);
        }





    }
}
