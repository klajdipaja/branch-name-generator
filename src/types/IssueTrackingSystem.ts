export type IssueTrackingSystemsTypes = 'jira' | 'azure-devops';
export const IssueTrackingSystems: {
    label: string;
    value: IssueTrackingSystemsTypes;
    key: string;
}[] = [
    {
        value: 'jira',
        key: 'jira',
        label: 'Jira',
    },
    {
        value: 'azure-devops',
        key: 'azure-devops',
        label: 'Azure DevOps',
    },
];
