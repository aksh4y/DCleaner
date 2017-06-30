/**
 * Created by Akshay on 5/9/2017.
 */

var deleted;
var failed;
var deleteCount = 0;
var failCount = 0;

window.onload = function () {
    document.getElementById('clean')
        .addEventListener('click', function () {
            deleted = document.getElementById("deleted");
            if(deleted.checked) {
                chrome.downloads.search({
                    "exists": false
                }, function (downloadedItem) {
                    deleteCount = downloadedItem.length;
                    for (var i = 0; i < deleteCount; i++) {
                        chrome.downloads.erase({
                            "id": downloadedItem[i].id
                        }, function (res) {
                            return true;
                        });
                    }
                    setTimeout(setBadge, 100);
                });
            }
            failed = document.getElementById("failed");
            if(failed.checked) {
                chrome.downloads.search({
                    "state" : "interrupted"
                } , function (downloadedItem) {
                    failCount = downloadedItem.length;
                    for (var i = 0; i < failCount; i++){
                        chrome.downloads.erase({
                            "id" : downloadedItem[i].id
                        }, function (res) {
                            return true;
                        });
                    }
                    setTimeout(setBadge, 100);
                });
            }
        });
};

function setBadge() {
    chrome.browserAction.getBadgeText({}, function (result) {
        if(result === "")
            return;
        var count = Number(result);
        chrome.browserAction.setBadgeBackgroundColor({color: "DimGray"});
        if((deleted.checked && failed.checked) ||
            count - deleteCount - failCount === 0)
            chrome.browserAction.setBadgeText({text: ""});
        else
            chrome.browserAction.setBadgeText({text: "" + Number(count - deleteCount - failCount)});
        deleteCount = 0;
        failCount = 0;
    });
}