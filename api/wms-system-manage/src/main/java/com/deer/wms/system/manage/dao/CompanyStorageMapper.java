package com.deer.wms.system.manage.dao;

import com.deer.wms.project.seed.core.mapper.Mapper;
import com.deer.wms.system.manage.model.storage.CompanyStorage;
import com.deer.wms.system.manage.model.storage.CompanyStorageCriteria;
import com.deer.wms.system.manage.model.storage.CompanyStorageDto;
import com.deer.wms.system.manage.model.storage.StorageListVO;
import com.deer.wms.system.manage.model.storage.statistics.DistributionStatistics;
import com.deer.wms.system.manage.model.storage.statistics.StatisticsCriteria;

import java.util.List;

public interface CompanyStorageMapper extends Mapper<CompanyStorage> {
	/**
	 * 查询满足查询条件的网点/仓储点信息
	 *
	 * @param criteria 查询条件
	 * @return 网点/仓储点信息列表
	 */
	List<StorageListVO> selectCompanyStorageByCriteria(CompanyStorageCriteria criteria);

	/**
	 *根据企业id查询网点的托盘相关信息 
	 * @param criteria
	 * @return
	 */
	List<CompanyStorageDto> selectCompanyStorageListById(CompanyStorageCriteria criteria);

	/**
	 * 网点分布情况统计
	 *
	 * @param criteria 统计条件
	 * @return 统计结果
	 */
	DistributionStatistics statistics(StatisticsCriteria criteria);

	/**
	 * 查询网点下托盘数量
	 * @param  storageId
	 * @return
	 */
	Integer getPlasticStock(Integer  storageId);
	
	/**
     * 根据companyId查询所有仓储点信息
     * @param companyId
     * @return
     */
    List<CompanyStorageDto> qryStorageListByCompanyId(Integer companyId);
}