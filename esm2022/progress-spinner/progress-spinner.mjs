/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectionStrategy, Component, ElementRef, Inject, InjectionToken, Input, Optional, ViewChild, ViewEncapsulation, numberAttribute, ANIMATION_MODULE_TYPE, } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import * as i0 from "@angular/core";
/** Injection token to be used to override the default options for `mat-progress-spinner`. */
export const MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS = new InjectionToken('mat-progress-spinner-default-options', {
    providedIn: 'root',
    factory: MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS_FACTORY,
});
/** @docs-private */
export function MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS_FACTORY() {
    return { diameter: BASE_SIZE };
}
/**
 * Base reference size of the spinner.
 */
const BASE_SIZE = 100;
/**
 * Base reference stroke width of the spinner.
 */
const BASE_STROKE_WIDTH = 10;
export class MatProgressSpinner {
    // TODO: should be typed as `ThemePalette` but internal apps pass in arbitrary strings.
    /**
     * Theme color of the progress spinner. This API is supported in M2 themes only, it
     * has no effect in M3 themes.
     *
     * For information on applying color variants in M3, see
     * https://material.angular.io/guide/theming#using-component-color-variants.
     */
    get color() {
        return this._color || this._defaultColor;
    }
    set color(value) {
        this._color = value;
    }
    constructor(_elementRef, animationMode, defaults) {
        this._elementRef = _elementRef;
        this._defaultColor = 'primary';
        this._value = 0;
        this._diameter = BASE_SIZE;
        this._noopAnimations =
            animationMode === 'NoopAnimations' && !!defaults && !defaults._forceAnimations;
        this.mode =
            _elementRef.nativeElement.nodeName.toLowerCase() === 'mat-spinner'
                ? 'indeterminate'
                : 'determinate';
        if (defaults) {
            if (defaults.color) {
                this.color = this._defaultColor = defaults.color;
            }
            if (defaults.diameter) {
                this.diameter = defaults.diameter;
            }
            if (defaults.strokeWidth) {
                this.strokeWidth = defaults.strokeWidth;
            }
        }
    }
    /** Value of the progress bar. Defaults to zero. Mirrored to aria-valuenow. */
    get value() {
        return this.mode === 'determinate' ? this._value : 0;
    }
    set value(v) {
        this._value = Math.max(0, Math.min(100, v || 0));
    }
    /** The diameter of the progress spinner (will set width and height of svg). */
    get diameter() {
        return this._diameter;
    }
    set diameter(size) {
        this._diameter = size || 0;
    }
    /** Stroke width of the progress spinner. */
    get strokeWidth() {
        return this._strokeWidth ?? this.diameter / 10;
    }
    set strokeWidth(value) {
        this._strokeWidth = value || 0;
    }
    /** The radius of the spinner, adjusted for stroke width. */
    _circleRadius() {
        return (this.diameter - BASE_STROKE_WIDTH) / 2;
    }
    /** The view box of the spinner's svg element. */
    _viewBox() {
        const viewBox = this._circleRadius() * 2 + this.strokeWidth;
        return `0 0 ${viewBox} ${viewBox}`;
    }
    /** The stroke circumference of the svg circle. */
    _strokeCircumference() {
        return 2 * Math.PI * this._circleRadius();
    }
    /** The dash offset of the svg circle. */
    _strokeDashOffset() {
        if (this.mode === 'determinate') {
            return (this._strokeCircumference() * (100 - this._value)) / 100;
        }
        return null;
    }
    /** Stroke width of the circle in percent. */
    _circleStrokeWidth() {
        return (this.strokeWidth / this.diameter) * 100;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.0-next.2", ngImport: i0, type: MatProgressSpinner, deps: [{ token: i0.ElementRef }, { token: ANIMATION_MODULE_TYPE, optional: true }, { token: MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "18.2.0-next.2", type: MatProgressSpinner, isStandalone: true, selector: "mat-progress-spinner, mat-spinner", inputs: { color: "color", mode: "mode", value: ["value", "value", numberAttribute], diameter: ["diameter", "diameter", numberAttribute], strokeWidth: ["strokeWidth", "strokeWidth", numberAttribute] }, host: { attributes: { "role": "progressbar", "tabindex": "-1" }, properties: { "class": "\"mat-\" + color", "class._mat-animation-noopable": "_noopAnimations", "class.mdc-circular-progress--indeterminate": "mode === \"indeterminate\"", "style.width.px": "diameter", "style.height.px": "diameter", "style.--mdc-circular-progress-size": "diameter + \"px\"", "style.--mdc-circular-progress-active-indicator-width": "diameter + \"px\"", "attr.aria-valuemin": "0", "attr.aria-valuemax": "100", "attr.aria-valuenow": "mode === \"determinate\" ? value : null", "attr.mode": "mode" }, classAttribute: "mat-mdc-progress-spinner mdc-circular-progress" }, viewQueries: [{ propertyName: "_determinateCircle", first: true, predicate: ["determinateSpinner"], descendants: true }], exportAs: ["matProgressSpinner"], ngImport: i0, template: "<ng-template #circle>\n  <svg [attr.viewBox]=\"_viewBox()\" class=\"mdc-circular-progress__indeterminate-circle-graphic\"\n       xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\">\n    <circle [attr.r]=\"_circleRadius()\"\n            [style.stroke-dasharray.px]=\"_strokeCircumference()\"\n            [style.stroke-dashoffset.px]=\"_strokeCircumference() / 2\"\n            [style.stroke-width.%]=\"_circleStrokeWidth()\"\n            cx=\"50%\" cy=\"50%\"/>\n  </svg>\n</ng-template>\n\n<!--\n  All children need to be hidden for screen readers in order to support ChromeVox.\n  More context in the issue: https://github.com/angular/components/issues/22165.\n-->\n<div class=\"mdc-circular-progress__determinate-container\" aria-hidden=\"true\" #determinateSpinner>\n  <svg [attr.viewBox]=\"_viewBox()\" class=\"mdc-circular-progress__determinate-circle-graphic\"\n       xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\">\n    <circle [attr.r]=\"_circleRadius()\"\n            [style.stroke-dasharray.px]=\"_strokeCircumference()\"\n            [style.stroke-dashoffset.px]=\"_strokeDashOffset()\"\n            [style.stroke-width.%]=\"_circleStrokeWidth()\"\n            class=\"mdc-circular-progress__determinate-circle\"\n            cx=\"50%\" cy=\"50%\"/>\n  </svg>\n</div>\n<!--TODO: figure out why there are 3 separate svgs-->\n<div class=\"mdc-circular-progress__indeterminate-container\" aria-hidden=\"true\">\n  <div class=\"mdc-circular-progress__spinner-layer\">\n    <div class=\"mdc-circular-progress__circle-clipper mdc-circular-progress__circle-left\">\n      <ng-container [ngTemplateOutlet]=\"circle\"></ng-container>\n    </div>\n    <div class=\"mdc-circular-progress__gap-patch\">\n      <ng-container [ngTemplateOutlet]=\"circle\"></ng-container>\n    </div>\n    <div class=\"mdc-circular-progress__circle-clipper mdc-circular-progress__circle-right\">\n      <ng-container [ngTemplateOutlet]=\"circle\"></ng-container>\n    </div>\n  </div>\n</div>\n", styles: [".mat-mdc-progress-spinner{display:block;overflow:hidden;line-height:0;position:relative;direction:ltr;transition:opacity 250ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-progress-spinner circle{stroke-width:var(--mdc-circular-progress-active-indicator-width)}.mat-mdc-progress-spinner._mat-animation-noopable,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__determinate-circle{transition:none !important}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-circle-graphic,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__spinner-layer,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container{animation:none !important}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container circle{stroke-dasharray:0 !important}.cdk-high-contrast-active .mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic,.cdk-high-contrast-active .mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle{stroke:currentColor;stroke:CanvasText}.mdc-circular-progress__determinate-container,.mdc-circular-progress__indeterminate-circle-graphic,.mdc-circular-progress__indeterminate-container,.mdc-circular-progress__spinner-layer{position:absolute;width:100%;height:100%}.mdc-circular-progress__determinate-container{transform:rotate(-90deg)}.mdc-circular-progress--indeterminate .mdc-circular-progress__determinate-container{opacity:0}.mdc-circular-progress__indeterminate-container{font-size:0;letter-spacing:0;white-space:nowrap;opacity:0}.mdc-circular-progress--indeterminate .mdc-circular-progress__indeterminate-container{opacity:1;animation:mdc-circular-progress-container-rotate 1568.2352941176ms linear infinite}.mdc-circular-progress__determinate-circle-graphic,.mdc-circular-progress__indeterminate-circle-graphic{fill:rgba(0,0,0,0)}.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic{stroke:var(--mdc-circular-progress-active-indicator-color, var(--mat-app-primary))}.cdk-high-contrast-active .mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,.cdk-high-contrast-active .mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic{stroke:CanvasText}.mdc-circular-progress__determinate-circle{transition:stroke-dashoffset 500ms cubic-bezier(0, 0, 0.2, 1)}.mdc-circular-progress__gap-patch{position:absolute;top:0;left:47.5%;box-sizing:border-box;width:5%;height:100%;overflow:hidden}.mdc-circular-progress__gap-patch .mdc-circular-progress__indeterminate-circle-graphic{left:-900%;width:2000%;transform:rotate(180deg)}.mdc-circular-progress__circle-clipper .mdc-circular-progress__indeterminate-circle-graphic{width:200%}.mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{left:-100%}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-left .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress__circle-clipper{display:inline-flex;position:relative;width:50%;height:100%;overflow:hidden}.mdc-circular-progress--indeterminate .mdc-circular-progress__spinner-layer{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}@keyframes mdc-circular-progress-container-rotate{to{transform:rotate(360deg)}}@keyframes mdc-circular-progress-spinner-layer-rotate{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}}@keyframes mdc-circular-progress-left-spin{from{transform:rotate(265deg)}50%{transform:rotate(130deg)}to{transform:rotate(265deg)}}@keyframes mdc-circular-progress-right-spin{from{transform:rotate(-265deg)}50%{transform:rotate(-130deg)}to{transform:rotate(-265deg)}}"], dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.0-next.2", ngImport: i0, type: MatProgressSpinner, decorators: [{
            type: Component,
            args: [{ selector: 'mat-progress-spinner, mat-spinner', exportAs: 'matProgressSpinner', host: {
                        'role': 'progressbar',
                        'class': 'mat-mdc-progress-spinner mdc-circular-progress',
                        // set tab index to -1 so screen readers will read the aria-label
                        // Note: there is a known issue with JAWS that does not read progressbar aria labels on FireFox
                        'tabindex': '-1',
                        '[class]': '"mat-" + color',
                        '[class._mat-animation-noopable]': `_noopAnimations`,
                        '[class.mdc-circular-progress--indeterminate]': 'mode === "indeterminate"',
                        '[style.width.px]': 'diameter',
                        '[style.height.px]': 'diameter',
                        '[style.--mdc-circular-progress-size]': 'diameter + "px"',
                        '[style.--mdc-circular-progress-active-indicator-width]': 'diameter + "px"',
                        '[attr.aria-valuemin]': '0',
                        '[attr.aria-valuemax]': '100',
                        '[attr.aria-valuenow]': 'mode === "determinate" ? value : null',
                        '[attr.mode]': 'mode',
                    }, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, standalone: true, imports: [NgTemplateOutlet], template: "<ng-template #circle>\n  <svg [attr.viewBox]=\"_viewBox()\" class=\"mdc-circular-progress__indeterminate-circle-graphic\"\n       xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\">\n    <circle [attr.r]=\"_circleRadius()\"\n            [style.stroke-dasharray.px]=\"_strokeCircumference()\"\n            [style.stroke-dashoffset.px]=\"_strokeCircumference() / 2\"\n            [style.stroke-width.%]=\"_circleStrokeWidth()\"\n            cx=\"50%\" cy=\"50%\"/>\n  </svg>\n</ng-template>\n\n<!--\n  All children need to be hidden for screen readers in order to support ChromeVox.\n  More context in the issue: https://github.com/angular/components/issues/22165.\n-->\n<div class=\"mdc-circular-progress__determinate-container\" aria-hidden=\"true\" #determinateSpinner>\n  <svg [attr.viewBox]=\"_viewBox()\" class=\"mdc-circular-progress__determinate-circle-graphic\"\n       xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\">\n    <circle [attr.r]=\"_circleRadius()\"\n            [style.stroke-dasharray.px]=\"_strokeCircumference()\"\n            [style.stroke-dashoffset.px]=\"_strokeDashOffset()\"\n            [style.stroke-width.%]=\"_circleStrokeWidth()\"\n            class=\"mdc-circular-progress__determinate-circle\"\n            cx=\"50%\" cy=\"50%\"/>\n  </svg>\n</div>\n<!--TODO: figure out why there are 3 separate svgs-->\n<div class=\"mdc-circular-progress__indeterminate-container\" aria-hidden=\"true\">\n  <div class=\"mdc-circular-progress__spinner-layer\">\n    <div class=\"mdc-circular-progress__circle-clipper mdc-circular-progress__circle-left\">\n      <ng-container [ngTemplateOutlet]=\"circle\"></ng-container>\n    </div>\n    <div class=\"mdc-circular-progress__gap-patch\">\n      <ng-container [ngTemplateOutlet]=\"circle\"></ng-container>\n    </div>\n    <div class=\"mdc-circular-progress__circle-clipper mdc-circular-progress__circle-right\">\n      <ng-container [ngTemplateOutlet]=\"circle\"></ng-container>\n    </div>\n  </div>\n</div>\n", styles: [".mat-mdc-progress-spinner{display:block;overflow:hidden;line-height:0;position:relative;direction:ltr;transition:opacity 250ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-progress-spinner circle{stroke-width:var(--mdc-circular-progress-active-indicator-width)}.mat-mdc-progress-spinner._mat-animation-noopable,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__determinate-circle{transition:none !important}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-circle-graphic,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__spinner-layer,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container{animation:none !important}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container circle{stroke-dasharray:0 !important}.cdk-high-contrast-active .mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic,.cdk-high-contrast-active .mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle{stroke:currentColor;stroke:CanvasText}.mdc-circular-progress__determinate-container,.mdc-circular-progress__indeterminate-circle-graphic,.mdc-circular-progress__indeterminate-container,.mdc-circular-progress__spinner-layer{position:absolute;width:100%;height:100%}.mdc-circular-progress__determinate-container{transform:rotate(-90deg)}.mdc-circular-progress--indeterminate .mdc-circular-progress__determinate-container{opacity:0}.mdc-circular-progress__indeterminate-container{font-size:0;letter-spacing:0;white-space:nowrap;opacity:0}.mdc-circular-progress--indeterminate .mdc-circular-progress__indeterminate-container{opacity:1;animation:mdc-circular-progress-container-rotate 1568.2352941176ms linear infinite}.mdc-circular-progress__determinate-circle-graphic,.mdc-circular-progress__indeterminate-circle-graphic{fill:rgba(0,0,0,0)}.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic{stroke:var(--mdc-circular-progress-active-indicator-color, var(--mat-app-primary))}.cdk-high-contrast-active .mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,.cdk-high-contrast-active .mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic{stroke:CanvasText}.mdc-circular-progress__determinate-circle{transition:stroke-dashoffset 500ms cubic-bezier(0, 0, 0.2, 1)}.mdc-circular-progress__gap-patch{position:absolute;top:0;left:47.5%;box-sizing:border-box;width:5%;height:100%;overflow:hidden}.mdc-circular-progress__gap-patch .mdc-circular-progress__indeterminate-circle-graphic{left:-900%;width:2000%;transform:rotate(180deg)}.mdc-circular-progress__circle-clipper .mdc-circular-progress__indeterminate-circle-graphic{width:200%}.mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{left:-100%}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-left .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress__circle-clipper{display:inline-flex;position:relative;width:50%;height:100%;overflow:hidden}.mdc-circular-progress--indeterminate .mdc-circular-progress__spinner-layer{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}@keyframes mdc-circular-progress-container-rotate{to{transform:rotate(360deg)}}@keyframes mdc-circular-progress-spinner-layer-rotate{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}}@keyframes mdc-circular-progress-left-spin{from{transform:rotate(265deg)}50%{transform:rotate(130deg)}to{transform:rotate(265deg)}}@keyframes mdc-circular-progress-right-spin{from{transform:rotate(-265deg)}50%{transform:rotate(-130deg)}to{transform:rotate(-265deg)}}"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [ANIMATION_MODULE_TYPE]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS]
                }] }], propDecorators: { color: [{
                type: Input
            }], _determinateCircle: [{
                type: ViewChild,
                args: ['determinateSpinner']
            }], mode: [{
                type: Input
            }], value: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], diameter: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }], strokeWidth: [{
                type: Input,
                args: [{ transform: numberAttribute }]
            }] } });
