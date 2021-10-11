import { AzureDOMMessage, DOMMessageResponse, JiraDOMMessage } from '../types';

const messagesFromAzureListener = (
    msg: AzureDOMMessage,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: DOMMessageResponse) => void,
) => {
    console.log(
        'messagesFromAzureListener [content.js]. Message received',
        msg,
    );
    try {
        const response: DOMMessageResponse = {
            title: document
                .getElementsByClassName('work-item-form-title')[0]
                .getElementsByTagName('input')[0].value,
            number: document
                .getElementsByClassName('work-item-form-id')[0]
                .getElementsByTagName('span')[0].innerText,
        };

        console.log(
            'messagesFromAzureListener [content.js]. Message response',
            response,
        );
        sendResponse(response);
    } catch (e) {
        console.log(e);
    }
};

const messagesFromJiraListener = (
    msg: JiraDOMMessage,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: DOMMessageResponse) => void,
) => {
    console.log('messagesFromJiraListener [content.js]. Message received', msg);
    try {
        const title = document.querySelector(
            '[data-test-id="issue.views.issue-base.foundation.summary.heading"]',
        );
        const number = document.querySelector(
            '[data-test-id="issue.views.issue-base.foundation.breadcrumbs.breadcrumb-current-issue-container"]',
        );

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const response: DOMMessageResponse = {
            title: (<HTMLElement>title).innerText,
            number: (<HTMLElement>number).innerText,
        };

        console.log(
            'messagesFromJiraListener[content.js]. Message response',
            response,
        );
        sendResponse(response);
    } catch (e) {
        console.log(e);
    }
};

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromAzureListener);

chrome.runtime.onMessage.addListener(messagesFromJiraListener);
