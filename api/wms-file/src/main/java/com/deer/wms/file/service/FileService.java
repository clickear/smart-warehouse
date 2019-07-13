package com.deer.wms.file.service;

import com.deer.wms.file.model.FileInfo;
import org.springframework.web.multipart.MultipartFile;

/**
 * Created by Floki on 2017/10/13.
 */
public interface FileService {

    /**
     * 创建文件
     *
     * @param file MultipartFile 上传的文件
     * @param path 文件保存路径(相对路径，创建文件时，会自动加上文件保存的根路径)
     * @return 返回创建的文件信息
     */
    FileInfo createFile(MultipartFile file, String path);

    /**
     * 创建文件
     *
     * @param file MultipartFile 文件
     * @param path 文件保存路径(相对路径，创建文件时，会自动加上文件保存的根路径)
     * @param isResetName 是否重命名，true=需要重命名
     * @return 返回创建的文件信息
     */
    FileInfo createFile(MultipartFile file, String path, boolean isResetName);

    /**
     * 删除文件
     *
     * @param path
     */
    void deleteFile(String path);

    /**
     * 删除文件
     *
     * @param path 文件相对路径
     */
    void deleteFileByRelativePath(String path);
}
