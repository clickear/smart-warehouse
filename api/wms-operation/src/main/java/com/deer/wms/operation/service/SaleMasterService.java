package com.deer.wms.operation.service;
import com.deer.wms.operation.model.Insert;
import com.deer.wms.operation.model.SaleMaster;
import com.deer.wms.operation.model.SaleMasterCriteria;
import com.deer.wms.operation.model.SaleMasterDto;
import com.deer.wms.project.seed.core.service.Service;

import java.util.List;

/**
 * Created by  on 2018/07/25.
 */
public interface SaleMasterService extends Service<SaleMaster, Integer> {

    void insert(Insert insert);
    List<SaleMasterDto> findList(SaleMasterCriteria criteria);
}
