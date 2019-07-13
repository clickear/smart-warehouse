package com.deer.wms.device.manage.service.impl;

import com.deer.wms.device.manage.dao.CheckResultMapper;
import com.deer.wms.device.manage.model.*;
import com.deer.wms.device.manage.service.CheckContentService;
import com.deer.wms.device.manage.service.CheckResultService;

import com.deer.wms.device.manage.service.DeviceCheckDetailService;
import com.deer.wms.device.manage.service.DeviceCheckMasterService;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.project.seed.core.service.AbstractService;
import com.deer.wms.project.seed.util.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

/**
 * Created by GuoJingXun on 2018/10/11.
 */
@Service
@Transactional
public class CheckResultServiceImpl extends AbstractService<CheckResult, Integer> implements CheckResultService {

    @Autowired
    private CheckResultMapper checkResultMapper;

    @Autowired
    private DeviceCheckDetailService deviceCheckDetailService;

    @Autowired
    private CheckContentService checkContentService;

    @Autowired
    private DeviceCheckMasterService deviceCheckMasterService;


    @Override
    public List<CheckResultDto> findList(CheckResultCriteria  criteria) {
        return checkResultMapper.findList(criteria);
    }

    @Override
    @Async
    public void insert(Integer deviceCheckMasterId) {
        /*
        * 1.查询该master的所有detail
        * 2.遍历每个detail，查询每个detail的checkContent，并新建该detail的result
        *
        * */
        DeviceCheckDetailCriteria deviceCheckDetailCriteria = new DeviceCheckDetailCriteria();
        deviceCheckDetailCriteria.setDeviceCheckMasterId(deviceCheckMasterId);
        List<DeviceCheckDetailDto> deviceCheckDetails = deviceCheckDetailService.findList(deviceCheckDetailCriteria);

        for(DeviceCheckDetailDto deviceCheckDetail :deviceCheckDetails){
            CheckContentCriteria checkContentCriteria = new CheckContentCriteria();
            checkContentCriteria.setDeviceId(deviceCheckDetail.getDeviceId());
            List<CheckContentDto> checkContentDtos = checkContentService.findList(checkContentCriteria);
            for(CheckContentDto checkContentDto:checkContentDtos){
                Integer checkContentId = checkContentDto.getCheckContentId();
                Integer deviceCheckDetailId = deviceCheckDetail.getDeviceCheckDetailId();
                CheckResult checkResult = new CheckResult();
                checkResult.setCheckContentId(checkContentId);
                checkResult.setDeviceCheckDetailId(deviceCheckDetailId);
                save(checkResult);
            }


        }

    }

    @Override
    @Async
    public void changeDetailState(Integer deviceCheckDetailId) {
        /*
        * 1.查询该detail下所有result
        * 2.遍历每个result，如果所有result都已经检查，就改变detail的状态
        *
        * */

        String  nowDate = DateUtils.getNowDateTimeString();

        CheckResultCriteria checkResultCriteria = new CheckResultCriteria();
        checkResultCriteria.setDeviceCheckDetailId(deviceCheckDetailId);
        List<CheckResultDto> checkResultDtos = findList(checkResultCriteria);

        Integer state = 1;
        for(CheckResult checkResult:checkResultDtos){
            if(checkResult.getResult() ==0){
                state = 0;
            }
        }
        DeviceCheckDetail  deviceCheckDetail = deviceCheckDetailService.findById(deviceCheckDetailId);
        if(state ==1){
            deviceCheckDetail = deviceCheckDetailService.findById(deviceCheckDetailId);
            deviceCheckDetail.setState(state);

            deviceCheckDetailService.update(deviceCheckDetail);
        }

        Integer deviceCheckMasterId =deviceCheckDetail.getDeviceCheckMasterId();
        DeviceCheckDetailCriteria deviceCheckDetailCriteria = new DeviceCheckDetailCriteria();
        deviceCheckDetailCriteria.setDeviceCheckMasterId(deviceCheckMasterId);
        List<DeviceCheckDetailDto> deviceCheckDetailDtos = deviceCheckDetailService.findList(deviceCheckDetailCriteria);
        Integer masterState = 1;
        for(DeviceCheckDetail deviceCheckDetail1:deviceCheckDetailDtos){
            if(deviceCheckDetail1.getState() ==0){
                masterState =0;
            }
        }
        DeviceCheckMaster deviceCheckMaster = deviceCheckMasterService.findById(deviceCheckMasterId);
        deviceCheckMaster.setRecordUserId(deviceCheckDetail.getTaskUserId());
        deviceCheckMaster.setState(masterState);
        deviceCheckMaster.setTaskTime(nowDate);
        deviceCheckMasterService.update(deviceCheckMaster);


    }

    @Override
    public void result(List<CheckResult> checkResults, CurrentUser currentUser) {
        Integer deviceCheckDetailId = checkResults.get(0).getDeviceCheckDetailId();
        DeviceCheckDetail deviceCheckDetail = deviceCheckDetailService.findById(deviceCheckDetailId);
        deviceCheckDetail.setTaskUserId(currentUser.getUserId());
        deviceCheckDetailService.update(deviceCheckDetail);
        String  nowDate = DateUtils.getNowDateTimeString();
        for(CheckResult checkResult:checkResults){
            checkResult.setCheckTime(nowDate);
            update(checkResult);
        }
    }
}
