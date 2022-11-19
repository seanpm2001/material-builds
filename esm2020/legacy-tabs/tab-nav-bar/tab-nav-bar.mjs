/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Directive, ElementRef, forwardRef, Inject, Input, NgZone, Optional, QueryList, ViewChild, ViewEncapsulation, } from '@angular/core';
import { MAT_RIPPLE_GLOBAL_OPTIONS, RippleRenderer, } from '@angular/material/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { MatLegacyInkBar } from '../ink-bar';
import { _MatTabLinkBase, _MatTabNavBase } from '@angular/material/tabs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/bidi";
import * as i2 from "@angular/cdk/scrolling";
import * as i3 from "@angular/cdk/platform";
import * as i4 from "@angular/material/core";
import * as i5 from "@angular/cdk/observers";
import * as i6 from "../ink-bar";
import * as i7 from "@angular/cdk/a11y";
// Increasing integer for generating unique ids for tab nav components.
let nextUniqueId = 0;
/**
 * Navigation component matching the styles of the tab group header.
 * Provides anchored navigation with animated ink bar.
 * @deprecated Use `MatTabNav` from `@angular/material/tabs` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyTabNav extends _MatTabNavBase {
    constructor(elementRef, dir, ngZone, changeDetectorRef, viewportRuler, platform, animationMode) {
        super(elementRef, dir, ngZone, changeDetectorRef, viewportRuler, platform, animationMode);
    }
}
MatLegacyTabNav.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0", ngImport: i0, type: MatLegacyTabNav, deps: [{ token: i0.ElementRef }, { token: i1.Directionality, optional: true }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: i2.ViewportRuler }, { token: i3.Platform }, { token: ANIMATION_MODULE_TYPE, optional: true }], target: i0.ɵɵFactoryTarget.Component });
MatLegacyTabNav.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.0", type: MatLegacyTabNav, selector: "[mat-tab-nav-bar]", inputs: { color: "color" }, host: { properties: { "attr.role": "_getRole()", "class.mat-tab-header-pagination-controls-enabled": "_showPaginationControls", "class.mat-tab-header-rtl": "_getLayoutDirection() == 'rtl'", "class.mat-primary": "color !== \"warn\" && color !== \"accent\"", "class.mat-accent": "color === \"accent\"", "class.mat-warn": "color === \"warn\"" }, classAttribute: "mat-tab-nav-bar mat-tab-header" }, queries: [{ propertyName: "_items", predicate: i0.forwardRef(function () { return MatLegacyTabLink; }), descendants: true }], viewQueries: [{ propertyName: "_inkBar", first: true, predicate: MatLegacyInkBar, descendants: true, static: true }, { propertyName: "_tabListContainer", first: true, predicate: ["tabListContainer"], descendants: true, static: true }, { propertyName: "_tabList", first: true, predicate: ["tabList"], descendants: true, static: true }, { propertyName: "_tabListInner", first: true, predicate: ["tabListInner"], descendants: true, static: true }, { propertyName: "_nextPaginator", first: true, predicate: ["nextPaginator"], descendants: true }, { propertyName: "_previousPaginator", first: true, predicate: ["previousPaginator"], descendants: true }], exportAs: ["matTabNavBar", "matTabNav"], usesInheritance: true, ngImport: i0, template: "<button class=\"mat-tab-header-pagination mat-tab-header-pagination-before mat-elevation-z4\"\n     #previousPaginator\n     aria-hidden=\"true\"\n     type=\"button\"\n     mat-ripple\n     tabindex=\"-1\"\n     [matRippleDisabled]=\"_disableScrollBefore || disableRipple\"\n     [class.mat-tab-header-pagination-disabled]=\"_disableScrollBefore\"\n     [disabled]=\"_disableScrollBefore || null\"\n     (click)=\"_handlePaginatorClick('before')\"\n     (mousedown)=\"_handlePaginatorPress('before', $event)\"\n     (touchend)=\"_stopInterval()\">\n  <div class=\"mat-tab-header-pagination-chevron\"></div>\n</button>\n\n<div class=\"mat-tab-link-container\" #tabListContainer (keydown)=\"_handleKeydown($event)\">\n  <div\n    class=\"mat-tab-list\"\n    [class._mat-animation-noopable]=\"_animationMode === 'NoopAnimations'\"\n    #tabList\n    (cdkObserveContent)=\"_onContentChanges()\">\n    <div class=\"mat-tab-links\" #tabListInner>\n      <ng-content></ng-content>\n    </div>\n    <mat-ink-bar></mat-ink-bar>\n  </div>\n</div>\n\n<button class=\"mat-tab-header-pagination mat-tab-header-pagination-after mat-elevation-z4\"\n     #nextPaginator\n     aria-hidden=\"true\"\n     type=\"button\"\n     mat-ripple\n     [matRippleDisabled]=\"_disableScrollAfter || disableRipple\"\n     [class.mat-tab-header-pagination-disabled]=\"_disableScrollAfter\"\n     [disabled]=\"_disableScrollAfter || null\"\n     tabindex=\"-1\"\n     (mousedown)=\"_handlePaginatorPress('after', $event)\"\n     (click)=\"_handlePaginatorClick('after')\"\n     (touchend)=\"_stopInterval()\">\n  <div class=\"mat-tab-header-pagination-chevron\"></div>\n</button>\n", styles: [".mat-tab-header{display:flex;overflow:hidden;position:relative;flex-shrink:0}.mat-tab-header-pagination{-webkit-user-select:none;user-select:none;position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2;-webkit-tap-highlight-color:rgba(0,0,0,0);touch-action:none;box-sizing:content-box;background:none;border:none;outline:0;padding:0}.mat-tab-header-pagination::-moz-focus-inner{border:0}.mat-tab-header-pagination-controls-enabled .mat-tab-header-pagination{display:flex}.mat-tab-header-pagination-before,.mat-tab-header-rtl .mat-tab-header-pagination-after{padding-left:4px}.mat-tab-header-pagination-before .mat-tab-header-pagination-chevron,.mat-tab-header-rtl .mat-tab-header-pagination-after .mat-tab-header-pagination-chevron{transform:rotate(-135deg)}.mat-tab-header-rtl .mat-tab-header-pagination-before,.mat-tab-header-pagination-after{padding-right:4px}.mat-tab-header-rtl .mat-tab-header-pagination-before .mat-tab-header-pagination-chevron,.mat-tab-header-pagination-after .mat-tab-header-pagination-chevron{transform:rotate(45deg)}.mat-tab-header-pagination-chevron{border-style:solid;border-width:2px 2px 0 0;height:8px;width:8px}.mat-tab-header-pagination-disabled{box-shadow:none;cursor:default}.mat-tab-list{flex-grow:1;position:relative;transition:transform 500ms cubic-bezier(0.35, 0, 0.25, 1)}.mat-tab-links{display:flex}[mat-align-tabs=center]>.mat-tab-link-container .mat-tab-links{justify-content:center}[mat-align-tabs=end]>.mat-tab-link-container .mat-tab-links{justify-content:flex-end}.mat-ink-bar{position:absolute;bottom:0;height:2px;transition:500ms cubic-bezier(0.35, 0, 0.25, 1)}.mat-ink-bar._mat-animation-noopable{transition:none !important;animation:none !important}.mat-tab-group-inverted-header .mat-ink-bar{bottom:auto;top:0}.cdk-high-contrast-active .mat-ink-bar{outline:solid 2px;height:0}.mat-tab-link-container{display:flex;flex-grow:1;overflow:hidden;z-index:1}.mat-tab-link{height:48px;padding:0 24px;cursor:pointer;box-sizing:border-box;opacity:.6;min-width:160px;text-align:center;display:inline-flex;justify-content:center;align-items:center;white-space:nowrap;vertical-align:top;text-decoration:none;position:relative;overflow:hidden;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-tab-link:focus{outline:none}.mat-tab-link:focus:not(.mat-tab-disabled){opacity:1}.mat-tab-link.mat-tab-disabled{cursor:default}.cdk-high-contrast-active .mat-tab-link.mat-tab-disabled{opacity:.5}.mat-tab-link .mat-tab-label-content{display:inline-flex;justify-content:center;align-items:center;white-space:nowrap}.cdk-high-contrast-active .mat-tab-link{opacity:1}[mat-stretch-tabs] .mat-tab-link{flex-basis:0;flex-grow:1}.mat-tab-link.mat-tab-disabled{pointer-events:none}.mat-tab-link::before{margin:5px}@media(max-width: 599px){.mat-tab-link{min-width:72px}}"], dependencies: [{ kind: "directive", type: i4.MatRipple, selector: "[mat-ripple], [matRipple]", inputs: ["matRippleColor", "matRippleUnbounded", "matRippleCentered", "matRippleRadius", "matRippleAnimation", "matRippleDisabled", "matRippleTrigger"], exportAs: ["matRipple"] }, { kind: "directive", type: i5.CdkObserveContent, selector: "[cdkObserveContent]", inputs: ["cdkObserveContentDisabled", "debounce"], outputs: ["cdkObserveContent"], exportAs: ["cdkObserveContent"] }, { kind: "directive", type: i6.MatLegacyInkBar, selector: "mat-ink-bar" }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0", ngImport: i0, type: MatLegacyTabNav, decorators: [{
            type: Component,
            args: [{ selector: '[mat-tab-nav-bar]', exportAs: 'matTabNavBar, matTabNav', inputs: ['color'], host: {
                        '[attr.role]': '_getRole()',
                        'class': 'mat-tab-nav-bar mat-tab-header',
                        '[class.mat-tab-header-pagination-controls-enabled]': '_showPaginationControls',
                        '[class.mat-tab-header-rtl]': "_getLayoutDirection() == 'rtl'",
                        '[class.mat-primary]': 'color !== "warn" && color !== "accent"',
                        '[class.mat-accent]': 'color === "accent"',
                        '[class.mat-warn]': 'color === "warn"',
                    }, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.Default, template: "<button class=\"mat-tab-header-pagination mat-tab-header-pagination-before mat-elevation-z4\"\n     #previousPaginator\n     aria-hidden=\"true\"\n     type=\"button\"\n     mat-ripple\n     tabindex=\"-1\"\n     [matRippleDisabled]=\"_disableScrollBefore || disableRipple\"\n     [class.mat-tab-header-pagination-disabled]=\"_disableScrollBefore\"\n     [disabled]=\"_disableScrollBefore || null\"\n     (click)=\"_handlePaginatorClick('before')\"\n     (mousedown)=\"_handlePaginatorPress('before', $event)\"\n     (touchend)=\"_stopInterval()\">\n  <div class=\"mat-tab-header-pagination-chevron\"></div>\n</button>\n\n<div class=\"mat-tab-link-container\" #tabListContainer (keydown)=\"_handleKeydown($event)\">\n  <div\n    class=\"mat-tab-list\"\n    [class._mat-animation-noopable]=\"_animationMode === 'NoopAnimations'\"\n    #tabList\n    (cdkObserveContent)=\"_onContentChanges()\">\n    <div class=\"mat-tab-links\" #tabListInner>\n      <ng-content></ng-content>\n    </div>\n    <mat-ink-bar></mat-ink-bar>\n  </div>\n</div>\n\n<button class=\"mat-tab-header-pagination mat-tab-header-pagination-after mat-elevation-z4\"\n     #nextPaginator\n     aria-hidden=\"true\"\n     type=\"button\"\n     mat-ripple\n     [matRippleDisabled]=\"_disableScrollAfter || disableRipple\"\n     [class.mat-tab-header-pagination-disabled]=\"_disableScrollAfter\"\n     [disabled]=\"_disableScrollAfter || null\"\n     tabindex=\"-1\"\n     (mousedown)=\"_handlePaginatorPress('after', $event)\"\n     (click)=\"_handlePaginatorClick('after')\"\n     (touchend)=\"_stopInterval()\">\n  <div class=\"mat-tab-header-pagination-chevron\"></div>\n</button>\n", styles: [".mat-tab-header{display:flex;overflow:hidden;position:relative;flex-shrink:0}.mat-tab-header-pagination{-webkit-user-select:none;user-select:none;position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2;-webkit-tap-highlight-color:rgba(0,0,0,0);touch-action:none;box-sizing:content-box;background:none;border:none;outline:0;padding:0}.mat-tab-header-pagination::-moz-focus-inner{border:0}.mat-tab-header-pagination-controls-enabled .mat-tab-header-pagination{display:flex}.mat-tab-header-pagination-before,.mat-tab-header-rtl .mat-tab-header-pagination-after{padding-left:4px}.mat-tab-header-pagination-before .mat-tab-header-pagination-chevron,.mat-tab-header-rtl .mat-tab-header-pagination-after .mat-tab-header-pagination-chevron{transform:rotate(-135deg)}.mat-tab-header-rtl .mat-tab-header-pagination-before,.mat-tab-header-pagination-after{padding-right:4px}.mat-tab-header-rtl .mat-tab-header-pagination-before .mat-tab-header-pagination-chevron,.mat-tab-header-pagination-after .mat-tab-header-pagination-chevron{transform:rotate(45deg)}.mat-tab-header-pagination-chevron{border-style:solid;border-width:2px 2px 0 0;height:8px;width:8px}.mat-tab-header-pagination-disabled{box-shadow:none;cursor:default}.mat-tab-list{flex-grow:1;position:relative;transition:transform 500ms cubic-bezier(0.35, 0, 0.25, 1)}.mat-tab-links{display:flex}[mat-align-tabs=center]>.mat-tab-link-container .mat-tab-links{justify-content:center}[mat-align-tabs=end]>.mat-tab-link-container .mat-tab-links{justify-content:flex-end}.mat-ink-bar{position:absolute;bottom:0;height:2px;transition:500ms cubic-bezier(0.35, 0, 0.25, 1)}.mat-ink-bar._mat-animation-noopable{transition:none !important;animation:none !important}.mat-tab-group-inverted-header .mat-ink-bar{bottom:auto;top:0}.cdk-high-contrast-active .mat-ink-bar{outline:solid 2px;height:0}.mat-tab-link-container{display:flex;flex-grow:1;overflow:hidden;z-index:1}.mat-tab-link{height:48px;padding:0 24px;cursor:pointer;box-sizing:border-box;opacity:.6;min-width:160px;text-align:center;display:inline-flex;justify-content:center;align-items:center;white-space:nowrap;vertical-align:top;text-decoration:none;position:relative;overflow:hidden;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-tab-link:focus{outline:none}.mat-tab-link:focus:not(.mat-tab-disabled){opacity:1}.mat-tab-link.mat-tab-disabled{cursor:default}.cdk-high-contrast-active .mat-tab-link.mat-tab-disabled{opacity:.5}.mat-tab-link .mat-tab-label-content{display:inline-flex;justify-content:center;align-items:center;white-space:nowrap}.cdk-high-contrast-active .mat-tab-link{opacity:1}[mat-stretch-tabs] .mat-tab-link{flex-basis:0;flex-grow:1}.mat-tab-link.mat-tab-disabled{pointer-events:none}.mat-tab-link::before{margin:5px}@media(max-width: 599px){.mat-tab-link{min-width:72px}}"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.Directionality, decorators: [{
                    type: Optional
                }] }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: i2.ViewportRuler }, { type: i3.Platform }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [ANIMATION_MODULE_TYPE]
                }] }]; }, propDecorators: { _items: [{
                type: ContentChildren,
                args: [forwardRef(() => MatLegacyTabLink), { descendants: true }]
            }], _inkBar: [{
                type: ViewChild,
                args: [MatLegacyInkBar, { static: true }]
            }], _tabListContainer: [{
                type: ViewChild,
                args: ['tabListContainer', { static: true }]
            }], _tabList: [{
                type: ViewChild,
                args: ['tabList', { static: true }]
            }], _tabListInner: [{
                type: ViewChild,
                args: ['tabListInner', { static: true }]
            }], _nextPaginator: [{
                type: ViewChild,
                args: ['nextPaginator']
            }], _previousPaginator: [{
                type: ViewChild,
                args: ['previousPaginator']
            }] } });
/**
 * Link inside of a `mat-tab-nav-bar`.
 * @deprecated Use `MatTabLink` from `@angular/material/tabs` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyTabLink extends _MatTabLinkBase {
    constructor(tabNavBar, elementRef, ngZone, platform, globalRippleOptions, tabIndex, focusMonitor, animationMode) {
        super(tabNavBar, elementRef, globalRippleOptions, tabIndex, focusMonitor, animationMode);
        this._tabLinkRipple = new RippleRenderer(this, ngZone, elementRef, platform);
        this._tabLinkRipple.setupTriggerEvents(elementRef.nativeElement);
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this._tabLinkRipple._removeTriggerEvents();
    }
}
MatLegacyTabLink.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0", ngImport: i0, type: MatLegacyTabLink, deps: [{ token: MatLegacyTabNav }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i3.Platform }, { token: MAT_RIPPLE_GLOBAL_OPTIONS, optional: true }, { token: 'tabindex', attribute: true }, { token: i7.FocusMonitor }, { token: ANIMATION_MODULE_TYPE, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
MatLegacyTabLink.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.0", type: MatLegacyTabLink, selector: "[mat-tab-link], [matTabLink]", inputs: { disabled: "disabled", disableRipple: "disableRipple", tabIndex: "tabIndex" }, host: { listeners: { "focus": "_handleFocus()", "keydown": "_handleKeydown($event)" }, properties: { "attr.aria-controls": "_getAriaControls()", "attr.aria-current": "_getAriaCurrent()", "attr.aria-disabled": "disabled", "attr.aria-selected": "_getAriaSelected()", "attr.id": "id", "attr.tabIndex": "_getTabIndex()", "attr.role": "_getRole()", "class.mat-tab-disabled": "disabled", "class.mat-tab-label-active": "active" }, classAttribute: "mat-tab-link mat-focus-indicator" }, exportAs: ["matTabLink"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0", ngImport: i0, type: MatLegacyTabLink, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mat-tab-link], [matTabLink]',
                    exportAs: 'matTabLink',
                    inputs: ['disabled', 'disableRipple', 'tabIndex'],
                    host: {
                        'class': 'mat-tab-link mat-focus-indicator',
                        '[attr.aria-controls]': '_getAriaControls()',
                        '[attr.aria-current]': '_getAriaCurrent()',
                        '[attr.aria-disabled]': 'disabled',
                        '[attr.aria-selected]': '_getAriaSelected()',
                        '[attr.id]': 'id',
                        '[attr.tabIndex]': '_getTabIndex()',
                        '[attr.role]': '_getRole()',
                        '[class.mat-tab-disabled]': 'disabled',
                        '[class.mat-tab-label-active]': 'active',
                        '(focus)': '_handleFocus()',
                        '(keydown)': '_handleKeydown($event)',
                    },
                }]
        }], ctorParameters: function () { return [{ type: MatLegacyTabNav }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i3.Platform }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MAT_RIPPLE_GLOBAL_OPTIONS]
                }] }, { type: undefined, decorators: [{
                    type: Attribute,
                    args: ['tabindex']
                }] }, { type: i7.FocusMonitor }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [ANIMATION_MODULE_TYPE]
                }] }]; } });
/**
 * Tab panel component associated with MatTabNav.
 * @deprecated Use `MatTabNavPanel` from `@angular/material/tabs` instead. See https://material.angular.io/guide/mdc-migration for information about migrating.
 * @breaking-change 17.0.0
 */
