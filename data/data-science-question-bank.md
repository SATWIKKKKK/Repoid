# DATA SCIENCE INTERVIEW QUESTIONS — 640 Q&A
## End-to-End: Basics to Advanced

---

# PART 1: TOPIC-WISE QUESTIONS (Q1–Q500)

---

## TOPIC 1: STATISTICS AND PROBABILITY FUNDAMENTALS

### Concept MCQ

Q1. What is a random variable?
A) A variable that changes randomly in code B) A variable whose value is determined by the outcome of a random phenomenon C) A variable with no fixed type D) An undefined variable
Answer: B — Random variables can be discrete (countable outcomes) or continuous (any value in a range).

Q2. What is the difference between a parameter and a statistic?
A) No difference B) A parameter describes a population; a statistic describes a sample C) A statistic is more accurate D) Parameters are always known
Answer: B — Parameters are typically unknown and estimated using statistics from samples.

Q3. What is the law of large numbers?
A) Large datasets are always accurate B) As sample size increases, the sample mean converges to the population mean C) Large numbers are harder to compute D) More data always improves models
Answer: B — Foundational justification for using sample statistics to estimate population parameters.

Q4. What is a probability distribution?
A) How data is stored B) A function describing the likelihood of each possible value of a random variable C) A histogram D) A data table
Answer: B — Distributions can be discrete (Binomial, Poisson) or continuous (Normal, Exponential).

Q5. What is conditional probability?
A) Probability with conditions in code B) The probability of event A given that event B has already occurred — P(A|B) = P(A∩B)/P(B) C) Probability above a threshold D) Joint probability
Answer: B — Conditional probability is foundational to Bayes' theorem and probabilistic modeling.

Q6. What is the binomial distribution?
A) A two-variable distribution B) A discrete distribution modeling the number of successes in n independent trials each with probability p of success C) A continuous distribution D) A normal variant
Answer: B — Used for modeling coin flips, defect rates, click-through rates.

Q7. What is the Poisson distribution?
A) A fish-related distribution B) A discrete distribution modeling the number of events occurring in a fixed interval of time or space, given an average rate lambda C) A continuous distribution D) A binomial variant
Answer: B — Used for modeling website visits per hour, calls per minute, defects per unit.

Q8. What is the exponential distribution?
A) A growth model B) A continuous distribution modeling the time between events in a Poisson process C) A discrete distribution D) A normal variant
Answer: B — Used for modeling time between customer arrivals, equipment failure times.

Q9. What is a joint probability distribution?
A) A combined histogram B) A distribution describing the probability of two or more random variables taking specific values simultaneously C) Conditional probability D) A marginal distribution
Answer: B — From joint distributions you can derive marginal and conditional distributions.

Q10. What is the law of total probability?
A) All probabilities sum to more than 1 B) The probability of an event equals the sum of its conditional probabilities weighted by the probabilities of each condition C) A rounding rule D) A sampling rule
Answer: B — P(A) = Σ P(A|Bi) × P(Bi) over all partitions Bi of the sample space.

Q11. What is a percentile?
A) A percentage of data B) A value below which a given percentage of observations fall — the 90th percentile means 90% of values are below it C) The 50th value D) A ranked value
Answer: B — Percentiles are used in performance benchmarking, scoring, and outlier detection.

Q12. What is kurtosis?
A) A measure of center B) A measure of the tailedness of a distribution — high kurtosis means heavy tails and more extreme outliers C) A measure of spread D) A measure of skewness
Answer: B — Excess kurtosis > 0 (leptokurtic), < 0 (platykurtic), = 0 (mesokurtic/normal).

Q13. What is covariance?
A) A correlation coefficient B) A measure of how two variables change together — positive covariance means they increase together, negative means they move inversely C) A variance measure D) A distance metric
Answer: B — Covariance is not scale-independent; correlation standardizes it.

Q14. What is the coefficient of variation?
A) A regression coefficient B) The ratio of standard deviation to mean, expressing variability as a percentage of the mean — useful for comparing spread across different scales C) A variance measure D) A correlation measure
Answer: B — Useful for comparing variability of variables with different units or scales.

Q15. What is a moment in statistics?
A) A point in time B) A quantitative measure related to the shape of a distribution — the first moment is the mean, second is variance, third is skewness, fourth is kurtosis C) A summary statistic D) A sample value
Answer: B — Moments characterize the shape of distributions mathematically.

### Fill in the Blank

Q16. The ________ theorem states that the sampling distribution of the mean approaches normality as sample size increases, regardless of the population distribution.
Answer: Central Limit

Q17. A ________ error occurs when you reject a true null hypothesis (false positive).
Answer: Type I

Q18. A ________ error occurs when you fail to reject a false null hypothesis (false negative).
Answer: Type II

Q19. The ________ of a test is the probability of correctly rejecting a false null hypothesis (1 - Type II error rate).
Answer: power

Q20. Two events are ________ if the occurrence of one does not affect the probability of the other.
Answer: independent

Q21. The ________ is a standardized normal distribution with mean 0 and standard deviation 1.
Answer: standard normal (Z) distribution

Q22. ________ is the probability that a confidence interval contains the true population parameter, interpreted over many repeated samples.
Answer: Confidence level

Q23. The ________ test is used to determine if two categorical variables are independent using observed vs expected frequencies.
Answer: Chi-squared

Q24. ________ sampling ensures every member of the population has an equal probability of being selected.
Answer: Simple random

Q25. The ________ is the range containing the middle 50% of data, from the 25th to 75th percentile.
Answer: Interquartile Range (IQR)

### Scenario

Q26. You are analyzing customer purchase data and find that the average order value is $250 but the median is $85. What does this tell you and how does it affect your analysis?
Answer: The large gap between mean and median indicates strong right skew — a small number of very high-value orders are pulling the mean up dramatically. For most business questions (typical customer behavior, pricing strategy, segmentation), the median is far more representative. Use median and IQR for central tendency and spread. Consider log-transforming the variable before modeling. Segment analysis by purchase tier rather than treating it as a uniform distribution. When reporting to stakeholders, present both metrics and explain the distribution shape.

Q27. A marketing team asks whether their new campaign increased conversion rates. Last month: 1000 visitors, 50 conversions (5%). This month: 1000 visitors, 60 conversions (6%). Is this significant?
Answer: Conduct a two-proportion z-test. H0: p1 = p2, H1: p1 ≠ p2. Pooled proportion = (50+60)/(1000+1000) = 0.055. Standard error = sqrt(0.055 × 0.945 × (1/1000 + 1/1000)) ≈ 0.010. Z = (0.06 - 0.05)/0.010 = 1.0. p-value ≈ 0.317. Not statistically significant at the 5% level. However, also assess practical significance — a 1% absolute lift represents 10 additional conversions per 1000 visitors. You need more data or a longer test. Also evaluate effect size and business impact before concluding anything meaningful.

Q28. Two analysts compute different correlations for the same dataset. One uses Pearson, one uses Spearman. The results differ substantially. What might explain this?
Answer: Pearson measures linear correlation between raw values and is sensitive to outliers and assumes normality. Spearman measures monotonic correlation between ranks and is robust to outliers and non-linear relationships. Substantial differences suggest: the relationship is monotonic but not linear, there are significant outliers distorting Pearson, or the data is ordinal rather than truly continuous. The right choice depends on the data characteristics. Plot the scatter first. If the relationship is clearly non-linear or outliers are present, Spearman is more appropriate. For normally distributed data with a linear relationship, Pearson is preferred.

---

## TOPIC 2: DATA COLLECTION AND EXPLORATION

### Concept MCQ

Q29. What is exploratory data analysis (EDA)?
A) Running machine learning models B) The process of summarizing, visualizing, and understanding a dataset's structure, distributions, relationships, and anomalies before formal modeling C) Data collection D) Data cleaning
Answer: B — EDA should always precede modeling to understand what you are working with.

Q30. What is a data dictionary?
A) A word processing tool B) A document describing each variable in a dataset — its name, type, description, units, allowed values, and relationships C) A database D) A codebook
Answer: B — Data dictionaries are essential for reproducibility and team collaboration.

Q31. What is sampling bias?
A) Biased model predictions B) A systematic error occurring when the sample is not representative of the population due to a flawed selection process C) Statistical bias D) Selection error
Answer: B — Sampling bias leads to invalid generalizations from sample to population.

Q32. What is survivorship bias?
A) Analyzing survivors B) The logical error of focusing only on subjects that passed a selection process, overlooking those that did not — leading to false conclusions C) A data type D) A modeling error
Answer: B — Classic example: studying only successful companies to learn what makes companies successful, ignoring the failed ones.

Q33. What is a confounding variable?
A) A missing variable B) A variable correlated with both the independent and dependent variable that distorts the apparent relationship between them C) An outlier D) A categorical variable
Answer: B — Confounding is a major threat to causal inference in observational studies.

Q34. What is the difference between observational and experimental data?
A) No difference B) In experimental data, the researcher assigns treatments (controls confounding); in observational data, subjects self-select into conditions (confounding is difficult to control) C) Observational data is always larger D) Experimental data is always better
Answer: B — Randomized controlled experiments are the gold standard for causal inference.

Q35. What is stratified sampling?
A) Layered data storage B) Dividing the population into subgroups (strata) and sampling from each stratum proportionally, ensuring representation of all groups C) Simple random sampling D) Cluster sampling
Answer: B — Stratified sampling is used when subgroups have different characteristics relevant to the study.

Q36. What is cluster sampling?
A) Grouping data points B) Dividing the population into clusters (e.g., geographic regions), randomly selecting clusters, and sampling all or most members within selected clusters C) Stratified sampling D) Convenience sampling
Answer: B — Cluster sampling is cost-efficient when populations are geographically dispersed.

Q37. What is a census?
A) A government survey B) Collecting data from every member of the population — eliminates sampling error but is expensive and often impractical C) A large sample D) A stratified sample
Answer: B — A census is used when the population is small or when complete accuracy is required.

Q38. What is measurement error?
A) A math error B) The difference between the measured value and the true value of a variable, arising from imprecise instruments, human error, or definitional ambiguity C) Missing data D) Outlier data
Answer: B — Measurement error attenuates correlations and biases regression coefficients.

### Fill in the Blank

Q39. ________ bias occurs when the very act of measuring or observing changes the behavior being studied.
Answer: Observer (Hawthorne effect)

Q40. ________ data is collected over time for the same subjects, enabling analysis of individual trajectories and changes.
Answer: Longitudinal (or panel)

Q41. ________ data collects information from multiple subjects at a single point in time.
Answer: Cross-sectional

Q42. A ________ study follows subjects forward in time from exposure to outcome.
Answer: Prospective (cohort)

Q43. A ________ study starts with outcomes and looks backward to identify past exposures.
Answer: Retrospective (case-control)

Q44. ________ is the process of verifying that data was recorded correctly and meets quality standards.
Answer: Data validation

Q45. ________ refers to data that is structured, complete, consistent, accurate, and timely.
Answer: Data quality

Q46. ________ sampling selects every kth element from a population list.
Answer: Systematic

Q47. ________ is the phenomenon where the first data point in a sequence disproportionately influences judgments.
Answer: Anchoring bias

Q48. A ________ is a structured document ensuring data collection is consistent and standardized across collectors.
Answer: Data collection form (or CRF — Case Report Form)

### Scenario

Q49. You receive a dataset from a client with 40% missing values in a key variable. How do you proceed?
Answer: First, understand the missingness mechanism: Missing Completely at Random (MCAR — missingness unrelated to data), Missing at Random (MAR — missingness related to other observed variables), or Missing Not at Random (MNAR — missingness related to the missing value itself, e.g., high earners not reporting income). MNAR is most problematic. Strategies: if MCAR and small proportion — listwise deletion may be acceptable. If MAR — multiple imputation (mice in R, IterativeImputer in sklearn) or model-based imputation using other variables. If MNAR — attempt to collect missing data, use sensitivity analysis, or model the missingness explicitly. At 40%, flag this as a major data quality issue and discuss with the client whether additional data collection is feasible.

Q50. During EDA you find a variable that should range from 1-100 has values of 9999 and -1. What do you do?
Answer: These are almost certainly sentinel values — placeholder codes used to represent missing or unknown data (common in legacy systems and surveys). Do not treat them as real values. Verify with the data dictionary or client. Replace with NaN/null and treat as missing data. Investigate the frequency — how many records have these codes? Are there other sentinel values? Check all other numeric variables for similar patterns. This is a common data quality issue in real-world datasets that EDA must catch before modeling. Including 9999 as a real value would severely distort any statistical analysis or model.

---

## TOPIC 3: DATA WRANGLING AND PREPROCESSING

### Concept MCQ

Q51. What is data wrangling?
A) Arguing about data B) The process of cleaning, transforming, and structuring raw data into a suitable format for analysis C) Data collection D) Data modeling
Answer: B — Also called data munging. Typically takes 60-80% of a data scientist's time.

Q52. What is one-hot encoding?
A) A security technique B) Converting a categorical variable with k categories into k binary columns, one per category, where only one column is 1 for each row C) Label encoding D) Binary encoding
Answer: B — One-hot encoding is needed for algorithms that cannot handle categorical data directly.

Q53. What is label encoding?
A) Adding labels to charts B) Assigning a unique integer to each category of a categorical variable C) One-hot encoding D) Binary encoding
Answer: B — Label encoding is appropriate for ordinal variables but can introduce false ordering for nominal ones.

Q54. What is feature scaling?
A) Scaling the number of features B) Transforming features to a similar numeric range to prevent features with large values from dominating distance-based or gradient-based algorithms C) Feature selection D) Feature engineering
Answer: B — Methods include standardization (z-score) and normalization (min-max).

Q55. What is the difference between standardization and normalization?
A) No difference B) Standardization transforms to mean 0, std 1 (z-score); normalization scales to a fixed range like [0,1] (min-max) C) Normalization uses standard deviation D) Standardization uses min/max
Answer: B — Use standardization when the distribution matters (e.g., for linear models, PCA). Use normalization when a bounded range is needed (e.g., neural networks with sigmoid activation).

Q56. What is data imputation?
A) Data deletion B) Replacing missing values with substituted values — using mean, median, mode, model predictions, or multiple imputation C) Data augmentation D) Data encoding
Answer: B — The imputation method should reflect the missingness mechanism and data type.

Q57. What is an outlier?
A) A data point outside the country B) A data point that deviates significantly from the rest of the data — potentially indicating errors, fraud, or genuinely rare events C) A missing value D) A categorical value
Answer: B — Outlier treatment depends on context: some represent errors (remove), others represent real phenomena (keep and model separately).

Q58. What is the IQR method for outlier detection?
A) A distance method B) Classifying values below Q1 - 1.5×IQR or above Q3 + 1.5×IQR as outliers C) A z-score method D) A model-based method
Answer: B — IQR method is robust because it uses quartiles rather than mean and standard deviation.

Q59. What is data binning?
A) Storing data in bins B) Converting a continuous variable into discrete bins/intervals — e.g., age groups (0-18, 19-35, 36-55, 55+) C) Encoding categoricals D) Feature scaling
Answer: B — Binning can improve interpretability and handle non-linear relationships but loses information.

Q60. What is a pivot table in data analysis?
A) A rotating chart B) A data summarization tool that aggregates data by one or more dimensions, computing statistics like sum, mean, or count for each combination C) A raw data view D) A join operation
Answer: B — Pivot tables are fundamental in pandas (pivot_table) and Excel for summarizing datasets.

Q61. What is a database join?
A) Merging files B) Combining rows from two or more tables based on a related column — INNER, LEFT, RIGHT, FULL OUTER joins control which non-matching rows are included C) A union operation D) A filter operation
Answer: B — Understanding join types is essential for data extraction and wrangling.

Q62. What is tidy data?
A) Clean data B) A data structure principle where each variable is a column, each observation is a row, and each observational unit forms a table C) Sorted data D) Normalized data
Answer: B — Hadley Wickham's tidy data concept is the standard for data analysis in R and Python.

Q63. What is data type mismatch?
A) Wrong data format B) When a variable's stored type (e.g., string) does not match its semantic type (e.g., numeric), preventing correct operations C) Missing data D) Duplicate data
Answer: B — Common example: dates stored as strings, numbers stored as objects in pandas.

Q64. What is deduplication?
A) Adding more data B) Identifying and removing duplicate records from a dataset to prevent double-counting and model bias C) Data compression D) Data normalization
Answer: B — Duplicates can be exact copies or near-duplicates requiring fuzzy matching.

Q65. What is data reshaping?
A) Changing data visualization B) Transforming data between wide format (each variable a column) and long format (variable name and value in separate columns) C) Data sorting D) Data filtering
Answer: B — Wide-to-long: pandas melt(). Long-to-wide: pandas pivot().

### Fill in the Blank

Q66. In pandas, ________ fills missing values with the next valid observation (forward filling).
Answer: ffill() (or fillna(method='ffill'))

Q67. The ________ transformation applies the natural log to a skewed variable to make it more normally distributed.
Answer: log

Q68. ________ encoding maps ordinal categories to integers preserving their natural order (e.g., Low=1, Medium=2, High=3).
Answer: Ordinal

Q69. ________ is a pandas method that returns the first n rows of a DataFrame.
Answer: head(n)

Q70. The ________ transformation scales each feature to the range [0, 1] by subtracting the minimum and dividing by the range.
Answer: Min-max normalization (MinMaxScaler)

Q71. ________ is the process of combining multiple datasets from different sources into a single unified dataset.
Answer: Data integration (or data merging)

Q72. A ________ key is a column or combination of columns that uniquely identifies each row in a table.
Answer: primary

Q73. ________ is a technique using word-matching algorithms (Levenshtein distance, Jaro-Winkler) to identify near-duplicate records with small variations.
Answer: Fuzzy matching (or record linkage)

Q74. In pandas, the ________ method provides count, mean, std, min, percentiles, and max for numeric columns.
Answer: describe()

Q75. ________ is the process of converting text data into a structured format suitable for analysis or modeling.
Answer: Text preprocessing (or text normalization)

### Scenario

Q76. A dataset has dates in three different formats: "2024-01-15", "01/15/2024", and "January 15, 2024". How do you standardize this in Python?
Answer: Use pandas pd.to_datetime() with infer_datetime_format=True or a custom parser. For multiple formats: apply a function that tries each format in sequence using datetime.strptime() with try/except. After parsing to datetime objects, store in a consistent ISO format. Always verify the parsed result on a sample before applying to the full dataset. Also check for ambiguous dates (is 01/02/03 January 2nd or February 1st?). Establish a standard date format convention and document it. Use the dateutil.parser for automatic format detection as a fallback.

Q77. You join two tables and the resulting row count is much higher than either source table. What likely happened?
Answer: A many-to-many join — the join key is not unique in both tables. If a key appears 3 times in Table A and 4 times in Table B, the join produces 12 rows for that key value. Diagnose: check value counts of the join key in each table before joining. If duplicates are unintentional, deduplicate first. If they are intentional (e.g., multiple transactions per customer), ensure the join logic reflects the intended semantics. Use GROUP BY or aggregation before joining if needed. Consider using merge with validate='one_to_one' or 'one_to_many' in pandas to catch unexpected duplicates.

---

## TOPIC 4: SQL FOR DATA SCIENCE

### Concept MCQ

Q78. What is a GROUP BY clause used for?
A) Sorting rows B) Aggregating rows that share the same values in specified columns, applying aggregate functions (SUM, COUNT, AVG) to each group C) Filtering rows D) Joining tables
Answer: B — GROUP BY is fundamental to analytical SQL queries.

Q79. What is the difference between WHERE and HAVING?
A) No difference B) WHERE filters rows before aggregation; HAVING filters groups after aggregation (and thus can reference aggregate functions) C) HAVING is faster D) WHERE works on groups
Answer: B — Example: WHERE age > 25 filters individual rows; HAVING COUNT(*) > 10 filters groups.

Q80. What is a window function in SQL?
A) A function for windows OS B) A function that performs calculations across a set of rows related to the current row without collapsing them into a single output, unlike GROUP BY C) An aggregate function D) A join type
Answer: B — Window functions: ROW_NUMBER(), RANK(), LAG(), LEAD(), SUM() OVER(PARTITION BY).

Q81. What is a CTE (Common Table Expression)?
A) A table type B) A temporary named result set defined with WITH that can be referenced in the main query, improving readability and enabling recursive queries C) A view D) A stored procedure
Answer: B — CTEs make complex queries more readable and maintainable.

Q82. What is the difference between RANK() and DENSE_RANK()?
A) No difference B) RANK() skips ranks after ties (1,1,3,4); DENSE_RANK() does not skip (1,1,2,3) C) DENSE_RANK is faster D) RANK is always preferred
Answer: B — ROW_NUMBER() assigns unique sequential integers regardless of ties.

Q83. What does COALESCE do in SQL?
A) Merges tables B) Returns the first non-NULL value from a list of arguments — useful for replacing NULL with a default value C) Counts NULL values D) Removes duplicates
Answer: B — COALESCE(column, 0) replaces NULL with 0.

Q84. What is a subquery?
A) A secondary database B) A query nested inside another query, used in WHERE, FROM, or SELECT clauses to provide values or result sets C) A join operation D) A view
Answer: B — Subqueries can often be replaced with CTEs or joins for better performance.

