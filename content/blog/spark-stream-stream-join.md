---
title: How to write your first Spark application with Stream-Stream Joins with working code.
description: "Have you been waiting to try Streaming Joins but have been unable to take the plunge?
In a single blog, we will teach you whatever needs to be understood, along with an end-to-end pipeline, which you can copy-paste and make your own."
date: 2023-03-23T06:32:42.122Z
preview: "Have you been waiting to try Streaming Joins but have been unable to take the plunge?

In a single blog, we will teach you whatever needs to be understood, along with an end-to-end pipeline, which you can copy-paste and make your own."
draft: false
tags : ["checkpoint","streaming","spark streaming"]
categories : ["streaming","databricks"]
banner: "https://cdn-images-1.medium.com/max/2560/1*eds6wrWUDMfdL9I48-heFQ.jpeg"
---

## How to write your first Spark application with Stream-Stream Joins with working code.

Have you been waiting to try Streaming but cannot take the plunge?

In a single blog, we will teach you whatever needs to be understood about Streaming Joins. We will give you a working code which you can use for your next Streaming Pipeline.

The steps involved:

 1. Create a fake dataset at scale
 2. Set a baseline using traditional SQL
 3. Define Temporary Streaming Views
 4. Inner Joins with optional Watermarking
 5. Left Joins with Watermarking
 6. The cold start edge case: withEventTimeOrder
 7. Cleanup

