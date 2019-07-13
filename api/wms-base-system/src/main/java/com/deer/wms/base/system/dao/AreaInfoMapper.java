package com.deer.wms.base.system.dao;
import com.deer.wms.base.system.model.AreaInfo;
import com.deer.wms.base.system.model.AreaInfoCriteria;
import com.deer.wms.base.system.model.AreaInfoDto;
import com.deer.wms.project.seed.core.mapper.Mapper;
import java.util.List;

public interface AreaInfoMapper extends Mapper<AreaInfo> {
    void deleteByCodeAndCom(AreaInfoCriteria criteria);
    List<AreaInfoDto> findList(AreaInfoCriteria criteria);
}