package com.deer.wms.finance.service.impl;
import com.deer.wms.finance.dao.ManagePayMapper;
import com.deer.wms.finance.model.ManagePay;
import com.deer.wms.finance.model.ManagePayCriteria;
import com.deer.wms.finance.model.ManagePayDto;
import com.deer.wms.finance.service.ManagePayService;
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
public class ManagePayServiceImpl extends AbstractService<ManagePay, Integer> implements ManagePayService {

    @Autowired
    private ManagePayMapper managePayMapper;

    @Override
    public void deleteByCodeAndCom(ManagePayCriteria criteria) {
        managePayMapper.deleteByCodeAndCom(criteria);
    }

    @Override
    public List<ManagePayDto> findList(ManagePayCriteria criteria) {
        return managePayMapper.findList(criteria);
    }
}
