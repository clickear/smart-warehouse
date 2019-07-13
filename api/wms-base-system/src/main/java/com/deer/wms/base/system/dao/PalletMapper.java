package com.deer.wms.base.system.dao;
import com.deer.wms.base.system.model.Pallet;
import com.deer.wms.base.system.model.PalletCriteria;
import com.deer.wms.base.system.model.PalletDto;
import com.deer.wms.project.seed.core.mapper.Mapper;
import java.util.List;

public interface PalletMapper extends Mapper<Pallet> {

    void  deleteByCodeAndCom(PalletCriteria criteria);
    List<PalletDto> findList(PalletCriteria criteria);

}