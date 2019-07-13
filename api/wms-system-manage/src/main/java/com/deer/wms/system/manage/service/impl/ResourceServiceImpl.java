package com.deer.wms.system.manage.service.impl;

import com.deer.wms.system.manage.dao.ResourceMapper;
import com.deer.wms.system.manage.model.resource.Resource;
import com.deer.wms.system.manage.service.ResourceService;

import com.deer.wms.project.seed.core.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by WUXB on 2017/10/08.
 */
@Service
@Transactional
public class ResourceServiceImpl extends AbstractService<Resource, Integer> implements ResourceService {

    @Autowired
    private ResourceMapper resourceMapper;

}
