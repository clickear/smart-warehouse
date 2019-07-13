package com.deer.wms.system.manage.dao;

import com.deer.wms.project.seed.core.mapper.Mapper;
import com.deer.wms.system.manage.model.storage.StorageBase;

import java.util.List;

public interface StorageBaseMapper extends Mapper<StorageBase> {

    void deleteByStorageId(Integer storageId);


    List<StorageBase> findByStorageId(Integer storageId);
}
