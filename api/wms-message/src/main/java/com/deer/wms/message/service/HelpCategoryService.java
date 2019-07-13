package com.deer.wms.message.service;

import java.util.List;

import com.deer.wms.message.model.HelpCategory;
import com.deer.wms.message.model.HelpCategoryCriteria;
import com.deer.wms.project.seed.core.service.Service;

/**
 * Created by WUXB on 2017/10/09.
 */
public interface HelpCategoryService extends Service<HelpCategory, Integer> {
	/**
	 * 根据条件查询帮助中心信息
	 * @param criteria
	 * @return
	 * @author gmd
	 */
	public List<HelpCategory> selectHelpCategoryByCriteria(HelpCategoryCriteria criteria);
	
	
	public int add(HelpCategory helpCategory);
	
	/**
	 * 判断帮助文档导航是否已经存在
	 * @param criteria
	 * @return
	 */
	public List<HelpCategory> selectByName(HelpCategoryCriteria criteria);
}
