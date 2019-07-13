package com.deer.wms.operation.service.impl;
import com.deer.wms.operation.dao.OrderMasterMapper;
import com.deer.wms.operation.model.OrderMaster;
import com.deer.wms.operation.model.OrderMasterCriteria;
import com.deer.wms.operation.model.OrderMasterDto;
import com.deer.wms.operation.service.OrderMasterService;
import com.deer.wms.project.seed.core.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by  on 2018/08/02.
 */
@Service
@Transactional
public class OrderMasterServiceImpl extends AbstractService<OrderMaster, String> implements OrderMasterService {

    @Autowired
    private OrderMasterMapper orderMasterMapper;

    @Override
    public List<OrderMasterDto> findList(OrderMasterCriteria criteria) {
        return orderMasterMapper.findList(criteria);
    }



}
