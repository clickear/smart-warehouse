package com.deer.wms.system.manage.service;

import com.deer.wms.project.seed.core.service.Service;
import com.deer.wms.system.manage.model.UserRole;

/**
 * Created by WUXB on 2017/10/06.
 */
public interface UserRoleService extends Service<UserRole, Integer> {

    /**
     * 添加用户角色信息
     *
     * @param userId 用户信息id
     * @param roleId 角色信息id
     */
    void addUserRole(Integer userId, Integer roleId);


}
