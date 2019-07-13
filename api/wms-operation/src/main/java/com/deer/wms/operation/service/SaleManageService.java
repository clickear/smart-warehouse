package com.deer.wms.operation.service;
import com.deer.wms.operation.model.SaleManage;
import com.deer.wms.operation.model.SaleManageCriteria;
import com.deer.wms.operation.model.SaleManageDto;
import com.deer.wms.project.seed.core.service.Service;

import java.util.List;


/**
 * Created by  on 2018/07/11.
 */
public interface SaleManageService extends Service<SaleManage, Integer> {
    void deleteByCodeAndCom(SaleManageCriteria criteria);
    List<SaleManageDto> findList(SaleManageCriteria criteria);




}
