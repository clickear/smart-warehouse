package com.deer.wms.device.manage.service.impl;

import com.deer.wms.device.manage.dao.DeviceCheckDetailMapper;
import com.deer.wms.device.manage.model.DeviceCheckDetail;
import com.deer.wms.device.manage.model.DeviceCheckDetailCriteria;
import com.deer.wms.device.manage.service.DeviceCheckDetailService;

import com.deer.wms.project.seed.core.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import com.deer.wms.device.manage.model.DeviceCheckDetailDto;

/**
 * Created by GuoJingXun on 2018/10/16.
 */
@Service
@Transactional
public class DeviceCheckDetailServiceImpl extends AbstractService<DeviceCheckDetail, Integer> implements DeviceCheckDetailService {

    @Autowired
    private DeviceCheckDetailMapper deviceCheckDetailMapper;


    @Override
    public List<DeviceCheckDetailDto> findList(DeviceCheckDetailCriteria  criteria) {
        return deviceCheckDetailMapper.findList(criteria);
    }
}
