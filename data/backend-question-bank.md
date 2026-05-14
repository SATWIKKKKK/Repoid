

SECTION 1: CORE CONCEPTS AND FUNDAMENTALS

---

Q1. What is a backend?
The backend is the server-side part of an application that handles business logic, database operations, authentication, and serves data to the frontend or other clients. It is not directly visible to users.

Q2. What is an API?
An API (Application Programming Interface) is a set of rules and protocols that allows different software applications to communicate with each other. In backend development, APIs define how clients can request data or actions from a server.

Q3. What is REST?
REST (Representational State Transfer) is an architectural style for designing networked applications. It uses standard HTTP methods like GET, POST, PUT, PATCH, and DELETE and treats everything as a resource identified by a URL.

Q4. What are the HTTP methods and what does each do?
GET retrieves a resource. POST creates a new resource. PUT replaces an existing resource entirely. PATCH partially updates a resource. DELETE removes a resource. HEAD retrieves headers only. OPTIONS describes communication options for a resource.

Q5. What is the difference between stateless and stateful servers?
A stateless server does not store any client session information between requests — each request is independent and contains all information needed to process it. A stateful server maintains session data across requests.

Q6. What is HTTP status code 200?
It means OK — the request succeeded and the response body contains the result.

Q7. What does HTTP 201 mean?
Created. It indicates that a resource was successfully created, typically in response to a POST request.

Q8. What does HTTP 400 mean?
Bad Request. The server cannot process the request because the client sent malformed or invalid data.

Q9. What does HTTP 401 mean?
Unauthorized. The request requires authentication and the client has not provided valid credentials.

Q10. What does HTTP 403 mean?
Forbidden. The server understood the request but refuses to authorize it. Unlike 401, re-authenticating will not help.

Q11. What does HTTP 404 mean?
Not Found. The requested resource does not exist on the server.

Q12. What does HTTP 500 mean?
Internal Server Error. An unexpected condition prevented the server from fulfilling the request. It is a generic server-side error.

Q13. What does HTTP 503 mean?
Service Unavailable. The server is temporarily unable to handle requests, usually because it is overloaded or down for maintenance.

Q14. What is the difference between HTTP and HTTPS?
HTTP is the standard protocol for transferring data over the web. HTTPS is HTTP with encryption via TLS/SSL, which secures data in transit between client and server.

Q15. What is a port number?
A port number is a numerical identifier used to distinguish different services running on the same server. HTTP defaults to port 80, HTTPS to 443, MySQL to 3306, PostgreSQL to 5432.

Q16. What is a socket?
A socket is a software endpoint that enables bidirectional communication between two processes over a network. It combines an IP address and a port number.

Q17. What is the difference between TCP and UDP?
TCP (Transmission Control Protocol) is connection-oriented and guarantees delivery, ordering, and error checking. UDP (User Datagram Protocol) is connectionless, faster, but does not guarantee delivery, order, or error correction.

Q18. What is an IP address?
An IP address is a unique numerical label assigned to every device on a network that uses the Internet Protocol. IPv4 addresses look like 192.168.1.1. IPv6 is the newer, longer format.

Q19. What is DNS?
DNS (Domain Name System) translates human-readable domain names like google.com into IP addresses that computers use to route traffic.

Q20. What is a CDN?
A CDN (Content Delivery Network) is a geographically distributed network of servers that delivers web content to users from the nearest server to reduce latency and improve speed.

Q21. What is latency?
Latency is the time it takes for a data packet to travel from source to destination and back. Lower latency means faster responses.

Q22. What is throughput?
Throughput is the amount of data successfully transferred over a network or processed by a system in a given period of time, typically measured in requests per second or bytes per second.

Q23. What is bandwidth?
Bandwidth is the maximum amount of data that can be transmitted over a network connection in a given period of time. Higher bandwidth means more data can be transferred simultaneously.

Q24. What is a load balancer?
A load balancer distributes incoming network traffic across multiple backend servers to prevent any single server from being overwhelmed, improving availability and scalability.

Q25. What is horizontal scaling vs vertical scaling?
Horizontal scaling means adding more machines or instances to a system (scaling out). Vertical scaling means adding more resources (CPU, RAM) to an existing machine (scaling up). Horizontal scaling is generally preferred for large distributed systems.

---

SECTION 2: NODE.JS

---

Q26. What is Node.js?
Node.js is an open-source, cross-platform JavaScript runtime built on Chrome's V8 engine that allows JavaScript to run on the server side outside of a browser.

Q27. What makes Node.js non-blocking?
Node.js uses an event-driven, non-blocking I/O model. Instead of waiting for file reads, network calls, or database queries to complete, Node.js registers callbacks and moves on, processing the results when they arrive.

Q28. What is the event loop in Node.js?
The event loop is the mechanism that allows Node.js to perform non-blocking operations. It continuously checks the call stack and the callback queue, pushing callbacks onto the stack when the stack is empty.

Q29. What are the phases of the Node.js event loop?
The phases are: timers (setTimeout, setInterval), pending callbacks (I/O errors from previous iteration), idle/prepare, poll (retrieve new I/O events), check (setImmediate callbacks), and close callbacks (e.g., socket.on close).

Q30. What is the difference between process.nextTick and setImmediate?
process.nextTick callbacks execute before any I/O events or timers in the current iteration of the event loop. setImmediate callbacks execute in the check phase, after I/O events.

Q31. What is npm?
npm (Node Package Manager) is the default package manager for Node.js. It manages dependencies, scripts, and publishing of JavaScript packages.

Q32. What is the difference between dependencies and devDependencies in package.json?
dependencies are packages required for the application to run in production. devDependencies are only needed during development, like testing tools or bundlers.

Q33. What is package-lock.json?
package-lock.json locks the exact version of every installed dependency and sub-dependency, ensuring consistent installations across all environments.

Q34. What is the Node.js cluster module?
The cluster module allows you to create child processes that share the same server port, enabling Node.js to take advantage of multi-core CPUs since Node.js is single-threaded by default.

Q35. What are streams in Node.js?
Streams are objects that let you read or write data in chunks rather than all at once. There are four types: Readable, Writable, Duplex (both), and Transform (modifies data as it passes through).

Q36. What is the difference between readFile and createReadStream in Node.js?
readFile loads the entire file into memory before processing. createReadStream reads the file in chunks as a stream, which is more memory-efficient for large files.

Q37. What is the EventEmitter in Node.js?
EventEmitter is a Node.js core class that facilitates event-driven programming. Objects can emit named events and listeners can subscribe to those events using the on method.

Q38. What is middleware in Express.js?
Middleware are functions that have access to the request object, response object, and the next middleware in the request-response cycle. They can execute code, modify request/response, or end the cycle.

Q39. What does the next() function do in Express middleware?
Calling next() passes control to the next middleware function in the stack. If next() is not called, the request will hang.

Q40. What is the difference between app.use and app.get in Express?
app.use applies middleware to all HTTP methods and all routes matching the given path. app.get only handles GET requests to the specified route.

Q41. How do you handle errors in Express?
Error-handling middleware takes four arguments: err, req, res, next. You define it after all other middleware and routes. Inside route handlers, passing an error to next(err) routes it to the error handler.

Q42. What is the difference between req.params, req.query, and req.body in Express?
req.params contains route parameters from the URL path like /users/:id. req.query contains query string parameters like ?page=2. req.body contains the request body, typically from POST or PUT requests.

Q43. What is CORS and how do you handle it in Express?
CORS (Cross-Origin Resource Sharing) is a security policy that restricts web pages from making requests to a different domain. In Express, you handle it using the cors npm package or by setting appropriate Access-Control headers manually.

Q44. What is the purpose of dotenv in Node.js?
dotenv loads environment variables from a .env file into process.env, allowing you to separate configuration from code and keep secrets out of source control.

Q45. How does async/await work in Node.js?
async functions return Promises. Inside them, the await keyword pauses execution until the Promise resolves or rejects, making asynchronous code read like synchronous code.

Q46. What is the difference between Promise.all and Promise.allSettled?
Promise.all rejects immediately if any Promise rejects. Promise.allSettled waits for all Promises to settle (resolve or reject) and returns an array of their outcomes regardless.

Q47. What is the node_modules folder?
node_modules is the directory where npm installs all dependencies and their transitive dependencies for a Node.js project. It should typically be added to .gitignore.

Q48. What is __dirname in Node.js?
__dirname is a global variable that contains the absolute path of the directory in which the currently executing file resides.

Q49. What is the difference between require and import in Node.js?
require is CommonJS module syntax and is synchronous. import is ES Module syntax and supports static analysis. Node.js supports both but they cannot always be mixed without configuration.

Q50. What are worker threads in Node.js?
Worker threads allow Node.js to run JavaScript in parallel on separate threads. Unlike the cluster module which forks processes, worker threads share memory and are useful for CPU-intensive tasks.

---

SECTION 3: EXPRESS.JS

---

Q51. What is Express.js?
Express.js is a minimal, unopinionated web application framework for Node.js that provides tools to build web servers and APIs.

Q52. How do you create a basic Express server?
You install express, create an instance with const app = express(), define routes with app.get / app.post etc., and start the server with app.listen(port).

Q53. What is routing in Express?
Routing refers to determining how an application responds to a client request to a particular endpoint, which is a URI and an HTTP method.

Q54. What is Express Router?
Express Router is a mini Express application that can handle routing and middleware independently. It lets you modularize routes into separate files.

Q55. How do you serve static files in Express?
Using the built-in middleware express.static. Example: app.use(express.static('public')) serves all files in the public directory.

Q56. What does express.json() do?
It is a built-in middleware that parses incoming requests with JSON payloads and populates req.body.

Q57. What does express.urlencoded() do?
It parses incoming requests with URL-encoded payloads (from HTML form submissions) and populates req.body.

Q58. How do you handle route parameters in Express?
Using a colon prefix in the route path like /users/:id. The value is accessible via req.params.id.

Q59. What is the difference between app-level and router-level middleware in Express?
App-level middleware is bound to the app instance using app.use() and applies globally. Router-level middleware is bound to a router instance and only applies within that router's scope.

Q60. How do you implement rate limiting in Express?
Using the express-rate-limit package, which creates a middleware that tracks request counts per IP and returns a 429 Too Many Requests response when the limit is exceeded.

Q61. What is Helmet.js and why is it used with Express?
Helmet is a middleware library that sets various HTTP headers to protect Express apps from common web vulnerabilities like XSS, clickjacking, and MIME sniffing.

Q62. How do you implement authentication in Express?
Common approaches include JWT-based authentication using jsonwebtoken, or session-based auth using express-session and passport.js for various strategies (local, OAuth, etc.).

Q63. What is Morgan in Express?
Morgan is an HTTP request logger middleware for Node.js. It logs requests with details like method, URL, status, response time, making it useful for debugging and monitoring.

Q64. How do you set response headers in Express?
Using res.set(headerName, value) or res.header(name, value), or by calling res.setHeader() from the native Node.js response object.

Q65. What is the difference between res.send and res.json in Express?
res.send sends a response with flexible content type detection. res.json always sets the Content-Type to application/json and serializes the argument to JSON automatically.

---

SECTION 4: DATABASES — SQL FUNDAMENTALS

---

Q66. What is a relational database?
A relational database organizes data into tables with rows and columns. Tables are related to each other through keys. SQL is used to query and manipulate the data.

Q67. What is a primary key?
A primary key is a column or combination of columns that uniquely identifies each row in a table. It cannot contain NULL values and must be unique.

Q68. What is a foreign key?
A foreign key is a column in one table that references the primary key of another table, establishing a relationship between the two tables and enforcing referential integrity.

Q69. What is a JOIN in SQL?
A JOIN combines rows from two or more tables based on a related column. Types include INNER JOIN (matching rows from both), LEFT JOIN (all from left, matching from right), RIGHT JOIN, and FULL OUTER JOIN.

Q70. What is the difference between WHERE and HAVING?
WHERE filters rows before grouping. HAVING filters groups after a GROUP BY clause has been applied. HAVING can use aggregate functions like COUNT or SUM; WHERE cannot.

Q71. What is an index in a database?
An index is a data structure that improves the speed of data retrieval operations on a database table at the cost of additional storage and slower write operations.

Q72. What is normalization in databases?
Normalization is the process of organizing database tables to reduce redundancy and improve data integrity. It involves applying normal forms (1NF, 2NF, 3NF, BCNF) to eliminate anomalies.

Q73. What is denormalization?
Denormalization intentionally introduces redundancy by combining tables to improve read performance at the cost of data integrity and more complex writes.

Q74. What is a transaction in SQL?
A transaction is a sequence of database operations that are treated as a single logical unit. If any operation fails, the entire transaction is rolled back. Transactions follow ACID properties.

Q75. What are ACID properties?
Atomicity (all or nothing), Consistency (data remains in a valid state), Isolation (concurrent transactions do not interfere), Durability (committed transactions survive system failures).

Q76. What is the difference between TRUNCATE and DELETE?
DELETE removes rows one by one and can include a WHERE clause. It is transactional and triggers can fire. TRUNCATE removes all rows at once, is faster, does not fire row-level triggers, and typically cannot be rolled back.

Q77. What is a stored procedure?
A stored procedure is a precompiled collection of SQL statements saved in the database that can be executed with a single call. They reduce network traffic and can encapsulate business logic.

Q78. What is a view in SQL?
A view is a virtual table based on a SELECT query. It does not store data itself but provides a way to simplify complex queries, restrict data access, and present data in a specific format.

Q79. What is a subquery?
A subquery is a query nested inside another query. It can appear in SELECT, FROM, or WHERE clauses and is used to perform operations that require multiple steps.

Q80. What is the difference between UNION and UNION ALL?
UNION removes duplicate rows from the combined result set. UNION ALL includes all rows including duplicates and is faster because it skips the deduplication step.

Q81. What is an aggregate function in SQL?
Aggregate functions compute a single result from a set of rows. Examples: COUNT, SUM, AVG, MIN, MAX. They are typically used with GROUP BY.

Q82. What is a composite key?
A composite key is a primary key made up of two or more columns, used when no single column can uniquely identify a row.

Q83. What is referential integrity?
Referential integrity is a database constraint that ensures foreign key values always refer to an existing primary key, preventing orphaned records.

Q84. What is a database schema?
A schema is the overall structure of a database, including tables, columns, data types, constraints, indexes, and relationships.

Q85. What is the N+1 query problem?
The N+1 problem occurs when code executes one query to fetch a list of N items, then executes N additional queries to fetch related data for each item. It is solved by using JOINs or eager loading.

---

SECTION 5: POSTGRESQL

---

Q86. What is PostgreSQL?
PostgreSQL is a powerful, open-source object-relational database system known for its standards compliance, extensibility, and support for advanced data types like JSON, arrays, and custom types.

Q87. What is the difference between PostgreSQL and MySQL?
PostgreSQL is more standards-compliant, supports more advanced features (CTEs, window functions, full-text search, JSON operators), and handles concurrent writes better. MySQL is traditionally faster for simple read-heavy workloads.

Q88. What is a CTE in PostgreSQL?
A Common Table Expression (CTE) is a temporary named result set defined with the WITH keyword that can be referenced within a SELECT, INSERT, UPDATE, or DELETE statement.

Q89. What are window functions in PostgreSQL?
Window functions perform calculations across a set of rows related to the current row without collapsing the result into a single row. Examples include ROW_NUMBER(), RANK(), LEAD(), LAG(), and SUM() OVER().

Q90. What is JSONB in PostgreSQL?
JSONB is a binary JSON data type in PostgreSQL that stores JSON in a decomposed binary format, enabling indexing and faster querying compared to the plain JSON type.

Q91. What is the difference between JSON and JSONB in PostgreSQL?
JSON stores the exact input text and supports duplicate keys. JSONB parses and stores data in a binary format, removes duplicate keys, reorders keys, and supports GIN indexes for fast querying.

Q92. What is a GIN index in PostgreSQL?
GIN (Generalized Inverted Index) is useful for indexing composite values like JSONB, arrays, and full-text search. It is ideal when you need to search within values rather than for an exact value.

Q93. What is EXPLAIN ANALYZE in PostgreSQL?
EXPLAIN ANALYZE executes a query and shows the query execution plan along with actual runtime statistics, helping you identify performance bottlenecks like sequential scans or slow joins.

Q94. What is a sequence in PostgreSQL?
A sequence is a database object that generates a series of unique integers. It is commonly used with SERIAL or BIGSERIAL columns to create auto-incrementing primary keys.

Q95. What is VACUUM in PostgreSQL?
VACUUM reclaims storage occupied by dead tuples (deleted or updated rows) and updates planner statistics. PostgreSQL does not immediately free disk space from deleted rows; VACUUM handles this cleanup.

Q96. What is connection pooling and why is it important in PostgreSQL?
Connection pooling maintains a pool of reusable database connections instead of creating a new one for every request. Since PostgreSQL connections are expensive to create, pooling with tools like PgBouncer or pg-pool significantly improves performance.

