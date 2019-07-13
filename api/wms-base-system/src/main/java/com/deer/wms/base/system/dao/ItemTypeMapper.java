package com.deer.wms.base.system.dao;
import com.deer.wms.base.system.model.ItemType;
import com.deer.wms.base.system.model.ItemTypeCriteria;
import com.deer.wms.project.seed.core.mapper.Mapper;
import java.util.List;

public interface ItemTypeMapper extends Mapper<ItemType> {

    void deleteByCodeAndCom(ItemTypeCriteria criteria);
    List<ItemType> findList(ItemTypeCriteria criteria);
}