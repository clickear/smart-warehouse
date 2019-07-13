package com.deer.wms.operation.service;
import com.deer.wms.operation.model.OrderMaster;
import com.deer.wms.operation.model.OrderMasterCriteria;
import com.deer.wms.operation.model.OrderMasterDto;
import com.deer.wms.project.seed.core.service.Service;

import java.util.List;

/**
 * Created by  on 2018/08/02.
 */
public interface OrderMasterService extends Service<OrderMaster, String> {

    List<OrderMasterDto> findList(OrderMasterCriteria criteria);


}
