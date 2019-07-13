package com.deer.wms.system.manage.service;

import com.deer.wms.file.model.FileInfo;
import com.deer.wms.system.manage.model.user.UserRegisterInfo;

import javax.servlet.http.HttpServletRequest;

/**
 * 用户注册服务，包括用户注册和添加用户
 *
 * Created by Floki on 2017/10/1.
 */
public interface RegisterService {
    /**
     * 用户注册
     * @param register
     */
    void register(UserRegisterInfo register);

    /**
     * 微信小程序注册接口
     * @param register
     */
    void registerForWechat(UserRegisterInfo register);

    /**
     * 上传临时文件接口（微信小程序）
     * @param request
     * @return
     */
    FileInfo uploadCompanyFile(HttpServletRequest request);
    
    /**
     * 注册下一步时校验验证码，手机号，邮箱
     * @param register
     * @return
     */
    String nextStepValidate(UserRegisterInfo register);
}
