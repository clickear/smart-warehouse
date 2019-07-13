package com.deer.wms.system.manage.web;

import com.deer.wms.intercept.annotation.Authority;
import com.deer.wms.intercept.annotation.User;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.project.seed.util.StringUtil;
import com.deer.wms.system.manage.constant.SystemManageConstant;
import com.deer.wms.system.manage.model.permission.PermissionTreeModel;
import com.deer.wms.system.manage.model.role.*;
import com.deer.wms.system.manage.service.PermissionService;
import com.deer.wms.system.manage.service.RoleService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

/**
* Created by WUXB on 2017/10/07.
*/
@Api(description = "角色信息api接口")
@Authority
@RestController
@RequestMapping("/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @Autowired
    private PermissionService permissionService;


    /**
     * 添加角色信息
     *
     * @param create
     * @param currentUser
     * @return
     */
    @PostMapping
    @ApiImplicitParams({
        @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    public Result save(@RequestBody RoleCreate create, @ApiIgnore @User CurrentUser currentUser) {
        create.setRoleLevel(1);
        //create.setCompanyId(currentUser.getCompanyId());
        roleService.addRole(create, currentUser);
        return ResultGenerator.genSuccessResult();
    }

    /**
     * 修改角色信息
     *
     * @param modify 角色信息
     * @param currentUser 当前操作用户信息
     * @return
     */
    @ApiOperation(value = "修改角色信息", notes = "修改角色基本信息和权限信息")
    @PutMapping("/{roleId}")
    @ApiImplicitParams({
        @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    public Result modify(@PathVariable Integer roleId, @RequestBody RoleModify modify, @ApiIgnore @User CurrentUser currentUser) {
        modify.setRoleId(roleId);
        roleService.modifyRole(modify, currentUser);
        return ResultGenerator.genSuccessResult();
    }

    /**
     * 获取角色详细信息
     *
     * @param roleId 角色信息id
     * @return
     */
    @ApiOperation(value = "获取角色详细信息", notes = "获取角色详细信息，包括角色基本信息和具有的权限信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
            , @ApiImplicitParam(name = "roleId", value = "角色信息id", paramType="path", dataType="int", defaultValue = "1", required = true)
    })
    @GetMapping("/{roleId}")
    public Result detail(@PathVariable Integer roleId) {
        RoleDetailVO vo = roleService.findRoleByRoleId(roleId);
        return ResultGenerator.genSuccessResult(vo);
    }

    /**
     * 获取指定角色的权限信息
     *
     * @return 角色权限信息
     */
    @GetMapping("/{roleId}/permission")
    public Result getRolePermission(@PathVariable Integer roleId) {
        List<PermissionTreeModel> treeModels = permissionService.findPermissionRangeTreeFormListByRoleId(roleId);
        return ResultGenerator.genSuccessResult(treeModels);
    }

    /**
     * 获取角色信息
     *
     * @param criteria 查询条件
     * @return
     */
    @ApiOperation(value = "获取角色信息", notes = "获取角色信息列表")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/list")
    public Result list(RoleCriteria criteria, @ApiIgnore @User CurrentUser currentUser) {
        //判断当前人员是否运营商，如果不是则查询当前人员所属的角色信息
        boolean isOperate = currentUser.getCompanyType() == SystemManageConstant.COMPANY_TYPE_OPERATE;
        criteria.setUserId(isOperate ? null : currentUser.getUserId());

        List<RoleListVO> list = roleService.findRoleFormList(criteria);
        return ResultGenerator.genSuccessResult(list);
    }

    /**
     * 分页获取角色信息
     *
     * @param criteria 查询条件
     * @return
     */
    @ApiOperation(value = "分页获取角色信息", notes = "分页获取角色信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
            , @ApiImplicitParam(name = "pageNum", value = "页码", paramType="path", dataType="int", defaultValue = "1")
            , @ApiImplicitParam(name = "pageSize", value = "每页显示的条数", paramType="path", dataType="int", defaultValue = "20")
    })
    @GetMapping
    public Result pagingList(RoleCriteria criteria,@ApiIgnore @User CurrentUser currentUser) {
    	StringUtil.trimObjectStringProperties(criteria);
        //判断当前人员是否运营商，如果不是则查询当前人员所属的角色信息
        boolean isOperate = currentUser.getCompanyType() == SystemManageConstant.COMPANY_TYPE_OPERATE;
        criteria.setUserId(isOperate ? null : currentUser.getUserId());

        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<RoleListVO> list = roleService.findRoleFormList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }
}
