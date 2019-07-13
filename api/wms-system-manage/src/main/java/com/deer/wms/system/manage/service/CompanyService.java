package com.deer.wms.system.manage.service;

import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.project.seed.core.service.Service;
import com.deer.wms.system.manage.model.company.*;

import java.util.List;

/**
 * Created by WUXB on 2017/10/01.
 */
public interface CompanyService extends Service<Company, Integer> {

    /**
     * 查找企业信息
     *
     * @param criteria 查找条件
     * @return 返回符合查找条件的企业信息列表
     */
    List<CompanyListVO> findCompanyFormList(CompanyCriteria criteria);

    /**
     * 查找指定企业的详细信息
     *
     * @param criteria 查找条件
     * @return 企业的详细信息
     */
    CompanyDetailVO findCompany(CompanyCriteria criteria);

    /**
     * 修改企业信息
     *
     * @param modify 修改的企业信息
     * @param currentUser 当前操作人员信息
     */
    void modifyCompany(CompanyModify modify, CurrentUser currentUser);

    /**
     * 添加POI客户单位信息
     *
     * @param create POI客户单位信息
     * @param currentUser 当前操作人员信息
     */
    void createCompany(CompanyCreate create, CurrentUser currentUser);

    /**
     * 查找存量的信息
     *
     * @param criteria 查找条件
     * @return 企业的存量的信息
     */
    List<Company> selectCompanyList(CompanyCriteria criteria);
    
    /**
     * 修改企业的企业电话和企业地址
     * @param company
     */
    void updateCompanyInfoById(Company company);
    
     String   findByStorageId(int storageId);

    List<Company> findByCom(String companyName);
}
