package com.deer.wms.base.system.model;

import javax.persistence.*;

@Table(name = "item_type")
public class ItemType {
    @Id
    @Column(name = "item_type_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer itemTypeId;

    @Column(name = "item_type_code")
    private String itemTypeCode;

    @Column(name = "item_type_name")
    private String itemTypeName;

    @Column(name = "item_type_state")
    private Integer itemTypeState;

    @Column(name = "company_id")
    private Integer companyId;

    @Column(name = "memo")
    private String  memo;

    /**
     * @return item_type_id
     */
    public Integer getItemTypeId() {
        return itemTypeId;
    }

    /**
     * @param itemTypeId
     */
    public void setItemTypeId(Integer itemTypeId) {
        this.itemTypeId = itemTypeId;
    }

    /**
     * @return item_type_code
     */
    public String getItemTypeCode() {
        return itemTypeCode;
    }

    /**
     * @param itemTypeCode
     */
    public void setItemTypeCode(String itemTypeCode) {
        this.itemTypeCode = itemTypeCode;
    }

    /**
     * @return item_type_name
     */
    public String getItemTypeName() {
        return itemTypeName;
    }

    /**
     * @param itemTypeName
     */
    public void setItemTypeName(String itemTypeName) {
        this.itemTypeName = itemTypeName;
    }

    /**
     * @return item_type_state
     */
    public Integer getItemTypeState() {
        return itemTypeState;
    }

    /**
     * @param itemTypeState
     */
    public void setItemTypeState(Integer itemTypeState) {
        this.itemTypeState = itemTypeState;
    }

    /**
     * @return company_id
     */
    public Integer getCompanyId() {
        return companyId;
    }

    /**
     * @param companyId
     */
    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }
}