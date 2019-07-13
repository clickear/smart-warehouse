package com.deer.wms.message.service.impl;

import com.deer.wms.message.dao.HelpContentMapper;
import com.deer.wms.message.model.HelpContent;
import com.deer.wms.message.model.HelpContentCriteria;
import com.deer.wms.message.model.HelpContentDto;
import com.deer.wms.message.service.HelpContentService;
import com.deer.wms.project.seed.core.service.AbstractService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by WUXB on 2017/10/09.
 */
@Service
@Transactional
public class HelpContentServiceImpl extends AbstractService<HelpContent, Integer> implements HelpContentService {

    @Autowired
    private HelpContentMapper helpContentMapper;

	@Override
	public HelpContent selectContentByCategoryId(Integer categoryId) {
		// TODO Auto-generated method stub
		return helpContentMapper.selectContentByCategoryId(categoryId);
	}

	@Override
	public List<HelpContentDto> selectContentAll(HelpContentCriteria helpContentCriteria) {
		return helpContentMapper.selectContentAll(helpContentCriteria);
	}

	@Override
	public int insert(HelpContent helpContent) {
		return helpContentMapper.insertHelpContent(helpContent);
	}

	@Override
	public int update2(HelpContent helpContent) {
		return helpContentMapper.update(helpContent);
	}

	@Override
	public HelpContentDto selectById(Integer contentId) {
		return helpContentMapper.selectById(contentId);
	}

	@Override
	public List<HelpContent> selectByTitle(HelpContentCriteria helpContentCriteria) {
		return helpContentMapper.selectByTitle(helpContentCriteria);
	}

}