Q97. What is the difference between SERIAL and GENERATED ALWAYS AS IDENTITY in PostgreSQL?
SERIAL is a legacy shorthand that creates a sequence and sets the default. GENERATED ALWAYS AS IDENTITY is the SQL standard approach introduced in PostgreSQL 10, which is stricter and preferred for new schemas.

Q98. What are materialized views in PostgreSQL?
Materialized views store the result of a query physically on disk, unlike regular views. They must be refreshed manually with REFRESH MATERIALIZED VIEW, but querying them is much faster.

Q99. What is pg_stat_statements?
pg_stat_statements is a PostgreSQL extension that tracks execution statistics for all SQL statements run on the server, helping identify slow queries.

Q100. What is the difference between an inner join and a lateral join in PostgreSQL?
A regular join evaluates a subquery independently for the entire table. A LATERAL join allows the subquery to reference columns from preceding table entries in the FROM clause, similar to a correlated subquery but in the FROM position.

---

SECTION 6: MYSQL

---

Q101. What is MySQL?
MySQL is an open-source relational database management system widely used for web applications. It is known for speed, reliability, and ease of use.

Q102. What is the difference between MyISAM and InnoDB storage engines?
InnoDB supports foreign keys, transactions, and row-level locking. MyISAM does not support transactions or foreign keys but was historically faster for read-heavy workloads. InnoDB is the default and recommended engine.

Q103. What is AUTO_INCREMENT in MySQL?
AUTO_INCREMENT is a column attribute that automatically generates a unique integer value for each new row inserted, commonly used for primary keys.

Q104. What is the difference between CHAR and VARCHAR in MySQL?
CHAR is a fixed-length string. It pads shorter values with spaces. VARCHAR is variable-length and only uses as much storage as needed. CHAR is faster for fixed-size data; VARCHAR saves space for variable-length data.

Q105. What is a MySQL trigger?
A trigger is a stored program automatically executed before or after an INSERT, UPDATE, or DELETE event on a specific table.

Q106. What is EXPLAIN in MySQL?
EXPLAIN shows the execution plan of a SQL query, indicating which indexes are used, how tables are joined, and the estimated number of rows examined.

Q107. What is the difference between DATETIME and TIMESTAMP in MySQL?
DATETIME stores a date and time without timezone conversion. TIMESTAMP stores values in UTC and converts to the server's timezone on retrieval. TIMESTAMP has a range up to 2038 (Unix epoch limitation).

Q108. What is MySQL replication?
Replication is the process of copying data from a master database to one or more replica databases. It enables read scaling, backup, and high availability.

Q109. What is a covering index in MySQL?
A covering index includes all the columns needed to satisfy a query without accessing the actual table data. When a query can be answered entirely from the index, it avoids a potentially slow table lookup.

Q110. What is the difference between DELETE and DROP in MySQL?
DELETE removes rows from a table while keeping the table structure. DROP removes the entire table including its structure and all data.

---

SECTION 7: MONGODB

---

Q111. What is MongoDB?
MongoDB is an open-source, document-oriented NoSQL database that stores data as BSON (Binary JSON) documents. It is schema-flexible and horizontally scalable.

Q112. What is a document in MongoDB?
A document is the basic unit of data in MongoDB, stored in BSON format. It is equivalent to a row in a relational database and can contain nested objects and arrays.

Q113. What is a collection in MongoDB?
A collection is a group of MongoDB documents, equivalent to a table in a relational database. Collections do not enforce a schema by default.

Q114. What is the difference between findOne and find in MongoDB?
findOne returns the first document matching the query criteria. find returns a cursor that iterates over all matching documents.

Q115. What is an ObjectId in MongoDB?
ObjectId is the default type for the _id field in MongoDB documents. It is a 12-byte identifier that includes a timestamp, machine ID, process ID, and random counter, making it unique across documents.

Q116. What is an aggregation pipeline in MongoDB?
An aggregation pipeline is a sequence of data processing stages. Each stage transforms the documents and passes the results to the next. Common stages include $match, $group, $project, $sort, $lookup, and $unwind.

Q117. What is the $lookup stage in MongoDB aggregation?
$lookup performs a left outer join to another collection, allowing you to combine documents from multiple collections in a pipeline, similar to a JOIN in SQL.

Q118. What is an index in MongoDB?
An index in MongoDB is a data structure that stores a subset of the collection's data in a way that's easy to traverse, making queries faster by avoiding full collection scans.

Q119. What is a compound index in MongoDB?
A compound index is an index on multiple fields. The order of fields matters — queries must match the index prefix to benefit from it.

Q120. What is sharding in MongoDB?
Sharding is MongoDB's approach to horizontal scaling. It distributes data across multiple servers (shards). A shard key determines how data is distributed.

Q121. What is a replica set in MongoDB?
A replica set is a group of MongoDB servers that maintain the same data set. It provides redundancy and high availability. One node is the primary and the rest are secondaries.

Q122. What is the difference between embedded documents and references in MongoDB?
Embedded documents store related data in a single document (denormalization). References store related data in separate documents and use IDs to link them (normalization). Embedding is better for data accessed together; references are better for data that changes independently.

Q123. What does the upsert option do in MongoDB?
When upsert is true in an update operation, if no document matches the query, a new document is created. If a match is found, it is updated.

Q124. What is a capped collection in MongoDB?
A capped collection is a fixed-size collection that automatically overwrites the oldest documents when it reaches its size limit, useful for logging and caching scenarios.

Q125. What is Mongoose?
Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js that provides schema-based validation, query building, middleware hooks, and type casting.

---

SECTION 8: REDIS

---

Q126. What is Redis?
Redis (Remote Dictionary Server) is an open-source, in-memory data structure store used as a database, cache, and message broker. It supports data structures like strings, hashes, lists, sets, and sorted sets.

Q127. Why is Redis fast?
Redis is fast because it stores all data in memory (RAM), uses efficient data structures, is single-threaded to avoid locking overhead, and has a lightweight networking protocol.

Q128. What is Redis used for in backend development?
Common uses include caching database query results, session storage, rate limiting, pub/sub messaging, job queues, leaderboards, and real-time analytics.

Q129. What is the difference between Redis and Memcached?
Both are in-memory caches. Redis supports richer data types (lists, sets, sorted sets, hashes), persistence, pub/sub, and replication. Memcached is simpler and better at multi-threaded parallelism for simple key-value use cases.

Q130. What is Redis TTL?
TTL (Time To Live) is the time in seconds before a Redis key expires and is automatically deleted. You set it with EXPIRE key seconds or by using SET key value EX seconds.

Q131. What is Redis persistence?
Redis offers two persistence options: RDB (snapshot of the dataset at intervals) and AOF (Append Only File that logs every write operation). Both can be used together.

Q132. What is a Redis pub/sub?
Pub/Sub (publish/subscribe) in Redis allows publishers to send messages to a channel and all subscribers to that channel receive the messages. It is useful for real-time messaging systems.

Q133. What is a Redis sorted set?
A sorted set is a collection of unique strings where each member has an associated score (floating-point number). Members are sorted by their score, making them useful for leaderboards and priority queues.

Q134. What is Redis Sentinel?
Redis Sentinel provides high availability by monitoring Redis master and replica instances, automatically failing over to a replica if the master goes down, and notifying clients of the new master.

Q135. What is Redis Cluster?
Redis Cluster is a distributed implementation of Redis that automatically shards data across multiple nodes, providing horizontal scaling and high availability.

---

SECTION 9: DJANGO (PYTHON)

---

Q136. What is Django?
Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. It follows the MVT (Model-View-Template) pattern and includes built-in features like an ORM, admin panel, authentication, and URL routing.

Q137. What is the Django ORM?
The Django ORM (Object-Relational Mapper) allows you to interact with the database using Python classes (models) instead of writing raw SQL. It supports multiple database backends.

Q138. What is a Django model?
A model is a Python class that subclasses django.db.models.Model. Each attribute of the class represents a database column and Django automatically creates the corresponding database table.

Q139. What is a Django migration?
Migrations are Django's way of propagating model changes to the database schema. makemigrations generates migration files based on model changes, and migrate applies them.

Q140. What is the Django admin?
Django's built-in admin interface provides a web-based UI for managing database records. You register models with admin.site.register(ModelName) and Django generates the interface automatically.

Q141. What is a Django view?
A view is a Python function or class that receives a web request and returns a web response. Function-based views (FBVs) are simple functions. Class-based views (CBVs) use class inheritance to organize logic.

Q142. What is Django REST Framework (DRF)?
DRF is a powerful toolkit for building Web APIs with Django. It provides serializers, viewsets, routers, authentication classes, and permission classes.

Q143. What is a Django serializer?
A serializer in DRF converts complex data types like querysets or model instances into Python data types that can be rendered into JSON or XML, and vice versa.

Q144. What is the difference between APIView and ViewSet in DRF?
APIView provides explicit methods for each HTTP verb (get, post, put, delete). ViewSet groups related views into a single class and works with Routers to automatically generate URL patterns.

Q145. What is Django middleware?
Django middleware is a framework of hooks into Django's request/response processing. Each middleware component can process requests before they reach the view and responses before they are sent to the client.

Q146. What is Django signals?
Signals allow decoupled applications to get notified when certain actions occur. Common signals include post_save, pre_save, post_delete, and request_started.

Q147. What is the difference between select_related and prefetch_related in Django?
select_related performs a SQL JOIN and fetches related objects in a single query — suitable for ForeignKey and OneToOne relationships. prefetch_related does a separate query for each relationship and joins them in Python — suitable for ManyToMany and reverse ForeignKey.

Q148. What is the Q object in Django?
Q objects allow complex query conditions using OR, AND, and NOT operators. They can be combined with | (OR), & (AND), and ~ (NOT) operators.

Q149. What is Celery and how is it used with Django?
Celery is an asynchronous task queue. In Django, it is used to offload time-consuming tasks (sending emails, processing images, generating reports) to background workers, typically with Redis or RabbitMQ as the message broker.

Q150. What is Django's settings.py?
settings.py is the configuration file for a Django project. It contains database settings, installed apps, middleware, static files configuration, secret key, allowed hosts, and many other settings.

---

SECTION 10: FLASK (PYTHON)

---

Q151. What is Flask?
Flask is a lightweight, micro web framework for Python. It provides the basics to build web applications and APIs without imposing a particular structure, making it highly flexible.

Q152. What is the difference between Flask and Django?
Flask is a microframework with minimal defaults and dependencies — you choose your tools. Django is batteries-included with an ORM, admin panel, authentication, and more built in. Flask is better for small APIs; Django suits larger, full-featured applications.

Q153. What is a Flask Blueprint?
A Blueprint is a way to organize Flask routes and handlers into modular components. Each blueprint can have its own routes, templates, and static files, and is registered on the main application.

Q154. What is Flask-SQLAlchemy?
Flask-SQLAlchemy is an extension that integrates SQLAlchemy (an ORM) with Flask, providing database interaction through Python classes instead of raw SQL.

Q155. What is Flask-Migrate?
Flask-Migrate is an extension that handles SQLAlchemy database migrations using Alembic, similar to Django's migration system.

Q156. What is the application context in Flask?
The application context holds application-level data during a request, CLI command, or test. g and current_app are available within the application context.

Q157. What is the request context in Flask?
The request context holds request-specific data during the handling of a request. The request and session objects are available within this context.

Q158. What is Flask-JWT-Extended?
Flask-JWT-Extended is an extension that adds JWT (JSON Web Token) support to Flask, including access tokens, refresh tokens, and token revocation.

Q159. What is WSGI?
WSGI (Web Server Gateway Interface) is a specification for how Python web servers and web applications communicate. Flask and Django both implement WSGI. Production servers like Gunicorn or uWSGI run WSGI apps.

Q160. What is Gunicorn?
Gunicorn (Green Unicorn) is a WSGI HTTP server for Python web applications. It handles concurrent requests by spawning multiple worker processes, making it suitable for production deployments.

---

SECTION 11: FASTAPI (PYTHON)

---

Q161. What is FastAPI?
FastAPI is a modern, high-performance Python web framework for building APIs, based on Python type hints. It is built on Starlette and Pydantic and supports asynchronous programming natively.

Q162. Why is FastAPI fast?
FastAPI is built on Starlette for async I/O and uses Pydantic for data validation. It rivals NodeJS and Go in benchmarks because it uses Python's async/await capabilities and avoids blocking I/O.

Q163. What is Pydantic in the context of FastAPI?
Pydantic is a data validation library that uses Python type annotations. FastAPI uses it to validate request bodies, query parameters, and responses automatically.

Q164. What is dependency injection in FastAPI?
FastAPI has a built-in dependency injection system using the Depends() function. Dependencies are functions whose return values are injected into route handlers, useful for database sessions, authentication, and shared logic.

Q165. How does FastAPI handle async routes?
Routes defined with async def are handled asynchronously, allowing concurrent execution without blocking. Routes defined with regular def run in a thread pool to avoid blocking the event loop.

Q166. What is OpenAPI and how does FastAPI use it?
OpenAPI is a standard specification for describing REST APIs. FastAPI automatically generates an OpenAPI schema and interactive documentation (Swagger UI at /docs and ReDoc at /redoc) from your route definitions and type hints.

Q167. What are path operations in FastAPI?
Path operations are functions decorated with @app.get(), @app.post(), etc. that handle requests to specific URL paths.

Q168. What is the difference between Path, Query, and Body parameters in FastAPI?
Path parameters are part of the URL path. Query parameters come after the ? in the URL. Body parameters come from the request body and are typically declared as Pydantic models.

Q169. What is BackgroundTasks in FastAPI?
BackgroundTasks allows you to run functions in the background after returning a response. This is useful for tasks like sending emails after confirming an action to the user.

Q170. What is an APIRouter in FastAPI?
APIRouter is similar to Flask Blueprint — it lets you organize routes into separate modules and include them in the main application with a prefix.

---

SECTION 12: SPRING BOOT (JAVA)

---

Q171. What is Spring Boot?
Spring Boot is a framework built on top of the Spring Framework that makes it easy to create stand-alone, production-ready Java applications with minimal configuration using convention over configuration.

Q172. What is the difference between Spring and Spring Boot?
Spring is a comprehensive framework requiring significant XML or annotation-based configuration. Spring Boot auto-configures Spring based on dependencies in the classpath, has embedded servers, and reduces boilerplate.

Q173. What is auto-configuration in Spring Boot?
Auto-configuration automatically configures Spring beans based on the jar dependencies present in the classpath. For example, if spring-boot-starter-data-jpa is present, it sets up JPA without manual configuration.

Q174. What is a Spring Bean?
A Spring Bean is an object managed by the Spring IoC container. Beans are created, configured, and destroyed by the container based on configuration metadata.

Q175. What is dependency injection in Spring?
Dependency injection is the process by which the Spring container injects dependent objects into a class. It can be done via constructor injection (preferred), setter injection, or field injection with @Autowired.

Q176. What is the difference between @Component, @Service, @Repository, and @Controller?
All are specializations of @Component and trigger bean registration. @Service marks business logic classes. @Repository marks data access objects and adds exception translation. @Controller marks MVC controllers. @RestController combines @Controller and @ResponseBody.

Q177. What is Spring Data JPA?
Spring Data JPA is part of Spring Data that makes it easy to implement JPA-based repositories. You define interfaces extending JpaRepository and Spring generates the implementation automatically, including common CRUD operations.

Q178. What is @Transactional in Spring?
@Transactional marks a method or class to be executed within a transaction. Spring creates a transaction before the method, commits it on success, or rolls back on exception.

Q179. What is Spring Security?
Spring Security is a framework that provides authentication and authorization to Spring applications. It integrates with various authentication mechanisms like JWT, OAuth2, LDAP, and form-based login.

Q180. What is the application.properties or application.yml file in Spring Boot?
It is the main configuration file for Spring Boot applications, containing settings for the server port, database connection, logging, security, and custom application properties.

Q181. What is a RESTful controller in Spring Boot?
A class annotated with @RestController (or @Controller with @ResponseBody) that handles HTTP requests. Methods are mapped using @GetMapping, @PostMapping, @PutMapping, @DeleteMapping.

Q182. What is Spring Boot Actuator?
Actuator provides production-ready features like health checks, metrics, environment info, and application monitoring through exposed HTTP endpoints or JMX.

Q183. What is the difference between @RequestBody and @RequestParam in Spring?
@RequestBody binds the HTTP request body to a method parameter, typically a Java object (deserialized from JSON). @RequestParam binds a specific query or form parameter from the URL.

Q184. What is Hibernate?
Hibernate is a Java ORM framework that implements the JPA specification. It maps Java objects to database tables and handles CRUD operations, lazy loading, caching, and session management.

Q185. What is the N+1 problem in Spring/Hibernate and how do you fix it?
When fetching a collection of entities and each entity lazily loads a related entity, Hibernate fires N additional queries (one per entity). Fix it using JOIN FETCH, @EntityGraph, or batch fetching.

