package com.deer.wms.operation.service.impl;
import com.deer.wms.operation.dao.OrderDetailMapper;
import com.deer.wms.operation.model.OrderDetail;
import com.deer.wms.operation.model.OrderDetailCriteria;
import com.deer.wms.operation.model.OrderDetailDto;
import com.deer.wms.operation.service.OrderDetailService;
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
public class OrderDetailServiceImpl extends AbstractService<OrderDetail, String> implements OrderDetailService {

    @Autowired
    private OrderDetailMapper orderDetailMapper;


    @Override
    public List<OrderDetailDto> findList(OrderDetailCriteria criteria) {
        return orderDetailMapper.findList(criteria);
    }

    @Override
    public void deleteByC(OrderDetailCriteria criteria) {
            orderDetailMapper.deleteByC(criteria);
    }
}
