package com.deer.wms.base.system.dao;
import com.deer.wms.base.system.model.ItemInfo;
import com.deer.wms.base.system.model.ItemInfoCriteria;
import com.deer.wms.base.system.model.ItemInfoDto;
import com.deer.wms.project.seed.core.mapper.Mapper;
import java.util.List;


public interface ItemInfoMapper extends Mapper<ItemInfo> {
    void deleteByCodeAndCom(ItemInfoCriteria criteria);
    List<ItemInfoDto> findList(ItemInfoCriteria criteria);
}