Q85. What is the CASE WHEN statement used for?
A) A control flow statement B) Creating conditional logic within SQL queries — similar to if/else, returning different values based on conditions C) A join condition D) A filter condition
Answer: B — CASE WHEN is used for creating custom categories, conditional aggregations, and flags.

Q86. What is an index in a database?
A) A table numbering B) A database structure that improves query performance by enabling faster data retrieval at the cost of additional storage and slower write operations C) A sorted table D) A foreign key
Answer: B — Over-indexing slows writes; under-indexing slows reads. Balance is key.

Q87. What is the difference between UNION and UNION ALL?
A) No difference B) UNION removes duplicates from the combined result; UNION ALL keeps all rows including duplicates and is faster C) UNION ALL removes duplicates D) UNION is always preferred
Answer: B — Use UNION ALL when duplicates are acceptable or non-existent, for better performance.

### Fill in the Blank

Q88. The ________ function returns the number of rows in a group, including or excluding NULLs depending on whether a column is specified.
Answer: COUNT (COUNT(*) includes NULLs; COUNT(column) excludes NULLs)

Q89. The ________ clause in a window function defines the subset of rows over which the function operates.
Answer: PARTITION BY

Q90. ________ is an SQL function that returns the value of a column from the previous row in a result set, useful for time series calculations.
Answer: LAG()

Q91. The ________ join returns all rows from both tables, with NULLs where there is no match.
Answer: FULL OUTER JOIN

Q92. ________ is used to remove duplicate rows from a SELECT result.
Answer: DISTINCT

Q93. The ________ statement in SQL is used to add, update, or delete rows in a target table based on a source table.
Answer: MERGE (or UPSERT)

Q94. ________ is an SQL aggregate function returning the middle value — not natively available in all databases but computable with PERCENTILE_CONT.
Answer: Median (PERCENTILE_CONT(0.5))

Q95. The ________ function in SQL extracts a specific part (year, month, day) from a date.
Answer: EXTRACT() or DATEPART()

Q96. ________ is the process of breaking a query's logic into modular steps using multiple CTEs chained together.
Answer: Query decomposition (or CTE chaining)

Q97. ________ is the SQL operator checking whether a value falls within a range (inclusive).
Answer: BETWEEN

### Scenario

Q98. Write a SQL query to find the top 3 customers by total spend in each country.
Answer:
WITH ranked AS (
  SELECT customer_id, country,
  SUM(order_value) AS total_spend,
  RANK() OVER (PARTITION BY country ORDER BY SUM(order_value) DESC) AS rnk
  FROM orders
  GROUP BY customer_id, country
)
SELECT customer_id, country, total_spend
FROM ranked
WHERE rnk <= 3;

Q99. You have a table of daily user logins. Write a query to find users who logged in on 3 or more consecutive days.
Answer: Use LAG() to get previous login dates, then identify gaps. Or use a self-join approach: join the table to itself on dates differing by 1 and 2 days. Or number rows per user ordered by date, subtract row number from date (a constant gap means consecutive dates), group by user and this derived value, and HAVING COUNT(*) >= 3. The date minus row number trick is the most elegant: SELECT user_id, login_date - ROW_NUMBER() OVER(PARTITION BY user_id ORDER BY login_date) AS grp — then group by user_id, grp and filter groups with count >= 3.

Q100. A table has 100M rows and a query is running slowly despite a WHERE clause on a date column. How do you diagnose and fix?
Answer: First run EXPLAIN/EXPLAIN ANALYZE to see the query plan — check if the index is being used. Check if an index exists on the date column (CREATE INDEX if not). If an index exists but is not used: check if the WHERE clause is applying a function to the column (WHERE YEAR(date_col) = 2024 prevents index use — rewrite as WHERE date_col BETWEEN '2024-01-01' AND '2024-12-31'). Consider table partitioning on date for very large tables. Check statistics freshness (ANALYZE the table). Review if the query is returning too many rows (low selectivity) making a full table scan more efficient than index lookup. Consider query-level caching for frequently run queries.

---

## TOPIC 5: PYTHON FOR DATA SCIENCE

### Concept MCQ

Q101. What is a pandas DataFrame?
A) A list of lists B) A two-dimensional labeled data structure with columns of potentially different data types — the primary data structure for tabular data in Python C) A numpy array D) A dictionary
Answer: B — DataFrames are the cornerstone of data manipulation in Python.

Q102. What is vectorization in pandas/numpy?
A) Converting data to vectors B) Applying operations to entire arrays at once using optimized C/Fortran code rather than Python loops, dramatically improving performance C) A machine learning technique D) Feature engineering
Answer: B — Avoid Python loops over DataFrame rows; use vectorized operations instead.

Q103. What is the difference between .loc and .iloc in pandas?
A) No difference B) .loc uses label-based indexing (row/column names); .iloc uses integer position-based indexing C) .iloc is slower D) .loc only works on strings
Answer: B — .loc['a':'c'] includes 'c'; .iloc[0:3] excludes index 3 (Python slicing convention).

Q104. What is a lambda function in Python?
A) A named function B) An anonymous single-expression function defined inline using the lambda keyword C) A recursive function D) A class method
Answer: B — Commonly used with .apply(), .map(), and .filter() in data workflows.

Q105. What is list comprehension in Python?
A) Understanding lists B) A concise syntax for creating lists by applying an expression to each element of an iterable, optionally filtering C) A list method D) A sorting technique
Answer: B — [x**2 for x in range(10) if x % 2 == 0] is faster and more readable than equivalent loops.

Q106. What is a generator in Python?
A) A class for generating objects B) A function that yields values one at a time, computing them lazily — memory-efficient for large datasets that do not need to be fully loaded C) A list comprehension D) A decorator
Answer: B — Generators are crucial when processing datasets too large to fit in memory.

Q107. What is the difference between a shallow copy and deep copy in Python?
A) No difference B) Shallow copy creates a new container but references the same objects; deep copy creates a fully independent copy including all nested objects C) Deep copy is always needed D) Shallow copy is always safe
Answer: B — Use copy.deepcopy() when working with nested mutable structures to avoid unintended mutations.

Q108. What is method chaining in pandas?
A) A networking concept B) Applying multiple DataFrame methods sequentially in a single expression: df.dropna().groupby('col').agg('mean').reset_index() C) Function composition D) Pipeline modeling
Answer: B — Method chaining improves code readability and reduces intermediate variable creation.

Q109. What does the groupby().agg() pattern do in pandas?
A) Filters groups B) Groups data by one or more columns and applies one or multiple aggregate functions simultaneously to specified columns C) Sorts groups D) Joins groups
Answer: B — df.groupby('category').agg({'sales': 'sum', 'quantity': 'mean'})

Q110. What is the purpose of the apply() function in pandas?
A) Applying CSS styles B) Applying a function along an axis of a DataFrame (row-wise or column-wise) when vectorized operations are insufficient C) Applying filters D) Applying joins
Answer: B — apply() is slower than vectorized operations; use it only when necessary.

### Fill in the Blank

Q111. ________ is a Python library providing multi-dimensional array operations with broadcasting and vectorized math.
Answer: NumPy

Q112. The pandas ________ method merges two DataFrames on specified columns, equivalent to a SQL join.
Answer: merge()

Q113. ________ is the Python library for creating static, animated, and interactive visualizations.
Answer: Matplotlib

Q114. The ________ function in pandas detects missing values, returning a boolean DataFrame.
Answer: isnull() (or isna())

Q115. ________ is a Python library providing a high-level interface for drawing attractive statistical graphics built on Matplotlib.
Answer: Seaborn

Q116. The pandas ________ method drops columns or rows with missing values.
Answer: dropna()

Q117. ________ is a Python library for interactive visualizations and dashboards.
Answer: Plotly (or Bokeh, Altair)

Q118. The ________ parameter in pandas read_csv() specifies which column to use as the row index.
Answer: index_col

Q119. ________ is a Python context manager ensuring files are properly closed after operations even if an exception occurs.
Answer: with (open() as f)

Q120. The ________ method in pandas applies a function element-wise to a Series.
Answer: map() (or apply())

### Scenario

Q121. You have a pandas DataFrame with 10 million rows and a computation using .apply() is taking 45 minutes. How do you speed it up?
Answer: .apply() with a Python function is essentially a Python loop — extremely slow on large DataFrames. Solutions in order of preference: rewrite using vectorized pandas/numpy operations (usually 10-100x faster), use np.where() or np.select() for conditional logic, use .str methods for string operations, use numba JIT compilation for numerical operations that cannot be vectorized, use Dask or Modin for parallel apply() across cores, use Cython for compute-intensive custom functions. Profile with %timeit to measure improvement. The first step is always: "Can this be expressed as a vectorized operation?"

Q122. You need to process a 500GB CSV file but your machine has 16GB RAM. How do you handle this in Python?
Answer: Multiple strategies. Chunked processing: pd.read_csv(file, chunksize=100000) reads in chunks, processes each chunk, and accumulates results. Column selection: only load needed columns using usecols parameter — dramatically reduces memory. Data type optimization: specify dtypes explicitly (int32 instead of int64, category instead of object for low-cardinality strings) to reduce memory per row. Use Dask: dask.dataframe treats the file as a lazy collection, computing only when needed. Use PySpark for distributed processing. Use Parquet format instead of CSV — compressed, columnar, much faster to load selectively. Process in SQL if the data lives in a database — push computation to the database.

---

## TOPIC 6: DATA VISUALIZATION

### Concept MCQ

Q123. What is the purpose of data visualization?
A) Making reports look nice B) Communicating patterns, relationships, and insights in data in a way that is immediately understandable — exploiting the human visual system C) Replacing statistical analysis D) Impressing stakeholders
Answer: B — Effective visualization combines data truth with perceptual clarity.

Q124. When should you use a bar chart vs a histogram?
A) They are the same B) Bar charts compare values across discrete categories; histograms show the distribution of a continuous variable by grouping values into bins C) Histograms are for categories D) Bar charts show distributions
Answer: B — Confusing these is a common visualization mistake.

Q125. What is a scatter plot used for?
A) Showing time series B) Visualizing the relationship between two continuous variables, revealing correlation, clusters, and outliers C) Comparing categories D) Showing distributions
Answer: B — Add a regression line to show the linear trend.

Q126. What is a box plot?
A) A box-shaped chart B) A visualization showing the five-number summary (min, Q1, median, Q3, max) and outliers — ideal for comparing distributions across groups C) A bar chart variant D) A scatter plot
Answer: B — Box plots are excellent for comparing distributions across many groups compactly.

Q127. What is a heatmap used for?
A) Temperature visualization B) Visualizing a matrix of values using color intensity — commonly used for correlation matrices, missing data patterns, and contingency tables C) A scatter plot D) A geographic map
Answer: B — Color encodes the magnitude — choose perceptually uniform color scales.

Q128. What is a violin plot?
A) A music chart B) A combination of a box plot and kernel density estimate — showing the full distribution shape alongside quartiles C) A bar chart D) A scatter plot
Answer: B — Violin plots reveal multimodality that box plots hide.

Q129. What is overplotting and how do you address it?
A) Too many charts B) When too many data points overlap in a scatter plot, making patterns invisible. Addressed by transparency (alpha), jitter, hexbin plots, or 2D density plots C) Too many colors D) Chart cluttering
Answer: B — Overplotting is common with large datasets and hides the true distribution.

Q130. What is the difference between a line chart and a time series plot?
A) No difference B) A time series plot specifically visualizes data indexed by time, with time on the x-axis and value on the y-axis — a line chart can connect any ordered categories C) A time series uses bars D) Line charts are for time
Answer: B — For time series, ensure the x-axis reflects true temporal spacing.

Q131. What is a pie chart and when should you avoid it?
A) A dessert chart B) A circular chart showing proportions as slices. Avoid when comparing more than 4-5 categories, when differences are small, or when exact values matter — humans are poor at judging angles C) Always use it D) Use it for time series
Answer: B — Bar charts are almost always superior to pie charts for data communication.

Q132. What is Edward Tufte's data-ink ratio?
A) Amount of ink used B) The principle that the ratio of data-ink (ink conveying information) to total ink should be maximized — remove all non-essential chart elements (chartjunk) C) Ink cost D) Color usage
Answer: B — Remove gridlines, backgrounds, 3D effects, and decorations that do not encode data.

### Fill in the Blank

Q133. ________ is the principle that visualizations should not distort the magnitude of differences — e.g., bar charts should start at zero.
Answer: Lie factor (or visual integrity — Tufte's principle)

Q134. ________ is a visualization showing all pairwise scatter plots and histograms for multiple variables simultaneously.
Answer: Pair plot (or scatter plot matrix — seaborn pairplot())

Q135. A ________ plot adds a small amount of random noise to data points to separate overlapping points in categorical scatter plots.
Answer: Jitter (or strip plot with jitter)

Q136. ________ is a Python library for creating interactive web-based visualizations.
Answer: Plotly

Q137. ________ is the visual encoding of a variable using position on an axis, which humans perceive most accurately.
Answer: Position encoding

Q138. A ________ chart shows data changing over time as filled area under a line.
Answer: Area chart

Q139. ________ is the practice of using pre-attentive attributes (color, size, shape) to guide the viewer's eye to the most important information.
Answer: Visual hierarchy (or pre-attentive processing)

Q140. A ________ diagram shows hierarchical data as nested rectangles where area represents the value.
Answer: Treemap

Q141. ________ is a visualization framework based on the Grammar of Graphics, implemented in R as ggplot2 and in Python as plotnine.
Answer: Grammar of Graphics (ggplot2)

Q142. A ________ plot displays the distribution of a continuous variable across multiple categories using kernel density estimates side by side.
Answer: Ridgeline (or joy plot)

### Scenario

Q143. A business stakeholder asks you to build a dashboard showing sales performance. What are the key principles you follow in designing it?
Answer: Know the audience — what decisions will they make? Use appropriate chart types for each metric: bar charts for comparisons, line charts for trends, KPI cards for key numbers. Follow the 5-second rule — key insights should be immediately visible. Use consistent color encoding — one color for one meaning throughout. Prioritize visual hierarchy — most important metrics top-left. Avoid chartjunk — no 3D effects, excessive gridlines, or decorative elements. Provide context — include targets, benchmarks, and prior period comparisons. Make it interactive — filters for time period, region, product. Use Tufte's data-ink ratio. Tell a story — the dashboard should answer the stakeholder's questions in order of importance.

Q144. You present a beautiful correlation heatmap to a non-technical stakeholder and they are confused. How do you communicate the same insight more effectively?
Answer: Tailor the visualization to the audience. Instead of the full correlation matrix, identify the 3-5 most important correlations for the business question and show them as simple scatter plots with regression lines and annotation. Add plain-English annotations directly on the chart: "Sales increases by $X for each additional $1 in marketing spend." Use specific examples from the data to illustrate the pattern. Replace technical terms (correlation coefficient = 0.72) with business language ("strong positive relationship"). Consider a slope graph or connected dot plot if showing direction of relationships. Always lead with the insight — "X and Y are strongly related, meaning..." — not with the chart.

---

## TOPIC 7: REGRESSION ANALYSIS

### Concept MCQ

Q145. What is simple linear regression?
A) A simple calculation B) A model predicting a continuous outcome as a linear function of a single predictor: y = β0 + β1x + ε C) A classification method D) A smoothing technique
Answer: B — Simple linear regression establishes the baseline for understanding linear relationships.

Q146. What is multiple linear regression?
A) Multiple simple regressions B) A regression model with two or more predictors: y = β0 + β1x1 + β2x2 + ... + βnxn + ε C) A polynomial regression D) A nonlinear model
Answer: B — Multiple regression controls for other variables, enabling adjusted effect estimation.

Q147. What is multicollinearity?
A) Multiple categories B) High correlation between predictor variables in a regression model, making coefficient estimates unstable and difficult to interpret C) Multiple outcomes D) Multiple datasets
Answer: B — Detected by Variance Inflation Factor (VIF). VIF > 10 indicates severe multicollinearity.

Q148. What is heteroscedasticity?
A) Too many variables B) Non-constant variance of residuals across the range of predicted values — violating a key linear regression assumption C) Non-linearity D) Autocorrelation
Answer: B — Detected visually (residual plot showing funnel shape) and by Breusch-Pagan test. Fix: transform the outcome or use weighted least squares.

Q149. What is autocorrelation in regression residuals?
A) Self-correlation B) Correlation of residuals with their own past values — violates the independence assumption, common in time series data C) Multicollinearity D) Heteroscedasticity
Answer: B — Detected by the Durbin-Watson test. Fix: include time lags, use time series models.

Q150. What is polynomial regression?
A) Regression on polynomials B) Extending linear regression by including polynomial terms (x², x³) to model nonlinear relationships while remaining linear in the parameters C) A nonlinear model D) A spline model
Answer: B — Polynomial regression is still a linear model in terms of parameter estimation.

Q151. What is logistic regression's output and how is it interpreted?
A) A continuous value B) The log-odds of the binary outcome, converted to probability via the sigmoid function. Coefficients represent the change in log-odds per unit change in the predictor C) A class label D) A probability only
Answer: B — Exponentiated coefficients give odds ratios — more interpretable for stakeholders.

Q152. What is regularization in regression?
A) Normalizing the target B) Adding a penalty term to the loss function to prevent overfitting by constraining coefficient magnitudes C) A data preprocessing step D) A variable selection technique
Answer: B — Ridge (L2), Lasso (L1), and Elastic Net combine both penalties.

Q153. What is Ridge regression?
A) Mountain-shaped regression B) Linear regression with an L2 penalty — sum of squared coefficients — that shrinks all coefficients toward zero without eliminating any C) A Lasso variant D) A polynomial regression
Answer: B — Ridge handles multicollinearity by distributing coefficient weight across correlated features.

Q154. What is Lasso regression?
A) A lasso-shaped regression B) Linear regression with an L1 penalty — sum of absolute coefficients — that can shrink some coefficients to exactly zero, performing feature selection C) A Ridge variant D) A stepwise regression
Answer: B — Lasso is preferred when you expect many irrelevant features.

Q155. What is Elastic Net?
A) A fishing net model B) A regression combining both L1 (Lasso) and L2 (Ridge) penalties, controlled by a mixing parameter — useful when there are many correlated features C) A neural network D) A boosting method
Answer: B — Elastic Net selects groups of correlated features better than Lasso alone.

### Fill in the Blank

Q156. In linear regression, the ________ are the differences between observed and predicted values.
Answer: residuals

Q157. The ________ measures the proportion of variance in the outcome explained by the predictors.
Answer: R-squared (coefficient of determination)

Q158. ________ R-squared penalizes for adding variables that do not improve the model, unlike regular R-squared which always increases.
Answer: Adjusted

Q159. The ________ test in regression checks whether all coefficients simultaneously equal zero.
Answer: F-test (overall F-test)

Q160. ________ is the regression coefficient for a predictor, representing the expected change in the outcome for a one-unit increase while holding all other predictors constant.
Answer: Partial regression coefficient (beta)

Q161. ________ regression uses a log link function and is appropriate when the outcome is a count variable.
Answer: Poisson

Q162. The ________ method estimates regression coefficients by minimizing the sum of squared residuals.
Answer: Ordinary Least Squares (OLS)

Q163. ________ is a regression technique for outcomes that are ordinal — ranked categories without equal spacing.
Answer: Ordinal logistic regression

Q164. ________ plots residuals versus fitted values to visually check linearity and homoscedasticity assumptions.
Answer: Residual plot

Q165. The ________ statistic measures the overall variance explained relative to a baseline model, used for model comparison.
Answer: F-statistic (or likelihood ratio test)

### Scenario

Q166. You build a linear regression to predict house prices. The R-squared is 0.85 but predictions for expensive houses are systematically too low. What do you do?
Answer: Systematic under-prediction at high values indicates the model is not capturing the non-linear relationship at the high end of the price distribution. Solutions: log-transform the outcome variable (log house prices are often more normally distributed), add polynomial terms for key predictors, create interaction terms between size and location, try quantile regression to model different parts of the distribution separately, use a more flexible model (gradient boosting). Also check for heteroscedasticity — if variance increases with price, use weighted least squares. The residual plot will confirm the pattern and guide the fix.

Q167. A coefficient in your multiple regression is positive in simple regression but becomes negative when you add other variables. What happened?
Answer: This is Simpson's paradox or suppressor variable effect — the sign reversal indicates confounding. The added variable is correlated with both the predictor and the outcome. In simple regression, the coefficient captures the raw association including the confound. In multiple regression, it is a partial effect holding other variables constant. Neither is wrong — they answer different questions. Interpret multiple regression coefficients as partial effects. The multivariate model is usually more appropriate for causal questions. Investigate the relationships between variables using a correlation matrix and directed acyclic graph (DAG).

---

## TOPIC 8: CLASSIFICATION AND MODEL EVALUATION

### Concept MCQ

Q168. What is precision in classification?
A) Overall accuracy B) Of all instances predicted as positive, the proportion that are actually positive: TP/(TP+FP) C) Of all actual positives, how many were caught D) Model accuracy
Answer: B — Precision matters when false positives are costly (spam filter, fraud flags).

Q169. What is recall in classification?
A) Model memory B) Of all actual positive instances, the proportion correctly identified: TP/(TP+FN) C) Of all predicted positives, how many are correct D) Model accuracy
Answer: B — Recall matters when false negatives are costly (disease detection, fraud detection).

