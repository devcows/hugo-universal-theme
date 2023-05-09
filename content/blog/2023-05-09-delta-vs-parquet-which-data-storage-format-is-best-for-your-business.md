---
title: "Delta vs Parquet: Why Delta has won the game?"
description: ""
date: 2023-05-09T15:27:37.781Z
preview: ""
draft: false
tags: ["delta","parquet"]
categories: ["spark"]
---


In the world of big data, there are many file formats available to store data. Two of the most popular formats are Parquet and Delta. Both of these formats have their own advantages and disadvantages, and choosing the right one can have a significant impact on the performance and cost of your big data project.

## Origins
|||
|---|---|
|Parquet|Parquet is an open-source file format that was created by Cloudera and Twitter in 2013. It was designed to be a columnar storage format that is optimized for use with Hadoop and other big data frameworks.|
| Delta|  Delta is a file format that was created by Databricks, the company behind the popular Apache Spark framework. It was designed to address some of the shortcomings of Parquet, while also adding new features like versioning and transaction support.
|||


## Pros and Cons
||Parquet| Delta|
|---|---|---|
|Pros| 1. Columnar storage: Parquet is designed to store data in a columnar format, which can significantly improve query performance. Because data is stored in columns rather than rows, queries can quickly skip over columns that are not needed. <br><br> 2. Compression: Parquet has built-in compression capabilities, which can reduce the amount of disk space required to store data. This can help reduce storage costs.<br><br> 3. Wide adoption: Parquet has become a de facto standard for storing big data in Hadoop and other big data frameworks, so there are many tools and libraries available that support it.|     1. Delta is built on top of the Parquet format, which means it inherits many of its performance and efficiency benefits. <br><br> 2. It adds support for transactional operations, such as ACID (Atomicity, Consistency, Isolation, Durability) transactions, making it suitable for use cases where data consistency and integrity are critical. <br><br> 3. Delta provides built-in support for data versioning, which makes it easy to track changes to data over time. <br><br> 4. It includes features like schema enforcement and data validation to ensure data quality.|
|Cons|1. Not ideal for small files: Parquet is optimized for storing large files, so it may not be the best choice if you need to store many small files. <br><br> 2. Slow writes: Writing data to Parquet can be slow, especially if you are using compression.| 1. Limited adoption: Delta is a relatively new file format, so it may not be as widely adopted as Parquet. <br><br> 2. More complex: Delta has more features than Parquet, which can make it more complex to use and maintain. <br><br> 3. Higher storage costs: Delta stores additional metadata to support its versioning and transaction features, which can increase storage costs.| 
||||

Parquet is an open-source file format that was created by Cloudera and Twitter



## Conclusion
Delta is an ideal storage format for analytics and AI due to its transactional support and versioning capabilities, which ensure data consistency and integrity. The format is designed to handle complex data workloads, and its ability to efficiently store and manage large amounts of data makes it a popular choice for big data applications. Overall, the combination of Delta's transactional support, versioning, and performance characteristics make it an excellent choice for organizations looking to optimize their big data storage and processing capabilities for analytics and AI.