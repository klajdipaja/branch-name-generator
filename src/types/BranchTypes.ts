export type BranchTypes = 'feature' | 'bugfix' | 'hotfix';

export const BranchTypeOptions: {
    label: string;
    value: BranchTypes;
    key: string;
}[] = [
    {
        value: 'feature',
        key: 'feature',
        label: 'Feature',
    },
    {
        value: 'bugfix',
        key: 'bugfix',
        label: 'Bugfix',
    },
    {
        value: 'hotfix',
        key: 'Hotfix',
        label: 'Hotfix',
    },
];
