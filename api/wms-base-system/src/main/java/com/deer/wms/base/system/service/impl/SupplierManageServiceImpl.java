package com.deer.wms.base.system.service.impl;

import com.deer.wms.base.system.dao.SupplierManageMapper;
import com.deer.wms.base.system.model.SupplierManage;
import com.deer.wms.base.system.model.SupplierManageCriteria;
import com.deer.wms.base.system.service.SupplierManageService;
import com.deer.wms.project.seed.core.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by  on 2018/07/04.
 */
@Service
@Transactional
public class SupplierManageServiceImpl extends AbstractService<SupplierManage, Integer> implements SupplierManageService {

    @Autowired
    private SupplierManageMapper supplierManageMapper;

    @Override
    public void deleteByCodeAndCom(SupplierManageCriteria criteria) {
        supplierManageMapper.deleteByCodeAndCom(criteria);
    }

    @Override
    public List<SupplierManage> findList(SupplierManageCriteria criteria) {
        return supplierManageMapper.findList(criteria);
    }
}
