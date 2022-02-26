const env = process.env.NODE_ENV ? process.env.NODE_ENV : "local";
const config = require("../env.json")[env];
const redisConf = config.redis



const redis = require("redis")

module.exports = class Cache{
    constructor(){
        this.client = redis.createClient({ url: `redis://${redisConf.host}:${redisConf.port}` });
        this.constructor.instance = this
    }

    async connect(){
        try {
            await this.client.connect();
            console.log("Redis is connected")
            
        } catch (error) {
            console.log("Error Connecting to Redis", error)
        }
    }

    async get(key){
        const value = await this.client.get(key);
        return value;
    }

    async set(key,value){
        await this.client.set(key, JSON.stringify(value), {
            EX: 24*60*60,
            NX: true
          });
    }

    async keys(keyPattern){
        const keys = await this.client.keys(keyPattern)
        return keys
    }

    async remove(key){
        await this.client.expire(key, 0)
    }

}