package com.deer.wms.system.manage.web;

import com.deer.wms.system.manage.model.user.UserData;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import springfox.documentation.annotations.ApiIgnore;

import com.deer.wms.intercept.annotation.Authority;
import com.deer.wms.intercept.annotation.User;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.project.seed.constant.Constants;
import com.deer.wms.project.seed.core.result.CommonCode;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.project.seed.util.StringUtil;
import com.deer.wms.system.manage.constant.SystemManageConstant;
import com.deer.wms.system.manage.model.user.UserDetail;
import com.deer.wms.system.manage.model.user.UserInfo;
import com.deer.wms.system.manage.model.user.UserInfoCreate;
import com.deer.wms.system.manage.model.user.UserInfoCriteria;
import com.deer.wms.system.manage.model.user.UserInfoDetailVO;
import com.deer.wms.system.manage.model.user.UserInfoModify;
import com.deer.wms.system.manage.model.user.UserListVO;
import com.deer.wms.system.manage.model.user.UserPassword;
import com.deer.wms.system.manage.model.user.UserPasswordRetrieval;
import com.deer.wms.system.manage.service.UserInfoService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

/**
 * 用户信息api接口
 *
* Created by WUXB on 2017/10/01.
*/
@Api(description = "用户信息api接口")
@RestController
@RequestMapping("/users")
public class UserInfoController {

    @Autowired
    private UserInfoService userInfoService;
    
    /**
     * 分页查账户信息
     *
     * @param criteria
     * @return
     */
    @ApiOperation(value = "分页查账户信息", notes = "分页获取账户信息列表")
    @Authority
    @ApiImplicitParams( { @ApiImplicitParam( name = "access-token", value = "token", paramType = "header", dataType = "String", required = true ) } )
    @GetMapping()
    public Result userList(UserInfoCriteria criteria, @ApiIgnore @User CurrentUser currentUser) {
    	if(currentUser==null){
            return ResultGenerator.genFailResult( CommonCode.SERVICE_ERROR,"未登录错误",null );
        }
    	StringUtil.trimObjectStringProperties(criteria);
    	if (currentUser.getCompanyType() != SystemManageConstant.COMPANY_TYPE_OPERATE){
    		criteria.setCompanyId(currentUser.getCompanyId());
		}
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<UserListVO> list = userInfoService.findUserFormList(criteria);
        return ResultGenerator.genSuccessResult(new PageInfo<>(list));
    }

