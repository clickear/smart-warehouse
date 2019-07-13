package com.deer.wms.system.manage.model.user;

import org.springframework.web.multipart.MultipartFile;

/**
 * 用户修改自己资料的信息
 *
 * Created by Floki on 2017/10/2.
 */
public class UserData {
    /**
     * 电子邮箱
     */
    private String email;

    /**
     * 公司地址
     */
    private String linkmanAddress;

    /**
     * 公司电话
     */
    private String linkmanPhone;

    /**
     * 头像图片文件
     */
    private MultipartFile iconUrlFile;
    
    // 经度
    private String lng;
    
    // 纬度
    private String lat;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLinkmanAddress() {
        return linkmanAddress;
    }

    public void setLinkmanAddress(String linkmanAddress) {
        this.linkmanAddress = linkmanAddress;
    }

    public String getLinkmanPhone() {
        return linkmanPhone;
    }

    public void setLinkmanPhone(String linkmanPhone) {
        this.linkmanPhone = linkmanPhone;
    }

    public MultipartFile getIconUrlFile() {
        return iconUrlFile;
    }

    public void setIconUrlFile(MultipartFile iconUrlFile) {
        this.iconUrlFile = iconUrlFile;
    }

	public String getLng()
	{
		return lng;
	}

	public void setLng( String lng )
	{
		this.lng = lng;
	}

	public String getLat()
	{
		return lat;
	}

	public void setLat( String lat )
	{
		this.lat = lat;
	}
}
