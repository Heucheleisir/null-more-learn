import { createClient } from 'redis';
import config from "@config/index";

const redis = createClient(config.redis)

export default redis;