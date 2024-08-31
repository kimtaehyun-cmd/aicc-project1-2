-- users 테이블 생성
CREATE TABLE users (
    user_idx SERIAL PRIMARY KEY,  -- 자동 증가하는 기본 키
    user_id VARCHAR(50) NOT NULL UNIQUE,  -- 사용자 ID, 고유해야 함
    user_pw VARCHAR(255) NOT NULL,  -- 사용자 비밀번호
    user_name VARCHAR(100) NOT NULL,  -- 사용자 이름
    user_birthday DATE NOT NULL,  -- 사용자 생일
    user_email VARCHAR(255) NOT NULL UNIQUE,  -- 사용자 이메일, 고유해야 함
    user_phonenum VARCHAR(20) NOT NULL UNIQUE  -- 사용자 전화번호, 고유해야 함
);

수정된 users

CREATE TABLE users (
	user_idx SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- travel_project 테이블 생성
CREATE TABLE travel_projectproject (
    project_idx SERIAL PRIMARY KEY,  -- 자동 증가하는 기본 키
    user_idx INT,  -- users 테이블과 조인, 사용자가 삭제되면 프로젝트도 삭제됨
    project_title VARCHAR(255) NOT NULL,  -- 프로젝트 제목
    project_latitude DECIMAL(10, 8) NOT NULL,  -- 프로젝트 장소의 위도
    project_longitude DECIML(11, 8) NOT NULL,  -- 프로젝트 장소의 경도
	project_date DATE NOT NULL,  -- 프로젝트 생성일
	start_date DATE NOT NULL,  -- 프로젝트 시작일
    end_date DATE NOT NULL,  -- 프로젝트 종료일
	update_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,  -- 프로젝트 업데이트 날짜
    planner_title VARCHAR(255),  -- 플래너 제목
    planner_description TEXT,  -- 플래너 설명
    planner_date DATE,  -- 플래너 생성일
    planner_update_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,  -- 플래너 업데이트 날짜
	planner_img TEXT  -- 플래너 이미지 URL 또는 경로
);

-- 데이터 추가
INSERT INTO task (_id, title, description, date, isCompleted, isImportant, userId) VALUES ('1', '할일1', '할일1 설명' '2024-08-12', false, false, 'guswlda');

-- 데이터 조회
SELECT * FROM task;

SELECT project_title, start_date, end_date from travel_project;

-- 특정 사용자 데이터 필터 조회
SELECT * FROM task WHERE userid= 'happy' ORDER BY created_at DESC;

-- Timezone 변경
ALTER DATABASE postgres SET timezone = 'Asia/Seoul';

SHOW timezone;

SET timezone = 'Asia/Seoul';

-- 데이터 삭제
DELETE FROM task WHERE _id = '1234';

-- 데이터 update
UPDATE task SET iscompleted = true  WHERE _id = '1236'


-- 트리거 함수 생성: updated_at 필드를 현재 시간으로 설정
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 트리거 생성: task 테이블에서 UPDATE가 발생할 때마다 update_updated_at_column 함수를 호출
CREATE TRIGGER update_task_updated_at
BEFORE UPDATE ON task
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- task 테이블의 created_at 필드는 행이 처음 삽입될 때만 설정.
-- updated_at 필드는 행이 업데이트될 때마다 트리거를 통해 현재 시간으로 자동 갱신.
-- BEFORE UPDATE 트리거는 레코드가 업데이트되기 직전에 updated_at 필드를 현재 시간으로 변경.

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);