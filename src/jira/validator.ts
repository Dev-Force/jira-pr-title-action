import _ from 'lodash';

export async function validatePRTitle(prTitle: string, getIssue: (input: any) => Promise<void>) {
    // 1. split the title and get the first part of the title (PB-XXXX)
    const issueKey = _.get(prTitle.split(' '), [0]);

    if (issueKey == null) {
        throw new Error('Cannot split PR title');
    }

    // 2. Verify that issue exists in jira
    const issue = await getIssue({
        issueKey,
    });

    const status = _.get(issue, "fields.status.name");
    if (status === "Closed" || status === "Resolved") {
        throw new Error("Issue is old and " + status);
    }
}
