var nid = 'main';
var ctd = false;
var extID = '8c2c8a83-2d1e-46fc-9c5a-59db4ad11a91'; // catcher links extension
var appID = '98b54219-8ec9-4cad-a7bc-7c4866d71403'; // this app

var notice = function(title, message) {
    if ('string' == typeof title && 'string' == typeof message) {
        if (!ctd) {
            chrome.notifications.create(
                nid,
                {
                    title: title,
                    iconUrl: 'assets/32.png',
                    type: 'basic',
                    message: message
                },

                function() {
                    ctd = true;
                }
            );
        } else {
            chrome.notifications.update(nid, {
                title: title,
                type: 'basic',
                iconUrl: 'assets/32.png',
                message: message
            });
        }
    }
};

var app = function() {
    chrome.app.window.create(
        'index.html',
        {
            id: 'mainWindow',
            innerBounds: { width: 960, height: 600 },
            frame: { type: 'none' },
            resizable: true
        },

        function(e) {
            
        }
    );
};

chrome.app.runtime.onLaunched.addListener(function() {
    app();
});

chrome.app.runtime.onRestarted.addListener(function() {
    app();
});

// send cached links to webview
chrome.runtime.onMessageExternal.addListener(function(request, sender) {
    if (sender.id == extID) {
        chrome.runtime.sendMessage(appID, request);
    }
});