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

###Chainable Methods
Some jQuery-type methods are still needed, which ones will be an ongoing debate
that is part of the future development of **cash**. 

