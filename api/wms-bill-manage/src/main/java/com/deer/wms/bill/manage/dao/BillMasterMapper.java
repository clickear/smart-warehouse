package com.deer.wms.bill.manage.dao;

import com.deer.wms.bill.manage.model.BillMaster;
import com.deer.wms.bill.manage.model.BillMasterCriteria;
import com.deer.wms.bill.manage.model.BillMasterDto;
import com.deer.wms.bill.manage.model.TongJi;
import com.deer.wms.project.seed.core.mapper.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface BillMasterMapper extends Mapper<BillMaster> {

    List<BillMasterDto> findList(BillMasterCriteria criteria);

    TongJi tongji(BillMasterCriteria criteria);

    void updateState(@Param("billNo") String billNo);
}