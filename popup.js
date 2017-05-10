/**
 * Created by Akshay on 5/9/2017.
 */

window.onload = function () {
    document.getElementById('clean')
        .addEventListener('click', function () {
            chrome.downloads.search({
                "exists" : false
            } , function (downloadedItem) {
                if(downloadedItem.length === 0)
                    chrome.browserAction.setBadgeText({text: ""});
                for (var i =0; i < downloadedItem.length; i++){
                    chrome.downloads.erase({
                        "id" : downloadedItem[i].id
                    }, function (res) {
                        chrome.browserAction.setBadgeBackgroundColor({color: "red"});
                        chrome.browserAction.setBadgeText({text: ""});
                    });
                }
            });
        });
};