Q170. What is the F1-score?
A) Feature importance score B) The harmonic mean of precision and recall: 2×(precision×recall)/(precision+recall) — balances both metrics C) Overall accuracy D) Area under ROC
Answer: B — Use F1 when you need a balance between precision and recall.

Q171. What is AUC-ROC and how is it interpreted?
A) A chart B) Area Under the Receiver Operating Characteristic Curve — measures the model's ability to discriminate between classes across all thresholds. AUC=0.5 is random; AUC=1.0 is perfect C) A loss metric D) A calibration metric
Answer: B — AUC is threshold-independent and handles class imbalance better than accuracy.

Q172. What is the precision-recall curve?
A) A model comparison B) A plot of precision vs recall at various classification thresholds — preferred over ROC when the positive class is rare C) An ROC variant D) A training curve
Answer: B — The area under the PR curve (AUC-PR) is more informative than AUC-ROC for imbalanced datasets.

Q173. What is log loss?
A) Logarithm of loss B) A classification metric penalizing confident wrong predictions more heavily — the negative log-likelihood of predicted probabilities C) A regression metric D) A tree metric
Answer: B — Log loss = 0 is perfect. Useful when calibrated probabilities matter.

Q174. What is a calibration curve?
A) A sensor calibration chart B) A plot comparing predicted probabilities against observed frequencies — a well-calibrated model's 0.8 probability predictions are correct 80% of the time C) A ROC variant D) A precision-recall curve
Answer: B — Calibration is critical in healthcare, finance, and any domain where probabilities drive decisions.

Q175. What is Platt scaling?
A) A scaling technique B) A post-hoc calibration method fitting a logistic regression on a model's raw scores to produce calibrated probabilities C) A normalization method D) A regularization technique
Answer: B — Platt scaling and isotonic regression are the two main calibration methods.

Q176. What is the Matthews Correlation Coefficient (MCC)?
A) A correlation B) A balanced metric for binary classification considering all four confusion matrix values — particularly reliable for imbalanced classes C) An F1 variant D) A regression metric
Answer: B — MCC ranges from -1 to 1, with 1 being perfect prediction.

Q177. What is stratified k-fold cross-validation?
A) A standard k-fold B) K-fold cross-validation that maintains the same class distribution in each fold as in the original dataset — important for imbalanced classification C) A time series method D) A nested cross-validation
Answer: B — Without stratification, some folds may contain few or no minority class examples.

### Fill in the Blank

Q178. ________ is the condition where one class has significantly more instances than another, causing models to favor the majority class.
Answer: Class imbalance

Q179. ________ creates synthetic minority class samples by interpolating between existing minority instances.
Answer: SMOTE (Synthetic Minority Over-sampling Technique)

Q180. ________ assigns higher misclassification cost to the minority class during training, compensating for imbalance.
Answer: Class weighting (class_weight='balanced')

Q181. ________ is a threshold-setting technique choosing the classification threshold that maximizes F1 or another business-relevant metric.
Answer: Threshold optimization (or optimal threshold selection)

Q182. ________ cross-validation leaves one sample out as the test set in each fold — equivalent to n-fold CV.
Answer: Leave-one-out (LOO)

Q183. ________ is a performance metric measuring the percentage of top-ranked predictions that are relevant, used in recommendation and information retrieval.
Answer: Precision@k

Q184. ________ is the tendency of a model to assign predicted probabilities that are too extreme (near 0 or 1), requiring calibration.
Answer: Overconfidence (poor calibration)

Q185. ________ evaluation tests whether a model's performance difference from a baseline is statistically significant.
Answer: Statistical significance testing (McNemar's test, DeLong's test for AUC)

Q186. In a confusion matrix, the ________ rate measures the proportion of actual negatives incorrectly classified as positive.
Answer: False Positive Rate (FPR) or fall-out

Q187. ________ is the process of evaluating a model on data from a time period after the training period, simulating real deployment conditions.
Answer: Out-of-time validation

---

## TOPIC 9: ADVANCED MACHINE LEARNING

### Concept MCQ

Q188. What is gradient boosting?
A) Boosting gradients in neural networks B) An ensemble method building trees sequentially where each tree corrects the errors (residuals) of the previous ensemble using gradient descent in function space C) A random forest variant D) A bagging method
Answer: B — Gradient boosting (XGBoost, LightGBM, CatBoost) is the dominant algorithm for tabular data.

Q189. What is XGBoost's key innovation over vanilla gradient boosting?
A) More trees B) Regularization terms in the objective function, approximate split finding, handling of missing values, and hardware optimization making it significantly faster C) Different loss functions D) Larger trees
Answer: B — XGBoost added L1/L2 regularization, column subsampling, and efficient tree pruning.

Q190. What is LightGBM and how does it differ from XGBoost?
A) A lighter XGBoost B) A gradient boosting framework using leaf-wise tree growth (instead of level-wise), GOSS sampling, and EFB feature bundling — achieving faster training with comparable accuracy C) A neural network D) A random forest
Answer: B — LightGBM is significantly faster than XGBoost for large datasets.

Q191. What is CatBoost's key advantage?
A) Faster than LightGBM B) Native handling of categorical features using target statistics without requiring manual encoding, and symmetric trees reducing prediction time C) Less memory use D) Better with text data
Answer: B — CatBoost also implements ordered boosting to reduce prediction shift (target leakage during training).

Q192. What is SHAP (SHapley Additive exPlanations)?
A) A chart type B) A game-theoretic approach to explain individual model predictions by assigning each feature a contribution value (Shapley value) for that prediction C) A model type D) A regularization technique
Answer: B — SHAP provides consistent, locally accurate feature importance for any model.

Q193. What is partial dependence plot (PDP)?
A) A correlation plot B) A visualization showing the marginal effect of one or two features on the predicted outcome, averaging over all other features C) A residual plot D) A feature importance plot
Answer: B — PDPs reveal the direction and shape of feature effects but assume feature independence.

Q194. What is the difference between feature importance from tree models and SHAP values?
A) No difference B) Tree feature importance (split-based or permutation-based) gives global importance scores; SHAP gives local (per-prediction) contributions that sum to the prediction, with global aggregation possible C) SHAP is less accurate D) Tree importance is always better
Answer: B — SHAP is more consistent and reliable; split-based importance is biased toward high-cardinality features.

Q195. What is the difference between bagging and boosting?
A) No difference B) Bagging trains models in parallel on random data subsets and averages predictions (reduces variance); boosting trains models sequentially where each corrects previous errors (reduces bias) C) Boosting uses more trees D) Bagging is always slower
Answer: B — Random Forest = bagging; XGBoost/LightGBM = boosting.

Q196. What is a stacking ensemble?
A) Stacking data B) Training a meta-learner on the out-of-fold predictions of multiple base models, learning to optimally combine their predictions C) A boosting variant D) A bagging variant
Answer: B — Stacking can improve on any individual model by learning each model's strengths.

Q197. What is target encoding?
A) Encoding the target variable B) Replacing a categorical variable's values with the mean of the target variable for each category — powerful but requires careful handling to prevent leakage C) One-hot encoding D) Label encoding
Answer: B — Use out-of-fold target statistics or regularization (smoothing) to prevent leakage.

### Fill in the Blank

Q198. ________ importance measures feature importance by randomly shuffling a feature's values and measuring the resulting drop in model performance.
Answer: Permutation

Q199. ________ is a technique for hyperparameter tuning that models the objective function using a Gaussian Process to efficiently find optimal settings.
Answer: Bayesian optimization (e.g., Optuna, Hyperopt)

Q200. ________ is a learning curve analysis technique revealing whether adding more training data would likely improve model performance.
Answer: Learning curve (train vs validation error as a function of training size)

Q201. ________ is a technique training multiple diverse models and combining their predictions through voting or averaging.
Answer: Ensemble methods

Q202. ________ is the process of training a final model on the entire training dataset (including validation) after hyperparameter tuning.
Answer: Refitting (final model training)

Q203. ________ is a technique that randomly sets a fraction of input features to zero at each training step, preventing co-adaptation.
Answer: Dropout (in neural networks)

Q204. ________ validation uses time-based splits — always training on past data and testing on future data — for time series model evaluation.
Answer: Time series cross-validation (or walk-forward validation)

Q205. ________ is a technique for combining regression models where the final prediction is a weighted average of base model predictions.
Answer: Blending (or model averaging)

---

## TOPIC 10: TIME SERIES ANALYSIS

### Concept MCQ

Q206. What is stationarity in time series?
A) Data that does not change B) A property where statistical properties (mean, variance, autocorrelation) remain constant over time — required by many classical time series models C) A constant trend D) Seasonal constancy
Answer: B — Test for stationarity with the Augmented Dickey-Fuller (ADF) test.

Q207. What is differencing in time series?
A) Subtracting two series B) Computing the change between consecutive observations to remove trends and achieve stationarity: y't = yt - yt-1 C) A smoothing technique D) A filtering operation
Answer: B — First differencing removes linear trends; seasonal differencing removes seasonal patterns.

Q208. What is autocorrelation?
A) Self-multiplication B) The correlation of a time series with its own lagged values — measuring how much past values predict future values C) Cross-series correlation D) Partial correlation
Answer: B — Visualized with an ACF (Autocorrelation Function) plot.

Q209. What is partial autocorrelation?
A) Partial self-correlation B) The correlation between a time series and its lag k after removing the effects of shorter lags — used to identify the AR order in ARIMA C) A smoothing term D) A trend component
Answer: B — Visualized with a PACF (Partial Autocorrelation Function) plot.

Q210. What is decomposition in time series?
A) Breaking down data B) Separating a time series into trend, seasonality, and residual (remainder) components — additive or multiplicative C) A differencing technique D) A forecasting method
Answer: B — STL decomposition (Seasonal-Trend decomposition using LOESS) is the most flexible method.

Q211. What is a seasonal pattern in time series?
A) Weather data B) A pattern that repeats at fixed, known intervals — daily, weekly, monthly, yearly C) A random fluctuation D) A trend
Answer: B — Distinguish from cycles (irregular periods) and trends (long-term direction).

Q212. What is exponential smoothing?
A) Smoothing with exponential functions B) A forecasting method giving exponentially decreasing weights to past observations — Holt-Winters extends it to handle trends and seasonality C) A differencing technique D) An ARIMA variant
Answer: B — Simple, double (Holt), and triple (Holt-Winters) exponential smoothing handle different patterns.

Q213. What is the difference between AR, MA, and ARMA models?
A) No difference B) AR (AutoRegressive) models use past values; MA (Moving Average) models use past forecast errors; ARMA combines both C) MA is always better D) AR models are for trends
Answer: B — ACF and PACF plots identify the appropriate order of each component.

Q214. What is ARIMA?
A) A deep learning model B) AutoRegressive Integrated Moving Average — extends ARMA with differencing (I) to handle non-stationary series, specified by (p, d, q) parameters C) A neural network D) An exponential smoother
Answer: B — p=AR order, d=differencing order, q=MA order.

Q215. What is a SARIMA model?
A) A South American model B) Seasonal ARIMA — extends ARIMA with seasonal components (P, D, Q, s) to model both non-seasonal and seasonal patterns C) A non-seasonal ARIMA D) An exponential smoother
Answer: B — SARIMA(1,1,1)(1,1,1,12) is a common specification for monthly data with annual seasonality.

### Fill in the Blank

Q216. ________ is a Python library providing ARIMA, exponential smoothing, and statistical tests for time series analysis.
Answer: statsmodels

Q217. The ________ test checks for the presence of a unit root (non-stationarity) in a time series.
Answer: Augmented Dickey-Fuller (ADF)

Q218. ________ is a time series cross-validation technique where the training window expands with each fold, always predicting the next period.
Answer: Walk-forward (or expanding window) validation

Q219. ________ is the phenomenon where a model trained on historical data fails when deployed because the future looks different from the past.
Answer: Concept drift (or non-stationarity in deployment)

Q220. ________ is a Facebook/Meta open-source forecasting library that decomposes time series into trend, seasonality, and holiday effects.
Answer: Prophet

Q221. ________ refers to the number of observations per seasonal period in SARIMA notation.
Answer: s (seasonal period)

Q222. ________ is a time series metric measuring forecast accuracy as a percentage of actual values.
Answer: MAPE (Mean Absolute Percentage Error)

Q223. ________ is a scale-independent forecast accuracy metric comparing performance to a naive baseline.
Answer: MASE (Mean Absolute Scaled Error)

Q224. ________ is a neural network architecture designed for sequence modeling that uses gating mechanisms to capture long-term dependencies.
Answer: LSTM (Long Short-Term Memory)

Q225. ________ is the statistical test for checking if two time series are correlated after accounting for their individual autocorrelations.
Answer: Granger causality test

---

## TOPIC 11: NATURAL LANGUAGE PROCESSING FOR DATA SCIENCE

### Concept MCQ

Q226. What is text vectorization?
A) Drawing text B) Converting text into numerical vectors that machine learning models can process C) Tokenizing text D) Cleaning text
Answer: B — Methods: bag of words, TF-IDF, word embeddings, sentence transformers.

Q227. What is TF-IDF?
A) Term Frequency Interface B) Term Frequency-Inverse Document Frequency — weights words by how frequently they appear in a document relative to how rare they are across the corpus C) A neural embedding D) A text classifier
Answer: B — High TF-IDF means the word is frequent in this document but rare overall — likely meaningful.

Q228. What is topic modeling?
A) Modeling text topics manually B) An unsupervised technique discovering latent topics in a document corpus — each document is a mixture of topics, each topic a distribution over words C) A text classification D) A summarization method
Answer: B — LDA (Latent Dirichlet Allocation) is the most widely used topic model.

Q229. What is sentiment analysis?
A) Analyzing feelings B) Determining the emotional tone (positive, negative, neutral) or sentiment polarity of text using rule-based or machine learning approaches C) A classification task D) Both B and C
Answer: D — Sentiment analysis is a text classification task. Both B and C are correct.

Q230. What is named entity recognition (NER)?
A) Naming entities in code B) Identifying and classifying named entities (persons, organizations, locations, dates, monetary values) in text C) A text summarization D) A translation task
Answer: B — NER is fundamental for information extraction from unstructured text.

Q231. What is word embedding?
A) Embedding words in documents B) Dense vector representations where semantically similar words have similar vectors — learned from large text corpora C) A bag of words D) A TF-IDF variant
Answer: B — Word2Vec, GloVe, and FastText are classical word embedding methods.

Q232. What is the difference between stemming and lemmatization?
A) No difference B) Stemming crudely chops word endings (running→run, runs→run); lemmatization reduces words to their dictionary base form considering context (better→good) C) Stemming is more accurate D) Lemmatization is always preferred
Answer: B — Lemmatization is more accurate but slower; stemming is fast and sufficient for many applications.

Q233. What is a sentence transformer?
A) A grammar tool B) A model (based on BERT/RoBERTa) fine-tuned to produce meaningful sentence-level embeddings, enabling semantic similarity and search C) A translation model D) A text classifier
Answer: B — Sentence transformers from the sentence-transformers library enable semantic search at scale.

Q234. What is zero-shot text classification?
A) Classifying without any data B) Using a pretrained language model to classify text into categories it was not explicitly trained on, by framing classification as natural language inference C) One-shot learning D) A feature-based classifier
Answer: B — Enables rapid prototyping without labeled training data.

Q235. What is text augmentation?
A) Cleaning text B) Generating additional training examples by applying transformations to existing text — synonym replacement, back-translation, paraphrasing, random deletion C) A preprocessing step D) A vectorization method
Answer: B — Text augmentation is valuable when labeled training data is scarce.

### Fill in the Blank

Q236. ________ is a Python NLP library providing industrial-strength pipeline components for tokenization, NER, and parsing.
Answer: spaCy

Q237. ________ is a stop word in NLP, referring to common words (the, is, at) typically removed before analysis.
Answer: Stop word

Q238. ________ distance measures the minimum number of single-character edits needed to transform one string into another.
Answer: Levenshtein (edit distance)

Q239. ________ is an n-gram model capturing sequences of n words, useful for language modeling and text classification.
Answer: n-gram (bigram, trigram)

Q240. ________ is the process of breaking text into tokens (words, subwords, sentences) as the first step in NLP pipelines.
Answer: Tokenization

---

## TOPIC 12: EXPERIMENT DESIGN AND A/B TESTING

### Concept MCQ

Q241. What is an A/B test?
A) Testing two data sources B) A randomized controlled experiment comparing two variants (control A and treatment B) to determine which performs better on a target metric C) A sequential test D) A multivariate test
Answer: B — A/B testing is the gold standard for measuring causal impact of product changes.

Q242. What is statistical power in A/B testing?
A) Server power B) The probability of detecting a true effect if one exists — the complement of the Type II error rate (β). Power = 1 - β C) Sample size D) Effect size
Answer: B — Typically set to 80% or 90% in practice. Under-powered tests miss real effects.

Q243. What is the minimum detectable effect (MDE)?
A) The smallest dataset B) The smallest effect size the test is designed to detect with specified power and significance level — determines required sample size C) The significance threshold D) The effect already observed
Answer: B — A smaller MDE requires a larger sample size. Set MDE based on business relevance, not statistical convenience.

Q244. What is novelty effect in A/B testing?
A) A new feature effect B) A temporary behavioral change (increased or decreased engagement) caused by users' reaction to something new, which fades over time — inflating or deflating short-term test results C) A statistical artifact D) A sample bias
Answer: B — Run tests long enough to let novelty effects dissipate, typically at least 1-2 weeks.

Q245. What is network effects contamination in A/B testing?
A) Network infrastructure issues B) Violation of the Stable Unit Treatment Value Assumption (SUTVA) — control users are affected by treatment users (e.g., social networks, marketplaces) C) A sample bias D) A statistical error
Answer: B — Addressed by cluster randomization (assigning all users in a group to the same variant).

Q246. What is a multi-armed bandit?
A) A gambling machine B) An adaptive experiment design dynamically allocating more traffic to better-performing variants, balancing exploration and exploitation unlike static A/B tests C) A multivariate test D) A Bayesian test
Answer: B — Useful when quickly finding the best variant matters more than precise statistical inference.

Q247. What is the multiple comparisons problem?
A) Testing many models B) The inflated Type I error rate when conducting many simultaneous statistical tests — with 20 tests at α=0.05, one false positive is expected by chance C) A sample size issue D) A power issue
Answer: B — Controlled by Bonferroni correction (divide α by number of tests) or Benjamini-Hochberg FDR.

Q248. What is a holdout group?
A) A control group B) A segment of users permanently excluded from any experiments, providing a clean baseline to measure cumulative treatment effects over time C) A validation set D) A test group
Answer: B — Holdout groups detect long-term effects that individual A/B tests miss.

Q249. What is p-hacking?
A) Hacking p-values B) The practice of repeatedly checking results and stopping the test when significance is reached, or testing many hypotheses and reporting only significant ones — inflating Type I error C) Fixing p-values D) A statistical test
Answer: B — p-hacking produces many false discoveries. Pre-register hypotheses and sample sizes.

Q250. What is the difference between frequentist and Bayesian A/B testing?
A) No difference B) Frequentist tests provide p-values and confidence intervals requiring pre-specified stopping rules; Bayesian tests provide probability that B is better than A, enabling continuous monitoring C) Bayesian always needs more data D) Frequentist is always preferred
Answer: B — Bayesian A/B testing is more intuitive for business stakeholders and allows early stopping.

### Fill in the Blank

Q251. ________ is the practice of documenting a study's hypotheses, sample size, and analysis plan before data collection to prevent p-hacking.
Answer: Pre-registration

Q252. ________ is a measure of effect size for proportions — the difference in conversion rates between control and treatment.
Answer: Absolute lift (or absolute risk difference)

Q253. ________ is the ratio of conversion rates between treatment and control — a relative measure of effect size.
Answer: Relative lift (or relative risk)

Q254. ________ is a sequential testing method allowing valid inferences at any point during an A/B test without inflating Type I error.
Answer: Sequential testing (or always-valid inference, e-values)

Q255. ________ analysis examines treatment effects within demographic or behavioral subgroups.
Answer: Subgroup (or segmentation) analysis

Q256. ________ is a method for assigning users to variants that ensures balanced demographic distributions between groups.
Answer: Stratified randomization

Q257. ________ is an experiment analysis technique accounting for pre-experiment differences using baseline covariates to reduce variance.
Answer: CUPED (Controlled-experiment Using Pre-Experiment Data) or ANCOVA

Q258. ________ is the proportion of users who should see the treatment but actually receive the control, violating the assignment.
Answer: Non-compliance (or LATE — Local Average Treatment Effect analysis)

Q259. ________ is the sample size calculation input representing the smallest business-meaningful improvement worth detecting.
Answer: Minimum Detectable Effect (MDE)

Q260. ________ is a testing approach where the metric of interest improves by moving the threshold on a model's output rather than changing the model.
Answer: Threshold optimization experiment

---

## TOPIC 13: DATA ENGINEERING FOR DATA SCIENTISTS

### Concept MCQ

Q261. What is a data pipeline?
A) A physical pipe for data B) An automated sequence of steps for ingesting, transforming, and loading data from sources to destinations for analysis or model training C) A database D) A visualization tool
Answer: B — Data pipelines are the infrastructure underlying all data science work.