---

SECTION 13: RUBY ON RAILS

---

Q186. What is Ruby on Rails?
Ruby on Rails (Rails) is an open-source web application framework written in Ruby that follows convention over configuration and the MVC pattern. It emphasizes developer productivity and code simplicity.

Q187. What is convention over configuration in Rails?
Rails makes assumptions about naming, file structure, and database column names. As long as you follow its conventions, you need minimal configuration. A model named User automatically maps to a table named users.

Q188. What is ActiveRecord in Rails?
ActiveRecord is Rails' ORM layer. It maps database tables to Ruby classes, columns to attributes, and rows to objects. It includes built-in CRUD methods, validations, associations, and callbacks.

Q189. What is a Rails migration?
A Rails migration is a Ruby script that describes changes to the database schema (creating tables, adding columns, adding indexes). Running rails db:migrate applies them in order.

Q190. What are Rails validations?
Validations are rules defined in models to ensure data is valid before saving to the database. Examples: validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }.

Q191. What are Rails associations?
Associations define relationships between models: belongs_to, has_one, has_many, has_many :through, has_and_belongs_to_many, has_one :through. They generate helper methods for working with related objects.

Q192. What is the difference between has_many :through and has_and_belongs_to_many?
Both set up many-to-many relationships. has_many :through uses a join model and allows adding extra attributes to the join table. HABTM uses a direct join table without a model and has no room for extra attributes.

Q193. What are Rails callbacks?
Callbacks are methods that are called at specific points in an ActiveRecord object's lifecycle: before_validation, after_save, before_destroy, etc. They allow hooking into model events.

Q194. What is the Rails asset pipeline?
The asset pipeline concatenates, minifies, and serves JavaScript, CSS, and image files efficiently. It also supports preprocessors like Sass and CoffeeScript.

Q195. What is Devise in Rails?
Devise is a flexible authentication solution for Rails. It provides user registration, login, logout, password reset, email confirmation, and session management with minimal configuration.

---

SECTION 14: LARAVEL (PHP)

---

Q196. What is Laravel?
Laravel is a PHP web application framework with expressive, elegant syntax. It includes features like Eloquent ORM, Blade templating, routing, authentication, queues, and more.

Q197. What is Eloquent in Laravel?
Eloquent is Laravel's ORM. Each database table has a corresponding model class. Eloquent provides a fluent interface for querying databases and defining relationships.

Q198. What is a Laravel migration?
Migrations are PHP files that describe database schema changes. php artisan migrate applies pending migrations, and php artisan migrate:rollback reverses them.

Q199. What is a Laravel Route?
Routes define how incoming HTTP requests map to controllers or closures. Defined in routes/web.php (for web) and routes/api.php (for API routes).

Q200. What is a Laravel middleware?
Middleware is code that runs before or after a request reaches the route handler. Examples: authentication checking, CSRF validation, rate limiting.

Q201. What is a Service Provider in Laravel?
Service Providers are the central place to configure and bind things into Laravel's service container. They register services, event listeners, middleware, and routes.

Q202. What is the Laravel service container?
The service container is a powerful tool for managing class dependencies and performing dependency injection. It resolves classes automatically using type-hinting.

Q203. What is Laravel Sanctum?
Laravel Sanctum provides a simple authentication system for SPAs and mobile apps. It issues API tokens and can also use cookie-based session authentication for first-party SPAs.

Q204. What is Laravel Passport?
Laravel Passport is a full OAuth2 server implementation for Laravel. It provides access tokens, refresh tokens, and client credentials for third-party API authentication.

Q205. What is the difference between Laravel Sanctum and Passport?
Sanctum is simpler and ideal for SPAs and mobile apps using personal access tokens. Passport is a full OAuth2 implementation suited for third-party API access and authorization code flows.

---

SECTION 15: AUTHENTICATION AND AUTHORIZATION

---

Q206. What is the difference between authentication and authorization?
Authentication verifies who you are (identity). Authorization determines what you are allowed to do (permissions).

Q207. What is a JWT?
A JWT (JSON Web Token) is a compact, self-contained token used to transmit information securely between parties as a JSON object. It consists of three Base64-encoded parts: header, payload, and signature.

Q208. What are the three parts of a JWT?
The header contains the token type and signing algorithm. The payload contains claims (user data, expiry). The signature is created by signing the header and payload with a secret key.

Q209. What is the difference between access tokens and refresh tokens?
Access tokens are short-lived tokens used to authenticate API requests. Refresh tokens are long-lived and used to obtain new access tokens when the access token expires, without requiring the user to log in again.

Q210. What is OAuth 2.0?
OAuth 2.0 is an authorization framework that allows third-party applications to obtain limited access to a service on behalf of a user, without exposing credentials. It uses access tokens granted through various flows.

Q211. What is the OAuth 2.0 authorization code flow?
The user logs into the authorization server, which redirects back with an authorization code. The client exchanges the code for an access token using a client secret. This is the most secure flow for server-side apps.

Q212. What is PKCE?
PKCE (Proof Key for Code Exchange) is an extension to the authorization code flow for public clients (SPAs, mobile apps) that cannot securely store a client secret. It uses a code verifier and code challenge instead.

Q213. What is OpenID Connect?
OpenID Connect (OIDC) is an identity layer built on top of OAuth 2.0. It adds an ID token containing user profile information, enabling authentication in addition to authorization.

Q214. What is a session?
A session is a server-side mechanism to maintain state between HTTP requests. The server creates a session object, stores it (in memory, Redis, or a database), and sends the session ID to the client in a cookie.

Q215. What is the difference between cookie-based and token-based authentication?
Cookie-based authentication uses server-side sessions — the server stores session data and the client sends a session cookie. Token-based authentication is stateless — the server sends a signed token to the client, which includes all necessary claims.

Q216. What is bcrypt?
bcrypt is a password-hashing algorithm designed to be slow and resistant to brute-force attacks. It incorporates a salt and a configurable cost factor (work factor).

Q217. What is salting in password hashing?
Salting adds a random string (salt) to a password before hashing, ensuring that two users with the same password have different hashes and defeating precomputed rainbow table attacks.

Q218. What is RBAC?
Role-Based Access Control assigns permissions to roles rather than individual users. Users are assigned roles, and roles have permissions. This simplifies permission management at scale.

Q219. What is ABAC?
Attribute-Based Access Control makes access decisions based on attributes of the user, resource, and environment. It is more flexible and expressive than RBAC but more complex to implement.

Q220. What is API key authentication?
API key authentication uses a secret string passed in the request (usually in headers or query parameters) to identify and authenticate the caller. It is simple but less secure than OAuth and lacks built-in expiry.

---

SECTION 16: SECURITY

---

Q221. What is SQL injection?
SQL injection is an attack where malicious SQL code is inserted into a query through user input, potentially exposing, modifying, or deleting database data. Prevention involves parameterized queries and prepared statements.

Q222. What is XSS?
Cross-Site Scripting (XSS) is an attack where malicious scripts are injected into web pages viewed by other users. Prevention involves output encoding, Content Security Policy headers, and avoiding innerHTML with user input.

Q223. What is CSRF?
Cross-Site Request Forgery tricks an authenticated user's browser into making unintended requests to a server. Prevention uses CSRF tokens (unique per session) or the SameSite cookie attribute.

Q224. What is a CSRF token?
A CSRF token is a unique, secret, random value generated per user session and embedded in forms. The server validates this token on every state-changing request, rejecting requests without a valid token.

Q225. What is rate limiting?
Rate limiting restricts the number of requests a client can make in a given time window. It prevents abuse, brute force attacks, and denial-of-service attempts.

Q226. What is a man-in-the-middle attack?
MITM occurs when an attacker intercepts communication between two parties, potentially reading or altering the data. HTTPS with proper TLS validation prevents this.

Q227. What is input validation?
Input validation ensures user-supplied data conforms to expected types, formats, and ranges before processing. It prevents injection attacks and data corruption.

Q228. What is the principle of least privilege?
Each user, service, or process should only have the permissions necessary to perform its specific function — no more. This limits the damage from compromised accounts or bugs.

Q229. What is a content security policy?
CSP is an HTTP response header that tells browsers which sources of scripts, styles, images, and other resources are allowed. It mitigates XSS by preventing the execution of injected scripts.

Q230. What is parameterized queries and why is it important?
Parameterized queries separate SQL code from data by using placeholders for user input. The database driver handles escaping, making SQL injection impossible.

Q231. What is HTTPS and how does TLS work?
HTTPS uses TLS to encrypt data between client and server. TLS handshake negotiates a symmetric encryption key using asymmetric cryptography (public/private key pairs). After the handshake, all data is encrypted with the agreed symmetric key.

Q232. What is a DDoS attack?
A Distributed Denial of Service attack floods a server with enormous traffic from many sources, making it unavailable to legitimate users. Mitigation includes rate limiting, IP blocking, CDNs, and cloud-based DDoS protection.

Q233. What is an environment variable and why is it important for security?
Environment variables store configuration values (database passwords, API keys, secrets) outside of code. This keeps secrets out of version control and allows different values per environment.

Q234. What is OWASP Top 10?
OWASP (Open Web Application Security Project) Top 10 is a standard awareness document for web application security risks. It includes broken access control, cryptographic failures, injection, insecure design, security misconfiguration, and others.

Q235. What is a zero-day vulnerability?
A zero-day is a security flaw in software that is unknown to the vendor, giving them zero days to fix it before it can be exploited by attackers.

---

SECTION 17: CACHING

---

Q236. What is caching?
Caching temporarily stores frequently accessed data in a fast storage layer so future requests can be served from the cache rather than recomputing or re-fetching from the database.

Q237. What is a cache hit and a cache miss?
A cache hit occurs when the requested data is found in the cache. A cache miss occurs when the data is not in the cache and must be fetched from the original source.

Q238. What is cache invalidation?
Cache invalidation is the process of removing or updating stale cached data when the underlying data changes. It is considered one of the hardest problems in computer science.

Q239. What are common cache eviction policies?
LRU (Least Recently Used) evicts the item not used for the longest time. LFU (Least Frequently Used) evicts the least-used item. FIFO evicts the oldest item. TTL expires items after a set duration.

Q240. What is cache-aside pattern?
In cache-aside (lazy loading), the application checks the cache first. On a miss, it fetches from the database, stores the result in cache, and returns it. Writes go directly to the database and the cache is invalidated.

Q241. What is write-through caching?
Write-through caches data on every write. When data is written to the database, it is simultaneously written to the cache, ensuring the cache is always up-to-date.

Q242. What is write-behind caching?
Write-behind (write-back) writes data to the cache first and asynchronously persists it to the database later. It improves write performance but risks data loss if the cache fails before persistence.

Q243. What is a CDN cache?
CDN caches store copies of static and dynamic content at edge servers geographically close to users, reducing origin server load and latency.

Q244. What is memoization?
Memoization is a caching technique at the code level where the result of a function call is cached based on its input arguments so subsequent calls with the same arguments return the cached result.

Q245. What is stale-while-revalidate?
Stale-while-revalidate is a cache strategy where stale cached content is served immediately while the cache asynchronously fetches a fresh version in the background, balancing freshness and performance.

---

SECTION 18: MESSAGE QUEUES AND EVENT-DRIVEN ARCHITECTURE

---

Q246. What is a message queue?
A message queue is a form of asynchronous communication where producers send messages to a queue and consumers process them independently. It decouples components and handles load spikes.

Q247. What is RabbitMQ?
RabbitMQ is an open-source message broker that implements the AMQP protocol. It routes messages through exchanges and queues, supporting patterns like publish/subscribe, routing, and topic-based distribution.

Q248. What is Apache Kafka?
Apache Kafka is a distributed event streaming platform designed for high-throughput, fault-tolerant, real-time data pipelines. Unlike traditional queues, Kafka retains messages as a persistent log for a configurable time.

Q249. What is the difference between RabbitMQ and Kafka?
RabbitMQ is a traditional message broker suited for task queues and routing. Kafka is designed for event streaming with high throughput, message retention, and replay capabilities. Kafka is better for logs, analytics, and event sourcing.

Q250. What is a producer and consumer in messaging?
A producer is any service that publishes messages to a queue or topic. A consumer is any service that reads and processes those messages.

Q251. What is a topic in Kafka?
A topic is a category or feed to which messages are published. Kafka topics are divided into partitions, which are ordered sequences of messages distributed across brokers.

Q252. What is a Kafka consumer group?
A consumer group is a set of consumers that cooperatively consume messages from a topic. Each partition is assigned to only one consumer in the group at a time, enabling parallel processing.

Q253. What is at-least-once vs exactly-once delivery?
At-least-once means messages are delivered at least one time but may be duplicated. Exactly-once ensures messages are processed exactly one time with no duplicates, which is harder to achieve and requires coordination.

Q254. What is a dead letter queue?
A dead letter queue receives messages that could not be processed successfully after a maximum number of retries. It allows examining and reprocessing failed messages.

Q255. What is event-driven architecture?
In event-driven architecture, components communicate by producing and consuming events rather than making direct calls. This decouples services and enables reactive, scalable systems.

---

SECTION 19: MICROSERVICES

---

Q256. What is a microservice?
A microservice is a small, independently deployable service that focuses on a single business capability. Microservices communicate over networks using REST, gRPC, or messaging.

Q257. What is the difference between monolithic and microservices architecture?
A monolith is a single, unified codebase deployed as one unit. Microservices break the application into small, independently deployable services. Monoliths are simpler to develop but harder to scale. Microservices are complex but independently scalable.

Q258. What is service discovery?
Service discovery allows microservices to find each other without hardcoded addresses. Tools like Consul, Eureka, and Kubernetes DNS handle this. Clients query the registry for current addresses.

Q259. What is an API gateway?
An API gateway is a single entry point for all client requests in a microservices architecture. It handles routing, authentication, rate limiting, load balancing, and protocol translation.

Q260. What is the circuit breaker pattern?
The circuit breaker detects when a service is failing and short-circuits calls to it, returning a fallback response instead of waiting for timeouts. After a cooldown period, it allows limited traffic to test recovery.

Q261. What is the saga pattern?
Saga is a pattern for managing distributed transactions across microservices. Instead of a single ACID transaction, a saga is a sequence of local transactions coordinated through events or a central orchestrator.

Q262. What is the difference between choreography and orchestration in sagas?
In choreography, each service publishes events and reacts to others' events without a central coordinator. In orchestration, a central saga orchestrator tells each service what to do and handles failures.

Q263. What is the strangler fig pattern?
The strangler fig is a migration strategy where new functionality is built as microservices alongside the monolith, and the monolith's functionality is incrementally replaced until it can be retired.

Q264. What is a sidecar pattern?
A sidecar is a helper container deployed alongside a main service container to provide cross-cutting concerns like logging, monitoring, proxying, and configuration without changing the main service.

Q265. What is gRPC?
gRPC is a high-performance, open-source RPC (Remote Procedure Call) framework that uses Protocol Buffers (protobuf) for serialization. It is faster and more efficient than REST/JSON and supports streaming.

Q266. What is Protocol Buffers (protobuf)?
Protocol Buffers is Google's language-neutral, platform-neutral, extensible mechanism for serializing structured data. It is more compact and faster than JSON or XML.

Q267. What is the difference between REST and gRPC?
REST uses HTTP/1.1 and JSON. gRPC uses HTTP/2 and protobuf. gRPC is faster, supports bidirectional streaming, and generates client/server code automatically. REST is more human-readable and browser-friendly.

Q268. What is a service mesh?
A service mesh is an infrastructure layer that handles service-to-service communication, providing features like load balancing, encryption, retries, circuit breaking, and observability. Examples: Istio, Linkerd.

Q269. What is an idempotent operation?
An operation is idempotent if performing it multiple times produces the same result as performing it once. GET, PUT, DELETE are idempotent. POST is typically not.

Q270. What is the two-phase commit?
Two-phase commit (2PC) is a distributed transaction protocol where a coordinator asks all participants to prepare (phase 1) and then commits (phase 2) only if all participants agreed. It guarantees atomicity but is slow and has failure modes.

---

SECTION 20: DOCKER AND CONTAINERIZATION

---

Q271. What is Docker?
Docker is an open platform for developing, shipping, and running applications in containers. Containers package code and dependencies together, ensuring consistent behavior across environments.

Q272. What is a Docker container?
A container is a runnable instance of a Docker image. It is isolated from the host and other containers but shares the host OS kernel, making it lightweight compared to virtual machines.

Q273. What is a Docker image?
An image is a read-only template with instructions for creating a container. It is built from a Dockerfile and consists of layers. Multiple containers can run from the same image.

Q274. What is a Dockerfile?
A Dockerfile is a text file with a series of instructions to build a Docker image. Common instructions: FROM (base image), RUN (execute command), COPY (add files), EXPOSE (port), CMD or ENTRYPOINT (start command).

