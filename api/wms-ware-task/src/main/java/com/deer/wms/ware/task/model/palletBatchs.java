package com.deer.wms.ware.task.model;

import java.util.ArrayList;
import java.util.List;

public class palletBatchs {

      Integer palletId;
      String palletCode;
      String palletName;
      private Integer palletType;
      List<PalletBatchDto> palletBatchList =new ArrayList<PalletBatchDto>();

    public String getPalletName() {
        return palletName;
    }

    public void setPalletName(String palletName) {
        this.palletName = palletName;
    }

    public Integer getPalletId() {
        return palletId;
    }

    public void setPalletId(Integer palletId) {
        this.palletId = palletId;
    }

    public String getPalletCode() {
        return palletCode;
    }

    public void setPalletCode(String palletCode) {
        this.palletCode = palletCode;
    }

    public List<PalletBatchDto> getPalletBatchList() {
        return palletBatchList;
    }

    public void setPalletBatchList(List<PalletBatchDto> palletBatchList) {
        this.palletBatchList = palletBatchList;
    }

    public Integer getPalletType() {
        return palletType;
    }

    public void setPalletType(Integer palletType) {
        this.palletType = palletType;
    }
}
