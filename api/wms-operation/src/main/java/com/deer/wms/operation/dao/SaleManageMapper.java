package com.deer.wms.operation.dao;

import com.deer.wms.operation.model.SaleManage;
import com.deer.wms.operation.model.SaleManageCriteria;
import com.deer.wms.operation.model.SaleManageDto;
import com.deer.wms.project.seed.core.mapper.Mapper;

import java.util.List;

public interface SaleManageMapper extends Mapper<SaleManage> {
    void deleteByCodeAndCom(SaleManageCriteria criteria);
    List<SaleManageDto> findList(SaleManageCriteria criteria);
}