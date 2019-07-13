package com.deer.wms.ware.task.dao;


import com.deer.wms.project.seed.core.mapper.Mapper;
import com.deer.wms.ware.task.model.CountDetail;
import com.deer.wms.ware.task.model.CountDetailCriteria;
import com.deer.wms.ware.task.model.CountDetailDto;

import java.util.List;

public interface CountDetailMapper extends Mapper<CountDetail> {
    List<CountDetailDto> findList(CountDetailCriteria criteria);
}