![](https://cdn-images-1.medium.com/max/2560/1*eds6wrWUDMfdL9I48-heFQ.jpeg)

## What is Stream-Stream Join?

Stream-stream join is a widely used operation in stream processing where two or more data streams are joined based on some common attributes or keys. It is essential in several use cases, such as real-time analytics, fraud detection, and IoT data processing.

### Concept of Stream-Stream Join

Stream-stream join combines two or more streams based on a common attribute or key. The join operation is performed on an ongoing basis, with each new data item from the stream triggering a join operation. In stream-stream join, each data item in the stream is treated as an event, and it is matched with the corresponding event from the other stream based on matching criteria. This matching criterion could be a common attribute or key in both streams.

When it comes to joining data streams, there are a few key challenges that must be addressed to ensure successful results. One of the biggest hurdles is the fact that, at any given moment, neither stream has a complete view of the dataset. This can make it difficult to find matches between inputs and generate accurate join results.

To overcome this challenge, it’s important to buffer past input as a streaming state for both input streams. This allows for every future input to be matched with past input, which can help to generate more accurate join results. Additionally, this buffering process can help to automatically handle late or out-of-order data, which can be common in streaming environments.

To further optimize the join process, it’s also important to use watermarks to limit the state. This can help to ensure that only the most relevant data is being used to generate join results, which can help to improve accuracy and reduce processing times.

### Types of Stream-Stream Join

Depending on the nature of the join and the matching criteria, there are several types of stream-stream join operations. Some of the popular types of stream-stream join are:

**Inner Join**
In inner join, only those events are returned where there is a match in both the input streams. This type of join is useful when combining the data from two streams with a common key or attribute.

**Outer Join**
In outer join, all events from both the input streams are included in the joined stream, whether or not there is a match between them. This type of join is useful when we need to combine data from two streams, and there may be missing or incomplete data in either stream.

**Left Join**
In left join, all events from the left input stream are included in the joined stream, and only the matching events from the right input stream are included. This type of join is useful when we need to combine data from two streams and keep all the data from the left stream, even if there is no matching data in the right stream.

## 1. The Setup: Create a fake dataset at scale

Most people do not have 2 streams just hanging around for one to experiment with Stream Steam Joins. Thus I used Faker to mock 2 different streams which we will use for this example.

The name of the library being used is Faker and faker_vehicle to create Datasets.

    !pip install faker_vehicle
    !pip install faker

Imports

    from faker import Faker
    from faker_vehicle import VehicleProvider
    from pyspark.sql import functions as F
    import uuid
    from utils import logger

Parameters

    # define schema name and where should the table be stored
    schema_name = “test_streaming_joins”
    schema_storage_location = “/tmp/CHOOSE_A_PERMANENT_LOCATION/”

**Create the Target Schema/Database**
Create a Schema and set location. This way, all tables would inherit the base location.

    create_schema_sql = f”””
     CREATE SCHEMA IF NOT EXISTS {schema_name}
     COMMENT ‘This is {schema_name} schema’
     LOCATION ‘{schema_storage_location}’
     WITH DBPROPERTIES ( Owner=’Jitesh’);
     “””
    print(f”create_schema_sql: {create_schema_sql}”)
    spark.sql(create_schema_sql)

Use Faker to define functions to help generate fake column values

    fake = Faker()
    fake.add_provider(VehicleProvider)

    event_id = F.udf(lambda: str(uuid.uuid4()))
    vehicle_year_make_model = F.udf(fake.vehicle_year_make_model)
    vehicle_year_make_model_cat = F.udf(fake.vehicle_year_make_model_cat)
    vehicle_make_model = F.udf(fake.vehicle_make_model)
    vehicle_make = F.udf(fake.vehicle_make)
    vehicle_model = F.udf(fake.vehicle_model)
    vehicle_year = F.udf(fake.vehicle_year)
    vehicle_category = F.udf(fake.vehicle_category)
    vehicle_object = F.udf(fake.vehicle_object)

    latitude = F.udf(fake.latitude)
    longitude = F.udf(fake.longitude)
    location_on_land = F.udf(fake.location_on_land)
    local_latlng = F.udf(fake.local_latlng)
    zipcode = F.udf(fake.zipcode)

Generate Streaming source data at your desired rate

    def generated_vehicle_and_geo_df (rowsPerSecond:int , numPartitions :int ):
        return (
            spark.readStream.format("rate")
            .option("numPartitions", numPartitions)
            .option("rowsPerSecond", rowsPerSecond)
            .load()
            .withColumn("event_id", event_id())
            .withColumn("vehicle_year_make_model", vehicle_year_make_model())
            .withColumn("vehicle_year_make_model_cat", vehicle_year_make_model_cat())
            .withColumn("vehicle_make_model", vehicle_make_model())
            .withColumn("vehicle_make", vehicle_make())
            .withColumn("vehicle_year", vehicle_year())
            .withColumn("vehicle_category", vehicle_category())
            .withColumn("vehicle_object", vehicle_object())
            .withColumn("latitude", latitude())
            .withColumn("longitude", longitude())
            .withColumn("location_on_land", location_on_land())
            .withColumn("local_latlng", local_latlng())
            .withColumn("zipcode", zipcode())
            )
    
    # You can uncomment the below display command to check if the code in this cell works
    #display(generated_vehicle_and_geo_df)

    # You can uncomment the below display command to check if the code in this cell works
    #display(generated_vehicle_and_geo_df)

Now let's generate the base source table and let’s call it Vehicle_Geo

    table_name_vehicle_geo= "vehicle_geo"
    def stream_write_to_vehicle_geo_table(rowsPerSecond: int = 1000, numPartitions: int = 10):
        
        (
            generated_vehicle_and_geo_df(rowsPerSecond, numPartitions)
                .writeStream
                .queryName(f"write_to_delta_table: {table_name_vehicle_geo}")
                .option("checkpointLocation", f"{schema_storage_location}/{table_name_vehicle_geo}/_checkpoint")
                .format("delta")
                .toTable(f"{schema_name}.{table_name_vehicle_geo}")
        )
    stream_write_to_vehicle_geo_table(rowsPerSecond = 1000, numPartitions = 10)

Let the above code run for a few iterations, and you can play with rowsPerSecond and numPartitions to control how much data you would like to generate. Once you have generated enough data, kill the above stream and get a base line for row count.

    spark.read.table(f"{schema_name}.{table_name_vehicle_geo}").count()

    display(
        spark.sql(f"""
        SELECT * 
        FROM {schema_name}.{table_name_vehicle_geo}
    """)
    )

Let’s also get a min & max of the timestamp column as we would be leveraging it for watermarking.

    display(
        spark.sql(f"""
        SELECT 
             min(timestamp)
            ,max(timestamp)
            ,current_timestamp()
        FROM {schema_name}.{table_name_vehicle_geo}
    """)
    )

### Next, we will break this Delta table into 2 different tables

Because for Stream-Stream Joins we need 2 different streams. We will use Delta To Delta Streaming here to create these tables.

 1. **a ) Table: Vehicle**
```
table_name_vehicle = "vehicle"
vehicle_df = (
    spark.readStream.format("delta")
    .option("maxFilesPerTrigger", "100")
    .table(f"{schema_name}.vehicle_geo")
    .selectExpr(
        "event_id",
        "timestamp as vehicle_timestamp",
        "vehicle_year_make_model",
        "vehicle_year_make_model_cat",
        "vehicle_make_model",
        "vehicle_make",
        "vehicle_year",
        "vehicle_category",
        "vehicle_object",
    )
)


def stream_write_to_vehicle_table():

    (
        vehicle_df.writeStream
        # .trigger(availableNow=True)
        .queryName(f"write_to_delta_table: {table_name_vehicle}")
        .option(
            "checkpointLocation",
            f"{schema_storage_location}/{table_name_vehicle}/_checkpoint",
        )
        .format("delta")
        .toTable(f"{schema_name}.{table_name_vehicle}")
    )


stream_write_to_vehicle_table()

```

 1. **b) Table: Geo**

