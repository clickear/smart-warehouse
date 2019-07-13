package com.deer.wms.system.manage.model.storage;

import java.util.Date;

/**
 * 网点/仓储点列表信息视图类
 *
 * Created by Floki on 2017/10/8.
 */
public class StorageListVO {
    /**
     * 网点/仓储点信息id
     */
    private Integer storageId;

    /**
     * 名称
     */
    private String storageName;

    /**
     * 地址
     */
    private String address;

    /**
     * 电话
     */
    private String phone;

    /**
     * 联系人/负责人
     */
    private String linkmanName;

    /**
     * 创建时间/注册时间
     */
    private String createTime;

    public Integer getStorageId() {
        return storageId;
    }

    public void setStorageId(Integer storageId) {
        this.storageId = storageId;
    }

    public String getStorageName() {
        return storageName;
    }

    public void setStorageName(String storageName) {
        this.storageName = storageName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getLinkmanName() {
        return linkmanName;
    }

    public void setLinkmanName(String linkmanName) {
        this.linkmanName = linkmanName;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }
}
