import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import AppLayout from './containers/Layout/Layout';
import BranchGenerator from './containers/Home/BranchGenerator';

const App: React.FC = () => (
    <AppLayout>
        <BranchGenerator />
    </AppLayout>
);
export default App;
