package com.deer.wms.finance.dao;

import com.deer.wms.finance.model.ManageAr;
import com.deer.wms.finance.model.ManageArCriteria;
import com.deer.wms.finance.model.ManageArDto;
import com.deer.wms.project.seed.core.mapper.Mapper;

import java.util.List;

public interface ManageArMapper extends Mapper<ManageAr> {
    void deleteByCodeAndCom(ManageArCriteria criteria);
    List<ManageArDto>findList(ManageArCriteria criteria);
}