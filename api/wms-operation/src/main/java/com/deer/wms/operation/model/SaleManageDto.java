package com.deer.wms.operation.model;

public class SaleManageDto extends SaleManage {
    private  String    itemName;
    private  String     unitName;
    private  String   clientName;
    private  Integer    companyId;

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getUnitName() {
        return unitName;
    }

    public void setUnitName(String unitName) {
        this.unitName = unitName;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    @Override
    public Integer getCompanyId() {
        return companyId;
    }

    @Override
    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }
}
