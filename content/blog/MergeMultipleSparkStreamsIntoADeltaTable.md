---
title: "Merge Multiple Spark Streams Into A Delta Table"
date: 2022-10-13T04:09:03-05:00
draft: false
tags : ["merge","optimize","z order","foreachBatch"]
categories : ["streaming","spark streaming"]
banner: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*mJcyWScvq8JuU0cg_yQN5g.png"
---
This blog will discuss how to read from multiple Spark Streams and merge/upsert data into a single Delta Table. We will also optimize/cluster data of the delta table.

Overall, the process works in the following manner:

1.  Read data from a streaming source
2.  Use this special function foreachBatch. Using this we will call any user-defined function responsible for all the processing.
3.  Our user-defined function runs the Merge and Optimize over the target Delta table.

{{< medium url="https://medium.com/@canadiandataguy/merge-multiple-spark-streams-into-a-delta-table-44301fd549bd" >}}