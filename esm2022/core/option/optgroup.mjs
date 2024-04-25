/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, Inject, Optional, InjectionToken, booleanAttribute, } from '@angular/core';
import { MAT_OPTION_PARENT_COMPONENT } from './option-parent';
import * as i0 from "@angular/core";
// Notes on the accessibility pattern used for `mat-optgroup`.
// The option group has two different "modes": regular and inert. The regular mode uses the
// recommended a11y pattern which has `role="group"` on the group element with `aria-labelledby`
// pointing to the label. This works for `mat-select`, but it seems to hit a bug for autocomplete
// under VoiceOver where the group doesn't get read out at all. The bug appears to be that if
// there's __any__ a11y-related attribute on the group (e.g. `role` or `aria-labelledby`),
// VoiceOver on Safari won't read it out.
// We've introduced the `inert` mode as a workaround. Under this mode, all a11y attributes are
// removed from the group, and we get the screen reader to read out the group label by mirroring it
// inside an invisible element in the option. This is sub-optimal, because the screen reader will
// repeat the group label on each navigation, whereas the default pattern only reads the group when
// the user enters a new group. The following alternate approaches were considered:
// 1. Reading out the group label using the `LiveAnnouncer` solves the problem, but we can't control
//    when the text will be read out so sometimes it comes in too late or never if the user
//    navigates quickly.
// 2. `<mat-option aria-describedby="groupLabel"` - This works on Safari, but VoiceOver in Chrome
//    won't read out the description at all.
// 3. `<mat-option aria-labelledby="optionLabel groupLabel"` - This works on Chrome, but Safari
//     doesn't read out the text at all. Furthermore, on
// Counter for unique group ids.
let _uniqueOptgroupIdCounter = 0;
/**
 * Injection token that can be used to reference instances of `MatOptgroup`. It serves as
 * alternative token to the actual `MatOptgroup` class which could cause unnecessary
 * retention of the class and its component metadata.
 */
export const MAT_OPTGROUP = new InjectionToken('MatOptgroup');
/**
 * Component that is used to group instances of `mat-option`.
 */
