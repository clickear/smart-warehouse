package com.deer.wms.message.dao;

import java.util.List;

import com.deer.wms.message.model.HelpContent;
import com.deer.wms.message.model.HelpContentCriteria;
import com.deer.wms.message.model.HelpContentDto;
import com.deer.wms.project.seed.core.mapper.Mapper;

public interface HelpContentMapper extends Mapper<HelpContent> {
	/**
	 * 根据帮助中心id获取帮助中心内容
	 * @param categoryId
	 * @return
	 */
	public HelpContent selectContentByCategoryId(Integer categoryId);
	
	/**
	 * 根据条件获取对应的帮助文档信息
	 * @param helpCategoryCriteria
	 * @return
	 */
	public List<HelpContentDto> selectContentAll(HelpContentCriteria helpContentCriteria);
	
	/**
	 * 新建帮助文档
	 */
	public int insertHelpContent(HelpContent helpContent);
	
	/**
	 * 更新帮助文档
	 * @param helpContent
	 * @return
	 */
	public int update(HelpContent helpContent);
	
	/**
	 * 根据id查询对应帮助文档信息
	 * @param contentId
	 * @return
	 */
	public HelpContentDto selectById(Integer contentId);
	
	/**
	 * 根据标题和所属分类查询帮助文档
	 * @param helpContentCriteria
	 * @return
	 */
	public List<HelpContent> selectByTitle(HelpContentCriteria helpContentCriteria);
}