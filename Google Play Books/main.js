var webview = document.getElementById('main');
var extID = '8c2c8a83-2d1e-46fc-9c5a-59db4ad11a91'; // catcher links extension
var appID = '98b54219-8ec9-4cad-a7bc-7c4866d71403'; // this app

// set some css on trello.com
webview.addEventListener('loadcommit', function(e) {
    if (e.isTopLevel) {
        webview.insertCSS({
            code: '.gb_td>.gb_R {margin-left:20px !important;}',
            runAt: 'document_start'
        });
    }
});

// send new-window-links to bronser
webview.addEventListener('newwindow', function(e) {
    e.stopImmediatePropagation();
    window.open(e.targetUrl);
});

// hotkeys
window.addEventListener('keydown', function(e) {
    // Ctrl+R or F5
    if (e.ctrlKey && e.keyCode == 82 || e.keyCode == 115) {
        webview.reload();
    }

    // F11
    if (e.keyCode == 122) {
        if (chrome.app.window.current().isFullscreen()) {
            chrome.app.window.current().restore();
        } else {
            chrome.app.window.current().fullscreen();
        }
    }
});

// fix webview lose focus
window.addEventListener('focus', function(e) {
    webview.focus();
});

// allow download
webview.addEventListener('permissionrequest', function(e) {
    if (e.permission === 'download') {
        e.request.allow();
    }
});

// open cached links
chrome.runtime.onMessage.addListener(function(request, sender) {
    if (sender.id == appID) {
        webview.src = request;
    }
});