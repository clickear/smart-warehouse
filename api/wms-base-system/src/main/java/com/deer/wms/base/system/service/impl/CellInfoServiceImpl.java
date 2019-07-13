package com.deer.wms.base.system.service.impl;

import com.deer.wms.base.system.dao.AreaInfoMapper;
import com.deer.wms.base.system.dao.CellInfoMapper;
import com.deer.wms.base.system.model.*;
import com.deer.wms.base.system.service.CellInfoService;

import com.deer.wms.project.seed.core.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by  on 2018/06/20.
 */
@Service
@Transactional
public class CellInfoServiceImpl extends AbstractService<CellInfo, Integer> implements CellInfoService {

    @Autowired
    private CellInfoMapper cellInfoMapper;

    @Override
    public void deleteByCodeAndCom(CellInfoCriteria criteria) {
        cellInfoMapper.deleteByCodeAndCom(criteria);
    }

    @Override
    public List<CellInfoDto> findList(CellInfoCriteria criteria) {
        return cellInfoMapper.findList(criteria);
    }

    @Override
    public CellInfo findByCellCode(String cellCode) {
        return cellInfoMapper.findByCellCode(cellCode);
    }

    @Override
    public void setOrder(ShelfInfo shelfInfo) {
        Integer x = shelfInfo.getrCOrder();  //行列  1    2
        Integer y = shelfInfo.getrOrder();   //上优先下优先
        Integer z = shelfInfo.getcOrder();  //左优先右优先
        CellInfoCriteria criteria = new CellInfoCriteria();
        criteria.setShelfCode(shelfInfo.getShelfCode());
        List<CellInfoDto> list = findList(criteria);
        for(CellInfo cellInfo :list){
            Integer a = cellInfo.getsRow();
            Integer b= cellInfo.getsColumn();

            //优先级算法
            Integer order =(200 - 100 * y  + (2 * y -  3)*a) * (199 - 99 * x)  +  (200 - 100 * z  + (2 * z -  3)*b) * (99 * x - 98);
            cellInfo.setOrderNo(order);
            update(cellInfo);
        }


    }









}
