package com.deer.wms.operation.service;
import com.deer.wms.operation.model.OrderDetail;
import com.deer.wms.operation.model.OrderDetailCriteria;
import com.deer.wms.operation.model.OrderDetailDto;
import com.deer.wms.project.seed.core.service.Service;

import java.util.List;

/**
 * Created by  on 2018/08/02.
 */
public interface OrderDetailService extends Service<OrderDetail, String> {
    List<OrderDetailDto> findList(OrderDetailCriteria criteria);
    void deleteByC(OrderDetailCriteria criteria);
}
