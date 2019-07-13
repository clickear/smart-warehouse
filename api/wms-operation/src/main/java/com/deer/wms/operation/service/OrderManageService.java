package com.deer.wms.operation.service;
import com.deer.wms.operation.model.OrderManage;
import com.deer.wms.operation.model.OrderManageCriteria;
import com.deer.wms.operation.model.OrderManageDto;
import com.deer.wms.project.seed.core.service.Service;

import java.util.List;


/**
 * Created by  on 2018/07/11.
 */
public interface OrderManageService extends Service<OrderManage, Integer> {
    void deleteByCodeAndCom(OrderManageCriteria criteria);
    List<OrderManageDto> findList(OrderManageCriteria criteria);


}
