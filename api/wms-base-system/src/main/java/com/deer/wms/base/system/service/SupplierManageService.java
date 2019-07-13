package com.deer.wms.base.system.service;
import com.deer.wms.base.system.model.SupplierManage;
import com.deer.wms.base.system.model.SupplierManageCriteria;
import com.deer.wms.project.seed.core.service.Service;
import java.util.List;


/**
 * Created by  on 2018/07/04.
 */
public interface SupplierManageService extends Service<SupplierManage, Integer> {
    void  deleteByCodeAndCom(SupplierManageCriteria criteria);
    List<SupplierManage> findList(SupplierManageCriteria criteria);
}
