import * as dotenv from 'dotenv';
import * as path from 'path';

export const loadEnvironmentVariables = () => {
  dotenv.config({ path: path.resolve(__dirname, '../.env') });
};

export function getEnv(key: string, defaultValue?: any): any | undefined {
  const value = process.env[key];
  if (value) {
    return value;
  }
  if (defaultValue) {
    return defaultValue;
  }
  console.error(`Environment variable ${key} is not defined.`);
  return undefined;
}
