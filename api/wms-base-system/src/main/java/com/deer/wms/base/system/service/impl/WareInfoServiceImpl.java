package com.deer.wms.base.system.service.impl;
import com.deer.wms.base.system.dao.WareInfoMapper;
import com.deer.wms.base.system.model.*;
import com.deer.wms.base.system.service.WareInfoService;
import com.deer.wms.project.seed.core.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

/**
 * Created by  on 2018/06/20.
 */
@Service
@Transactional
public class WareInfoServiceImpl extends AbstractService<WareInfo, Integer> implements WareInfoService {

    @Autowired
    private WareInfoMapper wareInfoMapper;


    @Override
    public void deleteByCodeAndCom(WareInfoCriteria criteria) {
        wareInfoMapper.deleteByCodeAndCom(criteria);
    }

    @Override
    public List<WareInfoDto> findList(WareInfoCriteria criteria) {
        return wareInfoMapper.findList(criteria);
    }

}