export class MatLegacyTabNavPanel {
    constructor() {
        /** Unique id for the tab panel. */
        this.id = `mat-tab-nav-panel-${nextUniqueId++}`;
    }
}
MatLegacyTabNavPanel.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.0", ngImport: i0, type: MatLegacyTabNavPanel, deps: [], target: i0.ɵɵFactoryTarget.Component });
MatLegacyTabNavPanel.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.0", type: MatLegacyTabNavPanel, selector: "mat-tab-nav-panel", inputs: { id: "id" }, host: { attributes: { "role": "tabpanel" }, properties: { "attr.aria-labelledby": "_activeTabId", "attr.id": "id" }, classAttribute: "mat-tab-nav-panel" }, exportAs: ["matTabNavPanel"], ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.0", ngImport: i0, type: MatLegacyTabNavPanel, decorators: [{
            type: Component,
            args: [{
                    selector: 'mat-tab-nav-panel',
                    exportAs: 'matTabNavPanel',
                    template: '<ng-content></ng-content>',
                    host: {
                        '[attr.aria-labelledby]': '_activeTabId',
                        '[attr.id]': 'id',
                        'class': 'mat-tab-nav-panel',
                        'role': 'tabpanel',
                    },
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], propDecorators: { id: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLW5hdi1iYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvbGVnYWN5LXRhYnMvdGFiLW5hdi1iYXIvdGFiLW5hdi1iYXIudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvbGVnYWN5LXRhYnMvdGFiLW5hdi1iYXIvdGFiLW5hdi1iYXIuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFDSCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUNMLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFDVixVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBRU4sUUFBUSxFQUNSLFNBQVMsRUFDVCxTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCx5QkFBeUIsRUFFekIsY0FBYyxHQUNmLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDM0UsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUMzQyxPQUFPLEVBQUMsZUFBZSxFQUFFLGNBQWMsRUFBQyxNQUFNLHdCQUF3QixDQUFDOzs7Ozs7Ozs7QUFFdkUsdUVBQXVFO0FBQ3ZFLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztBQUVyQjs7Ozs7R0FLRztBQW9CSCxNQUFNLE9BQU8sZUFBZ0Is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Z2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge0ZvY3VzTW9uaXRvcn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHtEaXJlY3Rpb25hbGl0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtQbGF0Zm9ybX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7Vmlld3BvcnRSdWxlcn0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5pbXBvcnQge1xuICBBdHRyaWJ1dGUsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgZm9yd2FyZFJlZixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBRdWVyeUxpc3QsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgTUFUX1JJUFBMRV9HTE9CQUxfT1BUSU9OUyxcbiAgUmlwcGxlR2xvYmFsT3B0aW9ucyxcbiAgUmlwcGxlUmVuZGVyZXIsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHtBTklNQVRJT05fTU9EVUxFX1RZUEV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge01hdExlZ2FjeUlua0Jhcn0gZnJvbSAnLi4vaW5rLWJhcic7XG5pbXBvcnQge19NYXRUYWJMaW5rQmFzZSwgX01hdFRhYk5hdkJhc2V9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYnMnO1xuXG4vLyBJbmNyZWFzaW5nIGludGVnZXIgZm9yIGdlbmVyYXRpbmcgdW5pcXVlIGlkcyBmb3IgdGFiIG5hdiBjb21wb25lbnRzLlxubGV0IG5leHRVbmlxdWVJZCA9IDA7XG5cbi8qKlxuICogTmF2aWdhdGlvbiBjb21wb25lbnQgbWF0Y2hpbmcgdGhlIHN0eWxlcyBvZiB0aGUgdGFiIGdyb3VwIGhlYWRlci5cbiAqIFByb3ZpZGVzIGFuY2hvcmVkIG5hdmlnYXRpb24gd2l0aCBhbmltYXRlZCBpbmsgYmFyLlxuICogQGRlcHJlY2F0ZWQgVXNlIGBNYXRUYWJOYXZgIGZyb20gYEBhbmd1bGFyL21hdGVyaWFsL3RhYnNgIGluc3RlYWQuIFNlZSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vZ3VpZGUvbWRjLW1pZ3JhdGlvbiBmb3IgaW5mb3JtYXRpb24gYWJvdXQgbWlncmF0aW5nLlxuICogQGJyZWFraW5nLWNoYW5nZSAxNy4wLjBcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnW21hdC10YWItbmF2LWJhcl0nLFxuICBleHBvcnRBczogJ21hdFRhYk5hdkJhciwgbWF0VGFiTmF2JyxcbiAgaW5wdXRzOiBbJ2NvbG9yJ10sXG4gIHRlbXBsYXRlVXJsOiAndGFiLW5hdi1iYXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWyd0YWItbmF2LWJhci5jc3MnXSxcbiAgaG9zdDoge1xuICAgICdbYXR0ci5yb2xlXSc6ICdfZ2V0Um9sZSgpJyxcbiAgICAnY2xhc3MnOiAnbWF0LXRhYi1uYXYtYmFyIG1hdC10YWItaGVhZGVyJyxcbiAgICAnW2NsYXNzLm1hdC10YWItaGVhZGVyLXBhZ2luYXRpb24tY29udHJvbHMtZW5hYmxlZF0nOiAnX3Nob3dQYWdpbmF0aW9uQ29udHJvbHMnLFxuICAgICdbY2xhc3MubWF0LXRhYi1oZWFkZXItcnRsXSc6IFwiX2dldExheW91dERpcmVjdGlvbigpID09ICdydGwnXCIsXG4gICAgJ1tjbGFzcy5tYXQtcHJpbWFyeV0nOiAnY29sb3IgIT09IFwid2FyblwiICYmIGNvbG9yICE9PSBcImFjY2VudFwiJyxcbiAgICAnW2NsYXNzLm1hdC1hY2NlbnRdJzogJ2NvbG9yID09PSBcImFjY2VudFwiJyxcbiAgICAnW2NsYXNzLm1hdC13YXJuXSc6ICdjb2xvciA9PT0gXCJ3YXJuXCInLFxuICB9LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFsaWRhdGUtZGVjb3JhdG9yc1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHQsXG59KVxuZXhwb3J0IGNsYXNzIE1hdExlZ2FjeVRhYk5hdiBleHRlbmRzIF9NYXRUYWJOYXZCYXNlIHtcbiAgQENvbnRlbnRDaGlsZHJlbihmb3J3YXJkUmVmKCgpID0+IE1hdExlZ2FjeVRhYkxpbmspLCB7ZGVzY2VuZGFudHM6IHRydWV9KVxuICBfaXRlbXM6IFF1ZXJ5TGlzdDxNYXRMZWdhY3lUYWJMaW5rPjtcbiAgQFZpZXdDaGlsZChNYXRMZWdhY3lJbmtCYXIsIHtzdGF0aWM6IHRydWV9KSBfaW5rQmFyOiBNYXRMZWdhY3lJbmtCYXI7XG4gIEBWaWV3Q2hpbGQoJ3RhYkxpc3RDb250YWluZXInLCB7c3RhdGljOiB0cnVlfSkgX3RhYkxpc3RDb250YWluZXI6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3RhYkxpc3QnLCB7c3RhdGljOiB0cnVlfSkgX3RhYkxpc3Q6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3RhYkxpc3RJbm5lcicsIHtzdGF0aWM6IHRydWV9KSBfdGFiTGlzdElubmVyOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCduZXh0UGFnaW5hdG9yJykgX25leHRQYWdpbmF0b3I6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuICBAVmlld0NoaWxkKCdwcmV2aW91c1BhZ2luYXRvcicpIF9wcmV2aW91c1BhZ2luYXRvcjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBAT3B0aW9uYWwoKSBkaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgIG5nWm9uZTogTmdab25lLFxuICAgIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICB2aWV3cG9ydFJ1bGVyOiBWaWV3cG9ydFJ1bGVyLFxuICAgIHBsYXRmb3JtOiBQbGF0Zm9ybSxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEFOSU1BVElPTl9NT0RVTEVfVFlQRSkgYW5pbWF0aW9uTW9kZT86IHN0cmluZyxcbiAgKSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZiwgZGlyLCBuZ1pvbmUsIGNoYW5nZURldGVjdG9yUmVmLCB2aWV3cG9ydFJ1bGVyLCBwbGF0Zm9ybSwgYW5pbWF0aW9uTW9kZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBMaW5rIGluc2lkZSBvZiBhIGBtYXQtdGFiLW5hdi1iYXJgLlxuICogQGRlcHJlY2F0ZWQgVXNlIGBNYXRUYWJMaW5rYCBmcm9tIGBAYW5ndWxhci9tYXRlcmlhbC90YWJzYCBpbnN0ZWFkLiBTZWUgaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyLmlvL2d1aWRlL21kYy1taWdyYXRpb24gZm9yIGluZm9ybWF0aW9uIGFib3V0IG1pZ3JhdGluZy5cbiAqIEBicmVha2luZy1jaGFuZ2UgMTcuMC4wXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXQtdGFiLWxpbmtdLCBbbWF0VGFiTGlua10nLFxuICBleHBvcnRBczogJ21hdFRhYkxpbmsnLFxuICBpbnB1dHM6IFsnZGlzYWJsZWQnLCAnZGlzYWJsZVJpcHBsZScsICd0YWJJbmRleCddLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC10YWItbGluayBtYXQtZm9jdXMtaW5kaWNhdG9yJyxcbiAgICAnW2F0dHIuYXJpYS1jb250cm9sc10nOiAnX2dldEFyaWFDb250cm9scygpJyxcbiAgICAnW2F0dHIuYXJpYS1jdXJyZW50XSc6ICdfZ2V0QXJpYUN1cnJlbnQoKScsXG4gICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW2F0dHIuYXJpYS1zZWxlY3RlZF0nOiAnX2dldEFyaWFTZWxlY3RlZCgpJyxcbiAgICAnW2F0dHIuaWRdJzogJ2lkJyxcbiAgICAnW2F0dHIudGFiSW5kZXhdJzogJ19nZXRUYWJJbmRleCgpJyxcbiAgICAnW2F0dHIucm9sZV0nOiAnX2dldFJvbGUoKScsXG4gICAgJ1tjbGFzcy5tYXQtdGFiLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgJ1tjbGFzcy5tYXQtdGFiLWxhYmVsLWFjdGl2ZV0nOiAnYWN0aXZlJyxcbiAgICAnKGZvY3VzKSc6ICdfaGFuZGxlRm9jdXMoKScsXG4gICAgJyhrZXlkb3duKSc6ICdfaGFuZGxlS2V5ZG93bigkZXZlbnQpJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0TGVnYWN5VGFiTGluayBleHRlbmRzIF9NYXRUYWJMaW5rQmFzZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8qKiBSZWZlcmVuY2UgdG8gdGhlIFJpcHBsZVJlbmRlcmVyIGZvciB0aGUgdGFiLWxpbmsuICovXG4gIHByaXZhdGUgX3RhYkxpbmtSaXBwbGU6IFJpcHBsZVJlbmRlcmVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHRhYk5hdkJhcjogTWF0TGVnYWN5VGFiTmF2LFxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgbmdab25lOiBOZ1pvbmUsXG4gICAgcGxhdGZvcm06IFBsYXRmb3JtLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUFUX1JJUFBMRV9HTE9CQUxfT1BUSU9OUykgZ2xvYmFsUmlwcGxlT3B0aW9uczogUmlwcGxlR2xvYmFsT3B0aW9ucyB8IG51bGwsXG4gICAgQEF0dHJpYnV0ZSgndGFiaW5kZXgnKSB0YWJJbmRleDogc3RyaW5nLFxuICAgIGZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQU5JTUFUSU9OX01PRFVMRV9UWVBFKSBhbmltYXRpb25Nb2RlPzogc3RyaW5nLFxuICApIHtcbiAgICBzdXBlcih0YWJOYXZCYXIsIGVsZW1lbnRSZWYsIGdsb2JhbFJpcHBsZU9wdGlvbnMsIHRhYkluZGV4LCBmb2N1c01vbml0b3IsIGFuaW1hdGlvbk1vZGUpO1xuICAgIHRoaXMuX3RhYkxpbmtSaXBwbGUgPSBuZXcgUmlwcGxlUmVuZGVyZXIodGhpcywgbmdab25lLCBlbGVtZW50UmVmLCBwbGF0Zm9ybSk7XG4gICAgdGhpcy5fdGFiTGlua1JpcHBsZS5zZXR1cFRyaWdnZXJFdmVudHMoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgfVxuXG4gIG92ZXJyaWRlIG5nT25EZXN0cm95KCkge1xuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG4gICAgdGhpcy5fdGFiTGlua1JpcHBsZS5fcmVtb3ZlVHJpZ2dlckV2ZW50cygpO1xuICB9XG59XG5cbi8qKlxuICogVGFiIHBhbmVsIGNvbXBvbmVudCBhc3NvY2lhdGVkIHdpdGggTWF0VGFiTmF2LlxuICogQGRlcHJlY2F0ZWQgVXNlIGBNYXRUYWJOYXZQYW5lbGAgZnJvbSBgQGFuZ3VsYXIvbWF0ZXJpYWwvdGFic2AgaW5zdGVhZC4gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhci5pby9ndWlkZS9tZGMtbWlncmF0aW9uIGZvciBpbmZvcm1hdGlvbiBhYm91dCBtaWdyYXRpbmcuXG4gKiBAYnJlYWtpbmctY2hhbmdlIDE3LjAuMFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtdGFiLW5hdi1wYW5lbCcsXG4gIGV4cG9ydEFzOiAnbWF0VGFiTmF2UGFuZWwnLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICBob3N0OiB7XG4gICAgJ1thdHRyLmFyaWEtbGFiZWxsZWRieV0nOiAnX2FjdGl2ZVRhYklkJyxcbiAgICAnW2F0dHIuaWRdJzogJ2lkJyxcbiAgICAnY2xhc3MnOiAnbWF0LXRhYi1uYXYtcGFuZWwnLFxuICAgICdyb2xlJzogJ3RhYnBhbmVsJyxcbiAgfSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1hdExlZ2FjeVRhYk5hdlBhbmVsIHtcbiAgLyoqIFVuaXF1ZSBpZCBmb3IgdGhlIHRhYiBwYW5lbC4gKi9cbiAgQElucHV0KCkgaWQgPSBgbWF0LXRhYi1uYXYtcGFuZWwtJHtuZXh0VW5pcXVlSWQrK31gO1xuXG4gIC8qKiBJZCBvZiB0aGUgYWN0aXZlIHRhYiBpbiB0aGUgbmF2IGJhci4gKi9cbiAgX2FjdGl2ZVRhYklkPzogc3RyaW5nO1xufVxuIiwiPGJ1dHRvbiBjbGFzcz1cIm1hdC10YWItaGVhZGVyLXBhZ2luYXRpb24gbWF0LXRhYi1oZWFkZXItcGFnaW5hdGlvbi1iZWZvcmUgbWF0LWVsZXZhdGlvbi16NFwiXG4gICAgICNwcmV2aW91c1BhZ2luYXRvclxuICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgbWF0LXJpcHBsZVxuICAgICB0YWJpbmRleD1cIi0xXCJcbiAgICAgW21hdFJpcHBsZURpc2FibGVkXT1cIl9kaXNhYmxlU2Nyb2xsQmVmb3JlIHx8IGRpc2FibGVSaXBwbGVcIlxuICAgICBbY2xhc3MubWF0LXRhYi1oZWFkZXItcGFnaW5hdGlvbi1kaXNhYmxlZF09XCJfZGlzYWJsZVNjcm9sbEJlZm9yZVwiXG4gICAgIFtkaXNhYmxlZF09XCJfZGlzYWJsZVNjcm9sbEJlZm9yZSB8fCBudWxsXCJcbiAgICAgKGNsaWNrKT1cIl9oYW5kbGVQYWdpbmF0b3JDbGljaygnYmVmb3JlJylcIlxuICAgICAobW91c2Vkb3duKT1cIl9oYW5kbGVQYWdpbmF0b3JQcmVzcygnYmVmb3JlJywgJGV2ZW50KVwiXG4gICAgICh0b3VjaGVuZCk9XCJfc3RvcEludGVydmFsKClcIj5cbiAgPGRpdiBjbGFzcz1cIm1hdC10YWItaGVhZGVyLXBhZ2luYXRpb24tY2hldnJvblwiPjwvZGl2PlxuPC9idXR0b24+XG5cbjxkaXYgY2xhc3M9XCJtYXQtdGFiLWxpbmstY29udGFpbmVyXCIgI3RhYkxpc3RDb250YWluZXIgKGtleWRvd24pPVwiX2hhbmRsZUtleWRvd24oJGV2ZW50KVwiPlxuICA8ZGl2XG4gICAgY2xhc3M9XCJtYXQtdGFiLWxpc3RcIlxuICAgIFtjbGFzcy5fbWF0LWFuaW1hdGlvbi1ub29wYWJsZV09XCJfYW5pbWF0aW9uTW9kZSA9PT0gJ05vb3BBbmltYXRpb25zJ1wiXG4gICAgI3RhYkxpc3RcbiAgICAoY2RrT2JzZXJ2ZUNvbnRlbnQpPVwiX29uQ29udGVudENoYW5nZXMoKVwiPlxuICAgIDxkaXYgY2xhc3M9XCJtYXQtdGFiLWxpbmtzXCIgI3RhYkxpc3RJbm5lcj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgICA8bWF0LWluay1iYXI+PC9tYXQtaW5rLWJhcj5cbiAgPC9kaXY+XG48L2Rpdj5cblxuPGJ1dHRvbiBjbGFzcz1cIm1hdC10YWItaGVhZGVyLXBhZ2luYXRpb24gbWF0LXRhYi1oZWFkZXItcGFnaW5hdGlvbi1hZnRlciBtYXQtZWxldmF0aW9uLXo0XCJcbiAgICAgI25leHRQYWdpbmF0b3JcbiAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgIG1hdC1yaXBwbGVcbiAgICAgW21hdFJpcHBsZURpc2FibGVkXT1cIl9kaXNhYmxlU2Nyb2xsQWZ0ZXIgfHwgZGlzYWJsZVJpcHBsZVwiXG4gICAgIFtjbGFzcy5tYXQtdGFiLWhlYWRlci1wYWdpbmF0aW9uLWRpc2FibGVkXT1cIl9kaXNhYmxlU2Nyb2xsQWZ0ZXJcIlxuICAgICBbZGlzYWJsZWRdPVwiX2Rpc2FibGVTY3JvbGxBZnRlciB8fCBudWxsXCJcbiAgICAgdGFiaW5kZXg9XCItMVwiXG4gICAgIChtb3VzZWRvd24pPVwiX2hhbmRsZVBhZ2luYXRvclByZXNzKCdhZnRlcicsICRldmVudClcIlxuICAgICAoY2xpY2spPVwiX2hhbmRsZVBhZ2luYXRvckNsaWNrKCdhZnRlcicpXCJcbiAgICAgKHRvdWNoZW5kKT1cIl9zdG9wSW50ZXJ2YWwoKVwiPlxuICA8ZGl2IGNsYXNzPVwibWF0LXRhYi1oZWFkZXItcGFnaW5hdGlvbi1jaGV2cm9uXCI+PC9kaXY+XG48L2J1dHRvbj5cbiJdfQ==