package com.deer.wms.system.manage.dao;

import com.deer.wms.project.seed.core.mapper.Mapper;
import com.deer.wms.system.manage.model.company.Company;
import com.deer.wms.system.manage.model.company.CompanyCriteria;
import com.deer.wms.system.manage.model.company.CompanyDetailVO;
import com.deer.wms.system.manage.model.company.CompanyListVO;

import java.util.List;

public interface CompanyMapper extends Mapper<Company> {

    /**
     * 查找企业信息
     *
     * @param criteria 查找条件
     * @return 返回符合查找条件的企业信息列表
     */
    List<CompanyListVO> selectCompanyFormList(CompanyCriteria criteria);

    /**
     * 查找指定企业的详细信息
     *
     * @param criteria 查找条件
     * @return 企业的详细信息
     */
    CompanyDetailVO selectCompany(CompanyCriteria criteria);
    
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

	String findByStorageId(int storageId);

    List<Company> findByCom(String companyName);
}