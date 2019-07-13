package com.deer.wms.finance.service.impl;
import com.deer.wms.finance.dao.FinanceTypeMapper;
import com.deer.wms.finance.model.FinanceType;
import com.deer.wms.finance.model.FinanceTypeCriteria;
import com.deer.wms.finance.service.FinanceTypeService;
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
public class FinanceTypeServiceImpl extends AbstractService<FinanceType, Integer> implements FinanceTypeService {

    @Autowired
    private FinanceTypeMapper financeTypeMapper;

    @Override
    public void deleteByCodeAndCom(FinanceTypeCriteria criteria) {
        financeTypeMapper.deleteByCodeAndCom(criteria);
    }

    @Override
    public List<FinanceType> findList(FinanceTypeCriteria criteria) {
        return financeTypeMapper.findList(criteria);
    }
}
