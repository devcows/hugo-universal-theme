---
title: "A Productive Life: How to Parallelize Code Execution in Python"
description: ""
date: 2023-04-23T21:38:16.119Z
preview: ""
draft: false
tags: ["python","cost-savings", "parallelization"]
categories: []
banner: "https://cdn-images-1.medium.com/max/9400/0*Bsp64aQg2c2IYu9R"
---


# A Productive Life: How to Parallelize Code Execution in Python

Asynchronous programming has become increasingly popular in recent years, especially in web development, where it is used to build high-performance, scalable applications. Python has built-in support for asynchronous programming through the asyncio module, which provides a powerful framework for writing asynchronous code.

In this blog post, we will explore the asyncio module in Python 3.10 and learn how to run tasks in parallel using the new features introduced in this version. We will explore 3 examples here:

## Example 1: Asyncio Tasks / create_task()

In asyncio, a task is a unit of work that is scheduled to run on the event loop. Tasks are created from coroutines, which are functions that are defined using the async def syntax and that can suspend their execution using the await keyword.

To create a task, we use the asyncio.create_task() function, which takes a coroutine as its argument and returns a Task object. We can then schedule the task to run on the event loop using the await keyword.

Here’s an example:

    import asyncio
    
    async def function_which_will_run_in_parallel():
        # Add what you want to do here
        print('function_which_will_run_in_parallel completed')
    
    # Orchestrate function 
    async def main():
        task = asyncio.create_task(function_which_will_run_in_parallel())
        await task
    
    asyncio.run(main())

In this example, we define a simple function_which_will_run_in_parallel() that waits for one second and then prints a message. In the main() function, we create a Task object using asyncio.create_task() and pass it the function.

We then await the completion of the task using await task. When we run the main() using asyncio.run(), the Task object is created and scheduled on the event loop, which runs the function_which_will_run_in_parallel() function asynchronously. Once the function_which_will_run_in_parallel() function is complete, the Task object is marked as done, and the program exits.

![Photo by [Sarah Dorweiler](https://unsplash.com/@sarahdorweiler?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)](https://cdn-images-1.medium.com/max/9400/0*Bsp64aQg2c2IYu9R)

## Example 2: Running Tasks in Parallel

In asyncio, we can run tasks in parallel using the asyncio.gather() function. This function takes one or more coroutines/functions as its arguments and returns a list of their results.

Here’s an example:

    import asyncio
    
    async def coroutine1():
        await asyncio.sleep(1)
        return 'Coroutine 1 completed'
    async def coroutine2():
        await asyncio.sleep(2)
        return 'Coroutine 2 completed'
    
    async def main():
        results = await asyncio.gather(coroutine1(), coroutine2())
        print(results)
    asyncio.run(main())

In this example, we define two coroutines, coroutine1() and coroutine2(), that wait for one and two seconds, respectively, before returning a message.

In the main() coroutine function, we use the asyncio.gather() function to run the two coroutines in parallel. We pass coroutine1() and coroutine2() as its arguments and use await to wait for both coroutines to complete.

When both coroutines are complete, the asyncio.gather() function returns a list of their results, which we print to the console.

## Example 3: Running tasks in parallel with a loop

In this example, we define an asynchronous coroutine function fetch() that uses the aiohttp library to download the contents of a given URL. We then define the main() coroutine function that creates a list of URLs to download and uses asyncio.create_task() to create a task for each URL. We then use asyncio.gather() to wait for all tasks to complete and return their results.

The async with aiohttp.ClientSession() context manager is used to create a session object that can be reused across multiple requests, which can improve performance.

When we run the main() coroutine using asyncio.run(), it concurrently downloads the web pages from the list of URLs, and prints the number of bytes downloaded from each URL.

This is just a simple example, but it demonstrates how asyncio can be used to concurrently perform I/O-bound tasks such as web page downloads.

    import asyncio
    import aiohttp
    
    async def fetch(session, url):
        async with session.get(url) as response:
            return await response.text()
    
    async def main():
        urls = [
            'https://example.com',
            'https://google.com',
            'https://facebook.com',
            'https://twitter.com',
            'https://linkedin.com',
        ]
    
        async with aiohttp.ClientSession() as session:
            tasks = [asyncio.create_task(fetch(session, url)) for url in urls]
    
            results = await asyncio.gather(*tasks)
    
            for url, result in zip(urls, results):
                print(f"Downloaded {len(result)} bytes from {url}")
    
    asyncio.run(main())

## Conclusion

Asyncio is a powerful framework for writing asynchronous code in Python, and with the new features introduced in Python 3.10, it has become even easier to run tasks in parallel.

In this blog post, we learned how to create tasks using asyncio.create_task() and how to run tasks in parallel using `asyncio.gather()


## Footnote:

Thank you for taking the time to read this article. If you found it helpful or enjoyable, please consider clapping to show appreciation and help others discover it. Don’t forget to follow me for more insightful content, and visit my website [**CanadianDataGuy.com](https://canadiandataguy.com)** for additional resources and information. Your support and feedback are essential to me, and I appreciate your engagement with my work.