package com.deer.wms.project.seed.core.result;

/**
 * 响应结果生成工具
 *
 * Created by Floki on 2017/9/28.
 */
public class ResultGenerator {

    public static Result genSuccessResult() {
        return genSuccessResult(CommonCode.SUCCESS);
    }

    public static Result genSuccessResult(Code code) {
        return new Result().setCode(code);
    }

    public static Result genSuccessResult(Object data) {
        return genSuccessResult().setData(data);
    }

    public static Result genSuccessResult(Code code, Object data) {
        return genSuccessResult(code).setData(data);
    }

    public static Result genSuccessResult(Code code, String message, Object data) {
        return genSuccessResult(code).setMessage(message).setData(data);
    }

    public static Result genFailResult(Code code, Object data) {
        return genFailResult(code).setData(data);
    }

    public static Result genFailResult(Code code, String message, Object data) {
        return genFailResult(code).setMessage(message).setData(data);
    }

    public static Result genFailResult(Code code) {
        return new Result().setCode(code);
    }
}