Q275. What is the difference between CMD and ENTRYPOINT in Dockerfile?
CMD provides default arguments for the container's command that can be overridden at runtime. ENTRYPOINT sets the command that always runs and cannot be easily overridden. They can be combined: ENTRYPOINT is the executable, CMD provides default arguments.

Q276. What is Docker Compose?
Docker Compose is a tool for defining and running multi-container Docker applications using a YAML file (docker-compose.yml). A single command (docker compose up) starts all services.

Q277. What is a Docker volume?
A volume is a persistent storage mechanism for Docker containers. Data in volumes persists even when the container is deleted, and volumes can be shared between containers.

Q278. What is the difference between bind mounts and volumes in Docker?
Volumes are managed by Docker and stored in Docker's storage area. Bind mounts link a host filesystem path directly into the container. Volumes are more portable and Docker-managed; bind mounts depend on the host's directory structure.

Q279. What is a Docker network?
Docker networks allow containers to communicate with each other. The default bridge network allows containers on the same host to communicate. Host network shares the host's network. Overlay networks span multiple hosts.

Q280. What is the difference between Docker and a VM?
VMs virtualize hardware and include a full OS. Containers share the host OS kernel and are much lighter. Containers start in seconds, VMs in minutes. VMs provide stronger isolation; containers are faster and more efficient.

---

SECTION 21: KUBERNETES

---

Q281. What is Kubernetes?
Kubernetes (K8s) is an open-source container orchestration platform that automates deployment, scaling, and management of containerized applications.

Q282. What is a Pod in Kubernetes?
A Pod is the smallest deployable unit in Kubernetes. It encapsulates one or more containers that share storage, network, and a specification for how to run them.

Q283. What is a Deployment in Kubernetes?
A Deployment manages a set of identical Pods and ensures the desired number are running. It handles rolling updates, rollbacks, and scaling.

Q284. What is a Service in Kubernetes?
A Service is an abstraction that exposes a set of Pods as a stable network endpoint. Even as Pods are created and destroyed, the Service maintains a consistent IP and DNS name.

Q285. What is the difference between ClusterIP, NodePort, and LoadBalancer service types?
ClusterIP exposes the service on an internal IP accessible only within the cluster. NodePort exposes the service on each node's IP at a static port. LoadBalancer provisions a cloud load balancer to expose the service externally.

Q286. What is a ConfigMap in Kubernetes?
A ConfigMap stores non-sensitive configuration data as key-value pairs and can be injected into Pods as environment variables or mounted as files.

Q287. What is a Secret in Kubernetes?
A Secret stores sensitive information like passwords, tokens, and keys. Like ConfigMaps, they can be mounted as volumes or used as environment variables. Secrets are base64-encoded (not encrypted by default).

Q288. What is a Namespace in Kubernetes?
Namespaces provide a mechanism for isolating groups of resources within a single cluster. They are useful for dividing a cluster among multiple teams or environments (dev, staging, production).

Q289. What is Horizontal Pod Autoscaler?
HPA automatically scales the number of Pod replicas in a Deployment based on observed CPU utilization or other custom metrics.

Q290. What is Helm?
Helm is a package manager for Kubernetes. Helm Charts are packages of pre-configured Kubernetes resources. Helm simplifies deploying and managing complex Kubernetes applications.

---

SECTION 22: CI/CD AND DEVOPS

---

Q291. What is CI/CD?
CI (Continuous Integration) is the practice of frequently merging code changes and automatically running tests. CD (Continuous Delivery/Deployment) is automatically deploying tested code to staging or production.

Q292. What is the difference between continuous delivery and continuous deployment?
Continuous delivery automates building and testing and requires a manual approval step before deployment. Continuous deployment goes further, automatically deploying every passing change to production without manual intervention.

Q293. What is a pipeline in CI/CD?
A pipeline is a defined sequence of stages (build, test, lint, deploy) that code changes pass through automatically. Each stage runs scripts that must succeed before the next stage begins.

Q294. What is GitHub Actions?
GitHub Actions is a CI/CD platform built into GitHub. You define workflows in YAML files in the .github/workflows directory, triggered by events like push, pull request, or scheduled cron.

Q295. What is blue-green deployment?
Blue-green deployment maintains two identical production environments. Traffic is routed to the current environment (blue). After deploying to the other (green), traffic is switched. Rollback is instant by switching traffic back.

Q296. What is a canary deployment?
A canary release gradually rolls out a new version to a small percentage of users first. If metrics are healthy, the rollout continues. If issues arise, traffic is shifted back to the old version.

Q297. What is a rollback?
A rollback is the process of reverting a deployment to a previous known-good state after a problem is detected.

Q298. What is Infrastructure as Code (IaC)?
IaC is the practice of managing and provisioning infrastructure using machine-readable configuration files (Terraform, Pulumi, CloudFormation) instead of manual processes.

Q299. What is Terraform?
Terraform is an open-source IaC tool by HashiCorp that lets you define cloud infrastructure in declarative configuration files and manages its lifecycle (create, update, destroy).

Q300. What is a Docker registry?
A Docker registry stores Docker images. Docker Hub is the public registry. Private registries include AWS ECR, Google GCR, and self-hosted Harbor.

---

SECTION 23: CLOUD COMPUTING

---

Q301. What is cloud computing?
Cloud computing delivers computing services like servers, storage, databases, networking, software, and analytics over the internet on a pay-as-you-go basis.

Q302. What is the difference between IaaS, PaaS, and SaaS?
IaaS (Infrastructure as a Service) provides virtualized computing resources (AWS EC2). PaaS (Platform as a Service) provides a development and deployment environment (Heroku, App Engine). SaaS (Software as a Service) delivers software over the internet (Gmail, Salesforce).

Q303. What is AWS?
Amazon Web Services is the world's most comprehensive cloud platform, offering over 200 services including compute (EC2), storage (S3), databases (RDS, DynamoDB), serverless (Lambda), and more.

Q304. What is AWS EC2?
EC2 (Elastic Compute Cloud) provides resizable virtual servers (instances) in the cloud. You choose the instance type, OS, and storage, and pay per hour/second of usage.

Q305. What is AWS S3?
S3 (Simple Storage Service) is object storage for storing and retrieving any amount of data. Objects are stored in buckets. S3 is used for static files, backups, data lakes, and content distribution.

Q306. What is AWS Lambda?
Lambda is a serverless compute service that runs code in response to events without provisioning or managing servers. You only pay for the compute time consumed.

Q307. What is serverless computing?
Serverless computing lets developers run code without managing servers. The cloud provider automatically provisions, scales, and manages the infrastructure. AWS Lambda, Google Cloud Functions, and Azure Functions are examples.

Q308. What is AWS RDS?
RDS (Relational Database Service) is a managed relational database service supporting MySQL, PostgreSQL, Oracle, SQL Server, and MariaDB. AWS handles backups, patching, and failover.

Q309. What is AWS DynamoDB?
DynamoDB is a fully managed, serverless NoSQL key-value and document database that provides single-digit millisecond performance at any scale.

Q310. What is auto-scaling?
Auto-scaling automatically adjusts the number of compute instances based on demand. When traffic increases, more instances are added; when traffic drops, instances are removed, optimizing cost and performance.

Q311. What is a VPC?
A VPC (Virtual Private Cloud) is an isolated virtual network within a cloud provider. You control IP address ranges, subnets, routing tables, and network gateways.

Q312. What is a subnet?
A subnet is a range of IP addresses within a VPC. Public subnets are accessible from the internet; private subnets are not directly accessible and are typically used for databases and internal services.

Q313. What is AWS CloudFront?
CloudFront is AWS's CDN service. It caches content at edge locations worldwide, reducing latency for static and dynamic content delivery.

Q314. What is AWS SQS?
SQS (Simple Queue Service) is a fully managed message queuing service for decoupling components. It supports standard queues (at-least-once delivery) and FIFO queues (exactly-once, ordered delivery).

Q315. What is AWS SNS?
SNS (Simple Notification Service) is a fully managed pub/sub messaging service. Publishers send messages to topics and SNS delivers them to all subscribed endpoints (Lambda, SQS, email, HTTP).

---

SECTION 24: SYSTEM DESIGN CONCEPTS

---

Q316. What is a distributed system?
A distributed system is a system whose components are located on different computers that communicate and coordinate to appear as a single coherent system to the user.

Q317. What is the CAP theorem?
CAP theorem states that a distributed system can only guarantee two of three properties simultaneously: Consistency (all nodes see the same data), Availability (every request gets a response), and Partition Tolerance (system continues operating despite network partitions).

Q318. What is eventual consistency?
Eventual consistency means that if no new updates are made, all replicas will eventually converge to the same value. It trades immediate consistency for higher availability and performance.

Q319. What is strong consistency?
Strong consistency guarantees that after a write completes, any subsequent read will return the updated value, regardless of which node serves it.

Q320. What is a single point of failure?
A single point of failure is a component whose failure would cause the entire system to fail. Distributed systems eliminate SPOFs through replication and redundancy.

Q321. What is database replication?
Replication is copying data from one database server (primary) to one or more others (replicas). It improves read performance, provides redundancy, and enables failover.

Q322. What is database sharding?
Sharding horizontally partitions data across multiple database instances, with each shard holding a subset of the data. It is used to distribute load when a single database cannot handle the volume.

Q323. What is a consistent hash?
Consistent hashing is a technique for distributing data or load across nodes where adding or removing nodes minimizes the number of keys that need to be remapped. Used in CDNs, distributed caches, and databases.

Q324. What is a reverse proxy?
A reverse proxy sits in front of web servers and forwards client requests to them. It provides load balancing, SSL termination, caching, and security. Nginx is commonly used as a reverse proxy.

Q325. What is Nginx?
Nginx is a high-performance web server, reverse proxy, and load balancer. It can serve static files directly, proxy requests to application servers, and handle thousands of concurrent connections efficiently.

Q326. What is the difference between a forward proxy and a reverse proxy?
A forward proxy sits between clients and the internet, often used for privacy or filtering. A reverse proxy sits between the internet and servers, used for load balancing, SSL termination, and caching.

Q327. What is a webhook?
A webhook is an HTTP callback — a way for one system to notify another of events by sending an HTTP POST request to a predefined URL when something happens.

Q328. What is long polling?
Long polling is a technique where the client makes a request and the server keeps the connection open until new data is available or a timeout occurs, then responds and the client immediately re-requests.

Q329. What are WebSockets?
WebSockets provide full-duplex, persistent communication channels between client and server over a single TCP connection. Unlike HTTP, data can be pushed from server to client at any time without the client requesting it.

Q330. What is Server-Sent Events (SSE)?
SSE is a standard for a server to push updates to a browser over an HTTP connection. Unlike WebSockets, SSE is unidirectional (server to client) and simpler to implement over standard HTTP.

---

SECTION 25: LOGGING, MONITORING AND OBSERVABILITY

---

Q331. What is observability?
Observability is the ability to understand the internal state of a system by examining its outputs — logs, metrics, and traces — without instrumenting the internals for every possible failure mode.

Q332. What are the three pillars of observability?
Logs (discrete events with context), Metrics (aggregated numerical measurements over time), and Traces (end-to-end request flows across services).

Q333. What is structured logging?
Structured logging produces log output in a machine-readable format like JSON, with consistent fields (timestamp, level, message, request ID, user ID). It enables searching, filtering, and aggregation.

Q334. What is ELK stack?
ELK is Elasticsearch (search and analytics engine), Logstash (log pipeline), and Kibana (visualization). Together they provide centralized log aggregation, search, and dashboards.

Q335. What is Prometheus?
Prometheus is an open-source monitoring system and time-series database that scrapes metrics from instrumented applications. It has a powerful query language (PromQL) and supports alerting.

Q336. What is Grafana?
Grafana is an open-source visualization and analytics platform that integrates with Prometheus, InfluxDB, Elasticsearch, and other data sources to build dashboards and alert on metrics.

Q337. What is distributed tracing?
Distributed tracing tracks a request as it flows through multiple services, collecting timing and diagnostic data at each step. Tools include Jaeger, Zipkin, and AWS X-Ray.

Q338. What is a health check endpoint?
A health check endpoint (typically /health or /healthz) allows orchestrators, load balancers, and monitoring tools to determine if a service is running correctly and ready to receive traffic.

Q339. What is an SLO, SLA, and SLI?
An SLI (Service Level Indicator) is a metric measuring service behavior (latency, error rate). An SLO (Service Level Objective) is a target value for an SLI. An SLA (Service Level Agreement) is a formal contract with customers about SLOs.

Q340. What is the difference between error rate and error budget?
Error rate is the percentage of failed requests. Error budget is (1 - SLO availability). If your SLO is 99.9% availability, your error budget is 0.1% downtime per period. Once the budget is exhausted, you stop shipping features to focus on reliability.

---

SECTION 26: GRAPHQL

---

Q341. What is GraphQL?
GraphQL is a query language for APIs and a runtime for executing queries. Clients specify exactly what data they need, eliminating over-fetching and under-fetching, unlike REST where responses are server-defined.

Q342. What is the difference between a Query and a Mutation in GraphQL?
A Query fetches data (read operation). A Mutation creates, updates, or deletes data (write operations). Both are defined in the schema.

Q343. What is a GraphQL Schema?
The schema defines the types and relationships in a GraphQL API. It is the contract between client and server, specifying all possible queries, mutations, subscriptions, and data types.

Q344. What is a Resolver in GraphQL?
A resolver is a function that handles the logic for fetching the data for a specific field in the schema. Each field in a GraphQL schema has a corresponding resolver.

Q345. What is the N+1 problem in GraphQL and how do you solve it?
In GraphQL, resolvers for nested fields can fire individual database queries for each parent object. DataLoader solves this by batching multiple requests into a single query and caching results within a request.

Q346. What is DataLoader?
DataLoader is a utility library for batching and caching asynchronous data fetching in GraphQL resolvers, solving the N+1 problem by collecting all requests made in the same tick and issuing a single batch request.

Q347. What is a GraphQL Subscription?
Subscriptions are a GraphQL operation for real-time updates. The client subscribes to a topic and the server pushes data to the client when relevant events occur, typically over WebSockets.

Q348. What is schema stitching vs federation in GraphQL?
Schema stitching combines multiple GraphQL schemas into one at the gateway level. GraphQL Federation (Apollo) allows multiple teams to build their own subgraphs that compose into a federated supergraph, with better separation of concerns.

Q349. What are GraphQL fragments?
Fragments are reusable units of a GraphQL query that can be spread into multiple queries to avoid repetition. They define a selection set on a specific type.

Q350. What is introspection in GraphQL?
Introspection allows clients to query the schema itself — discovering types, fields, and operations. GraphQL tools like GraphiQL and Playground use introspection to provide autocomplete and documentation.

---

SECTION 27: TESTING

---

Q351. What is unit testing?
Unit testing tests individual functions or modules in isolation from external dependencies. Dependencies are replaced with mocks or stubs.

Q352. What is integration testing?
Integration testing verifies that multiple components work together correctly. In backend development, this often means testing a route handler with a real or test database.

Q353. What is end-to-end testing?
E2E testing simulates real user flows through the entire application stack, from the API through the database and back. It validates that the system works as a whole.

Q354. What is mocking?
Mocking replaces real dependencies (databases, APIs, file systems) with controlled fake implementations in tests, isolating the unit under test and making tests fast and deterministic.

Q355. What is TDD?
Test-Driven Development is a software development approach where you write a failing test first, then write the minimum code to make it pass, then refactor. The cycle is Red-Green-Refactor.

Q356. What is the difference between a mock and a stub?
A stub provides canned responses to calls made during the test. A mock is a stub that also verifies interactions — it can assert whether specific methods were called and with what arguments.

Q357. What is Jest?
Jest is a JavaScript testing framework developed by Facebook. It works with Node.js and React, providing a test runner, assertion library, and built-in mocking and coverage capabilities.

Q358. What is Pytest?
Pytest is a Python testing framework that makes it easy to write simple and scalable tests. It supports fixtures, parameterization, plugins, and generates detailed output.

Q359. What is a test fixture?
A fixture is code that sets up the initial state for a test (creating a database connection, seeding test data, creating mock objects) and tears it down afterward.

Q360. What is code coverage?
Code coverage measures the percentage of source code lines, branches, or functions that are executed during testing. High coverage does not guarantee correctness but shows which code is being tested.

---

SECTION 28: ORMs AND QUERY BUILDERS

---

Q361. What is an ORM?
An ORM (Object-Relational Mapper) maps database tables to programming language objects. It allows querying and manipulating data using object-oriented methods instead of raw SQL.

Q362. What is Sequelize?
Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server. It provides models, migrations, validations, associations, and query methods.

Q363. What is Prisma?
Prisma is a next-generation ORM for Node.js and TypeScript. It provides a type-safe database client, schema-based migrations, and works with PostgreSQL, MySQL, SQLite, and MongoDB.

Q364. What is TypeORM?
TypeORM is an ORM for TypeScript and JavaScript that runs in Node.js and browser environments. It supports Active Record and Data Mapper patterns and works with multiple databases.

