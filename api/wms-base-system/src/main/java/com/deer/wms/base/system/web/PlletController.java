package com.deer.wms.base.system.web;
import com.deer.wms.base.system.model.PlletDto;
import com.deer.wms.base.system.model.WareInfoCriteria;
import com.deer.wms.intercept.annotation.User;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.project.seed.core.result.CommonCode;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.base.system.model.Pllet;
import com.deer.wms.base.system.model.PlletCriteria;
import com.deer.wms.base.system.service.PlletService;
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
* Created by  on 2018/06/29.
*/
@Api(description = "托盘管理接口")
@RestController
@RequestMapping("/pllets")
public class PlletController {

    @Autowired
    private PlletService plletService;
    @PostMapping("/insert")
    @ApiOperation(value="添加物料类型信息",notes="添加物料类型信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    public Result add(@RequestBody Pllet pllet ,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        Integer companyId = currentUser.getCompanyId();
        String plletCode="TP"+companyId+RandomNo.createTimeString().substring(7,14);
        pllet.setCompanyId(companyId);
        pllet.setPlletCode(plletCode);
        plletService.save(pllet);
        return ResultGenerator.genSuccessResult();
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/delete")
    @ApiOperation(value="删除托盘信息",notes="删除托盘信息")
    public Result delete( String plletCode,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        Integer companyId ;
        PlletCriteria criteria = new PlletCriteria();
        criteria.setPlletCode(plletCode);
        if(currentUser.getCompanyType() != -1){
            companyId    = currentUser.getCompanyId();
            criteria.setCompanyId(companyId);
        }

        plletService.deleteByCodeAndCom(criteria);
        return ResultGenerator.genSuccessResult();
    }
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @PostMapping("/update")
    @ApiOperation(value = "更新托盘信息",notes = "更新托盘信息")
    public Result update(@RequestBody Pllet pllet,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        Integer companyId = currentUser.getCompanyId();
        pllet.setCompanyId(companyId);
        plletService.update(pllet);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/detail")
    @ApiOperation(value="单个托盘查询",notes="单个托盘查询")
    public Result detail( Integer id) {
        Pllet pllet = plletService.findById(id);
        return ResultGenerator.genSuccessResult(pllet);
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/list")
    @ApiOperation(value="托盘列表查询",notes="托盘列表查询")
    public Result list(PlletCriteria criteria,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType() != -1){
            Integer companyId    = currentUser.getCompanyId();
            criteria.setCompanyId(companyId);
        }
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());

        List<PlletDto> list = plletService.findList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

}
