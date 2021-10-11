import React, { useState } from 'react';
import { Button, Form, Input, Radio, Select } from 'antd';
import './BranchGenerator.scss';
import { CopyOutlined } from '@ant-design/icons';
import LoadAzureTicket from '../../azure/AzureHelper';
import { copyBranchName, toSlag } from '../../utils/utility';
import { GeneratorFormType } from '../../types/GeneratorFormType';
import { BranchTypeOptions } from '../../types/BranchTypes';
import LoadJiraTicket from '../../jira/JiraHelper';
import { IssueTrackingSystems } from '../../types/IssueTrackingSystem';

const BranchGenerator: React.FC = () => {
    const [branch, setBranch] = useState<string>();
    const [branchLabel, setBranchLabel] = useState<string>(
        BranchTypeOptions[0].label,
    );
    const [form] = Form.useForm();
    const [issueTrackingSystem, setIssueTrackingSystem] = useState(
        IssueTrackingSystems[1].value,
    );

    const loadTicketData = () => {
        if (issueTrackingSystem === 'azure-devops') {
            LoadAzureTicket(({ title, number }) => {
                form.setFieldsValue({
                    title,
                    number,
                });
                form.submit();
            });
        } else if (issueTrackingSystem === 'jira') {
            LoadJiraTicket(({ title, number: jiraTicketNumber }) => {
                const jiraTicketNumberParts = jiraTicketNumber.split('-');
                form.setFieldsValue({
                    title,
                    number: jiraTicketNumberParts[1],
                    code: jiraTicketNumberParts[0],
                });
                form.submit();
            });
        }
    };

    const onBranchTypeChange = ({
        type,
        issueTrackingSystem: ts,
    }: GeneratorFormType) => {
        if (type) {
            const selected = BranchTypeOptions.find(
                (f: { value: string }) => f.value === type,
            );
            if (selected) setBranchLabel(selected.label);
        }
        if (ts) {
            setIssueTrackingSystem(ts);
        }
    };

    const onFinish = ({ type, title, number, code }: GeneratorFormType) => {
        setBranch(`${type}/${code}-${number}_${toSlag(title)}`);
    };

    return (
        <div className="layout home-layout">
            <Form
                form={form}
                layout="vertical"
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                onFinish={onFinish}
                autoComplete="off"
                initialValues={{
                    issueTrackingSystem,
                }}
                onValuesChange={onBranchTypeChange}
            >
                <Form.Item
                    label="Issue Tracking System"
                    name="issueTrackingSystem"
                >
                    <Radio.Group>
                        {IssueTrackingSystems.map((m) => (
                            <Radio.Button value={m.value} key={m.key}>
                                {m.label}
                            </Radio.Button>
                        ))}
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label="Type"
                    name="type"
                    initialValue="feature"
                    rules={[
                        {
                            required: true,
                            message: 'Please select branch type!',
                        },
                    ]}
                >
                    <Select style={{ width: 120 }}>
                        {BranchTypeOptions.map((m) => (
                            <Select.Option value={m.value} key={m.key}>
                                {m.label}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Jira Code"
                    name="code"
                    initialValue="SH"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Jira Code!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Ticket Number"
                    name="number"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Ticket Number!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Ticket Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Ticket Title!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <div className="action-buttons">
                    <Button
                        className="load-ticket-data"
                        type="primary"
                        htmlType="button"
                        onClick={loadTicketData}
                    >
                        Load From View
                    </Button>
                    <Button
                        className="generate-branch"
                        type="primary"
                        htmlType="submit"
                    >
                        Generate {branchLabel} Branch
                    </Button>
                </div>
            </Form>
            {branch && (
                <div className="generated-branch">
                    <div>Generated Branch Name:</div>
                    <div>
                        <Input
                            onChange={(e) => setBranch(e.target.value)}
                            aria-colcount={4}
                            value={branch}
                            prefix={
                                branch && (
                                    <CopyOutlined
                                        className="copy-icon"
                                        onClick={() => copyBranchName(branch)}
                                    />
                                )
                            }
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default BranchGenerator;
