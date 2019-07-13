package com.deer.wms.system.manage.model.company;

/**
 * 修改POI客户的信息类
 *
 * Created by Floki on 2017/10/9.
 */
public class CompanyPoiModify extends CompanyPoiCreate {
    /**
     * 企业信息id
     */
    private Integer CompanyId;

    public Integer getCompanyId() {
        return CompanyId;
    }

    public void setCompanyId(Integer companyId) {
        CompanyId = companyId;
    }
}
