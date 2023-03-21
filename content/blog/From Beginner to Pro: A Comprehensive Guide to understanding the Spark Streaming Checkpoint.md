---
title: "Dive Deep into Spark Streaming Checkpoint"
description: ""
draft: false
date: 2023-03-21T06:14:44.575Z
draft: false
tags : ["checkpoint","streaming","spark streaming"]
categories : ["streaming","databricks"]
banner: "https://images.unsplash.com/photo-1574645434327-cb7970fe2e13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
---

# From Beginner to Pro: A Comprehensive Guide to understanding the Spark Streaming Checkpoint


Spark is a distributed computing framework that allows for processing large datasets in parallel across a cluster of computers. When running a Spark job, it is not uncommon to encounter failures due to various issues such as network or hardware failures, software bugs, or even insufficient memory. One way to address these issues is to re-run the entire job from the beginning, which can be time-consuming and inefficient. To mitigate this problem, Spark provides a mechanism called checkpointing.

![](https://miro.medium.com/v2/resize:fit:720/0*ak1MMnA6tCrEkkNT)

## Why do we even need a checkpoint?
Someone needs to remember what was done before or what was processed before, or what we know so far. All this information needs to be stored somewhere. The place where this is stored is called a Checkpoint. 





## How does checkpoint work?
Think of it as a 3 step process:

1. Fetch the source metadata and write to Write Ahead Log (WAL)/Offsets
2. Fetch the source data, process it, and write to sink
3. Write state & commit information

Checkpoints store the current offsets and state values (e.g. aggregate values) for your stream. Checkpoints are stream specific, so each should be set to its own location. 



> This is an advanced blog and should be read with the expectation of familiarizing and not understanding. Read this and bookmark it; once you come across a situation where you need to dig into the checkpoint, this blog will come in handy. 



## What is inside a checkpoint folder?
It will have 3 folders inside it and a metadata file:
* offsets: This contains the WAL information.
* commits: Once data is processed, the offset information will go inside it
* State: Only if stateful operations are involved.

  
* metadata: Metadata about the stream. This is a file

![list of files](https://lh3.googleusercontent.com/wvwCRGZhF2PCv1K87iVQXx889xijfZQMl8ouEoycJmISg3NJZRMOSH6L_P5uyGCXSToPE4PKdoV9lv1GmfHEIcXwyw0zxZRYN9MppbABZ9oOJEoGidJIiudkeyhwNQO0l3A5PxxbUYysGn-urbN2fi8)



### What is inside the Offsets file?
The easiest way to think about it is that once we start processing a micro-batch of data. We need to store an upper bound mark and a lower bound mark of the data. This mark could be called an offset. Think if you a measuring something with a scale and you need to log the reading. This reading, aka the offset, we will store in the offsets file.

![Water Ruller](https://media.istockphoto.com/id/453511059/photo/deep-water-guage.jpg?s=612x612&w=is&k=20&c=FUjA9o3QJ-qW8DNWR7QLtjBczBm0jt82y9SbTT9eNRI=)




Different sources like Kafka, Kinesis, Delta, etc., all have different ways of defining offsets, but conceptually they are the same.

* Kafka: you will find { "topic_name: {"partition_number": offset_number } . More information can be found in this [blog](https://medium.com/@canadiandataguy/how-to-upgrade-your-spark-stream-application-with-a-new-checkpoint-4dce7fa2cd96).

For this blog, let's concentrate on Delta as a streaming source.

* Reservoir ID (aka Table ID): This is your Delta Table id
* reservoirVersion is the version of the Delta table that the micro-batch(current stream execution) started with
* Index: File index of the current Delta Table version being processed. Every time you write to a Delta table, the Table version is incremented. As part of the write operation, multiple files are written. Within that Delta Table Version, the file number being processed is represented by the index. 
* isStartingVersion: This is just true or false. It is true to denote a query starting rather than processing changes.



![offsets](https://lh5.googleusercontent.com/vfg-MulqfyLYZg283T4SUXTnDk_69k2LLdDID3TUPw18_JhAcuMEGzhYUK1cUOCd5bksGK5baQ_jd1WdEyAL0XaScX89gcdfCboXC2qaiZShqjqaQr-VeEotykz-iEn0q-Q9z2XRXOynzHgm6760Pmo)




### Metadata
This stores the stream-id, which is generated when the stream starts and remains the same throughout the life of the checkpoint.




![metadata](https://lh5.googleusercontent.com/6e-50SDaKfOdxQZ8gzX6xbdY9pNNfvQzWlLvaTM1-DcdQfRKBRPKaMiEED3QB4AbfBpE5JfktYDMbn1EVfH7We8aIV3VO46Gq27on4TXIQNeFlmJbye7lxP99trJP46yDifB4uFnfJtceD_nyFOmdZ0)




### Commits
These files are generated only when the micro-batch succeeds. Offsets are generated at the start of the micro-batch. If the offset did not have a corresponding commit, a failure happened when processing that offset. 

In an ideal scenario, the number of commit files equals the number of offset files. However, when they are not equal, the next Spark Streaming knows where to start because it's stored in the offset file, which did not have a corresponding commit. Furthermore, watermarking information would be found here.





![commits](https://lh3.googleusercontent.com/9AYQ33-jCAF0lOt6-BglpbM61m5u0R5L9jPdwVz-vDGGnNNIJlQulLPSdggnpMNeCX90u5p-MJfzk39rOkTR03JOSdCA9d1e_hD9AbjwTiSRseLlmnq9RaaWLQ6JrsvhCwgCase3-Kl-7PTyHfT9Pnc)




### State Store
This folder only has data in the case of Stateful Streaming, where the State is stored on disk for resiliency purposes. Thus when failures happen, the state can be recovered from here. 
* State is also stored as a Delta table
* _metadata  will hold the schema of the state





![state](https://lh5.googleusercontent.com/uJUjG1bSX73eC0HJhBMTwuqgLyDBLmdrh6Ra0OR5TOg22jLbPoGt9Oxgh5qpUZj5iyyl5R6SUsLvNx6aX1kTgPiXdce3xsYe14nU6qqymboHl13lOCZ2ETUI4tat2kTXOr8_fgXkPvKXC5PbUsFGwaQ)


 

------------------------------
------------------------


## References
Please spare some time to look at the below to help absorb the above content further.
1. <https://www.youtube.com/watch?v=1cBDGsSbwRA&t=442s>
2. https://www.databricks.com/blog/2022/12/12/streaming-production-collected-best-practices.html


