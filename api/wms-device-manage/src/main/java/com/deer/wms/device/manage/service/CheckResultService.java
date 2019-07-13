package com.deer.wms.device.manage.service;

import com.deer.wms.device.manage.model.CheckResult;
import com.deer.wms.device.manage.model.CheckResultCriteria;

import com.deer.wms.intercept.annotation.User;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.project.seed.core.service.Service;
import java.util.List;
import com.deer.wms.device.manage.model.CheckResultDto;
import springfox.documentation.annotations.ApiIgnore;

/**
 * Created by GuoJingXun on 2018/10/11.
 */
public interface CheckResultService extends Service<CheckResult, Integer> {


    List<CheckResultDto> findList(CheckResultCriteria  criteria) ;

    void insert(Integer deviceCheckMasterId);


    void changeDetailState(Integer deviceCheckDetailId);

    void result( List<CheckResult> checkResults,  CurrentUser currentUser);

}
