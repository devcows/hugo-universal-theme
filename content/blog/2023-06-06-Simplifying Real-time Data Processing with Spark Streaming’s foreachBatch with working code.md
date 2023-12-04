---
title: "Simplifying Real-time Data Processing with Spark Streaming’s foreachBatch with working code"
description: ""
date: 2023-06-06T17:29:06.599Z
preview: ""
draft: false
tags: ["delta","streaming","foreachbatch"]
categories: ["databricks","spark"]
banner: "https://cdn-images-1.medium.com/max/12000/0*nt5TZ66S99XLguFB"
---

## Simplifying Real-time Data Processing with Spark Streaming’s foreachBatch with working code

Comprehensive guide to implementing a fully operational Streaming Pipeline that can be tailored to your specific needs. In this working example, you will learn how to parameterize the ForEachBatch function.

![Photo by [Andrew Schultz](https://unsplash.com/@andrewschultz?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)](https://cdn-images-1.medium.com/max/12000/0*nt5TZ66S99XLguFB)

## Spark Streaming & foreachBatch

Spark Streaming is a powerful tool for processing streaming data. It allows you to process data as it arrives, without having to wait for the entire dataset to be available. This can be very useful for applications that need to respond to changes in data in real time.

One of the features of Spark Streaming is the foreachBatch() method. This method allows you to apply a custom function to each batch of data as it arrives. This can be useful for a variety of tasks, such as:

* Filtering data

* Transforming data

* Writing data to a database

* Sending data to an external system

The foreachBatch() method is a powerful tool that can be used to extend the capabilities of Spark Streaming. In this blog post, we will take a closer look at how to use foreachBatch().

### Introducing foreachBatch:

foreachBatch is a method provided by Spark Streaming that allows developers to apply arbitrary operations on the output of a streaming query. It acts as a bridge between the streaming world and the structured world of DataFrames and Datasets. This means that we can leverage the rich functionality of Spark's structured APIs to process real-time data efficiently.

### The Power of foreachBatch:

The foreachBatch operation enables developers to perform batch-like operations on streaming data. Instead of processing each individual record, which can be inefficient, foreachBatch processes the data in micro-batches, offering better performance and resource utilization. This approach also provides the flexibility to leverage the full power of Spark's DataFrames, including various transformations and aggregations, to perform complex computations on streaming data.

### Implementing foreachBatch:

To use foreachBatch, you need to define a function that takes two arguments: the batch identifier and the DataFrame representing the micro-batch of data. Inside this function, you can apply any transformations or computations required on the streaming data. You can use Spark's SQL, DataFrame, or Dataset APIs to manipulate the data and write the results to any external systems, such as databases or file systems.

### Benefits of foreachBatch:

 1. Performance: foreachBatch allows batch-like processing on streaming data, resulting in improved performance compared to processing individual records.

 2. Flexibility: Leveraging Spark’s DataFrames and Datasets provides a wide range of transformations and aggregations to handle complex computations easily.

 3. Scalability: Spark Streaming inherently provides scalability and fault-tolerance, and foreachBatch seamlessly integrates with these capabilities.

 4. Ecosystem Integration: The results from foreachBatch can be easily written to external systems such as databases, file systems, or streaming analytics platforms.

## Code & Setup

Here’s how we can use foreachBatch to achieve this:

 ∘ Define parameters for the job
 ∘ Create a Streaming source
 ∘ Define custom processing logic and parameters
 ∘ Create an instance of forEachBatchProcessor Class with the parameters
 ∘ Orchestrate the job
 ∘ Look at the output table
 ∘ Clean Up

### Define parameters for the job

    target_table_name = "for_each_batch_paramerterize"
    check_point_location = f"/tmp/delta/{target_table_name}/_checkpoints/"
    dedupe_colum_name ="hash"

### Create a Streaming source

We will create a synthetic dataset.

    generated_df = (
         spark.readStream
            .format("rate")
            .option("numPartitions", 4)
            .option("rowsPerSecond", 1 * 1000)
            .load()
            .selectExpr(
              "md5( CAST (value AS STRING) ) as md5"
              ,"value"
              ,"value%1000000 as hash"
            )
    )

### Define custom processing logic and parameters

    class forEachBatchProcessor:
        def __init__(self, dedupe_column: str, filter_criteria:str, passed_value: int):
            self.dedupe_column = dedupe_column
            self.filter_criteria = filter_criteria
            self.passed_value = passed_value
    
        def print_attributes(self):
            attributes = vars(self)
            print(
                "\n".join([f"{attr}: {value}" for attr, value in attributes.items()])
            )
    
        def make_changes_using_the_micro_batch(self, microBatchOutputDF, batchId: int):
            self.print_attributes()
            print(f"Processing batchId: {batchId}")
    
            # Your processing logic using the parameter
            view_name = f"updates_for_batchId_{batchId}"
            microBatchOutputDF.createOrReplaceTempView(view_name)
            sql_logic = f"""
                SELECT 
                    * 
                    ,{self.passed_value} as passed_value
                    ,{batchId} as batch_id
                FROM (
                  SELECT *
                    ,rank() over(partition by {self.dedupe_column} order by value desc) as dedupe
                  FROM {view_name}
                  WHERE  
                    {self.filter_criteria}
                  )
                WHERE 
                    dedupe =1 
            """
            print(f"Processing sql_logic: {sql_logic}")
            to_be_written_df = microBatchOutputDF.sparkSession.sql(sql_logic).drop("dedupe")
            to_be_written_df.write.mode("append").saveAsTable(target_table_name)

### Create an instance of forEachBatchProcessor Class with the parameters

    
    instantiateForEachBatchProcessor = forEachBatchProcessor(
                dedupe_column = dedupe_colum_name,
                filter_criteria = "1=1",
                passed_value = 3
            )

### Orchestrate the job

    (
      generated_df
     .writeStream
     #.trigger(availableNow=True) 
     .trigger(processingTime='10 seconds')
     .option("checkpointLocation", check_point_location)
     .option("queryName", "ParameterizeForEachBatch")
     .foreachBatch(instantiateForEachBatchProcessor.make_changes_using_the_micro_batch)
     .start()
    )

### Look at the output table

    display(spark.read.table(target_table_name))

### Clean Up

    spark.sql(f"""
              DROP TABLE IF EXISTS {target_table_name}
              """)
    dbutils.fs.rm(check_point_location,True)

## Conclusion:

Apache Spark Streaming’s foreachBatch operation is a powerful tool for simplifying real-time data processing. By bridging the gap between the streaming and structured worlds, it enables developers to perform batch-like operations on streaming data efficiently. Leveraging the rich functionality of Spark's DataFrames, foreachBatch empowers users to process and analyze real-time data with ease. Whether you're performing aggregations, transformations, or writing data to external systems, foreachBatch offers a flexible and scalable solution for real-time streaming applications.

## Footnote:

Thank you for taking the time to read this article. If you found it helpful or enjoyable, please consider clapping to show appreciation and help others discover it. Don’t forget to follow me for more insightful content, and visit my website [**CanadianDataGuy.com](https://canadiandataguy.com/)** for additional resources and information. Your support and feedback are essential to me, and I appreciate your engagement with my work.

### [Download the code](https://github.com/jiteshsoni/material_for_public_consumption/blob/main/notebooks/Spark%20Streaming%20With%20Custom%20Parameters%20For%20Each%20Batch.py)
>  I want to emphasize that my blog posts are designed to be practical resources that you can readily use in your own environments. By providing code examples with careful attention to best practices, I aim to simplify the implementation of real-time data processing solutions. I encourage you to explore the blog, copy the code snippets, and adapt them to your specific needs. With these resources, you’ll be equipped to accelerate your development process and unlock the power of Spark Streaming. Dive in, leverage the code, and start building your real-time data processing pipelines with confidence!
>  Go Build!
>  Canadian Data Guy!
