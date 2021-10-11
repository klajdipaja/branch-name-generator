import { message } from 'antd';
import { AzureDOMMessage, DOMMessageResponse } from '../types';

const LoadAzureTicket = (
    onDataReceived: (response: DOMMessageResponse) => void,
) => {
    /**
     * We can't use "chrome.runtime.sendMessage" for sending messages from React.
     * For sending messages from React we need to specify which tab to send it to.
     */
    // eslint-disable-next-line no-unused-expressions
    chrome.tabs &&
        chrome.tabs.query(
            {
                active: true,
                url: '*://dev.azure.com/*',
                currentWindow: true,
            },
            (tabs) => {
                /**
                 * Sends a single message to the content script(s) in the specified tab,
                 * with an optional callback to run when a response is sent back.
                 *
                 * The runtime.onMessage event is fired in each content script running
                 * in the specified tab for the current extension.
                 */
                if (!tabs || tabs.length === 0) {
                    message.warning('You are not on dev.azure.com tab! ');
                } else {
                    chrome.tabs.sendMessage(
                        tabs[0].id || 0,
                        { type: 'GET_AZURE_DOM' } as AzureDOMMessage,
                        (response: DOMMessageResponse) => {
                            onDataReceived(response);
                        },
                    );
                }
            },
        );
};
export default LoadAzureTicket;
