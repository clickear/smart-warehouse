package com.deer.wms.bill.manage.model;

import javax.persistence.*;

@Table(name = "cell_item")
public class CellItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "cell_code")
    private String cellCode;

    @Column(name = "item_code")
    private String itemCode;

    private Integer quantity;

    @Column(name = "pallet_bar_code")
    private String palletBarCode;

    public CellItem() {

    }

    /**
     * @return id
     */
    public Integer getId() {
        return id;
    }

    public CellItem(Integer quantity) {
        this.quantity = quantity;
    }

    /**
     * @param id
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * @return cell_code
     */
    public String getCellCode() {
        return cellCode;
    }

    /**
     * @param cellCode
     */
    public void setCellCode(String cellCode) {
        this.cellCode = cellCode;
    }

    /**
     * @return item_code
     */
    public String getItemCode() {
        return itemCode;
    }

    /**
     * @param itemCode
     */
    public void setItemCode(String itemCode) {
        this.itemCode = itemCode;
    }

    /**
     * @return quantity
     */
    public Integer getQuantity() {
        return quantity;
    }

    /**
     * @param quantity
     */
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    /**
     * @return pallet_bar_code
     */
    public String getPalletBarCode() {
        return palletBarCode;
    }

    /**
     * @param palletBarCode
     */
    public void setPalletBarCode(String palletBarCode) {
        this.palletBarCode = palletBarCode;
    }
}