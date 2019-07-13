package com.deer.wms.operation.dao;

import com.deer.wms.operation.model.OrderDetail;
import com.deer.wms.operation.model.OrderDetailCriteria;
import com.deer.wms.operation.model.OrderDetailDto;
import com.deer.wms.project.seed.core.mapper.Mapper;

import java.util.List;

public interface OrderDetailMapper extends Mapper<OrderDetail> {
    List<OrderDetailDto> findList(OrderDetailCriteria criteria);
    void deleteByC(OrderDetailCriteria criteria);
}