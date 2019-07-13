package com.deer.wms.report.service;

import com.deer.wms.report.model.AreaItem;
import com.deer.wms.project.seed.core.service.Service;
import com.deer.wms.report.model.AreaItemCriteria;
import com.deer.wms.report.model.AreaItemDto;

import java.util.List;

/**
 * Created by 郭靖勋 on 2018/07/10.
 */
public interface AreaItemService extends Service<AreaItem, Integer> {

    List<AreaItemDto> findList(AreaItemCriteria criteria);

    void accept(AreaItem areaItem,Integer type);

}
