package com.deer.wms.ware.task.model;

import com.deer.wms.project.seed.core.service.QueryCriteria;
import com.deer.wms.project.seed.util.DateUtils;

import java.util.List;

public class PrepareInsert   {

    private String taskBatch ;
    private String billNo;
    private Integer prepareType;   /*  1：先进先出  2 ：清理货位优先  3：路径优先  */

    public String getBillNo() {
        return billNo;
    }

    public void setBillNo(String billNo) {
        this.billNo = billNo;
    }

    public Integer getPrepareType() {
        return prepareType;
    }

    public void setPrepareType(Integer prepareType) {
        this.prepareType = prepareType;
    }

    public String getTaskBatch() {
        return taskBatch;
    }

    public void setTaskBatch(String taskBatch) {
        this.taskBatch =DateUtils.getNowDateString()+ '-'+ taskBatch;
    }
}
