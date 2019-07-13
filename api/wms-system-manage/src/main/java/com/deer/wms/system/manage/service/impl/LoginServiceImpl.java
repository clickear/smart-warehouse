package com.deer.wms.system.manage.service.impl;

import com.deer.wms.intercept.common.data.CommonDataServiceManager;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.project.seed.util.DateUtils;
import com.deer.wms.project.seed.util.SignatureUtils;
import com.deer.wms.system.manage.model.user.UserDetail;
import com.deer.wms.system.manage.model.user.UserInfo;
import com.deer.wms.system.manage.model.user.UserLogin;
import com.deer.wms.system.manage.service.LoginService;
import com.deer.wms.system.manage.service.PermissionService;
import com.deer.wms.system.manage.service.UserInfoService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

/**
 * Created by Floki on 2017/9/16.
 */
@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    private UserInfoService userInfoService;

    @Autowired
    private UserInfoServiceImpl userInfoServiceimpl;

    @Autowired
    private PermissionService permissionService;
    @Autowired
    private PermissionServiceImpl permissionServiceimpl;

    @Autowired()
    private CommonDataServiceManager commonDataService;


    @Override
    @Transactional
    public UserDetail login(UserLogin login) {
        //验证账号和密码是否正确，以及账号状态是否正常，通过验证后获取登录的账号信息
        UserInfo userInfo = userInfoService.validate(login.getAccount(), login.getPassword());

        //生成登录用户访问系统和api接口的token
        String[] tokenParams = {userInfo.getAccount(), String.valueOf(System.currentTimeMillis())};
        String token = SignatureUtils.generator(tokenParams);

        //初始化登录用户的详细信息
        UserDetail detail = userInfoService.findUserDetailByAccount(userInfo.getAccount());
        detail.setToken(token);
        detail.setPermission(permissionService.findPermissionCodeByUserId(detail.getUserId()));
        detail.setMenus(permissionService.findPermissionMenuByUserId(detail.getUserId()));
        detail.setUrls(permissionService.findPermissionUrlByUserId(detail.getUserId()));

        //初始化当前用户数据并将当前用户数据放入缓存
        CurrentUser currentUser = new CurrentUser();
        BeanUtils.copyProperties(detail, currentUser);
        currentUser.setAccount(userInfo.getAccount()); //用户登录账号就是手机号
        currentUser.setIp(login.getIp());
        currentUser.setToken(token);
        currentUser.setIconUrl(detail.getIconUrl());
        currentUser.setCurrentLoginTime(DateUtils.dateToStr(new Date(), DateUtils.DEFAULT_DATETIME_FORMAT));
        commonDataService.putCurrentUserDataToRedis(currentUser);

        return detail;
    }

    /**
     * 初始化当前用户数据
     *
     * @param user 用户基本信息
     * @param currentDateTime 当前登录系统的时间
     * @param ip 登录系统的ip地址
     * @return 返回当前用户数据
     */
    private CurrentUser initCurrentUserData(UserInfo user, Date currentDateTime, String ip) {
        CurrentUser currentUser = new CurrentUser();
        currentUser.setUserId(user.getUserId());
        currentUser.setUserName(user.getUserName());
        currentUser.setAccount(user.getAccount());
        currentUser.setIp(ip);

        //设置本次登录时间(格式转换)
        String currentLoginTime = DateUtils.dateToStr(currentDateTime, DateUtils.DEFAULT_DATETIME_FORMAT);
        currentUser.setCurrentLoginTime(currentLoginTime);

        //设置登录用户访问系统和api接口的token
        String[] tokenParams = {user.getAccount(), String.valueOf(System.currentTimeMillis())};
        currentUser.setToken(SignatureUtils.generator(tokenParams));

        return currentUser;
    }

}