We have added a filter when we write to this table. This would be useful when we emulate the left join scenario. Filter: where("value like '1%' ")

    geo_df = (
        spark.readStream.format("delta").option("maxFilesPerTrigger","100").table(f"{schema_name}.vehicle_geo")
            .selectExpr(
                "event_id"
                ,"value"
                ,"timestamp as geo_timestamp"
                ,"latitude"
                ,"longitude"
                ,"location_on_land"
                ,"local_latlng"
                ,"cast( zipcode as integer) as zipcode"
            ).where("value like '1%' ") 
        )
    #geo_df.printSchema()
    #display(geo_df)
    
    table_name_geo = "geo"
    def stream_write_to_geo_table():
        
        (   geo_df
            .writeStream
            #.trigger(availableNow=True)
            .queryName(f"write_to_delta_table: {table_name_geo}")
            .option("checkpointLocation", f"{schema_storage_location}/{table_name_geo}/_checkpoint")
            .format("delta")
            .toTable(f"{schema_name}.{table_name_geo}")
        )
        
    stream_write_to_geo_table()    

## 2. Set a baseline using traditional SQL

Before we do the actual streaming joins. Let’s do a regular join and figure out the expected row count.

**Get row count from Inner Join**

    sql_query_batch_inner_join = f'''
            SELECT count(vehicle.event_id) as row_count_for_inner_join
            FROM {schema_name}.{table_name_vehicle} vehicle
            JOIN {schema_name}.{table_name_geo} geo
            ON vehicle.event_id = geo.event_id
        AND vehicle_timestamp >= geo_timestamp  - INTERVAL 5 MINUTES        
            '''
    print(f''' Run SQL Query: 
              {sql_query_batch_inner_join}       
           ''')
    display( spark.sql(sql_query_batch_inner_join) )

**Get row count from Inner Join**

    sql_query_batch_left_join = f'''
            SELECT count(vehicle.event_id) as row_count_for_left_join
            FROM {schema_name}.{table_name_vehicle} vehicle
            LEFT JOIN {schema_name}.{table_name_geo} geo
            ON vehicle.event_id = geo.event_id
                -- Assume there is a business logic that timestamp cannot be more than 15 minutes off
        AND vehicle_timestamp >= geo_timestamp  - INTERVAL 5 MINUTES
            '''
    print(f''' Run SQL Query: 
              {sql_query_batch_left_join}       
           ''')
    display( spark.sql(sql_query_batch_left_join) )

## Summary so far:

 1. We created a Source Delta Table: vehicle_geo

 2. We took the previous table and divided its column into two tables: Vehicle and Geo

 3. Vehicle row count matches with vehicle_geo, and it has a subset of those columns

 4. The Geo row count is lesser than Vehicle because we added a filter when we wrote to the Geo table

 5. We ran 2 SQL to identify what the row count should be after we do stream-stream join

## 3. Define Temporary Streaming Views

Some people prefer to write the logic in SQL. Thus, we are creating streaming views which could be manipulated with SQL. The below code block will help create a view and set a watermark on the stream.

    def stream_from_delta_and_create_view (schema_name: str, table_name:str, column_to_watermark_on:str, how_late_can_the_data_be: str = "2 minutes" , maxFilesPerTrigger: int = 100):
        view_name = f"_streaming_vw_{schema_name}_{table_name}"
        print(f"Table {schema_name}.{table_name} is now streaming under a temporoary view called {view_name}")
        (
            spark.readStream.format("delta")
            .option("maxFilesPerTrigger", f"{maxFilesPerTrigger}")
            .option("withEventTimeOrder", "true")
            .table(f"{schema_name}.{table_name}")
            .withWatermark(f"{column_to_watermark_on}",how_late_can_the_data_be)
            .createOrReplaceTempView(view_name)
        )
    

**3. a Create Vehicle Stream**

Let’s create a Vehicle Stream and set its watermark as 1mins

    stream_from_delta_and_create_view(schema_name =schema_name, table_name = 'vehicle', column_to_watermark_on ="vehicle_timestamp", how_late_can_the_data_be = "1 minutes" )

Let’s visualize the stream.

    display(
        spark.sql(f'''
            SELECT *
            FROM _streaming_vw_test_streaming_joins_vehicle
        ''')
    )

