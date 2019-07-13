package com.deer.wms.operation.model;

public class OrderMasterDto extends OrderMaster {

    private String companyName;
    private String  supplierName;
    private String  supplierSite;
    private Integer  orderTotal;
    private String  adder;

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getSupplierName() {
        return supplierName;
    }

    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }

    @Override
    public String getSupplierSite() {
        return supplierSite;
    }

    @Override
    public void setSupplierSite(String supplierSite) {
        this.supplierSite = supplierSite;
    }

    @Override
    public Integer getOrderTotal() {
        return orderTotal;
    }

    @Override
    public void setOrderTotal(Integer orderTotal) {
        this.orderTotal = orderTotal;
    }

    @Override
    public String getAdder() {
        return adder;
    }

    @Override
    public void setAdder(String adder) {
        this.adder = adder;
    }
}
