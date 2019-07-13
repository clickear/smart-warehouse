package com.deer.wms.bill.manage.service;

import com.deer.wms.bill.manage.model.BillMaster;
import com.deer.wms.bill.manage.model.BillMasterCriteria;
import com.deer.wms.bill.manage.model.BillMasterDto;
import com.deer.wms.bill.manage.model.TongJi;
import com.deer.wms.project.seed.core.service.Service;

import java.util.List;

/**
 * Created by guo on 2018/07/05.
 */
public interface BillMasterService extends Service<BillMaster, String> {

    List<BillMasterDto> findList(BillMasterCriteria criteria);

    TongJi tongji(BillMasterCriteria criteria);

    void allotCreateInAndOut(BillMaster billMaster);


    void updateState(String billNo);
}
