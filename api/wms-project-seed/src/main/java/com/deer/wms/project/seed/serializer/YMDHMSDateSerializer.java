package com.deer.wms.project.seed.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 日期时间转换器，把日期时间转换为年月日时分秒，JSON返回时用
 *
 * Created by Floki on 2017/10/14.
 */
public class YMDHMSDateSerializer extends JsonSerializer<Date> {
    @Override
    public void serialize(Date value, JsonGenerator gen, SerializerProvider serializers) throws IOException, JsonProcessingException {
        if (null == value) {
            return;
        }
        SimpleDateFormat sdf = new SimpleDateFormat("YYYY-MM-dd HH:mm:ss");
        String strDate = sdf.format(value);
        gen.writeString(strDate);
    }
}
