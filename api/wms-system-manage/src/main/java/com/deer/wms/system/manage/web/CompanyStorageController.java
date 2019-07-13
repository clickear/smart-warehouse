package com.deer.wms.system.manage.web;

import com.alibaba.druid.util.StringUtils;
import com.deer.wms.intercept.annotation.Authority;
import com.deer.wms.intercept.annotation.User;
import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.project.seed.core.result.CommonCode;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.project.seed.util.StringUtil;
import com.deer.wms.system.manage.model.storage.statistics.DistributionStatistics;
import com.deer.wms.system.manage.model.storage.statistics.StatisticsCriteria;
import com.deer.wms.system.manage.service.CompanyStorageService;
import com.deer.wms.system.manage.model.storage.*;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * 机构管理-仓储点api接口
 *
* Created by WUXB on 2017/10/08.
*/
@Api(description = "机构管理-仓储点api接口")
@Authority
@RestController
@RequestMapping("/storage")
public class CompanyStorageController {

    @Autowired
    private CompanyStorageService companyStorageService;


    
    private int treeIndex = 0;

    /**
     * 分页查询仓储点信息
     *
     * @param criteria 查询条件
     * @return
     */
    @ApiOperation(value = "分页查询仓储点信息", notes = "分页查询仓储点信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
            , @ApiImplicitParam(name = "pageNum", value = "页码", paramType="query", dataType="int", required = true, defaultValue = "1")
            , @ApiImplicitParam(name = "pageSize", value = "每页显示的条数", paramType="query", dataType="int", required = true, defaultValue = "20")
            , @ApiImplicitParam(name = "province", value = "省份名称", paramType="query", dataType="string")
            , @ApiImplicitParam(name = "city", value = "城市名称", paramType="query", dataType="string")
            , @ApiImplicitParam(name = "county", value = "区县名称", paramType="query", dataType="string")
            , @ApiImplicitParam(name = "keyword", value = "关键字：网点名称或网点电话", paramType="query", dataType="string")
    })
    @GetMapping()
    public Result pagingList(CompanyStorageCriteria criteria) {
    	StringUtil.trimObjectStringProperties(criteria);
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<StorageListVO> list = companyStorageService.findCompanyStorageFormList(criteria);
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

    /**
     * 查询满足查询条件的网点/仓储点信息
     *
     * @param criteria 查询条件
     * @return
     */
    @ApiOperation(value = "查询满足查询条件的网点/仓储点信息", notes = "查询满足查询条件的网点/仓储点信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
            , @ApiImplicitParam(name = "companyId", value = "所属公司id", paramType="query", dataType="int", required = true)
    })
    @GetMapping("/list")
    public Result list(CompanyStorageCriteria criteria) {
    	StringUtil.trimObjectStringProperties(criteria);
		PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
		List<StorageListVO> list = companyStorageService.findCompanyStorageFormList(criteria);
		PageInfo pageInfo=new PageInfo(list);
		return ResultGenerator.genSuccessResult(pageInfo);





    }

    /**
     * 创建仓储点信息
     *
     * @param create 创建的仓储点信息
     * @param currentUser 当前操作用户的信息
     * @return
     */
    @ApiOperation(value = "创建仓储点信息", notes = "创建仓储点信息")
	@ApiImplicitParams({
			@ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
			, @ApiImplicitParam(name = "storageName", value = "网点名称", paramType="query", dataType="int", required = true)
			, @ApiImplicitParam(name = "address", value = "网点地址", paramType="query", dataType="int", required = true)
			, @ApiImplicitParam(name = "phone", value = "网点联系方式", paramType="query", dataType="string", required = true)
			, @ApiImplicitParam(name = "linkmanName", value = "网点联系人", paramType="query", dataType="string" ,required = true)
			, @ApiImplicitParam(name = "companyId", value = "所属公司：如果是新增网点 companyId=1  如果是新增仓储点 等于具体的公司id", paramType="query", dataType="string" ,required = true)
			, @ApiImplicitParam(name = "baseStationId", value = "基站", paramType="query", dataType="string")
			, @ApiImplicitParam(name = "storageType", value = " 类型：1=网点；2=仓储点；", paramType="query", dataType="string" ,required = true)
			, @ApiImplicitParam(name = "baseList", value = "lac,cellId", paramType="query", dataType="list",required = true)
	})
    @PostMapping()
    public Result addStorage(@RequestBody CompanyStorageCreate create, @ApiIgnore @User CurrentUser currentUser) {
    	CompanyStorageCriteria criteria = new CompanyStorageCriteria();
    	criteria.setPageNum(null);
        criteria.setPageSize(null);
    	criteria.setCompanyId(create.getCompanyId());
    	List<StorageListVO>  voList = companyStorageService.findCompanyStorageFormList(criteria);
    	for (StorageListVO item : voList) {
    		if (create.getStorageName().toString().equals(item.getStorageName().toString())) {
    			return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"存在相同的"+(create.getCompanyId()==1?"网点":"仓储点")+"名称！",null);
    		}
    	}
        companyStorageService.create(create, currentUser);
        return ResultGenerator.genSuccessResult("");
    }

    /**
     * 修改仓储点信息
     *
     * @param modify 修改的仓储点信息
     * @param currentUser 当前操作用户的信息
     * @return
     */
    @ApiOperation(value = "修改仓储点信息", notes = "修改仓储点信息")
	@ApiImplicitParams({
			@ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
			, @ApiImplicitParam(name = "storageName", value = "网点名称", paramType="query", dataType="int", required = true)
			, @ApiImplicitParam(name = "address", value = "网点地址", paramType="query", dataType="int", required = true)
			, @ApiImplicitParam(name = "phone", value = "网点联系方式", paramType="query", dataType="string", required = true)
			, @ApiImplicitParam(name = "linkmanName", value = "网点联系人", paramType="query", dataType="string" ,required = true)
			, @ApiImplicitParam(name = "companyId", value = "所属公司：如果是新增网点 companyId=1  如果是新增仓储点 等于具体的公司id", paramType="query", dataType="string" )
			, @ApiImplicitParam(name = "baseStationId", value = "基站", paramType="query", dataType="string" ,required = true)
			, @ApiImplicitParam(name = "storageType", value = " 类型：1=网点；2=仓储点；", paramType="query", dataType="string")
			, @ApiImplicitParam(name = "baseList", value = "lac,cellId", paramType="query", dataType="list",required = true)
	})
    @PutMapping("/{storageId}")
    public Result modifyStorage(@PathVariable Integer storageId, @RequestBody CompanyStorageModify modify, @ApiIgnore @User CurrentUser currentUser) {
    	CompanyStorage companyStorage  = companyStorageService.findById(storageId);
    	CompanyStorageCriteria criteria = new CompanyStorageCriteria();
    	criteria.setPageNum(null);
        criteria.setPageSize(null);
    	criteria.setCompanyId(companyStorage.getCompanyId());
    	List<StorageListVO>  voList = companyStorageService.findCompanyStorageFormList(criteria);
    	for (StorageListVO item : voList) {
    		if (modify.getStorageName().toString().equals(item.getStorageName().toString()) && item.getStorageId().intValue() != storageId.intValue() ) {
    			return ResultGenerator.genFailResult(CommonCode.SERVICE_ERROR,"存在相同的"+(modify.getCompanyId()==1?"网点":"仓储点")+"名称！",null);
    		}
    	}
        modify.setStorageId(storageId);
        companyStorageService.modify(modify, currentUser);
        return ResultGenerator.genSuccessResult("");
    }

    /**
     * 获取仓储点信息
     *
     * @param storageId
     * @return
     */
    @ApiOperation(value = "获取仓储点信息", notes = "获取仓储点信息")
	@ApiImplicitParams({
			@ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
	})
    @GetMapping("/{storageId}")
    public Result detailStorage(@PathVariable Integer storageId) {



        CompanyStorageDto dto=companyStorageService.detailStorage(storageId);

        return ResultGenerator.genSuccessResult(dto);
    }

    /**
     * 删除仓储点信息
     *
     * @param storageId 仓储点信息id
     * @param currentUser 当前操作用户的信息
     * @return
     */
    @ApiOperation(value = "删除仓储点信息", notes = "删除仓储点信息")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
            , @ApiImplicitParam(name = "storageId", value = "仓储点信息id", paramType="path", dataType="int", required = true)
    })
    @DeleteMapping("/{storageId}")
    public Result delete(@PathVariable Integer storageId, @ApiIgnore @User CurrentUser currentUser) {
        companyStorageService.delete(storageId, currentUser);
        return ResultGenerator.genSuccessResult("");
    }

    /**
     * 客户网点分布统计
     *
     * @param criteria 统计条件
     * @return
     */
    @ApiOperation(value = "客户网点分布统计", notes = "客户网点分布统计")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
            , @ApiImplicitParam(name = "province", value = "省份，如果为空则统计全国", paramType="query", dataType="string")
    })
    @GetMapping("/statistics/distribution")
    public Result statistics(StatisticsCriteria criteria) {
    	StringUtil.trimObjectStringProperties(criteria);
        DistributionStatistics statistics = companyStorageService.statistics(criteria);
        return ResultGenerator.genSuccessResult(statistics);
    }
    
    /**
     * 客户网点分布统计
     *
     * @param currentUser 统计条件
     * @return
     */
    @ApiOperation(value = "获取出货网点集合集合", notes = "获取出货网点集合集合")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/getCompanyStorageList")
    public Result getCompanyStorageList(@ApiIgnore @User CurrentUser currentUser)
    {
    	CompanyStorageCriteria condition = new CompanyStorageCriteria();
    	condition.setCompanyId( currentUser.getCompanyId() );
    	// 查询所有集合
    	List<CompanyStorageDto> list = companyStorageService.selectCompanyStorageListById(condition);
    	for(CompanyStorageDto dto : list)
    	{
    		// 设置下拉列表中显示的名称
    		String storageName = dto.getStorageName();
    	//	long palletCount = dto.getWoodinessStock().intValue() + dto.getPlasticStock().intValue() + dto.getDieStock().intValue() + dto.getOtherStock().intValue();
    	//	storageName = storageName + " (托盘总数  " + palletCount + ")";
    	//	dto.setStorageName( storageName );
    	//	dto.setPalletCount(palletCount);
    	}
    	
    	return ResultGenerator.genSuccessResult(list);
    }
    
    /**
     * 客户网点分布统计
     *
     * @param  currentUser 统计条件
     * @return
     */
    @ApiOperation(value = "获取网点分布树集合", notes = "获取网点分布树集合")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    })
    @GetMapping("/getStorageTreeList")
    public Result getStorageTreeList(CompanyStorageCriteria condition,@ApiIgnore @User CurrentUser currentUser)
    {
    	condition.setPageNum(null);
    	condition.setPageSize(null);
    	StringUtil.trimObjectStringProperties(condition);
    	List<StorageTreeModel> treeList = new ArrayList<StorageTreeModel>();
    	condition.setCompanyId( currentUser.getCompanyId() );
    	// 查询所有集合
    	List<CompanyStorageDto> list = companyStorageService.selectCompanyStorageListById(condition);
    	
    	treeIndex = 0;
    	
    	// 获取平台网点 树对象
    	treeList.add(getPlatTreeObj(list));
    	
    	// 设置二级树（循环递归设置树）
    	recursionSetStorageTree(2, null, null, 1, list, treeList, new HashMap<String, String>());
    	
    	return ResultGenerator.genSuccessResult(treeList);
    }
    
    /**
     * 递归设置树
     * @param type 2：省， 3:：市， 4：仓库
     * @param province 省名
     * @city 市名
     * @param list
     * @param treeList
     * @param treeMap
     */
    private void recursionSetStorageTree(int type, String province, String city, Integer pId, List<CompanyStorageDto> list, List<StorageTreeModel> treeList, HashMap<String, String> treeMap)
    {
    	for ( CompanyStorageDto story : list )
    	{
    		if (type == 2)
    		{
    			if (StringUtils.isEmpty( story.getProvince() ))
    			{
    				continue;
    			}
    			
    			if (treeMap.get( story.getProvince() ) == null)
    			{
    				treeIndex = treeIndex + 1;
    				treeMap.put( story.getProvince(), story.getProvince() );
    				treeList.add(getProvinceTreeObj(list, story.getProvince(), pId, treeIndex ));
    				recursionSetStorageTree(3, story.getProvince(), null, treeIndex, list, treeList, treeMap);
    			}
    		}
    		else if(type == 3)
    		{
    			if (StringUtils.isEmpty( story.getCity() ))
    			{
    				continue;
    			}
    			
    			if (treeMap.get( province + story.getCity() ) == null)
    			{
    				// 校验是否是此省下面的地市
    				if (province.equals( story.getProvince() ))
    				{
    					treeIndex = treeIndex + 1;
    					treeMap.put( province + story.getCity(), province + story.getCity() );
    					treeList.add(getCityTreeObj(list, province, story.getCity(), pId, treeIndex ));
    					recursionSetStorageTree(4, province, story.getCity(), treeIndex, list, treeList, treeMap);
    				}
    			}
    		}
    		else if (type == 4)
    		{
    			if (province.equals( story.getProvince() ) && city.equals( story.getCity() ))
    			{
    				treeIndex = treeIndex + 1;
    				StorageTreeModel treeModel = new StorageTreeModel();
        	    	treeModel.setId(treeIndex);
        			treeModel.setName( story.getStorageName() );
        			treeModel.setPid( pId );
        			treeModel.setResourceId( story.getStorageId() );
        			treeModel.setLevel( 4 );
        			treeModel.setCompanyName( story.getCompanyName() );
        			/*treeModel.setPalletCount( story.getWoodinessStock().longValue() +
    						story.getPlasticStock().longValue() + story.getDieStock().longValue() + story.getOtherStock().longValue());*/
        			treeModel.setPalletCount(story.getPalletCount());
        			treeModel.setLng(story.getLng());
        			treeModel.setLat(story.getLat());
					treeModel.setAddress(story.getAddress());
					treeModel.setLinkmanName(story.getLinkmanName());
					treeModel.setPhone(story.getPhone());
        			treeList.add(treeModel);
    			}
    		}
    	}
    }
    
    
    /**
     * 获取平台网点 树对象
     * @param storageList
     * @return
     */
    private StorageTreeModel getPlatTreeObj(List<CompanyStorageDto> storageList)
    {
    	treeIndex = treeIndex + 1;
    	
    	StorageTreeModel treeModel = new StorageTreeModel();
    	treeModel.setId( treeIndex );
		treeModel.setName( "平台网点" );
		treeModel.setPid( -1 );
		treeModel.setLevel( 1 );
		
		long palletCount = 0;
		if(storageList == null || storageList.size() == 0)
		{
			treeModel.setPalletCount( 0l );
		}
		else
		{
			for (CompanyStorageDto storage : storageList )
			{
				/*palletCount = palletCount + storage.getWoodinessStock().longValue() +
						storage.getPlasticStock().longValue() + storage.getDieStock().longValue() + storage.getOtherStock().longValue();*/
				palletCount += storage.getPalletCount();
			}
			treeModel.setPalletCount(palletCount);
		}
    	
    	return treeModel;
    }
    
    /**
     * 获取省节点对象
     * @param storageList 仓库列表集合
     * @param provinceName 省名称
     * @param pId
     * @param Id
     * @return
     */
    private StorageTreeModel getProvinceTreeObj(List<CompanyStorageDto> storageList, String provinceName, Integer pId, Integer Id)
    {
    	StorageTreeModel treeModel = new StorageTreeModel();
    	treeModel.setId(treeIndex);
		treeModel.setName( provinceName );
		treeModel.setPid( pId );
		treeModel.setLevel( 2 );
		
		long palletCount = 0;
		for (CompanyStorageDto storage : storageList )
		{
			if (provinceName.equals( storage.getProvince() ))
			{
				/*palletCount = palletCount + storage.getWoodinessStock().longValue() +
						storage.getPlasticStock().longValue() + storage.getDieStock().longValue() + storage.getOtherStock().longValue();*/
				palletCount +=storage.getPalletCount();
			}
		}
		
		treeModel.setPalletCount(palletCount);
		return treeModel;
    }
    
    /**
     * 获取地市树节点地址
     * @param storageList 仓库列表集合
     * @param provinceName 省名称
     * @param cityName 地市名称
     * @param pId 
     * @param Id
     * @return
     */
    private StorageTreeModel getCityTreeObj(List<CompanyStorageDto> storageList, String provinceName,  String cityName, Integer pId, Integer Id)
    {
    	StorageTreeModel treeModel = new StorageTreeModel();
    	treeModel.setId(Id);
		treeModel.setName( cityName );
		treeModel.setPid( pId );
		treeModel.setLevel( 3 );
		
		long palletCount = 0;
		for (CompanyStorageDto storage : storageList )
		{
			if (provinceName.equals( storage.getProvince() ) && cityName.equals( storage.getCity() ))
			{
				/*palletCount = palletCount + storage.getWoodinessStock().longValue() +
						storage.getPlasticStock().longValue() + storage.getDieStock().longValue() + storage.getOtherStock().longValue();*/
				palletCount += storage.getPalletCount();
			}
		}
		
		treeModel.setPalletCount(palletCount);
		return treeModel;
    }
    
}
