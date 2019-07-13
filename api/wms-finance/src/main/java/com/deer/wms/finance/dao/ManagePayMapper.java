package com.deer.wms.finance.dao;

import com.deer.wms.finance.model.ManagePay;
import com.deer.wms.finance.model.ManagePayCriteria;
import com.deer.wms.finance.model.ManagePayDto;
import com.deer.wms.project.seed.core.mapper.Mapper;

import java.util.List;

public interface ManagePayMapper extends Mapper<ManagePay> {
    void deleteByCodeAndCom(ManagePayCriteria criteria);
    List<ManagePayDto> findList(ManagePayCriteria criteria);
}