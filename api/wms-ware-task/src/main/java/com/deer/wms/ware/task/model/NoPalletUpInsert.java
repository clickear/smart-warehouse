package com.deer.wms.ware.task.model;

import java.util.List;

public class NoPalletUpInsert {

    private String cellCode;

    private List<BatchCell> batchCells;

    public String getCellCode() {
        return cellCode;
    }

    public void setCellCode(String cellCode) {
        this.cellCode = cellCode;
    }

    public List<BatchCell> getBatchCells() {
        return batchCells;
    }

    public void setBatchCells(List<BatchCell> batchCells) {
        this.batchCells = batchCells;
    }
}
