/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { FocusMonitor } from '@angular/cdk/a11y';
import { ENTER, hasModifierKey, SPACE } from '@angular/cdk/keycodes';
import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, Host, Inject, Input, Optional, ViewEncapsulation, } from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { mixinTabIndex } from '@angular/material/core';
import { EMPTY, merge, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { matExpansionAnimations } from './expansion-animations';
import { MatExpansionPanel, MAT_EXPANSION_PANEL_DEFAULT_OPTIONS, } from './expansion-panel';
import * as i0 from "@angular/core";
import * as i1 from "./expansion-panel";
import * as i2 from "@angular/cdk/a11y";
import * as i3 from "@angular/common";
// Boilerplate for applying mixins to MatExpansionPanelHeader.
/** @docs-private */
class MatExpansionPanelHeaderBase {
}
const _MatExpansionPanelHeaderMixinBase = mixinTabIndex(MatExpansionPanelHeaderBase);
/**
 * Header element of a `<mat-expansion-panel>`.
 */
class MatExpansionPanelHeader extends _MatExpansionPanelHeaderMixinBase {
    constructor(panel, _element, _focusMonitor, _changeDetectorRef, defaultOptions, _animationMode, tabIndex) {
        super();
        this.panel = panel;
        this._element = _element;
        this._focusMonitor = _focusMonitor;
        this._changeDetectorRef = _changeDetectorRef;
        this._animationMode = _animationMode;
        this._parentChangeSubscription = Subscription.EMPTY;
        const accordionHideToggleChange = panel.accordion
            ? panel.accordion._stateChanges.pipe(filter(changes => !!(changes['hideToggle'] || changes['togglePosition'])))
            : EMPTY;
        this.tabIndex = parseInt(tabIndex || '') || 0;
        // Since the toggle state depends on an @Input on the panel, we
        // need to subscribe and trigger change detection manually.
        this._parentChangeSubscription = merge(panel.opened, panel.closed, accordionHideToggleChange, panel._inputChanges.pipe(filter(changes => {
            return !!(changes['hideToggle'] || changes['disabled'] || changes['togglePosition']);
        }))).subscribe(() => this._changeDetectorRef.markForCheck());
        // Avoids focus being lost if the panel contained the focused element and was closed.
        panel.closed
            .pipe(filter(() => panel._containsFocus()))
            .subscribe(() => _focusMonitor.focusVia(_element, 'program'));
        if (defaultOptions) {
            this.expandedHeight = defaultOptions.expandedHeight;
            this.collapsedHeight = defaultOptions.collapsedHeight;
        }
    }
    /**
     * Whether the associated panel is disabled. Implemented as a part of `FocusableOption`.
     * @docs-private
     */
    get disabled() {
        return this.panel.disabled;
    }
    /** Toggles the expanded state of the panel. */
    _toggle() {
        if (!this.disabled) {
            this.panel.toggle();
        }
    }
    /** Gets whether the panel is expanded. */
    _isExpanded() {
        return this.panel.expanded;
    }
    /** Gets the expanded state string of the panel. */
    _getExpandedState() {
        return this.panel._getExpandedState();
    }
    /** Gets the panel id. */
    _getPanelId() {
        return this.panel.id;
    }
    /** Gets the toggle position for the header. */
    _getTogglePosition() {
        return this.panel.togglePosition;
    }
    /** Gets whether the expand indicator should be shown. */
    _showToggle() {
        return !this.panel.hideToggle && !this.panel.disabled;
    }
    /**
     * Gets the current height of the header. Null if no custom height has been
     * specified, and if the default height from the stylesheet should be used.
     */
    _getHeaderHeight() {
        const isExpanded = this._isExpanded();
        if (isExpanded && this.expandedHeight) {
            return this.expandedHeight;
        }
        else if (!isExpanded && this.collapsedHeight) {
            return this.collapsedHeight;
        }
        return null;
    }
    /** Handle keydown event calling to toggle() if appropriate. */
    _keydown(event) {
        switch (event.keyCode) {
            // Toggle for space and enter keys.
            case SPACE:
            case ENTER:
                if (!hasModifierKey(event)) {
                    event.preventDefault();
                    this._toggle();
                }
                break;
            default:
                if (this.panel.accordion) {
                    this.panel.accordion._handleHeaderKeydown(event);
                }
                return;
        }
    }
    /**
     * Focuses the panel header. Implemented as a part of `FocusableOption`.
     * @param origin Origin of the action that triggered the focus.
     * @docs-private
     */
    focus(origin, options) {
        if (origin) {
            this._focusMonitor.focusVia(this._element, origin, options);
        }
        else {
            this._element.nativeElement.focus(options);
        }
    }
    ngAfterViewInit() {
        this._focusMonitor.monitor(this._element).subscribe(origin => {
            if (origin && this.panel.accordion) {
                this.panel.accordion._handleHeaderFocus(this);
            }
        });
    }
    ngOnDestroy() {
        this._parentChangeSubscription.unsubscribe();
        this._focusMonitor.stopMonitoring(this._element);
    }
}
MatExpansionPanelHeader.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.7", ngImport: i0, type: MatExpansionPanelHeader, deps: [{ token: i1.MatExpansionPanel, host: true }, { token: i0.ElementRef }, { token: i2.FocusMonitor }, { token: i0.ChangeDetectorRef }, { token: MAT_EXPANSION_PANEL_DEFAULT_OPTIONS, optional: true }, { token: ANIMATION_MODULE_TYPE, optional: true }, { token: 'tabindex', attribute: true }], target: i0.ɵɵFactoryTarget.Component });
MatExpansionPanelHeader.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.0-next.7", type: MatExpansionPanelHeader, selector: "mat-expansion-panel-header", inputs: { tabIndex: "tabIndex", expandedHeight: "expandedHeight", collapsedHeight: "collapsedHeight" }, host: { attributes: { "role": "button" }, listeners: { "click": "_toggle()", "keydown": "_keydown($event)" }, properties: { "attr.id": "panel._headerId", "attr.tabindex": "tabIndex", "attr.aria-controls": "_getPanelId()", "attr.aria-expanded": "_isExpanded()", "attr.aria-disabled": "panel.disabled", "class.mat-expanded": "_isExpanded()", "class.mat-expansion-toggle-indicator-after": "_getTogglePosition() === 'after'", "class.mat-expansion-toggle-indicator-before": "_getTogglePosition() === 'before'", "class._mat-animation-noopable": "_animationMode === \"NoopAnimations\"", "style.height": "_getHeaderHeight()" }, classAttribute: "mat-expansion-panel-header mat-focus-indicator" }, usesInheritance: true, ngImport: i0, template: "<span class=\"mat-content\" [class.mat-content-hide-toggle]=\"!_showToggle()\">\n  <ng-content select=\"mat-panel-title\"></ng-content>\n  <ng-content select=\"mat-panel-description\"></ng-content>\n  <ng-content></ng-content>\n</span>\n<span [@indicatorRotate]=\"_getExpandedState()\" *ngIf=\"_showToggle()\"\n      class=\"mat-expansion-indicator\"></span>\n", styles: [".mat-expansion-panel-header{display:flex;flex-direction:row;align-items:center;padding:0 24px;border-radius:inherit;transition:height 225ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-expansion-panel-header._mat-animation-noopable{transition:none}.mat-expansion-panel-header:focus,.mat-expansion-panel-header:hover{outline:none}.mat-expansion-panel-header.mat-expanded:focus,.mat-expansion-panel-header.mat-expanded:hover{background:inherit}.mat-expansion-panel-header:not([aria-disabled=true]){cursor:pointer}.mat-expansion-panel-header.mat-expansion-toggle-indicator-before{flex-direction:row-reverse}.mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator{margin:0 16px 0 0}[dir=rtl] .mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator{margin:0 0 0 16px}.mat-content{display:flex;flex:1;flex-direction:row;overflow:hidden}.mat-content.mat-content-hide-toggle{margin-right:8px}[dir=rtl] .mat-content.mat-content-hide-toggle{margin-right:0;margin-left:8px}.mat-expansion-toggle-indicator-before .mat-content.mat-content-hide-toggle{margin-left:24px;margin-right:0}[dir=rtl] .mat-expansion-toggle-indicator-before .mat-content.mat-content-hide-toggle{margin-right:24px;margin-left:0}.mat-expansion-panel-header-title,.mat-expansion-panel-header-description{display:flex;flex-grow:1;flex-basis:0;margin-right:16px;align-items:center}[dir=rtl] .mat-expansion-panel-header-title,[dir=rtl] .mat-expansion-panel-header-description{margin-right:0;margin-left:16px}.mat-expansion-panel-header-description{flex-grow:2}.mat-expansion-indicator::after{border-style:solid;border-width:0 2px 2px 0;content:\"\";display:inline-block;padding:3px;transform:rotate(45deg);vertical-align:middle}.cdk-high-contrast-active .mat-expansion-panel-content{border-top:1px solid;border-top-left-radius:0;border-top-right-radius:0}"], dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], animations: [matExpansionAnimations.indicatorRotate], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
export { MatExpansionPanelHeader };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.7", ngImport: i0, type: MatExpansionPanelHeader, decorators: [{
            type: Component,
            args: [{ selector: 'mat-expansion-panel-header', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, inputs: ['tabIndex'], animations: [matExpansionAnimations.indicatorRotate], host: {
                        'class': 'mat-expansion-panel-header mat-focus-indicator',
                        'role': 'button',
                        '[attr.id]': 'panel._headerId',
                        '[attr.tabindex]': 'tabIndex',
                        '[attr.aria-controls]': '_getPanelId()',
                        '[attr.aria-expanded]': '_isExpanded()',
                        '[attr.aria-disabled]': 'panel.disabled',
                        '[class.mat-expanded]': '_isExpanded()',
                        '[class.mat-expansion-toggle-indicator-after]': `_getTogglePosition() === 'after'`,
                        '[class.mat-expansion-toggle-indicator-before]': `_getTogglePosition() === 'before'`,
                        '[class._mat-animation-noopable]': '_animationMode === "NoopAnimations"',
                        '[style.height]': '_getHeaderHeight()',
                        '(click)': '_toggle()',
                        '(keydown)': '_keydown($event)',
                    }, template: "<span class=\"mat-content\" [class.mat-content-hide-toggle]=\"!_showToggle()\">\n  <ng-content select=\"mat-panel-title\"></ng-content>\n  <ng-content select=\"mat-panel-description\"></ng-content>\n  <ng-content></ng-content>\n</span>\n<span [@indicatorRotate]=\"_getExpandedState()\" *ngIf=\"_showToggle()\"\n      class=\"mat-expansion-indicator\"></span>\n", styles: [".mat-expansion-panel-header{display:flex;flex-direction:row;align-items:center;padding:0 24px;border-radius:inherit;transition:height 225ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-expansion-panel-header._mat-animation-noopable{transition:none}.mat-expansion-panel-header:focus,.mat-expansion-panel-header:hover{outline:none}.mat-expansion-panel-header.mat-expanded:focus,.mat-expansion-panel-header.mat-expanded:hover{background:inherit}.mat-expansion-panel-header:not([aria-disabled=true]){cursor:pointer}.mat-expansion-panel-header.mat-expansion-toggle-indicator-before{flex-direction:row-reverse}.mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator{margin:0 16px 0 0}[dir=rtl] .mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator{margin:0 0 0 16px}.mat-content{display:flex;flex:1;flex-direction:row;overflow:hidden}.mat-content.mat-content-hide-toggle{margin-right:8px}[dir=rtl] .mat-content.mat-content-hide-toggle{margin-right:0;margin-left:8px}.mat-expansion-toggle-indicator-before .mat-content.mat-content-hide-toggle{margin-left:24px;margin-right:0}[dir=rtl] .mat-expansion-toggle-indicator-before .mat-content.mat-content-hide-toggle{margin-right:24px;margin-left:0}.mat-expansion-panel-header-title,.mat-expansion-panel-header-description{display:flex;flex-grow:1;flex-basis:0;margin-right:16px;align-items:center}[dir=rtl] .mat-expansion-panel-header-title,[dir=rtl] .mat-expansion-panel-header-description{margin-right:0;margin-left:16px}.mat-expansion-panel-header-description{flex-grow:2}.mat-expansion-indicator::after{border-style:solid;border-width:0 2px 2px 0;content:\"\";display:inline-block;padding:3px;transform:rotate(45deg);vertical-align:middle}.cdk-high-contrast-active .mat-expansion-panel-content{border-top:1px solid;border-top-left-radius:0;border-top-right-radius:0}"] }]
        }], ctorParameters: function () { return [{ type: i1.MatExpansionPanel, decorators: [{
                    type: Host
                }] }, { type: i0.ElementRef }, { type: i2.FocusMonitor }, { type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_EXPANSION_PANEL_DEFAULT_OPTIONS]
                }, {
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [ANIMATION_MODULE_TYPE]
                }] }, { type: undefined, decorators: [{
                    type: Attribute,
                    args: ['tabindex']
                }] }]; }, propDecorators: { expandedHeight: [{
                type: Input
            }], collapsedHeight: [{
                type: Input
            }] } });
