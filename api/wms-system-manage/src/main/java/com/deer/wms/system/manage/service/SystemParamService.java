package com.deer.wms.system.manage.service;

import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.project.seed.core.service.Service;
import com.deer.wms.system.manage.model.param.*;

import java.util.List;

/**
 * Created by WUXB on 2017/10/02.
 */
public interface SystemParamService extends Service<SystemParam, Integer> {

    /**
     * 找到消息参数列表
     *
     * @param criteria 查询条件
     * @return
     */
    List<ParamMessageListVO> findMessageParamFormList(SystemParamCriteria criteria);

    /**
     * 找到告警参数列表
     *
     * @param criteria 查询条件
     * @return
     */
    List<ParamAlarmListVO> findAlarmParamFormList(SystemParamCriteria criteria);

    /**
     * 获取指定告警参数的详细信息
     *
     * @param paramId 告警参数信息id
     * @return 告警参数的详细信息
     */
    ParamAlarmDetail findAlarmDetailByParamId(Integer paramId);

    /**
     * 添加告警参数信息
     *
     * @param create 告警参数信息
     * @param currentUser 当前操作用户的信息
     */
    void addAlarmParam(AlarmParamCreate create, CurrentUser currentUser);

    /**
     * 修改告警参数信息
     *
     * @param modify 告警参数信息
     * @param currentUser 当前操作用户的信息
     */
    void modifyAlarmParam(AlarmParamModify modify, CurrentUser currentUser);

    /**
     * 修改系统参数状态
     *
     * @param paramId 参数信息id
     * @param state 参数信息状态
     * @param currentUser 当前操作用户的信息
     */
    void modifySystemParamState(Integer paramId, String state, CurrentUser currentUser);
}
