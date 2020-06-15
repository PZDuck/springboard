\c biztime

DROP TABLE IF EXISTS invoices;
DROP TABLE IF EXISTS companies;
DROP TABLE IF EXISTS industries;

CREATE TABLE companies (
    code text PRIMARY KEY,
    name text NOT NULL UNIQUE,
    description text
);

CREATE TABLE invoices (
    id serial PRIMARY KEY,
    comp_code text NOT NULL REFERENCES companies ON DELETE CASCADE,
    amt float NOT NULL,
    paid boolean DEFAULT false NOT NULL,
    add_date date DEFAULT CURRENT_DATE NOT NULL,
    paid_date date,
    CONSTRAINT invoices_amt_check CHECK ((amt > (0)::double precision))
);

CREATE TABLE industries (
    code text NOT NULL PRIMARY KEY,
    industry text NOT NULL
);

CREATE TABLE companies_industries (
    company_code text NOT NULL REFERENCES companies,
    industry_code text NOT NULL REFERENCES industries
);

INSERT INTO companies
  VALUES ('apple', 'Apple Computer', 'Maker of OSX.'),
         ('ibm', 'IBM', 'Big blue.'),
         ('fc', 'FakeCompany', 'We do not exist'),
         ('sbt', 'Sergei Boobtitsky', 'My name is my legacy'),
         ('djee', 'DJ Eban Entertainment', 'Da'),
         ('amzn', 'Amazon.com', 'The biggest online retailer'),
         ('zhmih', 'Zhmih Enterprises', 'Kavo nipoymu');

INSERT INTO invoices (comp_Code, amt, paid, paid_date)
  VALUES ('apple', 100, false, null),
         ('apple', 200, false, null),
         ('apple', 300, true, '2018-01-01'),
         ('ibm', 400, false, null);

INSERT INTO industries (code, industry)
  VALUES ('fin', 'Finance'),
         ('it', 'Internet Technology'),
         ('ec', 'E-Commerce'),
         ('en', 'Entertainment'),
         ('ba', 'Business Administration');

INSERT INTO companies_industries (company_code, industry_code)
  VALUES ('apple', 'it'),
         ('ibm', 'it'),
         ('fc', 'fin'),
         ('fc', 'ba'),
         ('sbt', 'ec'),
         ('sbt', 'en'),
         ('djee', 'en'),
         ('amzn', 'it'),
         ('amzn', 'ec'),
         ('zhmih', 'fin'),
         ('zhmih', 'ba');
