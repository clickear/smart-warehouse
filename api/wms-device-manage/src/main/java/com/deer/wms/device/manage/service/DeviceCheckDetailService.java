package com.deer.wms.device.manage.service;

import com.deer.wms.device.manage.model.DeviceCheckDetail;
import com.deer.wms.device.manage.model.DeviceCheckDetailCriteria;

import com.deer.wms.project.seed.core.service.Service;
import java.util.List;
import com.deer.wms.device.manage.model.DeviceCheckDetailDto;

/**
 * Created by GuoJingXun on 2018/10/16.
 */
public interface DeviceCheckDetailService extends Service<DeviceCheckDetail, Integer> {


    List<DeviceCheckDetailDto> findList(DeviceCheckDetailCriteria  criteria) ;

}
