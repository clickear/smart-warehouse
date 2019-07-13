package com.deer.wms.base.system.service;
import com.deer.wms.base.system.model.Pallet;
import com.deer.wms.base.system.model.PalletCriteria;
import com.deer.wms.base.system.model.PalletDto;
import com.deer.wms.project.seed.core.service.Service;
import java.util.List;

/**
 * Created by  on 2018/06/29.
 */
public interface PalletService extends Service<Pallet, Integer> {

        void deleteByCodeAndCom(PalletCriteria criteria);
        List<PalletDto> findList(PalletCriteria criteria);


}
