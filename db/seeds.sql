INSERT INTO departments (id, name)
VALUES (1, "Engineering"),
       (2, "Legal"),
       (3, "Finance"),
       (4, "Sales");
       
INSERT INTO roles (id, title, salary, department_id)
VALUES (1, "Lead Engineer", 150000, 1),
       (2, "Software Engineer", 125000, 1),
       (3, "Lawyer", 85000, 2),
       (4, "Legal Team Lead", 95000, 2),
       (5, "Account Manager", 90000, 4),
       (6, "Salesperson", 80000, 4),
       (7, "Accountant", 100000, 3);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Mike", "Chan", 6, NULL),
       (2, "Ashley", "Rodriguez", 1, NULL),
       (3, "Kevin", "Tupik", 2, 2),
       (4, "Kunal", "Singh", 5, NULL),
       (5, "Malia", "Brown", 7, 4),
       (6, "Sarah", "Lourd", 4, NULL),
       (7, "Tom", "Allen", 3, 6);