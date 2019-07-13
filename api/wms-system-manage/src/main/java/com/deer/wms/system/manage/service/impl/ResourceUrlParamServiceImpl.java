package com.deer.wms.system.manage.service.impl;

import com.deer.wms.system.manage.dao.ResourceUrlParamMapper;
import com.deer.wms.system.manage.model.resource.ResourceUrlParam;
import com.deer.wms.system.manage.service.ResourceUrlParamService;

import com.deer.wms.project.seed.core.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by WUXB on 2017/10/07.
 */
@Service
@Transactional
public class ResourceUrlParamServiceImpl extends AbstractService<ResourceUrlParam, Integer> implements ResourceUrlParamService {

    @Autowired
    private ResourceUrlParamMapper resourceUrlParamMapper;

}
