---
title: "Optimizing Databricks SQL: Achieving Blazing-Fast Query Speeds at Scale"
description: ""
date: 2023-09-12T17:29:06.599Z
preview: ""
draft: false
tags: ["delta"]
categories: ["databricks","spark"]
banner: "https://cdn-images-1.medium.com/max/11438/0*57KLQ0FORwBigKqQ"
---


## Optimizing Databricks SQL: Achieving Blazing-Fast Query Speeds at Scale

In this data age, delivering a seamless user experience is paramount. While there are numerous ways to measure this experience, one metric stands tall when evaluating the responsiveness of applications and databases: the P99 latency. Especially vital for SQL queries, this seemingly esoteric number is, in reality, a powerful gauge of the experience we provide to our customers. Why is it so crucial? And how can we optimize it to ensure our databases aren’t just fast, but consistently reliable for 99% of our users? Join us as we demystify P99 latency and delve into strategies to fine-tune it in Databricks SQL.

![Photo by [Håkon Sataøen](https://unsplash.com/@haakon?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)](https://cdn-images-1.medium.com/max/11438/0*57KLQ0FORwBigKqQ)

## What is P99 Latency?

The P99 latency (also known as the 99th percentile latency) for SQL queries is a metric used to measure the response time of SQL queries in a database system. It represents the latency at which 99% of the queries have a response time less than or equal to the P99 latency value, and 1% have a response time greater than the P99 latency value.
>  In other words, P99 latency helps you understand the worst-case response time for most of your SQL queries. It is often used to evaluate the performance of a database system and ensure that the vast majority of queries are responding quickly, even under heavy load.

For example, if the P99 latency for a particular SQL query is 100 milliseconds, it means that 99% of the time, that query will execute in 100 milliseconds or less. However, in 1% of cases, it may take longer than 100 milliseconds.

### To achieve a P99 latency of 5 seconds in Databricks SQL, you can follow these steps:

 1. Optimize the table hourly by applying a WHERE filter on the timestamp.

 2. Use at least a Medium instance of DBSQL. Larger instances provide better query performance if queries rely on caching. Caching is done at the instance level; if you have N small instances, then you will have N copies of Cached data occupying memory.

 3. Set spark.databricks.delta.stalenessLimit to x minutes per business requirements[. This parameter defines how many minutes of old data are acceptable.](http://spark.databricks.delta.stalenessLimit)

 4. Ensure that the columns used in the WHERE clause are part of the first 32 columns.

 5. Run VACUUM tables at daily or weekly cadence.

 6. Once you have achieved your P99 latency with the above suggestions, try DBSQL Serverless and monitor P99 latency. Serverless DB Sql would give you faster startup times and more performance because of faster auto-scaling capabilities.
>  If you need to power an application with minimum latency, it’s possible to pre-cache data using specific commands. However, it’s important to take caution while using these commands as misconfiguration can cause more harm than good. It’s recommended to reach out to me or your Databricks representative for the command and have the scenario validated with Databricks before implementing it. I have not included the command in the blog to avoid any mishaps.

## Reference:

 1. spark.databricks.delta.stalenessLimit [https://docs.databricks.com/en/delta/best-practices.html#manage-data-recency](https://docs.databricks.com/en/delta/best-practices.html#manage-data-recency)

 <iframe src="https://medium.com/media/046ffb187676765cdc927cc87e141bc9" frameborder=0></iframe>

[3. https://www.youtube.com/watch?v=rJDkfRPUebw&t=629s](https://www.youtube.com/watch?v=rJDkfRPUebw&t=629s)
