package com.deer.wms.message.dao;

import java.util.List;

import com.deer.wms.message.model.Consult;
import com.deer.wms.message.model.ConsultCriteria;
import com.deer.wms.message.model.ConsultDto;
import com.deer.wms.project.seed.core.mapper.Mapper;

public interface ConsultMapper extends Mapper<Consult> {
	
	/**
	 * 根据条件获取对应的咨询信息
	 * @author gmd
	 * @return
	 */
	public List<ConsultDto> selectConsultList(ConsultCriteria criteria);
	
	public ConsultDto findById2(int consultId);

	public void deleteById2(int consultId);
	
	public int insert2(Consult consult);

	public void update(ConsultCriteria consultCriteria);
}