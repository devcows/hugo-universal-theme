---
title: Spark Streaming Best Practices-A bare minimum checklist for Beginners and Advanced Users
description: ""
date: 2023-04-19T01:04:45.471Z
preview: ""
draft: false
tags : ["delta"]
categories : ["best practices","spark streaming"]
banner: "https://miro.medium.com/v2/resize:fit:720/format:webp/0*cz6kE2uu4BUvfTo6.jpg"
---

## Spark Streaming Best Practices-A bare minimum checklist for Beginners and Advanced Users

Most good things in life come with a nuance. While learning Streaming a few years ago, I spent hours searching for best practices. However, I would find answers to be complicated to make sense for a beginner’s mind. Thus, I devised a set of best practices that should hold true in almost all scenarios.

The below checklist is not ordered, you should aim to check off as many items as you can.

![](https://cdn-images-1.medium.com/max/5200/0*cz6kE2uu4BUvfTo6.jpg)

## Beginners best practices checklist for Spark Streaming:

* [ ] Choose a trigger interval over nothing at all because it helps control storage transaction api/Listing costs. This is because some Spark jobs have a component which requires a s3/adls listing operation. If our processing is very fast think <1 sec, we will keep repeating these operations and lead to unintended costs. Example .trigger(processingTime=’5 seconds’)

* [ ] Use ADLS Gen2 on Azure over blob storage as it’s better suited for big data analytics workloads. [Read more on the differences here.](https://medium.com/awesome-azure/azure-difference-between-azure-blob-storage-and-azure-data-lake-storage-comparison-azure-blob-vs-adls-gen2-81af5ef2a6e1)

* [ ] Make sure the table partition strategy is chosen carefully and on low cardinality columns like date , region, country, etc. My rough rule of thumb says, if you have more than 100,000 partitions then you have over-partitioned your table. Date columns make a good partition column because they occur naturally. Example for a multinational e-commerce company which operates in 20 countries and wants to store 10 years of data. Once you partition by date & country =( 365 * 10 ) * 20 = you will end up with 73,000 partitions.

* [ ] Name your streaming query so it is easily identifiable in the Spark UI Streaming tab.

.option(“queryName”, “IngestFromKafka”)

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

## Advanced best practices checklist for Spark Streaming:

* Establish a naming convention for your checkpoint: Over the course of the life of your table, you will end up having multiple checkpoints due to application upgrades, logic changes, etc. Give your checkpoint a meaningful name something which tells the following:
  * Target table name
  * Starting timestamp: When the checkpoint came into existence
  * Example naming conventions can be :
    * Generic {table_location}/_checkpoints/_{target_table_name}_starting_timestamp{_actual_timestamp[}](https://lablab.ai/event)
    * If source is Delta then use startingVersion {table_location}/_checkpoints/_{target_table_name}_startingVersion{_startingVersion[}](https://lablab.ai/event)

* See Shuffle Spill (Disk) on Spark UI to be as minimum as possible. Ideally zero only shuffle read should be there. Shuffle spill disappears from UI if it’s zero.

* Use rocks DB , if there are stateful transformations.

* Prefer to Azure Event Hub using it it’s Kafka connector. For Azure EventHubs, the number of cores must be == to number of partitions. With Kafka connector it is different, as it can split Kafka partition into multiple Spark partitions, and this is one of the reasons to go with Kafka protocol on EventHubs.

* If there is state always have a watermark so it can clean itself. In case you need to have infinite state, recommend you to store that in a Delta table and zorder on necessary column so lookups are fast.

* At big scale, think close to Trillions of records in state store. If there is a deduplicate requirement, use delta merge approach over drop duplicate to avoid state store growing very large.

* Azure instance family choices:
  * F-series for map-heavy streams — parsing, json deserialization, etc.
  * Fsv2-series if doing multiple streams from the same source or need a little spill space.
  * DS_v2-series for streams that join tables or do aggregations. Also for delta optimize (both bin-packing and Z-Ordering) scheduled jobs
  * L series has direct attached SSD which helps Delta caching

* Don’t set the sql.shuffle.partitions too high — ideally they should be set to be equal to the total number of worker cores. You will need to clear the check point if it is not changing. It is because checkpoint has stored this information and is using that.

## References:

 1. [best practices from this page](https://docs.microsoft.com/en-us/azure/databricks/structured-streaming/production)

 2. [youtube video](https://www.youtube.com/watch?v=u2YItAN7TDg&t=1974s) with tips on how to scale at production

### Footnote:

Thank you for taking the time to read this article. If you found it helpful or enjoyable, please consider clapping to show appreciation and help others discover it. Don’t forget to follow me for more insightful content, and visit my website [**CanadianDataGuy.com](https://canadiandataguy.com)** for additional resources and information. Your support and feedback are essential to me, and I appreciate your engagement with my work.