package com.deer.wms.base.system.service;
import com.deer.wms.base.system.model.ClientManage;
import com.deer.wms.base.system.model.ClientManageCriteria;
import com.deer.wms.project.seed.core.service.Service;

import java.util.List;

/**
 * Created by  on 2018/07/04.
 */
public interface ClientManageService extends Service<ClientManage, Integer> {
    void deleteByCodeAndCom(ClientManageCriteria criteria);
    List<ClientManage> findList(ClientManageCriteria  criteria);

}
