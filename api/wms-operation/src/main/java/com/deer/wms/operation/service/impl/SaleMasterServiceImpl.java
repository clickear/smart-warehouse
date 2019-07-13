package com.deer.wms.operation.service.impl;
import com.deer.wms.operation.dao.SaleMasterMapper;
import com.deer.wms.operation.model.*;
import com.deer.wms.operation.service.SaleDetailService;
import com.deer.wms.operation.service.SaleMasterService;
import com.deer.wms.project.seed.core.service.AbstractService;
import com.deer.wms.project.seed.util.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by  on 2018/07/25.
 */
@Service
@Transactional
public class SaleMasterServiceImpl extends AbstractService<SaleMaster, Integer> implements SaleMasterService {

    @Autowired
    private SaleMasterMapper saleMasterMapper;
    @Autowired
    private SaleDetailService saleDetailService;
    @Override
    public void insert(Insert insert) {

        SaleMaster saleMaster = insert.getSaleMaster();
        saleMaster.setAddTime(DateUtils.dateToStr(new Date(),"yyyy-MM-dd HH:mm:ss"));

        save(saleMaster);
        List<SaleDetail> details = insert.getList();
        for(SaleDetail detail :details){
            detail.setSaleNo(saleMaster.getSaleNo());
            detail.setRequestSupplyTime(saleMaster.getRequestSupplyTime());
            detail.setAddTime(DateUtils.dateToStr(new Date(),"yyyy-MM-dd HH:mm:ss"));
            detail.setStatus(0);
        }
        saleDetailService.save(details);



    }

    @Override
    public List<SaleMasterDto> findList(SaleMasterCriteria criteria) {
        return saleMasterMapper.findList(criteria);
    }
}
