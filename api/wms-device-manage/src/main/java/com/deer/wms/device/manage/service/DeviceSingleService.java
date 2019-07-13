package com.deer.wms.device.manage.service;

import com.deer.wms.device.manage.model.DeviceSingle;
import com.deer.wms.device.manage.model.DeviceSingleCriteria;

import com.deer.wms.project.seed.core.service.Service;
import java.util.List;
import com.deer.wms.device.manage.model.DeviceSingleDto;

/**
 * Created by GuoJingXun on 2018/10/11.
 */
public interface DeviceSingleService extends Service<DeviceSingle, Integer> {


    List<DeviceSingleDto> findList(DeviceSingleCriteria  criteria) ;

}
