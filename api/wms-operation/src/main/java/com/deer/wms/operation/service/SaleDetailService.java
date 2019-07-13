package com.deer.wms.operation.service;
import com.deer.wms.operation.model.SaleDetail;
import com.deer.wms.operation.model.SaleDetailCriteria;
import com.deer.wms.operation.model.SaleDetailDto;
import com.deer.wms.project.seed.core.service.Service;

import java.util.List;

/**
 * Created by  on 2018/07/25.
 */
public interface SaleDetailService extends Service<SaleDetail, Integer> {

    List<SaleDetailDto> findBySaleNoAndStatus(SaleDetailCriteria criteria);
    List<SaleDetailDto> findList(SaleDetailCriteria criteria);

}
