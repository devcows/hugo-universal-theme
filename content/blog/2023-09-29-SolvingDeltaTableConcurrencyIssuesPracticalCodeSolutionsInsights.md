---
title: "Solving Delta Table Concurrency Issues"
description: ""
date: 2023-09-30T17:29:06.599Z
preview: ""
draft: false
tags: ["delta","concurrency"]
categories: ["databricks","spark"]
banner: "https://cdn-images-1.medium.com/max/2000/0*QQtHSumIKaAxKya8"
---

## Solving Delta Table Concurrency Issues: Practical Code Solutions & Insights

Delta Lake is a powerful technology for bringing ACID transactions to your data lakes. It allows multiple operations to be performed on a dataset concurrently. However, dealing with concurrent operations can sometimes be tricky and may lead to issues such as `ConcurrentAppendException`, `ConcurrentDeleteReadException,` and `ConcurrentDeleteDeleteException.` In this blog post, we will explore why these issues occur and how to handle them effectively using a Python function, and how to avoid them with table design and using isolation levels and write conflicts.

![](https://cdn-images-1.medium.com/max/2000/0*QQtHSumIKaAxKya8)

## Why Do These Issues Happen?

* Concurrent Append Exception (`ConcurrentAppendException`):**
 This error happens when another operation is adding files to the same section (or any section in a table without partitions) that your operation is reading from. These file additions can happen due to INSERT, DELETE, UPDATE, or MERGE operations. By default, with the WriteSerializable isolation level, adding files without checking any data (known as blind INSERT operations) won’t cause any issues with any operation, even if they are working on the same section (or any section in a table without partitions). However, if the isolation level is changed to Serializable, then these blind additions may cause conflicts. This error is commonly seen during simultaneous DELETE, UPDATE, or MERGE operations. Even though these operations might be updating different sections, a conflict can occur if one operation is reading the same section that another operation is updating at the same time.

* Concurrent Delete Read Exception: 
It occurs when a transaction is trying to read a file that is being deleted by another transaction. This is to ensure that a transaction does not read data that is in the process of being deleted.

* Concurrent Delete Delete Exception:
 — Occurs when two transactions are trying to delete the same file.
 — Delta Lake ensures that a file is not deleted more than once.

## Understanding Isolation Levels: Serializable vs. WriteSerializable

Isolation levels in a database control how much transactions are protected from each other’s changes. Delta Lake on Databricks offers two such levels: Serializable and WriteSerializable.

**1. Serializable:**
 — This is the highest level of isolation.
 — It ensures that all write and read operations are done in a specific order, just like how they appear in the table’s history.
 — This means operations are carried out one by one, maintaining the order and ensuring the final result is as expected.

**2. WriteSerializable (Default):**
 — This level is a bit more relaxed compared to Serializable.
 — It guarantees order only for write operations, not for reads.
 — Even though it’s more relaxed, it’s still more strict than the Snapshot isolation level.
 — This level is used by default as it offers a good mix of data consistency and availability for most operations.

## Solution 1: Setting the Isolation Level:

* Use the `ALTER TABLE` command to set the isolation level to `Serializable` or `WriteSerializable`.

    ALTER TABLE <table-name> SET TBLPROPERTIES ('delta.isolationLevel' = 'WriteSerializable')

## Solution 2: Avoiding Conflicts Using Partitioning and Disjoint Command Conditions

When working with tables, sometimes two operations can clash or conflict, especially if they are working on the same set of files. This can cause problems and errors. But, there’s a way to avoid this! You can organize or partition your table based on certain columns that are often used in operations. This way, different operations work on different parts of the table, preventing them from clashing.

For example, imagine two commands — one is updating the table for dates after January 1, 2010, and another is deleting from the table for dates before January 1, 2010. These two can clash if the table is not organized by date, as both might try to change the same files. But if you partition the table by date, these operations won’t conflict, making things smooth and error-free.

However, be careful while choosing the column for partitioning. If you choose a column that has a lot of unique values, it can create a large number of subdirectories. This can lead to other issues, affecting the performance of operations on the table.

By using these strategies and understanding the insights from Databricks regarding isolation levels, row-level concurrency, and write conflicts, you can make your Delta operations more robust, reliable, and efficient.

## Solution 3: Code block with exponential retry

The Python code below offers a robust solution to address this challenge. It is designed to manage concurrent write operations to a Delta table or path by intelligently retrying the operation in the event of specific concurrent exceptions. Streaming_write_with_concurrent_retry takes parameters such as the data stream, maximum attempts, and others to provide flexibility and control. It employs a while loop to attempt the write operation continuously and waits for its completion. In case of concurrent exceptions, it increments the attempt counter and calculates the sleep time using an exponential backoff strategy before retrying the operation. This approach ensures that the write operation is eventually successful, providing reliability and efficiency in handling concurrent operations on Delta tables. Explore the code below to understand its workings and integrate it into your projects to enhance concurrent operations handling.

    from datetime import datetime
    from time import sleep
    from delta.exceptions import (
        ConcurrentAppendException,
        ConcurrentDeleteReadException,
        ConcurrentDeleteDeleteException,
    )
    import math
    
    
    def streaming_write_with_concurrent_retry(
        stream, max_attempts=3, indefinite=False, table=None, path=None
    ):
        """
        Handles concurrent write operations to a Delta table or path by retrying the operation
        in case of specific concurrent exceptions.
    
        :param stream: The data stream to be written.
        :param max_attempts: The maximum number of retry attempts. Default is 3.
        :param indefinite: If True, will keep retrying indefinitely. Default is False.
        :param table: The Delta table to write to.
        :param path: The path to write to.
        :return: The result of writer.awaitTermination().
        """
    
        attempt = 0  # Initialize attempt counter
    
        while True:
            try:
                # Choose the writer based on whether table or path is provided
                if table:
                    writer = stream.table(table)
                elif path:
                    writer = stream.start(path)
                else:
                    writer = stream.start()
    
                # Attempt to write and wait for termination
                return writer.awaitTermination()
    
            # Handle concurrent exceptions
            except (
                ConcurrentAppendException,
                ConcurrentDeleteReadException,
                ConcurrentDeleteDeleteException,
            ) as e:
    
                # Increment attempt counter
                attempt += 1
    
                # If indefinite is False and attempts have reached max_attempts, raise the exception
                if not indefinite and attempt >= max_attempts:
                    raise e from None
    
                # Calculate sleep time using exponential backoff strategy
                sleep_time = min(120, math.pow(2, attempt))
    
                # Sleep for the calculated time before retrying
                sleep(sleep_time)

### Solution 4: Row-Level Concurrency (Advanced Feature)?

* Reduces conflicts between concurrent write operations by detecting changes at the row level.

* Automatically resolves competing changes in concurrent writes that update or delete different rows in the same data file.
>  Available only on Delta tables with deletion vectors enabled and on Photon-enabled compute running Databricks Runtime 14.0 and above.

### Reference
[**Isolation levels and write conflicts on Databricks**
*Learn about the isolation levels and potential conflicts when performing concurrent transactions on tables on…*docs.databricks.com](https://docs.databricks.com/en/optimizations/isolation-level.html)

## Thank You for Reading!

I hope you found this article helpful and informative. If you enjoyed this post, please consider giving it a clap 👏 and sharing it with your network. Your support is greatly appreciated!

— [**CanadianDataGuy](https://canadiandataguy.com/)**
