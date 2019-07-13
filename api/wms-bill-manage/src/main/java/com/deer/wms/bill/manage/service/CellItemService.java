package com.deer.wms.bill.manage.service;

import com.deer.wms.bill.manage.model.*;
import com.deer.wms.project.seed.core.service.Service;

import java.util.List;

/**
 * Created by guo on 2018/07/19.
 */
public interface CellItemService extends Service<CellItem, Integer> {


    List<CellItemDto> findList(CellItemCriteria criteria);

    List<NoUpShelf> findNoUpShelfList(NoUpShelfCriteria criteria);
}
