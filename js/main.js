// We set up some shortcuts using requirejs. This will be helpful later when there's more plugins to deal with.

require.config({
    paths: {
        jquery: 'libs/jquery',
        underscore: 'libs/underscore',
        backbone: 'libs/backbone',
        jqueryqtip:'libs/jquery.qtip',
    }
});

// And then we call the main app (app.js)
require(['app']);
