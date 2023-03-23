---
title: "Using Spark Streaming to merge/upsert data into a Delta Lake with working code"
date: 2022-10-12T04:06:14-05:00
draft: false
tags : ["merge","optimize","z order","foreachBatch","kafka"]
categories : ["streaming","spark streaming" ,"databricks"]
banner: "https://miro.medium.com/v2/resize:fit:720/format:webp/0*7Vzrx4tKynxXNKNg.jpg"
---
This blog will discuss how to read from a Spark Streaming and merge/upsert data into a Delta Lake. We will also optimize/cluster data of the delta table. In the end, we will show how to start a streaming pipeline with the previous target table as the source.

Overall, the process works in the following manner, we read data from a streaming source and use this special function foreachBatch. Using this we will call any user-defined function responsible for all the processing. This function encapsulates the Merge and Optimize to the target Delta table.

{{< medium url="https://towardsdev.com/using-spark-streaming-to-merge-upsert-data-into-a-delta-lake-6d34c827a892" >}}