---
title: "Databricks Workspace Best Practices- A checklist for both beginners and Advanced Users"
date: 2023-02-23T17:35:21-05:00
draft: false
tags : ["workspace"]
categories : ["best practices","databricks"]
banner: "https://miro.medium.com/v2/resize:fit:720/0*On2cbUBjrA__byVR"
---

## Databricks Workspace Best Practices- A checklist for both beginners and Advanced Users

Most good things in life come with a nuance. While learning Databricks a few years ago, I spent hours searching for best practices. Thus, I devised a set of best rules that should hold in almost all scenarios. These will help you start on the right foot.

### Here are some basic rules for using Databricks Workspace:

 1. Version control everything: Use Repos and organize your notebooks and folders: Keep your notebooks and files in folders to make them easy to find and manage. Use a consistent naming convention and create a logical hierarchy of folders.

 2. Use Databricks jobs for every scheduled job: If it’s a scheduled job, then it should run on a job Cluster. It’s cheaper to run on a job cluster over an interactive cluster.

 3. [Service principals](https://docs.databricks.com/administration-guide/users-groups/service-principals.html) should own all production jobs so those permissions stay intact whenever individuals leave the team or company. Ensure the principals have access to the underlying notebooks for this to work correctly.

 4. For jobs with multiple tasks, task values should be used so that parameters must be set at the beginning of a job. Typically, we’ve had the first task of a multi-task workflow put the parameters into task values so that all other tasks can pull accordingly as needed. Make sure to set the default and debugValues so that individual notebook-level testing can still take place.

 5. Use Databricks CLI/API: Use Databricks CLI to automate repetitive tasks, such as uploading and downloading notebooks and managing clusters.

 6. Use secrets management: Use Databricks secrets management to store and manage sensitive information, such as API keys and database credentials.

 7. Optimize cluster usage: Use autoscaling to scale your clusters up or down based on workload automatically. Use autoscaling and right-sizing to optimize your cluster usage and reduce costs.

 8. Monitor cluster performance: Monitor your cluster performance using Databricks metrics and logs to identify performance bottlenecks and optimize your workload.

 9. Use Databricks Delta: Use Databricks Delta for data management, which provides reliability, performance, and scalability for your data. Delta helps you manage your data using ACID transactions, schema enforcement, and data versioning.

 10. Use Databricks MLflow: Use Databricks MLflow to track and manage your machine learning experiments. MLflow helps you manage your experiments, track model performance, and deploy models to production.

 11. A single logical top-level construct: is an E2 master account (AWS) or a subscription object (Azure Databricks/GCP). In AWS, provision a single E2 account per organization that provides a unified pane of visibility and control to all workspaces. In this way, your admin activity is centralized, with the ability to enable SSO, [Audit Logs](https://www.databricks.com/blog/2020/06/02/monitor-your-databricks-workspace-with-audit-logs.html), and [Unity Catalog](https://www.databricks.com/blog/2021/05/26/introducing-databricks-unity-catalog-fine-grained-governance-for-data-and-ai-on-the-lakehouse.html).

 12. Adopt Unity Catalog for data governance. Enabling cross-cloud and cross-workspace analytics brings a new level of governance and control to the Lakehouse.

![Photo by [Marco Bicca](https://unsplash.com/@mbicca?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)](https://cdn-images-1.medium.com/max/12032/0*On2cbUBjrA__byVR)

## Once you have multiple teams using the same workspace, it’s time to set more controls.

### Here are examples of some Advanced best practices to put in place:

 1. [Cost Control by establishing boundaries on compute](https://learn.microsoft.com/en-us/azure/databricks/administration-guide/clusters/policies): Cloud can become expensive fast if no limits are set. A cluster policy is a tool that limits a user or group’s [cluster creation](https://learn.microsoft.com/en-us/azure/databricks/clusters/create-cluster) permissions based on a set of policy rules.

 2. Tag everything: Keep an eye on your usage and know the [Databricks Resource Limits](https://docs.databricks.com/resources/limits.html); if your workspace usage or user count starts to grow, consider adopting a more involved workspace organization strategy to avoid per-workspace limits. Leverage [resource tagging](https://docs.databricks.com/administration-guide/account-settings/usage-detail-tags-aws.html) wherever possible to track cost and [usage](https://docs.databricks.com/administration-guide/account-settings-e2/usage.html) metrics.

 3. Publish a shared central repository of code examples which are unique to your business. Example: How to connect to your on-prem SQL Server, Oracle, Salesforce, etc.

 4. Automate your cloud processes. This ranges from every aspect of your infrastructure, including SSO/SCIM, Infrastructure-as-Code with a tool such as Terraform, CI/CD pipelines and [Repos](https://docs.databricks.com/repos.html), cloud backup, and monitoring (using both cloud-native and third-party tools).

 5. Enable audit logging at the account level. Having auditability from the very start of your lakehouse journey allows you to establish a historical baseline. Often, you only realize how much you need audit logs when you really, really need them.

 6. Setup [Account Level Identities](https://docs.databricks.com/data-governance/unity-catalog/manage-identities.html#account-level-identities) should be enabled as this allows for centralized principal management for all workspaces, thereby simplifying administration. We recommend setting up features like [SSO](https://docs.databricks.com/administration-guide/users-groups/single-sign-on/index.html#set-up-single-sign-on), [SCIM](https://docs.databricks.com/dev-tools/api/latest/scim/scim-account.html) and [Audit Logs](https://docs.databricks.com/administration-guide/account-settings/audit-logs.html) at the account level. [Workspace-level SSO is still required](https://docs.databricks.com/data-governance/unity-catalog/manage-identities.html#how-do-you-manage-sso-for-workspace--and-account-level-identities), until the SSO Federation feature is available.

 7. Tracking the ongoing consumption for all workload types across all workspaces is visible to account admins via the accounts console. We recommend setting up [billable usage log delivery](https://docs.databricks.com/administration-guide/account-settings/billable-usage-delivery.html) so that it all goes to your central cloud storage for chargeback and analysis. Budget API (In Preview) should be configured at the account level, which allows account administrators to create thresholds at the workspaces, SKU, and cluster tags level and receives alerts on consumption so that timely action can be taken to remain within allotted budgets. Use a tool such as [Overwatch](https://databrickslabs.github.io/overwatch/) to track usage at an even more granular level to help identify areas of improvement when it comes to utilizing computing resources.

### Reference:
[**5 Best Practices for Databricks Workspaces**](https://www.databricks.com/blog/2022/03/10/functional-workspace-organization-on-databricks.html)
[**Databricks Workspace Administration - Best Practices for Account, Workspace and Metastore Admins**](https://www.databricks.com/blog/2022/08/26/databricks-workspace-administration-best-practices-for-account-workspace-and-metastore-admins.html)

[https://www.databricks.com/blog/2022/10/18/best-practices-cost-management-databricks.html](https://www.databricks.com/blog/2022/10/18/best-practices-cost-management-databricks.html)
[**Databricks Workspace Administration - Best Practices for Account, Workspace and Metastore Admins**](https://www.databricks.com/blog/2022/08/26/databricks-workspace-administration-best-practices-for-account-workspace-and-metastore-admins.html)
[**Best Practices for Cost Management on Databricks**](https://www.databricks.com/blog/2022/10/18/best-practices-cost-management-databricks.html)
[**Serving Up a Primer for Unity Catalog Onboarding**](https://www.databricks.com/blog/2022/11/22/serving-primer-unity-catalog-onboarding.html)


## Footnotes

If you’re interested in learning more and keeping up to date with the latest about Spark, Delta, Python, SQL, Terraform, and other big data technologies, check out my [other blogs and follow](https://canadiandataguy.medium.com/).






{{< medium url="https://medium.com/@canadiandataguy/databricks-workspace-best-practices-a-checklist-for-both-beginners-and-advanced-users-fd7840b3d340" >}}