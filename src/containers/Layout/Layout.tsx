import React from 'react';
import { Layout } from 'antd';
import './Layout.scss';

const AppLayout: React.FC = ({ children }) => {
    return (
        <Layout className="layout">
            <Layout.Header>Branch Name Generator</Layout.Header>
            <Layout.Content>
                <div className="site-layout-content">{children}</div>
            </Layout.Content>
        </Layout>
    );
};

export default AppLayout;
