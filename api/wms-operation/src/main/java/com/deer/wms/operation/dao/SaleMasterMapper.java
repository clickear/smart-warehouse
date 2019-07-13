package com.deer.wms.operation.dao;

import com.deer.wms.operation.model.SaleMaster;
import com.deer.wms.operation.model.SaleMasterCriteria;
import com.deer.wms.operation.model.SaleMasterDto;
import com.deer.wms.project.seed.core.mapper.Mapper;

import java.util.List;

public interface SaleMasterMapper extends Mapper<SaleMaster> {
    List<SaleMasterDto>findList(SaleMasterCriteria criteria);
}