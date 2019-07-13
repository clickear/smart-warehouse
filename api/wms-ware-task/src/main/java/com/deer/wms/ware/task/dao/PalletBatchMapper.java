package com.deer.wms.ware.task.dao;

import com.deer.wms.project.seed.core.mapper.Mapper;
import com.deer.wms.ware.task.model.PalletBatch;
import com.deer.wms.ware.task.model.PalletBatchCriteria;
import com.deer.wms.ware.task.model.PalletBatchDto;

import java.util.List;

public interface PalletBatchMapper extends Mapper<PalletBatch> {


    List<PalletBatchDto> findList(PalletBatchCriteria criteria);

    List<PalletBatchDto> findQList(PalletBatchCriteria criteria);

    List<PalletBatchDto> findAreaItemList(PalletBatchCriteria criteria);

    List<PalletBatchDto> findByItemCode(PalletBatchCriteria criteria);









}