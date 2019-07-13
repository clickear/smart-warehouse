package com.deer.wms.device.manage.service.impl;

import com.deer.wms.device.manage.dao.DeviceInfoMapper;
import com.deer.wms.device.manage.model.DeviceInfo;
import com.deer.wms.device.manage.model.DeviceInfoCriteria;
import com.deer.wms.device.manage.service.DeviceInfoService;

import com.deer.wms.project.seed.core.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import com.deer.wms.device.manage.model.DeviceInfoDto;

/**
 * Created by GuoJingXun on 2018/10/11.
 */
@Service
@Transactional
public class DeviceInfoServiceImpl extends AbstractService<DeviceInfo, Integer> implements DeviceInfoService {

    @Autowired
    private DeviceInfoMapper deviceInfoMapper;


    @Override
    public List<DeviceInfoDto> findList(DeviceInfoCriteria  criteria) {
        return deviceInfoMapper.findList(criteria);
    }
}
