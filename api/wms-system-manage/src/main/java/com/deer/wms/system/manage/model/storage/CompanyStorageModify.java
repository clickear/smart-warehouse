package com.deer.wms.system.manage.model.storage;

/**
 * 修改的网点/仓储点信息
 *
 * Created by Floki on 2017/10/8.
 */
public class CompanyStorageModify extends CompanyStorageCreate {
    /**
     * 网点/仓储点信息id
     */
    private Integer storageId;

    public Integer getStorageId() {
        return storageId;
    }

    public void setStorageId(Integer storageId) {
        this.storageId = storageId;
    }
}
