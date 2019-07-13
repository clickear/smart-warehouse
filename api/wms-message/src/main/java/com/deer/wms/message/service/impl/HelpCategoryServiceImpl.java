package com.deer.wms.message.service.impl;

import java.util.List;

import com.deer.wms.message.dao.HelpCategoryMapper;
import com.deer.wms.message.model.HelpCategory;
import com.deer.wms.message.model.HelpCategoryCriteria;
import com.deer.wms.message.service.HelpCategoryService;
import com.deer.wms.project.seed.core.service.AbstractService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by WUXB on 2017/10/09.
 */
@Service
@Transactional
public class HelpCategoryServiceImpl extends AbstractService<HelpCategory, Integer> implements HelpCategoryService {

    @Autowired
    private HelpCategoryMapper helpCategoryMapper;

	@Override
	public List<HelpCategory> selectHelpCategoryByCriteria(
			HelpCategoryCriteria criteria) {
		// TODO Auto-generated method stub
		return helpCategoryMapper.selectHelpCategoryByCriteria(criteria);
	}

	@Override
	public int add(HelpCategory helpCategory) {
		return helpCategoryMapper.add(helpCategory);
	}

	@Override
	public List<HelpCategory> selectByName(HelpCategoryCriteria criteria) {
		return helpCategoryMapper.selectByName(criteria);
	}

}
