package com.deer.wms.base.system.service.impl;
import com.deer.wms.base.system.dao.ClientManageMapper;
import com.deer.wms.base.system.model.ClientManage;
import com.deer.wms.base.system.model.ClientManageCriteria;
import com.deer.wms.base.system.service.ClientManageService;
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
public class ClientManageServiceImpl extends AbstractService<ClientManage, Integer> implements ClientManageService {

    @Autowired
    private ClientManageMapper clientManageMapper;

    @Override
    public void deleteByCodeAndCom(ClientManageCriteria criteria) {
        clientManageMapper.deleteByCodeAndCom(criteria);
    }

    @Override
    public List<ClientManage> findList(ClientManageCriteria criteria) {
        return clientManageMapper.findList(criteria) ;
    }
}
