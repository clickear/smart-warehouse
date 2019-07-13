package com.deer.wms.device.manage.service.impl;

import com.deer.wms.device.manage.dao.CheckProjectMapper;
import com.deer.wms.device.manage.model.*;
import com.deer.wms.device.manage.service.CheckContentService;
import com.deer.wms.device.manage.service.CheckProjectService;

import com.deer.wms.project.seed.core.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

/**
 * Created by GuoJingXun on 2018/10/11.
 */
@Service
@Transactional
public class CheckProjectServiceImpl extends AbstractService<CheckProject, Integer> implements CheckProjectService {

    @Autowired
    private CheckProjectMapper checkProjectMapper;

    @Autowired
    private CheckContentService checkContentService;


    @Override
    public List<CheckProjectDto> findList(CheckProjectCriteria  criteria) {
        return checkProjectMapper.findList(criteria);
    }

    @Override
    public void insertAll(InsertProject insertProject) {
        CheckProject checkProject = insertProject.getCheckProject();
        List<CheckContent> checkContents = insertProject.getCheckContents();
        save(checkProject);
        for(CheckContent checkContent:checkContents){
            checkContent.setCheckProjectId(checkProject.getCheckProjectId());
            checkContentService.save(checkContent);
        }



    }
}
