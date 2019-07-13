package com.deer.wms.base.system.dao;

import com.deer.wms.base.system.model.ItemMaster;
import com.deer.wms.base.system.model.ItemMasterCriteria;
import com.deer.wms.base.system.model.ItemMasterDto;
import com.deer.wms.project.seed.core.mapper.Mapper;

import java.util.List;

public interface ItemMasterMapper extends Mapper<ItemMaster> {

    List<ItemMasterDto> findList(ItemMasterCriteria criteria);
}