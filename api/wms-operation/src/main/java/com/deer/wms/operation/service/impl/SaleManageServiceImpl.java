package com.deer.wms.operation.service.impl;
import com.deer.wms.operation.dao.SaleManageMapper;
import com.deer.wms.operation.model.SaleManage;
import com.deer.wms.operation.model.SaleManageCriteria;
import com.deer.wms.operation.model.SaleManageDto;
import com.deer.wms.operation.service.SaleManageService;
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
public class SaleManageServiceImpl extends AbstractService<SaleManage, Integer> implements SaleManageService {

    @Autowired
    private SaleManageMapper saleManageMapper;

    @Override
    public void deleteByCodeAndCom(SaleManageCriteria criteria) {
            saleManageMapper.deleteByCodeAndCom(criteria);
    }

    @Override
    public List<SaleManageDto> findList(SaleManageCriteria criteria) {
        return saleManageMapper.findList(criteria);
    }
}
