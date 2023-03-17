---
title: "How to parameterize Delta Live Tables and import reusable functions"
date: 2022-12-13T17:35:21-05:00
draft: false
tags : ["delta live tables","databricks"]
categories : ["streaming","spark streaming"]
banner: "https://miro.medium.com/v2/resize:fit:720/0*-xOdeCgLJ0kOG2oG"
---

This blog will discuss passing custom parameters to a Delta Live Tables (DLT) pipeline. Furthermore, we will discuss importing functions defined in other files or locations. You can import files from the current directory or a specified location using sys.path.append().

Overall, this a 4-step process:

1. Create a reusable_functions.py file
2. Add code to receive the DLT parameters
3. Append the path to reusable_functions.py file and import the functions in the notebook
4. Create a DLT pipeline and set/pass parameters


{{< medium url="https://towardsdev.com/how-to-parameterize-delta-live-tables-and-import-reusable-functions-1994156db7fb" >}}