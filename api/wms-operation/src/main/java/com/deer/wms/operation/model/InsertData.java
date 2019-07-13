package com.deer.wms.operation.model;

import java.util.List;

public class InsertData {

    private OrderMaster orderMaster;
    private List<OrderDetail> orderDetails;

    public OrderMaster getOrderMaster() { return orderMaster; }

    public void setOrderMaster(OrderMaster orderMaster) { this.orderMaster = orderMaster; }

    public List<OrderDetail> getOrderDetails() { return orderDetails; }

    public void setOrderDetails(List<OrderDetail> orderDetails) { this.orderDetails = orderDetails; }
}
