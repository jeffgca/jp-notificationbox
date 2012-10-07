/*
 * Notificationbox - based on copyshorturl / simple-notify.js by
 * Fred Wenzel: https://raw.github.com/fwenzel/copy-shorturl/master/lib/simple-notify.js
 */

const { Cc, Ci } = require("chrome"),
      prefs = require("preferences-service"),
      timer = require("timer"),
      windowutils = require("window-utils"); // warning! deprecated!

/** Notify via notification box. */
function notify(txt, addon_icon, timeout) {
    // check for egregious use of timeout
    if (timeout > 10000) {
        timeout = 4000;
        console.log('timeout value is greater than 10 seconds, re-setting to 4 seconds.');
    }

    let _timeout = timeout || 4000; // default is 4 seconds
    let nb = getNotificationBox(),
        notification = nb.appendNotification(
        txt,
        'jetpack-notification-box',
        addon_icon || 'chrome://browser/skin/Info.png',
        nb.PRIORITY_INFO_MEDIUM,
        []
    );
    timer.setTimeout(function() {
        notification.close();
    }, _timeout);
};

/**
 * Get notification box ("yellow bar").
 * Courtesy of bug 533649.
 */
function getNotificationBox() {
    let browser = windowutils.activeBrowserWindow.gBrowser,
        notificationBox = browser.getNotificationBox();
    return notificationBox;
};

/* Exports */
exports.notify = notify;