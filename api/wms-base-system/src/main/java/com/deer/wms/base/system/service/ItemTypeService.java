package com.deer.wms.base.system.service;
import com.deer.wms.base.system.model.ItemType;
import com.deer.wms.base.system.model.ItemTypeCriteria;
import com.deer.wms.project.seed.core.service.Service;

import java.util.List;


/**
 * Created by  on 2018/06/28.
 */
public interface ItemTypeService extends Service<ItemType, Integer> {

    void  deleteByCodeAndCom(ItemTypeCriteria criteria);
    List<ItemType> findList(ItemTypeCriteria  criteria);
}
