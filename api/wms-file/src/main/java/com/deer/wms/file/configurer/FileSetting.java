package com.deer.wms.file.configurer;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;

import javax.servlet.MultipartConfigElement;

/**
 * Created by Floki on 2017/10/12.
 */
@ConfigurationProperties(prefix = "file")
public class FileSetting {
    /**
     * 文件上传的目录
     */
    private String uploadFileDir;

    /**
     * 文件上传临时目录
     */
    private String uploadTempDir;

    /**
     * 文件上传的根目录
     */
    private String uploadContent;

    @Bean
    public MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();
        factory.setMaxFileSize(1024L * 1024 * 25); //上传单个文件的最大大小 25M
        factory.setMaxRequestSize(1024L * 1024 * 100); //最大请求大小 100M
        factory.setLocation(getUploadTempDir());
        return factory.createMultipartConfig();
    }

    public String getUploadFileDir() {
        return uploadFileDir;
    }

    public void setUploadFileDir(String uploadFileDir) {
        this.uploadFileDir = uploadFileDir;
    }

    public String getUploadTempDir() {
        return uploadTempDir;
    }

    public void setUploadTempDir(String uploadTempDir) {
        this.uploadTempDir = uploadTempDir;
    }

    public String getUploadContent() {
        return uploadContent;
    }

    public void setUploadContent(String uploadContent) {
        this.uploadContent = uploadContent;
    }
}
