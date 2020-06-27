DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS companies;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  username TEXT PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  photo_url TEXT,
  is_admin BIT DEFAULT 0
);

CREATE TABLE companies (
  handle TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  num_employees INTEGER,
  description TEXT,
  logo_url TEXT
);

CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  salary FLOAT NOT NULL,
  equity FLOAT NOT NULL,
  company_handle TEXT REFERENCES companies(handle) ON DELETE CASCADE,
  date_posted DATE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT equity CHECK (equity <= 1)
);



INSERT INTO companies (handle, name, num_employees, description, logo_url)
VALUES 
    ('TST', 'Test Company', 150, 'Dummy description', 'https://poshel.naxuy/png.jpeg'),
    ('ZC', 'Zhmih Corp.', 228, 'Kavo niponyal ahuel', NULL),
    ('Huendl', 'Offensive Ltd.', 300, 'Pls kll m alrd', NULL),
    ('L+S', 'Lejat Plyus Sosat', 134, 'Otletaesh ocherednyara', NULL),
    ('PD', 'Pierre Deuj', 513, 'Exclusive Perfume Brand', NULL),
    ('PKSRK', 'Pook Srenk', 342, 'Prosnis, ty obosralsa', NULL);

INSERT INTO jobs (title, salary, equity, company_handle)
VALUES
    ('Massajist Prostati', 15000.0, 0.3, 'L+S'),
    ('Sniffer', 45000.0, 0.5, 'PD'),
    ('Tester', 30000.0, 0.3, 'TST'),
    ('Sanitar', 90000.0, 0.76, 'ZC'),
    ('GlavVrach', 95000.0, 0.65, 'ZC'),
    ('Pogromist 300kk nanosec', 300000.0, 1, 'PKSRK'),
    ('Jopniy Konsultant', 120000.0, 0.69, 'L+S'),
    ('Barista', 50000, 0.1, 'Huendl'),
    ('Assistent', 35000, 0.05, 'TST'),
    ('Starshiy Assistent', 36000, 0.06, 'TST'),
    ('Samiy Starshiy Assistent', 37000, 0.07, 'TST'),
    ('Stareyshiy Assistent', 37500, 0.08, 'TST'),
    ('Glavniy Stareyshiy Assistent', 38000, 0.09, 'TST'),
    ('Glavenstvuyushiy Starshiy Glavniy Assistent', 38250, 0.1, 'TST');