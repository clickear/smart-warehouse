package com.deer.wms.base.system.dao;

import com.deer.wms.base.system.model.ItemBatch;
import com.deer.wms.base.system.model.ItemBatchCriteria;
import com.deer.wms.base.system.model.ItemBatchDto;
import com.deer.wms.project.seed.core.mapper.Mapper;

import java.util.List;

public interface ItemBatchMapper extends Mapper<ItemBatch> {

    List<ItemBatchDto> findList(ItemBatchCriteria criteria);
}