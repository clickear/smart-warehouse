package com.deer.wms.ware.task.service.impl;

import com.deer.wms.ware.task.dao.CountPalletBatchMapper;
import com.deer.wms.ware.task.model.CountPalletBatch;
import com.deer.wms.ware.task.service.CountPalletBatchService;

import com.deer.wms.project.seed.core.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by guo on 2018/09/25.
 */
@Component
@Service
@Transactional
public class CountPalletBatchServiceImpl extends AbstractService<CountPalletBatch, Integer> implements CountPalletBatchService {

    @Autowired
    private CountPalletBatchMapper countPalletBatchMapper;







}
