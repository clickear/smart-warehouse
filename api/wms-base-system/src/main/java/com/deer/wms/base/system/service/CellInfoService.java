package com.deer.wms.base.system.service;
import com.deer.wms.base.system.model.CellInfo;
import com.deer.wms.base.system.model.CellInfoCriteria;
import com.deer.wms.base.system.model.CellInfoDto;
import com.deer.wms.base.system.model.ShelfInfo;
import com.deer.wms.project.seed.core.service.Service;
import java.util.List;
/**
 * Created by  on 2018/06/20.
 */
public interface CellInfoService extends Service<CellInfo, Integer> {
    void  deleteByCodeAndCom(CellInfoCriteria criteria);
    List<CellInfoDto> findList(CellInfoCriteria criteria);
    CellInfo findByCellCode(String cellCode);

    //设置货位优先级
    void setOrder(ShelfInfo shelfInfo);



}
