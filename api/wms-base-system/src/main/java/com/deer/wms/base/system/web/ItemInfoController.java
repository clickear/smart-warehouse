package com.deer.wms.base.system.web;
import com.deer.wms.base.system.model.*;
import com.deer.wms.base.system.service.ItemInfoService;
import com.deer.wms.base.system.service.ItemTypeService;
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
* Created by  on 2018/06/28.
*/
@RestController
@Api(description = "物料接口")
@RequestMapping("/item/infos")
public class ItemInfoController {

    @Autowired
    private ItemInfoService itemInfoService;
    @Autowired
    private ItemTypeService  itemTypeService;

    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })

    @PostMapping("/insert")
    @ApiOperation(value="添加物料信息",notes="添加物料信息")
    public Result add(@RequestBody ItemInfo itemInfo, @ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        Integer companyId = currentUser.getCompanyId();
        String itemCode="IM"+companyId+RandomNo.createTimeString().substring(7,14);
        itemInfo.setItemCode(itemCode);
        itemInfo.setCompanyId(companyId);
        itemInfoService.save(itemInfo);
        return ResultGenerator.genSuccessResult();

    }




    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/delete")
    @ApiOperation(value="删除物料信息",notes="删除物料信息")
    public Result delete( String itemCode,@ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        Integer companyId ;
        ItemInfoCriteria criteria = new ItemInfoCriteria();
        criteria.setItemCode(itemCode);
        if(currentUser.getCompanyType() != -1){
            companyId    = currentUser.getCompanyId();
            criteria.setCompanyId(companyId);
        }
        itemInfoService.deleteByCodeAndCom(criteria);
        return ResultGenerator.genSuccessResult();
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @PostMapping("/update")
    @ApiOperation(value="更新物料信息",notes="更新物料信息")
    public Result update(@RequestBody ItemInfo itemInfo, @ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        Integer companyId = currentUser.getCompanyId();
         itemInfo.setCompanyId(companyId);
        itemInfoService.update(itemInfo);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/detail")
    @ApiOperation(value="单个物料查询",notes="单个物料查询")
    public Result detail(String itemBarCode) {
        ItemInfo itemInfo = itemInfoService.findBy("itemBarCode",itemBarCode);
        return ResultGenerator.genSuccessResult(itemInfo);
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/list")
    @ApiOperation(value="物料查询列表",notes="物料查询列表")
    public Result list(ItemInfoCriteria criteria, @ApiIgnore @User CurrentUser currentUser) {
        if(currentUser == null){
            return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"未登录！",null);
        }
        if(currentUser.getCompanyType() != -1){
            Integer companyId   = currentUser.getCompanyId();
            criteria.setCompanyId(companyId);
        }

        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<ItemInfoDto> list = itemInfoService.findList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

}
