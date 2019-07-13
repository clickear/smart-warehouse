package com.deer.wms.system.manage.service.impl;

import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.deer.wms.system.manage.model.storage.statistics.DistributionStatistics;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.project.seed.constant.Constants;
import com.deer.wms.project.seed.core.service.AbstractService;
import com.deer.wms.project.seed.util.RedisUtil;
import com.deer.wms.system.manage.dao.CompanyStorageMapper;
import com.deer.wms.system.manage.dao.StorageBaseMapper;
import com.deer.wms.system.manage.model.storage.CompanyStorage;
import com.deer.wms.system.manage.model.storage.CompanyStorageCreate;
import com.deer.wms.system.manage.model.storage.CompanyStorageCriteria;
import com.deer.wms.system.manage.model.storage.CompanyStorageDto;
import com.deer.wms.system.manage.model.storage.CompanyStorageModify;
import com.deer.wms.system.manage.model.storage.StorageBase;
import com.deer.wms.system.manage.model.storage.StorageListVO;
import com.deer.wms.system.manage.model.storage.statistics.StatisticsCriteria;
import com.deer.wms.system.manage.service.CompanyStorageService;

/**
 * Created by WUXB on 2017/10/08.
 */
@Service
@Transactional
public class CompanyStorageServiceImpl extends AbstractService<CompanyStorage, Integer> implements CompanyStorageService {

	private static Logger logger = LoggerFactory.getLogger(CompanyStorageServiceImpl.class);
	
    @Autowired
    private CompanyStorageMapper companyStorageMapper;
    @Autowired
    private StorageBaseMapper storageBaseMapper;



    @Autowired
    private RedisUtil redisUtil;

    @Override
    public void create(CompanyStorageCreate create, CurrentUser currentUser) {
        CompanyStorage storage = new CompanyStorage();
        BeanUtils.copyProperties(create, storage);
        storage.setCreateUserId(currentUser.getUserId());
        storage.setCreateTime(new Date());
        storage.setModifyTime(new Date());
        //storage.setStorageType("2");
        super.save(storage);
//        String base = create.getBaseStationId();

        //保存基站信息

//        String[] str1 = base.split("、");
//      //  List<BaseStation> list=new ArrayList<>();
        List<StorageBase> list1 =new ArrayList<>();
//        for(String baseStationId:str1){
//            StorageBase storageBase=new StorageBase();
//            storageBase.setId(null);
//            storageBase.setBaseStationId(baseStationId);
//            storageBase.setStorageId(storage.getStorageId());
//            list1.add(storageBase);
//        }
        
        for (StorageBase base : create.getBaseList()) {
        	base.setBaseStationId(base.getLac()+base.getCellId());
        	base.setStorageId(storage.getStorageId());
    		list1.add(base);
        }
        storageBaseMapper.insertList(list1);  //网点和基站关联信息
        //保存网点和基站关联信息
    }

    @Override
    public void modify(CompanyStorageModify modify, CurrentUser currentUser) {
        CompanyStorage storage = new CompanyStorage();
        BeanUtils.copyProperties(modify, storage);
        storage.setModifyUserId(currentUser.getUserId());
        storage.setModifyTime(new Date());
        super.update(storage);
        
        // 1、获取修改前的基站ID
    	List<StorageBase> oldStationList = storageBaseMapper.findByStorageId( modify.getStorageId() );
        // 从redis缓存中删除老的基站ID，添加新的基站ID
        if(oldStationList != null && oldStationList.size() > 0)
        {
        	for (StorageBase baseStation : oldStationList)
        	{
        		String key = MessageFormat.format(Constants.BASE_STATION_KEY, baseStation.getBaseStationId());
        		 try {
        			 redisUtil.delKey( key );
 		        } catch (Exception e) {
 		        	logger.warn("put base station info to redis exception : key={}, deviceId={}, message={}", key, baseStation.getBaseStationId(), e.getMessage());
 		        }
        	}
        }
    	
        if(modify.getBaseStationId() != null){
            //删除原有的基站网点关联信息
            storageBaseMapper.deleteByStorageId(modify.getStorageId());
            //String base = modify.getBaseStationId();
            //保存基站信息
            //String[] str1 = base.split("、");
            List<StorageBase> list1 =new ArrayList<>();
//            for(String baseStationId:str1){
//                StorageBase storageBase=new StorageBase();
//                storageBase.setId(null);
//                storageBase.setBaseStationId(baseStationId);
//                storageBase.setStorageId(storage.getStorageId());
//                list1.add(storageBase);
//            }
            for (StorageBase base : modify.getBaseList()) {
            	base.setBaseStationId(base.getLac()+base.getCellId());
            	base.setStorageId(storage.getStorageId());
        		list1.add(base);
            }
            storageBaseMapper.insertList(list1);  //网点和基站关联信息
            
            // 将新添加的基站ID添加到redis中
            if (list1 != null && list1.size() > 0 )
            {
            	for (StorageBase baseStation : list1)
            	{
            		String key = MessageFormat.format(Constants.BASE_STATION_KEY, baseStation.getBaseStationId());
           		 try {
           			 redisUtil.set(key, String.valueOf( baseStation.getStorageId()) );
    		        } catch (Exception e) {
    		        	logger.warn("put base station info to redis exception : key={}, deviceId={}, message={}", key, baseStation.getBaseStationId(), e.getMessage());
    		        }
            	}
            }
            
        }
    }

    @Override
    public CompanyStorageDto detailStorage(Integer storageId) {
        CompanyStorage storage = findById(storageId);

        CompanyStorageDto dto=new CompanyStorageDto();
        BeanUtils.copyProperties(storage,dto);

        return dto;
    }

    @Override
    public void delete(Integer storageId, CurrentUser currentUser) {
        CompanyStorage storage = new CompanyStorage();
        storage.setStorageId(storageId);
        storage.setState(Constants.INFO_STATE_DELETED);
        storage.setModifyUserId(currentUser.getUserId());
        super.update(storage);
    }

    @Override
    public List<StorageListVO> findCompanyStorageFormList(CompanyStorageCriteria criteria) {
        List<StorageListVO> voList = companyStorageMapper.selectCompanyStorageByCriteria(criteria);
        return voList;
    }

	@Override
	public List<CompanyStorageDto> selectCompanyStorageListById(CompanyStorageCriteria criteria) {
		// TODO Auto-generated method stub
		return this.companyStorageMapper.selectCompanyStorageListById(criteria);
	}

	@Override
    public DistributionStatistics statistics(StatisticsCriteria criteria) {
        DistributionStatistics result = companyStorageMapper.statistics(criteria);
        return result;
    }

	@Override
	public List<CompanyStorageDto> qryStorageListByCompanyId(Integer companyId) {
		return companyStorageMapper.qryStorageListByCompanyId(companyId);
	}
}
