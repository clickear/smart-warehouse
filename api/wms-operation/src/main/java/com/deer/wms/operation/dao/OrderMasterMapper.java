package com.deer.wms.operation.dao;

import com.deer.wms.operation.model.OrderMaster;
import com.deer.wms.operation.model.OrderMasterCriteria;
import com.deer.wms.operation.model.OrderMasterDto;
import com.deer.wms.project.seed.core.mapper.Mapper;

import java.util.List;

public interface OrderMasterMapper extends Mapper<OrderMaster> {
    List<OrderMasterDto> findList(OrderMasterCriteria criteria);


}