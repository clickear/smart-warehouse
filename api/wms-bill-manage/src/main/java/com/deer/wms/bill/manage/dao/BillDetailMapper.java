package com.deer.wms.bill.manage.dao;

import com.deer.wms.bill.manage.model.BillDetail;
import com.deer.wms.bill.manage.model.BillDetailCriteria;
import com.deer.wms.bill.manage.model.BillDetailDto;
import com.deer.wms.project.seed.core.mapper.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface BillDetailMapper extends Mapper<BillDetail> {
    List<BillDetailDto> findList(BillDetailCriteria criteria);
    void deleteByC(BillDetailCriteria criteria);

    List<BillDetailDto> findYesterday(BillDetailCriteria criteria);
    List<BillDetailDto> findShangYue(BillDetailCriteria criteria);

    void updateState(@Param("detailNo")String detailNo);
}