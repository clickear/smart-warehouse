package com.deer.wms.ware.task.model;

import java.util.List;

public class PrepareData {
     private List<PalletBatchDto> xian ;
    private List<PalletBatchDto> qing ;
    private List<PalletBatchDto> lu ;

    public List<PalletBatchDto> getXian() {
        return xian;
    }

    public void setXian(List<PalletBatchDto> xian) {
        this.xian = xian;
    }

    public List<PalletBatchDto> getQing() {
        return qing;
    }

    public void setQing(List<PalletBatchDto> qing) {
        this.qing = qing;
    }

    public List<PalletBatchDto> getLu() {
        return lu;
    }

    public void setLu(List<PalletBatchDto> lu) {
        this.lu = lu;
    }
}
