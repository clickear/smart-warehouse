package com.deer.wms.base.system.model;
import com.deer.wms.project.seed.core.service.QueryCriteria;
/**
* Created by  on 2018/06/28.
*/
public class ItemInfoCriteria extends QueryCriteria {
    private String   keyWords;
   private  String  itemTypeCode;
    private Integer  companyId;
    private String  itemCode;
    private String supplierCode;
    private String clientCode;
    private String  supplierName;
    private String  clientName;
    private String  unitCode;

    public String getUnitCode() {
        return unitCode;
    }

    public void setUnitCode(String unitCode) {
        this.unitCode = unitCode;
    }

    public String getSupplierName() {
        return supplierName;
    }

    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getSupplierCode() {
        return supplierCode;
    }

    public void setSupplierCode(String supplierCode) {
        this.supplierCode = supplierCode;
    }

    public String getClientCode() {
        return clientCode;
    }

    public void setClientCode(String clientCode) {
        this.clientCode = clientCode;
    }

    public String getItemCode() {
        return itemCode;
    }

    public void setItemCode(String itemCode) {
        this.itemCode = itemCode;
    }

    public String getKeyWords() {
        return keyWords;
    }

    public void setKeyWords(String keyWords) {
        this.keyWords = keyWords;
    }

    public String getItemTypeCode() {
        return itemTypeCode;
    }

    public void setItemTypeCode(String itemTypeCode) {
        this.itemTypeCode = itemTypeCode;
    }

    public Integer getCompanyId() {
        return companyId;
    }


  public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }
}