package com.deer.wms.message.service.impl;

import com.deer.wms.message.dao.NoticeSendRecordMapper;
import com.deer.wms.message.model.NoticeSendRecord;
import com.deer.wms.message.service.NoticeSendRecordService;

import com.deer.wms.project.seed.core.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by WUXB on 2017/10/09.
 */
@Service
@Transactional
public class NoticeSendRecordServiceImpl extends AbstractService<NoticeSendRecord, Integer> implements NoticeSendRecordService {

    @Autowired
    private NoticeSendRecordMapper noticeSendRecordMapper;

}
