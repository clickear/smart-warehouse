package com.deer.wms.operation.service.impl;
import com.deer.wms.operation.dao.SaleDetailMapper;
import com.deer.wms.operation.model.SaleDetail;
import com.deer.wms.operation.model.SaleDetailCriteria;
import com.deer.wms.operation.model.SaleDetailDto;
import com.deer.wms.operation.service.SaleDetailService;
import com.deer.wms.project.seed.core.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by  on 2018/07/25.
 */
@Service
@Transactional
public class SaleDetailServiceImpl extends AbstractService<SaleDetail, Integer> implements SaleDetailService {


    @Autowired
    private SaleDetailMapper saleDetailMapper;

    @Override
    public List<SaleDetailDto> findBySaleNoAndStatus(SaleDetailCriteria criteria) {
        return saleDetailMapper.findBySaleNoAndStatus(criteria);
    }

    @Override
    public List<SaleDetailDto> findList(SaleDetailCriteria criteria) {
        return saleDetailMapper.findList(criteria);
    }
}
