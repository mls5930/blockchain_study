// jest의 테스트코드를 실행할때 속성값

// jest를 사용할때 필요한 정의된 타입을 가져옴
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['<rootDir>/**/*.test.(js|ts)'],
  moduleNameMapper: {
    '^@core/(.*)$': '<rootDir>/src/core/$1',
  },
  testEnvironment: 'node',
  verbose: true,
  preset: 'ts-jest',
};

export default config;
