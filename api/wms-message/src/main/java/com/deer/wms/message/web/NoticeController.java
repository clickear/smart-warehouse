package com.deer.wms.message.web;

import com.deer.wms.message.model.NoticeDto;
import com.deer.wms.message.service.NoticeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.deer.wms.message.model.Notice;
import com.deer.wms.message.model.NoticeCriteria;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import com.deer.wms.project.seed.util.StringUtil;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

/**
* Created by WUXB on 2017/10/09.
*/
@Api(description = "告警消息api接口")
@RestController
@RequestMapping("/notices")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    @PostMapping
    public Result add(@RequestBody Notice notice) {
        noticeService.save(notice);
        return ResultGenerator.genSuccessResult();
    }

    @DeleteMapping("/{id}")
    public Result delete(@PathVariable Integer id) {
        noticeService.deleteById(id);
        return ResultGenerator.genSuccessResult();
    }

    @PutMapping
    public Result update(@RequestBody Notice notice) {
        noticeService.update(notice);
        return ResultGenerator.genSuccessResult();
    }

    @GetMapping("/{id}")
    public Result detail(@PathVariable Integer id) {
        Notice notice = noticeService.findById(id);
        return ResultGenerator.genSuccessResult(notice);
    }

    @GetMapping
    public Result list(NoticeCriteria criteria) {
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<Notice> list = noticeService.findAll();
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }

    @ApiOperation(value = "根据设备id查找告警位置", notes = "根据设备id查找告警位置")
    @ApiImplicitParams({@ApiImplicitParam(name = "access-token", value = "token", paramType="header", dataType="String", required = true)
    	, @ApiImplicitParam(name = "pageNum", value = "页码", paramType="query", dataType="int", required = true, defaultValue = "1")
    	, @ApiImplicitParam(name = "pageSize", value = "每页显示的条数", paramType="query", dataType="int", required = true, defaultValue = "20")
    	, @ApiImplicitParam(name = "startDate", value = "开始时间", paramType="query", dataType="String")
    	, @ApiImplicitParam(name = "endDate", value = "结束时间", paramType="query", dataType="String")
    	, @ApiImplicitParam(name = "deviceIdList", value = "设备id列表", paramType="query", dataType="array")
    })
    @GetMapping("/getAlarmList")
    public Result getAlarmList(NoticeCriteria criteria){
    	StringUtil.trimObjectStringProperties(criteria);
        PageHelper.startPage(criteria.getPageNum(), criteria.getPageSize());
        List<NoticeDto> list = new ArrayList<NoticeDto>();
        if (criteria.getDeviceIdList() == null || criteria.getDeviceIdList().size() == 0){
        	list = null;
        } else {
        	list = noticeService.getAlarmList(criteria);
        }
        PageInfo pageInfo = new PageInfo(list);
    	return ResultGenerator.genSuccessResult(pageInfo);
    }

}
