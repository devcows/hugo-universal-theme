---
title: "How to upgrade your Spark Stream application with a new checkpoint!"
date: 2023-01-25T17:35:21-05:00
draft: false
tags : ["delta live tables","checkpoint","kafka"]
categories : ["streaming","spark streaming"]
banner: "https://miro.medium.com/v2/resize:fit:720/0*42drq4qeYGri5KRH"
---

## How to upgrade your Spark Stream application with a new checkpoint With working code

Sometimes in life, we need to make breaking changes which require us to create a new checkpoint. Some example scenarios:

 1. You are doing a code/application change where you are changing logic

 2. Major Spark Version upgrade from Spark 2.x to Spark 3.x

 3. The previous deployment was wrong, and you want to reprocess from a certain point

There could be plenty of scenarios where you want to control precisely which data(Kafka offsets) need to be processed.

Not every scenario requires a new checkpoint. [Here is a list of things you can change without requiring a new checkpoint.](https://docs.databricks.com/structured-streaming/query-recovery.html#types-of-changes-in-structured-streaming-queries)

This blog helps you understand how to handle a scenario where a new checkpoint is unavoidable.

![Photo by [Patrick Tomasso](https://unsplash.com/@impatrickt?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)](https://cdn-images-1.medium.com/max/9184/0*42drq4qeYGri5KRH)

## Kafka Basics: Topics, partition & offset

**Kafka Cluster has Topics: **Topics are a way ****to organize messages. Each topic has a name that is unique across the entire Kafka cluster. Messages are sent to and read from specific topics. In other words, producers write data on a topic, and consumers read data from the topic.

Topics have **Partitions, **and data/messages are distributed across partitions. Every message belongs to a single partition.

Partition has messages, each with a unique sequential identifier within the partition called the **Offset.**

**What is the takeaway here?**

We must identify what offset has already been processed for each partition, and this information can be found inside the checkpoint.

![](https://cdn-images-1.medium.com/max/6900/1*VQWCgcWIIgBJnzpjAaDj_A.png)

## What information is inside the checkpoint?

* Fetch metadata & write it to WAL(write-ahead log) in the checkpoint. **WAL**: a roll-forward journal that records transactions that have been committed but not yet applied to the main data

* Fetch the actual data → process data with state info and then write it to the sink

* Write the stateful information & commit to the checkpoint

Under the checkpoint folder, there are four subfolders:

 1. Sources (contain starting offset of Kafka)

 2. Offsets (consist of WAL information)

 3. Commits (after completion of the entire process, it goes to the commit)

 4. State (only for stateful operations + 1 file of metadata)

## How to fetch information about Offset & Partition from the Checkpoint folder?

List the files at the checkpoint location; we are looking for the **offsets** folder.

    checkpoint_location= "/checkpoint_location/checkpoint_for_kafka_to_delta"
    dbutils.fs.ls(checkpoint_location)dbutils.fs.ls(f”{checkpoint_location}/”)

![](https://cdn-images-1.medium.com/max/4952/1*PfyMkhWGTUh5nxJHRoG5ug.png)

Next, we will list the files under the commits folder and identify the most recent commits.

    dbutils.fs.ls(checkpoint_location)
    dbutils.fs.ls(f”{checkpoint_location}/commits”)

    /checkpoint_location/checkpoint_for_kafka_to_delta/commits/0
    /checkpoint_location/checkpoint_for_kafka_to_delta/commits/1
    /checkpoint_location/checkpoint_for_kafka_to_delta/commits/2

Once we identify the last **commits** file number; we will open the equivalent offsets file. In this example, we can see the latest commits is “**2”.**

Now let’s view the contents of the offsets file.

    #%fs head {FILL_THE_EXACT_PATH_OF_THE_FILE_WHICH_NEEDS_TO_BE_VIEWED}
    %fs head /checkpoint_location/checkpoint_for_kafka_to_delta/offsets/2
    
    {"batchWatermarkMs":0,"batchTimestampMs":1674623173851,"conf":{"spark.sql.streaming.stateStore.providerClass":"org.apache.spark.sql.execution.streaming.state.HDFSBackedStateStoreProvider","spark.sql.streaming.join.stateFormatVersion":"2","spark.sql.streaming.stateStore.compression.codec":"lz4","spark.sql.streaming.stateStore.rocksdb.formatVersion":"5","spark.sql.streaming.statefulOperator.useStrictDistribution":"true","spark.sql.streaming.flatMapGroupsWithState.stateFormatVersion":"2","spark.sql.streaming.multipleWatermarkPolicy":"min","spark.sql.streaming.aggregation.stateFormatVersion":"2","spark.sql.shuffle.partitions":"200"}}
    {"topic_name_from_kafka":{"0":400000, "1":300000}}

The information of interest is in the end. This has the topic name and offset per partition.

*{“topic_name_from_kafka”:{“0”:400000, “1”:300000}}*

## Now the easy part: Use Spark to start reading Kafka from a particular Offset

Spark Streaming start[s read stream by default ](https://spark.apache.org/docs/latest/structured-streaming-kafka-integration.html#creating-a-kafka-source-for-streaming-queries)with the *latest *offset. However, it provides a parameter “startingOffsets” to select a custom starting point.

    
    startingOffsets = """{"topic_name_from_kafka":{"0":400000, "1":300000}}"""
    
    kafka_stream = (spark.readStream
      .format("kafka")
      .option("kafka.bootstrap.servers", kafka_bootstrap_servers_plaintext ) 
      .option("subscribe", topic )
      .option("startingOffsets", startingOffsets )
      .load())
    
    display(kafka_stream)

And we are Done!!. Recommend parameterizing your code so that “startingOffsets” can be passed as a parameter.

### Footnotes

If you’re interested in learning more and keeping up to date with the latest about Spark, Delta, Python, SQL, Terraform, and other big data technologies, check out my [other blogs and follow](https://canadiandataguy.medium.com/).

