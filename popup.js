/**
 * Created by Akshay on 5/9/2017.
 */


var x = 0;
var y = 0;

window.onload = function () {
    document.getElementById('clean')
        .addEventListener('click', function () {
            if(document.getElementById('deleted').checked) {
                chrome.downloads.search({
                    "exists": false
                }, function (downloadedItem) {
                    var count = downloadedItem.length;
                    for (var i = 0; i < count; i++) {
                        chrome.downloads.erase({
                            "id": downloadedItem[i].id
                        }, function (res) {
                            x = count;
                            setTimeout(setBadge, 100);
                        });
                    }
                });
            }
            if(document.getElementById('failed').checked) {
                chrome.downloads.search({
                    "state" : "interrupted"
                } , function (downloadedItem) {
                    var count = downloadedItem.length;
                    for (var i = 0; i < count; i++){
                        chrome.downloads.erase({
                            "id" : downloadedItem[i].id
                        }, function (res) {
                            y = count;
                            setTimeout(setBadge, 100);
                        });
                    }
                });
            }
        });
};

function setBadge() {
    chrome.browserAction.getBadgeText({}, function (result) {
        chrome.browserAction.setBadgeBackgroundColor({color: "DimGray"});
        if(result - x - y === 0)
            chrome.browserAction.setBadgeText({text: ""});
        else
            chrome.browserAction.setBadgeText({text: "" + Number(result - x - y)});
        x = 0;
        y = 0;
    });
}