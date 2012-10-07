const { Cc, Ci } = require("chrome"),
      data = require("self").data,
      prefs = require("preferences-service"),
      tabbrowser = require("tab-browser"),
      timer = require("timer"),
      windowutils = require("window-utils"); // warning! deprecated!



/** Notify via notification box. */
function notify(txt, addon_icon, timeout) {
    console.log(txt);
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
    }, timeout);
}

/**
 * Get notification box ("yellow bar").
 * Courtesy of bug 533649.
 */
function getNotificationBox() {
    let browser = windowutils.activeBrowserWindow.gBrowser,
        notificationBox = browser.getNotificationBox();
    return notificationBox;
}

/* Exports */
exports.notify = notify;
