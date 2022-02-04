INSERT INTO department (id, name)
VALUES (1, "Engineering"),
       (2, "Legal"),
       (3, "Finance"),
       (4, "Sales");
       
INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Lead Engineer", 150000, 1),
       (2, "Software Engineer", 125000, 1),
       (3, "Lawyer", 85000, 2),
       (4, "Legal Team Lead", 95000, 2),
       (5, "Account Manager", 90000, 4),
       (6, "Salesperson", 80000, 4),
       (7, "Accountant", 100000, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Mike", "Chan", "Salesperson"),
       (2, "Ashley", "Rodriguez", "Lead Engineer"),
       (3, "Kevin", "Tupik", "Software Engineer", 2),
       (4, "Kunal", "Singh", "Account Manager"),
       (5, "Malia", "Brown", "Accountant", 4),
       (6, "Sarah", "Lourd", "Legal Team Lead"),
       (7, "Tom", "Allen", "Lawyer", 6);