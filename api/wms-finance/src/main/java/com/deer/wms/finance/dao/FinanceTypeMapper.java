package com.deer.wms.finance.dao;

import com.deer.wms.finance.model.FinanceType;
import com.deer.wms.finance.model.FinanceTypeCriteria;
import com.deer.wms.project.seed.core.mapper.Mapper;

import java.util.List;

public interface FinanceTypeMapper extends Mapper<FinanceType> {
    void deleteByCodeAndCom(FinanceTypeCriteria criteria);
    List<FinanceType> findList(FinanceTypeCriteria criteria);
}