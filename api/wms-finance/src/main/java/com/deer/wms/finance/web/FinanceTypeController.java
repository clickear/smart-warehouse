package com.deer.wms.finance.web;
import com.deer.wms.intercept.annotation.User;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.project.seed.core.result.CommonCode;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.finance.model.FinanceType;
import com.deer.wms.finance.model.FinanceTypeCriteria;
import com.deer.wms.finance.service.FinanceTypeService;
import com.deer.wms.project.seed.util.DateUtils;
import com.deer.wms.project.seed.util.RandomNo;
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
* Created by  on 2018/07/04.
*/
@RestController
@Api(description = "财务类别管理接口")
@RequestMapping("/finance/types")
public class FinanceTypeController {

    @Autowired
    private FinanceTypeService financeTypeService;

    @PostMapping("/insert")
    @ApiOperation(value="添加财务信息",notes="添加财务信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    public Result add(@RequestBody FinanceType financeType, @ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType() != -1){
            Integer companyId    = currentUser.getCompanyId();
            financeType.setCompanyId(companyId);
        }
        String  fTypeCode="CW"+currentUser.getCompanyId()+RandomNo.createTimeString().substring(2,14);
        financeType.setfTypeCode(fTypeCode);
        Integer companyId = currentUser.getCompanyId();
        financeType.setCompanyId(companyId);
        String nowDate = DateUtils.getNowDateTimeString();
        financeType.setAddTime(nowDate);
        financeTypeService.save(financeType);
        return ResultGenerator.genSuccessResult();
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/delete")
    @ApiOperation(value="删除财务信息",notes="删除财务信息")
    public Result delete( String fTypeCode,@ApiIgnore @User CurrentUser currentUser ) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        Integer companyId ;
        FinanceTypeCriteria criteria = new FinanceTypeCriteria();
        criteria.setfTypeCode(fTypeCode);
        if(currentUser.getCompanyType() != -1){
            companyId    = currentUser.getCompanyId();
            criteria.setCompanyId(companyId);
        }
        financeTypeService.deleteByCodeAndCom(criteria);
        return ResultGenerator.genSuccessResult();
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @PostMapping("/update")
    @ApiOperation(value="更新财务信息",notes="更新财务信息")
    public Result update(@RequestBody FinanceType financeType,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType() != -1){
            Integer companyId    = currentUser.getCompanyId();
            financeType.setCompanyId(companyId);
        }
        financeTypeService.update(financeType);
        return ResultGenerator.genSuccessResult();
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/detail")
    @ApiOperation(value="单个财务信息查询",notes="单个财务信息查询")
    public Result detail(  Integer id,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }

        FinanceType financeType = financeTypeService.findById(id);
        return ResultGenerator.genSuccessResult(financeType);
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/list")
    @ApiOperation(value="财务信息查询列表",notes="财务信息查询列表")
    public Result list(FinanceTypeCriteria criteria, @ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType() != -1){
            Integer companyId    = currentUser.getCompanyId();
            criteria.setCompanyId(companyId);
        }


        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<FinanceType> list = financeTypeService.findList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

}
