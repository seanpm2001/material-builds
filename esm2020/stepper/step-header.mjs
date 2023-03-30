/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, ViewEncapsulation, } from '@angular/core';
import { MatStepLabel } from './step-label';
import { MatStepperIntl } from './stepper-intl';
import { CdkStepHeader } from '@angular/cdk/stepper';
import { mixinColor } from '@angular/material/core';
import * as i0 from "@angular/core";
import * as i1 from "./stepper-intl";
import * as i2 from "@angular/cdk/a11y";
import * as i3 from "@angular/common";
import * as i4 from "@angular/material/icon";
import * as i5 from "@angular/material/core";
// Boilerplate for applying mixins to MatStepHeader.
/** @docs-private */
const _MatStepHeaderBase = mixinColor(class MatStepHeaderBase extends CdkStepHeader {
    constructor(elementRef) {
        super(elementRef);
    }
}, 'primary');
class MatStepHeader extends _MatStepHeaderBase {
    constructor(_intl, _focusMonitor, _elementRef, changeDetectorRef) {
        super(_elementRef);
        this._intl = _intl;
        this._focusMonitor = _focusMonitor;
        this._intlSubscription = _intl.changes.subscribe(() => changeDetectorRef.markForCheck());
    }
    ngAfterViewInit() {
        this._focusMonitor.monitor(this._elementRef, true);
    }
    ngOnDestroy() {
        this._intlSubscription.unsubscribe();
        this._focusMonitor.stopMonitoring(this._elementRef);
    }
    /** Focuses the step header. */
    focus(origin, options) {
        if (origin) {
            this._focusMonitor.focusVia(this._elementRef, origin, options);
        }
        else {
            this._elementRef.nativeElement.focus(options);
        }
    }
    /** Returns string label of given step if it is a text label. */
    _stringLabel() {
        return this.label instanceof MatStepLabel ? null : this.label;
    }
    /** Returns MatStepLabel if the label of given step is a template label. */
    _templateLabel() {
        return this.label instanceof MatStepLabel ? this.label : null;
    }
    /** Returns the host HTML element. */
    _getHostElement() {
        return this._elementRef.nativeElement;
    }
    /** Template context variables that are exposed to the `matStepperIcon` instances. */
    _getIconContext() {
        return {
            index: this.index,
            active: this.active,
            optional: this.optional,
        };
    }
    _getDefaultTextForState(state) {
        if (state == 'number') {
            return `${this.index + 1}`;
        }
        if (state == 'edit') {
            return 'create';
        }
        if (state == 'error') {
            return 'warning';
        }
        return state;
    }
}
MatStepHeader.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.5", ngImport: i0, type: MatStepHeader, deps: [{ token: i1.MatStepperIntl }, { token: i2.FocusMonitor }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MatStepHeader.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.0-next.5", type: MatStepHeader, selector: "mat-step-header", inputs: { color: "color", state: "state", label: "label", errorMessage: "errorMessage", iconOverrides: "iconOverrides", index: "index", selected: "selected", active: "active", optional: "optional", disableRipple: "disableRipple" }, host: { attributes: { "role": "tab" }, classAttribute: "mat-step-header" }, usesInheritance: true, ngImport: i0, template: "<div class=\"mat-step-header-ripple mat-focus-indicator\" matRipple\n     [matRippleTrigger]=\"_getHostElement()\"\n     [matRippleDisabled]=\"disableRipple\"></div>\n\n<div class=\"mat-step-icon-state-{{state}} mat-step-icon\" [class.mat-step-icon-selected]=\"selected\">\n  <div class=\"mat-step-icon-content\" [ngSwitch]=\"!!(iconOverrides && iconOverrides[state])\">\n    <ng-container\n      *ngSwitchCase=\"true\"\n      [ngTemplateOutlet]=\"iconOverrides[state]\"\n      [ngTemplateOutletContext]=\"_getIconContext()\"></ng-container>\n    <ng-container *ngSwitchDefault [ngSwitch]=\"state\">\n      <span aria-hidden=\"true\" *ngSwitchCase=\"'number'\">{{_getDefaultTextForState(state)}}</span>\n      <span class=\"cdk-visually-hidden\" *ngIf=\"state === 'done'\">{{_intl.completedLabel}}</span>\n      <span class=\"cdk-visually-hidden\" *ngIf=\"state === 'edit'\">{{_intl.editableLabel}}</span>\n      <mat-icon aria-hidden=\"true\" *ngSwitchDefault>{{_getDefaultTextForState(state)}}</mat-icon>\n    </ng-container>\n  </div>\n</div>\n<div class=\"mat-step-label\"\n     [class.mat-step-label-active]=\"active\"\n     [class.mat-step-label-selected]=\"selected\"\n     [class.mat-step-label-error]=\"state == 'error'\">\n  <!-- If there is a label template, use it. -->\n  <div class=\"mat-step-text-label\" *ngIf=\"_templateLabel()\">\n    <ng-container [ngTemplateOutlet]=\"_templateLabel()!.template\"></ng-container>\n  </div>\n  <!-- If there is no label template, fall back to the text label. -->\n  <div class=\"mat-step-text-label\" *ngIf=\"_stringLabel()\">{{label}}</div>\n\n  <div class=\"mat-step-optional\" *ngIf=\"optional && state != 'error'\">{{_intl.optionalLabel}}</div>\n  <div class=\"mat-step-sub-label-error\" *ngIf=\"state == 'error'\">{{errorMessage}}</div>\n</div>\n\n", styles: [".mat-step-header{overflow:hidden;outline:none;cursor:pointer;position:relative;box-sizing:content-box;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-step-header:focus .mat-focus-indicator::before{content:\"\"}.cdk-high-contrast-active .mat-step-header{outline:solid 1px}.cdk-high-contrast-active .mat-step-header[aria-selected=true] .mat-step-label{text-decoration:underline}.cdk-high-contrast-active .mat-step-header[aria-disabled=true]{outline-color:GrayText}.cdk-high-contrast-active .mat-step-header[aria-disabled=true] .mat-step-label,.cdk-high-contrast-active .mat-step-header[aria-disabled=true] .mat-step-icon,.cdk-high-contrast-active .mat-step-header[aria-disabled=true] .mat-step-optional{color:GrayText}.mat-step-optional,.mat-step-sub-label-error{font-size:12px}.mat-step-icon{border-radius:50%;height:24px;width:24px;flex-shrink:0;position:relative}.mat-step-icon-content{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);display:flex}.mat-step-icon .mat-icon{font-size:16px;height:16px;width:16px}.mat-step-icon-state-error .mat-icon{font-size:24px;height:24px;width:24px}.mat-step-label{display:inline-block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:50px;vertical-align:middle}.mat-step-text-label{text-overflow:ellipsis;overflow:hidden}.mat-step-header .mat-step-header-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}"], dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i3.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i3.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i3.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "component", type: i4.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: i5.MatRipple, selector: "[mat-ripple], [matRipple]", inputs: ["matRippleColor", "matRippleUnbounded", "matRippleCentered", "matRippleRadius", "matRippleAnimation", "matRippleDisabled", "matRippleTrigger"], exportAs: ["matRipple"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
export { MatStepHeader };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.5", ngImport: i0, type: MatStepHeader, decorators: [{
            type: Component,
            args: [{ selector: 'mat-step-header', inputs: ['color'], host: {
                        'class': 'mat-step-header',
                        'role': 'tab',
                    }, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"mat-step-header-ripple mat-focus-indicator\" matRipple\n     [matRippleTrigger]=\"_getHostElement()\"\n     [matRippleDisabled]=\"disableRipple\"></div>\n\n<div class=\"mat-step-icon-state-{{state}} mat-step-icon\" [class.mat-step-icon-selected]=\"selected\">\n  <div class=\"mat-step-icon-content\" [ngSwitch]=\"!!(iconOverrides && iconOverrides[state])\">\n    <ng-container\n      *ngSwitchCase=\"true\"\n      [ngTemplateOutlet]=\"iconOverrides[state]\"\n      [ngTemplateOutletContext]=\"_getIconContext()\"></ng-container>\n    <ng-container *ngSwitchDefault [ngSwitch]=\"state\">\n      <span aria-hidden=\"true\" *ngSwitchCase=\"'number'\">{{_getDefaultTextForState(state)}}</span>\n      <span class=\"cdk-visually-hidden\" *ngIf=\"state === 'done'\">{{_intl.completedLabel}}</span>\n      <span class=\"cdk-visually-hidden\" *ngIf=\"state === 'edit'\">{{_intl.editableLabel}}</span>\n      <mat-icon aria-hidden=\"true\" *ngSwitchDefault>{{_getDefaultTextForState(state)}}</mat-icon>\n    </ng-container>\n  </div>\n</div>\n<div class=\"mat-step-label\"\n     [class.mat-step-label-active]=\"active\"\n     [class.mat-step-label-selected]=\"selected\"\n     [class.mat-step-label-error]=\"state == 'error'\">\n  <!-- If there is a label template, use it. -->\n  <div class=\"mat-step-text-label\" *ngIf=\"_templateLabel()\">\n    <ng-container [ngTemplateOutlet]=\"_templateLabel()!.template\"></ng-container>\n  </div>\n  <!-- If there is no label template, fall back to the text label. -->\n  <div class=\"mat-step-text-label\" *ngIf=\"_stringLabel()\">{{label}}</div>\n\n  <div class=\"mat-step-optional\" *ngIf=\"optional && state != 'error'\">{{_intl.optionalLabel}}</div>\n  <div class=\"mat-step-sub-label-error\" *ngIf=\"state == 'error'\">{{errorMessage}}</div>\n</div>\n\n", styles: [".mat-step-header{overflow:hidden;outline:none;cursor:pointer;position:relative;box-sizing:content-box;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-step-header:focus .mat-focus-indicator::before{content:\"\"}.cdk-high-contrast-active .mat-step-header{outline:solid 1px}.cdk-high-contrast-active .mat-step-header[aria-selected=true] .mat-step-label{text-decoration:underline}.cdk-high-contrast-active .mat-step-header[aria-disabled=true]{outline-color:GrayText}.cdk-high-contrast-active .mat-step-header[aria-disabled=true] .mat-step-label,.cdk-high-contrast-active .mat-step-header[aria-disabled=true] .mat-step-icon,.cdk-high-contrast-active .mat-step-header[aria-disabled=true] .mat-step-optional{color:GrayText}.mat-step-optional,.mat-step-sub-label-error{font-size:12px}.mat-step-icon{border-radius:50%;height:24px;width:24px;flex-shrink:0;position:relative}.mat-step-icon-content{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);display:flex}.mat-step-icon .mat-icon{font-size:16px;height:16px;width:16px}.mat-step-icon-state-error .mat-icon{font-size:24px;height:24px;width:24px}.mat-step-label{display:inline-block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:50px;vertical-align:middle}.mat-step-text-label{text-overflow:ellipsis;overflow:hidden}.mat-step-header .mat-step-header-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}"] }]
        }], ctorParameters: function () { return [{ type: i1.MatStepperIntl }, { type: i2.FocusMonitor }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { state: [{
                type: Input
            }], label: [{
                type: Input
            }], errorMessage: [{
                type: Input
            }], iconOverrides: [{
                type: Input
            }], index: [{
                type: Input
            }], selected: [{
                type: Input
            }], active: [{
                type: Input
            }], optional: [{
                type: Input
            }], disableRipple: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC1oZWFkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvc3RlcHBlci9zdGVwLWhlYWRlci50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9zdGVwcGVyL3N0ZXAtaGVhZGVyLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBYyxNQUFNLG1CQUFtQixDQUFDO0FBQzVELE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUVMLGlCQUFpQixHQUdsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQzFDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5QyxPQUFPLEVBQUMsYUFBYSxFQUFZLE1BQU0sc0JBQXNCLENBQUM7QUFDOUQsT0FBTyxFQUFDLFVBQVUsRUFBVyxNQUFNLHdCQUF3QixDQUFDOzs7Ozs7O0FBRTVELG9EQUFvRDtBQUNwRCxvQkFBb0I7QUFDcEIsTUFBTSxrQkFBa0IsR0FBRyxVQUFVLENBQ25DLE1BQU0saUJBQWtCLFNBQVEsYUFBYTtJQUMzQyxZQUFZLFVBQXNCO1FBQ2hDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNwQixDQUFDO0NBQ0YsRUFDRCxTQUFTLENBQ1YsQ0FBQztBQUVGLE1BWWEsYUFDWCxTQUFRLGtCQUFrQjtJQWdDMUIsWUFDUyxLQUFxQixFQUNwQixhQUEyQixFQUNuQyxXQUFvQyxFQUNwQyxpQkFBb0M7UUFFcEMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBTFosVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDcEIsa0JBQWEsR0FBYixhQUFhLENBQWM7UUFLbkMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7SUFDM0YsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsK0JBQStCO0lBQ3RCLEtBQUssQ0FBQyxNQUFvQixFQUFFLE9BQXNCO1FBQ3pELElBQUksTUFBTSxFQUFFO1lBQ1YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDaEU7YUFBTTtZQUNMLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMvQztJQUNILENBQUM7SUFFRCxnRUFBZ0U7SUFDaEUsWUFBWTtRQUNWLE9BQU8sSUFBSSxDQUFDLEtBQUssWUFBWSxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNoRSxDQUFDO0lBRUQsMkVBQTJFO0lBQzNFLGNBQWM7UUFDWixPQUFPLElBQUksQ0FBQyxLQUFLLFlBQVksWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDaEUsQ0FBQztJQUVELHFDQUFxQztJQUNyQyxlQUFlO1FBQ2IsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQztJQUN4QyxDQUFDO0lBRUQscUZBQXFGO0lBQ3JGLGVBQWU7UUFDYixPQUFPO1lBQ0wsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDeEIsQ0FBQztJQUNKLENBQUM7SUFFRCx1QkFBdUIsQ0FBQyxLQUFnQjtRQUN0QyxJQUFJLEtBQUssSUFBSSxRQUFRLEVBQUU7WUFDckIsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUM7U0FDNUI7UUFDRCxJQUFJLEtBQUssSUFBSSxNQUFNLEVBQUU7WUFDbkIsT0FBTyxRQUFRLENBQUM7U0FDakI7UUFDRCxJQUFJLEtBQUssSUFBSSxPQUFPLEVBQUU7WUFDcEIsT0FBTyxTQUFTLENBQUM7U0FDbEI7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7O2lIQWhHVSxhQUFhO3FHQUFiLGFBQWEsa1lDbEQxQiwrd0RBaUNBO1NEaUJhLGFBQWE7a0dBQWIsYUFBYTtrQkFaekIsU0FBUzsrQkFDRSxpQkFBaUIsVUFHbkIsQ0FBQyxPQUFPLENBQUMsUUFDWDt3QkFDSixPQUFPLEVBQUUsaUJBQWlCO3dCQUMxQixNQUFNLEVBQUUsS0FBSztxQkFDZCxpQkFDYyxpQkFBaUIsQ0FBQyxJQUFJLG1CQUNwQix1QkFBdUIsQ0FBQyxNQUFNO3lMQVN0QyxLQUFLO3NCQUFiLEtBQUs7Z0JBR0csS0FBSztzQkFBYixLQUFLO2dCQUdHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBR0csYUFBYTtzQkFBckIsS0FBSztnQkFHRyxLQUFLO3NCQUFiLEtBQUs7Z0JBR0csUUFBUTtzQkFBaEIsS0FBSztnQkFHRyxNQUFNO3NCQUFkLEtBQUs7Z0JBR0csUUFBUTtzQkFBaEIsS0FBSztnQkFHRyxhQUFhO3NCQUFyQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Rm9jdXNNb25pdG9yLCBGb2N1c09yaWdpbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBUZW1wbGF0ZVJlZixcbiAgQWZ0ZXJWaWV3SW5pdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge01hdFN0ZXBMYWJlbH0gZnJvbSAnLi9zdGVwLWxhYmVsJztcbmltcG9ydCB7TWF0U3RlcHBlckludGx9IGZyb20gJy4vc3RlcHBlci1pbnRsJztcbmltcG9ydCB7TWF0U3RlcHBlckljb25Db250ZXh0fSBmcm9tICcuL3N0ZXBwZXItaWNvbic7XG5pbXBvcnQge0Nka1N0ZXBIZWFkZXIsIFN0ZXBTdGF0ZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3N0ZXBwZXInO1xuaW1wb3J0IHttaXhpbkNvbG9yLCBDYW5Db2xvcn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5cbi8vIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gTWF0U3RlcEhlYWRlci5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5jb25zdCBfTWF0U3RlcEhlYWRlckJhc2UgPSBtaXhpbkNvbG9yKFxuICBjbGFzcyBNYXRTdGVwSGVhZGVyQmFzZSBleHRlbmRzIENka1N0ZXBIZWFkZXIge1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuICAgIH1cbiAgfSxcbiAgJ3ByaW1hcnknLFxuKTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LXN0ZXAtaGVhZGVyJyxcbiAgdGVtcGxhdGVVcmw6ICdzdGVwLWhlYWRlci5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3N0ZXAtaGVhZGVyLmNzcyddLFxuICBpbnB1dHM6IFsnY29sb3InXSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtc3RlcC1oZWFkZXInLFxuICAgICdyb2xlJzogJ3RhYicsXG4gIH0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRTdGVwSGVhZGVyXG4gIGV4dGVuZHMgX01hdFN0ZXBIZWFkZXJCYXNlXG4gIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBDYW5Db2xvclxue1xuICBwcml2YXRlIF9pbnRsU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLyoqIFN0YXRlIG9mIHRoZSBnaXZlbiBzdGVwLiAqL1xuICBASW5wdXQoKSBzdGF0ZTogU3RlcFN0YXRlO1xuXG4gIC8qKiBMYWJlbCBvZiB0aGUgZ2l2ZW4gc3RlcC4gKi9cbiAgQElucHV0KCkgbGFiZWw6IE1hdFN0ZXBMYWJlbCB8IHN0cmluZztcblxuICAvKiogRXJyb3IgbWVzc2FnZSB0byBkaXNwbGF5IHdoZW4gdGhlcmUncyBhbiBlcnJvci4gKi9cbiAgQElucHV0KCkgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XG5cbiAgLyoqIE92ZXJyaWRlcyBmb3IgdGhlIGhlYWRlciBpY29ucywgcGFzc2VkIGluIHZpYSB0aGUgc3RlcHBlci4gKi9cbiAgQElucHV0KCkgaWNvbk92ZXJyaWRlczoge1trZXk6IHN0cmluZ106IFRlbXBsYXRlUmVmPE1hdFN0ZXBwZXJJY29uQ29udGV4dD59O1xuXG4gIC8qKiBJbmRleCBvZiB0aGUgZ2l2ZW4gc3RlcC4gKi9cbiAgQElucHV0KCkgaW5kZXg6IG51bWJlcjtcblxuICAvKiogV2hldGhlciB0aGUgZ2l2ZW4gc3RlcCBpcyBzZWxlY3RlZC4gKi9cbiAgQElucHV0KCkgc2VsZWN0ZWQ6IGJvb2xlYW47XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGdpdmVuIHN0ZXAgbGFiZWwgaXMgYWN0aXZlLiAqL1xuICBASW5wdXQoKSBhY3RpdmU6IGJvb2xlYW47XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGdpdmVuIHN0ZXAgaXMgb3B0aW9uYWwuICovXG4gIEBJbnB1dCgpIG9wdGlvbmFsOiBib29sZWFuO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSByaXBwbGUgc2hvdWxkIGJlIGRpc2FibGVkLiAqL1xuICBASW5wdXQoKSBkaXNhYmxlUmlwcGxlOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBfaW50bDogTWF0U3RlcHBlckludGwsXG4gICAgcHJpdmF0ZSBfZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsXG4gICAgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgKSB7XG4gICAgc3VwZXIoX2VsZW1lbnRSZWYpO1xuICAgIHRoaXMuX2ludGxTdWJzY3JpcHRpb24gPSBfaW50bC5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiBjaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5fZm9jdXNNb25pdG9yLm1vbml0b3IodGhpcy5fZWxlbWVudFJlZiwgdHJ1ZSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9pbnRsU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZm9jdXNNb25pdG9yLnN0b3BNb25pdG9yaW5nKHRoaXMuX2VsZW1lbnRSZWYpO1xuICB9XG5cbiAgLyoqIEZvY3VzZXMgdGhlIHN0ZXAgaGVhZGVyLiAqL1xuICBvdmVycmlkZSBmb2N1cyhvcmlnaW4/OiBGb2N1c09yaWdpbiwgb3B0aW9ucz86IEZvY3VzT3B0aW9ucykge1xuICAgIGlmIChvcmlnaW4pIHtcbiAgICAgIHRoaXMuX2ZvY3VzTW9uaXRvci5mb2N1c1ZpYSh0aGlzLl9lbGVtZW50UmVmLCBvcmlnaW4sIG9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMob3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFJldHVybnMgc3RyaW5nIGxhYmVsIG9mIGdpdmVuIHN0ZXAgaWYgaXQgaXMgYSB0ZXh0IGxhYmVsLiAqL1xuICBfc3RyaW5nTGFiZWwoKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMubGFiZWwgaW5zdGFuY2VvZiBNYXRTdGVwTGFiZWwgPyBudWxsIDogdGhpcy5sYWJlbDtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIE1hdFN0ZXBMYWJlbCBpZiB0aGUgbGFiZWwgb2YgZ2l2ZW4gc3RlcCBpcyBhIHRlbXBsYXRlIGxhYmVsLiAqL1xuICBfdGVtcGxhdGVMYWJlbCgpOiBNYXRTdGVwTGFiZWwgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5sYWJlbCBpbnN0YW5jZW9mIE1hdFN0ZXBMYWJlbCA/IHRoaXMubGFiZWwgOiBudWxsO1xuICB9XG5cbiAgLyoqIFJldHVybnMgdGhlIGhvc3QgSFRNTCBlbGVtZW50LiAqL1xuICBfZ2V0SG9zdEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIC8qKiBUZW1wbGF0ZSBjb250ZXh0IHZhcmlhYmxlcyB0aGF0IGFyZSBleHBvc2VkIHRvIHRoZSBgbWF0U3RlcHBlckljb25gIGluc3RhbmNlcy4gKi9cbiAgX2dldEljb25Db250ZXh0KCk6IE1hdFN0ZXBwZXJJY29uQ29udGV4dCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGluZGV4OiB0aGlzLmluZGV4LFxuICAgICAgYWN0aXZlOiB0aGlzLmFjdGl2ZSxcbiAgICAgIG9wdGlvbmFsOiB0aGlzLm9wdGlvbmFsLFxuICAgIH07XG4gIH1cblxuICBfZ2V0RGVmYXVsdFRleHRGb3JTdGF0ZShzdGF0ZTogU3RlcFN0YXRlKTogc3RyaW5nIHtcbiAgICBpZiAoc3RhdGUgPT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiBgJHt0aGlzLmluZGV4ICsgMX1gO1xuICAgIH1cbiAgICBpZiAoc3RhdGUgPT0gJ2VkaXQnKSB7XG4gICAgICByZXR1cm4gJ2NyZWF0ZSc7XG4gICAgfVxuICAgIGlmIChzdGF0ZSA9PSAnZXJyb3InKSB7XG4gICAgICByZXR1cm4gJ3dhcm5pbmcnO1xuICAgIH1cbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJtYXQtc3RlcC1oZWFkZXItcmlwcGxlIG1hdC1mb2N1cy1pbmRpY2F0b3JcIiBtYXRSaXBwbGVcbiAgICAgW21hdFJpcHBsZVRyaWdnZXJdPVwiX2dldEhvc3RFbGVtZW50KClcIlxuICAgICBbbWF0UmlwcGxlRGlzYWJsZWRdPVwiZGlzYWJsZVJpcHBsZVwiPjwvZGl2PlxuXG48ZGl2IGNsYXNzPVwibWF0LXN0ZXAtaWNvbi1zdGF0ZS17e3N0YXRlfX0gbWF0LXN0ZXAtaWNvblwiIFtjbGFzcy5tYXQtc3RlcC1pY29uLXNlbGVjdGVkXT1cInNlbGVjdGVkXCI+XG4gIDxkaXYgY2xhc3M9XCJtYXQtc3RlcC1pY29uLWNvbnRlbnRcIiBbbmdTd2l0Y2hdPVwiISEoaWNvbk92ZXJyaWRlcyAmJiBpY29uT3ZlcnJpZGVzW3N0YXRlXSlcIj5cbiAgICA8bmctY29udGFpbmVyXG4gICAgICAqbmdTd2l0Y2hDYXNlPVwidHJ1ZVwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJpY29uT3ZlcnJpZGVzW3N0YXRlXVwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwiX2dldEljb25Db250ZXh0KClcIj48L25nLWNvbnRhaW5lcj5cbiAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaERlZmF1bHQgW25nU3dpdGNoXT1cInN0YXRlXCI+XG4gICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIiAqbmdTd2l0Y2hDYXNlPVwiJ251bWJlcidcIj57e19nZXREZWZhdWx0VGV4dEZvclN0YXRlKHN0YXRlKX19PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJjZGstdmlzdWFsbHktaGlkZGVuXCIgKm5nSWY9XCJzdGF0ZSA9PT0gJ2RvbmUnXCI+e3tfaW50bC5jb21wbGV0ZWRMYWJlbH19PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJjZGstdmlzdWFsbHktaGlkZGVuXCIgKm5nSWY9XCJzdGF0ZSA9PT0gJ2VkaXQnXCI+e3tfaW50bC5lZGl0YWJsZUxhYmVsfX08L3NwYW4+XG4gICAgICA8bWF0LWljb24gYXJpYS1oaWRkZW49XCJ0cnVlXCIgKm5nU3dpdGNoRGVmYXVsdD57e19nZXREZWZhdWx0VGV4dEZvclN0YXRlKHN0YXRlKX19PC9tYXQtaWNvbj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC9kaXY+XG48L2Rpdj5cbjxkaXYgY2xhc3M9XCJtYXQtc3RlcC1sYWJlbFwiXG4gICAgIFtjbGFzcy5tYXQtc3RlcC1sYWJlbC1hY3RpdmVdPVwiYWN0aXZlXCJcbiAgICAgW2NsYXNzLm1hdC1zdGVwLWxhYmVsLXNlbGVjdGVkXT1cInNlbGVjdGVkXCJcbiAgICAgW2NsYXNzLm1hdC1zdGVwLWxhYmVsLWVycm9yXT1cInN0YXRlID09ICdlcnJvcidcIj5cbiAgPCEtLSBJZiB0aGVyZSBpcyBhIGxhYmVsIHRlbXBsYXRlLCB1c2UgaXQuIC0tPlxuICA8ZGl2IGNsYXNzPVwibWF0LXN0ZXAtdGV4dC1sYWJlbFwiICpuZ0lmPVwiX3RlbXBsYXRlTGFiZWwoKVwiPlxuICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwiX3RlbXBsYXRlTGFiZWwoKSEudGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgPC9kaXY+XG4gIDwhLS0gSWYgdGhlcmUgaXMgbm8gbGFiZWwgdGVtcGxhdGUsIGZhbGwgYmFjayB0byB0aGUgdGV4dCBsYWJlbC4gLS0+XG4gIDxkaXYgY2xhc3M9XCJtYXQtc3RlcC10ZXh0LWxhYmVsXCIgKm5nSWY9XCJfc3RyaW5nTGFiZWwoKVwiPnt7bGFiZWx9fTwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJtYXQtc3RlcC1vcHRpb25hbFwiICpuZ0lmPVwib3B0aW9uYWwgJiYgc3RhdGUgIT0gJ2Vycm9yJ1wiPnt7X2ludGwub3B0aW9uYWxMYWJlbH19PC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJtYXQtc3RlcC1zdWItbGFiZWwtZXJyb3JcIiAqbmdJZj1cInN0YXRlID09ICdlcnJvcidcIj57e2Vycm9yTWVzc2FnZX19PC9kaXY+XG48L2Rpdj5cblxuIl19