package com.deer.wms.system.manage.web;

import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.project.seed.util.NetworkUtil;
import com.deer.wms.system.manage.model.permission.Menu;
import com.deer.wms.system.manage.model.user.UserDetail;
import com.deer.wms.system.manage.model.user.UserLogin;
import com.deer.wms.system.manage.service.LoginService;
import com.deer.wms.system.manage.service.impl.LoginServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Floki on 2017/9/16.
 */
@Api(description = "用户登录api接口")
@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private LoginService loginService;
    @Autowired
    private LoginServiceImpl loginServiceimpl;
    /**
     * 用户登录
     *
     * @param login
     * @return
     */
    @ApiOperation(value = "用户登录", notes = "用户登录")
    @PostMapping
    public Result userLogin(@RequestBody UserLogin login, HttpServletRequest request) {
        String ip = NetworkUtil.getIpAddress(request);
        login.setIp(ip);
        UserDetail detail = loginService.login(login);
        List<Menu> menus = detail.getMenus();
        List<Menu> menus1 =  new ArrayList<Menu>();
        List<Menu> menus2 = new ArrayList<Menu>();
        List<Menu> menus3 = new ArrayList<Menu>();
        for(Menu menu :menus){
            if(menu.getGroup() !=null){
                if(menu.getGroup() ==1){
                    menus1.add(menu);
                }
                if(menu.getGroup() ==2){
                    menus2.add(menu);
                }
                if(menu.getGroup() ==3){
                    menus3.add(menu);
                }

            }

        }

        detail.setMenus1(menus1);
        detail.setMenus2(menus2);
        detail.setMenus3(menus3);
        return ResultGenerator.genSuccessResult(detail);
    }
}