package com.deer.wms.report.dao;

import com.deer.wms.project.seed.core.mapper.Mapper;
import com.deer.wms.report.model.AreaItem;
import com.deer.wms.report.model.AreaItemCriteria;
import com.deer.wms.report.model.AreaItemDto;

import java.util.List;

public interface AreaItemMapper extends Mapper<AreaItem> {

    List<AreaItemDto> findList(AreaItemCriteria criteria);
}