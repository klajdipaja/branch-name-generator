import { BranchTypes } from './BranchTypes';
import { IssueTrackingSystemsTypes } from './IssueTrackingSystem';

export type GeneratorFormType = {
    issueTrackingSystem: IssueTrackingSystemsTypes;
    type: BranchTypes;
    code: string;
    title: string;
    number: string;
};
