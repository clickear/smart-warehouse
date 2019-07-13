package com.deer.wms.system.manage.service;

import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.project.seed.core.service.Service;
import com.deer.wms.system.manage.model.role.*;

import java.util.List;

/**
 * Created by WUXB on 2017/10/07.
 */
public interface RoleService extends Service<Role, Integer> {

    /**
     * 查找角色信息列表
     *
     * @param criteria 查询条件
     * @return 角色信息列表
     */
    List<RoleListVO> findRoleFormList(RoleCriteria criteria);

    /**
     * 查找指定角色的详细信息
     *
     * @param roleId 角色信息id
     * @return 角色详细信息，如果没有找到返回null
     */
    RoleDetailVO findRoleByRoleId(Integer roleId);

    /**
     * 添加角色信息
     *
     * @param create 角色信息
     * @param currentUser 当前操作人员的信息
     */
    void addRole(RoleCreate create, CurrentUser currentUser);

    /**
     * 修改角色信息
     *
     * @param modify 角色修改信息
     * @param currentUser 当前操作人员的信息
     */
    void modifyRole(RoleModify modify, CurrentUser currentUser);

}
