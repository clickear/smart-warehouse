package com.deer.wms.base.system.web;
import com.deer.wms.base.system.model.WareInfo;
import com.deer.wms.base.system.model.WareInfoCriteria;
import com.deer.wms.base.system.model.WareInfoDto;
import com.deer.wms.base.system.service.WareInfoService;
import com.deer.wms.intercept.annotation.User;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.project.seed.core.result.CommonCode;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
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
* Created by  on 2018/06/20.
*/
@Api(description = "仓库管理接口")
@RestController
@RequestMapping("/ware/infos")
public class WareInfoController {
    @Autowired
    private WareInfoService wareInfoService;
    @PostMapping("/insert")
    @ApiOperation(value="添加仓库信息",notes="添加仓库信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
          })
    public Result add(@RequestBody WareInfo wareInfo, @ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType() != -1){
            Integer companyId    = currentUser.getCompanyId();
            wareInfo.setCompanyId(companyId);
        }
        Integer companyId = currentUser.getCompanyId();
        wareInfo.setCompanyId(companyId);
        String wareCode ="CK" + companyId +"-"+RandomNo.createTimeString().substring(8,14);
        String  nowDate = DateUtils.getNowDateTimeString();
        wareInfo.setWareCode(wareCode);
        wareInfo.setAddTime(nowDate);
        wareInfoService.save(wareInfo);
        return ResultGenerator.genSuccessResult();
    }
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/delete")
    @ApiOperation(value="删除仓库信息",notes="删除仓库信息")
    public Result delete( String wareCode,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        Integer companyId ;
        WareInfoCriteria criteria = new WareInfoCriteria();
        criteria.setWareCode(wareCode);
        if(currentUser.getCompanyType() != -1){
             companyId    = currentUser.getCompanyId();
            criteria.setCompanyId(companyId);
        }

        wareInfoService.deleteByCodeAndCom(criteria);
        return ResultGenerator.genSuccessResult();
    }
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @PostMapping("/update")
    @ApiOperation(value="更新仓库信息",notes="更新仓库信息")
    public Result update(@RequestBody WareInfo wareInfo, @ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        Integer companyId = currentUser.getCompanyId();
        wareInfo.setCompanyId(companyId);
        wareInfoService.update(wareInfo);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/detail")
    @ApiOperation(value="单个仓库查询",notes="单个仓库查询")
    public Result detail( Integer id) {
        WareInfo wareInfo = wareInfoService.findById(id);
        return ResultGenerator.genSuccessResult(wareInfo);
    }
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/list")
    @ApiOperation(value="货区查询列表",notes="货区查询列表")
    public Result list(WareInfoCriteria criteria, @ApiIgnore @User CurrentUser currentUser) {

        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType() != -1){
            Integer companyId    = currentUser.getCompanyId();
            criteria.setCompanyId(companyId);
        }
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<WareInfoDto> list = wareInfoService.findList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

}
