package com.deer.wms.ware.task.service;

import com.deer.wms.ware.task.model.PalletBatch;
import com.deer.wms.project.seed.core.service.Service;
import com.deer.wms.ware.task.model.PalletBatchCriteria;
import com.deer.wms.ware.task.model.PalletBatchDto;
import com.deer.wms.ware.task.model.PrepareData;

import java.util.List;

/**
 * Created by guo on 2018/08/08.
 */
public interface PalletBatchService extends Service<PalletBatch, Integer> {
    List<PalletBatchDto> findList(PalletBatchCriteria criteria);

    List<PalletBatchDto>  findAreaItem(PalletBatchCriteria criteria);

    List<PalletBatchDto>  findByItemCode(PalletBatchCriteria criteria);


     void getPrepare(List<PalletBatchDto> list,PalletBatchCriteria criteria, Integer quantity);


     //设置货位状态
    void setCellState(String cellCode);





}
