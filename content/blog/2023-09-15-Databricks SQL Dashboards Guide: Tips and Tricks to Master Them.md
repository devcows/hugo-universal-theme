---
title: "Databricks SQL Dashboards Guide: Tips and Tricks to Master Thems"
description: ""
date: 2023-09-15T17:29:06.599Z
preview: ""
draft: false
tags: ["dbsql"]
categories: ["databricks","spark"]
banner: "https://cdn-images-1.medium.com/max/10000/0*lFrzWG4v-HT_emCP"
---

## Databricks SQL Dashboards Guide: Tips and Tricks to Master Them

Welcome to the world of Databricks SQL Dashboards! You're in the right place if you want to learn how to go beyond just building visualizations and add some tricks to your arsenal. This guide will walk you through creating, managing, and optimizing your Databricks SQL dashboards.

![Photo by [Romain Gal](https://unsplash.com/@wamstudio?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)](https://cdn-images-1.medium.com/max/10000/0*lFrzWG4v-HT_emCP)

## 1. Getting Started with Viewing and Organizing Dashboards:

* Accessing Your Dashboards: Navigate to the workspace browser and click “Workspace” in the sidebar. By default, your dashboards will appear in the Home folder. Alternatively, click on “Dashboards” in the sidebar.

* Organizing Dashboards: They are sorted in reverse chronological order, but you can reorder them by clicking column headings. Starting July 10, 2023, Databricks will migrate all SQL content to the workspace browser, so ensure your dashboards are in order!

## 2. Tags are your friend

* Organization: Tags allow users to categorize and organize their SQL objects, such as queries, dashboards, and visualizations. This makes finding and managing these objects easier, especially in large environments. Some good tag examples are customers, departments, projects, environments, etc.

* Access Control: Tags can be used in conjunction with access control policies. By tagging SQL objects, administrators can define fine-grained access controls based on these tags, ensuring that only authorized users can access or modify specific resources.

* Cost Allocation: Databricks allow you to track cloud costs associated with running queries. By tagging SQL queries or jobs, organizations can allocate costs to specific departments, projects, or teams, providing better visibility into resource consumption.

## 3. Cloning: Replicating Success:

* If you’ve created a dashboard you’re particularly proud of, clone it! Ensure you have the necessary permissions; thenew dashboard will list you as its owner. Note: Sharing settings, alerts, and subscriptions won’t be copied to the new dashboard.

## 4. Harnessing the Power of Query Parameters:

* Parameter Types: Your queries can use parameters or static values. Depending on your needs, visualizations based on parameterized queries can be set to use widget parameters, dashboard parameters, or static values.

* Multiple Visualizations: One of the strengths of Databricks is that dashboard parameters can apply to multiple visualizations, offering a cohesive data representation.

## 5. Editing and Customizing Your Dashboard:

* Making Changes: Dashboards can be edited to add or remove content, edit visualizations, and apply filters. Dive in and make it truly your own!

* Colour Customization: Stand out with unique dashboard colours. Create your own color palettes or use the default ones to make your dashboard visually appealing.

## 6. Keeping Your Data Fresh with Refreshes:

* Why Refresh?: Dashboards fetch data from a cache. To ensure up-to-date data representation, it’s crucial to refresh them periodically.

* Manual vs. Automatic: Depending on your needs, dashboards can be refreshed manually or set to refresh automatically on a schedule.

## 7. Stay Updated with Dashboard Subscriptions:

* Snapshot Subscriptions: Subscribe to dashboard snapshots and receive periodic email updates. This is especially useful for keeping stakeholders in the loop.

* File Size Limit: Remember there’s a 6 MB file size limit for email attachments. If your dashboard is data-heavy, subscribers will receive a link to the refreshed dashboard instead.

## 8. Managing and Optimizing Dashboards:

* Download, Trash, Restore: If needed, dashboards can be downloaded as PDFs, moved to Trash, or even restored.

* Admin Privileges: If you’re a workspace admin user, you can access an admin view to oversee all dashboards and manage permissions effectively.

* Transferring Ownership: Need to hand over a dashboard to another team member? No problem! Ownership can be easily transferred.

In conclusion, Databricks SQL dashboards offer a versatile data visualization and analysis platform. With this step-by-step guide, you’re well on your way to mastering the art of creating, managing, and optimizing your dashboards. Dive in and explore the world of data with Databricks!