Q365. What is Knex.js?
Knex.js is a SQL query builder for Node.js — not a full ORM. It provides a programmatic interface to build SQL queries and execute them, supporting multiple databases. ORMs like Bookshelf.js are built on top of it.

Q366. What is the Active Record pattern?
In the Active Record pattern, the model class itself contains methods for database operations. An object both holds data and knows how to save, update, and delete itself. Used in Rails' ActiveRecord and TypeORM.

Q367. What is the Data Mapper pattern?
In Data Mapper, the model is a plain object with no database logic. A separate mapper class handles persistence. This separates business logic from database logic. Used in TypeORM and Doctrine.

Q368. What is lazy loading in ORMs?
Lazy loading defers fetching related entities until they are accessed. This can cause the N+1 problem if you iterate over many entities and access a relation on each.

Q369. What is eager loading in ORMs?
Eager loading fetches related entities in the same query using JOINs or separate queries batched together. It prevents the N+1 problem by loading all needed data upfront.

Q370. What is a Prisma schema?
A Prisma schema (schema.prisma) is the single source of truth for your database schema, models, relations, and Prisma client configuration. Prisma generates type-safe client code from it.

---

SECTION 29: DESIGN PATTERNS IN BACKEND

---

Q371. What is the Repository pattern?
The Repository pattern abstracts the data access layer, providing a collection-like interface for accessing domain objects. Controllers and services interact with repositories rather than directly with the database.

Q372. What is the MVC pattern?
MVC (Model-View-Controller) separates application concerns. Model handles data and business logic. View handles presentation. Controller handles user input and coordinates Model and View.

Q373. What is the Singleton pattern?
Singleton ensures a class has only one instance and provides a global access point. Commonly used for database connections, loggers, and configuration managers.

Q374. What is the Factory pattern?
The Factory pattern provides an interface for creating objects without specifying the exact class to create. It decouples client code from concrete implementations.

Q375. What is the Observer pattern?
The Observer pattern defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified automatically. Used in event systems, pub/sub.

Q376. What is the Strategy pattern?
Strategy defines a family of algorithms, encapsulates each one, and makes them interchangeable. The algorithm varies independently from clients that use it. Used for different authentication strategies or payment processors.

Q377. What is dependency inversion principle?
DIP states that high-level modules should not depend on low-level modules — both should depend on abstractions. And abstractions should not depend on details.

Q378. What is the SOLID principles?
Single Responsibility (each class does one thing), Open/Closed (open for extension, closed for modification), Liskov Substitution (subtypes substitutable for base types), Interface Segregation (many specific interfaces better than one general), Dependency Inversion (depend on abstractions).

Q379. What is CQRS?
CQRS (Command Query Responsibility Segregation) separates read (Query) and write (Command) operations into separate models. The write model handles commands and updates state; the read model handles queries and returns data.

Q380. What is Event Sourcing?
Event Sourcing stores all changes to application state as a sequence of events, not the current state. The current state is derived by replaying events. It provides a full audit log and supports time travel queries.

---

SECTION 30: ADVANCED TOPICS

---

Q381. What is a race condition?
A race condition occurs when two or more processes access shared data concurrently and the outcome depends on the timing of their execution, leading to unpredictable results.

Q382. What is a deadlock?
A deadlock occurs when two or more processes are each waiting for a resource held by the other, causing all to be stuck indefinitely. Resolved by resource ordering, timeouts, or deadlock detection.

Q383. What is optimistic locking?
Optimistic locking assumes conflicts are rare and allows concurrent reads. Before writing, it checks if the data has changed since it was read (via a version column). If changed, the write fails and the operation must be retried.

Q384. What is pessimistic locking?
Pessimistic locking assumes conflicts are likely and locks the data when it is read, preventing other processes from reading or writing until the lock is released. Implemented with SELECT FOR UPDATE in SQL.

Q385. What is a connection pool?
A connection pool maintains a set of pre-established database connections that are reused across requests, avoiding the expensive overhead of creating a new connection for each query.

Q386. What is the difference between synchronous and asynchronous I/O?
Synchronous I/O blocks execution until the operation completes. Asynchronous I/O initiates the operation and continues executing other code. When the operation finishes, a callback or promise handles the result.

Q387. What is backpressure in streaming?
Backpressure is a mechanism where a receiver signals to a sender to slow down when it cannot process data fast enough, preventing buffer overflow and memory issues in stream pipelines.

Q388. What is GraphQL vs REST — when to choose each?
Choose REST for simple, resource-based APIs, public APIs, or when caching HTTP responses matters. Choose GraphQL when clients need flexible queries, you have complex nested data, or you want to reduce over-fetching across multiple clients.

Q389. What is the difference between a process and a thread?
A process is an independent program with its own memory space. A thread is a unit of execution within a process, sharing memory with other threads. Threads are lighter but require synchronization for shared data.

Q390. What is immutability and why does it matter in backend systems?
Immutability means data cannot be changed after creation. In backend systems, immutable data structures eliminate race conditions, make code easier to reason about, and enable safe concurrent access.

Q391. What is eventual consistency and how do you handle it?
In distributed systems, writes propagate to replicas asynchronously. Clients may read stale data temporarily. Handle it by: using read-your-own-writes guarantees, versioning, conflict resolution strategies, or choosing strongly consistent reads where needed.

Q392. What is the difference between horizontal and vertical partitioning?
Vertical partitioning splits a table by columns — separating frequently accessed columns from rarely used ones. Horizontal partitioning (sharding) splits a table by rows, distributing them across multiple databases.

Q393. What is a distributed lock?
A distributed lock coordinates exclusive access to a shared resource across multiple processes or machines. Redis SETNX or Redlock algorithm is commonly used to implement distributed locks.

Q394. What is graceful shutdown?
Graceful shutdown allows a server to complete in-flight requests and clean up resources before terminating. It typically involves stopping accepting new connections, waiting for active requests to finish, then closing connections.

Q395. What is the twelve-factor app methodology?
The twelve-factor app is a methodology for building scalable, maintainable SaaS apps. Key factors include: codebase in version control, explicit dependency declaration, config in environment, backing services as attached resources, separate build/release/run stages, stateless processes, and disposability.

---

SECTION 31: ADDITIONAL NODE.JS AND JAVASCRIPT BACKEND

---

Q396. What is V8?
V8 is Google's open-source JavaScript engine that compiles JavaScript directly to machine code. Node.js is built on V8.

Q397. What is libuv?
libuv is a multi-platform C library that provides Node.js with its event loop, asynchronous I/O, thread pool, file system operations, and networking capabilities.

Q398. What is the Node.js thread pool?
Node.js uses a thread pool (managed by libuv) for CPU-intensive or blocking operations like file system access, DNS lookups, and crypto. The default pool size is 4 threads.

Q399. What is the difference between process.env.NODE_ENV and other environment variables?
NODE_ENV is a conventional variable used to define the environment (development, production, test). Many libraries behave differently based on its value, like enabling verbose errors in development.

Q400. What is PM2?
PM2 is a production process manager for Node.js. It keeps applications alive, restarts them on crashes, manages clusters, provides logging, and supports zero-downtime deployments.

Q401. What is the difference between CommonJS and ES Modules in Node.js?
CommonJS uses require() and module.exports, is synchronous, and was the original Node.js module system. ES Modules use import/export, support static analysis, and are the JavaScript standard. Node.js supports both.

Q402. What is a linter and what are common tools for backend?
A linter is a tool that analyzes code for style errors, bugs, and bad practices. For Node.js: ESLint. For Python: Pylint, flake8, ruff. For Java: Checkstyle, PMD.

Q403. What is TypeScript and why use it for backend?
TypeScript is a statically typed superset of JavaScript. It catches type errors at compile time, improves editor autocompletion, makes refactoring safer, and serves as documentation for function signatures.

Q404. What is Zod?
Zod is a TypeScript-first schema declaration and validation library. In backend development, it is used to validate and parse request bodies, environment variables, and configuration with strong type inference.

Q405. What is the difference between body-parser and express.json()?
express.json() is a built-in Express middleware since version 4.16.0. body-parser was the separate package that provided the same functionality before Express bundled it. They are functionally equivalent for JSON parsing.

---

SECTION 32: PYTHON BACKEND SPECIFIC

---

Q406. What is ASGI?
ASGI (Asynchronous Server Gateway Interface) is the successor to WSGI for Python web servers, enabling async request handling, WebSockets, and HTTP/2. FastAPI uses ASGI via Uvicorn.

Q407. What is Uvicorn?
Uvicorn is a lightning-fast ASGI server for Python, built on uvloop and httptools. It is commonly used to run FastAPI applications in production.

Q408. What is SQLAlchemy?
SQLAlchemy is a popular Python SQL toolkit and ORM. It provides both a high-level ORM for model-based queries and a Core expression language for writing SQL programmatically.

Q409. What is Alembic?
Alembic is a lightweight database migration tool for SQLAlchemy. It generates migration scripts to evolve the database schema and supports upgrade and downgrade operations.

Q410. What is asyncio in Python?
asyncio is Python's standard library for writing concurrent code using async/await syntax. It runs in a single-threaded event loop and is used by FastAPI, aiohttp, and other async frameworks.

Q411. What is the difference between threading and asyncio in Python?
threading uses OS threads for parallelism, suitable for I/O-bound tasks but has the GIL (Global Interpreter Lock) limitation for CPU-bound tasks. asyncio uses cooperative concurrency in a single thread, ideal for I/O-bound tasks with many concurrent connections.

Q412. What is the Python GIL?
The Global Interpreter Lock is a mutex in CPython that allows only one thread to execute Python bytecode at a time. It prevents true CPU parallelism in threads. Use multiprocessing or external processes for CPU-bound parallelism.

Q413. What is Celery?
Celery is a distributed task queue for Python. It processes tasks asynchronously in background workers and is used for email sending, image processing, periodic tasks, and long-running operations.

Q414. What is a decorator in Python and how is it used in web frameworks?
A decorator is a function that wraps another function to extend its behavior. Web frameworks use decorators extensively: @app.route in Flask, @router.get in FastAPI, and custom decorators for authentication and rate limiting.

Q415. What is aiohttp?
aiohttp is an asynchronous HTTP client/server framework for Python built on asyncio. It can be used as a web server or as an async HTTP client for making non-blocking external API calls.

---

SECTION 33: JAVA BACKEND SPECIFIC

---

Q416. What is the Spring IoC container?
The Inversion of Control container manages the lifecycle and configuration of application objects (beans). The container creates, wires, and destroys beans based on configuration.

Q417. What is @SpringBootApplication?
@SpringBootApplication is a convenience annotation combining @Configuration (marks class as config source), @EnableAutoConfiguration (enables auto-configuration), and @ComponentScan (scans for components).

Q418. What is JPA?
JPA (Java Persistence API) is a Java specification for ORM. It defines interfaces and annotations. Hibernate is the most popular JPA implementation.

Q419. What is Lombok in Java?
Lombok is a Java library that reduces boilerplate code using annotations. @Data generates getters, setters, equals, hashCode, and toString. @Builder generates builder pattern. @Slf4j adds a logger.

Q420. What is Spring WebFlux?
Spring WebFlux is a reactive web framework in Spring 5+. Unlike Spring MVC (which is blocking), WebFlux is non-blocking and supports asynchronous programming using Reactor (Mono and Flux types).

Q421. What is the difference between Mono and Flux in Project Reactor?
Mono represents a stream of 0 or 1 elements. Flux represents a stream of 0 to N elements. Both are reactive types used in Spring WebFlux for non-blocking operations.

Q422. What is Maven vs Gradle?
Maven is a build tool using XML (pom.xml) for configuration. Gradle uses Groovy or Kotlin DSL (build.gradle), is more flexible, and generally faster due to incremental builds and build caching.

Q423. What is application.properties in Spring Boot?
It is the default configuration file where you define server port, database URL, logging levels, and Spring properties. YAML format (application.yml) is also supported and is more readable.

Q424. What is the difference between @PathVariable and @RequestParam in Spring?
@PathVariable extracts values from the URI path like /users/{id}. @RequestParam extracts values from query parameters like /users?id=1.

Q425. What is Spring Boot's embedded server?
Spring Boot embeds a server (Tomcat by default, or Jetty/Undertow) directly into the JAR, eliminating the need to deploy to an external application server. You run the app with java -jar app.jar.

---

SECTION 34: ADDITIONAL DATABASE CONCEPTS

---

Q426. What is a full-text search?
Full-text search allows searching natural language text efficiently. Databases like PostgreSQL (tsvector/tsquery) and dedicated tools like Elasticsearch tokenize, stem, and index text for relevant search queries.

Q427. What is Elasticsearch?
Elasticsearch is a distributed, RESTful search and analytics engine built on Apache Lucene. It indexes JSON documents and provides powerful full-text search, aggregations, and analytics.

Q428. What is the difference between OLTP and OLAP?
OLTP (Online Transaction Processing) handles high-frequency, short transactions (inserting orders, updating user data). OLAP (Online Analytical Processing) handles complex queries on large datasets for reporting and business intelligence.

Q429. What is a data warehouse?
A data warehouse is a centralized repository of integrated data from multiple sources, optimized for analytical queries. Examples: Snowflake, Amazon Redshift, Google BigQuery.

Q430. What is the difference between a relational and a NoSQL database?
Relational databases use structured tables with fixed schemas and SQL. NoSQL databases are more flexible, using various models (document, key-value, column, graph) and are designed for horizontal scaling and unstructured data.

Q431. What are the types of NoSQL databases?
Document stores (MongoDB, CouchDB), Key-Value stores (Redis, DynamoDB), Column-family stores (Cassandra, HBase), and Graph databases (Neo4j, Amazon Neptune).

Q432. What is Apache Cassandra?
Cassandra is a distributed NoSQL database designed for high availability and linear scalability. It has no single point of failure and uses a peer-to-peer architecture. Ideal for time-series data and write-heavy workloads.

Q433. What is a time-series database?
A time-series database is optimized for storing and querying data that changes over time. Examples: InfluxDB, TimescaleDB (PostgreSQL extension). Used for metrics, IoT, monitoring, and financial data.

Q434. What is database connection pooling?
Connection pooling reuses a set of pre-established database connections rather than creating a new one for each request. Tools: PgBouncer (PostgreSQL), HikariCP (Java), pg-pool (Node.js). This dramatically reduces connection overhead.

Q435. What is the difference between optimistic and pessimistic concurrency control?
Optimistic control assumes conflicts are rare — it reads without locking and checks for conflicts at write time. Pessimistic control assumes conflicts are likely — it locks records on read to prevent concurrent modification.

---

SECTION 35: API DESIGN AND BEST PRACTICES

---

Q436. What is versioning in REST APIs?
API versioning manages changes to an API without breaking existing clients. Common strategies: URL versioning (/v1/users), query parameter (?version=1), and custom headers (Accept: application/vnd.api+v1+json).

