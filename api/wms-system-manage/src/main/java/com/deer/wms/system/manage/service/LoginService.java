package com.deer.wms.system.manage.service;


import com.deer.wms.system.manage.model.user.UserDetail;
import com.deer.wms.system.manage.model.user.UserLogin;

/**
 * Created by Floki on 2017/9/16.
 */
public interface LoginService {

    /**
     * 用户登录
     *
     * @param login 登录信息
     * @return 登录成功后的用户详细信息
     */
    UserDetail login(UserLogin login);

}
