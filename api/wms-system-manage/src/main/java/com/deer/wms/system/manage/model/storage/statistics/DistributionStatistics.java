package com.deer.wms.system.manage.model.storage.statistics;

/**
 * 网点分布情况统计
 *
 * Created by Floki on 2017/10/25.
 */
public class DistributionStatistics {
    /**
     * 直营网点总数
     */
    private int directTotal;

    /**
     * 代理商网点总数
     */
    private int agentTotal;

    /**
     * 客户网点总数
     */
    private int customerTotal;

    /**
     * 托盘总数
     */
    private int palletTotal;

    public int getDirectTotal() {
        return directTotal;
    }

    public void setDirectTotal(int directTotal) {
        this.directTotal = directTotal;
    }

    public int getAgentTotal() {
        return agentTotal;
    }

    public void setAgentTotal(int agentTotal) {
        this.agentTotal = agentTotal;
    }

    public int getCustomerTotal() {
        return customerTotal;
    }

    public void setCustomerTotal(int customerTotal) {
        this.customerTotal = customerTotal;
    }

    public int getPalletTotal() {
        return palletTotal;
    }

    public void setPalletTotal(int palletTotal) {
        this.palletTotal = palletTotal;
    }
}
