package com.deer.wms.base.system.dao;

import com.deer.wms.base.system.model.Unit;
import com.deer.wms.base.system.model.UnitCriteria;
import com.deer.wms.project.seed.core.mapper.Mapper;

import java.util.List;

public interface UnitMapper extends Mapper<Unit> {
    void deleteByCodeAndCom(UnitCriteria criteria);
    List<Unit> findList(UnitCriteria criteria);

}