Q262. What is ETL vs ELT?
A) Two acronyms B) ETL (Extract, Transform, Load) transforms data before loading into the warehouse; ELT (Extract, Load, Transform) loads raw data first and transforms in the warehouse — modern cloud warehouses prefer ELT C) ETL is always better D) ELT is only for streaming
Answer: B — ELT leverages the processing power of cloud data warehouses like BigQuery and Snowflake.

Q263. What is a data warehouse?
A) Physical data storage B) A centralized repository optimized for analytical queries — storing historical, structured data organized around business subjects C) An operational database D) A data lake
Answer: B — Examples: Amazon Redshift, Google BigQuery, Snowflake, Azure Synapse.

Q264. What is a data lake?
A) A water feature B) A centralized repository storing raw data in its native format (structured, semi-structured, unstructured) at scale, with schema applied at query time C) A data warehouse D) A file system
Answer: B — Data lakes store all data upfront; warehouses store structured, processed data.

Q265. What is a data lakehouse?
A) A lake house B) An architecture combining the flexibility of data lakes with the structure and query performance of data warehouses — Delta Lake, Apache Iceberg C) A hybrid database D) A NoSQL database
Answer: B — The lakehouse architecture is increasingly adopted (Databricks Delta Lake, Snowflake, BigQuery).

Q266. What is Spark?
A) An electricity concept B) A distributed computing framework for large-scale data processing — provides APIs for batch processing, streaming, SQL, machine learning (MLlib), and graph processing C) A database D) A visualization tool
Answer: B — PySpark allows data scientists to write Spark jobs in Python for processing terabytes of data.

Q267. What is a feature store?
A) A feature shopping site B) A centralized system for storing, versioning, and serving ML features consistently across training and serving, preventing training-serving skew C) A model registry D) A data warehouse
Answer: B — Feature stores (Feast, Tecton, Vertex AI Feature Store) are a key MLOps component.

Q268. What is data lineage?
A) Data family tree B) The tracking of data's origin, transformations, and movement through a system — enabling debugging, compliance, and understanding of data quality issues C) Data versioning D) Data documentation
Answer: B — Data lineage is required for regulatory compliance (GDPR, financial regulations) and debugging pipelines.

Q269. What is a slowly changing dimension (SCD)?
A) A slowly loading table B) A concept in data warehousing describing how dimension attributes change over time — Type 1 (overwrite), Type 2 (new row with history), Type 3 (add column) C) A partitioned table D) A fact table
Answer: B — SCD Type 2 is most common — it preserves full history by adding a new row with start/end dates.

Q270. What is Apache Kafka?
A) A database B) A distributed event streaming platform for high-throughput, fault-tolerant, real-time data pipelines and stream processing C) A batch processor D) A file storage system
Answer: B — Kafka is the standard for real-time data streaming between systems at scale.

### Fill in the Blank

Q271. ________ is an open-source workflow orchestration tool for scheduling and monitoring data pipelines as directed acyclic graphs.
Answer: Apache Airflow

Q272. ________ is a cloud-native data transformation framework using SQL, enabling analysts to define transformations as version-controlled models.
Answer: dbt (data build tool)

Q273. ________ is a columnar storage format that is highly compressed and efficient for analytical queries.
Answer: Parquet (or ORC)

Q274. ________ partitioning divides a large table into smaller pieces based on a column value (e.g., date), speeding up queries that filter on that column.
Answer: Table partitioning (or horizontal partitioning)

Q275. ________ is a data quality framework ensuring data meets defined expectations for completeness, uniqueness, and validity.
Answer: Great Expectations (or dbt tests, Soda)

---

## TOPIC 14: CAUSAL INFERENCE

### Concept MCQ

Q276. What is the fundamental problem of causal inference?
A) Correlation vs causation B) We can never observe both potential outcomes for the same unit simultaneously — we observe either the treated or control outcome, never both C) Missing data D) Selection bias
Answer: B — This fundamental problem is why randomization and quasi-experimental methods are needed.

Q277. What is a counterfactual?
A) A false fact B) The hypothetical outcome that would have occurred under the alternative condition — "what would have happened if the user had not received the treatment?" C) A causal estimate D) A statistical control
Answer: B — Causal inference is fundamentally about estimating counterfactuals.

Q278. What is a randomized controlled trial (RCT)?
A) A regulated trial B) An experiment where subjects are randomly assigned to treatment or control groups, ensuring both groups are comparable on all measured and unmeasured confounders C) An observational study D) A survey
Answer: B — RCTs are the gold standard for causal inference because randomization breaks confounding.

Q279. What is a difference-in-differences (DiD) design?
A) Two minus two B) A quasi-experimental method comparing the change in outcomes for a treatment group before and after an intervention to the change in a control group over the same period C) A regression method D) A matching method
Answer: B — DiD controls for time-invariant confounders and common time trends.

Q280. What is regression discontinuity design (RDD)?
A) A regression type B) A quasi-experimental method exploiting a discontinuity in treatment assignment at a cutoff value, comparing outcomes just above and below the threshold C) A difference-in-differences D) An instrumental variable
Answer: B — Assumes the only discontinuity at the cutoff is in treatment — local randomization near the threshold.

Q281. What is an instrumental variable (IV)?
A) A musical instrument B) A variable that affects treatment assignment but has no direct effect on the outcome, used to estimate causal effects in the presence of unmeasured confounding C) A control variable D) A moderating variable
Answer: B — Classic IVs: proximity to college as an instrument for education, lottery assignment for program participation.

Q282. What is propensity score matching?
A) Matching scores B) A method balancing treatment and control groups by matching or weighting units by their probability of receiving treatment given observed covariates C) A regression method D) A stratification method
Answer: B — Propensity score matching removes bias from observed confounders but not unobserved ones.

Q283. What is the SUTVA assumption?
A) A statistical test B) Stable Unit Treatment Value Assumption — the potential outcome for one unit is unaffected by the treatment of other units (no spillover or interference) C) A regression assumption D) A sampling assumption
Answer: B — SUTVA violation occurs in social networks, marketplaces, and epidemics.

Q284. What is mediation analysis?
A) Conflict resolution B) Decomposing a total causal effect into the direct effect and the indirect effect that operates through a mediating variable C) A regression variant D) A correlation analysis
Answer: B — Mediation analysis answers "through what mechanism does X affect Y?"

Q285. What is a directed acyclic graph (DAG) in causal inference?
A) A graph algorithm B) A graphical model representing variables as nodes and causal relationships as directed edges without cycles — used to identify confounders and valid adjustment sets C) A network diagram D) A decision tree
Answer: B — DAGs are the formal language of causal assumptions. Tools: dagitty, bnlearn.

### Fill in the Blank

Q286. ________ is the causal effect estimated on the units who actually received treatment due to the instrument.
Answer: Local Average Treatment Effect (LATE)

Q287. ________ is the average causal effect of treatment across the entire population.
Answer: Average Treatment Effect (ATE)

Q288. ________ is the causal effect of treatment specifically on the treated units.
Answer: Average Treatment Effect on the Treated (ATT)

Q289. ________ analysis checks whether the DiD parallel trends assumption holds by testing pre-treatment trends.
Answer: Placebo test (or pre-trend test)

Q290. ________ is a method using ML to estimate heterogeneous treatment effects — how treatment effects vary across individual characteristics.
Answer: Causal forests (or Generalized Random Forests, meta-learners like T-learner, X-learner)

---

## TOPIC 15: DEEP LEARNING FOR DATA SCIENCE

### Concept MCQ

Q291. What is a multilayer perceptron (MLP)?
A) A single neuron B) A feedforward neural network with one or more hidden layers of neurons, each applying a weighted sum followed by a nonlinear activation function C) A CNN D) An RNN
Answer: B — MLPs are the basic building block of deep learning for tabular data.

Q292. What is batch normalization?
A) Normalizing the dataset B) Normalizing activations within each mini-batch during training to stabilize learning, enabling higher learning rates and reducing sensitivity to initialization C) A regularization technique D) A dropout variant
Answer: B — Batch normalization is a key component in most deep learning architectures.

Q293. What is the Adam optimizer?
A) A person's name B) An adaptive learning rate optimizer combining momentum and RMSProp, computing per-parameter learning rates based on first and second moment estimates C) A gradient descent variant D) A loss function
Answer: B — Adam is the default optimizer for most deep learning tasks.

Q294. What is transfer learning for tabular data?
A) Moving data between servers B) Adapting pretrained models (often trained on large datasets or related tasks) to new tabular tasks, reducing data requirements C) A data pipeline D) Feature engineering
Answer: B — Examples: TabNet, SAINT, and foundation models for tabular data (TabPFN).

Q295. What is an autoencoder used for in data science?
A) Data encryption B) Unsupervised dimensionality reduction and anomaly detection — encoding inputs to a low-dimensional latent space and reconstructing them; high reconstruction error signals anomaly C) A classification model D) A generative model only
Answer: B — Autoencoders are particularly useful for anomaly detection in unlabeled datasets.

Q296. What is a variational autoencoder (VAE)?
A) A variable autoencoder B) A generative model learning a continuous latent space by encoding inputs as distributions rather than points, enabling generation of new samples C) A dimensionality reduction tool only D) A classification model
Answer: B — VAEs are used for data generation, interpolation, and semi-supervised learning.

Q297. What is a Graph Neural Network (GNN) and when is it used for data science?
A) A graph drawing tool B) A neural network operating on graph-structured data — used when data has relational structure (social networks, molecules, knowledge graphs, fraud detection) C) A CNN variant D) A recurrent network
Answer: B — GNNs aggregate information from neighbors to produce node/graph representations.

Q298. What is early stopping in deep learning?
A) Stopping training after one epoch B) Monitoring validation loss and stopping training when it stops improving, saving the best checkpoint — a regularization technique preventing overfitting C) A learning rate schedule D) A batch size technique
Answer: B — Essential for neural networks which can overfit if trained too long.

Q299. What is the dying ReLU problem?
A) Broken hardware B) When a ReLU neuron receives mostly negative inputs and always outputs zero — its gradient is also zero, so it never updates and effectively dies C) A gradient explosion D) An overfitting issue
Answer: B — Addressed by Leaky ReLU, ELU, or careful initialization.

Q300. What is learning rate scheduling?
A) Planning learning sessions B) Dynamically adjusting the learning rate during training — warm-up (starting low), decay (reducing over epochs), or cyclical schedules — to improve convergence C) Setting the learning rate D) Batch size adjustment
Answer: B — Cosine annealing and one-cycle policy are popular schedules.

### Fill in the Blank

Q301. ________ is a regularization technique that reduces the effective model capacity by penalizing large weights using L2 norm.
Answer: Weight decay

Q302. ________ is the process of converting categorical features into dense vector representations through an embedding layer in neural networks.
Answer: Entity embedding

Q303. ________ is a neural network training technique where gradients are computed on small random subsets (mini-batches) rather than the full dataset.
Answer: Mini-batch gradient descent (SGD)

Q304. ________ is a technique addressing vanishing gradients in deep networks by adding direct connections bypassing one or more layers.
Answer: Skip connections (residual connections)

Q305. ________ is a Python deep learning library from Facebook/Meta known for dynamic computation graphs and ease of debugging.
Answer: PyTorch

---

## TOPIC 16: RECOMMENDATION SYSTEMS

### Concept MCQ

Q306. What is collaborative filtering?
A) Filtering similar users B) Recommending items based on the preferences of users with similar behavior — either user-based (similar users) or item-based (similar items) C) Content-based filtering D) A hybrid method
Answer: B — Collaborative filtering does not require item content knowledge.

Q307. What is content-based filtering?
A) Filtering by content type B) Recommending items similar to what a user has liked before, based on item features (genre, author, attributes) matched to user preferences C) Collaborative filtering D) A hybrid method
Answer: B — Content-based filtering does not require other users' data.

Q308. What is the cold start problem in recommender systems?
A) A hardware issue B) The inability to make recommendations for new users (no history) or new items (no interactions) — collaborative filtering fails without historical data C) A scalability issue D) A data quality issue
Answer: B — Addressed with content-based features, onboarding preferences, and popularity-based fallbacks.

Q309. What is matrix factorization in recommendation?
A) Multiplying matrices B) Decomposing the user-item interaction matrix into lower-dimensional user and item embedding matrices whose dot product approximates the original ratings C) A clustering method D) A content-based method
Answer: B — SVD, ALS (Alternating Least Squares), and NMF are common factorization approaches.

Q310. What is implicit feedback?
A) Hidden feedback B) User interaction signals that indirectly indicate preference — clicks, views, purchase history, time spent — as opposed to explicit ratings C) Negative feedback D) Anonymous feedback
Answer: B — Most real-world recommendation data is implicit. Interpreting absence is tricky (did not buy = dislike, or simply not seen?).

Q311. What is a two-tower model in recommendation?
A) A two-stage model B) A neural architecture encoding users and items separately in parallel towers into a shared embedding space, enabling efficient retrieval via approximate nearest neighbors C) A multi-layer model D) A sequential model
Answer: B — Two-tower models scale to billions of items; used by YouTube, Pinterest, and others.

Q312. What is NDCG (Normalized Discounted Cumulative Gain)?
A) A loss metric B) A ranking metric measuring the quality of recommendation ordering — gives more credit to relevant items appearing higher in the list, normalized by the ideal ordering C) An accuracy metric D) A precision metric
Answer: B — NDCG@k is the standard offline evaluation metric for recommendation systems.

Q313. What is the explore-exploit tradeoff in recommendations?
A) A business decision B) Balancing recommending items the user is likely to enjoy (exploit) with occasionally recommending novel items to learn new preferences (explore) C) A training decision D) A hyperparameter tuning decision
Answer: B — Over-exploitation leads to filter bubbles; over-exploration reduces engagement.

Q314. What is session-based recommendation?
A) Log-in session B) Recommending items based on a user's actions within the current session, without relying on long-term history — important for anonymous users C) A collaborative approach D) A content-based approach
Answer: B — GRU4Rec, SASRec, and BERT4Rec are session-based recommendation models.

Q315. What is a knowledge graph in recommendation?
A) A map B) A structured representation of entities and relationships used to enrich recommendations with side information — product attributes, user demographics, item hierarchies C) A neural network D) A content filter
Answer: B — Knowledge graphs improve recommendation diversity and explainability.

---

## TOPIC 17: GEOSPATIAL AND SPECIALIZED DATA

### Concept MCQ

Q316. What is geospatial data?
A) Space exploration data B) Data with a geographic component — coordinates, shapes, regions — describing the location and spatial relationships of features on Earth C) GPS data only D) Satellite imagery
Answer: B — Geospatial data enables location-based analysis, mapping, and spatial modeling.

Q317. What is a choropleth map?
A) A map type B) A thematic map using color intensity to represent the value of a variable within geographic regions (counties, countries, zip codes) C) A scatter plot on a map D) A satellite image
Answer: B — Common in epidemiology, election analysis, and business territory mapping.

Q318. What is spatial autocorrelation?
A) GPS correlation B) The tendency for nearby geographic features to have similar values — violating the independence assumption and requiring spatial models C) GPS accuracy D) A mapping artifact
Answer: B — Moran's I measures spatial autocorrelation. Spatial regression models account for it.

Q319. What is a GIS?
A) A graphics system B) Geographic Information System — software for capturing, storing, analyzing, and visualizing geospatial data C) A government database D) A GPS system
Answer: B — Tools: QGIS (open source), ArcGIS, GeoPandas (Python).

Q320. What is H3?
A) A chemical formula B) Uber's hexagonal hierarchical geospatial indexing system, dividing Earth into hexagonal cells at multiple resolution levels for efficient spatial analysis C) A GPS format D) A map projection
Answer: B — H3 enables efficient aggregation, join, and analysis of geospatial data at multiple scales.

---

## TOPIC 18: BAYESIAN DATA ANALYSIS

### Concept MCQ

Q321. What is a prior distribution in Bayesian analysis?
A) An initial guess B) A probability distribution representing beliefs about a parameter before observing data — encoding domain knowledge and uncertainty C) The final answer D) A likelihood
Answer: B — Choosing an informative vs. weakly informative prior is one of the key Bayesian modeling decisions.

Q322. What is a posterior distribution?
A) The final graph B) The updated probability distribution of a parameter after combining the prior with the likelihood of observed data, via Bayes' theorem C) The raw data distribution D) The prediction
Answer: B — The posterior = prior × likelihood (normalized). It is the complete answer to a Bayesian inference problem.

Q323. What is a credible interval?
A) A confidence interval B) A Bayesian interval with a direct probability interpretation: "there is a 95% probability that the parameter falls within this interval given the data" C) A p-value D) A standard error
Answer: B — Unlike frequentist confidence intervals, credible intervals have the intuitive interpretation people often incorrectly apply to confidence intervals.

Q324. What is Markov Chain Monte Carlo (MCMC)?
A) A sequential algorithm B) A family of algorithms for sampling from probability distributions when direct sampling is intractable — building a Markov chain whose stationary distribution is the posterior C) A neural network D) A clustering method
Answer: B — PyMC and Stan implement MCMC for Bayesian models.

Q325. What is a conjugate prior?
A) A related prior B) A prior distribution where the posterior has the same functional form as the prior, enabling analytical computation without MCMC — e.g., Beta prior with Binomial likelihood C) A flat prior D) An uninformative prior
Answer: B — Conjugate priors are computationally convenient for simple models.

### Fill in the Blank

Q326. ________ is a Python probabilistic programming library for Bayesian modeling using MCMC and variational inference.
Answer: PyMC (formerly PyMC3)

Q327. ________ is a Bayesian model comparison criterion balancing model fit and complexity.
Answer: WAIC (Widely Applicable Information Criterion) or LOO-CV

Q328. ________ is the Bayesian analog of hypothesis testing — computing the probability that one model is better than another given the data.
Answer: Bayes factor

Q329. ________ is a sampling algorithm widely used in Bayesian computation that uses gradient information for more efficient exploration of the posterior.
Answer: HMC (Hamiltonian Monte Carlo) or NUTS (No-U-Turn Sampler)

Q330. ________ is the Bayesian approach to linear regression, which provides a full posterior distribution over regression coefficients rather than point estimates.
Answer: Bayesian linear regression

---

## TOPIC 19: DATA SCIENCE TOOLS AND ECOSYSTEM

### Concept MCQ

Q331. What is Jupyter Notebook?
A) A note-taking app B) An interactive computing environment combining code, visualizations, and narrative text in a browser-based interface — standard for data science exploration C) An IDE D) A database tool
Answer: B — JupyterLab is the next-generation interface. Google Colab provides free cloud-based Jupyter.

Q332. What is Git used for in data science?
A) Getting data B) Version controlling code, notebooks, and configuration files — enabling collaboration, rollback, and reproducibility C) A pipeline tool D) A database
Answer: B — Version control is essential for reproducible data science and team collaboration.

Q333. What is Docker used for in data science?
A) Shipping containers B) Packaging code, dependencies, and configuration into portable containers — ensuring reproducibility across different machines and deployment environments C) A version control tool D) A cloud service
Answer: B — Docker solves "it works on my machine" by containerizing the entire environment.

Q334. What is MLflow?
A) A data flow tool B) An open-source platform for managing the ML lifecycle — experiment tracking, model versioning, packaging, and deployment C) A visualization tool D) A data pipeline
Answer: B — MLflow integrates with sklearn, XGBoost, PyTorch, and most ML frameworks.

Q335. What is DVC (Data Version Control)?
A) A video codec B) A version control system for data and ML models — tracking large files, data pipelines, and experiments alongside code in Git C) A database tool D) A deployment platform
Answer: B — DVC enables reproducible ML experiments by versioning data alongside code.

Q336. What is a Makefile in a data science project?
A) A factory tool B) A build automation tool defining commands to run pipelines, tests, and common tasks — providing a self-documenting interface for project workflows C) A Python file D) A shell script
Answer: B — make train, make test, make clean are common patterns in reproducible data science projects.

Q337. What is a virtual environment in Python?
A) A cloud environment B) An isolated Python environment with its own packages and interpreter, preventing dependency conflicts between projects C) A Docker container D) A Jupyter kernel
Answer: B — Use venv, conda, or poetry to manage project-specific dependencies.

Q338. What is Weights and Biases (W&B)?
A) A gym tool B) A platform for experiment tracking, visualization, hyperparameter sweep management, and model artifact versioning in ML projects C) A data pipeline D) A visualization library
Answer: B — W&B is widely used alongside MLflow for deep learning experiment management.

Q339. What is DuckDB?
A) A duck database B) An in-process analytical SQL database optimized for OLAP queries on local files (Parquet, CSV), providing fast analytics without a separate server C) A cloud database D) A NoSQL database
Answer: B — DuckDB enables fast SQL analytics on large files directly from Python or the command line.

Q340. What is Polars?
A) An arctic dataset B) A fast DataFrame library written in Rust with a Python API — significantly faster than pandas for large-scale data manipulation C) A pandas variant D) A SQL tool
Answer: B — Polars uses lazy evaluation and SIMD vectorization for performance approaching Spark on a single machine.

---

## TOPIC 20: ADVANCED TOPICS IN DATA SCIENCE

### Concept MCQ

