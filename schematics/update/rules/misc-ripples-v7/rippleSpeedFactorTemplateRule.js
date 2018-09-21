"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslint_1 = require("tslint");
const component_walker_1 = require("../../tslint/component-walker");
const rule_failures_1 = require("../../tslint/rule-failures");
const ripple_speed_factor_1 = require("./ripple-speed-factor");
/** Regular expression that matches [matRippleSpeedFactor]="$NUMBER" in templates. */
const speedFactorNumberRegex = /\[matRippleSpeedFactor]="(\d+(?:\.\d+)?)"/g;
/** Regular expression that matches [matRippleSpeedFactor]="$NOT_A_NUMBER" in templates. */
const speedFactorNotParseable = /\[matRippleSpeedFactor]="(?!\d+(?:\.\d+)?")(.*)"/g;
/** Failure message that will be shown if a speed factor is set to a readable number. */
const failureMessageReadableNumber = 'Detected deprecated [matRippleSpeedFactor] input binding with readable number.';
/** Failure message that will be shown if a speed factor is set to a non-parseable value. */
const failureMessageNonParseableValue = 'Detected deprecated [matRippleSpeedFactor] input binding with non-parseable value.';
/**
 * Rule that walks through every inline or external template and updates the deprecated
 * [matRippleSpeedFactor] to [matRippleAnimation].
 */
class Rule extends tslint_1.Rules.AbstractRule {
    apply(sourceFile) {
        return this.applyWithWalker(new Walker(sourceFile, this.getOptions()));
    }
}
exports.Rule = Rule;
class Walker extends component_walker_1.ComponentWalker {
    visitInlineTemplate(template) {
        this._createReplacementsForContent(template, template.getText())
            .forEach(data => rule_failures_1.addFailureAtReplacement(this, data.failureMessage, data.replacement));
    }
    visitExternalTemplate(template) {
        this._createReplacementsForContent(template, template.getFullText())
            .map(data => rule_failures_1.createExternalReplacementFailure(template, data.failureMessage, this.getRuleName(), data.replacement))
            .forEach(failure => this.addFailure(failure));
    }
    _createReplacementsForContent(node, templateText) {
        const replacements = [];
        const startPos = node.getStart();
        let match;
        while ((match = speedFactorNumberRegex.exec(templateText)) !== null) {
            const newEnterDuration = ripple_speed_factor_1.convertSpeedFactorToDuration(parseFloat(match[1]));
            const fix = this.createReplacement(startPos + match.index, match[0].length, `[matRippleAnimation]="{enterDuration: ${newEnterDuration}}"`);
            replacements.push({
                replacement: fix,
                failureMessage: failureMessageReadableNumber,
            });
        }
        while ((match = speedFactorNotParseable.exec(templateText)) !== null) {
            const newDurationExpression = ripple_speed_factor_1.createSpeedFactorConvertExpression(match[1]);
            const fix = this.createReplacement(startPos + match.index, match[0].length, `[matRippleAnimation]="{enterDuration: (${newDurationExpression})}"`);
            replacements.push({
                replacement: fix,
                failureMessage: failureMessageNonParseableValue,
            });
        }
        return replacements;
    }
}
exports.Walker = Walker;
//# sourceMappingURL=rippleSpeedFactorTemplateRule.js.map