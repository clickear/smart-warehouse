package com.deer.wms.system.manage.service.impl;

import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.project.seed.constant.Constants;
import com.deer.wms.system.manage.dao.SystemParamMapper;
import com.deer.wms.system.manage.service.AlarmParamService;
import com.deer.wms.system.manage.service.SystemParamService;

import com.deer.wms.project.seed.core.service.AbstractService;
import com.deer.wms.system.manage.model.param.*;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

/**
 * Created by WUXB on 2017/10/02.
 */
@Service
@Transactional
public class SystemParamServiceImpl extends AbstractService<SystemParam, Integer> implements SystemParamService {

    @Autowired
    private SystemParamMapper systemParamMapper;

    @Autowired
    private AlarmParamService alarmParamService;

    @Override
    public List<ParamMessageListVO> findMessageParamFormList(SystemParamCriteria criteria) {
        return systemParamMapper.selectMessageParamFormList(criteria);
    }

    @Override
    public List<ParamAlarmListVO> findAlarmParamFormList(SystemParamCriteria criteria) {
        return systemParamMapper.selectAlarmParamFormList(criteria);
    }

    @Override
    public ParamAlarmDetail findAlarmDetailByParamId(Integer paramId) {
        if (null == paramId) {
            return null;
        }
        return systemParamMapper.selectAlarmDetailByParamId(paramId);
    }

    @Override
    @Transactional
    public void addAlarmParam(AlarmParamCreate create, CurrentUser currentUser) {
        //保存告警类型的系统参数信息
        SystemParam systemParam = new SystemParam();
        BeanUtils.copyProperties(create, systemParam);
        systemParam.setParamType(Constants.SYSTEM_PARAM_ALARM);
        systemParam.setCreateUserId(currentUser.getUserId());
        systemParam.setCreateTime(new Date());
        super.save(systemParam);

        //保存告警参数动作信息
        AlarmParam alarmParam = new AlarmParam();
        BeanUtils.copyProperties(create, alarmParam);
        alarmParam.setParamId(systemParam.getParamId());
        alarmParamService.save(alarmParam);
    }

    @Override
    @Transactional
    public void modifyAlarmParam(AlarmParamModify modify, CurrentUser currentUser) {
        //修改告警类型的系统参数信息
        SystemParam systemParam = new SystemParam();
        BeanUtils.copyProperties(modify, systemParam);
        systemParam.setModifyUserId(currentUser.getUserId());
        systemParam.setModifyTime(new Date());
        super.update(systemParam);

        //修改告警参数动作信息
        AlarmParam alarmParam = new AlarmParam();
        BeanUtils.copyProperties(modify, alarmParam);
        alarmParamService.update(alarmParam);
    }

    @Override
    public void modifySystemParamState(Integer paramId, String state, CurrentUser currentUser) {
        SystemParam param = new SystemParam();
        param.setParamId(paramId);
        param.setState(state);
        param.setModifyUserId(currentUser.getUserId());
        param.setModifyTime(new Date());
        super.update(param);
    }
}
