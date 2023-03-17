---
title: "How to upgrade your Spark Stream application with a new checkpoint!"
date: 2023-01-25T17:35:21-05:00
draft: false
tags : ["delta live tables","checkpoint","kafka"]
categories : ["streaming","spark streaming"]
banner: "https://miro.medium.com/v2/resize:fit:720/0*42drq4qeYGri5KRH"
---
Sometimes in life, we need to make breaking changes which require us to create a new checkpoint. Some example scenarios:

   * You are doing a code/application change where you are changing logic
   * Major Spark Version upgrade from Spark 2.x to Spark 3.x
   * The previous deployment was wrong, and you want to reprocess from a certain point

There could be plenty of scenarios where you want to control precisely which data(Kafka offsets) need to be processed.

Not every scenario requires a new checkpoint. Here is a list of things you can change without requiring a new checkpoint.

This blog helps you understand how to handle a scenario where a new checkpoint is unavoidable.
{{< medium url="https://medium.com/@canadiandataguy/how-to-upgrade-your-spark-stream-application-with-a-new-checkpoint-4dce7fa2cd96" >}}