import { MongoClient } from 'mongodb';

/**
 * ### 전역 변수 _mongo 타입 선언
 * - MongoClient의 연결 프로미스 또는 undefined 값
 * - 개발 환경에서 데이터베이스 연결을 재사용하기 위해 사용
 */
declare global {
    var _mongo: Promise<MongoClient> | undefined;
}
