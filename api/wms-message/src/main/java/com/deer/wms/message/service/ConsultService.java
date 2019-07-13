package com.deer.wms.message.service;

import java.util.List;

import com.deer.wms.message.model.Consult;
import com.deer.wms.message.model.ConsultCriteria;
import com.deer.wms.message.model.ConsultDto;
import com.deer.wms.project.seed.core.service.Service;

/**
 * Created by WUXB on 2017/10/09.
 */
public interface ConsultService extends Service<Consult, Integer> {

	/**
	 * 根据条件获取对应的咨询信息
	 * @author gmd
	 * @return
	 */
	public List<ConsultDto> selectConsultList(ConsultCriteria criteria);
	
	public  ConsultDto findById2(int consultId);
	
	public void deleteById(int consultId);
	
	public void save(Consult consult);
	
	public void update(ConsultCriteria consultCriteria);
	
}
