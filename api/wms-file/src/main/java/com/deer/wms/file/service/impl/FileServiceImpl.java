package com.deer.wms.file.service.impl;

import com.deer.wms.file.configurer.FileSetting;
import com.deer.wms.file.model.FileInfo;
import com.deer.wms.file.service.FileService;
import com.deer.wms.project.seed.util.FileUtil;
import com.deer.wms.project.seed.util.RandomUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.text.Format;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

/**
 * Created by Floki on 2017/10/13.
 */
@Service
public class FileServiceImpl implements FileService {
    private static Logger logger = LoggerFactory.getLogger(FileServiceImpl.class);

    @Autowired
    private FileSetting setting;

    @Override
    public FileInfo createFile(MultipartFile file, String path) {
        return createFile(file, path, false);
    }

    @Override
    public FileInfo createFile(MultipartFile file, String path, boolean isResetName) {
        String dir = setting.getUploadFileDir() + setting.getUploadContent() + path;
        logger.info("create file dir path : {}", dir);
        FileUtil.mkdirs(dir);

        //获取文件基本信息
        String originalName = file.getOriginalFilename();
        String suffix = originalName.substring(originalName.lastIndexOf("."));
        String name = isResetName ? (generateFileName() + suffix) : originalName;
        String savePath = dir + "/" + name;
        logger.info("save file path : {}", savePath);
        try {
            FileUtil.createFile(file.getInputStream(), savePath);
        } catch (IOException e) {
            throw new RuntimeException("文件[" + savePath + "]不存在：" + e.getMessage());
        }

        //设置文件信息
        FileInfo fileInfo = new FileInfo();
        fileInfo.setUuid(UUID.randomUUID().toString().replaceAll("-", "")); //文件UUID
        fileInfo.setOriginalName(originalName); //文件原名
        fileInfo.setName(name); //显示名称
        fileInfo.setSavePath(savePath); //保存路径
        fileInfo.setUrl(setting.getUploadContent() + path + "/" + name); //访问路径
        fileInfo.setSuffix(suffix); //文件后缀
        fileInfo.setSize(file.getSize() / 1024); //文件大小 (Kb)
        fileInfo.setContentType(file.getContentType()); //文件类型
        fileInfo.setCreateTime(new Date());

        return fileInfo;
    }

    @Override
    public void deleteFile(String path) {
        File file = new File(path);
        if (file.exists()) {
            file.delete();
        }
    }

    @Override
    public void deleteFileByRelativePath(String path) {
        String delPath = setting.getUploadFileDir() + setting.getUploadContent() + path;
        deleteFile(delPath);
    }

    /**
     * 生成文件名称
     *
     * @return
     */
    private String generateFileName() {
        Format format = new SimpleDateFormat("yyyyMMddHHmmss");
        return format.format(new Date()) + RandomUtil.generateString(6);
    }
}
