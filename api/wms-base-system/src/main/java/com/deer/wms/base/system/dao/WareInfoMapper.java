package com.deer.wms.base.system.dao;
import com.deer.wms.base.system.model.WareInfo;
import com.deer.wms.base.system.model.WareInfoCriteria;
import com.deer.wms.base.system.model.WareInfoDto;
import com.deer.wms.project.seed.core.mapper.Mapper;
import java.util.List;

public interface WareInfoMapper extends Mapper<WareInfo> {
    void deleteByCodeAndCom(WareInfoCriteria criteria);
    List<WareInfoDto> findList(WareInfoCriteria criteria);
}