package com.deer.wms.base.system.dao;
import com.deer.wms.base.system.model.Pllet;
import com.deer.wms.base.system.model.PlletCriteria;
import com.deer.wms.base.system.model.PlletDto;
import com.deer.wms.project.seed.core.mapper.Mapper;
import java.util.List;

public interface PlletMapper extends Mapper<Pllet> {

    void  deleteByCodeAndCom(PlletCriteria criteria);
    List<PlletDto> findList(PlletCriteria criteria);

}