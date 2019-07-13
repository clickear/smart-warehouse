package com.deer.wms.message.web;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.deer.wms.message.model.Validate;
import com.deer.wms.message.service.ValidateRecordService;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;

/**
 * Created by Floki on 2017/10/16.
 */
@Api(description = "短信api接口")
@RestController
@RequestMapping("/sms")
public class SmsController {

    @Autowired
    private ValidateRecordService validateRecordService;


    /**
     * 验证手机短信码
     *
     * @param validate
     * @return
     */
    @ApiOperation(value = "验证手机短信码", notes = "验证手机短信码")
    @PostMapping("/validate")
    public Result validate(@Valid @RequestBody Validate validate) {
    	/**
    	 * 找回密码
    	 */
    	boolean isOk = validateRecordService.validateSmsCode(validate.getType(), validate.getMobile(), validate.getSmsCode());
        return ResultGenerator.genSuccessResult(isOk);
    }
}
