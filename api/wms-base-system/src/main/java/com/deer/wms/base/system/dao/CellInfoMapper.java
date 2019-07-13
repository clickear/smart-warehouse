package com.deer.wms.base.system.dao;
import com.deer.wms.base.system.model.CellInfo;
import com.deer.wms.base.system.model.CellInfoCriteria;
import com.deer.wms.base.system.model.CellInfoDto;
import com.deer.wms.project.seed.core.mapper.Mapper;
import java.util.List;

public interface CellInfoMapper extends Mapper<CellInfo> {
    void deleteByCodeAndCom(CellInfoCriteria criteria);
    List<CellInfoDto> findList(CellInfoCriteria criteria);
    CellInfo findByCellCode(String cellCode) ;
}