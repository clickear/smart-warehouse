package com.deer.wms.finance.service;
import com.deer.wms.finance.model.ManagePay;
import com.deer.wms.finance.model.ManagePayCriteria;
import com.deer.wms.finance.model.ManagePayDto;
import com.deer.wms.project.seed.core.service.Service;

import java.util.List;

/**
 * Created by  on 2018/07/04.
 */
public interface ManagePayService extends Service<ManagePay, Integer> {
    void  deleteByCodeAndCom(ManagePayCriteria criteria );
    List<ManagePayDto> findList(ManagePayCriteria criteria);
}