Q341. What is anomaly detection?
A) Finding mistakes B) Identifying rare observations that deviate significantly from the expected pattern — used in fraud detection, system monitoring, and quality control C) Outlier removal D) Error detection
Answer: B — Methods: Isolation Forest, One-Class SVM, Autoencoder reconstruction error, LOF.

Q342. What is survival analysis?
A) Medical analysis only B) Statistical methods for analyzing the time until an event occurs — handling censored observations where the event has not yet occurred C) Time series analysis D) Longitudinal analysis
Answer: B — Used in churn prediction, equipment failure, clinical trials. Kaplan-Meier, Cox proportional hazards.

Q343. What is the uplift model?
A) A sales lift model B) A model predicting the incremental impact of a treatment on an individual's outcome — identifying who will respond positively to a campaign C) A propensity model D) A binary classifier
Answer: B — Uplift modeling targets the "persuadables" — those who respond only when treated.

Q344. What is a propensity model?
A) A tendency model B) A model predicting the probability of a user performing an action — used for targeting, matching in observational studies, and adjusting for selection bias C) A conversion model D) A churn model
Answer: B — Propensity scores are used in matching and inverse probability weighting for causal inference.

Q345. What is a lifetime value (LTV) model?
A) A stock valuation model B) A model predicting the total revenue or profit a customer will generate over their entire relationship with a business C) A churn model D) A revenue forecast
Answer: B — LTV models combine acquisition cost, retention probability, and monetization to prioritize customer segments.

Q346. What is market basket analysis?
A) Grocery analytics only B) Analyzing purchase transaction data to discover items frequently bought together — used for cross-selling, store layout, and recommendation C) A clustering method D) A time series method
Answer: B — Apriori and FP-Growth algorithms discover association rules with support, confidence, and lift.

Q347. What is the Apriori algorithm?
A) A prior belief algorithm B) An algorithm for mining frequent itemsets and association rules by iteratively pruning combinations below a minimum support threshold C) A clustering algorithm D) A classification algorithm
Answer: B — Support: how often the itemset appears. Confidence: how often the rule holds. Lift: improvement over random.

Q348. What is a simulation in data science?
A) A fake model B) Using computational methods (Monte Carlo, agent-based) to model and analyze complex systems, estimate distributions, and evaluate decisions under uncertainty C) A visualization D) A sampling method
Answer: B — Monte Carlo simulation estimates distributions of outcomes by running many random scenarios.

Q349. What is a network graph analysis?
A) Analyzing computer networks B) Analyzing data represented as graphs (nodes and edges) to understand structure, centrality, communities, and information flow C) A plotting method D) A table analysis
Answer: B — Used in social network analysis, fraud detection, supply chain analysis, biology.

Q350. What is AutoML?
A) Self-driving ML B) Automated Machine Learning — automating feature engineering, model selection, hyperparameter tuning, and ensembling to reduce manual effort in building ML pipelines C) A specific algorithm D) A cloud service
Answer: B — Tools: H2O AutoML, TPOT, Auto-sklearn, Google AutoML, Azure AutoML.

### Fill in the Blank

Q351. ________ is a Python library for gradient boosting on decision trees developed by Microsoft, known for efficiency and categorical feature support.
Answer: LightGBM

Q352. ________ is an optimization technique for neural architecture search using evolutionary algorithms.
Answer: Neural Architecture Search (NAS)

Q353. ________ is the statistical technique for finding optimal hyperparameters by evaluating all combinations in a grid.
Answer: Grid search

Q354. ________ is the problem of a model performing well on historical data but poorly on new data due to changes in the data distribution.
Answer: Concept drift (or distribution shift)

Q355. ________ monitoring tracks model performance metrics in production to detect degradation due to data or concept drift.
Answer: Model monitoring (or model observability)

Q356. ________ is a Python library for explainability providing SHAP values for any model.
Answer: shap

Q357. ________ is the process of converting a trained model into a deployable artifact (ONNX, pickle, SavedModel) for serving.
Answer: Model serialization (or model export)

Q358. ________ is an API framework for serving ML models as REST endpoints.
Answer: FastAPI (or Flask, BentoML, Seldon)

Q359. ________ is the practice of retraining ML models periodically or on trigger to maintain performance as data changes.
Answer: Continuous training (or model refresh)

Q360. ________ is a technique for interpreting any model locally by fitting a simple interpretable model around a specific prediction.
Answer: LIME (Local Interpretable Model-agnostic Explanations)

---

## TOPIC 21: SCENARIOS — ADVANCED DATA SCIENCE

Q361. You are asked to build a churn prediction model. Walk through your complete approach.
Answer: Business framing first: define churn precisely (30-day inactivity? Account cancellation?), identify the prediction horizon (predict churn 30 days ahead?), understand business use case (targeted retention campaigns). Data: collect historical behavioral features — recency, frequency, monetary (RFM), product usage, support tickets, plan type, tenure. Define the target: churned = 1 within the next 30 days. Handle temporal leakage: features must come from before the prediction date. Class imbalance: churn rates are typically 3-15%, use SMOTE or class weighting. Model: start with logistic regression baseline, then gradient boosting (LightGBM). Evaluation: AUC-ROC, precision-recall curve, lift curves (which customers are most likely to respond to campaigns?). Explainability: SHAP values to explain predictions. Deployment: score customers weekly, pass high-risk customers to retention team. Monitor: track model discrimination and calibration over time.

Q362. A data scientist on your team shares a model with 99% accuracy on a fraud detection task. You are skeptical. What do you look for?
Answer: Several red flags. Class imbalance: fraud is typically 0.1-1% of transactions — a model predicting all transactions as legitimate achieves 99%+ accuracy without detecting any fraud. Request confusion matrix, precision, recall, and AUC-PR (precision-recall AUC). Target leakage: does any feature contain information from after the transaction or from the fraud investigation outcome? Example: a "dispute flag" field that is set during fraud review would leak the target. Temporal leakage: was training data shuffled without respect to time? Future data may have leaked into training. Overfitting: what is the performance on a truly held-out recent time period? Data issues: are there duplicate transactions in training and test? Ask to see feature importances — if a single feature dominates, investigate whether it is a legitimate predictor.

Q363. Your model performs well in offline evaluation but poorly after deployment. What do you investigate?
Answer: This is training-serving skew — differences between training and production environments. Investigate: feature distribution shift — compute statistics (mean, std, quantiles) of features in training vs production data. Are they the same? Feature computation differences — is the feature engineering in the model pipeline identical to the production pipeline? Are the same transformations applied? Preprocessing differences — are missing values, outliers, and categorical encodings handled identically? Model versioning — is the correct model version deployed? Temporal drift — is the production data from a different time period than training, with behavioral changes? Data pipeline bugs — are features arriving in the correct order/format? Population shift — is the production user population different from the training population? Establish monitoring on feature distributions and model predictions from day one.

Q364. Stakeholders want to know why your XGBoost model recommended declining a loan application. How do you explain it?
Answer: Use SHAP (SHapley Additive exPlanations) for individual prediction explanation. Compute SHAP values for the specific application. Present the top 3-5 most influential features for this prediction: "The primary factors were: debt-to-income ratio (contribution: +0.45 toward decline), short credit history (contribution: +0.32), and recent late payments (contribution: +0.28)." Convert to plain English: "Your application was primarily affected by your current debt relative to income, your credit history length, and recent payment history." Generate a waterfall plot or force plot for visual stakeholders. For regulatory compliance: ensure explanations reference only legally permissible factors, provide specific actionable items the applicant can improve, and have a process for applicants to contest decisions.

Q365. You need to forecast monthly sales for 500 product-store combinations for the next 12 months. How do you approach this at scale?
Answer: This is a large-scale time series forecasting problem. Approaches by scale: per-series models (ARIMA, ETS, Prophet) fit independently per series — feasible for 500 series with automation (auto-ARIMA, Prophet with grid search). Global models (LightGBM, DeepAR, N-BEATS, PatchTST) train one model across all series, learning shared patterns — often outperform local models especially for short series. Feature engineering: lag features, rolling statistics, date features (month, week, holiday flags), product/store embeddings. Cross-validation: use walk-forward validation respecting temporal ordering. Ensemble: average predictions from multiple approaches. Evaluation: track MAPE, SMAPE, or MASE per series and overall. Handle cold-start: for new products, use category-level or similar product forecasts. Productionize with a scheduled retraining pipeline.

---

## TOPIC 22: APPLIED SCENARIOS — BUSINESS PROBLEMS

Q366. A product manager asks you to identify the most important drivers of user engagement. What is your approach?
Answer: Engagement is multidimensional — define the metric first (DAU/MAU, session length, feature adoption, revenue). EDA: correlate candidate features with the engagement metric. Predictive modeling: build a regression or gradient boosting model with engagement as the target, then use SHAP global feature importance to rank drivers. Statistical analysis: use partial regression to estimate effects controlling for confounders. Segmentation: engagement drivers may differ by user segment — run analysis separately for cohorts. Causal analysis: distinguish correlation from causation — a feature correlated with engagement may not cause it. Recommendations: present top 5 drivers with estimated effect sizes, business interpretation, and actionable product implications. Propose A/B tests to validate causal claims for the top drivers.

Q367. Marketing asks you to build a customer segmentation model. How do you approach this?
Answer: First clarify the purpose — segmentation for targeted campaigns? Product personalization? Pricing? Data: collect behavioral (purchase history, product categories, frequency, recency), demographic (age, location), and attitudinal (survey, NPS) data. Feature engineering: RFM (Recency, Frequency, Monetary) is the standard starting point. Preprocessing: standardize features (K-means is distance-based). Algorithm selection: K-means for simplicity and interpretability, Gaussian Mixture Models for soft assignments, DBSCAN if arbitrary shapes expected, hierarchical if dendrogram analysis is needed. Choose k: elbow method (inertia), silhouette score, business interpretability. Validate: each segment must be actionable, measurable, and sufficiently different in behavior. Profile each cluster with descriptive statistics and give business names (High-Value Loyal, Occasional Buyers, At-Risk). Communicate findings with visualizations (t-SNE/PCA plots, cluster profiles).

Q368. You are asked to detect anomalies in credit card transaction data where labels are unavailable. How do you build this?
Answer: Unsupervised anomaly detection since labels are not available. Feature engineering: time-based features (transaction at unusual hour?), amount relative to user's history, merchant category, geographic velocity (two transactions in different cities simultaneously), behavioral deviation from user's typical patterns. Algorithms: Isolation Forest (fast, scales well, handles high dimensions), Local Outlier Factor (density-based, captures local anomalies), Autoencoder (reconstruction error flags anomalies), DBSCAN (noise points are anomalies). Ensemble: combine multiple methods for robustness. Threshold: tune using precision-recall tradeoff on a small set of known fraud cases if available (even without full labels). Evaluation: present to fraud analysts for review — use their feedback to refine. Deploy with a scoring system where scores above threshold go to human review queue. Monitor score distributions over time.

Q369. An executive asks: "Which of our customers are most likely to upgrade from free to paid?" How do you build this?
Answer: This is a conversion propensity model. Define the outcome: upgrade within 30/60/90 days? Identify the cohort: users on the free tier for at least X days (to ensure they had the opportunity to upgrade). Features: product usage depth (features used, sessions per week, data created), onboarding completion, email engagement, support interactions, tenure on free tier, referral source, and if available — company size, industry (B2B). Historical data: label users who upgraded within the time window. Class imbalance: free-to-paid conversion is typically low. Model: logistic regression for interpretability baseline, then LightGBM. Calibration: ensure predicted probabilities are well-calibrated for business use. Output: a ranked list of free users by upgrade probability. Action: trigger targeted upgrade campaigns for the top decile. Measure: track conversion rates and revenue lift from the campaign.

Q370. You discover that a key business metric — Daily Active Users — has suddenly dropped 20% over the past 3 days. How do you diagnose this?
Answer: Structured debugging. Data integrity first: is this real or a tracking/logging issue? Check if the data pipeline is intact, if event tracking code has changed, if there was a deployment. Segmentation: break down the drop by platform (iOS, Android, Web), geography, user cohort, acquisition channel, and product area. Identify whether the drop is concentrated in a specific segment — if yes, the issue is likely localized. Timeline: did the drop coincide with a deployment, marketing campaign pause, seasonal event, or external event (competitor launch, news event)? Funnel analysis: where in the funnel are users dropping off — acquisition, activation, or retention? Root cause: correlate the timeline with any system changes. Form hypotheses and test them with data. Communicate: provide a clear summary of findings, the likely cause, and the recommended fix to stakeholders on a defined timeline.

---

## TOPIC 23: MORE FILL IN THE BLANK — MIXED

Q371. ________ is a library providing interactive dashboards and data apps in Python without requiring JavaScript knowledge.
Answer: Streamlit (or Dash by Plotly)

Q372. ________ is the process of tracking and managing all data assets in an organization including ownership, quality, and lineage.
Answer: Data governance (or data catalog — Alation, Collibra, Atlan)

Q373. ________ is a Python library for fast Bayesian optimization of hyperparameters using tree-structured Parzen estimators.
Answer: Optuna (or Hyperopt)

Q374. ________ is the property of an ML system that produces consistent results given the same inputs and random seeds.
Answer: Reproducibility

Q375. ________ is a metric for classification comparing the model to a random baseline, equivalent to the probability of correct ranking.
Answer: AUC-ROC (Gini coefficient = 2×AUC - 1)

Q376. ________ is a Python library for spatial data manipulation and analysis, providing a pandas-like API for geospatial datasets.
Answer: GeoPandas

Q377. ________ is the process of systematically documenting a dataset's collection method, content, and intended uses.
Answer: Data card (or dataset documentation)

Q378. ________ is an evaluation framework ensuring a model performs equitably across demographic groups.
Answer: Fairness evaluation (disparate impact analysis, equal opportunity)

Q379. ________ is the practice of monitoring data pipelines for schema changes, volume drops, and distribution shifts.
Answer: Data observability (Monte Carlo, Anomalo, dbt tests)

Q380. ________ is a Python library for building and evaluating information retrieval and recommendation system pipelines.
Answer: Ranx (or Pyterrier, LightFM for recommendations)

Q381. ________ is a diagnostic chart plotting actual vs predicted values for a regression model, where a good model shows points along the diagonal.
Answer: Actual vs predicted plot

Q382. ________ is a Python library providing out-of-the-box implementations of Bayesian optimization, early stopping, and hyperparameter search.
Answer: Optuna

Q383. ________ is a statistical test comparing two paired samples to determine if their population means differ.
Answer: Paired t-test

Q384. ________ is an effect size measure for comparing two means, expressed in standard deviation units.
Answer: Cohen's d

Q385. ________ is a non-parametric alternative to the independent samples t-test.
Answer: Mann-Whitney U test (or Wilcoxon rank-sum test)

Q386. ________ is a non-parametric test for comparing more than two groups.
Answer: Kruskal-Wallis test

Q387. ________ is an analysis technique studying how a cohort of users acquired at the same time changes in behavior over subsequent time periods.
Answer: Cohort analysis

Q388. ________ is the percentage of users who return to use a product in a subsequent period after their first visit.
Answer: Retention rate

Q389. ________ is a Python library for network graph analysis and visualization.
Answer: NetworkX

Q390. ________ is a fast approximate nearest neighbor search library enabling semantic search over millions of vectors.
Answer: Faiss (Facebook AI Similarity Search) or Annoy, HNSWlib

Q391. ________ is a model evaluation technique comparing predictions to a naive baseline (always predict the mean or most frequent class).
Answer: Baseline comparison

Q392. ________ is a pandas operation concatenating DataFrames along an axis.
Answer: pd.concat()

Q393. ________ is the process of splitting a multi-valued column into multiple rows, one per value.
Answer: Explode (DataFrame.explode() in pandas)

Q394. ________ is a Python library providing ready-to-use implementations of association rule mining algorithms.
Answer: mlxtend

Q395. ________ is a data quality dimension measuring the percentage of records where a required field has a value.
Answer: Completeness

Q396. ________ is a SQL analytic function returning the cumulative distribution (percentile rank) of each row.
Answer: CUME_DIST() or PERCENT_RANK()

Q397. ________ is a technique for visualizing high-dimensional data by projecting onto two dimensions using eigendecomposition of the covariance matrix.
Answer: PCA (Principal Component Analysis)

Q398. ________ is the ratio of within-cluster inertia to between-cluster separation, minimized in optimal k-means solutions.
Answer: Elbow metric (inertia or within-cluster sum of squares)

Q399. ________ is a machine learning approach for reducing label noise by using model predictions to correct potentially mislabeled training examples.
Answer: Confident Learning (or cleanlab)

Q400. ________ is the practice of testing ML models on specific challenging subsets to reveal failure modes not visible in aggregate metrics.
Answer: Slice-based evaluation (or behavioral testing)

---

## TOPIC 24: APPLIED FILL IN THE BLANK — ALGORITHMS

Q401. ________ distance measures similarity between two vectors as the cosine of the angle between them — range from -1 to 1.
Answer: Cosine similarity

Q402. ________ is an algorithm finding the minimum spanning tree of a graph used in hierarchical clustering (single linkage).
Answer: Prim's or Kruskal's algorithm

Q403. ________ is a clustering algorithm assigning points to clusters based on the density of surrounding points.
Answer: DBSCAN (Density-Based Spatial Clustering of Applications with Noise)

Q404. ________ is a dimensionality reduction technique preserving pairwise distances using kernel methods.
Answer: Kernel PCA

Q405. ________ is a metric learning technique that trains embeddings such that similar pairs are closer and dissimilar pairs are farther.
Answer: Contrastive learning (or triplet loss, Siamese networks)

Q406. ________ is an ensemble learning method where the final model is a weighted vote of classifiers trained on resampled datasets.
Answer: Bagging (Bootstrap Aggregating)

Q407. ________ is the expected improvement criterion in Bayesian optimization guiding the next hyperparameter to evaluate.
Answer: Acquisition function (Expected Improvement, UCB)

Q408. ________ is a regression tree method that partitions the feature space into rectangular regions and fits a constant in each.
Answer: Decision tree regression (or CART)

Q409. ________ is the entropy-based impurity measure used in classification trees to evaluate splits.
Answer: Information gain (entropy reduction)

Q410. ________ is a fast approximate nearest neighbor method using random projection trees.
Answer: Annoy (Approximate Nearest Neighbors Oh Yeah) or LSH (Locality-Sensitive Hashing)

---

## TOPIC 25: SCENARIO — STATISTICS AND EXPERIMENTAL

Q411. Your company runs an A/B test and finds a statistically significant result (p=0.02) but the business team is excited about a subgroup showing p<0.001. What do you advise?
Answer: The subgroup result is almost certainly a false discovery. With multiple subgroup comparisons, the probability of finding at least one significant result by chance increases dramatically — the multiple comparisons problem. The overall test was the pre-specified primary endpoint; subgroup analyses are exploratory only. Apply a Bonferroni or Benjamini-Hochberg correction if multiple subgroups were tested. The correct approach: pre-specify which subgroup analyses will be conducted before seeing data. Treat any unplanned subgroup finding as a hypothesis to be tested in a new dedicated experiment. Report the uncorrected finding as exploratory only and design a follow-up test to confirm it.

Q412. You run a regression and the residuals clearly show a fan-shaped pattern expanding with fitted values. What is this and how do you fix it?
Answer: Heteroscedasticity — non-constant variance of residuals. The standard error estimates are incorrect, making hypothesis tests and confidence intervals unreliable (though coefficients are still unbiased). Solutions: transform the dependent variable (log or square root often stabilizes variance), use weighted least squares (WLS) where weights are inversely proportional to variance, use heteroscedasticity-robust standard errors (Huber-White sandwich estimator). Confirm with the Breusch-Pagan or White test. The log transformation is the most common practical fix for right-skewed continuous outcomes.

Q413. A client has 3 months of transaction data and asks you to forecast sales for the next 12 months. What concerns do you raise?
Answer: Major concerns. Insufficient history: 3 months captures only one season — you cannot reliably estimate annual seasonality. Any seasonal model (SARIMA, Prophet with yearly seasonality) will be unreliable. Model uncertainty: with limited data, confidence intervals will be very wide. The further out you forecast, the more uncertain. Recommendations: be explicit about limitations. Use a simple model (trend + naive seasonality from industry benchmarks). Request any historical data that exists in other systems (even aggregate-level). Supplement with external data (industry trends, market reports). Provide wide prediction intervals and scenarios (optimistic, pessimistic, expected). Revisit the forecast as more data accumulates. Never present point forecasts as certain — communicate uncertainty clearly.

Q414. You are asked to prove that your new model is better than the current production model. How do you do this rigorously?
Answer: Offline comparison: run both models on a held-out dataset representative of production. Use the appropriate metrics for the business problem. Test for statistical significance — McNemar's test for classification, paired t-test or Wilcoxon test on metrics across cross-validation folds. Compute effect size — not just significance. Online evaluation: shadow deployment (run new model without using its output), then A/B test with real users (random traffic split, compare business metrics). The online A/B test is the gold standard — offline performance does not always translate to online improvement. Define success criteria before starting: what improvement magnitude justifies the cost of deployment? Duration: run long enough for statistical power and to observe weekly/seasonal patterns.

