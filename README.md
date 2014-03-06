cash
====

###What Cash Is Not
Another replacement for jQuery. Cash does not attempt to be compatible with the
jQuery API.

###What Cash Is
A tiny library that absracts some pain points when working with native Javascript
and DOM. 

####Why?
Because if you are not supporting bad browsers you do not need the shims that
were created to support them.

##I Can Haz $?
Cash **does** take the familaiar `$` name as it's global identifier. That's where
the similarity ends. The cash `$()` **function** will only accept a DOM node or
nodeList as an argument. We have standardized ways to search the DOM for elements
now, **cash** thinks you should use those.

    // as an example, you have a nodeList
    var things = document.querySelectorAll('.foo');
    
Passing the `things` nodeList as an arg to `$()` would result in **cash** storing
that list on the **cash** object as `q`, and here's the important part, **as an array**.

    $(things);
    // now there is a this.q that is an array of DOM elements with a class of foo
    
In a familar fashion, calling `$()` will return `$` itself so that chainable stuff
can happen. In an unfamiliar fashion however, what is returned **is not a unique instance**.
This is paramount to understand. Any call to `$()` simply sets the `q` and returns.
**That is All**.

Let's say that the `things` nodeList contained 3 `div` elements when it was passed to `$()`.
That means that there are 3 elements in the `$.q`.

    $(things);
    $.q //=> [div, div, div]
    Array.isArray($.q); //=> true
    
Since calling `$()` returns `$` though the `q` array is always available in a 
chainable fashion, ready to be used.

    $(things).q.forEach(function(el) {el.classList.remove('foo');})
    
**NOTE**: Calling $(...) resets the `q` to what you pass in. Sometimes you may
want to re-use an existing `q`, but that's not the preferred pattern. All chainable methods
operate on, and possibly modify the `q`, **including event callbacks**.

It's not expensive to call `$()` so don't fear to simply reset the `q`.

###Why You No Pass In String?
It would not be expensive or bloat the codebase to allow `$()` to take a string then
perform a querySelectorAll with it, returning that back to `$()`. But I won't. Why?
One, it promotes `God Dollar` and that's bad. An 'unscoped' call to `$` is a 
**code smell** and should be rather unwieldy. Two, it's a slippery slope for the 
dollar function to start accepting other args. It accepts a node or a collection 
of them and that's all.

##Chainable Methods
Some jQuery-type methods are still needed, which ones will be an ongoing debate
that is part of the future development of **cash**. 

###Events
The familiar `on` and `off` methods are provided as, though event binding is standardized
now in all good browsers, unbinding can produce much boilerplate in a large project.
Particularly in a single-page-app where removing event listeners is paramount.

####on(event, callback[,selector][, data])
Adds an event listener to each element in the `q`. Very similar to the jQuery `on`
method with the exception of the order of arguments:

+ **event** A DOM Event name
+ **callback** A function to be called when the event occurs
+ **selector** Optional CSS selector allowing delegatation of events to the target element
+ **data** Optional object literal passed to the callback as `e.data`

####off(event[, callback])
Removes all events bound to the `event` name, or just the passed in `callback` 
(if present), for each element in the `q`. Maintaining the correct reference to
a `callback` can be ugly so if you are looking to remove a specific `callback` on
an element for an event which may have many listeners, using a `namespaced event`
may be a better choice.

#####Event Namespacing
Similar in practice to the jQuery event namespace, you can append a value to an
event name (or many of them) as a dot-delimited string:

    $(things).on('click.foo', callback);
    
This makes it much simpler to remove a specific callback, say another click event
listener had already been added:

    $(things).on('click', anotherCallback);
    
Simply removing `click` from `things` via `off` would remove both listeners. In a 
case where you only wanted to remove `callback` and not `anotherCallback` you would
pass the namespaced event name to `off`:

    $(things).off('click.foo');
    
There is no need to pass the second argument.

######Caveat
Cash does not override the native event passed to your listeners. This means that
the `trigger` method cannot be used to fire **only** a namespaced event.

    $(things).on('click', callback).on('click.foo', fooCallback);
    
Calling `trigger('click')` on `things` here would call both `callback` and `fooCallback`.
The latter would recieve the namespace attached to the event passed to it however, as
`event.namespace` (it would be 'foo'). The former would not, `event.namespace` would be 
falsey.

