package com.deer.wms.system.manage.service.impl;

import com.deer.wms.system.manage.dao.HelpInfoMapper;
import com.deer.wms.system.manage.model.help.HelpInfo;
import com.deer.wms.system.manage.service.HelpInfoService;

import com.deer.wms.project.seed.core.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by xuyingyang on 2017/10/14.
 */
@Service
@Transactional
public class HelpInfoServiceImpl extends AbstractService<HelpInfo, Integer> implements HelpInfoService {

    @Autowired
    private HelpInfoMapper helpInfoMapper;

}