You can also do an aggregation on the stream. It’s out of the scope of this blog, but I wanted to show you how you can do it

    display(
        spark.sql(f'''
            SELECT 
                vehicle_make
                ,count(1) as row_count
            FROM _streaming_vw_test_streaming_joins_vehicle
            GROUP BY vehicle_make
            ORDER BY vehicle_make
        ''')
    )

**3. b Create Geo Stream**

Let’s create a Geo Stream and set its watermark as 2 mins

    stream_from_delta_and_create_view(schema_name =schema_name, table_name = 'geo', column_to_watermark_on ="geo_timestamp", how_late_can_the_data_be = "2 minutes" )

Have a look at what the data looks like

    display(
        spark.sql(f'''
            SELECT *
            FROM _streaming_vw_test_streaming_joins_geo
        ''')
    )

## 4. Inner Joins with optional Watermarking

While inner joins on any kind of columns and with any kind of conditions are possible in streaming environments, it’s important to be aware of the potential for unbounded state growth. As new input arrives, it can potentially match with any input from the past, leading to a rapidly increasing streaming state size.

To avoid this issue, it’s essential to define additional join conditions that prevent indefinitely old inputs from matching with future inputs. By doing so, it’s possible to clear old inputs from the state, which can help to prevent unbounded state growth and ensure more efficient processing.

There are a variety of techniques that can be used to define these additional join conditions. For example, you might limit the scope of the join by only matching on a subset of columns, or you might set a time-based constraint that prevents old inputs from being considered after a certain period of time has elapsed.

Ultimately, the key to managing streaming state size and ensuring efficient join processing is to consider the unique requirements of your specific use case carefully and to leverage the right techniques and tools to optimize your join conditions accordingly. **Although watermarking could be optional, I would highly recommend you set a watermark on both streams.**

    sql_for_stream_stream_inner_join = f"""
        SELECT 
            vehicle.*
            ,geo.latitude
            ,geo.longitude
            ,geo.zipcode
        FROM _streaming_vw_test_streaming_joins_vehicle vehicle
        JOIN _streaming_vw_test_streaming_joins_geo geo
        ON vehicle.event_id = geo.event_id
        -- Assume there is a business logic that timestamp cannot be more than X minutes off
        AND vehicle_timestamp >= geo_timestamp - INTERVAL 5 minutes
    """
    #display(spark.sql(sql_for_stream_stream_inner_join))

    table_name_stream_stream_innner_join ='stream_stream_innner_join'
    
    (   spark.sql(sql_for_inner_join)
        .writeStream
        #.trigger(availableNow=True)
            .queryName(f"write_to_delta_table: {table_name_stream_stream_innner_join}")
            .option("checkpointLocation", f"{schema_storage_location}/{table_name_stream_stream_innner_join}/_checkpoint")
            .format("delta")
            .toTable(f"{schema_name}.{table_name_stream_stream_innner_join}")
    )

If the stream has finished then in the next step. You should find that the row count should match up with the regular batch SQL Job

    spark.read.table(f"{schema_name}.{table_name_stream_stream_innner_join}").count()

### How was the watermark computed in this scenario?

When we defined streaming views for Vehicle and Geo, we set them as 1 min and 2 min, respectively.

If you look at the join condition we mentioned :

    AND vehicle_timestamp >= geo_timestamp - INTERVAL 5 minutes

5 min + 2 min = 7 min.

Spark Streaming would automatically calculate this 7 min number and the state would be cleared after that.

## 5. Left Joins with Watermarking

While the watermark + event-time constraints is optional for inner joins, for outer joins they must be specified. This is because for generating the NULL results in outer join, the engine must know when an input row is not going to match with anything in future. Hence, the watermark + event-time constraints must be specified for generating correct results.

### 5.a How Left Joins works differently than an Inner Join

One important factor is that the outer NULL results will be generated with a delay that depends on the specified watermark delay and the time range condition. This delay is necessary to ensure that there were no matches, and that there will be no matches in the future.