    /**
     * 用户修改自己的密码
     *
     * @param userPassword
     * @param currentUser
     * @return
     */
    @ApiOperation(value = "修改密码", notes = "用户修改自己的密码")
    @Authority
    @ApiImplicitParams( { @ApiImplicitParam( name = "access-token", value = "token", paramType = "header", dataType = "String", required = true ) } )
    @PutMapping("/password")
    public Result modifyPassword(@RequestBody UserPassword userPassword, @ApiIgnore @User CurrentUser currentUser) {
        if (!userPassword.getPassword().equals(userPassword.getConfirmPassword())) {
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR, "确认密码与新密码不一致", "");
        }
        userInfoService.modifyPassword(userPassword, currentUser);
        return ResultGenerator.genSuccessResult();
    }

    /**
     * 找回密码，发送短信验证码
     *
     * @param mobile
     * @return
     */
    @ApiOperation(value = "找回密码，发送短信验证码", notes = "给指定手机发送短信验证码")
    @PostMapping("/send/{mobile}/sms/code")
    public Result send(@PathVariable String mobile) {
        userInfoService.sendSmsCode(mobile);
        return ResultGenerator.genSuccessResult("");
    }
    
    @ApiOperation(value = "找回密码，发送邮件验证码", notes = "给指定邮箱发送短信验证码")
    @PostMapping("/send/{email}/mail/code")
    public Result sendMail(@PathVariable String email)
    {
    	userInfoService.sendEmailCode( email );
    	return ResultGenerator.genSuccessResult(""); 
    }

    /**
     * 找回密码，设置密码
     *
     * @param retrieval
     * @return
     */
    @ApiOperation(value = "找回密码，重置密码", notes = "找回密码，重新设置登录密码")
    @PutMapping("/retrieval/password")
    public Result retrievalPassword(@Valid @RequestBody UserPasswordRetrieval retrieval) {
        userInfoService.retrievalPassword(retrieval);
        return ResultGenerator.genSuccessResult();
    }

    /**
     * 获取当前登录用户的信息
     *
     * @param currentUser 当前登录用户信息
     * @return
     */
    @ApiOperation(value = "获取当前登录用户的信息", notes = "获取当前登录用户的信息")
    @ApiImplicitParams({
            @ApiImplicitParam( name = "access-token", value = "token", paramType = "header", dataType = "String", required = true )
    })
    @Authority
    @GetMapping("/info")
    public Result getCurrentUserDetail(@ApiIgnore @User CurrentUser currentUser) {
        UserDetail detail = userInfoService.findUserDetailByAccount(currentUser.getAccount());
        detail.setToken(currentUser.getToken());
        return ResultGenerator.genSuccessResult(detail);
    }

    /**
     * 用户修改自己的资料信息
     *
     * @param userData
     * @param currentUser
     * @return
     */
    @ApiOperation(value = "修改个人信息", notes = "用户修改自己的个人信息")
    @ApiImplicitParams( { @ApiImplicitParam( name = "access-token", value = "token", paramType = "header", dataType = "String", required = true ) } )
    @Authority
    @PostMapping("/info")
    public Result modifyInfo(UserData userData, HttpServletRequest request, @ApiIgnore @User CurrentUser currentUser) {
        userInfoService.modifyUserData(userData, currentUser);
        return ResultGenerator.genSuccessResult();
    }

    /**
     * 新增账户信息
     *
     * @param create 账户信息
     * @param currentUser 当前操作人员信息
     * @return
     */
    @ApiOperation(value = "新增账户信息", notes = "新增账户信息")
    @Authority
    @ApiImplicitParams( { @ApiImplicitParam( name = "access-token", value = "token", paramType = "header", dataType = "String", required = true ) } )
    @PostMapping
    public Result createUserInfo(@Valid @RequestBody UserInfoCreate create, @ApiIgnore @User CurrentUser currentUser) {
        userInfoService.createUserInfo(create, currentUser);
        return ResultGenerator.genSuccessResult();
    }

    /**
     * 修改账户信息
     *
     * @param modify 账户信息
     * @param currentUser 当前操作人员信息
     * @return
     */
    @ApiOperation(value = "修改账户信息", notes = "修改账户信息")
    @Authority
    @ApiImplicitParams( { @ApiImplicitParam( name = "access-token", value = "token", paramType = "header", dataType = "String", required = true ) } )
    @PutMapping("/{userId}")
    public Result modifyUserInfo(@PathVariable Integer userId, @RequestBody UserInfoModify modify, @ApiIgnore @User CurrentUser currentUser) {
        modify.setUserId(userId);
        userInfoService.modifyUserInfo(modify, currentUser);
        return ResultGenerator.genSuccessResult();
    }

    /**
     * 获取账户详细信息
     *
     * @param userId 账户信息id
     * @return
     */
    @ApiOperation(value = "获取账户详细信息", notes = "获取指定账户的详细信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
            , @ApiImplicitParam(name = "userId", value = "账户信息id", paramType="path", dataType="int", required = true)
     })
    @Authority
    @GetMapping("/{userId}/info")
    public Result getUserInfoDetail(@PathVariable Integer userId) {
        UserInfoDetailVO vo = userInfoService.findUserInfoDetailByUserId(userId);
        return ResultGenerator.genSuccessResult(vo);
    }

    /**
     * 启用账户
     *
     * @param userId 用户信息id
     * @return
     */
    @ApiOperation(value = "启用账户", notes = "启用账户")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
            , @ApiImplicitParam(name = "userId", value = "用户信息id", paramType="path", dataType="int", required = true)
    })
    @Authority
    @PutMapping("/{userId}/enable")
    public Result enable(@PathVariable Integer userId, @ApiIgnore @User CurrentUser currentUser) {
        UserInfo userInfo = userInfoService.findById(userId);
        if (userInfo.getAdmin()) {
            return ResultGenerator.genSuccessResult(CommonCode.SERVICE_ERROR, "系统管理员帐号不允许操作");
        }
        userInfoService.modifyUserInfoAccountState(userId, Constants.ACCOUNT_STATUS_ENABLE, currentUser);
        return ResultGenerator.genSuccessResult();
    }

    /**
     * 停用账户
     *
     * @param userId 用户信息id
     * @return
     */
    @ApiOperation(value = "停用账户", notes = "停用账户")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
            , @ApiImplicitParam(name = "userId", value = "用户信息id", paramType="path", dataType="int", required = true)
    })
    @Authority
    @PutMapping("/{userId}/disable")
    public Result disable(@PathVariable Integer userId, @ApiIgnore @User CurrentUser currentUser) {
        UserInfo userInfo = userInfoService.findById(userId);
        if (userInfo.getAdmin()) {
            return ResultGenerator.genSuccessResult(CommonCode.SERVICE_ERROR, "系统管理员帐号不允许操作");
        }
        userInfoService.modifyUserInfoAccountState(userId, Constants.ACCOUNT_STATUS_DISABLE, currentUser);
        return ResultGenerator.genSuccessResult();
    }

    /**
     * 删除账户
     *
     * @param userId 用户信息id
     * @return
     */
    @ApiOperation(value = "删除账户", notes = "删除账户")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
            , @ApiImplicitParam(name = "userId", value = "用户信息id", paramType="path", dataType="int", required = true)
    })
    @Authority
    @DeleteMapping("/{userId}")
    public Result delete(@PathVariable Integer userId, @ApiIgnore @User CurrentUser currentUser) {
        UserInfo userInfo = userInfoService.findById(userId);
        if (userInfo.getAdmin()) {
            return ResultGenerator.genSuccessResult(CommonCode.SERVICE_ERROR, "系统管理员帐号不允许操作");
        }
        userInfoService.modifyUserInfoState(userId, Constants.INFO_STATE_DELETED, currentUser);
        return ResultGenerator.genSuccessResult();
    }
}
