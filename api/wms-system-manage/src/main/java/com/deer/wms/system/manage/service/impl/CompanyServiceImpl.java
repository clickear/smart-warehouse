package com.deer.wms.system.manage.service.impl;

import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.project.seed.util.DateUtils;
import com.deer.wms.system.manage.dao.CompanyMapper;
import com.deer.wms.system.manage.model.company.*;
import com.deer.wms.system.manage.service.CompanyAttachmentService;
import com.deer.wms.system.manage.service.CompanyService;
import com.deer.wms.project.seed.core.service.AbstractService;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.Date;
import java.util.List;

/**
 * Created by WUXB on 2017/10/01.
 */
@Service
@Transactional
public class CompanyServiceImpl extends AbstractService<Company, Integer> implements CompanyService {

    @Autowired
    private CompanyMapper companyMapper;

    @Autowired
    private CompanyAttachmentService attachmentService;


    @Override
    public List<CompanyListVO> findCompanyFormList(CompanyCriteria criteria) {
        List<CompanyListVO> voList = companyMapper.selectCompanyFormList(criteria);
        return voList;
    }

    @Override
    public CompanyDetailVO findCompany(CompanyCriteria criteria) {
        CompanyDetailVO vo = companyMapper.selectCompany(criteria);
        return vo;
    }

    @Override
    public void createCompany(CompanyCreate create, CurrentUser currentUser) {
        Company company = new Company();
        BeanUtils.copyProperties(create, company);
        if (!StringUtils.isEmpty(create.getEstablishDate())) {
            company.setEstablishDate(DateUtils.strToDate(create.getEstablishDate(), DateUtils.DEFAULT_DATE_FORMAT));
        }
        company.setCreateUserId(currentUser.getUserId());
        company.setCreateTime(new Date());
        company.setModifyTime(new Date());
        super.save(company);

        String savePath = "/company/" + company.getCompanyId(); //公司附件保存路径
        //保存企业附件信息：营业执照图片
        attachmentService.saveAttachment(create.getBusinessLicenseFile(), company.getCompanyId(), currentUser.getUserId(), 1, savePath, false);

        //保存企业附件信息：法人身份证正面图片
        attachmentService.saveAttachment(create.getArtificialPersonIdCardPositiveFile(), company.getCompanyId(), currentUser.getUserId(), 2, savePath, false);

        //保存企业附件信息：法人身份证反面图片
        attachmentService.saveAttachment(create.getArtificialPersonIdCardOppositeFile(), company.getCompanyId(), currentUser.getUserId(), 3, savePath, false);
    }

    @Override
    public void modifyCompany(CompanyModify modify, CurrentUser currentUser) {
        Company company = new Company();
        BeanUtils.copyProperties(modify, company);
        if (!StringUtils.isEmpty(modify.getEstablishDate())) {
            company.setEstablishDate(DateUtils.strToDate(modify.getEstablishDate(), DateUtils.DEFAULT_DATE_FORMAT));
        }
        company.setModifyUserId(currentUser.getUserId());
        company.setModifyTime(new Date());
        super.update(company);

        String savePath = "/company/" + company.getCompanyId(); //公司附件保存路径
        //保存企业附件信息：营业执照图片
        attachmentService.saveAttachment(modify.getBusinessLicenseFile(), company.getCompanyId(), currentUser.getUserId(), 1, savePath, true);

        //保存企业附件信息：法人身份证正面图片
        attachmentService.saveAttachment(modify.getArtificialPersonIdCardPositiveFile(), company.getCompanyId(), currentUser.getUserId(), 2, savePath, true);

        //保存企业附件信息：法人身份证反面图片
        attachmentService.saveAttachment(modify.getArtificialPersonIdCardOppositeFile(), company.getCompanyId(), currentUser.getUserId(), 3, savePath, true);
    }

	@Override
	public List<Company> selectCompanyList(CompanyCriteria criteria) {
		// TODO Auto-generated method stub
		return companyMapper.selectCompanyList(criteria);
	}
	
	@Override
	public void updateCompanyInfoById(Company company)
	{
		companyMapper.updateCompanyInfoById(company);
	}

	@Override
	public String findByStorageId(int storageId) {
		
		return companyMapper.findByStorageId(storageId);
	}

    public List<Company> findByCom(String companyName){
        return companyMapper.findByCom(companyName);
    }
}
