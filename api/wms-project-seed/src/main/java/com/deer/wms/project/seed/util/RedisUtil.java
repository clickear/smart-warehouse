package com.deer.wms.project.seed.util;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.data.redis.core.*;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.io.Serializable;
import java.text.MessageFormat;
import java.util.Collection;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.TimeUnit;

/**
 * Created by Floki on 2017/10/2.
 */
@Component
public class RedisUtil {

    private RedisTemplate redisTemplate;

    @Autowired
    public void setRedisTemplate(RedisTemplate redisTemplate){
        Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer(Object.class);
        ObjectMapper om = new ObjectMapper();
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        jackson2JsonRedisSerializer.setObjectMapper(om);
        redisTemplate.setValueSerializer(jackson2JsonRedisSerializer);
        redisTemplate.setHashValueSerializer(jackson2JsonRedisSerializer);
        this.redisTemplate = redisTemplate;
    }

    /**
     * 操作 Redis
     * @return
     */
    public RedisTemplate getRedisTemplate(){
        return redisTemplate;
    }

    @Resource(name = "redisTemplate")
    private ValueOperations valueOperations;

    /**
     * String（字符串的操作类）
     * @return
     */
    public ValueOperations getValueOperations(){
        return valueOperations;
    }

    @Resource(name = "redisTemplate")
    private HashOperations hashOperations;

    /**
     * Hash（哈希表的操作）
     * @return
     */
    public HashOperations getHashOperations(){
        return hashOperations;
    }

    @Resource(name = "redisTemplate")
    private ListOperations listOperations;

    /**
     * List（列表的操作）
     * @return
     */
    public ListOperations getListOperations(){
        return listOperations;
    }

    @Resource(name = "redisTemplate")
    private SetOperations setOperations;
    /**
     * Set（集合的操作）
     * @return
     */
    public SetOperations getSetOperations(){
        return setOperations;
    }

    @Resource(name = "redisTemplate")
    public ZSetOperations zSetOperations;
    /**
     * ZSet （有序集合的操作）
     * @return
     */
    public ZSetOperations getZSetOperations(){
        return zSetOperations;
    }

    /**
     * 设置 Key 的过期时间（单位:秒）{ 命令：EXPIRE [key] [seconds] }
     * @param key 键
     * @param expireTime 过期时间（单位:秒）
     * @return
     */
    public boolean expire(String key,Long expireTime){
        return redisTemplate.expire(key, expireTime, TimeUnit.SECONDS);
    }


    /**
     * 设置 Key 的过期时间（单位:秒）{ 命令：EXPIRE [key] [seconds] }
     * @param key 键
     * @param expireTime 过期时间（单位:秒）
     * @return
     */
    public boolean updateExprieTime(final String key,Long expireTime){
        return expire(key,expireTime);
    }


    /**
     * 获取自增长（每次 +1）
     * 将 key 中储存的数字值增一
     * 如果 key 不存在，那么 key 的值会先被初始化为 0
     * @param key 键
     * @return Long
     */
    public Long getAutoIncrement(String key){
        return valueOperations.increment(key, 1);
    }

    /**
     * 读取缓存
     *
     * @param key
     * @return
     */
    public Object get(final String key) {
        return valueOperations.get(key);
    }

