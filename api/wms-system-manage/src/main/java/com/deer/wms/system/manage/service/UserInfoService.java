package com.deer.wms.system.manage.service;

import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.project.seed.core.service.Service;
import com.deer.wms.system.manage.model.user.*;

import java.util.List;

/**
 * Created by WUXB on 2017/10/01.
 */
public interface UserInfoService extends Service<UserInfo, Integer> {

    /**
     * 账号信息列表
     *
     * @param criteria 查询条件
     * @return
     */
    List<UserListVO> findUserFormList(UserInfoCriteria criteria);

    /**
     * 找到指定登录账号对应的用户信息
     *
     * @param account 登录账号
     * @return 登录账号对应的用户信息，如果没有找到返回null
     */
    UserInfo findUserInfoByAccount(String account);

    /**
     * 找到指定登录账号的用户详细信息
     *
     * @param account 登录帐号
     * @return 登录账号对应的用户详细信息，如果没有找到返回null
     */
    UserDetail findUserDetailByAccount(String account);

    /**
     * 找到指定用户的详细信息
     *
     * @param userId 用户信息id
     * @return 用户的详细信息
     */
    UserInfoDetailVO findUserInfoDetailByUserId(Integer userId);

    /**
     * 验证账号和密码的正确性
     *
     * @param account 账号
     * @param password 密码
     * @return
     */
    UserInfo validate(String account, String password);

    /**
     * 用户修改自己账号的登录密码
     *
     * @param userPassword 修改密码的相关信息
     * @param currentUser 当前操作用户的信息
     */
    void modifyPassword(UserPassword userPassword, CurrentUser currentUser);

    /**
     * 用户修改自己的个人信息
     *
     * @param userData 个人信息
     * @param currentUser 当前操作用户的信息
     */
    void modifyUserData(UserData userData, CurrentUser currentUser);

    /**
     * 修改用户账号状态
     *
     * @param userId 用户信息id
     * @param sate 用户信息状态
     * @param currentUser 当前操作人员的信息
     */
    void modifyUserInfoAccountState(Integer userId, String sate, CurrentUser currentUser);

    /**
     * 修改用户信息状态
     *
     * @param userId 用户信息id
     * @param sate 用户信息状态
     * @param currentUser 当前操作人员的信息
     */
    void modifyUserInfoState(Integer userId, String sate, CurrentUser currentUser);

    /**
     * 找回密码
     *
     * @param retrieval
     */
    void retrievalPassword(UserPasswordRetrieval retrieval);

    /**
     * 发送手机短信验证码
     *
     * @param mobile 手机号码
     */
    void sendSmsCode(String mobile);
    
    /**
     * 发送邮箱短信验证码
     *
     * @param mobile 手机号码
     */
    void sendEmailCode(String email);


    /**
     * 创建用户信息
     *
     * @param create
     * @param currentUser
     */
    void createUserInfo(UserInfoCreate create, CurrentUser currentUser);

    /**
     * 修改用户信息
     *
     * @param modify
     * @param currentUser
     */
    void modifyUserInfo(UserInfoModify modify, CurrentUser currentUser);
    
    List<UserInfo> selectByInfos(UserInfo userInfo);

}
