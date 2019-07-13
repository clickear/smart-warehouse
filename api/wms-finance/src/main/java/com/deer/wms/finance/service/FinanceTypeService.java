package com.deer.wms.finance.service;
import com.deer.wms.finance.model.FinanceType;
import com.deer.wms.finance.model.FinanceTypeCriteria;
import com.deer.wms.project.seed.core.service.Service;

import java.util.List;


/**
 * Created by  on 2018/07/04.
 */
public interface FinanceTypeService extends Service<FinanceType, Integer> {
    void deleteByCodeAndCom(FinanceTypeCriteria criteria);
    List<FinanceType> findList(FinanceTypeCriteria criteria );
}
