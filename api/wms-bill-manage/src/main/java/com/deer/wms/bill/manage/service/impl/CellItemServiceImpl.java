package com.deer.wms.bill.manage.service.impl;

import com.deer.wms.bill.manage.dao.CellItemMapper;
import com.deer.wms.bill.manage.model.*;
import com.deer.wms.bill.manage.service.CellItemService;

import com.deer.wms.project.seed.core.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by guo on 2018/07/19.
 */
@Service
@Transactional
public class CellItemServiceImpl extends AbstractService<CellItem, Integer> implements CellItemService {

    @Autowired
    private CellItemMapper cellItemMapper;

    @Override
    public List<CellItemDto> findList(CellItemCriteria criteria) {
        return cellItemMapper.findList(criteria);
    }

    @Override
    public List<NoUpShelf> findNoUpShelfList(NoUpShelfCriteria criteria) {
        return cellItemMapper.findNoUpShelfList(criteria);
    }
}
