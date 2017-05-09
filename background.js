/**
 * Created by Akshay on 5/9/2017.
 */

window.onload = function () {
    checkCount();
    setInterval(checkCount, 10000); // Since search is limited to one per 10s
};

function checkCount() {
    chrome.downloads.search({
        "exists" : false,
        orderBy: ['-startTime']
    } , function (downloadedItem) {
        if(downloadedItem.length > 0) {
            chrome.browserAction.setBadgeBackgroundColor({color: "red"});
            chrome.browserAction.setBadgeText({text: ""+ downloadedItem.length});
        }
    });
}