export class MatOptgroup {
    constructor(parent) {
        /** whether the option group is disabled. */
        this.disabled = false;
        /** Unique id for the underlying label. */
        this._labelId = `mat-optgroup-label-${_uniqueOptgroupIdCounter++}`;
        this._inert = parent?.inertGroups ?? false;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0-next.5", ngImport: i0, type: MatOptgroup, deps: [{ token: MAT_OPTION_PARENT_COMPONENT, optional: true }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "16.1.0", version: "18.0.0-next.5", type: MatOptgroup, isStandalone: true, selector: "mat-optgroup", inputs: { label: "label", disabled: ["disabled", "disabled", booleanAttribute] }, host: { properties: { "attr.role": "_inert ? null : \"group\"", "attr.aria-disabled": "_inert ? null : disabled.toString()", "attr.aria-labelledby": "_inert ? null : _labelId" }, classAttribute: "mat-mdc-optgroup" }, providers: [{ provide: MAT_OPTGROUP, useExisting: MatOptgroup }], exportAs: ["matOptgroup"], ngImport: i0, template: "<span\n  class=\"mat-mdc-optgroup-label\"\n  role=\"presentation\"\n  [class.mdc-list-item--disabled]=\"disabled\"\n  [id]=\"_labelId\">\n  <span class=\"mdc-list-item__primary-text\">{{ label }} <ng-content></ng-content></span>\n</span>\n\n<ng-content select=\"mat-option, ng-container\"></ng-content>\n", styles: [".mat-mdc-optgroup{color:var(--mat-optgroup-label-text-color);font-family:var(--mat-optgroup-label-text-font);line-height:var(--mat-optgroup-label-text-line-height);font-size:var(--mat-optgroup-label-text-size);letter-spacing:var(--mat-optgroup-label-text-tracking);font-weight:var(--mat-optgroup-label-text-weight)}.mat-mdc-optgroup-label{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:16px;padding-right:16px;min-height:48px}.mat-mdc-optgroup-label:focus{outline:none}[dir=rtl] .mat-mdc-optgroup-label,.mat-mdc-optgroup-label[dir=rtl]{padding-left:16px;padding-right:16px}.mat-mdc-optgroup-label.mdc-list-item--disabled{opacity:.38}.mat-mdc-optgroup-label .mdc-list-item__primary-text{font-size:inherit;font-weight:inherit;letter-spacing:inherit;line-height:inherit;font-family:inherit;text-decoration:inherit;text-transform:inherit;white-space:normal}"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0-next.5", ngImport: i0, type: MatOptgroup, decorators: [{
            type: Component,
            args: [{ selector: 'mat-optgroup', exportAs: 'matOptgroup', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        'class': 'mat-mdc-optgroup',
                        '[attr.role]': '_inert ? null : "group"',
                        '[attr.aria-disabled]': '_inert ? null : disabled.toString()',
                        '[attr.aria-labelledby]': '_inert ? null : _labelId',
                    }, providers: [{ provide: MAT_OPTGROUP, useExisting: MatOptgroup }], standalone: true, template: "<span\n  class=\"mat-mdc-optgroup-label\"\n  role=\"presentation\"\n  [class.mdc-list-item--disabled]=\"disabled\"\n  [id]=\"_labelId\">\n  <span class=\"mdc-list-item__primary-text\">{{ label }} <ng-content></ng-content></span>\n</span>\n\n<ng-content select=\"mat-option, ng-container\"></ng-content>\n", styles: [".mat-mdc-optgroup{color:var(--mat-optgroup-label-text-color);font-family:var(--mat-optgroup-label-text-font);line-height:var(--mat-optgroup-label-text-line-height);font-size:var(--mat-optgroup-label-text-size);letter-spacing:var(--mat-optgroup-label-text-tracking);font-weight:var(--mat-optgroup-label-text-weight)}.mat-mdc-optgroup-label{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:16px;padding-right:16px;min-height:48px}.mat-mdc-optgroup-label:focus{outline:none}[dir=rtl] .mat-mdc-optgroup-label,.mat-mdc-optgroup-label[dir=rtl]{padding-left:16px;padding-right:16px}.mat-mdc-optgroup-label.mdc-list-item--disabled{opacity:.38}.mat-mdc-optgroup-label .mdc-list-item__primary-text{font-size:inherit;font-weight:inherit;letter-spacing:inherit;line-height:inherit;font-family:inherit;text-decoration:inherit;text-transform:inherit;white-space:normal}"] }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_OPTION_PARENT_COMPONENT]
                }, {
                    type: Optional
                }] }], propDecorators: { label: [{
                type: Input
            }], disabled: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0Z3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvY29yZS9vcHRpb24vb3B0Z3JvdXAudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvY29yZS9vcHRpb24vb3B0Z3JvdXAuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQ0wsU0FBUyxFQUNULGlCQUFpQixFQUNqQix1QkFBdUIsRUFDdkIsS0FBSyxFQUNMLE1BQU0sRUFDTixRQUFRLEVBQ1IsY0FBYyxFQUNkLGdCQUFnQixHQUNqQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQTJCLDJCQUEyQixFQUFDLE1BQU0saUJBQWlCLENBQUM7O0FBRXRGLDhEQUE4RDtBQUM5RCwyRkFBMkY7QUFDM0YsZ0dBQWdHO0FBQ2hHLGlHQUFpRztBQUNqRyw2RkFBNkY7QUFDN0YsMEZBQTBGO0FBQzFGLHlDQUF5QztBQUN6Qyw4RkFBOEY7QUFDOUYsbUdBQW1HO0FBQ25HLGlHQUFpRztBQUNqRyxtR0FBbUc7QUFDbkcsbUZBQW1GO0FBQ25GLG9HQUFvRztBQUNwRywyRkFBMkY7QUFDM0Ysd0JBQXdCO0FBQ3hCLGlHQUFpRztBQUNqRyw0Q0FBNEM7QUFDNUMsK0ZBQStGO0FBQy9GLHdEQUF3RDtBQUV4RCxnQ0FBZ0M7QUFDaEMsSUFBSSx3QkFBd0IsR0FBRyxDQUFDLENBQUM7QUFFakM7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxJQUFJLGNBQWMsQ0FBYyxhQUFhLENBQUMsQ0FBQztBQUUzRTs7R0FFRztBQWlCSCxNQUFNLE9BQU8sV0FBVztJQWF0QixZQUE2RCxNQUFpQztRQVQ5Riw0Q0FBNEM7UUFDTixhQUFRLEdBQVksS0FBSyxDQUFDO1FBRWhFLDBDQUEwQztRQUMxQyxhQUFRLEdBQVcsc0JBQXNCLHdCQUF3QixFQUFFLEVBQUUsQ0FBQztRQU1wRSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sRUFBRSxXQUFXLElBQUksS0FBSyxDQUFDO0lBQzdDLENBQUM7cUhBZlUsV0FBVyxrQkFhRiwyQkFBMkI7eUdBYnBDLFdBQVcsNkdBS0gsZ0JBQWdCLHlPQVJ4QixDQUFDLEVBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFDLENBQUMscURDbEVoRSxrVEFTQTs7a0dENERhLFdBQVc7a0JBaEJ2QixTQUFTOytCQUNFLGNBQWMsWUFDZCxhQUFhLGlCQUVSLGlCQUFpQixDQUFDLElBQUksbUJBQ3BCLHVCQUF1QixDQUFDLE1BQU0sUUFFekM7d0JBQ0osT0FBTyxFQUFFLGtCQUFrQjt3QkFDM0IsYUFBYSxFQUFFLHlCQUF5Qjt3QkFDeEMsc0JBQXNCLEVBQUUscUNBQXFDO3dCQUM3RCx3QkFBd0IsRUFBRSwwQkFBMEI7cUJBQ3JELGFBQ1UsQ0FBQyxFQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxhQUFhLEVBQUMsQ0FBQyxjQUNsRCxJQUFJOzswQkFlSCxNQUFNOzJCQUFDLDJCQUEyQjs7MEJBQUcsUUFBUTt5Q0FYakQsS0FBSztzQkFBYixLQUFLO2dCQUdnQyxRQUFRO3NCQUE3QyxLQUFLO3VCQUFDLEVBQUMsU0FBUyxFQUFFLGdCQUFnQixFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBJbnB1dCxcbiAgSW5qZWN0LFxuICBPcHRpb25hbCxcbiAgSW5qZWN0aW9uVG9rZW4sXG4gIGJvb2xlYW5BdHRyaWJ1dGUsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXRPcHRpb25QYXJlbnRDb21wb25lbnQsIE1BVF9PUFRJT05fUEFSRU5UX0NPTVBPTkVOVH0gZnJvbSAnLi9vcHRpb24tcGFyZW50JztcblxuLy8gTm90ZXMgb24gdGhlIGFjY2Vzc2liaWxpdHkgcGF0dGVybiB1c2VkIGZvciBgbWF0LW9wdGdyb3VwYC5cbi8vIFRoZSBvcHRpb24gZ3JvdXAgaGFzIHR3byBkaWZmZXJlbnQgXCJtb2Rlc1wiOiByZWd1bGFyIGFuZCBpbmVydC4gVGhlIHJlZ3VsYXIgbW9kZSB1c2VzIHRoZVxuLy8gcmVjb21tZW5kZWQgYTExeSBwYXR0ZXJuIHdoaWNoIGhhcyBgcm9sZT1cImdyb3VwXCJgIG9uIHRoZSBncm91cCBlbGVtZW50IHdpdGggYGFyaWEtbGFiZWxsZWRieWBcbi8vIHBvaW50aW5nIHRvIHRoZSBsYWJlbC4gVGhpcyB3b3JrcyBmb3IgYG1hdC1zZWxlY3RgLCBidXQgaXQgc2VlbXMgdG8gaGl0IGEgYnVnIGZvciBhdXRvY29tcGxldGVcbi8vIHVuZGVyIFZvaWNlT3ZlciB3aGVyZSB0aGUgZ3JvdXAgZG9lc24ndCBnZXQgcmVhZCBvdXQgYXQgYWxsLiBUaGUgYnVnIGFwcGVhcnMgdG8gYmUgdGhhdCBpZlxuLy8gdGhlcmUncyBfX2FueV9fIGExMXktcmVsYXRlZCBhdHRyaWJ1dGUgb24gdGhlIGdyb3VwIChlLmcuIGByb2xlYCBvciBgYXJpYS1sYWJlbGxlZGJ5YCksXG4vLyBWb2ljZU92ZXIgb24gU2FmYXJpIHdvbid0IHJlYWQgaXQgb3V0LlxuLy8gV2UndmUgaW50cm9kdWNlZCB0aGUgYGluZXJ0YCBtb2RlIGFzIGEgd29ya2Fyb3VuZC4gVW5kZXIgdGhpcyBtb2RlLCBhbGwgYTExeSBhdHRyaWJ1dGVzIGFyZVxuLy8gcmVtb3ZlZCBmcm9tIHRoZSBncm91cCwgYW5kIHdlIGdldCB0aGUgc2NyZWVuIHJlYWRlciB0byByZWFkIG91dCB0aGUgZ3JvdXAgbGFiZWwgYnkgbWlycm9yaW5nIGl0XG4vLyBpbnNpZGUgYW4gaW52aXNpYmxlIGVsZW1lbnQgaW4gdGhlIG9wdGlvbi4gVGhpcyBpcyBzdWItb3B0aW1hbCwgYmVjYXVzZSB0aGUgc2NyZWVuIHJlYWRlciB3aWxsXG4vLyByZXBlYXQgdGhlIGdyb3VwIGxhYmVsIG9uIGVhY2ggbmF2aWdhdGlvbiwgd2hlcmVhcyB0aGUgZGVmYXVsdCBwYXR0ZXJuIG9ubHkgcmVhZHMgdGhlIGdyb3VwIHdoZW5cbi8vIHRoZSB1c2VyIGVudGVycyBhIG5ldyBncm91cC4gVGhlIGZvbGxvd2luZyBhbHRlcm5hdGUgYXBwcm9hY2hlcyB3ZXJlIGNvbnNpZGVyZWQ6XG4vLyAxLiBSZWFkaW5nIG91dCB0aGUgZ3JvdXAgbGFiZWwgdXNpbmcgdGhlIGBMaXZlQW5ub3VuY2VyYCBzb2x2ZXMgdGhlIHByb2JsZW0sIGJ1dCB3ZSBjYW4ndCBjb250cm9sXG4vLyAgICB3aGVuIHRoZSB0ZXh0IHdpbGwgYmUgcmVhZCBvdXQgc28gc29tZXRpbWVzIGl0IGNvbWVzIGluIHRvbyBsYXRlIG9yIG5ldmVyIGlmIHRoZSB1c2VyXG4vLyAgICBuYXZpZ2F0ZXMgcXVpY2tseS5cbi8vIDIuIGA8bWF0LW9wdGlvbiBhcmlhLWRlc2NyaWJlZGJ5PVwiZ3JvdXBMYWJlbFwiYCAtIFRoaXMgd29ya3Mgb24gU2FmYXJpLCBidXQgVm9pY2VPdmVyIGluIENocm9tZVxuLy8gICAgd29uJ3QgcmVhZCBvdXQgdGhlIGRlc2NyaXB0aW9uIGF0IGFsbC5cbi8vIDMuIGA8bWF0LW9wdGlvbiBhcmlhLWxhYmVsbGVkYnk9XCJvcHRpb25MYWJlbCBncm91cExhYmVsXCJgIC0gVGhpcyB3b3JrcyBvbiBDaHJvbWUsIGJ1dCBTYWZhcmlcbi8vICAgICBkb2Vzbid0IHJlYWQgb3V0IHRoZSB0ZXh0IGF0IGFsbC4gRnVydGhlcm1vcmUsIG9uXG5cbi8vIENvdW50ZXIgZm9yIHVuaXF1ZSBncm91cCBpZHMuXG5sZXQgX3VuaXF1ZU9wdGdyb3VwSWRDb3VudGVyID0gMDtcblxuLyoqXG4gKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBjYW4gYmUgdXNlZCB0byByZWZlcmVuY2UgaW5zdGFuY2VzIG9mIGBNYXRPcHRncm91cGAuIEl0IHNlcnZlcyBhc1xuICogYWx0ZXJuYXRpdmUgdG9rZW4gdG8gdGhlIGFjdHVhbCBgTWF0T3B0Z3JvdXBgIGNsYXNzIHdoaWNoIGNvdWxkIGNhdXNlIHVubmVjZXNzYXJ5XG4gKiByZXRlbnRpb24gb2YgdGhlIGNsYXNzIGFuZCBpdHMgY29tcG9uZW50IG1ldGFkYXRhLlxuICovXG5leHBvcnQgY29uc3QgTUFUX09QVEdST1VQID0gbmV3IEluamVjdGlvblRva2VuPE1hdE9wdGdyb3VwPignTWF0T3B0Z3JvdXAnKTtcblxuLyoqXG4gKiBDb21wb25lbnQgdGhhdCBpcyB1c2VkIHRvIGdyb3VwIGluc3RhbmNlcyBvZiBgbWF0LW9wdGlvbmAuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1vcHRncm91cCcsXG4gIGV4cG9ydEFzOiAnbWF0T3B0Z3JvdXAnLFxuICB0ZW1wbGF0ZVVybDogJ29wdGdyb3VwLmh0bWwnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc3R5bGVVcmw6ICdvcHRncm91cC5jc3MnLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1tZGMtb3B0Z3JvdXAnLFxuICAgICdbYXR0ci5yb2xlXSc6ICdfaW5lcnQgPyBudWxsIDogXCJncm91cFwiJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnX2luZXJ0ID8gbnVsbCA6IGRpc2FibGVkLnRvU3RyaW5nKCknLFxuICAgICdbYXR0ci5hcmlhLWxhYmVsbGVkYnldJzogJ19pbmVydCA/IG51bGwgOiBfbGFiZWxJZCcsXG4gIH0sXG4gIHByb3ZpZGVyczogW3twcm92aWRlOiBNQVRfT1BUR1JPVVAsIHVzZUV4aXN0aW5nOiBNYXRPcHRncm91cH1dLFxuICBzdGFuZGFsb25lOiB0cnVlLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRPcHRncm91cCB7XG4gIC8qKiBMYWJlbCBmb3IgdGhlIG9wdGlvbiBncm91cC4gKi9cbiAgQElucHV0KCkgbGFiZWw6IHN0cmluZztcblxuICAvKiogd2hldGhlciB0aGUgb3B0aW9uIGdyb3VwIGlzIGRpc2FibGVkLiAqL1xuICBASW5wdXQoe3RyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZX0pIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFVuaXF1ZSBpZCBmb3IgdGhlIHVuZGVybHlpbmcgbGFiZWwuICovXG4gIF9sYWJlbElkOiBzdHJpbmcgPSBgbWF0LW9wdGdyb3VwLWxhYmVsLSR7X3VuaXF1ZU9wdGdyb3VwSWRDb3VudGVyKyt9YDtcblxuICAvKiogV2hldGhlciB0aGUgZ3JvdXAgaXMgaW4gaW5lcnQgYTExeSBtb2RlLiAqL1xuICBfaW5lcnQ6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChNQVRfT1BUSU9OX1BBUkVOVF9DT01QT05FTlQpIEBPcHRpb25hbCgpIHBhcmVudD86IE1hdE9wdGlvblBhcmVudENvbXBvbmVudCkge1xuICAgIHRoaXMuX2luZXJ0ID0gcGFyZW50Py5pbmVydEdyb3VwcyA/PyBmYWxzZTtcbiAgfVxufVxuIiwiPHNwYW5cbiAgY2xhc3M9XCJtYXQtbWRjLW9wdGdyb3VwLWxhYmVsXCJcbiAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gIFtjbGFzcy5tZGMtbGlzdC1pdGVtLS1kaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gIFtpZF09XCJfbGFiZWxJZFwiPlxuICA8c3BhbiBjbGFzcz1cIm1kYy1saXN0LWl0ZW1fX3ByaW1hcnktdGV4dFwiPnt7IGxhYmVsIH19IDxuZy1jb250ZW50PjwvbmctY29udGVudD48L3NwYW4+XG48L3NwYW4+XG5cbjxuZy1jb250ZW50IHNlbGVjdD1cIm1hdC1vcHRpb24sIG5nLWNvbnRhaW5lclwiPjwvbmctY29udGVudD5cbiJdfQ==