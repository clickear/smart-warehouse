package com.deer.wms.device.manage.service.impl;

import com.deer.wms.device.manage.dao.CheckContentMapper;
import com.deer.wms.device.manage.model.CheckContent;
import com.deer.wms.device.manage.model.CheckContentCriteria;
import com.deer.wms.device.manage.service.CheckContentService;

import com.deer.wms.project.seed.core.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import com.deer.wms.device.manage.model.CheckContentDto;

/**
 * Created by GuoJingXun on 2018/10/11.
 */
@Service
@Transactional
public class CheckContentServiceImpl extends AbstractService<CheckContent, Integer> implements CheckContentService {

    @Autowired
    private CheckContentMapper checkContentMapper;


    @Override
    public List<CheckContentDto> findList(CheckContentCriteria  criteria) {
        return checkContentMapper.findList(criteria);
    }
}
