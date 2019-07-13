package com.deer.wms.base.system.web;
import com.deer.wms.base.system.model.*;
import com.deer.wms.base.system.service.AreaInfoService;
import com.deer.wms.base.system.service.WareInfoService;
import com.deer.wms.intercept.annotation.User;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.project.seed.core.result.CommonCode;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
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
* Created by  on 2018/06/20.
*/
@Api(description = "货区管理接口")
@RestController
@RequestMapping("/area/infos")
public class AreaInfoController{

    @Autowired
    private AreaInfoService areaInfoService;

    @Autowired
    private WareInfoService wareInfoService;

    @PostMapping("/insert")
    @ApiOperation(value="添加货区信息",notes="添加货区信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    public Result add(@RequestBody AreaInfo areaInfo, @ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        Integer companyId = currentUser.getCompanyId();

        WareInfo wareInfo = wareInfoService.findBy("wareCode",areaInfo.getWareCode());
        Integer wareId = wareInfo.getWareId();
        String areaCode = "HQ" + companyId +"-"+wareId +"-"+RandomNo.createTimeString().substring(2,14);

        areaInfo.setAreaCode(areaCode);
        areaInfoService.save(areaInfo);
        return ResultGenerator.genSuccessResult();
    }
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/delete")
    @ApiOperation(value="删除货区信息",notes="删除货区信息")
    public Result delete( String areaCode,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        Integer companyId ;
        AreaInfoCriteria criteria = new AreaInfoCriteria();
        criteria.setAreaCode(areaCode);
/*        if(currentUser.getCompanyType() != -1){
            companyId    = currentUser.getCompanyId();
            criteria.setCompanyId(companyId);
        }*/
        areaInfoService.deleteByCodeAndCom(criteria);
        return ResultGenerator.genSuccessResult();
    }
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @PostMapping("/update")
    @ApiOperation(value="更新货区信息",notes="更新货区信息")
    public Result update(@RequestBody AreaInfo areaInfo,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        areaInfoService.update(areaInfo);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/detail")
    @ApiOperation(value="单个货区查询",notes="单个货区查询")
    public Result detail( Integer id) {
        AreaInfo areaInfo = areaInfoService.findById(id);
        return ResultGenerator.genSuccessResult(areaInfo);
    }

    @GetMapping("/list")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @ApiOperation(value="货区查询列表",notes="货区查询列表")
    public Result list(AreaInfoCriteria criteria,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType() != -1){
            Integer companyId    = currentUser.getCompanyId();
            criteria.setCompanyId(companyId);
        }
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<AreaInfoDto> list = areaInfoService.findList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

}
