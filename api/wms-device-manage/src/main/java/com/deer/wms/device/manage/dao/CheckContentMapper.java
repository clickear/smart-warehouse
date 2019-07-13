package com.deer.wms.device.manage.dao;

import com.deer.wms.device.manage.model.CheckContent;
import com.deer.wms.device.manage.model.CheckContentCriteria;
import com.deer.wms.device.manage.model.CheckContentDto;
import com.deer.wms.project.seed.core.mapper.Mapper;

import java.util.List;

public interface CheckContentMapper extends Mapper<CheckContent> {
    List<CheckContentDto> findList(CheckContentCriteria criteria) ;
}