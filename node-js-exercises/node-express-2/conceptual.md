### Conceptual Exercise

Answer the following questions below:

- What is a JWT?
JSON Web Token is a secure way of transmitting encrypted data between parties using JSON object

- What is the signature portion of the JWT?  What does it do?
A signature part of the JWT is an encrypted combination of the encoded header, payload and secret key. Signature is signed with an algorithm that is specified in the header

- If a JWT is intercepted, can the attacker see what's inside the payload?
Yes, however, it is not possible for the attacker to change the payload because of the way the JWT signature works

- How can you implement authentication with a JWT?  Describe how it works at a high level.
First, a user sends a request containing user credentials to the server
Second, the request is processed and the data is converted to JWT
Third, the server returns the user the token, which is then used by user with every subsequent request to validate their identity 

- Compare and contrast unit, integration and end-to-end tests.
Unit test are more isolated and focus on one specific function;
Integration tests the workflow between the units and whether they are able to work together or not;
E2E test the entire workflow of the system from beginning to end

For unit tests, networking requests and responses are mocked, while during integration testing real network responses are used.
The cost of maintaining the test and their runtime rises from unit to E2E: unit test are generally the cheapest in terms of cost and time, and also quite fast, while E2E requires continious integrations environment

- What is a mock? What are some things you would mock?

- What is continuous integration?

- What is an environment variable and what are they used for?

- What is TDD? What are some benefits and drawbacks?

- What is the value of using JSONSchema for validation?

- What are some ways to decide which code to test?

- What are some differences between Web Sockets and HTTP?

- Did you prefer using Flask over Express? Why or why not (there is no right 
  answer here --- we want to see how you think about technology)?
