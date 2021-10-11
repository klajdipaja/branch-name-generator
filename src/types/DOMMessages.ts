export type AzureDOMMessage = {
    type: 'GET_AZURE_DOM';
};

export type JiraDOMMessage = {
    type: 'GET_JIRA_DOM';
};

export type DOMMessageResponse = {
    title: string;
    number: string;
};