Q437. What is pagination in APIs?
Pagination divides large result sets into pages. Strategies: offset-based (?page=2&limit=20), cursor-based (using the last item's ID as a cursor for efficient next page fetching), and keyset pagination.

Q438. What is cursor-based pagination vs offset-based?
Offset-based pagination skips N records — it degrades at large offsets and has inconsistency with concurrent inserts. Cursor-based pagination uses a pointer to the last item in the current page, making it efficient and consistent.

Q439. What is HATEOAS?
Hypermedia As The Engine Of Application State is a REST constraint where responses include links to related actions. A client navigates the API by following links, reducing coupling to URL structure.

Q440. What is idempotency key?
An idempotency key is a unique client-generated token sent with a request. The server stores the result against the key, so if the same request is made again (e.g., due to a network timeout), the same response is returned without re-processing, preventing duplicate charges or actions.

Q441. What is content negotiation in HTTP?
Content negotiation allows clients to specify the format they want (JSON, XML) using the Accept header. The server selects the best matching format and responds with Content-Type indicating what was sent.

Q442. What is an OpenAPI specification?
OpenAPI Specification (OAS, formerly Swagger) is a language-agnostic standard for describing RESTful APIs. It defines endpoints, parameters, request/response schemas, authentication, and more in a YAML or JSON document.

Q443. What is API rate limiting and how do you implement it?
Rate limiting caps the number of API calls from a client in a time window. Implementation: store request counts in Redis with TTL. Return 429 Too Many Requests with Retry-After headers when the limit is exceeded.

Q444. What is the difference between throttling and rate limiting?
Rate limiting rejects requests that exceed a limit with an error. Throttling slows down responses instead of rejecting them, degrading service gracefully under load.

Q445. What is an API contract?
An API contract is a formal agreement between a service provider and consumer describing exactly how the API behaves: endpoints, methods, request/response schemas, error formats, and versioning. OpenAPI specifications serve as API contracts.

---

SECTION 36: PERFORMANCE OPTIMIZATION

---

Q446. What is database query optimization?
Query optimization involves techniques to make database queries faster: adding indexes, rewriting inefficient queries, avoiding SELECT *, using query plans (EXPLAIN), caching results, and limiting returned data.

Q447. What is connection timeout vs read timeout?
Connection timeout is the time allowed to establish a connection to the server. Read timeout is the time allowed to wait for data after the connection is established. Both should be configured to avoid hanging requests.

Q448. What is N+1 query and how do you detect it?
The N+1 problem fires 1 query for a list and N queries for each item's related data. Detect it using query logging, database profiling tools, or APM tools that show query counts per request.

Q449. What is lazy initialization?
Lazy initialization delays object creation or data loading until it is first needed, reducing startup time and memory usage. In databases, it means related data is loaded only when accessed.

Q450. What is a database explain plan?
EXPLAIN (or EXPLAIN ANALYZE) shows the database query planner's execution strategy for a query, including which indexes it uses, join types, estimated vs actual row counts, and timing. Essential for query optimization.

Q451. What is application profiling?
Profiling measures where a program spends its time and uses memory. Profilers identify hotspots — functions that consume the most resources — so you can focus optimization efforts. Tools: cProfile (Python), clinic.js (Node.js), Java Flight Recorder.

Q452. What is the fan-out problem in social networks?
Fan-out is writing a post to all followers' feeds. With millions of followers, a single write becomes millions of writes (fan-out on write) or many reads must be aggregated (fan-out on read). Hybrid approaches segment by follower count.

Q453. What is query caching?
Query caching stores the result of a database query in memory and returns it for identical subsequent queries without re-executing the query. Effective for read-heavy data that changes infrequently.

Q454. What is prefetching?
Prefetching loads data before it is explicitly requested, anticipating what the application will need next. In databases, it means eager loading related data. In systems, it means loading the next page of results before the user requests it.

Q455. What is async processing for performance?
Offloading non-critical operations (sending emails, generating reports, resizing images) to background jobs frees the request/response cycle to return quickly, improving perceived and actual API performance.

---

SECTION 37: MISCELLANEOUS BACKEND CONCEPTS

---

Q456. What is a cron job?
A cron job is a scheduled task that runs at specified intervals (defined in a cron expression). In backend systems, cron jobs handle tasks like database cleanup, report generation, and sending scheduled notifications.

Q457. What is the difference between synchronous and asynchronous communication between services?
Synchronous communication (REST, gRPC) means the caller waits for a response. Asynchronous communication (message queues) means the caller publishes a message and does not wait, enabling decoupling and resilience.

Q458. What is a feature flag?
A feature flag (toggle) controls whether a feature is enabled in production without deploying new code. They enable gradual rollouts, A/B testing, and instant rollback of features.

Q459. What is blue ocean vs green ocean deployment?
Blue-green deployment uses two identical environments. The new version is deployed to the inactive environment (green), tested, and then traffic is switched. Blue ocean refers to the currently live environment.

Q460. What is idempotency in database design?
In database design, ensuring that re-running an operation (like a migration or upsert) produces the same result as running it once, preventing duplicate data or errors on retry.

Q461. What is a headless CMS?
A headless CMS provides a content management backend with an API (REST or GraphQL) but no frontend. It delivers content to any frontend (web, mobile, IoT) through the API.

Q462. What is database seeding?
Seeding is the process of populating a database with initial data — either for development/testing purposes or for required default data (like admin users, country lists) needed for the application to function.

Q463. What is a lock table (advisory lock)?
Advisory locks in PostgreSQL are application-level locks that the database stores but does not enforce automatically. Your application code acquires and releases them, useful for preventing concurrent job execution.

Q464. What is request throttling?
Throttling limits the rate at which requests are processed or forwarded. Unlike hard rate limiting (reject immediately), throttling queues excess requests and processes them when capacity is available.

Q465. What is API gateway vs BFF (Backend for Frontend)?
An API gateway is a general-purpose entry point for all clients. A BFF (Backend for Frontend) is a specialized gateway tailored to a specific frontend (mobile BFF, web BFF), aggregating and transforming data optimally for that client.

Q466. What is a distributed cache?
A distributed cache is a caching layer shared across multiple application servers. Redis Cluster and Memcached are examples. It prevents each server from having a separate, potentially inconsistent local cache.

Q467. What is transactional outbox pattern?
The outbox pattern ensures a database write and a message publish happen atomically. The application writes both the business data and the message to the database in the same transaction. A separate process reads the outbox table and publishes the message.

Q468. What is soft delete?
Soft delete marks records as deleted (with a deleted_at timestamp or is_deleted flag) without physically removing them from the database. Useful for data recovery, audit trails, and regulatory compliance.

Q469. What is database connection management?
Proper connection management includes using connection pools, setting appropriate pool sizes, handling connection timeouts, releasing connections promptly after use, and monitoring for connection leaks.

Q470. What is a healthcheck in containers?
A healthcheck is a command defined in Docker or Kubernetes that periodically checks if a container is healthy. Unhealthy containers are automatically restarted by orchestrators.

---

SECTION 38: REAL-TIME SYSTEMS

---

Q471. What is Socket.IO?
Socket.IO is a JavaScript library for real-time, bidirectional communication between web clients and servers. It wraps WebSockets with fallbacks (long polling) and adds rooms, namespaces, and auto-reconnection.

Q472. What is the difference between WebSockets and Socket.IO?
WebSockets is a native browser protocol. Socket.IO uses WebSockets as a transport but adds higher-level features: automatic reconnection, rooms, namespaces, fallbacks for environments where WebSockets aren't available.

Q473. What is a chat room in Socket.IO?
A room is an arbitrary channel that sockets can join. Servers can broadcast messages to all sockets in a room with socket.to('room').emit('event', data).

Q474. What is Redis pub/sub used for in real-time backends?
Redis pub/sub is used to coordinate real-time events across multiple server instances. When a message is published on one server, Redis broadcasts it to all subscribed servers, enabling cross-server real-time communication.

Q475. What is scaling WebSocket servers?
WebSocket connections are long-lived, making horizontal scaling tricky. Solutions include: using Redis pub/sub (Socket.IO Redis adapter) to relay messages across instances, sticky sessions (pin user to same server), or using a WebSocket-aware load balancer.

---

SECTION 39: GO BACKEND

---

Q476. What is Go (Golang) for backend development?
Go is a statically typed, compiled language known for simplicity, performance, and excellent built-in concurrency primitives. It is widely used for microservices, CLIs, and high-performance backends.

Q477. What are goroutines?
Goroutines are lightweight threads managed by the Go runtime. You start a goroutine with the go keyword. Thousands of goroutines can run concurrently with minimal memory overhead.

Q478. What is a channel in Go?
A channel is a typed conduit for communicating between goroutines. You send values into channels and receive them from other goroutines, enabling safe concurrent communication without shared memory.

Q479. What is the Gin framework in Go?
Gin is a high-performance HTTP web framework for Go. It features a fast router, middleware support, JSON rendering, and binding, making it popular for building REST APIs in Go.

Q480. What is GORM?
GORM is a full-featured ORM library for Go supporting PostgreSQL, MySQL, SQLite, and SQL Server. It provides model-based CRUD, associations, migrations, hooks, and raw SQL capabilities.

---

SECTION 40: FINAL ADVANCED QUESTIONS

---

Q481. What is the difference between strong and weak consistency in distributed systems?
Strong consistency ensures reads always reflect the latest write globally. Weak consistency (including eventual consistency) allows reads to temporarily return stale data for higher availability and performance.

Q482. What is a service contract test?
A service contract test verifies that a service meets the expectations of its consumers. Tools like Pact enable consumer-driven contract testing where consumers define what they expect from a provider.

Q483. What is a bulkhead pattern?
The bulkhead pattern isolates elements of an application into pools so that if one fails, the others continue to function. Like watertight compartments in a ship, it limits failure blast radius.

Q484. What is log aggregation?
Log aggregation collects logs from multiple services and servers into a centralized system for searching, alerting, and analysis. Tools: ELK Stack, Splunk, Datadog, Loki.

Q485. What is the difference between synchronous replication and asynchronous replication?
Synchronous replication waits for all replicas to acknowledge writes before confirming success — guarantees no data loss but adds latency. Asynchronous replication confirms success before replicas receive the data — faster but risks losing recent writes on primary failure.

Q486. What is database federation?
Database federation splits databases by function — different databases serve different services. Each service owns its data store and there is no shared database, enabling independent scaling and deployment.

Q487. What is the command pattern?
The command pattern encapsulates a request as an object, allowing parameterization of actions, queueing, logging, and undo operations. In CQRS, commands are the write-side requests.

Q488. What is the difference between polling and streaming?
Polling involves a client repeatedly requesting data at intervals. Streaming maintains an open connection through which the server continuously pushes data as it becomes available.

Q489. What is zero-downtime deployment?
Zero-downtime deployment ensures no requests fail during a deployment. Achieved through rolling deployments, blue-green deployments, or canary releases, combined with health checks.

Q490. What is a reverse ETL?
Reverse ETL takes data from a data warehouse and sends it to operational tools (CRMs, marketing platforms, customer support tools). It operationalizes analytics data for real-time business use.

Q491. What is change data capture (CDC)?
CDC captures row-level changes (inserts, updates, deletes) from a database and streams them to other systems in real time. Tools: Debezium, AWS DMS. Enables event-driven architectures and data synchronization.

Q492. What is the difference between asynchronous and reactive programming?
Asynchronous programming handles non-blocking operations with callbacks, promises, or async/await. Reactive programming is a paradigm built on asynchronous data streams and propagation of change — libraries like RxJS, Project Reactor.

Q493. What is a long-running transaction and why is it problematic?
A long-running transaction holds locks for extended periods, blocking other transactions from accessing the same data, increasing the risk of deadlocks and reducing system throughput.

Q494. What is an API facade?
An API facade is a simplified interface over a complex subsystem. It provides a consistent external API while hiding internal complexity, legacy systems, or third-party integrations.

Q495. What is database denormalization and when should you use it?
Denormalization intentionally adds redundancy by combining tables or duplicating data to improve read performance. Use it when read performance is critical, data changes rarely, and joins are too expensive.

Q496. What is circuit breaking vs retry?
Retry re-attempts a failed operation, useful for transient failures. Circuit breaking stops attempting after repeated failures, giving the downstream service time to recover and preventing cascading failures. Both are often combined with exponential backoff.

Q497. What is exponential backoff?
Exponential backoff is a retry strategy where each subsequent retry waits exponentially longer than the previous one (1s, 2s, 4s, 8s...), optionally with random jitter to prevent thundering herd.

Q498. What is the thundering herd problem?
The thundering herd occurs when many processes simultaneously retry after a failure or cache expiry, overwhelming the downstream service. Jitter in backoff and probabilistic cache refresh prevent this.

Q499. What is a cold start in serverless?
A cold start is the latency incurred when a serverless function is invoked for the first time or after being idle — the cloud provider must initialize the runtime and load the function. Subsequent invocations use warmed containers and are much faster.

Q500. What distinguishes a senior backend engineer from a junior one?
A senior backend engineer does not just write working code — they design for failure, think in systems, anticipate scaling bottlenecks, evaluate trade-offs explicitly, consider operational concerns (observability, deployment, rollback), mentor others, write code that is maintainable by teams, and understand that every technical decision has business consequences. They ask why before how.


--- 

CONCEPT MCQ

---

Q1. What does REST stand for?
A) Remote Execution State Transfer B) Representational State Transfer C) Request State Transfer D) Resource State Transfer
Answer: B — Representational State Transfer

Q2. Which HTTP method is idempotent but not safe?
A) GET B) POST C) PUT D) PATCH
Answer: C — PUT. Safe means no side effects. PUT modifies data but repeated calls produce the same result.

Q3. What is the default port for PostgreSQL?
A) 3306 B) 5432 C) 27017 D) 6379
Answer: B — 5432

Q4. What does the 403 HTTP status code mean?
A) Not Found B) Unauthorized C) Forbidden D) Bad Request
Answer: C — Forbidden. The server understood the request but refuses to authorize it.

Q5. Which data structure does Redis NOT natively support?
A) Sorted Set B) Hash C) Binary Tree D) List
Answer: C — Binary Tree

Q6. What is the purpose of a foreign key?
A) Speed up queries B) Encrypt data C) Enforce referential integrity between tables D) Create unique records
Answer: C — Enforce referential integrity

Q7. Which of these is NOT an ACID property?
A) Atomicity B) Consistency C) Isolation D) Availability
Answer: D — Availability. That is from CAP theorem, not ACID.

Q8. What does JWT stand for?
A) Java Web Token B) JSON Web Token C) JavaScript Web Transfer D) Joint Web Token
Answer: B — JSON Web Token

Q9. Which HTTP status code means a resource was successfully created?
A) 200 B) 204 C) 201 D) 202
Answer: C — 201 Created

Q10. What is the default isolation level in PostgreSQL?
A) Read Uncommitted B) Serializable C) Read Committed D) Repeatable Read
Answer: C — Read Committed

Q11. Which of these is a message broker?
A) Nginx B) Redis C) RabbitMQ D) Prisma
Answer: C — RabbitMQ (Redis also supports pub/sub but RabbitMQ is primarily a message broker)

Q12. What does ORM stand for?
A) Object Relational Mapping B) Organized Relational Model C) Object Runtime Manager D) Output Request Model
Answer: A — Object Relational Mapping

Q13. Which Node.js module provides the event loop mechanism?
A) V8 B) libuv C) npm D) cluster
Answer: B — libuv

Q14. What does the SQL HAVING clause do?
A) Filters rows before grouping B) Filters groups after GROUP BY C) Sorts results D) Joins tables
Answer: B — Filters groups after GROUP BY

Q15. Which of these is a NoSQL database?
A) PostgreSQL B) MySQL C) MongoDB D) SQLite
Answer: C — MongoDB

Q16. What is the purpose of an index in a database?
A) Enforce constraints B) Speed up data retrieval C) Encrypt columns D) Create backups
Answer: B — Speed up data retrieval

Q17. What does CORS stand for?
A) Cross-Origin Resource Sharing B) Cross-Origin Request Security C) Content Origin Resource System D) Client Origin Response Sharing
Answer: A — Cross-Origin Resource Sharing

Q18. Which of the following prevents SQL injection?
A) Hashing B) Parameterized queries C) Base64 encoding D) CORS headers
Answer: B — Parameterized queries

Q19. What is the CAP theorem?
A) A database optimization technique B) A theorem stating a distributed system can only guarantee two of Consistency, Availability, Partition Tolerance C) A caching strategy D) A REST constraint
Answer: B

Q20. Which HTTP method should be used to partially update a resource?
A) PUT B) POST C) PATCH D) UPDATE
Answer: C — PATCH

Q21. What is the role of the event loop in Node.js?
A) It manages database connections B) It handles asynchronous operations in a non-blocking way C) It runs multiple threads D) It compiles JavaScript
Answer: B

Q22. What does bcrypt do?
A) Encrypts JWT tokens B) Hashes passwords securely with a salt C) Encodes URLs D) Generates API keys
Answer: B

Q23. Which SQL command removes all rows from a table without logging individual row deletions?
A) DELETE B) DROP C) TRUNCATE D) REMOVE
Answer: C — TRUNCATE

Q24. What is a Docker image?
A) A running container B) A read-only template used to create containers C) A virtual machine D) A Docker volume
Answer: B

Q25. What does the 429 HTTP status code mean?
A) Server Error B) Unauthorized C) Too Many Requests D) Gateway Timeout
Answer: C — Too Many Requests

Q26. What is sharding in databases?
A) Encrypting database columns B) Creating read replicas C) Horizontally partitioning data across multiple database instances D) Compressing database files
Answer: C

Q27. Which of the following is true about stateless APIs?
A) They store session data on the server B) Each request contains all information needed to process it C) They require cookies always D) They cannot scale horizontally
Answer: B

Q28. What is the purpose of process.nextTick in Node.js?
A) Schedule a task in the next event loop iteration B) Execute a callback before any I/O events in the current iteration C) Set a timer D) Create a new process
Answer: B

Q29. What is a microservice?
A) A small database B) An independently deployable service focused on a single business capability C) A Docker container D) A REST endpoint
Answer: B

Q30. Which algorithm is commonly used for signing JWTs?
A) MD5 B) SHA-1 C) HS256 or RS256 D) AES-256
Answer: C — HS256 (HMAC-SHA256) or RS256 (RSA-SHA256)

---

FILL IN THE BLANK

---

Q31. The HTTP method ________ is used to retrieve a resource without modifying it.
Answer: GET

Q32. In Express.js, ________ is the function called to pass control to the next middleware.
Answer: next()

Q33. A JWT consists of three parts separated by dots: ________, payload, and signature.
Answer: header

Q34. The SQL keyword ________ is used to combine results from multiple SELECT statements while removing duplicates.
Answer: UNION

Q35. Redis stores all data in ________ making it extremely fast.
Answer: memory (RAM)

Q36. In PostgreSQL, ________ is used to see the execution plan of a query.
Answer: EXPLAIN or EXPLAIN ANALYZE

