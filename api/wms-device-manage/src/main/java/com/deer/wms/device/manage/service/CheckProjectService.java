package com.deer.wms.device.manage.service;

import com.deer.wms.device.manage.model.CheckProject;
import com.deer.wms.device.manage.model.CheckProjectCriteria;

import com.deer.wms.device.manage.model.InsertProject;
import com.deer.wms.project.seed.core.service.Service;
import java.util.List;
import com.deer.wms.device.manage.model.CheckProjectDto;

/**
 * Created by GuoJingXun on 2018/10/11.
 */
public interface CheckProjectService extends Service<CheckProject, Integer> {


    List<CheckProjectDto> findList(CheckProjectCriteria  criteria) ;

    void insertAll(InsertProject insertProject);

}
