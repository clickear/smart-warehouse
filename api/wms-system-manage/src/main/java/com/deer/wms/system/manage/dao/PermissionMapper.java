package com.deer.wms.system.manage.dao;

import com.deer.wms.project.seed.core.mapper.Mapper;
import com.deer.wms.system.manage.model.permission.Menu;
import com.deer.wms.system.manage.model.permission.Permission;
import com.deer.wms.system.manage.model.permission.PermissionTreeModel;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface PermissionMapper extends Mapper<Permission> {
    /**
     * 查询指定用户权限范围内的资源代码数组
     *
     * @param userId 用户id
     * @return 权限范围内的资源代码串
     */
    List<String> selectPermissionCodeByUserId(@Param("userId") Integer userId);

    /**
     * 查询指定用户权限范围内的所有资源地址
     *
     * @param userId
     * @return
     */
    List<String> selectPermissionUrlByUserId(@Param("userId") Integer userId);

    /**
     * 查询指定角色的权限树形列表
     *
     * @param roleId 角色id
     * @return 角色的权限树形列表
     */
    List<PermissionTreeModel> selectPermissionTreeFormListByRoleId(@Param("roleId") Integer roleId);

    /**
     * 查询指定角色的权限范围内的树形列表
     *
     * @param roleId 角色id
     * @return 角色的权限树形列表
     */
    List<PermissionTreeModel> selectPermissionRangeTreeFormListByRoleId(@Param("roleId") Integer roleId);


    /**
     * 查询指定用户权限范围内的菜单信息列表
     *
     * @param userId 用户id
     * @return 菜单信息列表
     */
    List<Menu> selectPermissionMenuByUserId(@Param("userId") Integer userId);

    /**
     * 删除某角色所有
     *
     * @param roleId 角色id
     * @return 菜单信息列表
     */
    void deleteByRoleId( Integer roleId);
}