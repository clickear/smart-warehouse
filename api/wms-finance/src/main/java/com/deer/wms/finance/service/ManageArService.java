package com.deer.wms.finance.service;
import com.deer.wms.finance.model.ManageAr;
import com.deer.wms.finance.model.ManageArCriteria;
import com.deer.wms.finance.model.ManageArDto;
import com.deer.wms.project.seed.core.service.Service;

import java.util.List;

/**
 * Created by  on 2018/07/04.
 */
public interface ManageArService extends Service<ManageAr, Integer> {
    void deleteByCodeAndCom(ManageArCriteria criteria);
    List<ManageArDto> findList(ManageArCriteria criteria);



}
