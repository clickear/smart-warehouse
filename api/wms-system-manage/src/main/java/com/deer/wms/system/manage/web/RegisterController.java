package com.deer.wms.system.manage.web;

import com.deer.wms.file.model.FileInfo;
import com.deer.wms.message.service.ValidateRecordService;
import com.deer.wms.project.seed.core.result.CommonCode;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.system.manage.model.user.UserInfo;
import com.deer.wms.system.manage.model.user.UserRegisterInfo;
import com.deer.wms.system.manage.service.RegisterService;
import com.deer.wms.system.manage.service.UserInfoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 注册帐号的api
 *
 * Created by Floki on 2017/10/1.
 */
@Api(description = "用户注册api接口")
@RestController
@RequestMapping("/register")
public class RegisterController {

    /**
     * 账号注册服务
     */
    @Autowired
    private RegisterService registerService;

    @Autowired
    private ValidateRecordService validateRecordService;

    @Autowired
    private UserInfoService userInfoService;


    /**
     * 注册帐号，发送短信验证码
     *
     * @param mobile
     * @return
     */
    @ApiOperation(value = "注册帐号，发送短信验证码", notes = "给指定手机发送短信验证码")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "mobile", value = "手机号码", paramType="path", dataType="string", required = true)
    })
    @PostMapping("/send/{mobile}/sms/code")
    public Result send(@PathVariable String mobile) {
        validateRecordService.sendMobileValidateCode("1", mobile);
        return ResultGenerator.genSuccessResult("");
    }

    /**
     * 用户注册
     *
     * @param register 用户注册的信息
     * @return 返回响应结果
     */
    @ApiOperation(value = "用户注册", notes = "注册用户账号及企业信息")
    @PostMapping
    public Result register(@RequestBody UserRegisterInfo register) {
        registerService.register(register);
        return ResultGenerator.genSuccessResult();
    }
    /**
     * 用户注册
     *
     * @param register 微信小程序用户注册
     * @return 返回响应结果
     */
    @ApiOperation(value = "微信小程序用户注册", notes = "微信小程序注册用户账号及企业信息")
    @PostMapping("registerForWechat")
    public Result registerForWechat(UserRegisterInfo register, HttpServletRequest request) {
        try {
            registerService.registerForWechat(register);
            return ResultGenerator.genSuccessResult();
        } catch (Exception e) {
           return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR ,e.getMessage(),null);
        }
    }

    /**
     * 用户注册-微信小程序单图上传
     */
    @ApiOperation(value = "微信小程序单图上传", notes = "微信小程序单图上传")
    @PostMapping("uploadFileForWechat")
    public Result uploadCompanyFile(HttpServletRequest request, HttpServletResponse response) {
        try {
            FileInfo fileInfo = registerService.uploadCompanyFile(request);
            return ResultGenerator.genSuccessResult(fileInfo);
        } catch (Exception e) {
            ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR );
        }
        return null;
    }

    /**
     * 注册时判断是否已存在该手机号
     *
     * @param mobile
     * @return
     */
    @ApiOperation(value = "注册时判断是否已存在该手机号", notes = "注册时判断是否已存在该手机号")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "mobile", value = "手机号码", paramType="path", dataType="string", required = true)
    })
    @PostMapping("/send/{mobile}/ok")
    public Result ok(@PathVariable String mobile) {
//        UserInfo userInfo =userInfoService.findBy("mobile",mobile);
        UserInfo userInfo = new UserInfo();
        userInfo.setAccount(mobile);
        List<UserInfo> users = userInfoService.selectByInfos(userInfo);
        if(users!=null&&!users.isEmpty()){
            for(UserInfo user:users){
                if (null != user&&!user.getState().equals("deleted")) {
                	return ResultGenerator.genSuccessResult("存在");
                    //throw new ServiceException(CommonCode.SERVICE_ERROR, "手机号码已经被注册");
                }
            }
        }
        return ResultGenerator.genSuccessResult("不存在");
//        if(userInfo ==null){
//            return ResultGenerator.genSuccessResult("不存在");
//        }else{
//            return ResultGenerator.genSuccessResult("存在");
//        }

    }
    
    @ApiOperation(value = "注册下一步校验手机，邮箱和验证码", notes = "注册下一步校验手机，邮箱和验证码")
    @ApiImplicitParams({
        @ApiImplicitParam(name = "mobile", value = "手机号码", paramType="path", dataType="string", required = true)
        ,@ApiImplicitParam(name = "smsCode", value = "验证码", paramType="path", dataType="string", required = true)
        ,@ApiImplicitParam(name = "email", value = "邮箱", paramType="path", dataType="string", required = true)
    })

    @PostMapping("/nextStepValidate")
    public Result nextStepValidate(@RequestBody UserRegisterInfo register, HttpServletRequest request) {
    	registerService.nextStepValidate(register);
    	return ResultGenerator.genSuccessResult();
    }
}
