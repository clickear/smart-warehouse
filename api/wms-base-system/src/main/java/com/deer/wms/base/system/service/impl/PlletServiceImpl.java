package com.deer.wms.base.system.service.impl;
import com.deer.wms.base.system.dao.PlletMapper;
import com.deer.wms.base.system.model.Pllet;
import com.deer.wms.base.system.model.PlletCriteria;
import com.deer.wms.base.system.model.PlletDto;
import com.deer.wms.base.system.service.PlletService;
import com.deer.wms.project.seed.core.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

/**
 * Created by  on 2018/06/29.
 */
@Service
@Transactional
public class PlletServiceImpl extends AbstractService<Pllet, Integer> implements PlletService {

    @Autowired
    private PlletMapper plletMapper;

    @Override
    public void deleteByCodeAndCom(PlletCriteria criteria) {
        plletMapper.deleteByCodeAndCom(criteria);
    }

    @Override
    public List<PlletDto> findList(PlletCriteria criteria) {
        return plletMapper.findList(criteria);
    }



}