    /**
     * String（字符串）的数据类型
     *
     * @param key 键
     * @param value 值
     * @return
     */
    public boolean set(String key, Object value) {
        try {
            valueOperations.set(key, value);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    /**
     * String（字符串）的数据类型
     * 写入缓存（过期时间）
     *
     * @param key 键
     * @param value 值
     * @param expireTime 过期时间（秒为单位）
     * @return
     */
    public boolean set(String key, Object value, Long expireTime) {
        try {
            valueOperations.set(key, value,expireTime,TimeUnit.SECONDS);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    /**
     * 操作 Redis Hash（哈希表）的数据类型
     * （有过期时间）
     *
     * 1.将哈希表 key 中的域 field 的值设为 value 。
     * 2.如果 key 不存在，一个新的哈希表被创建并进行 HSET 操作。
     * 3.如果域 field 已经存在于哈希表中，旧值将被覆盖。
     * @param key 键
     * @param hashKey hash的键
     * @param hashValue hash的值
     * @param expireTime 过期时间（单位：秒）
     * @return
     */
    public boolean hashPut(String key,String hashKey, Object hashValue,Long expireTime){
        try {
            hashOperations.put(key,hashKey,hashValue);
            return expire(key,expireTime);
        }catch (Exception e){
            e.printStackTrace();
        }
        return false;
    }

    /**
     * 操作 Redis Hash（哈希表）的数据类型
     * （有过期时间）
     *
     * 1.同时将多个 field-value (域-值)对设置到哈希表 key 中。
     * 2.此命令会覆盖哈希表中已存在的域。
     * 3.如果 key 不存在，一个空哈希表被创建并执行 HMSET 操作。
     * @param key 键
     * @param hashKeyValue 键值
     * @param expireTime 过期时间（单位：秒）
     * @return
     */
    public boolean hashPutAll(String key,Map<String,Object> hashKeyValue,Long expireTime){
        try{
            hashOperations.putAll(key,hashKeyValue);
            return expire(key,expireTime);
        }catch (Exception e){
            e.printStackTrace();
        }
        return false;
    }

    /**
     * 获取有序集 key 中，所有成员
     * 其中成员的位置按 score 值递增(从小到大)来排序。
     * @param key 键
     * @return
     */
    public Set zsetAllAsc(String key){
        return  zSetOperations.range(key,0,-1);
    }

    /**
     * 获取有序集 key 中，所有成员（倒序）
     * 其中成员的位置按 score 值递减(从大到小)来排列。
     * @param key 键
     * @return
     */
    public Set zsetAllDesc(String key){
       return zSetOperations.reverseRange(key,0,-1);
    }

    //=============================================================================================
    /**
     * 删除一个 Key
     * @param key 键
     * @return
     */
    public boolean delKey(String key){
        redisTemplate.delete(key);
        return true;
    }

    /**
     * 删除多个 Key
     * @param keys 键 的集合
     * @return
     */
    public boolean delKeys(Collection keys){
        redisTemplate.delete(keys);
        return true;
    }

    /**
     * 批量删除key
     *
     * @param pattern
     */
    public void removePattern(final String pattern) {
        Set<Serializable> keys = redisTemplate.keys(pattern);
        if (keys.size() > 0){
            redisTemplate.delete(keys);
        }
    }

    /**
     * 批量删除对应的value
     *
     * @param keys
     */
    public void remove(final String... keys) {
        for (String key : keys) {
            remove(key);
        }
    }

    /**
     * 删除对应的value
     *
     * @param key
     */
    public void remove(final String key) {
        if (exists(key)) {
            redisTemplate.delete(key);
        }
    }

    /**
     * 判断 Key 是否存在 { 命令：exists [key] }
     * @param key 键
     * @return
     */
    public boolean existsKey(String key){
      return redisTemplate.hasKey(key);
    }

    /**
     * 判断缓存中是否有对应的value
     *
     * @param key
     * @return
     */
    public boolean exists(final String key) {
        return redisTemplate.hasKey(key);
    }

    /**
     * 重命名（将 key 改名为 newkey）{ 命令：renamenx [oldKey] [newKey] }
     *  若给定的 key 已经存在，则不做任何动作
     *  (key 必须存在，返回：false(ERR no such key))
     * 1.newKey 在数据库已经存在,则修改不成功.返回 false
     * @param oldKey 旧的键
     * @param newKey 新的键
     * @return
     */
    public boolean renamenx(String oldKey, String newKey){
        try{
           return redisTemplate.renameIfAbsent(oldKey,newKey);
        }catch (InvalidDataAccessApiUsageException e){
            e.printStackTrace();
        }
        return false;
    }

    /**
     * 重命名（将 key 改名为 newkey）{ 命令：rename [oldKey] [newKey] }
     * (key 必须存在，返回：false(ERR no such key))
     * 1.newKey 在数据库中已经存在,则 newKey 将覆盖改存在的 key
     * （相当于把数据库newKey对应的key删除，然后在把准备修改的key的名称修改为newKey的名称）
     * @param oldKey
     * @param newKey
     */
    public boolean rename(String oldKey, String newKey){
        try{
            redisTemplate.rename(oldKey,newKey);
            return true;
        }catch (InvalidDataAccessApiUsageException e){
            e.printStackTrace();
        }
        return false;
    }

    /**
     * 生成Redis的key。
     * 比如：
     * generatorRedisKey("abc:{0}:efg:{1}", 123, 345) -> abc:123:efg:345
     *
     * @param regex Redis key的分组定义
     * @param values key命名规则的占位符值
     * @return Redis key
     */
    public static String generatorKey(String regex, Object ... values) {
        String key = regex;
        if (StringUtils.isEmpty(key)) {
            return "";
        }
        return MessageFormat.format(key, values);
    }
}
