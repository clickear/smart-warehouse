package com.deer.wms.base.system.service;

import com.deer.wms.base.system.model.ItemBatch;
import com.deer.wms.base.system.model.ItemBatchCriteria;
import com.deer.wms.base.system.model.ItemBatchDto;
import com.deer.wms.project.seed.core.service.Service;

import java.util.List;

/**
 * Created by guo on 2018/08/06.
 */
public interface ItemBatchService extends Service<ItemBatch, Integer> {


    List<ItemBatchDto> findList(ItemBatchCriteria criteria);
}
