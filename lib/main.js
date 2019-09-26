"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const await_to_js_1 = __importDefault(require("await-to-js"));
const github_1 = require("@actions/github");
const auth_1 = require("./jira/auth");
const validator_1 = require("./jira/validator");
const lodash_1 = __importDefault(require("lodash"));
const util_1 = __importDefault(require("util"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const { JIRA_HOST: host, JIRA_USERNAME: username, JIRA_PASSWORD: password, GITHUB_TOKEN: githubToken, } = process.env;
        const jira = yield auth_1.initJiraAuth(host, username, password);
        const getIssue = util_1.default.promisify(jira.issue.getIssue).bind(jira.issue);
        const prTitle = lodash_1.default.get(github_1.context, 'payload.pull_request.title');
        const [err] = yield await_to_js_1.default(validator_1.validatePRTitle(prTitle, getIssue));
        if (err) {
            core.setFailed(`PR title validation failed: ${err}`);
        }
    });
}
run();
