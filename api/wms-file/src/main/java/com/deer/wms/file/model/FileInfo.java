package com.deer.wms.file.model;

import java.util.Date;

/**
 * 文件信息
 *
 * Created by Floki on 2017/10/13.
 */
public class FileInfo {
    /**
     * 文件UUID
     */
    private String uuid;

    /**
     * 文件原名
     */
    private String originalName;

    /**
     * 文件名称，显示的名称
     */
    private String name;

    /**
     * 文件保存路径，绝对路径
     */
    private String savePath;

    /**
     * 文件访问地址
     */
    private String url;

    /**
     * 文件大小，单位：KB
     */
    private long size;

    /**
     * 文件后缀
     */
    private String suffix;

    /**
     * 文件类型
     */
    private String contentType;

    /**
     * 创建时间
     */
    private Date createTime;

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getOriginalName() {
        return originalName;
    }

    public void setOriginalName(String originalName) {
        this.originalName = originalName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSavePath() {
        return savePath;
    }

    public void setSavePath(String savePath) {
        this.savePath = savePath;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public long getSize() {
        return size;
    }

    public void setSize(long size) {
        this.size = size;
    }

    public String getSuffix() {
        return suffix;
    }

    public void setSuffix(String suffix) {
        this.suffix = suffix;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

}