/**
 * @deprecated Import Progress Spinner instead. Note that the
 *    `mat-spinner` selector isn't deprecated.
 * @breaking-change 16.0.0
 */
// tslint:disable-next-line:variable-name
export const MatSpinner = MatProgressSpinner;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3Mtc3Bpbm5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9wcm9ncmVzcy1zcGlubmVyL3Byb2dyZXNzLXNwaW5uZXIudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvcHJvZ3Jlc3Mtc3Bpbm5lci9wcm9ncmVzcy1zcGlubmVyLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLE1BQU0sRUFDTixjQUFjLEVBQ2QsS0FBSyxFQUNMLFFBQVEsRUFDUixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZixxQkFBcUIsR0FDdEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0saUJBQWlCLENBQUM7O0FBMEJqRCw2RkFBNkY7QUFDN0YsTUFBTSxDQUFDLE1BQU0sb0NBQW9DLEdBQy9DLElBQUksY0FBYyxDQUFtQyxzQ0FBc0MsRUFBRTtJQUMzRixVQUFVLEVBQUUsTUFBTTtJQUNsQixPQUFPLEVBQUUsNENBQTRDO0NBQ3RELENBQUMsQ0FBQztBQUVMLG9CQUFvQjtBQUNwQixNQUFNLFVBQVUsNENBQTRDO0lBQzFELE9BQU8sRUFBQyxRQUFRLEVBQUUsU0FBUyxFQUFDLENBQUM7QUFDL0IsQ0FBQztBQUVEOztHQUVHO0FBQ0gsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDO0FBRXRCOztHQUVHO0FBQ0gsTUFBTSxpQkFBaUIsR0FBRyxFQUFFLENBQUM7QUE4QjdCLE1BQU0sT0FBTyxrQkFBa0I7SUFJN0IsdUZBQXVGO0lBQ3ZGOzs7Ozs7T0FNRztJQUNILElBQ0ksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzNDLENBQUM7SUFDRCxJQUFJLEtBQUssQ0FB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QUFJLE1BQU07MkJBQUMscUJBQXFCOzswQkFDeEMsTUFBTTsyQkFBQyxvQ0FBb0M7eUNBZjFDLEtBQUs7c0JBRFIsS0FBSztnQkFXMkIsa0JBQWtCO3NCQUFsRCxTQUFTO3VCQUFDLG9CQUFvQjtnQkFxQ3RCLElBQUk7c0JBQVosS0FBSztnQkFJRixLQUFLO3NCQURSLEtBQUs7dUJBQUMsRUFBQyxTQUFTLEVBQUUsZUFBZSxFQUFDO2dCQVcvQixRQUFRO3NCQURYLEtBQUs7dUJBQUMsRUFBQyxTQUFTLEVBQUUsZUFBZSxFQUFDO2dCQVcvQixXQUFXO3NCQURkLEtBQUs7dUJBQUMsRUFBQyxTQUFTLEVBQUUsZUFBZSxFQUFDOztBQXVDckM7Ozs7R0FJRztBQUNILHlDQUF5QztBQUN6QyxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsa0JBQWtCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0LFxuICBJbmplY3Rpb25Ub2tlbixcbiAgSW5wdXQsXG4gIE9wdGlvbmFsLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBudW1iZXJBdHRyaWJ1dGUsXG4gIEFOSU1BVElPTl9NT0RVTEVfVFlQRSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1RoZW1lUGFsZXR0ZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge05nVGVtcGxhdGVPdXRsZXR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbi8qKiBQb3NzaWJsZSBtb2RlIGZvciBhIHByb2dyZXNzIHNwaW5uZXIuICovXG5leHBvcnQgdHlwZSBQcm9ncmVzc1NwaW5uZXJNb2RlID0gJ2RldGVybWluYXRlJyB8ICdpbmRldGVybWluYXRlJztcblxuLyoqIERlZmF1bHQgYG1hdC1wcm9ncmVzcy1zcGlubmVyYCBvcHRpb25zIHRoYXQgY2FuIGJlIG92ZXJyaWRkZW4uICovXG5leHBvcnQgaW50ZXJmYWNlIE1hdFByb2dyZXNzU3Bpbm5lckRlZmF1bHRPcHRpb25zIHtcbiAgLyoqXG4gICAqIERlZmF1bHQgdGhlbWUgY29sb3Igb2YgdGhlIHByb2dyZXNzIHNwaW5uZXIuIFRoaXMgQVBJIGlzIHN1cHBvcnRlZCBpbiBNMiB0aGVtZXMgb25seSwgaXRcbiAgICogaGFzIG5vIGVmZmVjdCBpbiBNMyB0aGVtZXMuXG4gICAqXG4gICAqIEZvciBpbmZvcm1hdGlvbiBvbiBhcHBseWluZyBjb2xvciB2YXJpYW50cyBpbiBNMywgc2VlXG4gICAqIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS90aGVtaW5nI3VzaW5nLWNvbXBvbmVudC1jb2xvci12YXJpYW50cy5cbiAgICovXG4gIGNvbG9yPzogVGhlbWVQYWxldHRlO1xuICAvKiogRGlhbWV0ZXIgb2YgdGhlIHNwaW5uZXIuICovXG4gIGRpYW1ldGVyPzogbnVtYmVyO1xuICAvKiogV2lkdGggb2YgdGhlIHNwaW5uZXIncyBzdHJva2UuICovXG4gIHN0cm9rZVdpZHRoPzogbnVtYmVyO1xuICAvKipcbiAgICogV2hldGhlciB0aGUgYW5pbWF0aW9ucyBzaG91bGQgYmUgZm9yY2UgdG8gYmUgZW5hYmxlZCwgaWdub3JpbmcgaWYgdGhlIGN1cnJlbnQgZW52aXJvbm1lbnQgaXNcbiAgICogdXNpbmcgTm9vcEFuaW1hdGlvbnNNb2R1bGUuXG4gICAqL1xuICBfZm9yY2VBbmltYXRpb25zPzogYm9vbGVhbjtcbn1cblxuLyoqIEluamVjdGlvbiB0b2tlbiB0byBiZSB1c2VkIHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0IG9wdGlvbnMgZm9yIGBtYXQtcHJvZ3Jlc3Mtc3Bpbm5lcmAuICovXG5leHBvcnQgY29uc3QgTUFUX1BST0dSRVNTX1NQSU5ORVJfREVGQVVMVF9PUFRJT05TID1cbiAgbmV3IEluamVjdGlvblRva2VuPE1hdFByb2dyZXNzU3Bpbm5lckRlZmF1bHRPcHRpb25zPignbWF0LXByb2dyZXNzLXNwaW5uZXItZGVmYXVsdC1vcHRpb25zJywge1xuICAgIHByb3ZpZGVkSW46ICdyb290JyxcbiAgICBmYWN0b3J5OiBNQVRfUFJPR1JFU1NfU1BJTk5FUl9ERUZBVUxUX09QVElPTlNfRkFDVE9SWSxcbiAgfSk7XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgZnVuY3Rpb24gTUFUX1BST0dSRVNTX1NQSU5ORVJfREVGQVVMVF9PUFRJT05TX0ZBQ1RPUlkoKTogTWF0UHJvZ3Jlc3NTcGlubmVyRGVmYXVsdE9wdGlvbnMge1xuICByZXR1cm4ge2RpYW1ldGVyOiBCQVNFX1NJWkV9O1xufVxuXG4vKipcbiAqIEJhc2UgcmVmZXJlbmNlIHNpemUgb2YgdGhlIHNwaW5uZXIuXG4gKi9cbmNvbnN0IEJBU0VfU0laRSA9IDEwMDtcblxuLyoqXG4gKiBCYXNlIHJlZmVyZW5jZSBzdHJva2Ugd2lkdGggb2YgdGhlIHNwaW5uZXIuXG4gKi9cbmNvbnN0IEJBU0VfU1RST0tFX1dJRFRIID0gMTA7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1wcm9ncmVzcy1zcGlubmVyLCBtYXQtc3Bpbm5lcicsXG4gIGV4cG9ydEFzOiAnbWF0UHJvZ3Jlc3NTcGlubmVyJyxcbiAgaG9zdDoge1xuICAgICdyb2xlJzogJ3Byb2dyZXNzYmFyJyxcbiAgICAnY2xhc3MnOiAnbWF0LW1kYy1wcm9ncmVzcy1zcGlubmVyIG1kYy1jaXJjdWxhci1wcm9ncmVzcycsXG4gICAgLy8gc2V0IHRhYiBpbmRleCB0byAtMSBzbyBzY3JlZW4gcmVhZGVycyB3aWxsIHJlYWQgdGhlIGFyaWEtbGFiZWxcbiAgICAvLyBOb3RlOiB0aGVyZSBpcyBhIGtub3duIGlzc3VlIHdpdGggSkFXUyB0aGF0IGRvZXMgbm90IHJlYWQgcHJvZ3Jlc3NiYXIgYXJpYSBsYWJlbHMgb24gRmlyZUZveFxuICAgICd0YWJpbmRleCc6ICctMScsXG4gICAgJ1tjbGFzc10nOiAnXCJtYXQtXCIgKyBjb2xvcicsXG4gICAgJ1tjbGFzcy5fbWF0LWFuaW1hdGlvbi1ub29wYWJsZV0nOiBgX25vb3BBbmltYXRpb25zYCxcbiAgICAnW2NsYXNzLm1kYy1jaXJjdWxhci1wcm9ncmVzcy0taW5kZXRlcm1pbmF0ZV0nOiAnbW9kZSA9PT0gXCJpbmRldGVybWluYXRlXCInLFxuICAgICdbc3R5bGUud2lkdGgucHhdJzogJ2RpYW1ldGVyJyxcbiAgICAnW3N0eWxlLmhlaWdodC5weF0nOiAnZGlhbWV0ZXInLFxuICAgICdbc3R5bGUuLS1tZGMtY2lyY3VsYXItcHJvZ3Jlc3Mtc2l6ZV0nOiAnZGlhbWV0ZXIgKyBcInB4XCInLFxuICAgICdbc3R5bGUuLS1tZGMtY2lyY3VsYXItcHJvZ3Jlc3MtYWN0aXZlLWluZGljYXRvci13aWR0aF0nOiAnZGlhbWV0ZXIgKyBcInB4XCInLFxuICAgICdbYXR0ci5hcmlhLXZhbHVlbWluXSc6ICcwJyxcbiAgICAnW2F0dHIuYXJpYS12YWx1ZW1heF0nOiAnMTAwJyxcbiAgICAnW2F0dHIuYXJpYS12YWx1ZW5vd10nOiAnbW9kZSA9PT0gXCJkZXRlcm1pbmF0ZVwiID8gdmFsdWUgOiBudWxsJyxcbiAgICAnW2F0dHIubW9kZV0nOiAnbW9kZScsXG4gIH0sXG4gIHRlbXBsYXRlVXJsOiAncHJvZ3Jlc3Mtc3Bpbm5lci5odG1sJyxcbiAgc3R5bGVVcmw6ICdwcm9ncmVzcy1zcGlubmVyLmNzcycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbTmdUZW1wbGF0ZU91dGxldF0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFByb2dyZXNzU3Bpbm5lciB7XG4gIC8qKiBXaGV0aGVyIHRoZSBfbWF0LWFuaW1hdGlvbi1ub29wYWJsZSBjbGFzcyBzaG91bGQgYmUgYXBwbGllZCwgZGlzYWJsaW5nIGFuaW1hdGlvbnMuICAqL1xuICBfbm9vcEFuaW1hdGlvbnM6IGJvb2xlYW47XG5cbiAgLy8gVE9ETzogc2hvdWxkIGJlIHR5cGVkIGFzIGBUaGVtZVBhbGV0dGVgIGJ1dCBpbnRlcm5hbCBhcHBzIHBhc3MgaW4gYXJiaXRyYXJ5IHN0cmluZ3MuXG4gIC8qKlxuICAgKiBUaGVtZSBjb2xvciBvZiB0aGUgcHJvZ3Jlc3Mgc3Bpbm5lci4gVGhpcyBBUEkgaXMgc3VwcG9ydGVkIGluIE0yIHRoZW1lcyBvbmx5LCBpdFxuICAgKiBoYXMgbm8gZWZmZWN0IGluIE0zIHRoZW1lcy5cbiAgICpcbiAgICogRm9yIGluZm9ybWF0aW9uIG9uIGFwcGx5aW5nIGNvbG9yIHZhcmlhbnRzIGluIE0zLCBzZWVcbiAgICogaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyLmlvL2d1aWRlL3RoZW1pbmcjdXNpbmctY29tcG9uZW50LWNvbG9yLXZhcmlhbnRzLlxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IGNvbG9yKCkge1xuICAgIHJldHVybiB0aGlzLl9jb2xvciB8fCB0aGlzLl9kZWZhdWx0Q29sb3I7XG4gIH1cbiAgc2V0IGNvbG9yKHZhbHVlOiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5fY29sb3IgPSB2YWx1ZTtcbiAgfVxuICBwcml2YXRlIF9jb2xvcjogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBfZGVmYXVsdENvbG9yOiBUaGVtZVBhbGV0dGUgPSAncHJpbWFyeSc7XG5cbiAgLyoqIFRoZSBlbGVtZW50IG9mIHRoZSBkZXRlcm1pbmF0ZSBzcGlubmVyLiAqL1xuICBAVmlld0NoaWxkKCdkZXRlcm1pbmF0ZVNwaW5uZXInKSBfZGV0ZXJtaW5hdGVDaXJjbGU6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHJlYWRvbmx5IF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEFOSU1BVElPTl9NT0RVTEVfVFlQRSkgYW5pbWF0aW9uTW9kZTogc3RyaW5nLFxuICAgIEBJbmplY3QoTUFUX1BST0dSRVNTX1NQSU5ORVJfREVGQVVMVF9PUFRJT05TKVxuICAgIGRlZmF1bHRzPzogTWF0UHJvZ3Jlc3NTcGlubmVyRGVmYXVsdE9wdGlvbnMsXG4gICkge1xuICAgIHRoaXMuX25vb3BBbmltYXRpb25zID1cbiAgICAgIGFuaW1hdGlvbk1vZGUgPT09ICdOb29wQW5pbWF0aW9ucycgJiYgISFkZWZhdWx0cyAmJiAhZGVmYXVsdHMuX2ZvcmNlQW5pbWF0aW9ucztcbiAgICB0aGlzLm1vZGUgPVxuICAgICAgX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnbWF0LXNwaW5uZXInXG4gICAgICAgID8gJ2luZGV0ZXJtaW5hdGUnXG4gICAgICAgIDogJ2RldGVybWluYXRlJztcblxuICAgIGlmIChkZWZhdWx0cykge1xuICAgICAgaWYgKGRlZmF1bHRzLmNvbG9yKSB7XG4gICAgICAgIHRoaXMuY29sb3IgPSB0aGlzLl9kZWZhdWx0Q29sb3IgPSBkZWZhdWx0cy5jb2xvcjtcbiAgICAgIH1cblxuICAgICAgaWYgKGRlZmF1bHRzLmRpYW1ldGVyKSB7XG4gICAgICAgIHRoaXMuZGlhbWV0ZXIgPSBkZWZhdWx0cy5kaWFtZXRlcjtcbiAgICAgIH1cblxuICAgICAgaWYgKGRlZmF1bHRzLnN0cm9rZVdpZHRoKSB7XG4gICAgICAgIHRoaXMuc3Ryb2tlV2lkdGggPSBkZWZhdWx0cy5zdHJva2VXaWR0aDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTW9kZSBvZiB0aGUgcHJvZ3Jlc3MgYmFyLlxuICAgKlxuICAgKiBJbnB1dCBtdXN0IGJlIG9uZSBvZiB0aGVzZSB2YWx1ZXM6IGRldGVybWluYXRlLCBpbmRldGVybWluYXRlLCBidWZmZXIsIHF1ZXJ5LCBkZWZhdWx0cyB0b1xuICAgKiAnZGV0ZXJtaW5hdGUnLlxuICAgKiBNaXJyb3JlZCB0byBtb2RlIGF0dHJpYnV0ZS5cbiAgICovXG4gIEBJbnB1dCgpIG1vZGU6IFByb2dyZXNzU3Bpbm5lck1vZGU7XG5cbiAgLyoqIFZhbHVlIG9mIHRoZSBwcm9ncmVzcyBiYXIuIERlZmF1bHRzIHRvIHplcm8uIE1pcnJvcmVkIHRvIGFyaWEtdmFsdWVub3cuICovXG4gIEBJbnB1dCh7dHJhbnNmb3JtOiBudW1iZXJBdHRyaWJ1dGV9KVxuICBnZXQgdmFsdWUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlID09PSAnZGV0ZXJtaW5hdGUnID8gdGhpcy5fdmFsdWUgOiAwO1xuICB9XG4gIHNldCB2YWx1ZSh2OiBudW1iZXIpIHtcbiAgICB0aGlzLl92YWx1ZSA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEwMCwgdiB8fCAwKSk7XG4gIH1cbiAgcHJpdmF0ZSBfdmFsdWUgPSAwO1xuXG4gIC8qKiBUaGUgZGlhbWV0ZXIgb2YgdGhlIHByb2dyZXNzIHNwaW5uZXIgKHdpbGwgc2V0IHdpZHRoIGFuZCBoZWlnaHQgb2Ygc3ZnKS4gKi9cbiAgQElucHV0KHt0cmFuc2Zvcm06IG51bWJlckF0dHJpYnV0ZX0pXG4gIGdldCBkaWFtZXRlcigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9kaWFtZXRlcjtcbiAgfVxuICBzZXQgZGlhbWV0ZXIoc2l6ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fZGlhbWV0ZXIgPSBzaXplIHx8IDA7XG4gIH1cbiAgcHJpdmF0ZSBfZGlhbWV0ZXIgPSBCQVNFX1NJWkU7XG5cbiAgLyoqIFN0cm9rZSB3aWR0aCBvZiB0aGUgcHJvZ3Jlc3Mgc3Bpbm5lci4gKi9cbiAgQElucHV0KHt0cmFuc2Zvcm06IG51bWJlckF0dHJpYnV0ZX0pXG4gIGdldCBzdHJva2VXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9zdHJva2VXaWR0aCA/PyB0aGlzLmRpYW1ldGVyIC8gMTA7XG4gIH1cbiAgc2V0IHN0cm9rZVdpZHRoKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9zdHJva2VXaWR0aCA9IHZhbHVlIHx8IDA7XG4gIH1cbiAgcHJpdmF0ZSBfc3Ryb2tlV2lkdGg6IG51bWJlcjtcblxuICAvKiogVGhlIHJhZGl1cyBvZiB0aGUgc3Bpbm5lciwgYWRqdXN0ZWQgZm9yIHN0cm9rZSB3aWR0aC4gKi9cbiAgX2NpcmNsZVJhZGl1cygpOiBudW1iZXIge1xuICAgIHJldHVybiAodGhpcy5kaWFtZXRlciAtIEJBU0VfU1RST0tFX1dJRFRIKSAvIDI7XG4gIH1cblxuICAvKiogVGhlIHZpZXcgYm94IG9mIHRoZSBzcGlubmVyJ3Mgc3ZnIGVsZW1lbnQuICovXG4gIF92aWV3Qm94KCkge1xuICAgIGNvbnN0IHZpZXdCb3ggPSB0aGlzLl9jaXJjbGVSYWRpdXMoKSAqIDIgKyB0aGlzLnN0cm9rZVdpZHRoO1xuICAgIHJldHVybiBgMCAwICR7dmlld0JveH0gJHt2aWV3Qm94fWA7XG4gIH1cblxuICAvKiogVGhlIHN0cm9rZSBjaXJjdW1mZXJlbmNlIG9mIHRoZSBzdmcgY2lyY2xlLiAqL1xuICBfc3Ryb2tlQ2lyY3VtZmVyZW5jZSgpOiBudW1iZXIge1xuICAgIHJldHVybiAyICogTWF0aC5QSSAqIHRoaXMuX2NpcmNsZVJhZGl1cygpO1xuICB9XG5cbiAgLyoqIFRoZSBkYXNoIG9mZnNldCBvZiB0aGUgc3ZnIGNpcmNsZS4gKi9cbiAgX3N0cm9rZURhc2hPZmZzZXQoKSB7XG4gICAgaWYgKHRoaXMubW9kZSA9PT0gJ2RldGVybWluYXRlJykge1xuICAgICAgcmV0dXJuICh0aGlzLl9zdHJva2VDaXJjdW1mZXJlbmNlKCkgKiAoMTAwIC0gdGhpcy5fdmFsdWUpKSAvIDEwMDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKiogU3Ryb2tlIHdpZHRoIG9mIHRoZSBjaXJjbGUgaW4gcGVyY2VudC4gKi9cbiAgX2NpcmNsZVN0cm9rZVdpZHRoKCkge1xuICAgIHJldHVybiAodGhpcy5zdHJva2VXaWR0aCAvIHRoaXMuZGlhbWV0ZXIpICogMTAwO1xuICB9XG59XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgSW1wb3J0IFByb2dyZXNzIFNwaW5uZXIgaW5zdGVhZC4gTm90ZSB0aGF0IHRoZVxuICogICAgYG1hdC1zcGlubmVyYCBzZWxlY3RvciBpc24ndCBkZXByZWNhdGVkLlxuICogQGJyZWFraW5nLWNoYW5nZSAxNi4wLjBcbiAqL1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnZhcmlhYmxlLW5hbWVcbmV4cG9ydCBjb25zdCBNYXRTcGlubmVyID0gTWF0UHJvZ3Jlc3NTcGlubmVyO1xuIiwiPG5nLXRlbXBsYXRlICNjaXJjbGU+XG4gIDxzdmcgW2F0dHIudmlld0JveF09XCJfdmlld0JveCgpXCIgY2xhc3M9XCJtZGMtY2lyY3VsYXItcHJvZ3Jlc3NfX2luZGV0ZXJtaW5hdGUtY2lyY2xlLWdyYXBoaWNcIlxuICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmb2N1c2FibGU9XCJmYWxzZVwiPlxuICAgIDxjaXJjbGUgW2F0dHIucl09XCJfY2lyY2xlUmFkaXVzKClcIlxuICAgICAgICAgICAgW3N0eWxlLnN0cm9rZS1kYXNoYXJyYXkucHhdPVwiX3N0cm9rZUNpcmN1bWZlcmVuY2UoKVwiXG4gICAgICAgICAgICBbc3R5bGUuc3Ryb2tlLWRhc2hvZmZzZXQucHhdPVwiX3N0cm9rZUNpcmN1bWZlcmVuY2UoKSAvIDJcIlxuICAgICAgICAgICAgW3N0eWxlLnN0cm9rZS13aWR0aC4lXT1cIl9jaXJjbGVTdHJva2VXaWR0aCgpXCJcbiAgICAgICAgICAgIGN4PVwiNTAlXCIgY3k9XCI1MCVcIi8+XG4gIDwvc3ZnPlxuPC9uZy10ZW1wbGF0ZT5cblxuPCEtLVxuICBBbGwgY2hpbGRyZW4gbmVlZCB0byBiZSBoaWRkZW4gZm9yIHNjcmVlbiByZWFkZXJzIGluIG9yZGVyIHRvIHN1cHBvcnQgQ2hyb21lVm94LlxuICBNb3JlIGNvbnRleHQgaW4gdGhlIGlzc3VlOiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9jb21wb25lbnRzL2lzc3Vlcy8yMjE2NS5cbi0tPlxuPGRpdiBjbGFzcz1cIm1kYy1jaXJjdWxhci1wcm9ncmVzc19fZGV0ZXJtaW5hdGUtY29udGFpbmVyXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgI2RldGVybWluYXRlU3Bpbm5lcj5cbiAgPHN2ZyBbYXR0ci52aWV3Qm94XT1cIl92aWV3Qm94KClcIiBjbGFzcz1cIm1kYy1jaXJjdWxhci1wcm9ncmVzc19fZGV0ZXJtaW5hdGUtY2lyY2xlLWdyYXBoaWNcIlxuICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmb2N1c2FibGU9XCJmYWxzZVwiPlxuICAgIDxjaXJjbGUgW2F0dHIucl09XCJfY2lyY2xlUmFkaXVzKClcIlxuICAgICAgICAgICAgW3N0eWxlLnN0cm9rZS1kYXNoYXJyYXkucHhdPVwiX3N0cm9rZUNpcmN1bWZlcmVuY2UoKVwiXG4gICAgICAgICAgICBbc3R5bGUuc3Ryb2tlLWRhc2hvZmZzZXQucHhdPVwiX3N0cm9rZURhc2hPZmZzZXQoKVwiXG4gICAgICAgICAgICBbc3R5bGUuc3Ryb2tlLXdpZHRoLiVdPVwiX2NpcmNsZVN0cm9rZVdpZHRoKClcIlxuICAgICAgICAgICAgY2xhc3M9XCJtZGMtY2lyY3VsYXItcHJvZ3Jlc3NfX2RldGVybWluYXRlLWNpcmNsZVwiXG4gICAgICAgICAgICBjeD1cIjUwJVwiIGN5PVwiNTAlXCIvPlxuICA8L3N2Zz5cbjwvZGl2PlxuPCEtLVRPRE86IGZpZ3VyZSBvdXQgd2h5IHRoZXJlIGFyZSAzIHNlcGFyYXRlIHN2Z3MtLT5cbjxkaXYgY2xhc3M9XCJtZGMtY2lyY3VsYXItcHJvZ3Jlc3NfX2luZGV0ZXJtaW5hdGUtY29udGFpbmVyXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gIDxkaXYgY2xhc3M9XCJtZGMtY2lyY3VsYXItcHJvZ3Jlc3NfX3NwaW5uZXItbGF5ZXJcIj5cbiAgICA8ZGl2IGNsYXNzPVwibWRjLWNpcmN1bGFyLXByb2dyZXNzX19jaXJjbGUtY2xpcHBlciBtZGMtY2lyY3VsYXItcHJvZ3Jlc3NfX2NpcmNsZS1sZWZ0XCI+XG4gICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNpcmNsZVwiPjwvbmctY29udGFpbmVyPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJtZGMtY2lyY3VsYXItcHJvZ3Jlc3NfX2dhcC1wYXRjaFwiPlxuICAgICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJjaXJjbGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwibWRjLWNpcmN1bGFyLXByb2dyZXNzX19jaXJjbGUtY2xpcHBlciBtZGMtY2lyY3VsYXItcHJvZ3Jlc3NfX2NpcmNsZS1yaWdodFwiPlxuICAgICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJjaXJjbGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==