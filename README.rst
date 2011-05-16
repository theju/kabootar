=========
Kabootar
=========

Kabootar is currently a very simple analytics platform that homes back with 
interesting data.

As of now, it reports the page load time but can be used to send other custom 
data points ala MixPanel.

Install
--------

Kabootar uses `Node.js`_ for the server and `Riak`_ as the NoSQL database for
storage and querying.

On the client end, two very simple code snippets needs to be pasted into the 
HTML pages to start sending the data. The below code snippets are inspired
from ChartBeat.

Just at the start of the ``<head>``, paste the below code::

    <script type="text/javascript">
      var _page_load_start = (new Date()).getTime();
    </script>

And just before the end of the ``</body>`` tag, paste the below code::

    <script type="text/javascript">
      (function(){
        function sendKabootarBack() {
          window._page_load_end = (new Date()).getTime();
          var elem = document.createElement("script");
          elem.setAttribute("type", "text/javascript");
          elem.setAttribute("src",
           (("https:" == document.location.protocol) ? "https://" : "http://") + 
           "localhost:8000" + "/js/kabootar.js");
          document.body.appendChild(elem);
        }
        var originalLoad = window.onload;
        window.onload = (typeof window.onload != "function") ?
          sendKabootarBack : function() { originalLoad(); sendKabootarBack(); };
       })();
    </script>

On the server, install riak, node.js and the following node dependencies::

   $ npm install express
   $ npm install riak-js

Run the test server (under the ``tests`` directory)::

   $ node test_server.js

Open the HTML page with the code snippets pasted above and check the data getting
loaded into the riak-database under the "analytics" bucket.

To Do
------

* Develop a dashboard to summarize the data.
* Add ability to separate the data sent from multiple sources.

.. _`Node.js`: http://nodejs.org/
.. _`Riak`: http://wiki.basho.com/
