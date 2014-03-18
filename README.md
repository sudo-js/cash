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

####on(event, callback[,selector][, data][, cap])
Adds an event listener to each element in the `q`. Very similar to the jQuery `on`
method with the exception of the order of arguments:

+ **event** A DOM Event name
+ **callback** A function to be called when the event occurs
+ **selector** Optional CSS selector allowing delegatation of events to the target element.
+ **data** Optional object literal passed to the callback as `e.data`
+ **cap** Optional boolean that, if truthy, will force capture phase to be used.

######delegateTarget
All events bound by cash will have a delegateTarget attribute. If a selector was used
(the event was delegated) the delegateTarget will match the provided selector.

####off(event[, callback][, cap])
Removes all events bound to the `event` name, or just the passed in `callback`
(if present), for each element in the `q`. Maintaining the correct reference to
a `callback` can be ugly so if you are looking to remove a specific `callback` on
an element for an event which may have many listeners, using a `namespaced event`
may be a better choice.

You may use a `*` event name to capture sets of events. For instance, `*.ns` would
remove all events which were bound to the `ns` namespace. Similarly `*` would
remove all events, regardless of event name or namespace.

######Cap'n
The `cap` argument will need to be passed for the event to be unbound **if you
passed the argument when binding it**.

It is worth nothing that the `blur` and `focus` DOM events do not bubble and therefore
do not (normally) work correctly with delegation. You can however use the capture phase
to remedy this. Cash, if it sees that `on` is being used with either `focus` or
`blur` **and** there is a `sel` (delegation being used) with force the `cap` arg
to true (therefore using capture phase). If `off` is called on either `focus` or
`blur` and you had used delegation you **do not need to pass the cap** argument.
Cash will know to use it for you.

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

#####Baby You're A *
The '*' character has a special meaning for the `off()` method. Passed with a namespace
it will remove all listeners that share the namespace.

    $(things).off('*.foo');
    
In a more drastic move you can remove all listeners simply by passing the *.

    $(things).off('*');

######Caveat
Cash does not override the native event passed to your listeners. This means that
the `trigger` method cannot be used to fire **only** a namespaced event.

    $(things).on('click', callback).on('click.foo', fooCallback);

Calling `trigger('click')` on `things` here would call both `callback` and `fooCallback`.
The latter would recieve the namespace attached to the event passed to it however, as
`event.namespace` (it would be 'foo'). The former would not, `event.namespace` would be
falsey.

###Traversal
Methods that alter the `q` based on some DOM related criteria.

####closest(selector)
For each element in the `q` traverse upwards to find the first element that matches 
the given CSS selector. The `q` will be accordingly rehydrated with the found elements.

    $(someInput).closest('form');
    
####find(selector)
Given a CSS selector query each element in the `q` for all matches to that selector.
Rehdrate the `q` with any and all of those matches.

  $(someUl).find('li');
  
####contains(element)
Qeury each element in the `q` for which contains the passed in element. Reset 
the `q` with that container if found.

    $(things).contains(someElement);

###Styles
Methods for the getting or setting of styles. 

####offset()
Calling this method will return a hash of key:value pairs that represent the 
position in the document of the 'zeroth' element in the `q`. Note that the 
`top` and `left` properties will take into account page[X|Y]Offset and the 
`width` and `height` properties will be rounded.

    $(someElement).offset();
    // => {top: xx, left: xx, width: xx, left: xx}
    
Note: `offset` is a getter only.

####css(key|obj[, value])
Set one, or multiple, style properties on each element in the `q`.

Though you could interact with the `element.style` object directly there are a 
few reasons that having this method available is advantageous. One, you can pass it
numbers and 'px' will be added when appropriate. Two, by passing a hash of key:value
pairs the setting of multiple styles at once is possible.

Note: `css` is a setter only.

####height([value])
To normalize the different attributes one needs to set on `window`, `document`,
or an `element` for height, we provide this method. Passed a value (string or number), 
`height` works as a setter for each element in the `q`. If the value is a string cash 
will not attempt to append the unit of measure for you ('px' for example), if a 
number 'px' will be added.

    $(foo).find(bar).height(25);
    
Passed no value `height` functions as a getter for the zeroth element.

    $(foo).find(bar).height(); //=> 25
    
####width([value])
The same as height, except it's spelled differently and gets or sets the width property. 

#####itGoesLikeThis, not-like-this
when passing arguments to the `css` method camel case the keys, do not pass them
'dasherized`. This applies to both the single key and val case and the hash one.

    // the single style case
    $(things).css('paddingTop', 10);
    // multiple
    $(things).css({paddingTop: 10, marginLeft: 5});
