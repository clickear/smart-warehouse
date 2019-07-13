package com.deer.wms.base.system.service.impl;
import com.deer.wms.base.system.dao.PalletMapper;
import com.deer.wms.base.system.model.Pallet;
import com.deer.wms.base.system.model.PalletCriteria;
import com.deer.wms.base.system.model.PalletDto;
import com.deer.wms.base.system.service.PalletService;
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
public class PalletServiceImpl extends AbstractService<Pallet, Integer> implements PalletService {

    @Autowired
    private PalletMapper palletMapper;

    @Override
    public void deleteByCodeAndCom(PalletCriteria criteria) {
        palletMapper.deleteByCodeAndCom(criteria);
    }

    @Override
    public List<PalletDto> findList(PalletCriteria criteria) {
        return palletMapper.findList(criteria);
    }



}