Q415. Two different data scientists built models on the same data — one reports 85% accuracy, one reports 72% accuracy. They claim to be solving the same problem. How do you reconcile this?
Answer: Many possible explanations. Different train/test splits: if one used a random 80/20 split and another used a time-based split, the former is likely optimistic. Different preprocessing: handling of missing values, outliers, or class imbalance. Data leakage: the higher-accuracy model may have a feature with information about the target. Different evaluation datasets: different test set compositions (class balance, time period). Different metrics: some "accuracy" metrics are more lenient than others. Different target definitions: subtle differences in how positive cases were labeled. To reconcile: establish a common evaluation protocol — same train/test split (ideally time-based), same target definition, same metrics. Evaluate both models on a single locked holdout set. Inspect features of the higher-accuracy model for leakage.

---

## TOPIC 26: FINAL SCENARIO TOPICS

Q416. How do you approach a new data science problem you have never encountered before?
Answer: Structured approach. Problem framing: what decision does this inform? What is success? What data is available? Literature review: has this problem been solved before? Check papers, Kaggle, GitHub. EDA: understand the data before modeling. Baseline: establish the simplest possible model — naive predictor, simple heuristic, or logistic regression. Iterative improvement: add complexity only where it demonstrably helps. Evaluation: match the metric to the business objective. Communication: explain what the model does and does not do, document assumptions. Deploy carefully: test on recent data before production. Monitor: track performance post-deployment.

Q417. How do you communicate a complex model finding to a non-technical executive?
Answer: Lead with the business insight, not the method. Structure: what we found → why it matters → what we recommend → confidence level. Avoid technical jargon — translate to business language. Use visuals: one clear chart is worth more than a table of numbers. Quantify impact in business terms: "this model can increase revenue by $X" not "AUC improved by 0.05." Explain uncertainty: "we are 90% confident the effect is positive but the exact magnitude is between $X and $Y." Anticipate questions: be ready to explain the data, the limitations, and the next steps. Invite questions rather than defending the model.

Q418. What is the most important non-technical skill for a data scientist?
Answer: Communication and problem framing. The ability to translate between business questions and analytical problems is what separates impactful data scientists from technically skilled ones who solve the wrong problem. This includes: asking the right clarifying questions, understanding the stakeholder's actual decision, communicating uncertainty honestly, influencing without authority, and knowing when not to build a model. Technical skills get you to the answer. Communication determines whether the answer changes anything.

Q419. You are given unlimited compute and data for a problem. How does your approach change?
Answer: Unlimited resources do not change the fundamentals. Still start with EDA, problem framing, and baselines — understanding the data is always the first step and compute does not help here. With unlimited compute: you can train larger ensembles and neural networks, run exhaustive hyperparameter search, train on the full dataset without sampling, run more extensive cross-validation, train foundation models from scratch. With unlimited data: focus on data quality over quantity (more bad data is worse), model capacity becomes more important, better measurement of rare phenomena. The discipline of starting simple remains — the simplest model explaining the data is preferred. Unlimited resources do not eliminate the need for interpretability, fairness evaluation, or deployment considerations.

Q420. What is the biggest mistake data scientists make in practice?
Answer: Building models without first deeply understanding the business problem and the data. This manifests as: solving the wrong problem precisely, building a model when a simple heuristic would suffice, ignoring data quality issues that invalidate the entire analysis, optimizing offline metrics that do not correlate with business impact, and deploying models without monitoring. The second-most common mistake is leakage — accidentally including future information in features, producing models that appear impressive but fail in production. The third is confusing correlation with causation and making recommendations that, when acted on, produce no effect because the variable was a symptom, not a cause.

---

## TOPIC 27: MORE ADVANCED CONCEPTS

Q421. What is Simpson's Paradox?
Answer: A statistical phenomenon where a trend appears in multiple groups of data but disappears or reverses when the groups are combined. Classic example: a treatment appears effective for both men and women separately but appears harmful in the combined dataset because women (who have worse baseline outcomes) received the treatment more often. Resolution requires understanding and controlling for the confounding variable (gender in this case) rather than analyzing aggregated data.

Q422. What is Goodhart's Law in data science?
Answer: "When a measure becomes a target, it ceases to be a good measure." Once a metric is used to evaluate and reward performance, people optimize for the metric rather than the underlying goal. Example: optimizing CTR leads to clickbait; optimizing watch time led to addictive but low-quality content. Data scientists must design metrics that are hard to game and represent the true objective, and monitor for proxy metric optimization at the expense of the actual goal.

Q423. What is the difference between a generative and discriminative model in data science?
Answer: Discriminative models learn the decision boundary between classes directly — modeling P(y|x). They are typically more accurate for classification. Generative models learn the joint distribution P(x,y) or P(x) — modeling how data is generated. They can generate new samples, handle missing data, and enable transfer. In practice: Random Forest, XGBoost = discriminative. GMM, VAE, GAN = generative. The choice depends on the task — if you only need to classify, discriminative usually wins. If you need to generate or model uncertainty, generative models are necessary.

Q424. What is a data mesh architecture?
Answer: A decentralized data architecture treating data as a product, where domain teams own and serve their own data products rather than having a central data engineering team as a bottleneck. Principles: domain ownership of data, data as a product, self-serve data infrastructure, and federated computational governance. Contrasts with centralized data lake/warehouse architectures. Addresses scaling problems in large organizations where centralized teams cannot serve all analytical needs quickly.

Q425. What is the difference between batch and streaming data processing?
Answer: Batch processing accumulates data over a period and processes it in bulk — efficient for large volumes, high latency (hourly, daily, weekly results). Streaming processes data in real time as events arrive — low latency (milliseconds to seconds) but more complex infrastructure. Most data science applications use batch. Real-time use cases (fraud detection, dynamic pricing, live dashboards) require streaming. Lambda architecture combines batch (for accuracy) and streaming (for speed) layers. Tools: Batch: Spark, dbt, SQL. Streaming: Apache Kafka, Flink, Spark Streaming.

Q426. What is feature drift vs label drift vs concept drift?
Answer: Feature drift: the distribution of input features P(X) changes over time — e.g., user demographics shift as the product grows. Label drift: the distribution of the target variable P(Y) changes — e.g., fraud rate increases. Concept drift: the relationship between features and target P(Y|X) changes — e.g., fraudsters adopt new behaviors that look different from historical fraud. Feature drift is detected by monitoring feature distributions. Concept drift requires monitoring model performance on recent labeled data. Label drift requires monitoring outcome rates. All three degrade model performance and require retraining.

Q427. What is the difference between model monitoring and model observability?
Answer: Model monitoring tracks predefined metrics — prediction distribution, feature distributions, performance metrics — and alerts when thresholds are exceeded. Model observability is a broader concept: the ability to understand and debug any model behavior by having the right data, tools, and processes — including logging all inputs and outputs, enabling ad-hoc investigation, and understanding why a specific prediction was made. Monitoring is proactive alerting; observability enables investigation. Both are required for production ML systems.

Q428. What is a feature interaction and why does it matter?
Answer: A feature interaction occurs when the effect of one feature on the outcome depends on the value of another feature. Example: marketing spend has a higher return in urban areas than rural areas — spend × location is an interaction. Tree-based models capture interactions implicitly. Linear models require explicit interaction terms. SHAP interaction values and Partial Dependence Interaction Plots reveal feature interactions. Missing interactions in linear models leads to model misspecification and biased coefficients.

Q429. What is the curse of dimensionality and how does it affect data science work?
Answer: As the number of dimensions increases, data becomes increasingly sparse — the volume of the space grows exponentially while the number of data points remains constant. Effects: distance metrics become less meaningful (all points are approximately equidistant), requiring exponentially more data to fill space, models need more regularization, visualization becomes impossible. Practical implications: feature selection and dimensionality reduction become critical with many features, sparse data problems worsen, and overfitting risk increases. Solutions: PCA, L1 regularization, feature selection, careful feature engineering.

Q430. What is the difference between interpolation and extrapolation in data science modeling?
Answer: Interpolation is predicting within the range of training data — where the model has seen examples and can make reliable predictions. Extrapolation is predicting outside the training data range — where the model has no direct evidence and often fails catastrophically, especially tree-based models (which predict the last seen value) and linear models (which assume linearity extends infinitely). Time series forecasting is inherently extrapolation. Always check if predictions fall within the training distribution before trusting them.

Q431. What is model compression and why is it important for data science deployment?
Answer: Model compression reduces model size and inference time while minimizing accuracy loss. Techniques: pruning (removing unimportant weights or neurons), quantization (using fewer bits for weights — INT8 instead of FP32), knowledge distillation (training a small student model to mimic a large teacher), and architecture search (finding smaller architectures). Important for deployment on resource-constrained environments (mobile devices, embedded systems, low-latency APIs) and reducing serving costs at scale.

Q432. What is counterfactual fairness?
Answer: A fairness criterion requiring that a prediction for an individual would be the same in a world where the individual belonged to a different demographic group, holding all causally downstream attributes constant. It is a causal fairness notion — addressing bias that operates through causal pathways from sensitive attributes to outcomes. More demanding than statistical fairness criteria (demographic parity, equalized odds) because it requires a causal model of the data generating process.

Q433. What is the difference between statistical significance and practical significance?
Answer: Statistical significance (p < 0.05) means the observed effect is unlikely to be due to chance given the sample size. Practical significance means the effect is large enough to matter in the real world. With a large enough sample, any trivially small effect becomes statistically significant. Example: a drug reduces blood pressure by 0.1 mmHg — statistically significant with 1M patients, but clinically meaningless. Always report effect sizes (Cohen's d, odds ratio, relative risk) alongside p-values. For business decisions, focus on practical significance — "is this improvement worth acting on?"

Q434. What is spurious correlation and how do you guard against it?
Answer: A spurious correlation is a statistical association between two variables that is not causal — arising from a common cause (confounder), coincidence, or data artifacts. Famous examples: Nicolas Cage films correlate with swimming pool drownings (both correlate with summer). Protection: always think causally before concluding from correlation, use domain knowledge to identify plausible causal mechanisms, look for confounders, run controlled experiments when possible, be skeptical of surprising correlations in high-dimensional datasets (multiple comparisons inflate false discoveries).

Q435. What is a robust statistic?
Answer: A statistic that is not greatly affected by outliers or departures from model assumptions. The median is robust (outliers do not shift it much); the mean is not. Median absolute deviation (MAD) is a robust measure of spread; standard deviation is not. Spearman correlation is robust to outliers; Pearson is not. Robust statistics are preferred when data has heavy tails, outliers, or non-normal distributions — common in real-world datasets.

---

## TOPIC 28: MORE SCENARIO QUESTIONS

Q436. Your data pipeline suddenly produces null values in a critical feature that was previously fully populated. What do you do?
Answer: Treat as a data incident. First assess impact: how many records are affected? When did it start? Identify the root cause: pipeline code change, upstream schema change, data source issue, or infrastructure failure. Do not immediately impute — understand why before deciding on a fix. Immediate actions: if the pipeline feeds a production model, assess whether predictions are still reliable with the missing feature. If not, consider falling back to a previous model version or implementing a fallback prediction. Fix the pipeline bug and backfill affected records if possible. Implement monitoring: add data quality checks (null rate, schema validation) to detect this class of issue automatically in the future.

Q437. You are given a dataset from a clinical trial. The treatment group has better outcomes, but you notice the treatment group patients also had slightly higher baseline health scores. How do you handle this?
Answer: The baseline health difference means the groups are not comparable — randomization may have failed or was incomplete. Approach: compare all baseline characteristics between groups (Table 1 in clinical research). If groups differ on measured baseline variables, use regression adjustment (include baseline health score as a covariate), propensity score matching (match treatment and control patients on all baseline characteristics), or inverse probability weighting. If differences are small and randomization is confirmed, the regression-adjusted analysis is appropriate. Report both unadjusted and adjusted estimates. Acknowledge that unmeasured confounders (unmeasured baseline differences) could still bias results if randomization was truly compromised.

Q438. You built a model six months ago. The product team wants to know if it is still working well. How do you assess this?
Answer: Multi-dimensional assessment. Prediction distribution: have the model's output scores shifted — are they more extreme or more compressed than at deployment? Feature distributions: compute PSI (Population Stability Index) or KL divergence for each feature comparing current vs training distribution. Performance metrics: if ground truth labels are available (e.g., fraud labels come back after investigation), compute current AUC, precision, recall and compare to deployment metrics. Business metrics: is the model's downstream business metric (e.g., fraud caught per $1M in transactions) still at the expected level? Stakeholder feedback: any qualitative reports of the model behaving unexpectedly? Establish regular monitoring cadence (weekly dashboards) rather than waiting six months for ad hoc checks.

Q439. A new data privacy regulation means you can no longer use three important features in your production model. The model must be retrained without them. How do you approach this?
Answer: Feature removal impact assessment: compute SHAP values on the current model — how much did the three features contribute? What is the expected performance drop? Retrain the model without the features on the same training data and evaluate on the same holdout. Quantify the performance gap. Mitigation strategies: engineer proxy features that capture similar information from compliant data, apply dimensionality reduction to combine remaining features more effectively, consider if additional data sources can compensate. If performance degrades significantly: discuss with legal whether less direct use of the data (aggregated, anonymized) is permissible. Communicate the performance tradeoff clearly to stakeholders — compliance is non-negotiable, but stakeholders should understand the impact. Deploy the compliant model with a communication plan.

Q440. You are tasked with building a pricing optimization model for an e-commerce company. What are the key data science considerations?
Answer: This is a causal inference and optimization problem, not just a prediction problem. Key considerations: price elasticity — how does demand change with price? Need causal estimates, not just correlations (customers who buy at low prices are different from those who buy at high prices — selection bias). Causal identification: use historical price experiments (natural experiments, A/B tests on price) to estimate elasticity. Demand modeling: build a demand curve per product/segment. Competitor pricing: if available, model competitive dynamics. Constraints: business rules (floor price, margin requirements), inventory constraints, fairness concerns (differential pricing by demographics may be illegal). Optimization: given the demand model and constraints, find the price maximizing revenue or profit. Testing: price changes must be validated with A/B tests. Ethics: avoid predatory pricing practices and comply with regulations.

Q441. A colleague argues that more data always makes models better. How do you respond?
Answer: More data often helps but is not always sufficient or necessary. When more data helps: reduces variance (overfitting), improves calibration of rare event models, enables detection of smaller effect sizes. When more data does not help: if the data has systematic measurement errors (more bad data worsens the model), if the additional data introduces distribution shift, if the model architecture is misspecified (wrong functional form for the relationship), if the bottleneck is data quality not quantity, if the problem is inherently unpredictable given available features. Also: collecting and labeling more data has cost. Often, better feature engineering, model selection, or problem framing provides more improvement per unit of effort than collecting more data. The question is always "more of what kind of data?"

Q442. How do you handle target leakage in practice and why is it such a dangerous problem?
Answer: Target leakage occurs when features used in training contain information about the target that would not be available at prediction time. Dangerous because: the model appears highly accurate in offline evaluation but completely fails in production — it learned to use the leaked information rather than the true underlying patterns. Common examples: including post-event features (a "claim filed" flag when predicting fraud, a "churned" flag computed after the prediction date), using aggregates computed on the whole dataset including the test set, using future data in time series features. Prevention: rigorous temporal split — features must come strictly from before the prediction date. Feature audit: review every feature and ask "would this be available at the time we make predictions?" Watch for surprisingly high model performance — genuine leakage often produces suspiciously strong results.

Q443. What are the key differences between working on Kaggle competitions versus real-world data science?
Answer: Kaggle: clean, well-defined problem with a single metric, fixed dataset, no deployment concerns, winner takes all. Real world: ambiguous problem requiring extensive stakeholder conversations, messy and incomplete data requiring extensive cleaning, multiple sometimes-conflicting metrics, deployment and maintenance responsibility, organizational and political constraints, communication requirements, and the model is only one part of a system. Real-world priorities: asking the right question matters more than model performance, data quality and pipeline reliability often dominate, interpretability and fairness are real constraints, and demonstrating business value requires connecting model improvements to business outcomes. Kaggle skills (model tuning, ensembling) are valuable but insufficient alone for real-world impact.

Q444. You need to choose between two models: Model A achieves 92% AUC with 500 features, Model B achieves 90% AUC with 20 features. Which do you choose and why?
Answer: Model B is often the better choice despite lower AUC. Considerations favoring Model B: fewer features means simpler data collection and fewer upstream dependencies, lower risk of feature instability or pipeline errors, easier to explain to stakeholders (fewer factors, clearer reasoning), more robust to distribution shift (simpler models generalize better when the world changes), lower infrastructure cost (less data to collect, transform, and serve). Considerations favoring Model A: if 2% AUC translates to significant business impact (e.g., $10M in fraud caught), it may justify complexity. Decision framework: evaluate business impact of 2% AUC difference, assess operational complexity of 500 vs 20 features, consider model maintenance burden, and stakeholder explainability requirements. For most business applications, Model B's simplicity wins. Always measure the business impact, not just the metric.

Q445. How do you approach data science in a domain you know nothing about (e.g., you are a data scientist who has just joined a healthcare company)?
Answer: Domain knowledge is a force multiplier for data science — without it, you build the wrong models and misinterpret results. Approach: immerse yourself in the domain. Read introductory materials and key papers. Shadow domain experts (clinicians, epidemiologists). Ask questions relentlessly — what is this variable measuring? What does this metric mean clinically? Learn the data generation process — how is this data collected? What measurement errors exist? Understand the regulatory environment — HIPAA, FDA regulations affect what can be built and how. Identify subject matter experts to partner with on each project. Be transparent about your knowledge gaps and learn from domain experts. Data scientists who invest in domain knowledge produce dramatically more impact. Never assume you can substitute general ML knowledge for domain expertise.

---

## TOPIC 29: MIXED RAPID FIRE MCQ

Q446. What does MCAR stand for and what is its significance?
A) Multiple Category Analysis B) Missing Completely at Random — missingness is unrelated to any data, enabling unbiased listwise deletion C) Missing Corrected at Random D) Multiple Comparative Analysis
Answer: B

Q447. What is the VIF used to detect?
A) Variable importance B) Multicollinearity — values above 10 indicate severe collinearity among predictors C) Variance in features D) Model fit
Answer: B

Q448. What is a kernel in kernel SVM?
A) OS kernel B) A function computing the inner product in a high-dimensional feature space implicitly, enabling nonlinear classification C) A model parameter D) A regularization term
Answer: B

Q449. What is t-SNE primarily used for?
A) Modeling B) Visualizing high-dimensional data in 2D by preserving local neighborhood structure C) Classification D) Dimensionality reduction for modeling
Answer: B — t-SNE is for visualization only, not for preprocessing before modeling.

Q450. What is UMAP and how does it compare to t-SNE?
A) A network tool B) Uniform Manifold Approximation and Projection — faster than t-SNE and better preserves global structure, suitable for both visualization and preprocessing C) A clustering method D) A feature selection method
Answer: B

Q451. What is the elbow method used for?
A) Regression B) Determining the optimal number of clusters k in k-means by plotting inertia vs k and finding the point where improvement diminishes C) Feature selection D) Outlier detection
Answer: B

Q452. What is silhouette score?
A) A cluster shape B) A metric evaluating clustering quality by measuring how similar each point is to its own cluster vs neighboring clusters — ranges from -1 to 1 C) An outlier score D) A model score
Answer: B

Q453. What is the difference between hard and soft clustering?
A) Difficulty levels B) Hard clustering assigns each point to exactly one cluster; soft clustering (GMM) assigns membership probabilities across all clusters C) Two different algorithms D) Speed difference
Answer: B

Q454. What is the Davies-Bouldin Index?
A) A classification metric B) A clustering evaluation metric computing the average ratio of within-cluster scatter to between-cluster separation — lower is better C) A regression metric D) A model selection criterion
Answer: B

Q455. What is a Voronoi diagram?
A) A network diagram B) A partitioning of space into regions where each region contains all points closer to its center than any other center — the geometric basis of k-means C) A clustering visualization D) A heat map
Answer: B

---

## TOPIC 30: FINAL FILL IN THE BLANK

Q456. ________ is a technique reducing the number of hyperparameter evaluations needed by early stopping unpromising configurations.
Answer: Successive Halving (or Hyperband)

Q457. ________ is a Python library for building end-to-end ML pipelines that chain preprocessing and modeling steps.
Answer: scikit-learn Pipeline

Q458. ________ is the practice of ensuring all data transformations (scaling, encoding, imputation) are fit only on training data and applied to test data.
Answer: Pipeline discipline (or preventing data leakage in preprocessing)

Q459. ________ is a statistical test used when comparing more than two groups to test if at least one mean differs.
Answer: ANOVA (Analysis of Variance)

Q460. ________ correction divides the significance threshold by the number of comparisons, controlling the family-wise error rate.
Answer: Bonferroni

Q461. ________ is the false discovery rate — the expected proportion of significant results that are false positives.
Answer: FDR (False Discovery Rate) — controlled by Benjamini-Hochberg procedure

Q462. ________ is a resampling method for estimating the variability of a statistic by repeatedly sampling with replacement from the data.
Answer: Bootstrap

Q463. ________ is a Python library for statistical modeling including OLS regression, GLMs, time series, and statistical tests.
Answer: statsmodels

Q464. ________ is a framework for explaining model decisions by identifying the minimal change to the input that would flip the prediction.
Answer: Counterfactual explanation (or DiCE — Diverse Counterfactual Explanations)

