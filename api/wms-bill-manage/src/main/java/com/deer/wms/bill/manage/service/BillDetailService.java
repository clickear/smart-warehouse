package com.deer.wms.bill.manage.service;

import com.deer.wms.bill.manage.model.BillDetail;
import com.deer.wms.bill.manage.model.BillDetailCriteria;
import com.deer.wms.bill.manage.model.BillDetailDto;
import com.deer.wms.project.seed.core.service.Service;

import java.util.List;

/**
 * Created by guo on 2018/07/05.
 */
public interface BillDetailService extends Service<BillDetail, String> {

    List<BillDetailDto> findList(BillDetailCriteria criteria);
    void deleteByC(BillDetailCriteria criteria);


    List<BillDetailDto> findYesterday(BillDetailCriteria criteria);

    List<BillDetailDto> findShangYue(BillDetailCriteria criteria);

    void updateState(String detailNo);
}
