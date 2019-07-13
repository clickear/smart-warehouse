package com.deer.wms.device.manage.service;

import com.deer.wms.device.manage.model.CheckContent;
import com.deer.wms.device.manage.model.CheckContentCriteria;

import com.deer.wms.project.seed.core.service.Service;
import java.util.List;
import com.deer.wms.device.manage.model.CheckContentDto;

/**
 * Created by GuoJingXun on 2018/10/11.
 */
public interface CheckContentService extends Service<CheckContent, Integer> {


    List<CheckContentDto> findList(CheckContentCriteria  criteria) ;

}
