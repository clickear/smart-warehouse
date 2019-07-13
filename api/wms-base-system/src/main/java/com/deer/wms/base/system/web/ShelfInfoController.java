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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

import static com.deer.wms.project.seed.util.RandomNo.createNo;

/**
* Created by  on 2018/06/20.
*/
@Api(description = "货架管理接口")
@RestController
@RequestMapping("/shelf/infos")
public class ShelfInfoController {

    @Autowired
    private ShelfInfoService shelfInfoService;
    @Autowired
    private CellInfoService cellInfoService;
    @Autowired
    private AreaInfoService   areaInfoService;
    @Autowired
    private WareInfoService  wareInfoService;

    @PostMapping("/insert")
    @ApiOperation(value="添加货架信息",notes="添加货架信息")
    @Transactional
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    public Result add(@RequestBody ShelfInfo shelfInfo, @ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        Integer companyId = currentUser.getCompanyId();
        AreaInfo areaInfo = areaInfoService.findBy("areaCode",shelfInfo.getAreaCode());
        WareInfo wareInfo = wareInfoService.findBy("wareCode",areaInfo.getWareCode());

        String shelfCode= "HJ" + companyId  +"-"+ wareInfo.getWareId()
                +"-"+ areaInfo.getAreaId()   +"-"+  RandomNo.createTimeString().substring(8,14);
        shelfInfo.setShelfCode(shelfCode);
        shelfInfoService.save(shelfInfo);

        Integer shelfRow=shelfInfo.getShelfRow();
        Integer shelfColumn=shelfInfo.getShelfColumn();
        for(int i=1;i<=shelfRow;i++){
            for (int j=1;j<=shelfColumn;j++){

                String cellCode= "HW" + "-"+companyId  +"-"+ wareInfo.getWareId() +"-"+  areaInfo.getAreaId()  +"-"+shelfInfo.getShelfId() + "-"+ i +"-"+   j;

                CellInfo cellInfo=new CellInfo();
                cellInfo.setCellCode(cellCode);

                cellInfo.setShelfCode(shelfInfo.getShelfCode());
                cellInfo.setsColumn(j);
                cellInfo.setsRow(i);
                cellInfoService.save(cellInfo);
            }
        }

        cellInfoService.setOrder(shelfInfo);


        return ResultGenerator.genSuccessResult();
    }
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/delete")
    @ApiOperation(value="删除货架信息",notes="删除货架信息")
    public Result delete( String shelfCode,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        Integer companyId ;
        ShelfInfoCriteria criteria=new ShelfInfoCriteria();
        criteria.setShelfCode(shelfCode);
        if(currentUser.getCompanyType() != -1){
            companyId    = currentUser.getCompanyId();
            criteria.setCompanyId(companyId);
        }
        shelfInfoService.deleteByCodeAndCom(criteria);
        return ResultGenerator.genSuccessResult();
    }
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @PostMapping("/update")
    @ApiOperation(value="更新货架信息",notes="更新货架信息")
    public Result update(@RequestBody ShelfInfo shelfInfo,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        shelfInfoService.update(shelfInfo);
        cellInfoService.setOrder(shelfInfo);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/detail")
    @ApiOperation(value="单个货架查询",notes="单个货架查询")
    public Result detail( Integer id) {
        ShelfInfo shelfInfo = shelfInfoService.findById(id);
        return ResultGenerator.genSuccessResult(shelfInfo);
    }



    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/list")
    @ApiOperation(value="货架查询列表",notes="货架查询列表")
    public Result list(ShelfInfoCriteria criteria, @ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType() != -1){
            Integer companyId    = currentUser.getCompanyId();
            criteria.setCompanyId(companyId);
        }
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<ShelfInfoDto> list = shelfInfoService.findList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

}
