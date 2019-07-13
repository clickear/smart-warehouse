package com.deer.wms.base.system.service;
import com.deer.wms.base.system.model.Pllet;
import com.deer.wms.base.system.model.PlletCriteria;
import com.deer.wms.base.system.model.PlletDto;
import com.deer.wms.project.seed.core.service.Service;
import java.util.List;

/**
 * Created by  on 2018/06/29.
 */
public interface PlletService extends Service<Pllet, Integer> {

        void deleteByCodeAndCom(PlletCriteria criteria);
        List<PlletDto> findList(PlletCriteria criteria);


}
