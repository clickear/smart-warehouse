package com.deer.wms.ware.task.service;

import com.deer.wms.project.seed.core.service.Service;
import com.deer.wms.ware.task.model.CountDetail;
import com.deer.wms.ware.task.model.CountDetailCriteria;
import com.deer.wms.ware.task.model.CountDetailDto;

import java.util.List;


/**
 * Created by guo on 2018/08/20.
 */
public interface CountDetailService extends Service<CountDetail, Integer> {
    List<CountDetailDto> findList(CountDetailCriteria criteria);

}
