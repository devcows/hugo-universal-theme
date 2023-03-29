---
title: "Spark Streaming Best Practices-A bare minimum checklist for beginners"
date: 2022-10-27T05:32:28-05:00
draft: false
tags : ["delta"]
categories : ["best practices","spark streaming"]
banner: "https://miro.medium.com/v2/resize:fit:720/format:webp/0*cz6kE2uu4BUvfTo6.jpg"
---

## Spark Streaming Best Practices-A bare minimum checklist for beginners

Most good things in life come with a nuance. While learning Streaming a few years ago, I spent hours searching for best practices. However, I would find answers to be complicated to make sense for a beginner’s mind. Thus, I devised a set of best practices that should hold true in almost all scenarios.

![](https://cdn-images-1.medium.com/max/5200/0*cz6kE2uu4BUvfTo6.jpg)

Here is my best practices checklist for Spark Streaming without a specific order:

* [ ] Choose a trigger interval over nothing at all because it helps control storage transaction api/Listing costs. This is because some Spark jobs have a component which requires a s3/adls listing operation. If our processing is very fast think <1 sec, we will keep repeating these operations and lead to unintended costs. Example .trigger(processingTime=’5 seconds’)

* [ ] Use ADLS Gen2 on Azure over blob storage as it’s better suited for big data analytics workloads. [Read more on the differences here.](https://medium.com/awesome-azure/azure-difference-between-azure-blob-storage-and-azure-data-lake-storage-comparison-azure-blob-vs-adls-gen2-81af5ef2a6e1)

* [ ] Make sure the table partition strategy is chosen carefully and on low cardinality columns like date , region, country, etc. My rough rule of thumb says, if you have more than 100,000 partitions then you have over-partitioned your table. Date columns make a good partition column because they occur naturally. Example for a multinational e-commerce company which operates in 20 countries and wants to store 10 years of data. Once you partition by date & country =( 365 * 10 ) * 20 = you will end up with 73,000 partitions.

* [ ] Name your streaming query so it is easily identifiable in the Spark UI Streaming tab.

**.option(“queryName”, “IngestFromKafka”)**

    (input_stream
       .select(col("eventId").alias("key"), to_json(struct(col('action'), col('time'), col('processingTime'))).alias("value"))
       .writeStream
       .format("kafka")
       .option("kafka.bootstrap.servers", kafka_bootstrap_servers_plaintext )
       .option("kafka.security.protocol", "to_be_filled")
       .option("checkpointLocation", checkpoint_location )
       .option("topic", topic)
       .option("queryName", "IngestFromKafka")
       .start()
    )

    
    spark.readStream.format(“kinesis”).**option(“streamName”, stream_name)
    **

* [ ] Each stream must have its own checkpoint; streams must never share checkpoints. Example, if you have 2 separate streams of different sources and data needs to be written to a single delta table. You should create 2 separate checkpoints and not share a common one. You can find an example with code [here](https://canadiandataguy.medium.com/merge-multiple-spark-streams-into-a-delta-table-44301fd549bd).

* [ ] Don’t run multiple streams on the same driver; if such requirements are there, please benchmark it by running the streams for a few days and watch for stability over driver-related issues. Multiplexing on the same cluster is generally not recommended.

* [ ] Partition size of data in memory should be between 100–200MB. Use Spark UI and alter maxFilesPerTrigger & maxBytesPerTrigger to achieve these partition sizes of around 100–200 MB.

* [ ] Check if a sort merge join can be changed to Broadcast hash join. Only possible if the dataset being joined is small. The dataset being broadcasted should be around 100 MB. Increase auto-broadcast hash join threshold to 1gb if needed try a bigger instance family.

Learn more in-depth [best practices from this page](https://docs.microsoft.com/en-us/azure/databricks/structured-streaming/production) & [youtube video](https://www.youtube.com/watch?v=u2YItAN7TDg&t=1974s). If you do not want to worry about nitty-gritty details of streaming, then try out [delta live tables](https://www.databricks.com/product/delta-live-tables).


## Footnotes

If you’re interested in learning more and keeping up to date with the latest about Spark, Delta, DBT, Python, SQL, Terraform, and other big data technologies, check out my [other blogs and follow](https://canadiandataguy.medium.com/).