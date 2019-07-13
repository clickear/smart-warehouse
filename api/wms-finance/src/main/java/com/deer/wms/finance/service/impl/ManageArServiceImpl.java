package com.deer.wms.finance.service.impl;
import com.deer.wms.finance.dao.ManageArMapper;
import com.deer.wms.finance.model.ManageAr;
import com.deer.wms.finance.model.ManageArCriteria;
import com.deer.wms.finance.model.ManageArDto;
import com.deer.wms.finance.service.ManageArService;
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
public class ManageArServiceImpl extends AbstractService<ManageAr, Integer> implements ManageArService {

    @Autowired
    private ManageArMapper manageArMapper;

    @Override
    public void deleteByCodeAndCom(ManageArCriteria criteria) {
        manageArMapper.deleteByCodeAndCom(criteria);
    }

    @Override
    public List<ManageArDto> findList(ManageArCriteria criteria) {
        return manageArMapper.findList(criteria);
    }
}
