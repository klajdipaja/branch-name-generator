import { message } from 'antd';
import { DOMMessageResponse, JiraDOMMessage } from '../types';

const LoadJiraTicket = (
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
                url: '*://*.atlassian.net/*',
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
                    message.warning('You are not on an atlassian.net tab! ');
                } else {
                    chrome.tabs.sendMessage(
                        tabs[0].id || 0,
                        { type: 'GET_JIRA_DOM' } as JiraDOMMessage,
                        (response: DOMMessageResponse) => {
                            onDataReceived(response);
                        },
                    );
                }
            },
        );
};
export default LoadJiraTicket;
