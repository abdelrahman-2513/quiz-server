import { getEnv } from "src/config.helper";

export const JwtConstants = {
    secret: getEnv("JWT_SECRET_KEY "),
};