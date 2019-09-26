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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
function validatePRTitle(prTitle, getIssue) {
    return __awaiter(this, void 0, void 0, function* () {
        // 1. split the title and get the first part of the title (PB-XXXX)
        const issueKey = lodash_1.default.get(prTitle.split(' '), [0]);
        if (issueKey == null) {
            throw new Error('Cannot split PR title');
        }
        // 2. Verify that issue exists in jira
        const issue = yield getIssue({
            issueKey,
        });
        const status = lodash_1.default.get(issue, "fields.status.name");
        if (status === "Closed" || status === "Resolved") {
            throw new Error("Issue is old and " + status);
        }
    });
}
exports.validatePRTitle = validatePRTitle;
