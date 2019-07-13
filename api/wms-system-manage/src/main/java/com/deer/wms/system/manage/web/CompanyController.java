package com.deer.wms.system.manage.web;

import com.deer.wms.intercept.annotation.Authority;
import com.deer.wms.intercept.annotation.User;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.project.seed.core.result.CommonCode;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.project.seed.util.StringUtil;
import com.deer.wms.system.manage.model.company.*;
import com.deer.wms.system.manage.service.CompanyService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 机构管理api接口
 *
 * Created by Floki on 2017/10/8.
 */
@Api(description = "机构管理api接口")
@Authority
@RestController
@RequestMapping("/company")
public class CompanyController {

    @Autowired
    protected CompanyService companyService;

    /**
     * 分页查询机构信息
     *
     * @param criteria 查询条件
     * @return
     */
    @ApiOperation(value = "分页查询机构信息", notes = "分页查询机构信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
            , @ApiImplicitParam(name = "pageNum", value = "页码", paramType="query", dataType="int", required = true, defaultValue = "1")
            , @ApiImplicitParam(name = "pageSize", value = "每页显示的条数", paramType="query", dataType="int", required = true, defaultValue = "20")
            , @ApiImplicitParam(name = "companyId", value = "机构信息id", paramType="query", dataType="int")
            , @ApiImplicitParam(name = "companyType", value = "机构类型：-1=托盘运营商；1=托盘生产商；2=投资商；3=运营代理商；4=托盘承租方；5=POI；", paramType="query", dataType="int")
            , @ApiImplicitParam(name = "province", value = "省份名称", paramType="query", dataType="string")
            , @ApiImplicitParam(name = "city", value = "城市名称", paramType="query", dataType="string")
            , @ApiImplicitParam(name = "county", value = "区县名称", paramType="query", dataType="string")
            , @ApiImplicitParam(name = "keyword", value = "关键字：机构名称或电话号码", paramType="query", dataType="string")
    })
    @GetMapping
    public Result getCompanyPagingList(CompanyCriteria criteria, @ApiIgnore @User CurrentUser currentUser) {
        if(currentUser.getCompanyType()!=-1){
            criteria.setCompanyId(currentUser.getCompanyId());
        }
    	StringUtil.trimObjectStringProperties(criteria);
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<CompanyListVO> voList = companyService.findCompanyFormList(criteria);
        PageInfo pageInfo = new PageInfo(voList);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

    /**
     * 查询所有机构信息
     *
     * @param criteria 查询条件
     * @return
     */
    @ApiOperation(value = "查询所有机构信息", notes = "查询所有机构信息列表")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
            , @ApiImplicitParam(name = "companyId", value = "机构信息id", paramType="query", dataType="int")
            , @ApiImplicitParam(name = "companyType", value = "机构类型：-1=托盘运营商；1=托盘生产商；2=投资商；3=运营代理商；4=托盘承租方；5=POI；", paramType="query", dataType="int")
            , @ApiImplicitParam(name = "province", value = "省份名称", paramType="query", dataType="string")
            , @ApiImplicitParam(name = "city", value = "城市名称", paramType="query", dataType="string")
            , @ApiImplicitParam(name = "county", value = "区县名称", paramType="query", dataType="string")
            , @ApiImplicitParam(name = "keyword", value = "关键字：机构名称或电话号码", paramType="query", dataType="string")
    })
    @GetMapping("/list")
    public Result getCompanyList(CompanyCriteria criteria, @ApiIgnore @User CurrentUser currentUser) {
    	StringUtil.trimObjectStringProperties(criteria);
        criteria.setPageNum(null);
        criteria.setPageSize(null);
        List<CompanyListVO> voList = companyService.findCompanyFormList(criteria);
        return ResultGenerator.genSuccessResult(voList);
    }

    /**
     * 获取机构详细信息
     *
     * @param companyId 机构信息id
     * @return
     */
    @ApiOperation(value = "获取机构详细信息", notes = "获取机构详细信息，包括机构下的仓储点信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
            , @ApiImplicitParam(name = "companyId", value = "客户单位信息id", paramType="path", dataType="int", required = true)
    })
    @GetMapping("/{companyId}")
    public Result getCompanyDetail(@PathVariable Integer companyId) {
        CompanyCriteria criteria = new CompanyCriteria();
        criteria.setCompanyId(companyId);
        CompanyDetailVO vo = companyService.findCompany(criteria);
        return ResultGenerator.genSuccessResult(vo);
    }

    /**
     * 创建机构信息
     *
     * @param create 机构信息
     * @return
     */
    @ApiOperation(value = "创建机构信息", notes = "创建机构信息")
    @PostMapping()
    public Result createCompany(CompanyCreate create, HttpServletRequest request, @ApiIgnore @User CurrentUser currentUser) {
    	CompanyCriteria criteria = new CompanyCriteria();
    	criteria.setPageNum(null);
        criteria.setPageSize(null);
        List<CompanyListVO> voList = companyService.findCompanyFormList(criteria);
        for ( CompanyListVO vo : voList ) {
        	if (create.getCompanyName().toString().equals(vo.getCompanyName().toString())) {
        		return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"存在相同的公司名称！",null);
        	}
        }
        companyService.createCompany(create, currentUser);
        return ResultGenerator.genSuccessResult("");
    }

    /**
     * 修改机构信息
     *
     * @param companyId 客户机构信息id
     * @return
     */
    @ApiOperation(value = "修改机构信息", notes = "修改机构信息")
    @PostMapping("/{companyId}")
    public Result modifyCompany(@PathVariable Integer companyId, CompanyModify modify, HttpServletRequest request, @ApiIgnore @User CurrentUser currentUser) {
    	CompanyCriteria criteria = new CompanyCriteria();
    	criteria.setPageNum(null);
        criteria.setPageSize(null);
        List<CompanyListVO> voList = companyService.findCompanyFormList(criteria);
        for ( CompanyListVO vo : voList ) {
        	if (modify.getCompanyName().toString().equals(vo.getCompanyName().toString()) && vo.getCompanyId().intValue() != companyId.intValue() ) {
        		return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"存在相同的公司名称！",null);
        	}
        }
        modify.setCompanyId(companyId);
        companyService.modifyCompany(modify, currentUser);
        return ResultGenerator.genSuccessResult("");
    }

    /**
     * 获取公司对应的角色信息列表
     *
     * @param companyId 公司id
     * @return
     */
    @PostMapping("/{companyId}/roles")
    public Result getCompanyRole(@PathVariable Integer companyId) {
        return ResultGenerator.genSuccessResult("");
    }
}
