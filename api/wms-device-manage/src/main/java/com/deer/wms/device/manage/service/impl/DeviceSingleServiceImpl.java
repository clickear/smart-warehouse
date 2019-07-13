package com.deer.wms.device.manage.service.impl;

import com.deer.wms.device.manage.dao.DeviceSingleMapper;
import com.deer.wms.device.manage.model.DeviceSingle;
import com.deer.wms.device.manage.model.DeviceSingleCriteria;
import com.deer.wms.device.manage.service.DeviceSingleService;

import com.deer.wms.project.seed.core.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import com.deer.wms.device.manage.model.DeviceSingleDto;

/**
 * Created by GuoJingXun on 2018/10/11.
 */
@Service
@Transactional
public class DeviceSingleServiceImpl extends AbstractService<DeviceSingle, Integer> implements DeviceSingleService {

    @Autowired
    private DeviceSingleMapper deviceSingleMapper;


    @Override
    public List<DeviceSingleDto> findList(DeviceSingleCriteria  criteria) {
        return deviceSingleMapper.findList(criteria);
    }
}
