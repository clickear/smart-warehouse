package com.deer.wms.system.manage.model.storage;

import javax.persistence.*;
import java.util.Date;

@Table(name = "company_storage")
public class CompanyStorage {
    /**
     * 仓储点信息id
     */
    @Id
    @Column(name = "storage_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer storageId;

    /**
     * 企业信息id
     */
    @Column(name = "company_id")
    private Integer companyId;

    /**
     * 类型：1=网点；2=仓储点；
     */
    @Column(name = "storage_type")
    private String storageType;

    /**
     * 名称
     */
    @Column(name = "storage_name")
    private String storageName;

    /**
     * 所在省份
     */
    private String province;

    /**
     * 所在城市
     */
    private String city;

    /**
     * 地址
     */
    private String address;

    /**
     * 电话
     */
    private String phone;

    /**
     * 联系人
     */
    @Column(name = "linkman_name")
    private String linkmanName;

    /**
     * 经度
     */
    private String lng;

    /**
     * 纬度
     */
    private String lat;



    /**
     * 信息状态：normal=正常的；invalid=无效的；deleted=已删除；默认正常的
     */
    private String state;

    /**
     * 创建人
     */
    @Column(name = "create_user_id")
    private Integer createUserId;

    /**
     * 创建时间
     */
    @Column(name = "create_time")
    private Date createTime;

    /**
     * 修改人
     */
    @Column(name = "modify_user_id")
    private Integer modifyUserId;

    /**
     * 修改时间
     */
    @Column(name = "modify_time")
    private Date modifyTime;



    /**
     * 获取仓储点信息id
     *
     * @return storage_id - 仓储点信息id
     */
    public Integer getStorageId() {
        return storageId;
    }

    /**
     * 设置仓储点信息id
     *
     * @param storageId 仓储点信息id
     */
    public void setStorageId(Integer storageId) {
        this.storageId = storageId;
    }

    /**
     * 获取企业信息id
     *
     * @return company_id - 企业信息id
     */
    public Integer getCompanyId() {
        return companyId;
    }

    /**
     * 设置企业信息id
     *
     * @param companyId 企业信息id
     */
    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    /**
     * 获取类型：1=网点；2=仓储点；
     *
     * @return storage_type - 类型：1=网点；2=仓储点；
     */
    public String getStorageType() {
        return storageType;
    }

    /**
     * 设置类型：1=网点；2=仓储点；
     *
     * @param storageType 类型：1=网点；2=仓储点；
     */
    public void setStorageType(String storageType) {
        this.storageType = storageType;
    }

    /**
     * 获取名称
     *
     * @return storage_name - 名称
     */
    public String getStorageName() {
        return storageName;
    }

    /**
     * 设置名称
     *
     * @param storageName 名称
     */
    public void setStorageName(String storageName) {
        this.storageName = storageName;
    }

    /**
     * 获取所在省份
     *
     * @return province - 所在省份
     */
    public String getProvince() {
        return province;
    }

    /**
     * 设置所在省份
     *
     * @param province 所在省份
     */
    public void setProvince(String province) {
        this.province = province;
    }

    /**
     * 获取所在城市
     *
     * @return city - 所在城市
     */
    public String getCity() {
        return city;
    }

    /**
     * 设置所在城市
     *
     * @param city 所在城市
     */
    public void setCity(String city) {
        this.city = city;
    }

    /**
     * 获取地址
     *
     * @return address - 地址
     */
    public String getAddress() {
        return address;
    }

    /**
     * 设置地址
     *
     * @param address 地址
     */
    public void setAddress(String address) {
        this.address = address;
    }

    /**
     * 获取电话
     *
     * @return phone - 电话
     */
    public String getPhone() {
        return phone;
    }

    /**
     * 设置电话
     *
     * @param phone 电话
     */
    public void setPhone(String phone) {
        this.phone = phone;
    }

    /**
     * 获取联系人
     *
     * @return linkman_name - 联系人
     */
    public String getLinkmanName() {
        return linkmanName;
    }

    /**
     * 设置联系人
     *
     * @param linkmanName 联系人
     */
    public void setLinkmanName(String linkmanName) {
        this.linkmanName = linkmanName;
    }

    /**
     * 获取经度
     *
     * @return log - 经度
     */
    public String getLng() {
        return lng;
    }

    /**
     * 设置经度
     *
     * @param lng 经度
     */
    public void setLng(String lng) {
        this.lng = lng;
    }

    /**
     * 获取纬度
     *
     * @return lat - 纬度
     */
    public String getLat() {
        return lat;
    }

    /**
     * 设置纬度
     *
     * @param lat 纬度
     */
    public void setLat(String lat) {
        this.lat = lat;
    }



    /**
     * 获取信息状态：normal=正常的；invalid=无效的；deleted=已删除；默认正常的
     *
     * @return state - 信息状态：normal=正常的；invalid=无效的；deleted=已删除；默认正常的
     */
    public String getState() {
        return state;
    }

    /**
     * 设置信息状态：normal=正常的；invalid=无效的；deleted=已删除；默认正常的
     *
     * @param state 信息状态：normal=正常的；invalid=无效的；deleted=已删除；默认正常的
     */
    public void setState(String state) {
        this.state = state;
    }

    /**
     * 获取创建人
     *
     * @return create_user_id - 创建人
     */
    public Integer getCreateUserId() {
        return createUserId;
    }

    /**
     * 设置创建人
     *
     * @param createUserId 创建人
     */
    public void setCreateUserId(Integer createUserId) {
        this.createUserId = createUserId;
    }

    /**
     * 获取创建时间
     *
     * @return create_time - 创建时间
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * 设置创建时间
     *
     * @param createTime 创建时间
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    /**
     * 获取修改人
     *
     * @return modify_user_id - 修改人
     */
    public Integer getModifyUserId() {
        return modifyUserId;
    }

    /**
     * 设置修改人
     *
     * @param modifyUserId 修改人
     */
    public void setModifyUserId(Integer modifyUserId) {
        this.modifyUserId = modifyUserId;
    }

    /**
     * 获取修改时间
     *
     * @return modify_time - 修改时间
     */
    public Date getModifyTime() {
        return modifyTime;
    }

    /**
     * 设置修改时间
     *
     * @param modifyTime 修改时间
     */
    public void setModifyTime(Date modifyTime) {
        this.modifyTime = modifyTime;
    }
}