Q465. ________ is a Python library providing efficient implementations of KNN, isolation forest, and DBSCAN for anomaly detection.
Answer: scikit-learn (sklearn.neighbors, sklearn.ensemble.IsolationForest)

Q466. ________ is a metric measuring how well a time series model forecasts versus a naive seasonal baseline.
Answer: MASE (Mean Absolute Scaled Error)

Q467. ________ is a Python library for time series forecasting supporting ARIMA, ETS, and Prophet-style models.
Answer: sktime

Q468. ________ is the process of computing features on the fly at prediction time rather than precomputing and storing them.
Answer: Online feature computation (vs. offline/batch feature computation)

Q469. ________ is a data science pattern where predictions from an expensive model are cached for frequently occurring inputs.
Answer: Prediction caching (or lookup table)

Q470. ________ is a Python library providing implementations of survival analysis methods including Kaplan-Meier and Cox regression.
Answer: lifelines

Q471. ________ is the statistical assumption that observations are independently drawn from the same distribution.
Answer: i.i.d. (independent and identically distributed)

Q472. ________ is a visualization showing the decision boundary of a classifier by coloring regions of the feature space.
Answer: Decision boundary plot

Q473. ________ is a method for feature selection using the statistical test of each feature's relationship with the target independently.
Answer: Filter method (univariate feature selection)

Q474. ________ is a wrapper feature selection method training a model, removing least important features, and repeating until the desired number remains.
Answer: Recursive Feature Elimination (RFE)

Q475. ________ is a Python library providing interactive data applications and dashboards.
Answer: Dash (by Plotly) or Streamlit

Q476. ________ is a design pattern for incrementally updating a model with new data without retraining from scratch.
Answer: Online learning (or incremental learning)

Q477. ________ is the process of converting model predictions to calibrated probabilities using isotonic regression.
Answer: Isotonic calibration (or Platt scaling for logistic)

Q478. ________ is a data preprocessing technique removing low-variance features that likely carry minimal signal.
Answer: Variance threshold feature selection

Q479. ________ is a visualization technique plotting the actual positive rate against predicted probability to assess calibration.
Answer: Calibration curve (reliability diagram)

Q480. ________ is the process of standardizing data science workflows using reproducible templates and project structures.
Answer: Cookiecutter Data Science (or project template)

Q481. ________ is a Python library for automating feature engineering on relational and time series data.
Answer: Featuretools

Q482. ________ is a data transformation normalizing each row to unit norm rather than each column.
Answer: L2 normalization (Normalizer in sklearn)

Q483. ________ is a SQL operation computing a ratio of a group's metric to the total, useful for market share analysis.
Answer: Window function with SUM OVER() — e.g., SUM(sales) OVER() for total

Q484. ________ is the practice of logging all model predictions and inputs in production for later analysis and debugging.
Answer: Prediction logging (or inference logging)

Q485. ________ is a measure of the linear association between the rank of a variable and time, used to detect monotonic trends.
Answer: Spearman correlation (or Mann-Kendall test for trend)

Q486. ________ is the process of determining how many principal components to retain by finding the elbow in the scree plot.
Answer: Scree plot analysis

Q487. ________ is the technique of applying different sample weights to training examples based on their importance.
Answer: Sample weighting (or instance weighting)

Q488. ________ is a Python library for causal inference providing implementations of propensity scoring, matching, and DiD.
Answer: DoWhy (or EconML, CausalInference)

Q489. ________ is the process of testing whether a predictive model's performance is stable across different subpopulations.
Answer: Robustness evaluation (or slice-based testing)

Q490. ________ is a data science concept where the value of information is evaluated before deciding whether to collect it.
Answer: Value of Information (VoI) analysis

Q491. ________ is a Python library for automated machine learning that searches over model types, preprocessing, and hyperparameters.
Answer: Auto-sklearn (or TPOT, H2O AutoML)

Q492. ________ is the ratio measuring how much better a model performs on a high-scoring subgroup versus overall — used in lift charts.
Answer: Lift

Q493. ________ is a fairness metric requiring the fraction of positive predictions to be equal across demographic groups.
Answer: Demographic parity (or statistical parity)

Q494. ________ is a fairness metric requiring equal true positive rates across groups — sensitive in high-stakes classification.
Answer: Equal opportunity (equalized odds)

Q495. ________ is a Python library for network analysis providing graph algorithms, visualization, and link prediction.
Answer: NetworkX

Q496. ________ is a technique for testing model robustness by systematically altering input features and measuring prediction stability.
Answer: Sensitivity analysis (or perturbation testing)

Q497. ________ is a data science practice ensuring that model decisions meet legal and ethical standards.
Answer: Responsible AI (or AI governance, algorithmic accountability)

Q498. ________ is the process of converting probability outputs to binary decisions by choosing an optimal threshold.
Answer: Decision threshold optimization

Q499. ________ is a Python library for interactive, browser-based network visualization.
Answer: Pyvis (or D3.js via Python bindings)

Q500. What is the single most important question a data scientist should ask at the start of any project?
Answer: "What decision will this analysis inform, and how will success be measured?" Without clarity on the decision and success metric, even the most technically sophisticated model will fail to deliver business value. Every subsequent choice — data collection, feature engineering, model type, evaluation metric — flows from this question. Many data science projects fail not because of technical shortcomings but because they solved the wrong problem or defined success incorrectly.

---

# PART 2: ROUND TYPE QUESTIONS (Q501–Q640)

---

## ROUND TYPE: SCENARIO QUESTIONS

Q501. A data science manager asks you to build a model to predict which employees are likely to quit. What do you build and what concerns do you raise?
Answer: Churn prediction using behavioral features: tenure, performance ratings, promotion history, salary relative to market, manager change frequency, project load, engagement survey scores, leave taken, internal transfer requests. Model: gradient boosting with SHAP explainability. But raise serious concerns first. Ethics: using data to identify employees likely to quit and taking action (dismissing them preemptively, withholding promotions) is potentially discriminatory and legally problematic. Privacy: employees did not consent to predictive surveillance. Action framing matters: if the model is used to offer targeted retention (manager conversations, pay adjustments, career development) it is beneficial. If used punitively, it is harmful. Recommend: HR and legal review of data usage, strict access controls, use only for positive interventions, require human decision-making (no automated actions), and employee transparency about what data is used.

Q502. You are asked to explain why your recommendation model recommended a specific product to a specific user. How do you approach this?
Answer: Recommendation explainability depends on the model type. Collaborative filtering: "Users with similar purchase history to you also bought this." Content-based: "This is similar to items you purchased before — it shares genre X, brand Y, and price range Z." Matrix factorization: user and item embeddings are latent — provide post-hoc explanation using similar users or similar past purchases as proxies. Two-tower neural: SHAP values on input features, noting which features drove the user embedding toward this item's embedding. Template-based explanation: "Recommended because: you bought similar items, it is highly rated in your price range, and it is trending in your category." Always balance accuracy with simplicity — users prefer simple, relatable explanations over technically accurate but complex ones. Test explanations with users to ensure they are perceived as fair and understandable.

Q503. You are given a new dataset and 2 hours to present findings to the executive team. What do you do?
Answer: Ruthless prioritization. First 20 minutes: understand the business question. What decision does this data inform? What are the key metrics of interest? Next 40 minutes: fast EDA — dataset shape, variable types, missing values, key distributions, simple correlations. Identify the 3 most interesting and actionable findings. Next 30 minutes: build 3-5 clear visualizations telling a coherent story. Next 20 minutes: structure the narrative — start with the key insight, support with evidence, end with recommendation. Final 10 minutes: anticipate questions and prepare caveats. Presentation principles: lead with the insight not the method, use clear visualizations with direct titles (titles should state the finding, not the chart type), be honest about data limitations, and have one clear recommendation. Do not attempt to show everything — ruthlessly select the 3 most actionable findings.

Q504. Your model is predicting loan default and the model flags a disproportionately high rate of minority applicants as high risk. How do you investigate and address this?
Answer: This is a fairness audit. Investigation: compute performance metrics (precision, recall, FPR) separately for each demographic group. Is the model more accurate for one group? Does it have higher false positive rates for minority applicants (incorrectly denying credit-worthy applicants)? Are the error rates balanced or disparate? Root cause analysis: is the disparity driven by the model itself or the training data reflecting historical discrimination? Which features contribute most to the disparity (SHAP analysis by group)? Is zip code or similar proxy being used? Remediation: remove or suppress discriminatory proxy features, apply fairness constraints during training (equalized odds), calibrate separately by group if appropriate, consult legal on fair lending requirements (ECOA, Fair Housing Act). Long-term: collect more representative training data, implement ongoing fairness monitoring, involve domain experts and affected communities.

Q505. You have built a model that achieves great results but the engineering team says it is too slow to serve in production (inference takes 2 seconds, requirement is 50ms). What do you do?
Answer: Model optimization strategy. Measure first: profile where the 2 seconds go — is it feature computation, model inference, or I/O? Feature optimization: precompute expensive features offline and cache, reduce feature count (keep only high-importance features), simplify feature transformations. Model simplification: retrain a simpler model (fewer trees, shallower depth, fewer features) and measure accuracy tradeoff. Use quantization (INT8) for neural network models. Convert to ONNX format for optimized runtime. Model distillation: train a fast student model to mimic the complex model. Infrastructure optimization: serve from GPU if applicable, optimize batch processing, use model serving frameworks (TensorRT, TorchScript). Evaluate accuracy tradeoff at each step — 5% accuracy drop for 40x speedup may be acceptable. Establish a performance budget upfront in future projects to avoid this late-stage conflict.

Q506. A product manager proposes using the ML model output directly to make automated decisions (automatically denying loan applications, automatically banning accounts). What concerns do you raise?
Answer: Full automation of high-stakes decisions raises significant concerns. Regulatory: many jurisdictions require human oversight for automated decisions affecting individuals (EU AI Act, GDPR Article 22, ECOA). Model errors at scale: a model with 5% FPR sounds small but applied to 1M decisions means 50,000 incorrect automatic actions. Adversarial robustness: automation invites gaming — adversaries will probe the decision boundary. Edge cases: models fail unpredictably on rare inputs; humans handle novelty better. Accountability: who is responsible when an automated decision causes harm? Recommendation: implement human-in-the-loop for borderline cases (only automate high-confidence decisions), provide appeals mechanism, monitor automated decision rates and error rates continuously, conduct regular audits, ensure regulatory compliance. As model matures and trust is established, the automation threshold can be adjusted based on evidence.

Q507. You are the first data scientist at a startup. What data infrastructure do you prioritize building?
Answer: Start with instrumentation, not models. Without data, there is nothing to analyze. Priority 1: event tracking — instrument all key user actions in the product (Segment, Amplitude, or custom events to a data warehouse). Priority 2: data warehouse — BigQuery or Snowflake for storing all tracked events and business data. Priority 3: transformation layer — dbt for creating clean, documented analytical tables. Priority 4: business intelligence — Metabase, Looker, or Tableau for self-service dashboards. Priority 5: experiment framework — A/B testing infrastructure. Models come later. Resist pressure to build ML before the data foundation is solid — a model is only as good as the data it is built on. Document everything. Establish data governance early — naming conventions, ownership, data dictionary.

Q508. You discover that your training dataset was accidentally shuffled before a time-based train-test split, meaning future data leaked into the training set. The model is already in production. What do you do?
Answer: This is a data leakage incident with a model in production. Assess severity: how severe is the leakage? Was a small amount of future data in training (minor issue) or a large proportion (major issue)? Estimate impact: retrain the model correctly with a proper time-based split and compare performance. If performance drops significantly with the correct split, the production model is unreliable. Immediate actions: if performance drops drastically, consider emergency rollback to a previous model or simple baseline. Communicate transparently with stakeholders about the issue and its impact. Correct the pipeline: fix the data splitting code and add validation that confirms temporal ordering. Retrain and evaluate properly, then redeploy. Post-mortem: document what happened, why, and what safeguards are being added (automatic time-split validation, code review for data pipeline changes).

Q509. A business team is angry because the model's predictions were wrong for a high-profile client. They want to know why. How do you handle this?
Answer: Handle with technical rigor and stakeholder empathy. Immediate response: do not be defensive — acknowledge the error and commit to investigating. Technical investigation: retrieve the specific prediction, the feature values at prediction time, and the SHAP explanation. Did the model predict correctly given its training data, or was this a genuine model failure? Was this an edge case outside the training distribution? Was the input data quality correct? Communicate findings clearly: "The model predicted X because of features A, B, C. In this case, feature B had an unusual value of Y — here is how that affected the prediction." If it was a genuine model failure: acknowledge it, explain what will change, and set realistic expectations about model limitations. Use this as an opportunity to improve monitoring, add this edge case to the test suite, and possibly retrain. Never hide model limitations — proactive communication of known failure modes builds more trust than discovering them through errors.

Q510. You join a team that has no documentation of existing models in production. How do you approach creating a model inventory?
Answer: Model governance audit. Discovery phase: interview engineers and data scientists to identify all running models, scheduled notebooks, and automated decision systems. Check deployment infrastructure (Lambda functions, Airflow DAGs, Kubernetes deployments, API services) for anything making predictions. Check the BI layer for any "predictions" embedded in dashboards. For each discovered model, document: what it predicts, who owns it, when it was last trained, what training data was used, what features it uses, where it gets feature data in production, what its offline performance was, who consumes its outputs and how, what the business impact is. Prioritize: rank models by business impact and create remediation priorities (models with high impact and no documentation are highest risk). Build a model registry (MLflow, internal wiki) going forward. Establish a policy that no model goes to production without documentation.

---

## ROUND TYPE: ARCHITECTURE AND SYSTEM DESIGN

Q511. Design a recommendation system for a streaming platform with 50 million users and 100,000 titles.
Answer: Two-stage architecture. Stage 1 — Retrieval: generate hundreds of candidates from billions of user-item pairs efficiently. Use a two-tower neural network encoding users and items into a shared embedding space. Serve via approximate nearest neighbor search (Faiss) from precomputed item embeddings. Candidate sources: collaborative filtering top-k, content-based similar to watched items, trending, new releases, editor picks. Stage 2 — Ranking: score each candidate with a rich feature set using a neural ranker or gradient boosting model. Features: user embedding, item features (genre, release year, rating, duration), contextual features (device, time, day), interaction history (watched ratio, re-watches, ratings), freshness score. Personalization: update user embeddings daily from watch history. A/B testing: test retrieval and ranking separately. Evaluation: offline NDCG@k, online watch rate, completion rate, subscriber retention. Cold start: use content features and popularity for new items, onboarding preferences for new users.

Q512. Design the data infrastructure for a data science team at a mid-sized company (500 employees, 100k customers).
Answer: Core stack. Ingestion: Fivetran or Airbyte for syncing databases, SaaS tools (Salesforce, Stripe, Intercom) to the warehouse. Event tracking: Segment or Rudderstack routing product events. Data warehouse: Snowflake or BigQuery — cloud-native, scalable, SQL interface. Transformation: dbt for defining, testing, and documenting analytical models as version-controlled SQL. Orchestration: Airflow or Dagster for scheduling pipelines. BI layer: Metabase or Looker for self-service dashboards. Experimentation: Optimizely or in-house A/B framework using warehouse data. ML Platform: MLflow for experiment tracking, SageMaker or Vertex AI for training and serving. Feature store: start simple (dbt models as features) and graduate to Feast when needed. Data quality: dbt tests and Great Expectations. Governance: data catalog (Atlan or Notion-based wiki). Total stack: invest in the foundation (warehouse, dbt, BI) before ML — it serves the most people and enables ML later.

Q513. Design a real-time fraud detection data science system.
Answer: Feature engineering: compute real-time features — transaction velocity (N transactions in last 10 minutes), amount deviation from user mean, merchant category risk, location velocity (two transactions in different cities within 1 hour), device fingerprint match. Streaming: Kafka ingests transaction events. Flink computes real-time features (sliding window aggregations per user). Feature store: online feature store (Redis or DynamoDB) stores precomputed per-user features (30/60/90-day history) updated by batch job. Serving: gradient boosting model (XGBoost/LightGBM) served via REST API with <100ms latency requirement. Score is returned with the transaction for real-time decision. Training: batch training pipeline using historical labeled data (fraud labels come back 7-30 days after investigation). Offline features joined with labels. Model monitoring: track score distribution, precision/recall on labeled data as it becomes available. Retraining: weekly retrain triggered by drift alerts.

Q514. Design the end-to-end pipeline for training and deploying a churn prediction model at scale.
Answer: Data pipeline: daily Airflow job extracting behavioral features from data warehouse into a training dataset. Features computed at the customer-week level with label: churned within 30 days. Training: PySpark or Pandas for feature computation, LightGBM for modeling, MLflow for experiment tracking. Validation: walk-forward cross-validation respecting temporal ordering. Model registry: best model version promoted to production in MLflow registry after passing performance gates. Serving: batch scoring — weekly Airflow job scores all active customers, writes scores to database. Downstream consumption: CRM integration passes high-risk customers to retention team. Dashboard: Looker dashboard showing score distributions, top risk factors (SHAP), and cohort-level trends. Monitoring: weekly comparison of score distribution to training baseline, monthly evaluation of model AUC on newly churned customers. Retraining: triggered monthly or when AUC drops below threshold. Feature store: dbt models serve as the feature computation layer, ensuring consistency between training and scoring.

---

## ROUND TYPE: CODING / TECHNICAL QUESTIONS

Q515. Write a Python function to compute a rolling 7-day average for a time series in pandas.

Answer:
```python
import pandas as pd

def rolling_average(df, date_col, value_col, window=7):
    df = df.sort_values(date_col)
    df[f'rolling_{window}d_avg'] = (
        df[value_col]
        .rolling(window=window, min_periods=1)
        .mean()
    )
    return df
```

Q516. Write a function to detect outliers using the IQR method and return a cleaned DataFrame.

Answer:
```python
import pandas as pd

def remove_outliers_iqr(df, column, factor=1.5):
    Q1 = df[column].quantile(0.25)
    Q3 = df[column].quantile(0.75)
    IQR = Q3 - Q1
    lower = Q1 - factor * IQR
    upper = Q3 + factor * IQR
    mask = (df[column] >= lower) & (df[column] <= upper)
    print(f"Removed {(~mask).sum()} outliers from {column}")
    return df[mask].copy()
```

Q517. Write a function to perform stratified train/test split and report class distribution.

Answer:
```python
from sklearn.model_selection import train_test_split
import pandas as pd

def stratified_split(X, y, test_size=0.2, random_state=42):
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=test_size,
        stratify=y, random_state=random_state
    )
    print("Train class distribution:")
    print(pd.Series(y_train).value_counts(normalize=True))
    print("Test class distribution:")
    print(pd.Series(y_test).value_counts(normalize=True))
    return X_train, X_test, y_train, y_test
```

Q518. Write a function to compute multiple evaluation metrics for a binary classifier.

Answer:
```python
from sklearn.metrics import (accuracy_score, precision_score, recall_score,
                              f1_score, roc_auc_score, average_precision_score)
import pandas as pd

def evaluate_classifier(y_true, y_pred, y_prob=None):
    metrics = {
        'accuracy': accuracy_score(y_true, y_pred),
        'precision': precision_score(y_true, y_pred),
        'recall': recall_score(y_true, y_pred),
        'f1': f1_score(y_true, y_pred)
    }
    if y_prob is not None:
        metrics['auc_roc'] = roc_auc_score(y_true, y_prob)
        metrics['auc_pr'] = average_precision_score(y_true, y_prob)
    return pd.Series(metrics).round(4)
```

Q519. Write a function to compute SHAP feature importance and plot the top N features.

Answer:
```python
import shap
import matplotlib.pyplot as plt

def plot_shap_importance(model, X_train, top_n=10):
    explainer = shap.TreeExplainer(model)
    shap_values = explainer.shap_values(X_train)
    # For binary classification, use positive class SHAP values
    if isinstance(shap_values, list):
        shap_values = shap_values[1]
    shap.summary_plot(
        shap_values, X_train,
        max_display=top_n,
        plot_type='bar',
        show=True
    )
    return shap_values
```

Q520. Write a function to perform walk-forward cross-validation for time series.

Answer:
```python
import numpy as np
from sklearn.metrics import mean_absolute_error

def walk_forward_cv(model, X, y, n_splits=5, min_train_size=0.5):
    n = len(X)
    min_train = int(n * min_train_size)
    fold_size = (n - min_train) // n_splits
    scores = []
    for i in range(n_splits):
        train_end = min_train + i * fold_size
        test_end = train_end + fold_size
        X_train, y_train = X[:train_end], y[:train_end]
        X_test, y_test = X[train_end:test_end], y[train_end:test_end]
        model.fit(X_train, y_train)
        preds = model.predict(X_test)
        scores.append(mean_absolute_error(y_test, preds))
        print(f"Fold {i+1}: MAE = {scores[-1]:.4f}")
    print(f"Mean MAE: {np.mean(scores):.4f} ± {np.std(scores):.4f}")
    return scores
```

Q521. Write a function to compute target encoding with cross-validation to prevent leakage.

