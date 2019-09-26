import JiraClient from 'jira-connector';

export async function initJiraAuth(host: string, username: string, password: string): Promise<JiraClient> {
    const credentialsPlain = `${username}:${password}`;
    const credentialBuffer = Buffer.from(credentialsPlain);
    const credentialsEncoded = credentialBuffer.toString('base64') 

    return new JiraClient({
        host,
        basic_auth: {
            base64: credentialsEncoded
        }
    });
};
