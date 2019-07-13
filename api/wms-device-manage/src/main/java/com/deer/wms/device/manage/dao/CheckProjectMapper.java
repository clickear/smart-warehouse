package com.deer.wms.device.manage.dao;

import com.deer.wms.device.manage.model.*;
import com.deer.wms.project.seed.core.mapper.Mapper;

import java.util.List;

public interface CheckProjectMapper extends Mapper<CheckProject> {
    List<CheckProjectDto> findList(CheckProjectCriteria criteria) ;

}