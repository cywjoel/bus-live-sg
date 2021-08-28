let mem = [];

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ mem });
    console.log('Memory initialized')
    }
)