package com.deer.wms.bill.manage.dao;

import com.deer.wms.bill.manage.model.*;
import com.deer.wms.project.seed.core.mapper.Mapper;

import java.util.List;

public interface CellItemMapper extends Mapper<CellItem> {


    List<CellItemDto> findList(CellItemCriteria criteria);

    List<NoUpShelf> findNoUpShelfList(NoUpShelfCriteria criteria);
}