package com.deer.wms.message.service.impl;

import java.util.List;

import com.deer.wms.message.dao.ConsultMapper;
import com.deer.wms.message.model.Consult;
import com.deer.wms.message.model.ConsultCriteria;
import com.deer.wms.message.model.ConsultDto;
import com.deer.wms.message.service.ConsultService;
import com.deer.wms.project.seed.core.service.AbstractService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by WUXB on 2017/10/09.
 */
@Service
@Transactional
public class ConsultServiceImpl extends AbstractService<Consult, Integer> implements ConsultService {

    @Autowired
    private ConsultMapper consultMapper;

	@Override
	public List<ConsultDto> selectConsultList(ConsultCriteria criteria) {
		return consultMapper.selectConsultList(criteria);
	}

	@Override
	public ConsultDto findById2(int consultId) {
		return consultMapper.findById2(consultId);
	}

	@Override
	public void deleteById(int consultId) {
		consultMapper.deleteById2(consultId);
		
	}
	
	@Override
	public void save(Consult consult) {
		consultMapper.insert2(consult );
		
	}
	
	@Override
	public void update(ConsultCriteria consultCriteria) {
		consultMapper.update(consultCriteria);
		
	}

}
