package com.deer.wms.intercept.common.data;

import com.deer.wms.project.seed.util.RedisUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.text.MessageFormat;

/**
 * Created by Floki on 2017/9/29.
 * 退出系统
 */
@Service(value = "commonDataService")
public class CommonDataServiceManager implements CommonDataService {

    public static String ACCESS_TOKEN = "AccessToken:{0}";

    @Autowired
    private RedisUtil redisUtil;

    @Override
    public void putCurrentUserDataToRedis(CurrentUser currentUser) {
        if (null == currentUser || StringUtils.isEmpty(currentUser.getToken())) {
            return;
        }

        String token = currentUser.getToken();
        String key = MessageFormat.format(ACCESS_TOKEN, token);
        redisUtil.set(key, currentUser);

        redisUtil.expire(key, 60L * 60 * 8);
        //  redisUtil.expire(key, 10L);
    }

    @Override
    public void removeCurrentUserDataFromRedis(String token) {
        String key = MessageFormat.format(ACCESS_TOKEN, token);
        redisUtil.delKey(key);
    }

    @Override
    public CurrentUser getCurrentUserDataFromRedis(String token) {
        String key = MessageFormat.format(ACCESS_TOKEN, token);
        return (CurrentUser) redisUtil.get(key);
    }
}
