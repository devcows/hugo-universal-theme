---
title: How to Cut Your Data Processing Costs by 30% with Graviton
description: ""
date: 2023-04-23T17:29:06.599Z
preview: ""
draft: false
tags: ["graviton","cost-savings"]
categories: ["databricks","spark"]
banner: "https://cdn-images-1.medium.com/max/2000/1*DwwMNsSfkCZsXZowaIilhA.png"
---

# How to Cut Your Data Processing Costs by 30% with Graviton

## What is AWS Graviton ?

AWS Graviton is a family of Arm-based processors that are designed by AWS to provide cost-effective and high-performance computing for cloud workloads. Graviton processors are built using 64-bit Arm, which are optimized for power efficiency and performance. They offer a more cost-effective alternative to traditional x86-based processors, making them a popular choice for running a variety of workloads on AWS.

With Graviton, you can enjoy lightning-fast data processing speeds while saving money on your infrastructure costs. Plus, Graviton is compatible with all your favorite tools and applications, so you can seamlessly integrate it into your existing workflow.

Overall, AWS Graviton offers a flexible and cost-effective alternative to traditional x86-based processors, making it a popular choice for customers who are looking to optimize their cloud computing costs without sacrificing performance or reliability.

## Cost Savings

If you look at the screenshot below, you will find Graviton cheaper than every other series.

**Decipher instance name: c6g.xlarge: **C stands for compute series, 6 stands for a series number, g stands for Graviton, and xLarge means 4 vCPU.

### **Compute Intensive (C Series)**

c6g.xlarge is 12.5% cheaper than the next cheapest instance.

![](https://cdn-images-1.medium.com/max/2000/1*h-t7S2KmhX5fYKp1RXijdg.png)

### **General Purpose (M Series)**

m6g.xlarge is ~12.2% cheaper than the next cheapest instance.

![](https://cdn-images-1.medium.com/max/2000/1*5xRyYgQp42pORNop-IydJA.png)

### **Memory Intensive ( R Series)**

r6g.xlarge is ~12.5% cheaper than the next cheapest instance.

![](https://cdn-images-1.medium.com/max/2000/1*fHxdfkY3kXB73nKobJi8Bw.png)

## This is complicated. Help me choose ?

Let me break down the AWS instance series into simple parts. Think about how much memory you get per core, and the price increases as the memory increases.

* Compute intensive C series provides 2GB memory per core.

* General purpose M series provides 4GB memory per core and is 13% more expensive than the C series.

* Memory-intensive R series provides 8 GB memory per core and is 30% more expensive than the M series. ~48% more expensive than the C series.

I recommend that customers start with general purpose, get a baseline runtime, and then try different series. The best way to gauge what instance family would work is to identify or categorize if the workload is compute-bound, memory-bound or network bound.

## Launch of new Graviton 3 series in 2023

Here are some benefits of the new Graviton 3 series; the price is ~10% more expensive Graviton 2. However, it’s still cheaper than the M6 a instance.
>  M6g ($ 0.154) < M7g ($ 0.1632) < M6a ( $0.1728 )

![](https://cdn-images-1.medium.com/max/2000/1*DwwMNsSfkCZsXZowaIilhA.png)
[**New Graviton3-Based General Purpose (m7g) and Memory-Optimized (r7g) Amazon EC2 Instances | Amazon…**
*We’ve come a long way since the launch of the m1.small instance in 2006, adding instances with additional memory…*aws.amazon.com](https://aws.amazon.com/blogs/aws/new-graviton3-based-general-purpose-m7g-and-memory-optimized-r7g-amazon-ec2-instances/)

## Conclusion
>  As you can see, the price saving is at least ~12%, and [AWS claims 40% better price performance](https://pages.awscloud.com/rs/112-TZM-766/images/2020_0501-CMP_Slide-Deck.pdf) due to faster processors. Thus, in reality, you should be able to save 12–40% cost savings at least. In my real-world experience, I have seen 20–30% cost savings.

## Footnote:

Thank you for taking the time to read this article. If you found it helpful or enjoyable, please consider clapping to show appreciation and help others discover it. Don’t forget to follow me for more insightful content, and visit my website [**CanadianDataGuy.com](https://canadiandataguy.com/)** for additional resources and information. Your support and feedback are essential to me, and I appreciate your engagement with my work.

