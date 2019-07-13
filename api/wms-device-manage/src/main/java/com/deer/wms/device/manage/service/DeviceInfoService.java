package com.deer.wms.device.manage.service;

import com.deer.wms.device.manage.model.DeviceInfo;
import com.deer.wms.device.manage.model.DeviceInfoCriteria;

import com.deer.wms.project.seed.core.service.Service;
import java.util.List;
import com.deer.wms.device.manage.model.DeviceInfoDto;

/**
 * Created by GuoJingXun on 2018/10/11.
 */
public interface DeviceInfoService extends Service<DeviceInfo, Integer> {


    List<DeviceInfoDto> findList(DeviceInfoCriteria  criteria) ;

}
