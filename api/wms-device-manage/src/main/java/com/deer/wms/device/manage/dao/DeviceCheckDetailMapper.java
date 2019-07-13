package com.deer.wms.device.manage.dao;

import com.deer.wms.device.manage.model.DeviceCheckDetail;
import com.deer.wms.device.manage.model.DeviceCheckDetailCriteria;
import com.deer.wms.device.manage.model.DeviceCheckDetailDto;
import com.deer.wms.project.seed.core.mapper.Mapper;


import java.util.List;

public interface DeviceCheckDetailMapper extends Mapper<DeviceCheckDetail> {

    List<DeviceCheckDetailDto> findList(DeviceCheckDetailCriteria criteria);
}