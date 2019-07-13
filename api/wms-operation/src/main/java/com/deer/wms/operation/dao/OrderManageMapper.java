package com.deer.wms.operation.dao;
import com.deer.wms.operation.model.OrderManage;
import com.deer.wms.operation.model.OrderManageCriteria;
import com.deer.wms.operation.model.OrderManageDto;
import com.deer.wms.project.seed.core.mapper.Mapper;

import java.util.List;

public interface OrderManageMapper extends Mapper<OrderManage> {
    void deleteByCodeAndCom(OrderManageCriteria criteria);
    List<OrderManageDto> findList(OrderManageCriteria criteria);
}