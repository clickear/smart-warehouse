package com.deer.wms.system.manage.service;

import com.deer.wms.file.model.FileInfo;
import com.deer.wms.system.manage.model.company.CompanyAttachment;
import com.deer.wms.project.seed.core.service.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 * Created by WUXB on 2017/10/01.
 */
public interface CompanyAttachmentService extends Service<CompanyAttachment, Integer> {
    /**
     * 保存附件信息
     *
     * @param file 附件文件
     * @param companyId 公司id
     * @param userId 用户id
     * @param category 附件类别
     * @param category 文件保存路径
     * @param isDel 是否删除原有文件
     */
    void saveAttachment(MultipartFile file, int companyId, int userId, int category, String savePath, boolean isDel);

    /**
     * 上传临时图片
     * @param file
     * @param path
     * @param isResetName
     * @return
     */
    FileInfo saveTempAttachment(MultipartFile file, String path, boolean isResetName);
}