Q37. The process of converting an object into a format that can be stored or transmitted is called ________.
Answer: serialization

Q38. In Docker, a ________ is used to persist data even after a container is deleted.
Answer: volume

Q39. The ________ pattern ensures that if a downstream service keeps failing, calls to it are short-circuited to prevent cascading failures.
Answer: circuit breaker

Q40. HTTP status code ________ means the request was successful and no content is returned in the response body.
Answer: 204 (No Content)

Q41. In MongoDB, the ________ stage in an aggregation pipeline is used to join documents from another collection.
Answer: $lookup

Q42. The ________ SQL clause is used to filter rows based on a condition before grouping.
Answer: WHERE

Q43. In Django, ________ is used to fetch related ForeignKey objects in a single SQL JOIN query.
Answer: select_related

Q44. The ________ property in package.json locks the exact version of a package to be installed.
Answer: package-lock.json (or version field with exact version)

Q45. In REST APIs, the ________ header is used by the client to specify what content format it can accept.
Answer: Accept

Q46. PostgreSQL's ________ data type allows storing JSON in a binary format with indexing support.
Answer: JSONB

Q47. A ________ is a database object that generates sequential unique integers, commonly used for primary keys.
Answer: sequence

Q48. The ________ principle states that a class should have only one reason to change.
Answer: Single Responsibility Principle

Q49. In Kubernetes, a ________ ensures a desired number of pod replicas are always running.
Answer: Deployment

Q50. Rate limiting returns HTTP status ________ when the limit is exceeded.
Answer: 429

Q51. The ________ attack involves injecting malicious scripts into web pages viewed by other users.
Answer: XSS (Cross-Site Scripting)

Q52. In SQL, the ________ constraint ensures no two rows have the same value in a column.
Answer: UNIQUE

Q53. The ________ command in Django generates migration files based on model changes.
Answer: makemigrations

Q54. In GraphQL, a ________ is used to fetch data, while a ________ is used to modify data.
Answer: query, mutation

Q55. The ________ HTTP header is used to send a JWT token in an API request.
Answer: Authorization (with Bearer prefix)

Q56. A ________ proxy sits in front of servers and distributes incoming client requests.
Answer: reverse

Q57. In Node.js, ________ is a module that allows running JavaScript in parallel on separate threads.
Answer: worker_threads

Q58. The ________ SQL function returns the number of rows matching a condition.
Answer: COUNT

Q59. In Spring Boot, ________ annotation marks a class as a REST controller that returns data directly in the response body.
Answer: @RestController

Q60. Kafka stores messages as a ________ log, allowing consumers to replay messages.
Answer: persistent (or append-only)

---

SCENARIO BASED

---

Q61. Your Node.js API is handling 10,000 requests per second and the database becomes a bottleneck. What do you do?
Answer: Add a caching layer (Redis) for frequently read data, implement connection pooling, add read replicas for read-heavy queries, optimize slow queries with indexes and EXPLAIN ANALYZE, consider database sharding if data volume is also the issue, and queue non-critical writes asynchronously.

Q62. A user reports their shopping cart order was charged twice. How do you investigate and prevent this?
Answer: Check server logs and payment gateway logs for duplicate requests. Implement idempotency keys on the payment endpoint — the client generates a unique key per transaction, and the server stores the result against that key. Subsequent identical requests return the stored result without re-charging.

Q63. Your API response time suddenly increases from 50ms to 3000ms. How do you debug this?
Answer: Check database slow query logs. Use EXPLAIN ANALYZE on recent queries. Check if a new deployment introduced an N+1 query. Look at Redis cache hit rate — if it dropped, queries are hitting the database. Check infrastructure metrics (CPU, memory, disk I/O). Look at APM traces to identify which function/service is slow.

Q64. You need to send a welcome email after user registration but it is making the API response slow. How do you fix this?
Answer: Offload email sending to a background job queue (Celery, Bull, BullMQ). The registration endpoint saves the user and enqueues a job, then returns immediately. The worker processes the email asynchronously without blocking the response.

Q65. Two microservices need to share user data. Should they share a database?
Answer: No. Sharing a database between microservices creates tight coupling — changes to the schema can break other services and you cannot deploy independently. Each service should own its data. Share data through APIs or events (message queue), or use data replication patterns like the outbox pattern.

Q66. A junior developer pushes code that runs a migration dropping a production column. How do you recover?
Answer: Restore from the most recent database backup. Check if point-in-time recovery (PITR) is enabled in your database and restore to just before the migration. Review the WAL (Write-Ahead Log) in PostgreSQL. After recovery, implement safeguards: require manual approval for destructive migrations, use CI checks that flag DROP statements, and never run migrations automatically in production without review.

Q67. Your Redis cache is storing user sessions, and a user logs out but still has an active session from another browser tab. How do you handle this?
Answer: On logout, explicitly delete the session key from Redis. For token-based auth, maintain a token blacklist in Redis with a TTL matching the token expiry. Alternatively, use a versioned session approach where incrementing the user's session version invalidates all existing tokens.

Q68. You have a microservice architecture and one service becomes unavailable. How do you prevent it from bringing down other services?
Answer: Implement the circuit breaker pattern — after N failures, stop attempting calls to the failing service and return a fallback response. Use timeouts on all external calls. Implement the bulkhead pattern to isolate resources. Use message queues for non-critical operations so the calling service can continue without the downstream service being available.

Q69. Your application is running on a single server and needs to scale to handle 10x the current traffic. Walk through your approach.
Answer: First, identify the bottleneck (CPU, memory, database, I/O). Add horizontal scaling — deploy multiple application instances behind a load balancer. Externalize sessions to Redis so any instance can handle any request. Add a read replica for the database and route read traffic there. Add caching (Redis) for frequent queries. Use a CDN for static assets. Consider moving long-running tasks to async workers.

Q70. A client reports that an API endpoint works in Postman but not from their web application. What is the likely issue?
Answer: Almost certainly a CORS issue. The browser blocks cross-origin requests unless the server explicitly allows them via CORS headers. The fix is to configure the server to include Access-Control-Allow-Origin, Access-Control-Allow-Methods, and Access-Control-Allow-Headers in responses. Postman does not enforce CORS — only browsers do.

Q71. You need to design a backend that can handle a flash sale with 100,000 users simultaneously trying to buy 500 items. How do you ensure no overselling?
Answer: Use a Redis counter for available stock. When a purchase request comes in, use Redis DECR — if the result is below 0, reject the request atomically. This is atomic and much faster than checking the database. Queue validated purchases and process them asynchronously. Use database-level constraints as a final safety net.

Q72. Your database has a table with 500 million rows and queries are slow. What do you do?
Answer: First run EXPLAIN ANALYZE to see what is slow. Add appropriate indexes if missing. Consider partitioning the table (range partitioning by date for time-series data). Move older data to an archive table. Introduce a read replica for read queries. Consider caching hot data in Redis. If the table structure is the problem, consider vertical or horizontal partitioning.

Q73. A teammate's pull request introduces an N+1 query. How do you detect and fix it?
Answer: During code review, look for database calls inside loops. In testing, enable query logging and count queries per request. Fix by using eager loading (JOIN FETCH, select_related, Prisma include) to load all related data in one query instead of N individual queries.

Q74. You need to implement a feature where users can see real-time notifications. What backend approach do you use?
Answer: Use WebSockets for full-duplex real-time communication. Socket.IO simplifies this in Node.js and handles reconnection. For a multi-server setup, use Redis pub/sub (Socket.IO Redis adapter) so notifications published on one server reach clients connected to other servers. Server-Sent Events is an alternative for one-directional server-to-client pushes.

Q75. Your team is migrating from a monolith to microservices. How do you approach it without disrupting production?
Answer: Use the strangler fig pattern. Identify bounded contexts and extract them one at a time into microservices, starting with the least coupled parts. Run the new service alongside the monolith and route specific traffic to it. Use an API gateway to route requests. Gradually migrate functionality until the monolith can be retired. Never do a big bang rewrite.

Q76. A customer's data is accidentally deleted by a bug in your code. How do you prevent this in the future?
Answer: Implement soft deletes (mark as deleted rather than physically removing rows). Add a database backup schedule with tested restore procedures. Require additional confirmation for bulk delete operations in the codebase. Add application-level audit logs. Set up database-level triggers or row-level security. Consider point-in-time recovery (PITR) on your database.

Q77. You need to implement a rate limiter for your API. How do you do it?
Answer: Use a Redis-backed sliding window or token bucket algorithm. On each request, increment a counter in Redis keyed by user ID or IP with a TTL of the rate window. If the counter exceeds the limit, return 429 Too Many Requests with a Retry-After header. For distributed systems, Redis ensures all instances share the same counter.

Q78. Your authentication service is a single point of failure. How do you make it resilient?
Answer: Deploy multiple instances of the auth service behind a load balancer. Use stateless JWTs so any instance can validate tokens without a shared session store. Cache public keys (for JWT RS256) so token validation does not require calling the auth service for every request. Set up health checks and auto-restart for failed instances.

Q79. A third-party payment API you depend on is sometimes slow (3–5 seconds). How do you handle this?
Answer: Set an explicit timeout on the HTTP call to the payment API. If it times out, implement a retry with exponential backoff. Use idempotency keys with the payment provider so retries do not cause duplicate charges. Consider making the payment processing asynchronous — create a pending payment record, enqueue the actual API call, and update the order status when the job completes.

Q80. You are asked to add full-text search to your application. What are your options?
Answer: For basic search, PostgreSQL's tsvector/tsquery with GIN indexes works well and avoids adding a new service. For more powerful search (relevance ranking, facets, typo tolerance, fuzzy matching), use Elasticsearch or Algolia. The choice depends on search complexity, data volume, and whether the operational overhead of Elasticsearch is justified.

---

ARCHITECTURE ROUND

---

Q81. Design the backend for a URL shortener like bit.ly.
Answer: API endpoints: POST /shorten (accepts long URL, returns short code), GET /:code (redirects to long URL). Store mappings in a database (PostgreSQL or DynamoDB). Generate a short code using base62 encoding of an auto-incrementing ID or a random 6-character alphanumeric string with a uniqueness check. Cache frequently accessed codes in Redis for fast redirects. Use a CDN to globally distribute the redirect service. Add analytics tracking (clicks, geolocation) asynchronously via a message queue.

Q82. Design the backend for a ride-hailing app like Uber.
Answer: Core services: User Service, Driver Service, Booking Service, Matching Service, Pricing Service, Notification Service, Payment Service. Use geospatial indexing (PostGIS or Redis GEOSEARCH) to find nearby drivers. Real-time driver location updates via WebSockets stored in Redis. Matching algorithm considers proximity, driver rating, and availability. Use Kafka for event streaming between services. Surge pricing calculated by Pricing Service based on demand-supply ratio. All inter-service communication via async events for resilience.

Q83. Design a notification system that sends email, SMS, and push notifications.
Answer: Create a Notification Service that receives events from other services via a message queue (Kafka or SQS). The service reads the notification type, user preferences, and channels. Separate workers handle each channel — email (SendGrid/SES), SMS (Twilio), push (FCM/APNs). Implement retry logic with dead letter queues for failed deliveries. Store notification history in a database. Use templates for message content. Allow users to manage preferences per notification type and channel.

Q84. Design the database schema for an e-commerce platform.
Answer: Tables: users (id, email, password_hash, name, created_at), products (id, name, description, price, stock_count, category_id), categories (id, name, parent_id for hierarchy), orders (id, user_id FK, status, total_amount, created_at), order_items (id, order_id FK, product_id FK, quantity, unit_price), addresses (id, user_id FK, street, city, country), payments (id, order_id FK, provider, status, amount, transaction_id). Indexes on user_id, product_id foreign keys, and status columns. Use JSONB for flexible product attributes.

Q85. How would you design an API rate limiter for a multi-tenant SaaS API?
Answer: Use a Redis sorted set or hash per tenant/API key. Implement sliding window — store timestamps of requests and count those within the window. On each request, atomically check count, reject if exceeded (return 429), otherwise add timestamp. Support different limits per plan tier stored in a plans table. Return rate limit headers (X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset). Use a token bucket algorithm for smoother traffic shaping.

Q86. Design the backend architecture for a social media feed (like Twitter's timeline).
Answer: Two approaches: Fan-out on write (push) — when a user posts, write to all followers' feed tables immediately. Fast reads but expensive writes for users with millions of followers. Fan-out on read (pull) — merge posts from followed accounts at read time. Simpler writes but slower reads. Hybrid — use push for users with fewer followers, pull for celebrity accounts. Cache feeds in Redis. Use Kafka to distribute fan-out work across workers. Store the underlying posts in a posts table, feeds in Redis sorted sets scored by timestamp.

Q87. Design a backend for a real-time collaborative document editor (like Google Docs).
Answer: Use Operational Transformation (OT) or CRDT (Conflict-free Replicated Data Types) for conflict resolution. WebSocket connections maintained per document session. Each edit is an operation (insert char at position, delete range). Operations are sent to the server, transformed against concurrent operations, then broadcast to all connected clients. Store document state in a database and a log of operations. Use Redis pub/sub to coordinate across multiple server instances. Implement presence indicators (who is online/editing).

Q88. Design a job scheduling system like a cron service for a distributed backend.
Answer: Store job definitions in a database (job name, schedule in cron format, last run, next run, status). A scheduler process runs periodically, queries jobs due to run, and enqueues them into a message queue (Kafka or SQS). Workers consume the queue and execute jobs. To prevent duplicate execution in a distributed environment, use a distributed lock (Redis SETNX) before enqueuing each job. Track execution history, failures, and retries. Expose an API to create, pause, and delete jobs.

Q89. How would you design a backend system for handling financial transactions safely?
Answer: Use database transactions with ACID guarantees for all money movements. Implement double-entry bookkeeping — every transaction has a debit and a credit entry. Use optimistic or pessimistic locking to prevent race conditions on account balances. Implement idempotency keys for all payment API calls. Store an immutable audit log of all transactions. Use event sourcing — never update balances directly, derive them from the transaction log. Implement reconciliation jobs to catch discrepancies.

Q90. Design the backend for a multi-player online game leaderboard.
Answer: Use Redis sorted sets keyed by game/season. ZADD adds or updates a player's score. ZRANK and ZREVRANK retrieve a player's rank. ZRANGE retrieves top N players. This supports millions of players with O(log N) operations. Persist leaderboard snapshots to PostgreSQL periodically. For large global leaderboards, partition by region. Use WebSockets to push real-time rank updates to connected players. Cache player profile data alongside scores.

Q91. How would you architect a backend to handle 1 million concurrent WebSocket connections?
Answer: Horizontal scaling with stateless WebSocket servers behind a load balancer with sticky sessions (or use a session-aware load balancer). Use Redis pub/sub (or Kafka) so messages published on one server reach clients on other servers. Each server handles tens of thousands of connections. Use a language/runtime well-suited for concurrency (Node.js, Go, Elixir). Distribute users across servers geographically using a CDN or regional deployment. Monitor memory per connection and tune OS-level socket limits.

Q92. Design an authentication and authorization system for a multi-tenant SaaS application.
Answer: Each tenant is identified by a tenant_id in the database. JWTs contain tenant_id and user_id in claims. Every database query is automatically scoped to tenant_id using row-level security (PostgreSQL RLS) or a middleware layer that adds WHERE tenant_id = ? to all queries. Role-based permissions are defined per tenant — a user can have admin role in one tenant and viewer in another. OAuth for third-party login. Refresh tokens stored in a secure HTTP-only cookie.

Q93. How do you design a backend for an API that other companies integrate with (a public API platform)?
Answer: Versioning from day one (URL or header based). API key authentication with per-key rate limiting. Detailed OpenAPI documentation. Webhook support so clients can subscribe to events. SDK generation from OpenAPI spec. A developer portal for key management and usage analytics. Sandbox environment for testing. Careful deprecation policy with long notice periods. SLAs and status pages. Structured error responses with error codes, messages, and links to documentation.

Q94. Design the backend caching strategy for an e-commerce product catalog.
Answer: Product list pages: cache query results in Redis with a TTL of a few minutes, keyed by category, filters, and page. Individual product pages: cache in Redis with a longer TTL, invalidated on price or stock change. Use a CDN for static product images. Implement cache-aside: on cache miss, query database and populate cache. For stock counts that change frequently, read from database directly or use a short TTL. Warm the cache for top products on deployment.

Q95. How would you design the database for a multi-language content management system?
Answer: Use a translations table approach: a content table (id, slug, type, created_at) holds the canonical record. A content_translations table (id, content_id FK, locale, title, body, meta_description) holds translated versions. Query by content_id and locale, falling back to the default locale if a translation does not exist. Index on (content_id, locale). Store the list of supported locales in a locales table. This avoids adding columns per language and scales cleanly to any number of languages.

---

CODING ROUND

---

Q96. Write a middleware in Express.js that logs the method, URL, and response time of every request.

Answer:
const logger = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
  });
  next();
};
app.use(logger);

