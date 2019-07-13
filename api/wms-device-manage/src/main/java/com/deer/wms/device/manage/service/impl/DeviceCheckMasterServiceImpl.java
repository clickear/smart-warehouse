package com.deer.wms.device.manage.service.impl;

import com.deer.wms.device.manage.dao.DeviceCheckMasterMapper;
import com.deer.wms.device.manage.model.*;
import com.deer.wms.device.manage.service.DeviceCheckDetailService;
import com.deer.wms.device.manage.service.DeviceCheckMasterService;

import com.deer.wms.project.seed.core.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

/**
 * Created by GuoJingXun on 2018/10/16.
 */
@Service
@Transactional
public class DeviceCheckMasterServiceImpl extends AbstractService<DeviceCheckMaster, Integer> implements DeviceCheckMasterService {

    @Autowired
    private DeviceCheckMasterMapper deviceCheckMasterMapper;


    @Autowired
    private DeviceCheckDetailService deviceCheckDetailService;

    @Override
    public List<DeviceCheckMasterDto> findList(DeviceCheckMasterCriteria  criteria) {
        return deviceCheckMasterMapper.findList(criteria);
    }

    @Override
    public void insert(InsertMaster insertMaster) {
        DeviceCheckMaster deviceCheckMaster = insertMaster.getDeviceCheckMaster();

        save(deviceCheckMaster);

        List<DeviceCheckDetail> deviceCheckDetails = insertMaster.getDeviceCheckDetails();

        for(DeviceCheckDetail deviceCheckDetail : deviceCheckDetails){
            deviceCheckDetail.setDeviceCheckMasterId(deviceCheckMaster.getDeviceCheckMasterId());
            deviceCheckDetailService.save(deviceCheckDetail);
        }

    }
}
