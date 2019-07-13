package com.deer.wms.operation.dao;

import com.deer.wms.operation.model.SaleDetail;
import com.deer.wms.operation.model.SaleDetailCriteria;
import com.deer.wms.operation.model.SaleDetailDto;
import com.deer.wms.project.seed.core.mapper.Mapper;

import java.util.List;

public interface SaleDetailMapper extends Mapper<SaleDetail> {
    List<SaleDetailDto>findBySaleNoAndStatus(SaleDetailCriteria criteria);
    List<SaleDetailDto> findList(SaleDetailCriteria criteria);
}