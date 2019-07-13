package com.deer.wms.base.system.service;

import com.deer.wms.base.system.model.ItemMaster;
import com.deer.wms.base.system.model.ItemMasterCriteria;
import com.deer.wms.base.system.model.ItemMasterDto;
import com.deer.wms.project.seed.core.service.Service;

import java.util.List;

/**
 * Created by guo on 2018/08/03.
 */
public interface ItemMasterService extends Service<ItemMaster, Integer> {

    List<ItemMasterDto> findList(ItemMasterCriteria criteria);

}
