import core = require('@actions/core');
import toArray from 'await-to-js';
import { context } from '@actions/github';
import { initJiraAuth } from './jira/auth';
import { validatePRTitle } from './jira/validator';
import JiraClient = require('jira-connector');
import _ from 'lodash';
import util from 'util';

export type EnvMap = {
  [key: string]: string
}

async function run() {
  const {
    JIRA_HOST: host,
    JIRA_USERNAME: username,
    JIRA_PASSWORD: password,
  } = <EnvMap>process.env;

  const jira: JiraClient = await initJiraAuth(host, username, password);
  const getIssue: (input: any) => Promise<void> = util.promisify(jira.issue.getIssue).bind(jira.issue);

  const prTitle: string = _.get(context, 'payload.pull_request.title');

  const [err] = await toArray(
    validatePRTitle(prTitle, getIssue)
  );
  if (err) {
    core.setOutput('OUTPUT_PRTITLECHECK.title', 'OMG KAI 3 LOL')
    core.setFailed(`PR title validation failed: ${err}`)
  }
}

run();