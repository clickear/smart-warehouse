package com.deer.wms.base.system.service;
import com.deer.wms.base.system.model.WareInfo;
import com.deer.wms.base.system.model.WareInfoCriteria;
import com.deer.wms.base.system.model.WareInfoDto;
import com.deer.wms.project.seed.core.service.Service;
import java.util.List;


/**
 * Created by  on 2018/06/20.
 */
public interface WareInfoService extends Service<WareInfo, Integer> {


    void  deleteByCodeAndCom(WareInfoCriteria criteria);

    List<WareInfoDto> findList(WareInfoCriteria criteria);
}
