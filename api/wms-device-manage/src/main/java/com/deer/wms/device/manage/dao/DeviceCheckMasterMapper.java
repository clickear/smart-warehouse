package com.deer.wms.device.manage.dao;

import com.deer.wms.device.manage.model.DeviceCheckMaster;
import com.deer.wms.device.manage.model.DeviceCheckMasterCriteria;
import com.deer.wms.device.manage.model.DeviceCheckMasterDto;
import com.deer.wms.project.seed.core.mapper.Mapper;

import java.util.List;

public interface DeviceCheckMasterMapper extends Mapper<DeviceCheckMaster> {

    List<DeviceCheckMasterDto> findList(DeviceCheckMasterCriteria criteria);
}