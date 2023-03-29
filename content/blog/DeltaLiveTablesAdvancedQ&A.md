---
title: "Delta Live Tables Advanced Q & A"
date: 2023-03-03T17:35:21-05:00
draft: false
tags : ["delta live tables"]
categories : ["streaming","spark streaming","databricks"]
banner: "https://miro.medium.com/v2/resize:fit:720/0*fnEnj3G9nKFHpHUI"
---


## Delta Live Tables Advanced Q & A

This is primarily written for those folks who are trying to handle edge cases.

![Photo by [Joshua Earle](https://unsplash.com/@joshuaearle?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)](https://cdn-images-1.medium.com/max/6000/0*fnEnj3G9nKFHpHUI)

### **Q1.) DLT Pipeline was deleted, but the Delta table exists. What to do now? What if the owner has left the org**

Step 1.) Verify via CLI if the pipeline has been deleted

    databricks --profile <your_env> pipelines list
    databricks --profile <your_env> pipelines get --pipeline-id <deleted_pipeline_id>

Step 2.) Create a new pipeline with the existing storage path

Step3.) Before you start the pipeline, change this DLT pipeline setting

pipelines.tableManagedByMultiplePipelinesCheck.enabledto false

### **Q2.) How to enable mergeSchema on DLT table?**

This is already handled in DLT. If you want to control otherwise explicitly, you can pass the following spark conf property at the DLT pipeline or table level.
>  spark.databricks.delta.schema.autoMerge.enabled True

If you are using Autoloader, consider playing with different schema evolution modes while reading data.

.option("cloudFiles.schemaEvolutionMode", "addNewColumns")

### Q3.) How to change the location where the table is stored?

 1. Manually copy the data using [Deep Clone](https://docs.databricks.com/optimizations/clone.html) with the {new_location}

 2. Create a new DLT pipeline and set the path = {new_location}

    @dlt.table(
      name="<name>",
      comment="<comment>",
      spark_conf={"<key>" : "<value", "<key" : "<value>"},
      table_properties={"<key>" : "<value>", "<key>" : "<value>"},
      path="<storage-location-path>",
      partition_cols=["<partition-column>", "<partition-column>"],
      schema="schema-definition",
      temporary=False)

3. In your DLT pipeline configuration, set this property pipelines.tableManagedByMultiplePipelinesCheck.enabledto false

4. Now, we need to make sure that we do not read any duplicate data because we cannot reuse our old checkpoint. We will solve this by using filters or providing a starting configuration for the streaming source. E.g., if your streaming source is:

**4. a) Kafka**: Then we will provide offset information. More information can be found [here](https://canadiandataguy.medium.com/how-to-upgrade-your-spark-stream-application-with-a-new-checkpoint-4dce7fa2cd96).

**4. b) Delta:**

For example, suppose you have a table user_events. If you want to read changes since version 5, use:

    spark.readStream.format("delta")
      .option("startingVersion", "5")
      .load("/tmp/delta/user_events")

If you want to read changes since 2023–03–03, use:

    spark.readStream.format("delta")
      .option("startingTimestamp", "2018-10-18")
      .load("/tmp/delta/user_events")

More details can be found [here](http://For example, suppose you have a table user_events. If you want to read changes since version 5, use:  Scala Copy to clipboardCopy spark.readStream.format("delta")   .option("startingVersion", "5")   .load("/tmp/delta/user_events") If you want to read changes since 2018-10-18, use:  Scala Copy to clipboardCopy spark.readStream.format("delta")   .option("startingTimestamp", "2018-10-18")   .load("/tmp/delta/user_events")).

5. To do step 4, you should parameterize your DLT pipeline, which can be done by following these [instructions](https://medium.com/towardsdev/how-to-parameterize-delta-live-tables-and-import-reusable-functions-1994156db7fb).

### Q4.) Does DLT support Identity Columns?

Yes, more details [here](https://docs.databricks.com/workflows/delta-live-tables/delta-live-tables-faqs-issues.html#how-do-i-use-identity-columns-when-creating-live-tables-with-sql). However, Identity columns are not supported with [APPLY CHANGES](https://docs.databricks.com/workflows/delta-live-tables/delta-live-tables-cdc.html) tables.

### Q5.) How to stream out of a table which was loaded using apply_changes?

This is generally not recommended. The target of the APPLY CHANGES INTO query or apply_changes the function cannot be used as a source for a streaming live table. A table that reads from the target of a APPLY CHANGES INTO query or apply_changes function must be a live table.

You can rely on enabling [SCD](https://docs.databricks.com/workflows/delta-live-tables/delta-live-tables-cdc.html) and then use audit columns (__START_AT &__END_AT)to identify the changes. However, the downstream would still have to do a batch read and filter on these audit columns to limit the information being read.

**If you are adventurous** and still want to do a read stream of this source. You need to enableChangeDataFeed on the delta table ‘fact_sales’.

    @dlt.table(name="fact_sales",
      comment="This is a fact tables for sales",
      partition_cols = ["order_date"],
      table_properties={
        "pipelines.autoOptimize.zOrderCols": "StoreId,ItemId",
        "delta.enableChangeDataFeed": "true",
      }
    )

Then you can decide to stream changes out of the __apply_changes_{table_name} . Make sure to handle tombstones/deletes as part of your downstream pipeline.


## Footnotes

If you’re interested in learning more and keeping up to date with the latest about Spark, Delta, Python, SQL, Terraform, and other big data technologies, check out my [other blogs and follow](https://canadiandataguy.medium.com/).

