package com.deer.wms.system.manage.web;

import com.deer.wms.intercept.annotation.Authority;
import com.deer.wms.intercept.annotation.User;
import com.deer.wms.intercept.common.data.CommonDataServiceManager;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

/**
 * 退出系统api接口
 *
 * Created by Floki on 2017/9/17.
 */
@Api(description = "退出系统api接口")
@Authority
@RestController
@RequestMapping("/signout")
public class SignOutController {
    /**
     * 日志
     */
    private static Logger logger = LoggerFactory.getLogger(SignOutController.class);

    /**
     * 用户信息管理的业务处理接口
     */
    @Autowired
    private CommonDataServiceManager commonDataService;

    /**
     * 当前登录用户退出系统
     *
     * @param currentUser 当前操作用户信息
     * @return
     */
    @ApiOperation(value = "退出系统", notes = "退出系统，清空当前登录人员登录相关的数据")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String")
    })
    @PostMapping()
    public Result signout(@ApiIgnore @User CurrentUser currentUser) {
        logger.info("用户退出系统，账号：{}；名称：{}；Token：{}", currentUser.getAccount(), currentUser.getUserName(), currentUser.getToken());
        commonDataService.removeCurrentUserDataFromRedis(currentUser.getToken());
        return ResultGenerator.genSuccessResult();
    }
}