In the current implementation of the micro-batch engine, watermarks are advanced at the end of each micro-batch, and the next micro-batch uses the updated watermark to clean up the state and output outer results. However, this means that the generation of outer results may be delayed if there is no new data being received in the stream. If either of the two input streams being joined does not receive data for a while, the outer output (in both left and right cases) may be delayed.

    sql_for_stream_stream_left_join = f"""
        SELECT 
            vehicle.*
            ,geo.latitude
            ,geo.longitude
            ,geo.zipcode
        FROM _streaming_vw_test_streaming_joins_vehicle vehicle
        LEFT JOIN _streaming_vw_test_streaming_joins_geo geo
        ON vehicle.event_id = geo.event_id
        AND vehicle_timestamp >= geo_timestamp  - INTERVAL 5 MINUTES
    """
    #display(spark.sql(sql_for_stream_stream_left_join))
    
    table_name_stream_stream_left_join ='stream_stream_left_join'
    
    (   spark.sql(sql_for_stream_stream_left_join)
        .writeStream
        #.trigger(availableNow=True)
            .queryName(f"write_to_delta_table: {table_name_stream_stream_left_join}")
            .option("checkpointLocation", f"{schema_storage_location}/{table_name_stream_stream_left_join}/_checkpoint")
            .format("delta")
            .toTable(f"{schema_name}.{table_name_stream_stream_left_join}")
    )

If the stream has finished, then in the next step. You should find that the row count should match up with the regular batch SQL Job.

    spark.read.table(f"{schema_name}.{table_name_stream_stream_left_join}").count()
>  **You will find that some records that could not match are not being released, which is expected. **The outer NULL results will be generated with a delay that depends on the specified watermark delay and the time range condition. This is because the engine has to wait for that long to ensure there were no matches and there will be no more matches in future.
>  ****Watermark will advance once new data is pushed to it****

Thus let’s generate some more fate data to the base table: **vehicle_geo. **This time we are sending a much lower volume of 10 records per second. Let the below command run for at least one batch and then kill it.

    stream_write_to_vehicle_geo_table(rowsPerSecond = 10, numPartitions = 10)

### 5. b What to observe:

 1. Soon you should see the watermark moves ahead and the number of records in ‘Aggregation State’ goes down.

 2. If you click on the running stream and click the raw data tab and look for “watermark”. You will see it has advanced

 3. Once 0 records per second are being processed, that means your stream has caught up, and now your row count should match up with the traditional SQL left join

    spark.read.table(f"{schema_name}.{table_name_stream_stream_left_join}").count()

## 6. The cold start edge case: withEventTimeOrder
>  “When using a Delta table as a stream source, the query first processes all of the data present in the table. The Delta table at this version is called the initial snapshot. By default, the Delta table’s data files are processed based on which file was last modified. However, the last modification time does not necessarily represent the record event time order.
>  In a stateful streaming query with a defined watermark, processing files by modification time can result in records being processed in the wrong order. This could lead to records dropping as late events by the watermark.
>  You can avoid the data drop issue by enabling the following option:
>  withEventTimeOrder: Whether the initial snapshot should be processed with event time order.

In our scenario, I pushed this inside Step 3 when we created the temporary streaming views.

    spark.readStream.format("delta")
            .option("maxFilesPerTrigger", f"{maxFilesPerTrigger}")
            .option("withEventTimeOrder", "true")
            .table(f"{schema_name}.{table_name}")

## 7. Cleanup

Drop all tables in the database and delete all the checkpoints

    spark.sql(
        f"""
        drop schema if exists {schema_name} CASCADE
    """
    )
    
    
    dbutils.fs.rm(schema_storage_location, True)

If you have reached so far, you now have a working pipeline and a solid example which you can use going forward.

## Download the code

[https://github.com/jiteshsoni/material_for_public_consumption/blob/main/notebooks/spark_stream_stream_join.py](https://github.com/jiteshsoni/material_for_public_consumption/blob/main/notebooks/spark_stream_stream_join.py)

### References:

 1. [https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html#stream-stream-joins](https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html#stream-stream-joins)

 2. [https://youtu.be/hyZU_bw1-ow?t=1181](https://youtu.be/hyZU_bw1-ow?t=1181)

 3. [https://www.youtube.com/watch?v=1cBDGsSbwRA&t=1500s](https://www.youtube.com/watch?v=1cBDGsSbwRA&t=1500s)

 4. [https://www.databricks.com/blog/2022/08/22/feature-deep-dive-watermarking-apache-spark-structured-streaming.html](https://www.databricks.com/blog/2022/08/22/feature-deep-dive-watermarking-apache-spark-structured-streaming.html)

 5. [https://docs.databricks.com/structured-streaming/delta-lake.html#process-initial-snapshot-without-data-being-dropped](https://docs.databricks.com/structured-streaming/delta-lake.html#process-initial-snapshot-without-data-being-dropped)


## Footnotes

If you’re interested in learning more and keeping up to date with the latest about Spark, Delta, DBT, Python, SQL, Terraform, and other big data technologies, check out my [other blogs and follow](https://canadiandataguy.medium.com/).