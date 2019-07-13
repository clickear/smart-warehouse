package com.deer.wms.base.system.service;
import com.deer.wms.base.system.model.*;
import com.deer.wms.project.seed.core.service.Service;
import java.util.List;
/**
 * Created by  on 2018/06/20.
 */
public interface ShelfInfoService extends Service<ShelfInfo, Integer> {
    void  deleteByCodeAndCom(ShelfInfoCriteria criteria);
    List<ShelfInfoDto> findList(ShelfInfoCriteria criteria);
}
