package com.deer.wms.system.manage.dao;

import com.deer.wms.project.seed.core.mapper.Mapper;
import com.deer.wms.system.manage.model.param.*;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface SystemParamMapper extends Mapper<SystemParam> {
    /**
     * 查询消息参数列表
     *
     * @param criteria 查询条件
     * @return
     */
    List<ParamMessageListVO> selectMessageParamFormList(SystemParamCriteria criteria);

    /**
     * 查询告警参数列表
     *
     * @param criteria 查询条件
     * @return
     */
    List<ParamAlarmListVO> selectAlarmParamFormList(SystemParamCriteria criteria);

    /**
     * 查询指定告警参数的详细信息
     *
     * @param paramId 告警参数信息id
     * @return 告警参数的详细信息
     */
    ParamAlarmDetail selectAlarmDetailByParamId(@Param("paramId") Integer paramId);

}