/**
 * Description element of a `<mat-expansion-panel-header>`.
 */
class MatExpansionPanelDescription {
}
MatExpansionPanelDescription.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.7", ngImport: i0, type: MatExpansionPanelDescription, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatExpansionPanelDescription.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.0-next.7", type: MatExpansionPanelDescription, selector: "mat-panel-description", host: { classAttribute: "mat-expansion-panel-header-description" }, ngImport: i0 });
export { MatExpansionPanelDescription };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.7", ngImport: i0, type: MatExpansionPanelDescription, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mat-panel-description',
                    host: {
                        class: 'mat-expansion-panel-header-description',
                    },
                }]
        }] });
/**
 * Title element of a `<mat-expansion-panel-header>`.
 */
class MatExpansionPanelTitle {
}
MatExpansionPanelTitle.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.7", ngImport: i0, type: MatExpansionPanelTitle, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MatExpansionPanelTitle.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.0-next.7", type: MatExpansionPanelTitle, selector: "mat-panel-title", host: { classAttribute: "mat-expansion-panel-header-title" }, ngImport: i0 });
export { MatExpansionPanelTitle };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.7", ngImport: i0, type: MatExpansionPanelTitle, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mat-panel-title',
                    host: {
                        class: 'mat-expansion-panel-header-title',
                    },
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5zaW9uLXBhbmVsLWhlYWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9leHBhbnNpb24vZXhwYW5zaW9uLXBhbmVsLWhlYWRlci50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9leHBhbnNpb24vZXhwYW5zaW9uLXBhbmVsLWhlYWRlci5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBa0IsWUFBWSxFQUFjLE1BQU0sbUJBQW1CLENBQUM7QUFDN0UsT0FBTyxFQUFDLEtBQUssRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDbkUsT0FBTyxFQUVMLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUNWLElBQUksRUFDSixNQUFNLEVBQ04sS0FBSyxFQUVMLFFBQVEsRUFDUixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDM0UsT0FBTyxFQUFjLGFBQWEsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ2xFLE9BQU8sRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNoRCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEMsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDOUQsT0FBTyxFQUNMLGlCQUFpQixFQUVqQixtQ0FBbUMsR0FDcEMsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7QUFFM0IsOERBQThEO0FBQzlELG9CQUFvQjtBQUNwQixNQUFlLDJCQUEyQjtDQUV6QztBQUNELE1BQU0saUNBQWlDLEdBQUcsYUFBYSxDQUFDLDJCQUEyQixD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QUFlO3dCQUN2QyxzQkFBc0IsRUFBRSxnQkFBZ0I7d0JBQ3hDLHNCQUFzQixFQUFFLGVBQWU7d0JBQ3ZDLDhDQUE4QyxFQUFFLGtDQUFrQzt3QkFDbEYsK0NBQStDLEVBQUUsbUNBQW1DO3dCQUNwRixpQ0FBaUMsRUFBRSxxQ0FBcUM7d0JBQ3hFLGdCQUFnQixFQUFFLG9CQUFvQjt3QkFDdEMsU0FBUyxFQUFFLFdBQVc7d0JBQ3RCLFdBQVcsRUFBRSxrQkFBa0I7cUJBQ2hDOzswQkFTRSxJQUFJOzswQkFJSixNQUFNOzJCQUFDLG1DQUFtQzs7MEJBQzFDLFFBQVE7OzBCQUVSLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMscUJBQXFCOzswQkFDeEMsU0FBUzsyQkFBQyxVQUFVOzRDQW1DZCxjQUFjO3NCQUF0QixLQUFLO2dCQUdHLGVBQWU7c0JBQXZCLEtBQUs7O0FBd0dSOztHQUVHO0FBQ0gsTUFNYSw0QkFBNEI7O2dJQUE1Qiw0QkFBNEI7b0hBQTVCLDRCQUE0QjtTQUE1Qiw0QkFBNEI7a0dBQTVCLDRCQUE0QjtrQkFOeEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsdUJBQXVCO29CQUNqQyxJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLHdDQUF3QztxQkFDaEQ7aUJBQ0Y7O0FBR0Q7O0dBRUc7QUFDSCxNQU1hLHNCQUFzQjs7MEhBQXRCLHNCQUFzQjs4R0FBdEIsc0JBQXNCO1NBQXRCLHNCQUFzQjtrR0FBdEIsc0JBQXNCO2tCQU5sQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLElBQUksRUFBRTt3QkFDSixLQUFLLEVBQUUsa0NBQWtDO3FCQUMxQztpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0ZvY3VzYWJsZU9wdGlvbiwgRm9jdXNNb25pdG9yLCBGb2N1c09yaWdpbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHtFTlRFUiwgaGFzTW9kaWZpZXJLZXksIFNQQUNFfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQXR0cmlidXRlLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBIb3N0LFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0FOSU1BVElPTl9NT0RVTEVfVFlQRX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcbmltcG9ydCB7SGFzVGFiSW5kZXgsIG1peGluVGFiSW5kZXh9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtFTVBUWSwgbWVyZ2UsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2ZpbHRlcn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtNYXRBY2NvcmRpb25Ub2dnbGVQb3NpdGlvbn0gZnJvbSAnLi9hY2NvcmRpb24tYmFzZSc7XG5pbXBvcnQge21hdEV4cGFuc2lvbkFuaW1hdGlvbnN9IGZyb20gJy4vZXhwYW5zaW9uLWFuaW1hdGlvbnMnO1xuaW1wb3J0IHtcbiAgTWF0RXhwYW5zaW9uUGFuZWwsXG4gIE1hdEV4cGFuc2lvblBhbmVsRGVmYXVsdE9wdGlvbnMsXG4gIE1BVF9FWFBBTlNJT05fUEFORUxfREVGQVVMVF9PUFRJT05TLFxufSBmcm9tICcuL2V4cGFuc2lvbi1wYW5lbCc7XG5cbi8vIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gTWF0RXhwYW5zaW9uUGFuZWxIZWFkZXIuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuYWJzdHJhY3QgY2xhc3MgTWF0RXhwYW5zaW9uUGFuZWxIZWFkZXJCYXNlIHtcbiAgYWJzdHJhY3QgcmVhZG9ubHkgZGlzYWJsZWQ6IGJvb2xlYW47XG59XG5jb25zdCBfTWF0RXhwYW5zaW9uUGFuZWxIZWFkZXJNaXhpbkJhc2UgPSBtaXhpblRhYkluZGV4KE1hdEV4cGFuc2lvblBhbmVsSGVhZGVyQmFzZSk7XG5cbi8qKlxuICogSGVhZGVyIGVsZW1lbnQgb2YgYSBgPG1hdC1leHBhbnNpb24tcGFuZWw+YC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXInLFxuICBzdHlsZVVybHM6IFsnZXhwYW5zaW9uLXBhbmVsLWhlYWRlci5jc3MnXSxcbiAgdGVtcGxhdGVVcmw6ICdleHBhbnNpb24tcGFuZWwtaGVhZGVyLmh0bWwnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgaW5wdXRzOiBbJ3RhYkluZGV4J10sXG4gIGFuaW1hdGlvbnM6IFttYXRFeHBhbnNpb25BbmltYXRpb25zLmluZGljYXRvclJvdGF0ZV0sXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXIgbWF0LWZvY3VzLWluZGljYXRvcicsXG4gICAgJ3JvbGUnOiAnYnV0dG9uJyxcbiAgICAnW2F0dHIuaWRdJzogJ3BhbmVsLl9oZWFkZXJJZCcsXG4gICAgJ1thdHRyLnRhYmluZGV4XSc6ICd0YWJJbmRleCcsXG4gICAgJ1thdHRyLmFyaWEtY29udHJvbHNdJzogJ19nZXRQYW5lbElkKCknLFxuICAgICdbYXR0ci5hcmlhLWV4cGFuZGVkXSc6ICdfaXNFeHBhbmRlZCgpJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAncGFuZWwuZGlzYWJsZWQnLFxuICAgICdbY2xhc3MubWF0LWV4cGFuZGVkXSc6ICdfaXNFeHBhbmRlZCgpJyxcbiAgICAnW2NsYXNzLm1hdC1leHBhbnNpb24tdG9nZ2xlLWluZGljYXRvci1hZnRlcl0nOiBgX2dldFRvZ2dsZVBvc2l0aW9uKCkgPT09ICdhZnRlcidgLFxuICAgICdbY2xhc3MubWF0LWV4cGFuc2lvbi10b2dnbGUtaW5kaWNhdG9yLWJlZm9yZV0nOiBgX2dldFRvZ2dsZVBvc2l0aW9uKCkgPT09ICdiZWZvcmUnYCxcbiAgICAnW2NsYXNzLl9tYXQtYW5pbWF0aW9uLW5vb3BhYmxlXSc6ICdfYW5pbWF0aW9uTW9kZSA9PT0gXCJOb29wQW5pbWF0aW9uc1wiJyxcbiAgICAnW3N0eWxlLmhlaWdodF0nOiAnX2dldEhlYWRlckhlaWdodCgpJyxcbiAgICAnKGNsaWNrKSc6ICdfdG9nZ2xlKCknLFxuICAgICcoa2V5ZG93biknOiAnX2tleWRvd24oJGV2ZW50KScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdEV4cGFuc2lvblBhbmVsSGVhZGVyXG4gIGV4dGVuZHMgX01hdEV4cGFuc2lvblBhbmVsSGVhZGVyTWl4aW5CYXNlXG4gIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBGb2N1c2FibGVPcHRpb24sIEhhc1RhYkluZGV4XG57XG4gIHByaXZhdGUgX3BhcmVudENoYW5nZVN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASG9zdCgpIHB1YmxpYyBwYW5lbDogTWF0RXhwYW5zaW9uUGFuZWwsXG4gICAgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIF9mb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvcixcbiAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQEluamVjdChNQVRfRVhQQU5TSU9OX1BBTkVMX0RFRkFVTFRfT1BUSU9OUylcbiAgICBAT3B0aW9uYWwoKVxuICAgIGRlZmF1bHRPcHRpb25zPzogTWF0RXhwYW5zaW9uUGFuZWxEZWZhdWx0T3B0aW9ucyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEFOSU1BVElPTl9NT0RVTEVfVFlQRSkgcHVibGljIF9hbmltYXRpb25Nb2RlPzogc3RyaW5nLFxuICAgIEBBdHRyaWJ1dGUoJ3RhYmluZGV4JykgdGFiSW5kZXg/OiBzdHJpbmcsXG4gICkge1xuICAgIHN1cGVyKCk7XG4gICAgY29uc3QgYWNjb3JkaW9uSGlkZVRvZ2dsZUNoYW5nZSA9IHBhbmVsLmFjY29yZGlvblxuICAgICAgPyBwYW5lbC5hY2NvcmRpb24uX3N0YXRlQ2hhbmdlcy5waXBlKFxuICAgICAgICAgIGZpbHRlcihjaGFuZ2VzID0+ICEhKGNoYW5nZXNbJ2hpZGVUb2dnbGUnXSB8fCBjaGFuZ2VzWyd0b2dnbGVQb3NpdGlvbiddKSksXG4gICAgICAgIClcbiAgICAgIDogRU1QVFk7XG4gICAgdGhpcy50YWJJbmRleCA9IHBhcnNlSW50KHRhYkluZGV4IHx8ICcnKSB8fCAwO1xuXG4gICAgLy8gU2luY2UgdGhlIHRvZ2dsZSBzdGF0ZSBkZXBlbmRzIG9uIGFuIEBJbnB1dCBvbiB0aGUgcGFuZWwsIHdlXG4gICAgLy8gbmVlZCB0byBzdWJzY3JpYmUgYW5kIHRyaWdnZXIgY2hhbmdlIGRldGVjdGlvbiBtYW51YWxseS5cbiAgICB0aGlzLl9wYXJlbnRDaGFuZ2VTdWJzY3JpcHRpb24gPSBtZXJnZShcbiAgICAgIHBhbmVsLm9wZW5lZCxcbiAgICAgIHBhbmVsLmNsb3NlZCxcbiAgICAgIGFjY29yZGlvbkhpZGVUb2dnbGVDaGFuZ2UsXG4gICAgICBwYW5lbC5faW5wdXRDaGFuZ2VzLnBpcGUoXG4gICAgICAgIGZpbHRlcihjaGFuZ2VzID0+IHtcbiAgICAgICAgICByZXR1cm4gISEoY2hhbmdlc1snaGlkZVRvZ2dsZSddIHx8IGNoYW5nZXNbJ2Rpc2FibGVkJ10gfHwgY2hhbmdlc1sndG9nZ2xlUG9zaXRpb24nXSk7XG4gICAgICAgIH0pLFxuICAgICAgKSxcbiAgICApLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKSk7XG5cbiAgICAvLyBBdm9pZHMgZm9jdXMgYmVpbmcgbG9zdCBpZiB0aGUgcGFuZWwgY29udGFpbmVkIHRoZSBmb2N1c2VkIGVsZW1lbnQgYW5kIHdhcyBjbG9zZWQuXG4gICAgcGFuZWwuY2xvc2VkXG4gICAgICAucGlwZShmaWx0ZXIoKCkgPT4gcGFuZWwuX2NvbnRhaW5zRm9jdXMoKSkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IF9mb2N1c01vbml0b3IuZm9jdXNWaWEoX2VsZW1lbnQsICdwcm9ncmFtJykpO1xuXG4gICAgaWYgKGRlZmF1bHRPcHRpb25zKSB7XG4gICAgICB0aGlzLmV4cGFuZGVkSGVpZ2h0ID0gZGVmYXVsdE9wdGlvbnMuZXhwYW5kZWRIZWlnaHQ7XG4gICAgICB0aGlzLmNvbGxhcHNlZEhlaWdodCA9IGRlZmF1bHRPcHRpb25zLmNvbGxhcHNlZEhlaWdodDtcbiAgICB9XG4gIH1cblxuICAvKiogSGVpZ2h0IG9mIHRoZSBoZWFkZXIgd2hpbGUgdGhlIHBhbmVsIGlzIGV4cGFuZGVkLiAqL1xuICBASW5wdXQoKSBleHBhbmRlZEhlaWdodDogc3RyaW5nO1xuXG4gIC8qKiBIZWlnaHQgb2YgdGhlIGhlYWRlciB3aGlsZSB0aGUgcGFuZWwgaXMgY29sbGFwc2VkLiAqL1xuICBASW5wdXQoKSBjb2xsYXBzZWRIZWlnaHQ6IHN0cmluZztcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgYXNzb2NpYXRlZCBwYW5lbCBpcyBkaXNhYmxlZC4gSW1wbGVtZW50ZWQgYXMgYSBwYXJ0IG9mIGBGb2N1c2FibGVPcHRpb25gLlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucGFuZWwuZGlzYWJsZWQ7XG4gIH1cblxuICAvKiogVG9nZ2xlcyB0aGUgZXhwYW5kZWQgc3RhdGUgb2YgdGhlIHBhbmVsLiAqL1xuICBfdG9nZ2xlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5wYW5lbC50b2dnbGUoKTtcbiAgICB9XG4gIH1cblxuICAvKiogR2V0cyB3aGV0aGVyIHRoZSBwYW5lbCBpcyBleHBhbmRlZC4gKi9cbiAgX2lzRXhwYW5kZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucGFuZWwuZXhwYW5kZWQ7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgZXhwYW5kZWQgc3RhdGUgc3RyaW5nIG9mIHRoZSBwYW5lbC4gKi9cbiAgX2dldEV4cGFuZGVkU3RhdGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5wYW5lbC5fZ2V0RXhwYW5kZWRTdGF0ZSgpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHBhbmVsIGlkLiAqL1xuICBfZ2V0UGFuZWxJZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnBhbmVsLmlkO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHRvZ2dsZSBwb3NpdGlvbiBmb3IgdGhlIGhlYWRlci4gKi9cbiAgX2dldFRvZ2dsZVBvc2l0aW9uKCk6IE1hdEFjY29yZGlvblRvZ2dsZVBvc2l0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5wYW5lbC50b2dnbGVQb3NpdGlvbjtcbiAgfVxuXG4gIC8qKiBHZXRzIHdoZXRoZXIgdGhlIGV4cGFuZCBpbmRpY2F0b3Igc2hvdWxkIGJlIHNob3duLiAqL1xuICBfc2hvd1RvZ2dsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMucGFuZWwuaGlkZVRvZ2dsZSAmJiAhdGhpcy5wYW5lbC5kaXNhYmxlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBjdXJyZW50IGhlaWdodCBvZiB0aGUgaGVhZGVyLiBOdWxsIGlmIG5vIGN1c3RvbSBoZWlnaHQgaGFzIGJlZW5cbiAgICogc3BlY2lmaWVkLCBhbmQgaWYgdGhlIGRlZmF1bHQgaGVpZ2h0IGZyb20gdGhlIHN0eWxlc2hlZXQgc2hvdWxkIGJlIHVzZWQuXG4gICAqL1xuICBfZ2V0SGVhZGVySGVpZ2h0KCk6IHN0cmluZyB8IG51bGwge1xuICAgIGNvbnN0IGlzRXhwYW5kZWQgPSB0aGlzLl9pc0V4cGFuZGVkKCk7XG4gICAgaWYgKGlzRXhwYW5kZWQgJiYgdGhpcy5leHBhbmRlZEhlaWdodCkge1xuICAgICAgcmV0dXJuIHRoaXMuZXhwYW5kZWRIZWlnaHQ7XG4gICAgfSBlbHNlIGlmICghaXNFeHBhbmRlZCAmJiB0aGlzLmNvbGxhcHNlZEhlaWdodCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29sbGFwc2VkSGVpZ2h0O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKiBIYW5kbGUga2V5ZG93biBldmVudCBjYWxsaW5nIHRvIHRvZ2dsZSgpIGlmIGFwcHJvcHJpYXRlLiAqL1xuICBfa2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgLy8gVG9nZ2xlIGZvciBzcGFjZSBhbmQgZW50ZXIga2V5cy5cbiAgICAgIGNhc2UgU1BBQ0U6XG4gICAgICBjYXNlIEVOVEVSOlxuICAgICAgICBpZiAoIWhhc01vZGlmaWVyS2V5KGV2ZW50KSkge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5fdG9nZ2xlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmICh0aGlzLnBhbmVsLmFjY29yZGlvbikge1xuICAgICAgICAgIHRoaXMucGFuZWwuYWNjb3JkaW9uLl9oYW5kbGVIZWFkZXJLZXlkb3duKGV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRm9jdXNlcyB0aGUgcGFuZWwgaGVhZGVyLiBJbXBsZW1lbnRlZCBhcyBhIHBhcnQgb2YgYEZvY3VzYWJsZU9wdGlvbmAuXG4gICAqIEBwYXJhbSBvcmlnaW4gT3JpZ2luIG9mIHRoZSBhY3Rpb24gdGhhdCB0cmlnZ2VyZWQgdGhlIGZvY3VzLlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBmb2N1cyhvcmlnaW4/OiBGb2N1c09yaWdpbiwgb3B0aW9ucz86IEZvY3VzT3B0aW9ucykge1xuICAgIGlmIChvcmlnaW4pIHtcbiAgICAgIHRoaXMuX2ZvY3VzTW9uaXRvci5mb2N1c1ZpYSh0aGlzLl9lbGVtZW50LCBvcmlnaW4sIG9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMob3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuX2ZvY3VzTW9uaXRvci5tb25pdG9yKHRoaXMuX2VsZW1lbnQpLnN1YnNjcmliZShvcmlnaW4gPT4ge1xuICAgICAgaWYgKG9yaWdpbiAmJiB0aGlzLnBhbmVsLmFjY29yZGlvbikge1xuICAgICAgICB0aGlzLnBhbmVsLmFjY29yZGlvbi5faGFuZGxlSGVhZGVyRm9jdXModGhpcyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9wYXJlbnRDaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9mb2N1c01vbml0b3Iuc3RvcE1vbml0b3JpbmcodGhpcy5fZWxlbWVudCk7XG4gIH1cbn1cblxuLyoqXG4gKiBEZXNjcmlwdGlvbiBlbGVtZW50IG9mIGEgYDxtYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlcj5gLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdtYXQtcGFuZWwtZGVzY3JpcHRpb24nLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdtYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlci1kZXNjcmlwdGlvbicsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdEV4cGFuc2lvblBhbmVsRGVzY3JpcHRpb24ge31cblxuLyoqXG4gKiBUaXRsZSBlbGVtZW50IG9mIGEgYDxtYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlcj5gLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdtYXQtcGFuZWwtdGl0bGUnLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdtYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlci10aXRsZScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdEV4cGFuc2lvblBhbmVsVGl0bGUge31cbiIsIjxzcGFuIGNsYXNzPVwibWF0LWNvbnRlbnRcIiBbY2xhc3MubWF0LWNvbnRlbnQtaGlkZS10b2dnbGVdPVwiIV9zaG93VG9nZ2xlKClcIj5cbiAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibWF0LXBhbmVsLXRpdGxlXCI+PC9uZy1jb250ZW50PlxuICA8bmctY29udGVudCBzZWxlY3Q9XCJtYXQtcGFuZWwtZGVzY3JpcHRpb25cIj48L25nLWNvbnRlbnQ+XG4gIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjwvc3Bhbj5cbjxzcGFuIFtAaW5kaWNhdG9yUm90YXRlXT1cIl9nZXRFeHBhbmRlZFN0YXRlKClcIiAqbmdJZj1cIl9zaG93VG9nZ2xlKClcIlxuICAgICAgY2xhc3M9XCJtYXQtZXhwYW5zaW9uLWluZGljYXRvclwiPjwvc3Bhbj5cbiJdfQ==