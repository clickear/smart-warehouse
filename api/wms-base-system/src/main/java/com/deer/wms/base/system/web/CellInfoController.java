package com.deer.wms.base.system.web;
import com.deer.wms.base.system.model.*;
import com.deer.wms.base.system.service.AreaInfoService;
import com.deer.wms.base.system.service.CellInfoService;
import com.deer.wms.base.system.service.ShelfInfoService;
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
@Api(description = "货位管理接口")
@RestController
@RequestMapping("/cell/infos")
public class CellInfoController {
    @Autowired
    private CellInfoService cellInfoService;
    @Autowired
    private AreaInfoService areaInfoService;
    @Autowired
    private WareInfoService wareInfoService;
    @Autowired
    private ShelfInfoService shelfInfoService;


    @PostMapping("/insert")
    @ApiOperation(value="添加货位信息",notes="添加货位信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    public Result add(@RequestBody CellInfo cellInfo, @ApiIgnore @User CurrentUser currentUser ) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        Integer companyId = currentUser.getCompanyId();
        ShelfInfo  shelfInfo=shelfInfoService.findBy("wareCode",cellInfo.getShelfCode());
        AreaInfo areaInfo = areaInfoService.findBy("areaCode",shelfInfo.getAreaCode());
        WareInfo wareInfo = wareInfoService.findBy("wareCode",areaInfo.getWareCode());
        String cellCode= "HW" +"-"+ companyId  + "-"+ wareInfo.getWareId() + "-"+ areaInfo.getAreaId()+"-"+shelfInfo.getShelfId()  + "-"+ cellInfo.getsRow() + "-"+ cellInfo.getsColumn() +  RandomNo.createTimeString().substring(7,14);

        cellInfo.setCellCode(cellCode);
        cellInfoService.save(cellInfo);
        return ResultGenerator.genSuccessResult();
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/delete")
    @ApiOperation(value="删除货位信息",notes="删除货位信息")
    public Result delete( String  cellCode,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        Integer companyId ;
        CellInfoCriteria criteria = new CellInfoCriteria();
        criteria.setCellCode(cellCode);
        if(currentUser.getCompanyType() != -1){
            companyId    = currentUser.getCompanyId();
            criteria.setCompanyId(companyId);
        }

        cellInfoService.deleteByCodeAndCom(criteria);
        return ResultGenerator.genSuccessResult();
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @PostMapping("/update")
    @ApiOperation(value="更新货位信息",notes="更新货位信息")
    public Result update(@RequestBody CellInfo cellInfo, @ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }

        cellInfoService.update(cellInfo);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/detail")
    @ApiOperation(value="单个货位查询",notes="单个货位查询")
    public Result detail( Integer id) {
        CellInfo cellInfo = cellInfoService.findById(id);
        return ResultGenerator.genSuccessResult(cellInfo);
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/list")
    @ApiOperation(value="货位查询列表",notes="货位查询列表")
    public Result list(CellInfoCriteria criteria, @ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType() != -1){
            Integer companyId    = currentUser.getCompanyId();
            criteria.setCompanyId(companyId);
        }
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<CellInfoDto> list = cellInfoService.findList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

}
