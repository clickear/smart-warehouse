package com.deer.wms.system.manage.service.impl;

import com.deer.wms.file.model.FileInfo;
import com.deer.wms.file.service.FileService;
import com.deer.wms.system.manage.dao.CompanyAttachmentMapper;
import com.deer.wms.system.manage.model.company.CompanyAttachment;
import com.deer.wms.system.manage.service.CompanyAttachmentService;

import com.deer.wms.project.seed.core.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import tk.mybatis.mapper.entity.Condition;

import java.util.List;

/**
 * Created by WUXB on 2017/10/01.
 */
@Service
@Transactional
public class CompanyAttachmentServiceImpl extends AbstractService<CompanyAttachment, Integer> implements CompanyAttachmentService {

    @Autowired
    private CompanyAttachmentMapper companyAttachmentMapper;

    @Autowired
    private FileService fileService;

    @Override
    public void saveAttachment(MultipartFile file, int companyId, int userId, int category, String savePath, boolean isDel) {
        if (null == file) {
            return;
        }

        if (isDel) {
            CompanyAttachment attachment = getAttachment(companyId, category);
            if (null != attachment) {
                fileService.deleteFile(attachment.getSavePath());
                super.deleteById(attachment.getAttachmentId());
            }
        }

        FileInfo fileInfo = fileService.createFile(file, savePath, true);
        CompanyAttachment attachment = new CompanyAttachment();
        attachment.setCompanyId(companyId);
        attachment.setAttachmentType(2); //原始图
        attachment.setCategory(category);
        attachment.setSavePath(fileInfo.getSavePath());
        attachment.setUrl(fileInfo.getUrl());
        attachment.setSize(fileInfo.getSize());
        attachment.setCreateUserId(userId);
        super.save(attachment);
    }

    @Override
    public FileInfo saveTempAttachment(MultipartFile file, String path, boolean isResetName) {
        return fileService.createFile(file,path,isResetName);
    }

    private CompanyAttachment getAttachment(int companyId, int category) {
        Condition condition = new Condition(CompanyAttachment.class);
        Condition.Criteria criteria = condition.createCriteria();
        criteria.andEqualTo("companyId", companyId);
        criteria.andEqualTo("category", category);

        List<CompanyAttachment> list = super.findByCondition(condition);
        if (null == list || list.isEmpty()) {
            return null;
        }
        return list.get(0);
    }
}
