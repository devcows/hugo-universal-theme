---
title: "How I wrote my first Spark Streaming Application with Joins?"
date: 2023-01-25T17:35:21-05:00
draft: false
tags : ["streaming"]
categories : ["streaming","spark streaming", "databricks"]
banner: "https://miro.medium.com/v2/resize:fit:720/0*IUhD1QKtwgHKBdb8"
---



## How I wrote my first Spark Streaming Application with Joins with working code

When I started learning about Spark Streaming, I could not find enough code/material which could kick-start my journey and build my confidence. I wrote this blog to fill this gap which could help beginners understand how [simple streaming ](https://www.databricks.com/blog/2022/07/14/using-spark-structured-streaming-to-scale-your-analytics.html)is and build their first application.

In this blog, I will explain most things by first principles to increase your understanding and confidence and you walk away with code for your first Streaming application.

![Photo by [Ian Schneider](https://unsplash.com/@goian?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)](https://cdn-images-1.medium.com/max/10644/0*IUhD1QKtwgHKBdb8)

## Scenario:

Let’s assume we have a streaming source with data arriving all the time. We want to add more attributes from another table( Think lookup table/ dimension table). Thus we will stream the data and join with the lookup table via Stream-Batch join. The result would be written as a Delta table, which could be used downstream for analytics or streaming.

**Imports & Parameters**

    from pyspark.sql import functions as F
    from faker import Faker
    import uuid
    
    # define schema name and where should the table be stored
    schema_name = "test_streaming_joins"
    schema_storage_location = "/tmp/CHOOSE_A_PERMANENT_LOCATION/"
    
    
    # Please download this file from https://simplemaps.com/data/us-zips then download and place it at a location of your choice and then change the value for the variable below
    static_table_csv_file = "/FileStore/jitesh.soni/data/us_zip_code_and_its_attributes.csv"
    
    # Static table specification
    static_table_name = "static_zip_codes"
    
    
    # Target Stareaming Table specification
    target_table_name = "joined_datasets"
    
    # Recommend you to keep the checkpoint next to the Delta table so that you do have to notion about where the checkpoint is
    checkpoint_location = f"{schema_storage_location}/{target_table_name}/_checkpoints/"Create Target Database

* The below code will help create a schema/database with comments and storage locations for tables

    create_schema_sql = f"""
        CREATE SCHEMA IF NOT EXISTS {schema_name}
        COMMENT 'This is {schema_name} schema'
        LOCATION '{schema_storage_location}'
        WITH DBPROPERTIES ( Owner='Jitesh');
        """
    print(f"create_schema_sql: {create_schema_sql}")

### **Generate Static Or a lookup Dataset**

We will use a public dataset [source](https://simplemaps.com/data/us-zips) with attributes about a zip code. This could be any other static source or a Delta table being updated in parallel.

**Note**: If you pick a static source and start streaming, Spark Streaming will only read it once. If you have a few updates to the static source, you will have to restart the Spark Stream so it rereads the static source.

Meanwhile, if you have the Delta table as a source, then Spark Streaming will identify the update automatically, and nothing extra needs to be done.

    csv_df = (
        spark.read.option("header", True)
        .option("inferSchema", True)
        .csv(static_table_csv_file)
    )
    display(csv_df)
    csv_df.write.saveAsTable(f"{schema_name}.{static_table_name}")

Next, we will Z-order the table on the key, which would be used in joins. This will help Spark Streaming do efficient joins because the Delta table is sorted by join key with statistics about which file contains which key value.

    spark.sql(
        f"""
        OPTIMIZE {schema_name}.{static_table_name} ZORDER BY (zip);
        """
    )

### Generate Streaming Dataset

We will generate a Streaming dataset using the Faker library. In the below code, we will define a few user-defined functions.

    fake = Faker()
    fake_id = F.udf(lambda: str(uuid.uuid4()))
    fake_firstname = F.udf(fake.first_name)
    fake_lastname = F.udf(fake.last_name)
    fake_email = F.udf(fake.ascii_company_email)
    # fake_date = F.udf(lambda:fake.date_time_this_month().strftime("%Y-%m-%d %H:%M:%S"))
    fake_address = F.udf(fake.address)
    fake_zipcode = F.udf(fake.zipcode)

Now, we will use *spark.readStream.format(“rate”) *to generate data at your desired rate.

    streaming_df = (
        spark.readStream.format("rate")
        .option("numPartitions", 10)
        .option("rowsPerSecond", 1 * 1000)
        .load()
        .withColumn("fake_id", fake_id())
        .withColumn("fake_firstname", fake_firstname())
        .withColumn("fake_lastname", fake_lastname())
        .withColumn("fake_email", fake_email())
        .withColumn("fake_address", fake_address())
        .withColumn("fake_zipcode", fake_zipcode())
    )
    
    # You can uncomment the below display command to check if the code in this cell works
    # display(streaming_df)

## Stream- Static Join or Stream -Delta Join

Structured Streaming supports joins (inner join and left join) between a streaming and a static DataFrame or a Delta Table. [However, a few types of stream-static outer Joins are not supported yet.](https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html#support-matrix-for-joins-in-streaming-queries)

    lookup_delta_df = spark.read.table(static_table_name)
    
    
    joined_streaming_df = streaming_df.join(
        lookup_delta_df,
        streaming_df["fake_zipcode"] == lookup_delta_df["zip"],
        "left_outer",
    ).drop("fake_zipcode")
    # display(joined_streaming_df)

### Orchestrate the pipeline and write Spark Stream to Delta Table

Some Tips:

* Give your streaming query a name. It’s good because this name will appear on Spark UI and help you monitor the stream.

* If you are not planning to run the Stream continuously then use *trigger(availableNow=True)*. This helps process all pending data and then stops the stream automatically.

    (
        joined_streaming_df.writeStream
        # .trigger(availableNow=True)
        .queryName("do_a_stream_join_with_the_delta_table")
        .option("checkpointLocation", checkpoint_location)
        .format("delta")
        .toTable(f"{schema_name}.{target_table_name}")
    )

### [Download the code](https://github.com/jiteshsoni/material_for_public_consumption/blob/main/notebooks/spark_stream_static_join.py)

## Footnotes

If you’re interested in learning more and keeping up to date with the latest about Spark, Delta, Python, SQL, Terraform, and other big data technologies, check out my [other blogs and follow](https://canadiandataguy.medium.com/).

