package com.deer.wms.base.system.dao;

import com.deer.wms.base.system.model.ClientManage;
import com.deer.wms.base.system.model.ClientManageCriteria;
import com.deer.wms.project.seed.core.mapper.Mapper;

import java.util.List;

public interface ClientManageMapper extends Mapper<ClientManage> {
    void deleteByCodeAndCom(ClientManageCriteria criteria);
    List<ClientManage> findList(ClientManageCriteria criteria);
}