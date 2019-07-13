package com.deer.wms.system.manage.service;

import com.deer.wms.intercept.common.data.CurrentUser;
import com.deer.wms.project.seed.core.service.Service;
import com.deer.wms.system.manage.model.storage.statistics.DistributionStatistics;
import com.deer.wms.system.manage.model.storage.statistics.StatisticsCriteria;
import com.deer.wms.system.manage.model.storage.*;

import java.util.List;

/**
 * Created by WUXB on 2017/10/08.
 */
public interface CompanyStorageService extends Service<CompanyStorage, Integer> {
    /**
     * 添加网点/仓储点信息
     *
     * @param create 网点/仓储点信息
     * @param currentUser 当前操作人员的信息
     */
    void create(CompanyStorageCreate create, CurrentUser currentUser);

    /**
     * 修改网点/仓储点信息
     *
     * @param modify 网点/仓储点信息
     * @param currentUser 当前操作人员的信息
     */
    void modify(CompanyStorageModify modify, CurrentUser currentUser);

    /**
     * 查询网点/仓储点信息
     *
     * @param
     * @param
     */
    CompanyStorageDto detailStorage(Integer storageId);

    /**
     * 删除网点/仓储点信息
     *
     * @param storageId 网点/仓储点信息id
     * @param currentUser 当前操作人员的信息
     */
    void delete(Integer storageId, CurrentUser currentUser);

    /**
     * 找到满足查询条件的网点/仓储点信息列表
     *
     * @param criteria 查询条件
     * @return 网点/仓储点信息列表
     */
    List<StorageListVO> findCompanyStorageFormList(CompanyStorageCriteria criteria);
    
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
     * 根据companyId查询所有仓储点信息
     * @param companyId
     * @return
     */
    List<CompanyStorageDto> qryStorageListByCompanyId(Integer companyId);
}
