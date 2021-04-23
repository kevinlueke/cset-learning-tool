-- Mock data for CLT

INSERT INTO roles (role_name, access_level)
VALUES ('Admin', 1),
       ('Teacher', 2),
       ('Student', 3);

INSERT INTO classes (class_name)
VALUES ('2023 A'),
       ('2023 B'),
       ('2024 A'),
       ('2024 B');

INSERT INTO users (email, password, first_name, last_name, class, role, confirmed)
VALUES ('admin@email.com', '$2a$10$p/hp8mtwqln9uheDMaclKe831v9Vcn4z28ic2KD9aDk0ufNKDlxBi', 'aaron', 'admin', NULL, 1, TRUE),
       ('teacher@email.com', '$2a$10$96m0FZgpexDOt/m29BndcObQ/igLPBnk4tmuwd1Gh9koufPnEYWaG', 'theresa', 'teacher', NULL, 2, TRUE),
       ('student1@email.com', '$2a$10$GfFUkkG1coAFtfeu6e8KZ.NokNtx5pXEckx2LPKK8CfNGMvKnvaYC', 'siobhan', 'student', 1, 3, TRUE),
       ('student2@email.com', '$2a$10$Rq3fh6F042DrgPwDcWjN4OJd5.T8cHisM83RJQisHk9lmMbtZ9gI2', 'silas', 'student', 2, 3, TRUE),
       ('student3@email.com', '$2a$10$JH.ZTwR/vhYevxVAbr4U3O06PpYA1tnPI/pDd6jA68J3Wk2qWNhzi', 'sam', 'student', NULL, NULL, FALSE);

INSERT INTO courses (name_short, name_full)
VALUES ('CSET 105', 'Intro to Web Applications'),
       ('CSET 110', 'Web Development I'),
       ('CSET 115', 'Technical Requirements & Data Structures'),
       ('CSET 120', 'Software Project I'),
       ('CSET 155', 'Database Design'),
       ('CSET 160', 'Web Development II'),
       ('CSET 170', 'Security & Professional Ethics'),
       ('CSET 180', 'Software Project II'),
       ('CSET 205', 'Advanced Data Integration'),
       ('CSET 210', 'Workplace Communications'),
       ('CSET 222', 'Database Management Systems'),
       ('CSET 220', 'Software Project III'),
       ('CSET 260', 'Software Principles'),
       ('CSET 270', 'Mobile Development'),
       ('CSET 280', 'Capstone Project');

INSERT INTO concepts (course_id, title, body)
VALUES (1, 'Programming Concepts', 'Information about bits, numbers, encoding, etc.'),
       (1, 'Values, Types, and Operators', 'Information about values, types, operators, etc.');

INSERT INTO questions (concept_id, question, clue, ans, res_a, res_b, res_c, res_d)
VALUES (1, 'What is your quest?', NULL, 'To find the Holy Grail', 'To find the Holy Grail', 'To find the cure for smelling of elderberries', NULL, NULL);

INSERT INTO student_questions (student_id, question_id)
VALUES (3, 1);