Q97. Write a function to hash a password using bcrypt in Node.js.

Answer:
const bcrypt = require('bcrypt');

async function hashPassword(plainText) {
  const saltRounds = 12;
  return await bcrypt.hash(plainText, saltRounds);
}

async function verifyPassword(plainText, hash) {
  return await bcrypt.compare(plainText, hash);
}

Q98. Write a Redis-based rate limiter function in Node.js.

Answer:
const redis = require('redis');
const client = redis.createClient();

async function isRateLimited(userId, limit = 100, windowSeconds = 60) {
  const key = `rate:${userId}`;
  const count = await client.incr(key);
  if (count === 1) {
    await client.expire(key, windowSeconds);
  }
  return count > limit;
}

Q99. Write a JWT generation and verification utility in Node.js.

Answer:
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

function generateToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '15m' });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
}

Q100. Write an async Express route handler that fetches a user by ID from PostgreSQL with error handling.

Answer:
const pool = require('./db');

app.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT id, name, email FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

Q101. Write a debounce function from scratch in JavaScript.

Answer:
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

Q102. Write a function to flatten a deeply nested object in JavaScript.

Answer:
function flatten(obj, prefix = '', result = {}) {
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      flatten(obj[key], fullKey, result);
    } else {
      result[fullKey] = obj[key];
    }
  }
  return result;
}

Q103. Write a Node.js function that retries a failed async operation with exponential backoff.

Answer:
async function withRetry(fn, maxRetries = 3) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === maxRetries) throw err;
      const delay = Math.pow(2, attempt) * 100;
      await new Promise(res => setTimeout(res, delay));
    }
  }
}

Q104. Write a SQL query to find the top 5 customers by total order amount.

Answer:
SELECT u.id, u.name, SUM(o.total_amount) AS total_spent
FROM users u
JOIN orders o ON o.user_id = u.id
WHERE o.status = 'completed'
GROUP BY u.id, u.name
ORDER BY total_spent DESC
LIMIT 5;

Q105. Write a SQL query to find all users who have never placed an order.

Answer:
SELECT u.id, u.name, u.email
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE o.id IS NULL;

Q106. Write a middleware in Express that validates a JWT and attaches the decoded user to req.user.

Answer:
const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

Q107. Write a Python function to paginate database query results using offset and limit.

Answer:
def get_users(page: int, page_size: int, db):
    offset = (page - 1) * page_size
    return db.query(User).offset(offset).limit(page_size).all()

Q108. Write a Node.js script that reads a large file line by line using streams without loading it all into memory.

Answer:
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('large_file.txt'),
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  console.log(line);
});

rl.on('close', () => {
  console.log('Done reading file');
});

Q109. Write a SQL query using a window function to rank users by their order count within each country.

Answer:
SELECT
  u.name,
  u.country,
  COUNT(o.id) AS order_count,
  RANK() OVER (PARTITION BY u.country ORDER BY COUNT(o.id) DESC) AS rank
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.id, u.name, u.country;

Q110. Write a function in Node.js to implement a simple in-memory LRU cache.

Answer:
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  get(key) {
    if (!this.cache.has(key)) return -1;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }
  put(key, value) {
    if (this.cache.has(key)) this.cache.delete(key);
    else if (this.cache.size >= this.capacity) {
      this.cache.delete(this.cache.keys().next().value);
    }
    this.cache.set(key, value);
  }
}

Q111. Write a FastAPI endpoint that accepts a list of user IDs and returns their data from a database.

Answer:
from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()

class UserBatchRequest(BaseModel):
    ids: List[int]

@router.post("/users/batch")
async def get_users_batch(request: UserBatchRequest, db: Session = Depends(get_db)):
    users = db.query(User).filter(User.id.in_(request.ids)).all()
    return users

Q112. Write a Node.js function to publish a message to a Redis channel.

Answer:
const redis = require('redis');
const publisher = redis.createClient();

async function publishEvent(channel, event) {
  await publisher.connect();
  await publisher.publish(channel, JSON.stringify(event));
}

publishEvent('notifications', { userId: 1, message: 'Order shipped' });

Q113. Write a Mongoose schema for a blog post with author, tags, and timestamps.

Answer:
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [{ type: String }],
  published: { type: Boolean, default: false }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

Q114. Write a Prisma query to find all published posts with their authors, ordered by creation date descending.

Answer:
const posts = await prisma.post.findMany({
  where: { published: true },
  include: { author: { select: { id: true, name: true } } },
  orderBy: { createdAt: 'desc' }
});

Q115. Write a SQL query to find duplicate email addresses in a users table.

Answer:
SELECT email, COUNT(*) AS count
FROM users
GROUP BY email
HAVING COUNT(*) > 1;

---

MOCK INTERVIEW

---

Q116. Interviewer: Tell me about the most complex backend system you have built. What made it complex and how did you handle it?
How to answer: Talk about a real project (or Applyst in your case). Mention technical complexity — async jobs, multiple integrations, data modeling decisions. Describe specific challenges and how you solved them. Show architectural thinking, not just implementation details.

Q117. Interviewer: Explain the difference between a process and a thread. When would you use one over the other in a Node.js context?
Answer: A process has its own memory space and does not share memory with other processes. A thread is a lightweight unit within a process that shares memory. In Node.js, the main thread runs the event loop. Use worker_threads for CPU-intensive tasks (image processing, heavy computation) to avoid blocking the event loop. Use the cluster module to spawn multiple Node.js processes that share the same port for handling more concurrent connections.

Q118. Interviewer: You have a users table with 50 million rows. A query SELECT * FROM users WHERE email = 'x@example.com' is taking 8 seconds. How do you fix it?
Answer: Run EXPLAIN ANALYZE to confirm it is doing a sequential scan. Add an index: CREATE INDEX idx_users_email ON users(email). This reduces the query to milliseconds. Also change SELECT * to select only needed columns. Ensure the index fits in memory. If email is used for login, consider making it UNIQUE which creates an index automatically.

Q119. Interviewer: How does JWT authentication work? What are its weaknesses?
Answer: The server signs a payload with a secret, producing a JWT. The client stores it and sends it in every request header. The server validates the signature without any database lookup — that is the stateless advantage. Weaknesses: tokens cannot be invalidated before expiry without a blacklist (losing statelessness), the payload is only Base64-encoded not encrypted so sensitive data should not be stored in it, if the secret is compromised all tokens are compromised, and storing tokens in localStorage makes them vulnerable to XSS.

Q120. Interviewer: Walk me through what happens when a user hits POST /login with username and password on your backend.
Answer: The request hits the server. Express parses the JSON body via express.json(). The route handler extracts email and password. It queries the database for a user with that email. If not found, return 401. If found, compare the submitted password against the stored bcrypt hash using bcrypt.compare(). If they match, generate a JWT access token (short-lived, 15 min) and a refresh token (long-lived, 7 days). Store the refresh token hash in the database or Redis. Return the access token in the response body and the refresh token in a secure HTTP-only cookie.

Q121. Interviewer: What is the difference between horizontal and vertical scaling? Which would you choose for a Node.js application and why?
Answer: Vertical scaling adds resources to one server (more CPU, RAM). It has a ceiling — you cannot keep scaling one machine forever, and it is a single point of failure. Horizontal scaling adds more server instances. Node.js is naturally suited for horizontal scaling because it is stateless — as long as sessions are stored externally (Redis) and files are on shared storage (S3), any instance can handle any request. Use a load balancer to distribute traffic. Horizontal scaling is more cost-effective and resilient.

Q122. Interviewer: Your company wants to migrate from PostgreSQL to a NoSQL database. How would you evaluate whether this is the right decision?
Answer: I would question the motivation. If it is read performance, adding indexes, caching, and read replicas to PostgreSQL is typically much cheaper. If it is schema flexibility, PostgreSQL's JSONB columns handle semi-structured data. If it is write throughput at massive scale, then Cassandra or DynamoDB might genuinely help. NoSQL introduces eventual consistency and complex application-level joins. The decision should be driven by actual bottlenecks, not hype. I would want to see benchmark data before recommending migration, which is risky and expensive.

Q123. Interviewer: How do you ensure your API is secure? Walk through your security checklist.
Answer: Use HTTPS always. Validate and sanitize all user inputs. Use parameterized queries to prevent SQL injection. Hash passwords with bcrypt (cost factor 12+). Implement rate limiting on all endpoints, especially login and registration. Set security headers with Helmet (CSP, X-Frame-Options, HSTS). Implement CSRF protection for cookie-based auth. Store secrets in environment variables, never in code. Use short-lived JWTs. Audit dependencies for vulnerabilities (npm audit). Implement least privilege on database users. Log all authentication events.

Q124. Interviewer: What is the difference between a 401 and 403 response and when do you use each?
Answer: 401 Unauthorized means the client has not authenticated — there are no credentials or they are invalid. It is an invitation to authenticate. The name is misleading (it actually means unauthenticated). 403 Forbidden means the client is authenticated but does not have permission to access the resource. Re-authenticating will not help. Example: a logged-in user trying to access another user's data gets 403. A request with no token at all gets 401.

Q125. Interviewer: You are tasked with designing the data model for a multi-tenant application where each company's data must be completely isolated. What are the options and which do you recommend?
Answer: Three approaches. Separate databases per tenant — strongest isolation, easy to backup and migrate per tenant, but expensive and operationally complex. Separate schemas per tenant within one database — good isolation, easier to manage than separate databases, supported in PostgreSQL. Shared tables with tenant_id column — most cost-effective, easiest to manage, but requires rigorous application-level isolation enforced on every query. For most startups I recommend the shared table approach with PostgreSQL Row Level Security (RLS) to enforce tenant isolation at the database level, with tenant_id in all tables and an application-layer middleware that always sets the tenant context.

Q126. Interviewer: Describe eventual consistency with a real example. Is it always acceptable?
Answer: In a distributed system, when you update your Twitter profile picture, it might appear updated immediately on one data center but take a few seconds to propagate to users reading from a replica in another region — they temporarily see your old photo. This is eventual consistency. It is acceptable for non-critical data (profile photos, feed rankings, like counts). It is NOT acceptable for financial transactions (bank balance must be consistent), inventory systems during purchase (cannot oversell), or authentication (a revoked token must be invalid immediately). The choice depends on business requirements.

Q127. Interviewer: What is your approach to writing tests for a REST API?
Answer: I write three levels. Unit tests for pure business logic functions — fast, no database, no network. Integration tests for route handlers — spin up the server, hit actual endpoints with a test database, verify request/response contracts. I use supertest in Node.js for this. I also test error cases (invalid input, unauthorized access, not found). I aim for high coverage on critical paths — auth, payment, data writes — and lighter coverage on pure read endpoints. I use factories or fixtures for test data. I run tests in CI before merging any PR.

Q128. Interviewer: How do you handle database migrations safely in production?
Answer: Migrations should be backwards compatible — add new columns as nullable before populating them, never drop columns or rename them in the same migration as the application code change. Deploy in two phases: first deploy the migration that adds the new column (application still works with old schema), then deploy the application code that uses the new column. Never run destructive migrations without a backup and tested rollback plan. In high-traffic environments, use concurrent index creation (CREATE INDEX CONCURRENTLY in PostgreSQL) to avoid table locks.

Q129. Interviewer: Explain microservices vs monolith. When would you start with a monolith?
Answer: Almost always start with a monolith, especially for a new product or startup. A well-structured monolith is faster to build, easier to debug, cheaper to operate, simpler to deploy, and does not require solving distributed systems problems (distributed transactions, network failures, service discovery). Microservices introduce enormous complexity. The right time to break out a microservice is when a specific part of the system has clearly different scaling requirements, a different deployment cadence, or a large enough team that the codebase becomes unmanageable. Start monolith, evolve to microservices when you feel the real pain.

Q130. Interviewer: You have five minutes left in this interview. Is there anything you want to add or ask?
How to answer: Ask thoughtful questions. Examples: What does the backend stack look like and what problems is the team currently solving? What does the on-call and incident response process look like? How does the team handle technical debt? What would success look like in the first 90 days in this role? This signals genuine interest, curiosity, and professional maturity — qualities that matter as much as technical skill.

---

FAANG TAGGED

---

Q131. Design a distributed key-value store (like DynamoDB).
Answer: Partition data using consistent hashing across nodes. Each key maps to a node. Replication factor of 3 — data is stored on three nodes for fault tolerance. Use a coordinator node to route requests. Reads can be served by any replica (eventual consistency) or require quorum (strong consistency). Writes go to all replicas; use vector clocks or last-write-wins for conflict resolution. Gossip protocol for node membership and failure detection. This is the Dynamo architecture (Amazon's 2007 paper).

Q132. How does Google's Bigtable work conceptually?
Answer: Bigtable is a distributed storage system for structured data. Data is indexed by row key, column family, column qualifier, and timestamp. Rows are sorted lexicographically by row key — choose row keys carefully for locality. Data is divided into tablets (row ranges) and distributed across tablet servers. An SSTable file format stores data sorted on disk. Compaction merges SSTables periodically. It is the basis for HBase (open-source equivalent).

Q133. Explain how you would implement autocomplete for a search box at scale.
Answer: Store a trie or inverted index of searchable terms. For type-ahead, Redis sorted sets work — use all prefixes of a term as keys and store the term with a score (popularity). On each keystroke, query the Redis key for the current prefix and return the top N results by score. For larger scale, use Elasticsearch with prefix queries and a completion suggester. Cache hot prefix results. Update the index asynchronously when new content is created.

Q134. How does consistent hashing work and why is it used?
Answer: Consistent hashing places both nodes and keys on a virtual ring. Each key is assigned to the nearest node clockwise on the ring. When a node is added or removed, only the keys on the arc between the removed node and its predecessor need to be reassigned — minimizing redistribution. Virtual nodes (vnodes) allow each physical node to appear multiple times on the ring, providing better load distribution. Used in DynamoDB, Cassandra, and CDN cache routing.

Q135. How would you design YouTube's video upload and processing pipeline?
Answer: Client uploads video to S3/GCS via a pre-signed URL (bypassing application server). Upload completion triggers an event (S3 event or SNS notification) to a message queue. Worker services pick up the job and transcode the video into multiple resolutions (360p, 720p, 1080p, 4K) using FFmpeg in parallel. Store each resolution as a separate file. Update the video status in the database from processing to ready. CDN distributes the video files globally. Thumbnails are extracted asynchronously. Metadata (title, description) is stored separately from video files.

Q136. How does database indexing work internally (B-tree)?
Answer: Most database indexes use a B-tree. The B-tree is a self-balancing tree structure where all leaf nodes are at the same depth. Internal nodes store keys and pointers to children. Leaf nodes store keys and pointers to the actual row data (or in a clustered index, the data itself). Insertions and deletions maintain balance by splitting or merging nodes. Searches are O(log N). B+ trees (used by PostgreSQL, MySQL InnoDB) store data only in leaf nodes and link leaf nodes together, making range scans efficient.

Q137. How would you design a distributed rate limiter for an API gateway handling billions of requests per day?
Answer: Use Redis Cluster for distributed state. Implement the token bucket or sliding window algorithm. Each API key has a key in Redis. Use Lua scripts for atomic check-and-increment operations to avoid race conditions. Place rate limiter close to the edge (in the API gateway itself) to reject requests early. For extremely high scale, use a local in-memory token bucket as the first check with periodic sync to Redis, accepting slight over-limit tolerance for performance. Return standard Retry-After headers on 429 responses.

Q138. How does Kafka guarantee message ordering and exactly-once delivery?
Answer: Kafka guarantees ordering within a partition — messages to the same partition key always go to the same partition in order. For exactly-once semantics (EOS), Kafka uses idempotent producers (each message has a sequence number; duplicates from retries are detected and dropped) and transactional producers that coordinate atomic writes across partitions and offsets. Consumers must use the transactional API to read and commit atomically. Achieving true exactly-once requires both producer idempotence and consumer transaction coordination.

Q139. Explain the two-phase locking protocol in databases.
Answer: 2PL ensures serializability. A transaction acquires all locks it needs before releasing any. Growing phase: transaction acquires locks. Shrinking phase: transaction releases locks and cannot acquire new ones. This prevents conflicts but can cause deadlocks. Strict 2PL holds all locks until transaction commit, providing stronger guarantees. Deadlock detection runs periodically and aborts one of the transactions. Most databases implement strict 2PL variants.

Q140. How would you design the backend for Google Maps real-time traffic?
Answer: Collect GPS data from millions of devices every few seconds — use UDP for efficiency. Aggregate data into road segments using map matching algorithms. Calculate speed per segment. Store current traffic state in Redis for fast reads. Use Kafka to stream GPS events to processing workers. Historical traffic is stored in a time-series database for pattern learning. Periodically compute and cache route suggestions. ETA prediction combines real-time traffic with historical patterns using ML models. Serve tile data from CDN with incremental updates via WebSockets for live updates.

---
