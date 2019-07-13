package com.deer.wms.operation.service.impl;
import com.deer.wms.operation.dao.OrderManageMapper;
import com.deer.wms.operation.model.OrderManage;
import com.deer.wms.operation.model.OrderManageCriteria;
import com.deer.wms.operation.model.OrderManageDto;
import com.deer.wms.operation.service.OrderManageService;
import com.deer.wms.project.seed.core.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by  on 2018/07/11.
 */
@Service
@Transactional
public class OrderManageServiceImpl extends AbstractService<OrderManage, Integer> implements OrderManageService {

    @Autowired
    private OrderManageMapper orderManageMapper;

    @Override
    public void deleteByCodeAndCom(OrderManageCriteria criteria) {
        orderManageMapper.deleteByCodeAndCom(criteria);
    }

    @Override
    public List<OrderManageDto> findList(OrderManageCriteria criteria) {
        return orderManageMapper.findList(criteria);
    }
}
