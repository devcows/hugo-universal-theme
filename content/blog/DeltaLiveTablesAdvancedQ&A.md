---
title: "Delta Live Tables Advanced Q & A"
date: 2023-03-03T17:35:21-05:00
draft: false
tags : ["delta live tables"]
categories : ["streaming","spark streaming","databricks"]
banner: "https://miro.medium.com/v2/resize:fit:720/0*fnEnj3G9nKFHpHUI"
---


## Delta Live Tables Advanced Q & A

This is primarily written for those trying to handle edge cases.

![Photo by [Joshua Earle](https://unsplash.com/@joshuaearle?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)](https://cdn-images-1.medium.com/max/6000/0*fnEnj3G9nKFHpHUI)

### Q1.) How can a single/unified table be built with historical backfill and ongoing streaming Kafka data?

The streaming table built using DLT allows writes to the table outside of the DLT. Thus, you can build and run your DLT pipeline with Kafka as a source, generating the physical table with a name. Then, you can do a streaming write to this table outside DLT.

**What is the gotcha here?**

The data has lost its natural ordering which is fine in most cases, meaning it did not go into the Delta table in the same order it was generated. This is in contrast to an ideal world in which Kafka had infinite retention, and a single DLT pipeline would have ingested the data.

If and only if you are using the table as a Streaming source with Watermarking downstream then while reading this data, we will have to instruct Spark Streaming to sort the data while reading it. We can do this by using the following parameter ‘withEventTimeOrder’.

    spark.readStream.format("delta")
            .option("maxFilesPerTrigger", f"{maxFilesPerTrigger}")
            .option("withEventTimeOrder", "true")
            .table(f"{schema_name}.{table_name}")

You can further read about this solution here [https://canadiandataguy.medium.com/how-to-write-your-first-spark-application-with-stream-stream-joins-with-working-code-dd9b0b39f814#d828](https://canadiandataguy.medium.com/how-to-write-your-first-spark-application-with-stream-stream-joins-with-working-code-dd9b0b39f814#d828)

To reiterate, the gotcha only applies if you use this table as a Streaming Source along with Watermarking.

### **Q2.) How do I handle deletes in a Streaming Table?**

Let’s take GDPR as an example of where we need to enforce retention on the Delta table. One can run a regular DELETE command on the table and then in the DLT pipeline make changes to downstream consumers.
>  “By default, streaming tables require append-only sources. When a streaming table uses another streaming table as a source, and the source streaming table requires updates or deletes, for example, GDPR “right to be forgotten” processing, the skipChangeCommits flag can be set on the target streaming table to ignore those changes. For more information about this flag, see [Ignore updates and deletes](https://docs.databricks.com/en/structured-streaming/delta-lake.html#ignore-changes).”

    @table
    def b():
       return spark.readStream.option("skipChangeCommits", "true").table("LIVE.A")

[https://docs.databricks.com/en/delta-live-tables/python-ref.html#configure-a-streaming-table-to-ignore-changes-in-a-source-streaming-table](https://docs.databricks.com/en/delta-live-tables/python-ref.html#configure-a-streaming-table-to-ignore-changes-in-a-source-streaming-table)

### **Q3.) How to enable mergeSchema on DLT table?**

This is already handled in DLT. If you want to control otherwise explicitly, you can pass the following spark conf property at the DLT pipeline or table level.
>  spark.databricks.delta.schema.autoMerge.enabled True

If you are using Autoloader, consider playing with different schema evolution modes while reading data.

.option("cloudFiles.schemaEvolutionMode", "addNewColumns")

### Q4.) How to change the location where the table is stored?

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

### Q5.) Does DLT support Identity Columns?

Yes, more details [here](https://docs.databricks.com/workflows/delta-live-tables/delta-live-tables-faqs-issues.html#how-do-i-use-identity-columns-when-creating-live-tables-with-sql). However, Identity columns are not supported with [APPLY CHANGES](https://docs.databricks.com/workflows/delta-live-tables/delta-live-tables-cdc.html) tables.

### Q6.) How to stream out of a table which was loaded using apply_changes?

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

### Q7.) How to delete Data using DLT?

Use the [Change Data Capture](https://docs.databricks.com/delta-live-tables/cdc.html) functionality of DLT. The particular expression which will help you achieve this is called **apply_as_deletes. **You can change the parameter to match your custom criteria. For example, if you had bad records originating in a specific time interval or file name, you can change the expression to meet your custom criteria.

    import dlt
    from pyspark.sql.functions import col, expr
    
    @dlt.view
    def users():
      return spark.readStream.format("delta").table("cdc_data.users")
    
    dlt.create_streaming_live_table("target")
    
    dlt.apply_changes(
      target = "target",
      source = "users",
      keys = ["userId"],
      sequence_by = col("sequenceNum"),
      apply_as_deletes = expr("operation = 'DELETE' or {any other custom logic} "),
      except_column_list = ["operation", "sequenceNum"],
      stored_as_scd_type = "2"
    )

### Q8.) How to avoid accidental overwrites in DLT?

Set this property so that tables cannot be overwritten.

pipelines.reset.allowed false

### Q9.) DLT Pipeline was deleted, but the Delta table exists. What to do now? What if the owner has left the org and I need a new DLT pipeline to take care of the table

Step 1.) Verify via CLI if the pipeline has been deleted

    databricks --profile <your_env> pipelines list
    databricks --profile <your_env> pipelines get --pipeline-id <deleted_pipeline_id>

Step 2.) Change the owner of the table

    ALTER TABLE <db>.<table> SET TBLPROPERTIES(pipelines.pipelineId = '<NEW_PIPELINE_ID>');

Note: In case you do not have a pipeline ID yet, you can use the below parameter once; run your pipeline to get the pipeline ID and then remove the below parameter.

pipelines.tableManagedByMultiplePipelinesCheck.enabledto false

### Q10.) How does sequence_by work in apply_changes() ?

There are two types of data management strategies with apply_changes:

Type 1 involves keeping only the latest state of a record. This means that if an older record arrives out-of-order and we already have a newer record in the target, the older record will not update the target because it is not the latest state.

Type 2 involves keeping a history of all records. This means that if an out-of-order record arrives, it is considered as a historical entry and will update the table by adding a new entry to the history.

If you experience unexpected behavior with deletes; you should consider altering the following property pipelines.cdc.tombstoneGCThresholdInSeconds
[**Delta Live Tables properties reference**
*This article provides a reference for Delta Live Tables JSON setting specification and table properties in Databricks.*docs.databricks.com](https://docs.databricks.com/en/delta-live-tables/properties.html#cdc)

### Q11.) How to make Python UDF work in DLT + UC?

Add a tag to your pipeline “PythonUDF.enabled”: “true” and DLT “channel”: “PREVIEW”

            {
                "label": "default",
                "aws_attributes": {
                    "instance_profile_arn": "fill_this"
                },
                "custom_tags": {
                    "PythonUDF.enabled": "true"
                },
                "autoscale": {
                    "min_workers": 1,
                    "max_workers": 5,
                    "mode": "ENHANCED"
                }
            },

This information is subject to change, and the parameter might not be needed in the future.

## Footnote:

Thank you for taking the time to read this article. If you found it helpful or enjoyable, please consider clapping to show appreciation and help others discover it. Don’t forget to follow me for more insightful content, and visit my website [**CanadianDataGuy.com](https://canadiandataguy.com/)** for additional resources and information. Your support and feedback are essential to me, and I appreciate your engagement with my work.
