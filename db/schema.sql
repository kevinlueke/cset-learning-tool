-- TSCT CSET Learning Tool


-- Drop existing tables
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS concepts CASCADE;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS class CASCADE;
DROP TABLE IF EXISTS student_questions CASCADE;

-- Roles
CREATE TABLE roles (
  id serial PRIMARY KEY,
  role_name varchar(16) NOT NULL,
  access_level int NOT NULL
);

-- Users
CREATE TABLE users (
  id bigserial PRIMARY KEY,
  email varchar(100) UNIQUE NOT NULL,
  password varchar(255) UNIQUE NOT NULL,
  first_name varchar(100) NOT NULL,
  last_name varchar(100) NOT NULL,
  class bigint REFERENCES class(id) ON DELETE CASCADE,
  role int REFERENCES role(id) ON DELETE CASCADE,
  confirmed boolean DEFAULT 0
);

-- Courses
CREATE TABLE courses (
  id bigserial PRIMARY KEY,
  name varchar(100) NOT NULL,
);

-- Concepts
CREATE TABLE concepts (
  id bigserial PRIMARY KEY,
  course_id bigint REFERENCES courses(id) NOT NULL,
  body text,
);

-- Questions
CREATE TABLE questions (
  id bigserial PRIMARY KEY,
  concept_id bigint REFERENCES concepts(id) NOT NULL,
  question text NOT NULL,
  clue text,
  ans varchar(100) NOT NULL,
  res_a varchar(100) NOT NULL,
  res_b varchar(100) NOT NULL,
  res_c varchar(100),
  res_d varchar(100),
);

CREATE TABLE student_questions (
  student_id bigint REFERENCES users(id),
  question_id bigint REFERENCES questions(id)
);
