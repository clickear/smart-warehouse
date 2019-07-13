package com.deer.wms.base.system.service;
import com.deer.wms.base.system.model.ItemInfo;
import com.deer.wms.base.system.model.ItemInfoCriteria;
import com.deer.wms.base.system.model.ItemInfoDto;
import com.deer.wms.project.seed.core.service.Service;
import java.util.List;


/**
 * Created by  on 2018/06/28.
 */
public interface ItemInfoService extends Service<ItemInfo, Integer> {
    void  deleteByCodeAndCom(ItemInfoCriteria criteria);
    List<ItemInfoDto> findList(ItemInfoCriteria criteria);
}
