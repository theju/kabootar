=========
Kabootar
=========

Kabootar is currently a very simple analytics platform that homes back with 
interesting data.

As of now, it reports the page load time but can be used to send other custom 
data points.

Install
--------

Kabootar uses `Node.js`_ for the server and plans to use a NoSQL database for the
storage and querying.

On the client end, a very simple code needs to be pasted into the HTML pages to
start sending the data.

In the meantime, you can check out the ``tests`` directory for the usage::

  $ node test_server.js
  $ firefox client_page.html

To Do
------

* Evaluate and select a NoSQL database.
* Expose the custom data points feature.
* Develop a dashboard to summarize the data.
* Add ability to separate the data sent from multiple sources.

.. _`Node.js`: http://nodejs.org/
