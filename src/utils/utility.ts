import { message } from 'antd';

export const copyBranchName = (txt: string): void => {
    if (txt) {
        navigator.clipboard.writeText(txt);
        message.success('Copied to clipboard');
    }
};

export const toSlag = (str: string): string =>
    str
        .trim()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '_');
