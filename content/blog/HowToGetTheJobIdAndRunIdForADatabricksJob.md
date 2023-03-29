---
title: "How to get the Job ID and Run ID for a Databricks Job"
date: 2023-02-23T17:35:21-05:00
draft: false
tags : ["job_id", "run_id"]
categories : ["databricks"]
banner: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*bPfmY6lG-OxW2l1s5szFsQ.png"
---

## **How to get the Job ID and Run ID for a Databricks Job with working code**

Sometimes there is a need to store or print system-generated values like job_id, run_id, start_time, etc. These entities are called ‘task parameter variables’. A list of supported parameters is listed [here](https://docs.databricks.com/workflows/jobs/jobs.html#id4).

This is a simple 2-step process:

 1. Pass the parameter when defining the job/task

 2. Get/Fetch and print the values

### Step 1: Pass the parameters

![](https://cdn-images-1.medium.com/max/4228/1*bPfmY6lG-OxW2l1s5szFsQ.png)

### Step 2: Get/Fetch and print the values

    print(f"""
      job_id: {dbutils.widgets.get('job_id')}
      run_id: {dbutils.widgets.get('run_id')}
      parent_run_id: {dbutils.widgets.get('parent_run_id')}
      task_key: {dbutils.widgets.get('task_key')}
      """)

Next step, when you run the job; you should see an output like this

![](https://cdn-images-1.medium.com/max/2220/1*McAX0ziUTXYc-aATZmHpgw.png)

## Advanced & Optional:

In case you do not have a specific attribute in mind but want to capture the whole context information instead.
>  The below is code based and attributes are subject to change without notice

    dbutils.notebook.entry_point.getDbutils().notebook().getContext().toJson()





## Footnotes

If you’re interested in learning more and keeping up to date with the latest about Spark, Delta, DBT, Python, SQL, Terraform, and other big data technologies, check out my [other blogs and follow](https://canadiandataguy.medium.com/).
