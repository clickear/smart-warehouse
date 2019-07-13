package com.deer.wms.system.manage.service.impl;

import com.deer.wms.system.manage.dao.AlarmParamMapper;
import com.deer.wms.system.manage.model.param.AlarmParam;
import com.deer.wms.system.manage.service.AlarmParamService;

import com.deer.wms.project.seed.core.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by WUXB on 2017/10/06.
 */
@Service
@Transactional
public class AlarmParamServiceImpl extends AbstractService<AlarmParam, Integer> implements AlarmParamService {

    @Autowired
    private AlarmParamMapper alarmParamMapper;

}
