import { getEnv } from "src/config.helper";

export const JwtConstants = {
    secret: getEnv("JWT_SECRET_KEY","THIS IS THE SECRET KET FOR THE QUIZ APPLICATION BY ABDELRAHMAN HASSAN!!!"),
};