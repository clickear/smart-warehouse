package com.deer.wms.system.manage.service.impl;

import com.deer.wms.system.manage.dao.PermissionMapper;
import com.deer.wms.system.manage.model.permission.Menu;
import com.deer.wms.system.manage.model.permission.Permission;
import com.deer.wms.system.manage.model.permission.PermissionTreeModel;
import com.deer.wms.system.manage.service.PermissionService;

import com.deer.wms.project.seed.core.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tk.mybatis.mapper.entity.Condition;

import java.util.List;

/**
 * Created by WUXB on 2017/10/07.
 */
@Service
@Transactional
public class PermissionServiceImpl extends AbstractService<Permission, Integer> implements PermissionService {

    @Autowired
    private PermissionMapper permissionMapper;

    @Override
    public void emptyPermissionByRoleId(Integer roleId) {
        Condition condition = new Condition(Permission.class);
        Condition.Criteria criteria = condition.createCriteria();
        criteria.andEqualTo("objectType", "role");
        criteria.andEqualTo("objectId", roleId);
        permissionMapper.deleteByCondition(condition);
    }

    @Override
    public void deleteByRoleId(Integer roleId) {
        permissionMapper.deleteByRoleId(roleId);
    }

    @Override
    public List<String> findPermissionCodeByUserId(Integer userId) {
        List<String> codes = permissionMapper.selectPermissionCodeByUserId(userId);
        return codes;
    }

    @Override
    public List<String> findPermissionUrlByUserId(Integer userId) {
        List<String> urls = permissionMapper.selectPermissionUrlByUserId(userId);
        return urls;
    }

    /**
     * 查询权限菜单
     * @param userId 用户id
     * @return 菜单
     */
    @Override
    public List<Menu> findPermissionMenuByUserId(Integer userId) {
        List<Menu> list = permissionMapper.selectPermissionMenuByUserId(userId);
        return list;
    }

    @Override
    public List<PermissionTreeModel> findPermissionTreeFormListByRoleId(Integer roleId) {
        List<PermissionTreeModel> list = permissionMapper.selectPermissionTreeFormListByRoleId(roleId);
        return list;
    }

    @Override
    public List<PermissionTreeModel> findPermissionRangeTreeFormListByRoleId(Integer roleId) {
        List<PermissionTreeModel> list = permissionMapper.selectPermissionRangeTreeFormListByRoleId(roleId);
        return list;
    }
}
