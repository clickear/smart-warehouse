package com.deer.wms.device.manage.service;

import com.deer.wms.device.manage.model.DeviceCheckMaster;
import com.deer.wms.device.manage.model.DeviceCheckMasterCriteria;

import com.deer.wms.device.manage.model.InsertMaster;
import com.deer.wms.project.seed.core.service.Service;
import java.util.List;
import com.deer.wms.device.manage.model.DeviceCheckMasterDto;

/**
 * Created by GuoJingXun on 2018/10/16.
 */
public interface DeviceCheckMasterService extends Service<DeviceCheckMaster, Integer> {


    List<DeviceCheckMasterDto> findList(DeviceCheckMasterCriteria  criteria) ;

    void insert(InsertMaster insertMaster);

}