Answer:
```python
import numpy as np
import pandas as pd
from sklearn.model_selection import KFold

def target_encode_cv(df, cat_col, target_col, n_splits=5, smoothing=10):
    global_mean = df[target_col].mean()
    encoded = np.zeros(len(df))
    kf = KFold(n_splits=n_splits, shuffle=True, random_state=42)
    for train_idx, val_idx in kf.split(df):
        train_data = df.iloc[train_idx]
        stats = train_data.groupby(cat_col)[target_col].agg(['mean', 'count'])
        stats['smoothed'] = (
            (stats['count'] * stats['mean'] + smoothing * global_mean) /
            (stats['count'] + smoothing)
        )
        encoded[val_idx] = df.iloc[val_idx][cat_col].map(
            stats['smoothed']
        ).fillna(global_mean)
    return encoded
```

Q522. Write a function to perform automatic EDA on a DataFrame and print a summary.

Answer:
```python
import pandas as pd
import numpy as np

def auto_eda(df):
    print(f"Shape: {df.shape}")
    print(f"\nDtypes:\n{df.dtypes}")
    print(f"\nMissing values:\n{df.isnull().sum()[df.isnull().sum() > 0]}")
    print(f"\nDuplicates: {df.duplicated().sum()}")
    print(f"\nNumeric summary:\n{df.describe().round(2)}")
    cat_cols = df.select_dtypes(include='object').columns
    for col in cat_cols:
        print(f"\n{col} — unique: {df[col].nunique()}, top: {df[col].value_counts().head(3).to_dict()}")
    num_cols = df.select_dtypes(include=np.number).columns
    print(f"\nCorrelations with first numeric col:\n{df[num_cols].corr().iloc[0].sort_values(ascending=False)}")
```

Q523. Write a SQL query to compute 7-day rolling average of daily revenue.

Answer:
```sql
SELECT
    date,
    daily_revenue,
    AVG(daily_revenue) OVER (
        ORDER BY date
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) AS rolling_7d_avg
FROM daily_revenue_table
ORDER BY date;
```

Q524. Write a SQL query to find the month-over-month revenue growth rate.

Answer:
```sql
WITH monthly AS (
    SELECT
        DATE_TRUNC('month', order_date) AS month,
        SUM(revenue) AS monthly_revenue
    FROM orders
    GROUP BY 1
)
SELECT
    month,
    monthly_revenue,
    LAG(monthly_revenue) OVER (ORDER BY month) AS prev_month_revenue,
    ROUND(
        100.0 * (monthly_revenue - LAG(monthly_revenue) OVER (ORDER BY month))
        / NULLIF(LAG(monthly_revenue) OVER (ORDER BY month), 0),
        2
    ) AS mom_growth_pct
FROM monthly
ORDER BY month;
```

Q525. Write a Python function to detect concept drift between two datasets using PSI (Population Stability Index).

Answer:
```python
import numpy as np

def compute_psi(expected, actual, buckets=10, eps=1e-4):
    breakpoints = np.percentile(expected, np.linspace(0, 100, buckets + 1))
    breakpoints[0] = -np.inf
    breakpoints[-1] = np.inf
    expected_counts = np.histogram(expected, bins=breakpoints)[0]
    actual_counts = np.histogram(actual, bins=breakpoints)[0]
    expected_pct = expected_counts / len(expected) + eps
    actual_pct = actual_counts / len(actual) + eps
    psi = np.sum((actual_pct - expected_pct) * np.log(actual_pct / expected_pct))
    interpretation = "stable" if psi < 0.1 else "minor shift" if psi < 0.2 else "major shift"
    print(f"PSI: {psi:.4f} — {interpretation}")
    return psi
```

Q526. Write a function to run a two-proportion z-test for A/B testing.

Answer:
```python
import numpy as np
from scipy import stats

def two_proportion_ztest(n_control, conv_control, n_treatment, conv_treatment, alpha=0.05):
    p_c = conv_control / n_control
    p_t = conv_treatment / n_treatment
    p_pool = (conv_control + conv_treatment) / (n_control + n_treatment)
    se = np.sqrt(p_pool * (1 - p_pool) * (1/n_control + 1/n_treatment))
    z = (p_t - p_c) / se
    p_value = 2 * (1 - stats.norm.cdf(abs(z)))
    lift = (p_t - p_c) / p_c * 100
    print(f"Control: {p_c:.4f}, Treatment: {p_t:.4f}")
    print(f"Absolute lift: {p_t - p_c:.4f}, Relative lift: {lift:.2f}%")
    print(f"Z-stat: {z:.4f}, p-value: {p_value:.4f}")
    print(f"Significant: {p_value < alpha}")
    return z, p_value
```

Q527. Write a function to compute sample size for an A/B test.

Answer:
```python
from scipy import stats
import numpy as np

def compute_sample_size(baseline_rate, mde, alpha=0.05, power=0.8):
    treatment_rate = baseline_rate * (1 + mde)
    p1, p2 = baseline_rate, treatment_rate
    p_avg = (p1 + p2) / 2
    z_alpha = stats.norm.ppf(1 - alpha / 2)
    z_beta = stats.norm.ppf(power)
    n = (z_alpha * np.sqrt(2 * p_avg * (1 - p_avg)) +
         z_beta * np.sqrt(p1*(1-p1) + p2*(1-p2)))**2 / (p2 - p1)**2
    n = int(np.ceil(n))
    print(f"Required sample size per variant: {n:,}")
    print(f"Total sample size: {2*n:,}")
    return n
```

Q528. Write a function to create an LightGBM model pipeline with preprocessing.

Answer:
```python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
import lightgbm as lgb

def build_lgb_pipeline(num_features, cat_features, lgb_params=None):
    if lgb_params is None:
        lgb_params = {'n_estimators': 500, 'learning_rate': 0.05,
                      'max_depth': 6, 'random_state': 42}
    preprocessor = ColumnTransformer([
        ('num', StandardScaler(), num_features),
        ('cat', OneHotEncoder(handle_unknown='ignore', sparse=False), cat_features)
    ])
    pipeline = Pipeline([
        ('preprocessor', preprocessor),
        ('model', lgb.LGBMClassifier(**lgb_params))
    ])
    return pipeline
```

Q529. Write a Python function computing the lift curve for a binary classification model.

Answer:
```python
import numpy as np
import matplotlib.pyplot as plt

def plot_lift_curve(y_true, y_prob, n_bins=10):
    df_sorted = sorted(zip(y_prob, y_true), reverse=True)
    total_pos = sum(y_true)
    n = len(y_true)
    bins = np.array_split(df_sorted, n_bins)
    lift_values = []
    for i, bin_data in enumerate(bins, 1):
        bin_pos = sum(label for _, label in bin_data)
        bin_size = len(bin_data)
        expected = (bin_size / n) * total_pos
        lift = bin_pos / expected if expected > 0 else 0
        lift_values.append(lift)
    plt.figure(figsize=(8, 5))
    plt.bar(range(1, n_bins + 1), lift_values)
    plt.axhline(1, color='red', linestyle='--', label='Baseline')
    plt.xlabel('Decile'), plt.ylabel('Lift'), plt.title('Lift Curve')
    plt.legend()
    plt.tight_layout()
    plt.show()
    return lift_values
```

Q530. Write a function to implement k-means clustering from scratch.

Answer:
```python
import numpy as np

def kmeans(X, k, max_iters=100, tol=1e-4, random_state=42):
    np.random.seed(random_state)
    idx = np.random.choice(len(X), k, replace=False)
    centroids = X[idx].copy()
    for iteration in range(max_iters):
        distances = np.linalg.norm(X[:, None] - centroids[None, :], axis=2)
        labels = np.argmin(distances, axis=1)
        new_centroids = np.array([
            X[labels == i].mean(axis=0) if (labels == i).sum() > 0 else centroids[i]
            for i in range(k)
        ])
        if np.max(np.linalg.norm(new_centroids - centroids, axis=1)) < tol:
            print(f"Converged at iteration {iteration+1}")
            break
        centroids = new_centroids
    inertia = sum(np.linalg.norm(X[i] - centroids[labels[i]])**2 for i in range(len(X)))
    return labels, centroids, inertia
```

---

## ROUND TYPE: CONCEPT MCQ — MIXED RAPID FIRE

Q531. What is the difference between a population and a sample?
A) Size only B) A population includes all subjects of interest; a sample is a subset drawn from the population for study C) Populations are always large D) Samples are always random
Answer: B

Q532. What does it mean for an estimator to be unbiased?
A) It is always correct B) Its expected value equals the true parameter value — on average it hits the target C) It has low variance D) It is consistent
Answer: B

Q533. What is the difference between precision and accuracy in measurement?
A) No difference B) Accuracy is how close to the true value; precision is how consistent repeated measurements are C) Precision is more important D) Accuracy is for classifiers only
Answer: B

Q534. What is a confounder?
A) A confusing variable B) A variable associated with both the predictor and outcome, distorting the apparent causal relationship C) A control variable D) A moderating variable
Answer: B

Q535. What is the difference between correlation and regression?
A) No difference B) Correlation measures the strength and direction of linear association; regression models one variable as a function of another to make predictions C) Regression is always causal D) Correlation gives predictions
Answer: B

Q536. What is a power law distribution?
A) A normal distribution B) A distribution where the frequency of events is inversely proportional to a power of their size — few very large events, many small events C) An exponential distribution D) A uniform distribution
Answer: B — Pareto distribution, Zipf's law, web page traffic are examples.

Q537. What is feature hashing (the hashing trick)?
A) Encrypting features B) Converting high-cardinality categorical features into a fixed-size vector by applying a hash function to category values — memory-efficient for large cardinalities C) Label encoding D) Target encoding
Answer: B

Q538. What is isotonic regression?
A) Temperature regression B) A non-parametric regression constrained to be monotonically increasing — used for probability calibration when the calibration curve is not monotonic C) A polynomial regression D) A ridge regression
Answer: B

Q539. What is a Gaussian mixture model (GMM)?
A) A normal distribution B) A probabilistic model assuming data comes from a mixture of k Gaussian distributions with unknown parameters, fitted via EM algorithm C) A clustering variant D) A density estimator only
Answer: B — GMMs are both clustering algorithms and density estimators.

Q540. What is the expectation-maximization (EM) algorithm?
A) A neural network training method B) An iterative algorithm for finding maximum likelihood estimates when data has latent variables — alternates between E-step (estimate latent variables) and M-step (maximize likelihood) C) A gradient descent variant D) A Bayesian method
Answer: B

Q541. What is a latent variable?
A) A slow variable B) A variable that is not directly observed but inferred from observed variables — topics in LDA, factors in PCA, clusters in GMM C) A missing variable D) A hidden layer
Answer: B

Q542. What is the difference between type I and type II errors in business terms?
A) Statistical terms only B) Type I is false alarm (concluding the campaign worked when it did not); Type II is missed opportunity (concluding it failed when it actually worked) C) No business meaning D) Type II is always worse
Answer: B — The relative cost of each error type determines the decision threshold.

Q543. What is the Bonferroni correction?
A) A calibration method B) Dividing the significance threshold α by the number of tests to control family-wise error rate when conducting multiple comparisons C) A clustering correction D) A regression adjustment
Answer: B

Q544. What is a random effect in mixed models?
A) Random noise B) A statistical effect that varies by group (subject, location, time) and is treated as a random sample from a population of possible effects C) A fixed parameter D) An outlier effect
Answer: B

Q545. What is multivariate outlier detection?
A) Many univariate outlier checks B) Detecting observations that are unusual in the joint distribution of multiple variables even if they look normal marginally — Mahalanobis distance, isolation forest C) Any outlier method D) A visualization
Answer: B

Q546. What is a density estimator?
A) A data storage tool B) A method estimating the probability density function of a variable from data — KDE (Kernel Density Estimation) is the most common non-parametric method C) A histogram D) A summary statistic
Answer: B

Q547. What is Pearson vs Spearman correlation appropriate for?
A) No difference B) Pearson for linear relationships between normally distributed continuous variables; Spearman for monotonic relationships, ordinal data, or when outliers are present C) Spearman is always better D) Pearson is always faster
Answer: B

Q548. What is a random walk?
A) Walking randomly B) A time series where each value equals the previous value plus a random noise term — non-stationary, unpredictable, used to model stock prices C) A simulation method D) An RL term
Answer: B

Q549. What is heterogeneity of treatment effects?
A) Inconsistent experiments B) The variation in treatment effect magnitude across subgroups or individuals — some people benefit more, less, or differently from a treatment C) A model bias D) A data quality issue
Answer: B

Q550. What is a data generating process (DGP)?
A) A data pipeline B) The underlying mechanism producing the observed data — understanding the DGP guides correct model specification, feature engineering, and causal reasoning C) A database D) A data source
Answer: B

---

## ROUND TYPE: FILL IN THE BLANK — MIXED ADVANCED

Q551. ________ is the tendency for regression model predictions to be pulled toward the overall mean, more pronounced for extreme values.
Answer: Regression to the mean (or shrinkage)

Q552. ________ is a test statistic measuring whether observed frequencies differ from expected frequencies under a null model.
Answer: Chi-squared statistic

Q553. ________ is the ratio of explained variance to total variance in ANOVA.
Answer: eta-squared (η²) or R-squared in the ANOVA context

Q554. ________ is a method for comparing multiple regression models by penalizing additional parameters.
Answer: AIC (Akaike Information Criterion) or BIC (Bayesian Information Criterion)

Q555. ________ is the property that a model's predictions do not depend on the ordering of features — satisfied by tree models and neural networks but not by standard linear regression with interaction terms.
Answer: Permutation invariance

Q556. ________ is a data preprocessing technique creating new features by multiplying two existing features.
Answer: Interaction feature engineering

Q557. ________ is a method for feature selection based on the mutual information between each feature and the target.
Answer: Mutual information feature selection (sklearn.feature_selection.mutual_info_classif)

Q558. ________ is a Python library for probabilistic machine learning and Gaussian processes.
Answer: GPyTorch (or GPflow for TensorFlow)

Q559. ________ is the number of independent pieces of information available to estimate a parameter — decreases with each constraint imposed.
Answer: Degrees of freedom

Q560. ________ is the test checking whether the residuals of a model follow a normal distribution.
Answer: Shapiro-Wilk test (or Q-Q plot visually)

Q561. ________ is a non-parametric test for comparing medians of two independent groups.
Answer: Mann-Whitney U test

Q562. ________ is a technique generating multiple complete datasets from a dataset with missing values and averaging results across them.
Answer: Multiple imputation (MICE — Multiple Imputation by Chained Equations)

Q563. ________ is a Python library for fast, memory-efficient data manipulation using lazy evaluation.
Answer: Polars (or Dask for distributed)

Q564. ________ is the metric used in search engines measuring the average precision at each relevant document position.
Answer: Mean Average Precision (MAP)

Q565. ________ is the logarithm of the odds ratio, the raw output of logistic regression before sigmoid transformation.
Answer: Log-odds (logit)

Q566. ________ is a Python library for building and evaluating survival analysis models.
Answer: lifelines (or scikit-survival)

Q567. ________ is a technique handling non-stationarity in time series by subtracting the trend estimated by a moving average.
Answer: Detrending (or differencing)

Q568. ________ is the process of creating features from raw text by counting character n-grams — effective for handling misspellings.
Answer: Character n-gram vectorization

Q569. ________ is a Python framework for defining ML workflows that are reproducible, parameterized, and trackable.
Answer: Metaflow (or Kedro, ZenML)

Q570. ________ is a statistical method estimating the causal effect of treatment by comparing outcomes just above and below an eligibility cutoff.
Answer: Regression Discontinuity Design (RDD)

---

## ROUND TYPE: SCENARIO — ADVANCED

Q571. Your gradient boosting model is overfitting — training AUC is 0.98, validation AUC is 0.73. What do you do?
Answer: Large train-validation gap = severe overfitting. Systematic reduction of model complexity. First reduce learning rate (0.05 → 0.01) and increase n_estimators proportionally — slower learning generalizes better. Reduce max_depth (default 6 → 3-4 for LightGBM). Increase min_child_samples (min_data_in_leaf) — require more data per leaf. Add regularization: increase reg_alpha (L1) and reg_lambda (L2). Reduce feature_fraction and bagging_fraction (subsample of features and data per tree). Add early stopping against validation set. Also investigate: is the validation set representative of the training distribution? Is there leakage causing artificially high training AUC? Ensure validation uses a time-based split if data is temporal. After regularization, retune with cross-validation.

Q572. You are building a credit scoring model. Legal requires that the model must be auditable and explainable to regulators. How does this change your approach?
Answer: Regulatory requirements fundamentally shape model choice. Model selection: favor interpretable models — logistic regression with carefully engineered features, or a gradient boosting model with comprehensive SHAP documentation. Avoid black-box neural networks unless you can provide robust explanations. Documentation: maintain a model card documenting training data, feature definitions, performance metrics across demographic groups, and known limitations. Fairness: conduct disparate impact analysis — ensure no protected characteristics (race, gender, age, national origin) are used or proxied. Adverse action: implement SHAP-based individual explanations identifying the top factors for each declined application, as required by ECOA/FCRA. Validation: independent model validation before deployment. Governance: model risk management process with regular revalidation. Version control: all model versions, training data, and evaluation results archived. Regulators may request full audit trail.

Q573. You need to build a model predicting next month's revenue, but you only have 24 months of historical data. What concerns you and how do you proceed?
Answer: 24 months is very limited for time series forecasting. Concerns: you can estimate at most one full annual cycle of seasonality — any longer-period patterns are undetectable. With such limited data, complex models will overfit. Train-test split: 24 months leaves perhaps 18 months for training and 6 months for testing — very limited. Approach: favor simple, regularized models — Holt-Winters exponential smoothing, ARIMA with conservative parameter selection, or linear regression with trend and seasonal dummy variables. Use domain knowledge to inform the model — if revenue has known seasonal patterns, encode them explicitly. Be conservative with complexity: AIC/BIC model selection favoring parsimony. Wide prediction intervals: be explicit that uncertainty is high. Supplement with external data: industry benchmarks, macroeconomic indicators. Communicate limitations clearly — forecasts should be presented as scenarios with ranges, not point estimates.

Q574. A business stakeholder says "the model is 80% accurate so we should automate this decision." How do you respond?
Answer: "80% accurate" requires significant unpacking before recommending automation. What does 80% mean? Baseline accuracy: what would a naive classifier (always predict majority) achieve? If the majority class is 85%, 80% accuracy is worse than naive. Which errors matter more? In a medical test, 80% accuracy with 20% false negatives means missing 1 in 5 cases. In fraud detection, 80% with high false positives means flagging many legitimate customers. What is the cost of errors? What would a human review process achieve? Is the 80% measured on representative recent data or a favorable holdout? Questions before automation: what is precision? Recall? What happens for the 20% wrong predictions? Is there a human fallback? What is the volume — 20% wrong on 1M decisions is 200K errors. What is the regulatory environment? Automation is appropriate only when error rates and error costs are explicitly understood and accepted.

Q575. You are asked to recommend the best machine learning model for a new project. A colleague immediately suggests trying deep learning. How do you respond?
Answer: Model selection should be driven by the problem and data, not preference. Questions to ask first: what type of data? Deep learning excels at unstructured data (images, text, audio). For tabular data, gradient boosting (LightGBM/XGBoost) typically outperforms deep learning with much less data and tuning. How much data? Deep learning needs substantial data to show its advantage. With thousands of examples, traditional ML often wins. What are the constraints? Deep learning requires more compute, longer training, harder interpretation, and more complex deployment. What is the baseline? Always establish a simple baseline first — logistic regression, LightGBM. Only use deep learning if it offers demonstrated benefit on this specific problem. Recommendation: start with gradient boosting, establish strong baseline, measure the gap, then decide whether complexity of deep learning is justified by the performance gain.

---

## ROUND TYPE: MOCK INTERVIEW

Q576. Interviewer: Tell me about a data science project where your work had a measurable business impact.
How to answer: Structure using the STAR method (Situation, Task, Action, Result). Be specific about the business problem, the data you used, the methods you applied, how you validated results, and — critically — the quantified business outcome: "reduced churn by X%, increased revenue by $Y, saved Z analyst hours per week." Demonstrate that you connected technical work to business value, not just that you built a model. Show that you iterated, dealt with real-world messiness, and communicated results to non-technical stakeholders.

Q577. Interviewer: Explain the bias-variance tradeoff to someone with no statistics background.
Answer: Imagine you are throwing darts at a target. Bias is whether your darts tend to land in the wrong area — you are consistently off-target in a particular direction. Variance is whether your darts are spread out all over the place or clustered together. High bias and low variance: you consistently hit the same wrong spot. Low bias and high variance: your darts are centered on the target on average but scattered everywhere. Ideal: low bias and low variance — consistently hitting near the bullseye. In machine learning: a simple model (like a straight line) has high bias (misses patterns) but low variance (stable). A complex model has low bias (fits everything) but high variance (changes dramatically with different data). The art is finding the right complexity for your specific dataset.

Q578. Interviewer: You have been given a dataset and asked to predict customer lifetime value. Walk me through your approach from start to finish.
Answer: Define the target: is LTV revenue, profit, or engagement? Over what time horizon? Using what discount rate? Data audit: what behavioral, transactional, and demographic data is available? Time-based split: future LTV cannot be in training features. Feature engineering: recency of last purchase, purchase frequency, average order value, product category breadth, channel