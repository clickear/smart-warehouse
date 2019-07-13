package com.deer.wms.project.seed.exception;

import com.deer.wms.project.seed.core.result.CommonCode;
import com.deer.wms.project.seed.core.result.Result;
import com.deer.wms.project.seed.core.result.ResultGenerator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MultipartException;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * 全局异常处理
 *
 * Created by Floki on 2017/10/16.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {
    private static Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    /**
     * 处理业务异常
     *
     * @param request
     * @param ex
     * @return
     */
    @ExceptionHandler(ServiceException.class)
    public Result handleServiceException(HttpServletRequest request, ServiceException ex) {
        logger.info("service exception : {}", ex.getMessage());
        return ResultGenerator.genFailResult(ex.getCode(), ex.getMessage(), "");
    }

    /**
     * 处理文件上传异常
     *
     * @param request
     * @param e
     * @return
     */
    @ExceptionHandler(MultipartException.class)
    public Result handleMultipartException(HttpServletRequest request, MultipartException e) {

        if (e.getMessage().indexOf("the request was rejected because its size") != -1) {
            logger.info("upload file error : {}", e.getMessage());
            return ResultGenerator.genFailResult(CommonCode.UPLOAD_FILE_ERROR);
        }

        logger.info("upload file error : {}", e.getMessage());
        return ResultGenerator.genFailResult(CommonCode.UPLOAD_FILE_ERROR);
    }

    /**
     * 捕获和处理 MethodArgumentNotValidException 方法参数无效的异常信息
     *
     * @param request 请求
     * @param e 异常
     * @return 返回异常信息状态码和异常信息
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Result handleBindException(HttpServletRequest request, MethodArgumentNotValidException e) {
        logger.info("method argument not valid exception : ", e.getMessage());
        Map<String, String> data = e.getBindingResult().getFieldErrors().stream().collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));
        return ResultGenerator.genFailResult(CommonCode.PARAMETER_ERROR, data);
    }

    /**
     * 处理 Exception 异常
     *
     * @param request
     * @param ex
     * @return
     */
    @ExceptionHandler(Exception.class)
    public Result handleException(HttpServletRequest request, Exception ex) {
        ex.printStackTrace();
        handleLog(request, ex);
        String nowMessage = "Request method '" + request.getMethod() + "' not supported";
        if (ex.getMessage().equals(nowMessage)){
            logger.info("http method error, please choose correct method!");
            return ResultGenerator.genFailResult(CommonCode.HTTP_METHOD_ERROR, ex.getMessage());
        }

        logger.info("server inernal error, please contact the administrator!");
        return ResultGenerator.genFailResult(CommonCode.SERVER_INERNAL_ERROR, ex.getMessage());
    }

    /**
     * 处理日志
     *
     * @param request
     * @param ex
     */
    private void handleLog(HttpServletRequest request, Exception ex) {
        StringBuffer logBuffer = new StringBuffer();
        logger.error(ex.getMessage());
        if (request != null) {
            logBuffer.append("  request method=" + request.getMethod());
            logBuffer.append("  url=" + request.getRequestURL());
            logBuffer.append("  params=" + request.getParameterMap());
        }
        if (ex != null) {
            logBuffer.append("  exception:" + ex);
        }
        logger.error(logBuffer.toString());
    }
}
