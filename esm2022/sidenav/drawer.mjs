import { FocusMonitor, FocusTrapFactory, InteractivityChecker, } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import { Platform } from '@angular/cdk/platform';
import { CdkScrollable, ScrollDispatcher, ViewportRuler } from '@angular/cdk/scrolling';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, ElementRef, EventEmitter, forwardRef, Inject, InjectionToken, Input, NgZone, Optional, Output, QueryList, ViewChild, ViewEncapsulation, } from '@angular/core';
import { fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, filter, map, startWith, take, takeUntil, distinctUntilChanged, mapTo, } from 'rxjs/operators';
import { matDrawerAnimations } from './drawer-animations';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/scrolling";
import * as i2 from "@angular/cdk/a11y";
import * as i3 from "@angular/cdk/platform";
import * as i4 from "@angular/cdk/bidi";
/**
 * Throws an exception when two MatDrawer are matching the same position.
 * @docs-private
 */
export function throwMatDuplicatedDrawerError(position) {
    throw Error(`A drawer was already declared for 'position="${position}"'`);
}
/** Configures whether drawers should use auto sizing by default. */
export const MAT_DRAWER_DEFAULT_AUTOSIZE = new InjectionToken('MAT_DRAWER_DEFAULT_AUTOSIZE', {
    providedIn: 'root',
    factory: MAT_DRAWER_DEFAULT_AUTOSIZE_FACTORY,
});
/**
 * Used to provide a drawer container to a drawer while avoiding circular references.
 * @docs-private
 */
export const MAT_DRAWER_CONTAINER = new InjectionToken('MAT_DRAWER_CONTAINER');
/** @docs-private */
export function MAT_DRAWER_DEFAULT_AUTOSIZE_FACTORY() {
    return false;
}
export class MatDrawerContent extends CdkScrollable {
    constructor(_changeDetectorRef, _container, elementRef, scrollDispatcher, ngZone) {
        super(elementRef, scrollDispatcher, ngZone);
        this._changeDetectorRef = _changeDetectorRef;
        this._container = _container;
    }
    ngAfterContentInit() {
        this._container._contentMarginChanges.subscribe(() => {
            this._changeDetectorRef.markForCheck();
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0-next.2", ngImport: i0, type: MatDrawerContent, deps: [{ token: i0.ChangeDetectorRef }, { token: forwardRef(() => MatDrawerContainer) }, { token: i0.ElementRef }, { token: i1.ScrollDispatcher }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0-next.2", type: MatDrawerContent, isStandalone: true, selector: "mat-drawer-content", host: { attributes: { "ngSkipHydration": "" }, properties: { "style.margin-left.px": "_container._contentMargins.left", "style.margin-right.px": "_container._contentMargins.right" }, classAttribute: "mat-drawer-content" }, providers: [
            {
                provide: CdkScrollable,
                useExisting: MatDrawerContent,
            },
        ], usesInheritance: true, ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0-next.2", ngImport: i0, type: MatDrawerContent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mat-drawer-content',
                    template: '<ng-content></ng-content>',
                    host: {
                        'class': 'mat-drawer-content',
                        '[style.margin-left.px]': '_container._contentMargins.left',
                        '[style.margin-right.px]': '_container._contentMargins.right',
                        'ngSkipHydration': '',
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    providers: [
                        {
                            provide: CdkScrollable,
                            useExisting: MatDrawerContent,
                        },
                    ],
                    standalone: true,
                }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }, { type: MatDrawerContainer, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => MatDrawerContainer)]
                }] }, { type: i0.ElementRef }, { type: i1.ScrollDispatcher }, { type: i0.NgZone }] });
/**
 * This component corresponds to a drawer that can be opened on the drawer container.
 */
export class MatDrawer {
    /** The side that the drawer is attached to. */
    get position() {
        return this._position;
    }
    set position(value) {
        // Make sure we have a valid value.
        value = value === 'end' ? 'end' : 'start';
        if (value !== this._position) {
            // Static inputs in Ivy are set before the element is in the DOM.
            if (this._isAttached) {
                this._updatePositionInParent(value);
            }
            this._position = value;
            this.onPositionChanged.emit();
        }
    }
    /** Mode of the drawer; one of 'over', 'push' or 'side'. */
    get mode() {
        return this._mode;
    }
    set mode(value) {
        this._mode = value;
        this._updateFocusTrapState();
        this._modeChanged.next();
    }
    /** Whether the drawer can be closed with the escape key or by clicking on the backdrop. */
    get disableClose() {
        return this._disableClose;
    }
    set disableClose(value) {
        this._disableClose = coerceBooleanProperty(value);
    }
    /**
     * Whether the drawer should focus the first focusable element automatically when opened.
     * Defaults to false in when `mode` is set to `side`, otherwise defaults to `true`. If explicitly
     * enabled, focus will be moved into the sidenav in `side` mode as well.
     * @breaking-change 14.0.0 Remove boolean option from autoFocus. Use string or AutoFocusTarget
     * instead.
     */
    get autoFocus() {
        const value = this._autoFocus;
        // Note that usually we don't allow autoFocus to be set to `first-tabbable` in `side` mode,
        // because we don't know how the sidenav is being used, but in some cases it still makes
        // sense to do it. The consumer can explicitly set `autoFocus`.
        if (value == null) {
            if (this.mode === 'side') {
                return 'dialog';
            }
            else {
                return 'first-tabbable';
            }
        }
        return value;
    }
    set autoFocus(value) {
        if (value === 'true' || value === 'false' || value == null) {
            value = coerceBooleanProperty(value);
        }
        this._autoFocus = value;
    }
    /**
     * Whether the drawer is opened. We overload this because we trigger an event when it
     * starts or end.
     */
    get opened() {
        return this._opened;
    }
    set opened(value) {
        this.toggle(coerceBooleanProperty(value));
    }
    constructor(_elementRef, _focusTrapFactory, _focusMonitor, _platform, _ngZone, _interactivityChecker, _doc, _container) {
        this._elementRef = _elementRef;
        this._focusTrapFactory = _focusTrapFactory;
        this._focusMonitor = _focusMonitor;
        this._platform = _platform;
        this._ngZone = _ngZone;
        this._interactivityChecker = _interactivityChecker;
        this._doc = _doc;
        this._container = _container;
        this._elementFocusedBeforeDrawerWasOpened = null;
        /** Whether the drawer is initialized. Used for disabling the initial animation. */
        this._enableAnimations = false;
        this._position = 'start';
        this._mode = 'over';
        this._disableClose = false;
        this._opened = false;
        /** Emits whenever the drawer has started animating. */
        this._animationStarted = new Subject();
        /** Emits whenever the drawer is done animating. */
        this._animationEnd = new Subject();
        /** Current state of the sidenav animation. */
        this._animationState = 'void';
        /** Event emitted when the drawer open state is changed. */
        this.openedChange = 
        // Note this has to be async in order to avoid some issues with two-bindings (see #8872).
        new EventEmitter(/* isAsync */ true);
        /** Event emitted when the drawer has been opened. */
        this._openedStream = this.openedChange.pipe(filter(o => o), map(() => { }));
        /** Event emitted when the drawer has started opening. */
        this.openedStart = this._animationStarted.pipe(filter(e => e.fromState !== e.toState && e.toState.indexOf('open') === 0), mapTo(undefined));
        /** Event emitted when the drawer has been closed. */
        this._closedStream = this.openedChange.pipe(filter(o => !o), map(() => { }));
        /** Event emitted when the drawer has started closing. */
        this.closedStart = this._animationStarted.pipe(filter(e => e.fromState !== e.toState && e.toState === 'void'), mapTo(undefined));
        /** Emits when the component is destroyed. */
        this._destroyed = new Subject();
        /** Event emitted when the drawer's position changes. */
        // tslint:disable-next-line:no-output-on-prefix
        this.onPositionChanged = new EventEmitter();
        /**
         * An observable that emits when the drawer mode changes. This is used by the drawer container to
         * to know when to when the mode changes so it can adapt the margins on the content.
         */
        this._modeChanged = new Subject();
        this.openedChange.subscribe((opened) => {
            if (opened) {
                if (this._doc) {
                    this._elementFocusedBeforeDrawerWasOpened = this._doc.activeElement;
                }
                this._takeFocus();
            }
            else if (this._isFocusWithinDrawer()) {
                this._restoreFocus(this._openedVia || 'program');
            }
        });
        /**
         * Listen to `keydown` events outside the zone so that change detection is not run every
         * time a key is pressed. Instead we re-enter the zone only if the `ESC` key is pressed
         * and we don't have close disabled.
         */
        this._ngZone.runOutsideAngular(() => {
            fromEvent(this._elementRef.nativeElement, 'keydown')
                .pipe(filter(event => {
                return event.keyCode === ESCAPE && !this.disableClose && !hasModifierKey(event);
            }), takeUntil(this._destroyed))
                .subscribe(event => this._ngZone.run(() => {
                this.close();
                event.stopPropagation();
                event.preventDefault();
            }));
        });
        // We need a Subject with distinctUntilChanged, because the `done` event
        // fires twice on some browsers. See https://github.com/angular/angular/issues/24084
        this._animationEnd
            .pipe(distinctUntilChanged((x, y) => {
            return x.fromState === y.fromState && x.toState === y.toState;
        }))
            .subscribe((event) => {
            const { fromState, toState } = event;
            if ((toState.indexOf('open') === 0 && fromState === 'void') ||
                (toState === 'void' && fromState.indexOf('open') === 0)) {
                this.openedChange.emit(this._opened);
            }
        });
    }
    /**
     * Focuses the provided element. If the element is not focusable, it will add a tabIndex
     * attribute to forcefully focus it. The attribute is removed after focus is moved.
     * @param element The element to focus.
     */
    _forceFocus(element, options) {
        if (!this._interactivityChecker.isFocusable(element)) {
            element.tabIndex = -1;
            // The tabindex attribute should be removed to avoid navigating to that element again
            this._ngZone.runOutsideAngular(() => {
                const callback = () => {
                    element.removeEventListener('blur', callback);
                    element.removeEventListener('mousedown', callback);
                    element.removeAttribute('tabindex');
                };
                element.addEventListener('blur', callback);
                element.addEventListener('mousedown', callback);
            });
        }
        element.focus(options);
    }
    /**
     * Focuses the first element that matches the given selector within the focus trap.
     * @param selector The CSS selector for the element to set focus to.
     */
    _focusByCssSelector(selector, options) {
        let elementToFocus = this._elementRef.nativeElement.querySelector(selector);
        if (elementToFocus) {
            this._forceFocus(elementToFocus, options);
        }
    }
    /**
     * Moves focus into the drawer. Note that this works even if
     * the focus trap is disabled in `side` mode.
     */
    _takeFocus() {
        if (!this._focusTrap) {
            return;
        }
        const element = this._elementRef.nativeElement;
        // When autoFocus is not on the sidenav, if the element cannot be focused or does
        // not exist, focus the sidenav itself so the keyboard navigation still works.
        // We need to check that `focus` is a function due to Universal.
        switch (this.autoFocus) {
            case false:
            case 'dialog':
                return;
            case true:
            case 'first-tabbable':
                this._focusTrap.focusInitialElementWhenReady().then(hasMovedFocus => {
                    if (!hasMovedFocus && typeof this._elementRef.nativeElement.focus === 'function') {
                        element.focus();
                    }
                });
                break;
            case 'first-heading':
                this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]');
                break;
            default:
                this._focusByCssSelector(this.autoFocus);
                break;
        }
    }
    /**
     * Restores focus to the element that was originally focused when the drawer opened.
     * If no element was focused at that time, the focus will be restored to the drawer.
     */
    _restoreFocus(focusOrigin) {
        if (this.autoFocus === 'dialog') {
            return;
        }
        if (this._elementFocusedBeforeDrawerWasOpened) {
            this._focusMonitor.focusVia(this._elementFocusedBeforeDrawerWasOpened, focusOrigin);
        }
        else {
            this._elementRef.nativeElement.blur();
        }
        this._elementFocusedBeforeDrawerWasOpened = null;
    }
    /** Whether focus is currently within the drawer. */
    _isFocusWithinDrawer() {
        const activeEl = this._doc.activeElement;
        return !!activeEl && this._elementRef.nativeElement.contains(activeEl);
    }
    ngAfterViewInit() {
        this._isAttached = true;
        this._focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement);
        this._updateFocusTrapState();
        // Only update the DOM position when the sidenav is positioned at
        // the end since we project the sidenav before the content by default.
        if (this._position === 'end') {
            this._updatePositionInParent('end');
        }
    }
    ngAfterContentChecked() {
        // Enable the animations after the lifecycle hooks have run, in order to avoid animating
        // drawers that are open by default. When we're on the server, we shouldn't enable the
        // animations, because we don't want the drawer to animate the first time the user sees
        // the page.
        if (this._platform.isBrowser) {
            this._enableAnimations = true;
        }
    }
    ngOnDestroy() {
        if (this._focusTrap) {
            this._focusTrap.destroy();
        }
        this._anchor?.remove();
        this._anchor = null;
        this._animationStarted.complete();
        this._animationEnd.complete();
        this._modeChanged.complete();
        this._destroyed.next();
        this._destroyed.complete();
    }
    /**
     * Open the drawer.
     * @param openedVia Whether the drawer was opened by a key press, mouse click or programmatically.
     * Used for focus management after the sidenav is closed.
     */
    open(openedVia) {
        return this.toggle(true, openedVia);
    }
    /** Close the drawer. */
    close() {
        return this.toggle(false);
    }
    /** Closes the drawer with context that the backdrop was clicked. */
    _closeViaBackdropClick() {
        // If the drawer is closed upon a backdrop click, we always want to restore focus. We
        // don't need to check whether focus is currently in the drawer, as clicking on the
        // backdrop causes blurs the active element.
        return this._setOpen(/* isOpen */ false, /* restoreFocus */ true, 'mouse');
    }
    /**
     * Toggle this drawer.
     * @param isOpen Whether the drawer should be open.
     * @param openedVia Whether the drawer was opened by a key press, mouse click or programmatically.
     * Used for focus management after the sidenav is closed.
     */
    toggle(isOpen = !this.opened, openedVia) {
        // If the focus is currently inside the drawer content and we are closing the drawer,
        // restore the focus to the initially focused element (when the drawer opened).
        if (isOpen && openedVia) {
            this._openedVia = openedVia;
        }
        const result = this._setOpen(isOpen, 
        /* restoreFocus */ !isOpen && this._isFocusWithinDrawer(), this._openedVia || 'program');
        if (!isOpen) {
            this._openedVia = null;
        }
        return result;
    }
    /**
     * Toggles the opened state of the drawer.
     * @param isOpen Whether the drawer should open or close.
     * @param restoreFocus Whether focus should be restored on close.
     * @param focusOrigin Origin to use when restoring focus.
     */
    _setOpen(isOpen, restoreFocus, focusOrigin) {
        this._opened = isOpen;
        if (isOpen) {
            this._animationState = this._enableAnimations ? 'open' : 'open-instant';
        }
        else {
            this._animationState = 'void';
            if (restoreFocus) {
                this._restoreFocus(focusOrigin);
            }
        }
        this._updateFocusTrapState();
        return new Promise(resolve => {
            this.openedChange.pipe(take(1)).subscribe(open => resolve(open ? 'open' : 'close'));
        });
    }
    _getWidth() {
        return this._elementRef.nativeElement ? this._elementRef.nativeElement.offsetWidth || 0 : 0;
    }
    /** Updates the enabled state of the focus trap. */
    _updateFocusTrapState() {
        if (this._focusTrap) {
            // Trap focus only if the backdrop is enabled. Otherwise, allow end user to interact with the
            // sidenav content.
            this._focusTrap.enabled = !!this._container?.hasBackdrop;
        }
    }
    /**
     * Updates the position of the drawer in the DOM. We need to move the element around ourselves
     * when it's in the `end` position so that it comes after the content and the visual order
     * matches the tab order. We also need to be able to move it back to `start` if the sidenav
     * started off as `end` and was changed to `start`.
     */
    _updatePositionInParent(newPosition) {
        const element = this._elementRef.nativeElement;
        const parent = element.parentNode;
        if (newPosition === 'end') {
            if (!this._anchor) {
                this._anchor = this._doc.createComment('mat-drawer-anchor');
                parent.insertBefore(this._anchor, element);
            }
            parent.appendChild(element);
        }
        else if (this._anchor) {
            this._anchor.parentNode.insertBefore(element, this._anchor);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0-next.2", ngImport: i0, type: MatDrawer, deps: [{ token: i0.ElementRef }, { token: i2.FocusTrapFactory }, { token: i2.FocusMonitor }, { token: i3.Platform }, { token: i0.NgZone }, { token: i2.InteractivityChecker }, { token: DOCUMENT, optional: true }, { token: MAT_DRAWER_CONTAINER, optional: true }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0-next.2", type: MatDrawer, isStandalone: true, selector: "mat-drawer", inputs: { position: "position", mode: "mode", disableClose: "disableClose", autoFocus: "autoFocus", opened: "opened" }, outputs: { openedChange: "openedChange", _openedStream: "opened", openedStart: "openedStart", _closedStream: "closed", closedStart: "closedStart", onPositionChanged: "positionChanged" }, host: { attributes: { "tabIndex": "-1", "ngSkipHydration": "" }, listeners: { "@transform.start": "_animationStarted.next($event)", "@transform.done": "_animationEnd.next($event)" }, properties: { "attr.align": "null", "class.mat-drawer-end": "position === \"end\"", "class.mat-drawer-over": "mode === \"over\"", "class.mat-drawer-push": "mode === \"push\"", "class.mat-drawer-side": "mode === \"side\"", "class.mat-drawer-opened": "opened", "@transform": "_animationState" }, classAttribute: "mat-drawer" }, viewQueries: [{ propertyName: "_content", first: true, predicate: ["content"], descendants: true }], exportAs: ["matDrawer"], ngImport: i0, template: "<div class=\"mat-drawer-inner-container\" cdkScrollable #content>\r\n  <ng-content></ng-content>\r\n</div>\r\n", dependencies: [{ kind: "directive", type: CdkScrollable, selector: "[cdk-scrollable], [cdkScrollable]" }], animations: [matDrawerAnimations.transformDrawer], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0-next.2", ngImport: i0, type: MatDrawer, decorators: [{
            type: Component,
            args: [{ selector: 'mat-drawer', exportAs: 'matDrawer', animations: [matDrawerAnimations.transformDrawer], host: {
                        'class': 'mat-drawer',
                        // must prevent the browser from aligning text based on value
                        '[attr.align]': 'null',
                        '[class.mat-drawer-end]': 'position === "end"',
                        '[class.mat-drawer-over]': 'mode === "over"',
                        '[class.mat-drawer-push]': 'mode === "push"',
                        '[class.mat-drawer-side]': 'mode === "side"',
                        '[class.mat-drawer-opened]': 'opened',
                        'tabIndex': '-1',
                        '[@transform]': '_animationState',
                        '(@transform.start)': '_animationStarted.next($event)',
                        '(@transform.done)': '_animationEnd.next($event)',
                        'ngSkipHydration': '',
                    }, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, standalone: true, imports: [CdkScrollable], template: "<div class=\"mat-drawer-inner-container\" cdkScrollable #content>\r\n  <ng-content></ng-content>\r\n</div>\r\n" }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i2.FocusTrapFactory }, { type: i2.FocusMonitor }, { type: i3.Platform }, { type: i0.NgZone }, { type: i2.InteractivityChecker }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: MatDrawerContainer, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MAT_DRAWER_CONTAINER]
                }] }], propDecorators: { position: [{
                type: Input
            }], mode: [{
                type: Input
            }], disableClose: [{
                type: Input
            }], autoFocus: [{
                type: Input
            }], opened: [{
                type: Input
            }], openedChange: [{
                type: Output
            }], _openedStream: [{
                type: Output,
                args: ['opened']
            }], openedStart: [{
                type: Output
            }], _closedStream: [{
                type: Output,
                args: ['closed']
            }], closedStart: [{
                type: Output
            }], onPositionChanged: [{
                type: Output,
                args: ['positionChanged']
            }], _content: [{
                type: ViewChild,
                args: ['content']
            }] } });
/**
 * `<mat-drawer-container>` component.
 *
 * This is the parent component to one or two `<mat-drawer>`s that validates the state internally
 * and coordinates the backdrop and content styling.
 */
export class MatDrawerContainer {
    /** The drawer child with the `start` position. */
    get start() {
        return this._start;
    }
    /** The drawer child with the `end` position. */
    get end() {
        return this._end;
    }
    /**
     * Whether to automatically resize the container whenever
     * the size of any of its drawers changes.
     *
     * **Use at your own risk!** Enabling this option can cause layout thrashing by measuring
     * the drawers on every change detection cycle. Can be configured globally via the
     * `MAT_DRAWER_DEFAULT_AUTOSIZE` token.
     */
    get autosize() {
        return this._autosize;
    }
    set autosize(value) {
        this._autosize = coerceBooleanProperty(value);
    }
    /**
     * Whether the drawer container should have a backdrop while one of the sidenavs is open.
     * If explicitly set to `true`, the backdrop will be enabled for drawers in the `side`
     * mode as well.
     */
    get hasBackdrop() {
        return this._drawerHasBackdrop(this._start) || this._drawerHasBackdrop(this._end);
    }
    set hasBackdrop(value) {
        this._backdropOverride = value == null ? null : coerceBooleanProperty(value);
    }
    /** Reference to the CdkScrollable instance that wraps the scrollable content. */
    get scrollable() {
        return this._userContent || this._content;
    }
    constructor(_dir, _element, _ngZone, _changeDetectorRef, viewportRuler, defaultAutosize = false, _animationMode) {
        this._dir = _dir;
        this._element = _element;
        this._ngZone = _ngZone;
        this._changeDetectorRef = _changeDetectorRef;
        this._animationMode = _animationMode;
        /** Drawers that belong to this container. */
        this._drawers = new QueryList();
        /** Event emitted when the drawer backdrop is clicked. */
        this.backdropClick = new EventEmitter();
        /** Emits when the component is destroyed. */
        this._destroyed = new Subject();
        /** Emits on every ngDoCheck. Used for debouncing reflows. */
        this._doCheckSubject = new Subject();
        /**
         * Margins to be applied to the content. These are used to push / shrink the drawer content when a
         * drawer is open. We use margin rather than transform even for push mode because transform breaks
         * fixed position elements inside of the transformed element.
         */
        this._contentMargins = { left: null, right: null };
        this._contentMarginChanges = new Subject();
        // If a `Dir` directive exists up the tree, listen direction changes
        // and update the left/right properties to point to the proper start/end.
        if (_dir) {
            _dir.change.pipe(takeUntil(this._destroyed)).subscribe(() => {
                this._validateDrawers();
                this.updateContentMargins();
            });
        }
        // Since the minimum width of the sidenav depends on the viewport width,
        // we need to recompute the margins if the viewport changes.
        viewportRuler
            .change()
            .pipe(takeUntil(this._destroyed))
            .subscribe(() => this.updateContentMargins());
        this._autosize = defaultAutosize;
    }
    ngAfterContentInit() {
        this._allDrawers.changes
            .pipe(startWith(this._allDrawers), takeUntil(this._destroyed))
            .subscribe((drawer) => {
            this._drawers.reset(drawer.filter(item => !item._container || item._container === this));
            this._drawers.notifyOnChanges();
        });
        this._drawers.changes.pipe(startWith(null)).subscribe(() => {
            this._validateDrawers();
            this._drawers.forEach((drawer) => {
                this._watchDrawerToggle(drawer);
                this._watchDrawerPosition(drawer);
                this._watchDrawerMode(drawer);
            });
            if (!this._drawers.length ||
                this._isDrawerOpen(this._start) ||
                this._isDrawerOpen(this._end)) {
                this.updateContentMargins();
            }
            this._changeDetectorRef.markForCheck();
        });
        // Avoid hitting the NgZone through the debounce timeout.
        this._ngZone.runOutsideAngular(() => {
            this._doCheckSubject
                .pipe(debounceTime(10), // Arbitrary debounce time, less than a frame at 60fps
            takeUntil(this._destroyed))
                .subscribe(() => this.updateContentMargins());
        });
    }
    ngOnDestroy() {
        this._contentMarginChanges.complete();
        this._doCheckSubject.complete();
        this._drawers.destroy();
        this._destroyed.next();
        this._destroyed.complete();
    }
    /** Calls `open` of both start and end drawers */
    open() {
        this._drawers.forEach(drawer => drawer.open());
    }
    /** Calls `close` of both start and end drawers */
    close() {
        this._drawers.forEach(drawer => drawer.close());
    }
    /**
     * Recalculates and updates the inline styles for the content. Note that this should be used
     * sparingly, because it causes a reflow.
     */
    updateContentMargins() {
        // 1. For drawers in `over` mode, they don't affect the content.
        // 2. For drawers in `side` mode they should shrink the content. We do this by adding to the
        //    left margin (for left drawer) or right margin (for right the drawer).
        // 3. For drawers in `push` mode the should shift the content without resizing it. We do this by
        //    adding to the left or right margin and simultaneously subtracting the same amount of
        //    margin from the other side.
        let left = 0;
        let right = 0;
        if (this._left && this._left.opened) {
            if (this._left.mode == 'side') {
                left += this._left._getWidth();
            }
            else if (this._left.mode == 'push') {
                const width = this._left._getWidth();
                left += width;
                right -= width;
            }
        }
        if (this._right && this._right.opened) {
            if (this._right.mode == 'side') {
                right += this._right._getWidth();
            }
            else if (this._right.mode == 'push') {
                const width = this._right._getWidth();
                right += width;
                left -= width;
            }
        }
        // If either `right` or `left` is zero, don't set a style to the element. This
        // allows users to specify a custom size via CSS class in SSR scenarios where the
        // measured widths will always be zero. Note that we reset to `null` here, rather
        // than below, in order to ensure that the types in the `if` below are consistent.
        left = left || null;
        right = right || null;
        if (left !== this._contentMargins.left || right !== this._contentMargins.right) {
            this._contentMargins = { left, right };
            // Pull back into the NgZone since in some cases we could be outside. We need to be careful
            // to do it only when something changed, otherwise we can end up hitting the zone too often.
            this._ngZone.run(() => this._contentMarginChanges.next(this._contentMargins));
        }
    }
    ngDoCheck() {
        // If users opted into autosizing, do a check every change detection cycle.
        if (this._autosize && this._isPushed()) {
            // Run outside the NgZone, otherwise the debouncer will throw us into an infinite loop.
            this._ngZone.runOutsideAngular(() => this._doCheckSubject.next());
        }
    }
    /**
     * Subscribes to drawer events in order to set a class on the main container element when the
     * drawer is open and the backdrop is visible. This ensures any overflow on the container element
     * is properly hidden.
     */
    _watchDrawerToggle(drawer) {
        drawer._animationStarted
            .pipe(filter((event) => event.fromState !== event.toState), takeUntil(this._drawers.changes))
            .subscribe((event) => {
            // Set the transition class on the container so that the animations occur. This should not
            // be set initially because animations should only be triggered via a change in state.
            if (event.toState !== 'open-instant' && this._animationMode !== 'NoopAnimations') {
                this._element.nativeElement.classList.add('mat-drawer-transition');
            }
            this.updateContentMargins();
            this._changeDetectorRef.markForCheck();
        });
        if (drawer.mode !== 'side') {
            drawer.openedChange
                .pipe(takeUntil(this._drawers.changes))
                .subscribe(() => this._setContainerClass(drawer.opened));
        }
    }
    /**
     * Subscribes to drawer onPositionChanged event in order to
     * re-validate drawers when the position changes.
     */
    _watchDrawerPosition(drawer) {
        if (!drawer) {
            return;
        }
        // NOTE: We need to wait for the microtask queue to be empty before validating,
        // since both drawers may be swapping positions at the same time.
        drawer.onPositionChanged.pipe(takeUntil(this._drawers.changes)).subscribe(() => {
            this._ngZone.onMicrotaskEmpty.pipe(take(1)).subscribe(() => {
                this._validateDrawers();
            });
        });
    }
    /** Subscribes to changes in drawer mode so we can run change detection. */
    _watchDrawerMode(drawer) {
        if (drawer) {
            drawer._modeChanged
                .pipe(takeUntil(merge(this._drawers.changes, this._destroyed)))
                .subscribe(() => {
                this.updateContentMargins();
                this._changeDetectorRef.markForCheck();
            });
        }
    }
    /** Toggles the 'mat-drawer-opened' class on the main 'mat-drawer-container' element. */
    _setContainerClass(isAdd) {
        const classList = this._element.nativeElement.classList;
        const className = 'mat-drawer-container-has-open';
        if (isAdd) {
            classList.add(className);
        }
        else {
            classList.remove(className);
        }
    }
    /** Validate the state of the drawer children components. */
    _validateDrawers() {
        this._start = this._end = null;
        // Ensure that we have at most one start and one end drawer.
        this._drawers.forEach(drawer => {
            if (drawer.position == 'end') {
                if (this._end != null && (typeof ngDevMode === 'undefined' || ngDevMode)) {
                    throwMatDuplicatedDrawerError('end');
                }
                this._end = drawer;
            }
            else {
                if (this._start != null && (typeof ngDevMode === 'undefined' || ngDevMode)) {
                    throwMatDuplicatedDrawerError('start');
                }
                this._start = drawer;
            }
        });
        this._right = this._left = null;
        // Detect if we're LTR or RTL.
        if (this._dir && this._dir.value === 'rtl') {
            this._left = this._end;
            this._right = this._start;
        }
        else {
            this._left = this._start;
            this._right = this._end;
        }
    }
    /** Whether the container is being pushed to the side by one of the drawers. */
    _isPushed() {
        return ((this._isDrawerOpen(this._start) && this._start.mode != 'over') ||
            (this._isDrawerOpen(this._end) && this._end.mode != 'over'));
    }
    _onBackdropClicked() {
        this.backdropClick.emit();
        this._closeModalDrawersViaBackdrop();
    }
    _closeModalDrawersViaBackdrop() {
        // Close all open drawers where closing is not disabled and the mode is not `side`.
        [this._start, this._end]
            .filter(drawer => drawer && !drawer.disableClose && this._drawerHasBackdrop(drawer))
            .forEach(drawer => drawer._closeViaBackdropClick());
    }
    _isShowingBackdrop() {
        return ((this._isDrawerOpen(this._start) && this._drawerHasBackdrop(this._start)) ||
            (this._isDrawerOpen(this._end) && this._drawerHasBackdrop(this._end)));
    }
    _isDrawerOpen(drawer) {
        return drawer != null && drawer.opened;
    }
    // Whether argument drawer should have a backdrop when it opens
    _drawerHasBackdrop(drawer) {
        if (this._backdropOverride == null) {
            return !!drawer && drawer.mode !== 'side';
        }
        return this._backdropOverride;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0-next.2", ngImport: i0, type: MatDrawerContainer, deps: [{ token: i4.Directionality, optional: true }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: i1.ViewportRuler }, { token: MAT_DRAWER_DEFAULT_AUTOSIZE }, { token: ANIMATION_MODULE_TYPE, optional: true }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.1.0-next.2", type: MatDrawerContainer, isStandalone: true, selector: "mat-drawer-container", inputs: { autosize: "autosize", hasBackdrop: "hasBackdrop" }, outputs: { backdropClick: "backdropClick" }, host: { attributes: { "ngSkipHydration": "" }, properties: { "class.mat-drawer-container-explicit-backdrop": "_backdropOverride" }, classAttribute: "mat-drawer-container" }, providers: [
            {
                provide: MAT_DRAWER_CONTAINER,
                useExisting: MatDrawerContainer,
            },
        ], queries: [{ propertyName: "_content", first: true, predicate: MatDrawerContent, descendants: true }, { propertyName: "_allDrawers", predicate: MatDrawer, descendants: true }], viewQueries: [{ propertyName: "_userContent", first: true, predicate: MatDrawerContent, descendants: true }], exportAs: ["matDrawerContainer"], ngImport: i0, template: "@if (hasBackdrop) {\n  <div class=\"mat-drawer-backdrop\" (click)=\"_onBackdropClicked()\"\n       [class.mat-drawer-shown]=\"_isShowingBackdrop()\"></div>\n}\n\n<ng-content select=\"mat-drawer\"></ng-content>\n\n<ng-content select=\"mat-drawer-content\">\n</ng-content>\n\n@if (!_content) {\n  <mat-drawer-content>\n    <ng-content></ng-content>\n  </mat-drawer-content>\n}\n", styles: [".mat-drawer-container{position:relative;z-index:1;color:var(--mat-sidenav-content-text-color);background-color:var(--mat-sidenav-content-background-color);box-sizing:border-box;-webkit-overflow-scrolling:touch;display:block;overflow:hidden}.mat-drawer-container[fullscreen]{top:0;left:0;right:0;bottom:0;position:absolute}.mat-drawer-container[fullscreen].mat-drawer-container-has-open{overflow:hidden}.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side{z-index:3}.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,.mat-drawer-container.ng-animate-disabled .mat-drawer-content,.ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,.ng-animate-disabled .mat-drawer-container .mat-drawer-content{transition:none}.mat-drawer-backdrop{top:0;left:0;right:0;bottom:0;position:absolute;display:block;z-index:3;visibility:hidden}.mat-drawer-backdrop.mat-drawer-shown{visibility:visible;background-color:var(--mat-sidenav-scrim-color)}.mat-drawer-transition .mat-drawer-backdrop{transition-duration:400ms;transition-timing-function:cubic-bezier(0.25, 0.8, 0.25, 1);transition-property:background-color,visibility}.cdk-high-contrast-active .mat-drawer-backdrop{opacity:.5}.mat-drawer-content{position:relative;z-index:1;display:block;height:100%;overflow:auto}.mat-drawer-transition .mat-drawer-content{transition-duration:400ms;transition-timing-function:cubic-bezier(0.25, 0.8, 0.25, 1);transition-property:transform,margin-left,margin-right}.mat-drawer{box-shadow:0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12);position:relative;z-index:4;color:var(--mat-sidenav-container-text-color);background-color:var(--mat-sidenav-container-background-color);border-top-right-radius:var(--mat-sidenav-container-shape);border-bottom-right-radius:var(--mat-sidenav-container-shape);display:block;position:absolute;top:0;bottom:0;z-index:3;outline:0;box-sizing:border-box;overflow-y:auto;transform:translate3d(-100%, 0, 0)}.cdk-high-contrast-active .mat-drawer,.cdk-high-contrast-active [dir=rtl] .mat-drawer.mat-drawer-end{border-right:solid 1px currentColor}.cdk-high-contrast-active [dir=rtl] .mat-drawer,.cdk-high-contrast-active .mat-drawer.mat-drawer-end{border-left:solid 1px currentColor;border-right:none}.mat-drawer.mat-drawer-side{z-index:2}.mat-drawer.mat-drawer-end{right:0;transform:translate3d(100%, 0, 0);border-top-left-radius:var(--mat-sidenav-container-shape);border-bottom-left-radius:var(--mat-sidenav-container-shape);border-top-right-radius:0;border-bottom-right-radius:0}[dir=rtl] .mat-drawer{border-top-left-radius:var(--mat-sidenav-container-shape);border-bottom-left-radius:var(--mat-sidenav-container-shape);border-top-right-radius:0;border-bottom-right-radius:0;transform:translate3d(100%, 0, 0)}[dir=rtl] .mat-drawer.mat-drawer-end{border-top-right-radius:var(--mat-sidenav-container-shape);border-bottom-right-radius:var(--mat-sidenav-container-shape);border-top-left-radius:0;border-bottom-left-radius:0;left:0;right:auto;transform:translate3d(-100%, 0, 0)}.mat-drawer[style*=\"visibility: hidden\"]{display:none}.mat-drawer-side{box-shadow:none;border-right-color:var(--mat-sidenav-container-divider-color);border-right-width:1px;border-right-style:solid}.mat-drawer-side.mat-drawer-end{border-left-color:var(--mat-sidenav-container-divider-color);border-left-width:1px;border-left-style:solid;border-right:none}[dir=rtl] .mat-drawer-side{border-left-color:var(--mat-sidenav-container-divider-color);border-left-width:1px;border-left-style:solid;border-right:none}[dir=rtl] .mat-drawer-side.mat-drawer-end{border-right-color:var(--mat-sidenav-container-divider-color);border-right-width:1px;border-right-style:solid;border-left:none}.mat-drawer-inner-container{width:100%;height:100%;overflow:auto;-webkit-overflow-scrolling:touch}.mat-sidenav-fixed{position:fixed}"], dependencies: [{ kind: "component", type: MatDrawerContent, selector: "mat-drawer-content" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0-next.2", ngImport: i0, type: MatDrawerContainer, decorators: [{
            type: Component,
            args: [{ selector: 'mat-drawer-container', exportAs: 'matDrawerContainer', host: {
                        'class': 'mat-drawer-container',
                        '[class.mat-drawer-container-explicit-backdrop]': '_backdropOverride',
                        'ngSkipHydration': '',
                    }, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, providers: [
                        {
                            provide: MAT_DRAWER_CONTAINER,
                            useExisting: MatDrawerContainer,
                        },
                    ], standalone: true, imports: [MatDrawerContent], template: "@if (hasBackdrop) {\n  <div class=\"mat-drawer-backdrop\" (click)=\"_onBackdropClicked()\"\n       [class.mat-drawer-shown]=\"_isShowingBackdrop()\"></div>\n}\n\n<ng-content select=\"mat-drawer\"></ng-content>\n\n<ng-content select=\"mat-drawer-content\">\n</ng-content>\n\n@if (!_content) {\n  <mat-drawer-content>\n    <ng-content></ng-content>\n  </mat-drawer-content>\n}\n", styles: [".mat-drawer-container{position:relative;z-index:1;color:var(--mat-sidenav-content-text-color);background-color:var(--mat-sidenav-content-background-color);box-sizing:border-box;-webkit-overflow-scrolling:touch;display:block;overflow:hidden}.mat-drawer-container[fullscreen]{top:0;left:0;right:0;bottom:0;position:absolute}.mat-drawer-container[fullscreen].mat-drawer-container-has-open{overflow:hidden}.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side{z-index:3}.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,.mat-drawer-container.ng-animate-disabled .mat-drawer-content,.ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,.ng-animate-disabled .mat-drawer-container .mat-drawer-content{transition:none}.mat-drawer-backdrop{top:0;left:0;right:0;bottom:0;position:absolute;display:block;z-index:3;visibility:hidden}.mat-drawer-backdrop.mat-drawer-shown{visibility:visible;background-color:var(--mat-sidenav-scrim-color)}.mat-drawer-transition .mat-drawer-backdrop{transition-duration:400ms;transition-timing-function:cubic-bezier(0.25, 0.8, 0.25, 1);transition-property:background-color,visibility}.cdk-high-contrast-active .mat-drawer-backdrop{opacity:.5}.mat-drawer-content{position:relative;z-index:1;display:block;height:100%;overflow:auto}.mat-drawer-transition .mat-drawer-content{transition-duration:400ms;transition-timing-function:cubic-bezier(0.25, 0.8, 0.25, 1);transition-property:transform,margin-left,margin-right}.mat-drawer{box-shadow:0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12);position:relative;z-index:4;color:var(--mat-sidenav-container-text-color);background-color:var(--mat-sidenav-container-background-color);border-top-right-radius:var(--mat-sidenav-container-shape);border-bottom-right-radius:var(--mat-sidenav-container-shape);display:block;position:absolute;top:0;bottom:0;z-index:3;outline:0;box-sizing:border-box;overflow-y:auto;transform:translate3d(-100%, 0, 0)}.cdk-high-contrast-active .mat-drawer,.cdk-high-contrast-active [dir=rtl] .mat-drawer.mat-drawer-end{border-right:solid 1px currentColor}.cdk-high-contrast-active [dir=rtl] .mat-drawer,.cdk-high-contrast-active .mat-drawer.mat-drawer-end{border-left:solid 1px currentColor;border-right:none}.mat-drawer.mat-drawer-side{z-index:2}.mat-drawer.mat-drawer-end{right:0;transform:translate3d(100%, 0, 0);border-top-left-radius:var(--mat-sidenav-container-shape);border-bottom-left-radius:var(--mat-sidenav-container-shape);border-top-right-radius:0;border-bottom-right-radius:0}[dir=rtl] .mat-drawer{border-top-left-radius:var(--mat-sidenav-container-shape);border-bottom-left-radius:var(--mat-sidenav-container-shape);border-top-right-radius:0;border-bottom-right-radius:0;transform:translate3d(100%, 0, 0)}[dir=rtl] .mat-drawer.mat-drawer-end{border-top-right-radius:var(--mat-sidenav-container-shape);border-bottom-right-radius:var(--mat-sidenav-container-shape);border-top-left-radius:0;border-bottom-left-radius:0;left:0;right:auto;transform:translate3d(-100%, 0, 0)}.mat-drawer[style*=\"visibility: hidden\"]{display:none}.mat-drawer-side{box-shadow:none;border-right-color:var(--mat-sidenav-container-divider-color);border-right-width:1px;border-right-style:solid}.mat-drawer-side.mat-drawer-end{border-left-color:var(--mat-sidenav-container-divider-color);border-left-width:1px;border-left-style:solid;border-right:none}[dir=rtl] .mat-drawer-side{border-left-color:var(--mat-sidenav-container-divider-color);border-left-width:1px;border-left-style:solid;border-right:none}[dir=rtl] .mat-drawer-side.mat-drawer-end{border-right-color:var(--mat-sidenav-container-divider-color);border-right-width:1px;border-right-style:solid;border-left:none}.mat-drawer-inner-container{width:100%;height:100%;overflow:auto;-webkit-overflow-scrolling:touch}.mat-sidenav-fixed{position:fixed}"] }]
        }], ctorParameters: () => [{ type: i4.Directionality, decorators: [{
                    type: Optional
                }] }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: i1.ViewportRuler }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MAT_DRAWER_DEFAULT_AUTOSIZE]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [ANIMATION_MODULE_TYPE]
                }] }], propDecorators: { _allDrawers: [{
                type: ContentChildren,
                args: [MatDrawer, {
                        // We need to use `descendants: true`, because Ivy will no longer match
                        // indirect descendants if it's left as false.
                        descendants: true,
                    }]
            }], _content: [{
                type: ContentChild,
                args: [MatDrawerContent]
            }], _userContent: [{
                type: ViewChild,
                args: [MatDrawerContent]
            }], autosize: [{
                type: Input
            }], hasBackdrop: [{
                type: Input
            }], backdropClick: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3NpZGVuYXYvZHJhd2VyLnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3NpZGVuYXYvZHJhd2VyLmh0bWwiLCIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvc2lkZW5hdi9kcmF3ZXItY29udGFpbmVyLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBUUEsT0FBTyxFQUNMLFlBQVksRUFHWixnQkFBZ0IsRUFDaEIsb0JBQW9CLEdBQ3JCLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBZSxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzFFLE9BQU8sRUFBQyxNQUFNLEVBQUUsY0FBYyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDN0QsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQy9DLE9BQU8sRUFBQyxhQUFhLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdEYsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFJTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osZUFBZSxFQUVmLFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixjQUFjLEVBQ2QsS0FBSyxFQUNMLE1BQU0sRUFFTixRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDM0QsT0FB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QU07MkJBQUMsMkJBQTJCOzswQkFDbEMsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxxQkFBcUI7eUNBNUYzQyxXQUFXO3NCQUxWLGVBQWU7dUJBQUMsU0FBUyxFQUFFO3dCQUMxQix1RUFBdUU7d0JBQ3ZFLDhDQUE4Qzt3QkFDOUMsV0FBVyxFQUFFLElBQUk7cUJBQ2xCO2dCQU0rQixRQUFRO3NCQUF2QyxZQUFZO3VCQUFDLGdCQUFnQjtnQkFDRCxZQUFZO3NCQUF4QyxTQUFTO3VCQUFDLGdCQUFnQjtnQkFxQnZCLFFBQVE7c0JBRFgsS0FBSztnQkFlRixXQUFXO3NCQURkLEtBQUs7Z0JBVWEsYUFBYTtzQkFBL0IsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtBbmltYXRpb25FdmVudH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge1xuICBGb2N1c01vbml0b3IsXG4gIEZvY3VzT3JpZ2luLFxuICBGb2N1c1RyYXAsXG4gIEZvY3VzVHJhcEZhY3RvcnksXG4gIEludGVyYWN0aXZpdHlDaGVja2VyLFxufSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge0RpcmVjdGlvbmFsaXR5fSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge0Jvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtFU0NBUEUsIGhhc01vZGlmaWVyS2V5fSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHtQbGF0Zm9ybX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7Q2RrU2Nyb2xsYWJsZSwgU2Nyb2xsRGlzcGF0Y2hlciwgVmlld3BvcnRSdWxlcn0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBEb0NoZWNrLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIEluamVjdCxcbiAgSW5qZWN0aW9uVG9rZW4sXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7ZnJvbUV2ZW50LCBtZXJnZSwgT2JzZXJ2YWJsZSwgU3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBkZWJvdW5jZVRpbWUsXG4gIGZpbHRlcixcbiAgbWFwLFxuICBzdGFydFdpdGgsXG4gIHRha2UsXG4gIHRha2VVbnRpbCxcbiAgZGlzdGluY3RVbnRpbENoYW5nZWQsXG4gIG1hcFRvLFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge21hdERyYXdlckFuaW1hdGlvbnN9IGZyb20gJy4vZHJhd2VyLWFuaW1hdGlvbnMnO1xuaW1wb3J0IHtBTklNQVRJT05fTU9EVUxFX1RZUEV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5cbi8qKlxuICogVGhyb3dzIGFuIGV4Y2VwdGlvbiB3aGVuIHR3byBNYXREcmF3ZXIgYXJlIG1hdGNoaW5nIHRoZSBzYW1lIHBvc2l0aW9uLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdGhyb3dNYXREdXBsaWNhdGVkRHJhd2VyRXJyb3IocG9zaXRpb246IHN0cmluZykge1xuICB0aHJvdyBFcnJvcihgQSBkcmF3ZXIgd2FzIGFscmVhZHkgZGVjbGFyZWQgZm9yICdwb3NpdGlvbj1cIiR7cG9zaXRpb259XCInYCk7XG59XG5cbi8qKiBPcHRpb25zIGZvciB3aGVyZSB0byBzZXQgZm9jdXMgdG8gYXV0b21hdGljYWxseSBvbiBkaWFsb2cgb3BlbiAqL1xuZXhwb3J0IHR5cGUgQXV0b0ZvY3VzVGFyZ2V0ID0gJ2RpYWxvZycgfCAnZmlyc3QtdGFiYmFibGUnIHwgJ2ZpcnN0LWhlYWRpbmcnO1xuXG4vKiogUmVzdWx0IG9mIHRoZSB0b2dnbGUgcHJvbWlzZSB0aGF0IGluZGljYXRlcyB0aGUgc3RhdGUgb2YgdGhlIGRyYXdlci4gKi9cbmV4cG9ydCB0eXBlIE1hdERyYXdlclRvZ2dsZVJlc3VsdCA9ICdvcGVuJyB8ICdjbG9zZSc7XG5cbi8qKiBEcmF3ZXIgYW5kIFNpZGVOYXYgZGlzcGxheSBtb2Rlcy4gKi9cbmV4cG9ydCB0eXBlIE1hdERyYXdlck1vZGUgPSAnb3ZlcicgfCAncHVzaCcgfCAnc2lkZSc7XG5cbi8qKiBDb25maWd1cmVzIHdoZXRoZXIgZHJhd2VycyBzaG91bGQgdXNlIGF1dG8gc2l6aW5nIGJ5IGRlZmF1bHQuICovXG5leHBvcnQgY29uc3QgTUFUX0RSQVdFUl9ERUZBVUxUX0FVVE9TSVpFID0gbmV3IEluamVjdGlvblRva2VuPGJvb2xlYW4+KFxuICAnTUFUX0RSQVdFUl9ERUZBVUxUX0FVVE9TSVpFJyxcbiAge1xuICAgIHByb3ZpZGVkSW46ICdyb290JyxcbiAgICBmYWN0b3J5OiBNQVRfRFJBV0VSX0RFRkFVTFRfQVVUT1NJWkVfRkFDVE9SWSxcbiAgfSxcbik7XG5cbi8qKlxuICogVXNlZCB0byBwcm92aWRlIGEgZHJhd2VyIGNvbnRhaW5lciB0byBhIGRyYXdlciB3aGlsZSBhdm9pZGluZyBjaXJjdWxhciByZWZlcmVuY2VzLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgY29uc3QgTUFUX0RSQVdFUl9DT05UQUlORVIgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ01BVF9EUkFXRVJfQ09OVEFJTkVSJyk7XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgZnVuY3Rpb24gTUFUX0RSQVdFUl9ERUZBVUxUX0FVVE9TSVpFX0ZBQ1RPUlkoKTogYm9vbGVhbiB7XG4gIHJldHVybiBmYWxzZTtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LWRyYXdlci1jb250ZW50JyxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtZHJhd2VyLWNvbnRlbnQnLFxuICAgICdbc3R5bGUubWFyZ2luLWxlZnQucHhdJzogJ19jb250YWluZXIuX2NvbnRlbnRNYXJnaW5zLmxlZnQnLFxuICAgICdbc3R5bGUubWFyZ2luLXJpZ2h0LnB4XSc6ICdfY29udGFpbmVyLl9jb250ZW50TWFyZ2lucy5yaWdodCcsXG4gICAgJ25nU2tpcEh5ZHJhdGlvbic6ICcnLFxuICB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogQ2RrU2Nyb2xsYWJsZSxcbiAgICAgIHVzZUV4aXN0aW5nOiBNYXREcmF3ZXJDb250ZW50LFxuICAgIH0sXG4gIF0sXG4gIHN0YW5kYWxvbmU6IHRydWUsXG59KVxuZXhwb3J0IGNsYXNzIE1hdERyYXdlckNvbnRlbnQgZXh0ZW5kcyBDZGtTY3JvbGxhYmxlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTWF0RHJhd2VyQ29udGFpbmVyKSkgcHVibGljIF9jb250YWluZXI6IE1hdERyYXdlckNvbnRhaW5lcixcbiAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBzY3JvbGxEaXNwYXRjaGVyOiBTY3JvbGxEaXNwYXRjaGVyLFxuICAgIG5nWm9uZTogTmdab25lLFxuICApIHtcbiAgICBzdXBlcihlbGVtZW50UmVmLCBzY3JvbGxEaXNwYXRjaGVyLCBuZ1pvbmUpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuX2NvbnRhaW5lci5fY29udGVudE1hcmdpbkNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICogVGhpcyBjb21wb25lbnQgY29ycmVzcG9uZHMgdG8gYSBkcmF3ZXIgdGhhdCBjYW4gYmUgb3BlbmVkIG9uIHRoZSBkcmF3ZXIgY29udGFpbmVyLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtZHJhd2VyJyxcbiAgZXhwb3J0QXM6ICdtYXREcmF3ZXInLFxuICB0ZW1wbGF0ZVVybDogJ2RyYXdlci5odG1sJyxcbiAgYW5pbWF0aW9uczogW21hdERyYXdlckFuaW1hdGlvbnMudHJhbnNmb3JtRHJhd2VyXSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtZHJhd2VyJyxcbiAgICAvLyBtdXN0IHByZXZlbnQgdGhlIGJyb3dzZXIgZnJvbSBhbGlnbmluZyB0ZXh0IGJhc2VkIG9uIHZhbHVlXG4gICAgJ1thdHRyLmFsaWduXSc6ICdudWxsJyxcbiAgICAnW2NsYXNzLm1hdC1kcmF3ZXItZW5kXSc6ICdwb3NpdGlvbiA9PT0gXCJlbmRcIicsXG4gICAgJ1tjbGFzcy5tYXQtZHJhd2VyLW92ZXJdJzogJ21vZGUgPT09IFwib3ZlclwiJyxcbiAgICAnW2NsYXNzLm1hdC1kcmF3ZXItcHVzaF0nOiAnbW9kZSA9PT0gXCJwdXNoXCInLFxuICAgICdbY2xhc3MubWF0LWRyYXdlci1zaWRlXSc6ICdtb2RlID09PSBcInNpZGVcIicsXG4gICAgJ1tjbGFzcy5tYXQtZHJhd2VyLW9wZW5lZF0nOiAnb3BlbmVkJyxcbiAgICAndGFiSW5kZXgnOiAnLTEnLFxuICAgICdbQHRyYW5zZm9ybV0nOiAnX2FuaW1hdGlvblN0YXRlJyxcbiAgICAnKEB0cmFuc2Zvcm0uc3RhcnQpJzogJ19hbmltYXRpb25TdGFydGVkLm5leHQoJGV2ZW50KScsXG4gICAgJyhAdHJhbnNmb3JtLmRvbmUpJzogJ19hbmltYXRpb25FbmQubmV4dCgkZXZlbnQpJyxcbiAgICAnbmdTa2lwSHlkcmF0aW9uJzogJycsXG4gIH0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ2RrU2Nyb2xsYWJsZV0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdERyYXdlciBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIEFmdGVyQ29udGVudENoZWNrZWQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgX2ZvY3VzVHJhcDogRm9jdXNUcmFwO1xuICBwcml2YXRlIF9lbGVtZW50Rm9jdXNlZEJlZm9yZURyYXdlcldhc09wZW5lZDogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcblxuICAvKiogV2hldGhlciB0aGUgZHJhd2VyIGlzIGluaXRpYWxpemVkLiBVc2VkIGZvciBkaXNhYmxpbmcgdGhlIGluaXRpYWwgYW5pbWF0aW9uLiAqL1xuICBwcml2YXRlIF9lbmFibGVBbmltYXRpb25zID0gZmFsc2U7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHZpZXcgb2YgdGhlIGNvbXBvbmVudCBoYXMgYmVlbiBhdHRhY2hlZC4gKi9cbiAgcHJpdmF0ZSBfaXNBdHRhY2hlZDogYm9vbGVhbjtcblxuICAvKiogQW5jaG9yIG5vZGUgdXNlZCB0byByZXN0b3JlIHRoZSBkcmF3ZXIgdG8gaXRzIGluaXRpYWwgcG9zaXRpb24uICovXG4gIHByaXZhdGUgX2FuY2hvcjogQ29tbWVudCB8IG51bGw7XG5cbiAgLyoqIFRoZSBzaWRlIHRoYXQgdGhlIGRyYXdlciBpcyBhdHRhY2hlZCB0by4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHBvc2l0aW9uKCk6ICdzdGFydCcgfCAnZW5kJyB7XG4gICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uO1xuICB9XG4gIHNldCBwb3NpdGlvbih2YWx1ZTogJ3N0YXJ0JyB8ICdlbmQnKSB7XG4gICAgLy8gTWFrZSBzdXJlIHdlIGhhdmUgYSB2YWxpZCB2YWx1ZS5cbiAgICB2YWx1ZSA9IHZhbHVlID09PSAnZW5kJyA/ICdlbmQnIDogJ3N0YXJ0JztcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX3Bvc2l0aW9uKSB7XG4gICAgICAvLyBTdGF0aWMgaW5wdXRzIGluIEl2eSBhcmUgc2V0IGJlZm9yZSB0aGUgZWxlbWVudCBpcyBpbiB0aGUgRE9NLlxuICAgICAgaWYgKHRoaXMuX2lzQXR0YWNoZWQpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlUG9zaXRpb25JblBhcmVudCh2YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3Bvc2l0aW9uID0gdmFsdWU7XG4gICAgICB0aGlzLm9uUG9zaXRpb25DaGFuZ2VkLmVtaXQoKTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBfcG9zaXRpb246ICdzdGFydCcgfCAnZW5kJyA9ICdzdGFydCc7XG5cbiAgLyoqIE1vZGUgb2YgdGhlIGRyYXdlcjsgb25lIG9mICdvdmVyJywgJ3B1c2gnIG9yICdzaWRlJy4gKi9cbiAgQElucHV0KClcbiAgZ2V0IG1vZGUoKTogTWF0RHJhd2VyTW9kZSB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGU7XG4gIH1cbiAgc2V0IG1vZGUodmFsdWU6IE1hdERyYXdlck1vZGUpIHtcbiAgICB0aGlzLl9tb2RlID0gdmFsdWU7XG4gICAgdGhpcy5fdXBkYXRlRm9jdXNUcmFwU3RhdGUoKTtcbiAgICB0aGlzLl9tb2RlQ2hhbmdlZC5uZXh0KCk7XG4gIH1cbiAgcHJpdmF0ZSBfbW9kZTogTWF0RHJhd2VyTW9kZSA9ICdvdmVyJztcblxuICAvKiogV2hldGhlciB0aGUgZHJhd2VyIGNhbiBiZSBjbG9zZWQgd2l0aCB0aGUgZXNjYXBlIGtleSBvciBieSBjbGlja2luZyBvbiB0aGUgYmFja2Ryb3AuICovXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlQ2xvc2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVDbG9zZTtcbiAgfVxuICBzZXQgZGlzYWJsZUNsb3NlKHZhbHVlOiBCb29sZWFuSW5wdXQpIHtcbiAgICB0aGlzLl9kaXNhYmxlQ2xvc2UgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2Rpc2FibGVDbG9zZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBkcmF3ZXIgc2hvdWxkIGZvY3VzIHRoZSBmaXJzdCBmb2N1c2FibGUgZWxlbWVudCBhdXRvbWF0aWNhbGx5IHdoZW4gb3BlbmVkLlxuICAgKiBEZWZhdWx0cyB0byBmYWxzZSBpbiB3aGVuIGBtb2RlYCBpcyBzZXQgdG8gYHNpZGVgLCBvdGhlcndpc2UgZGVmYXVsdHMgdG8gYHRydWVgLiBJZiBleHBsaWNpdGx5XG4gICAqIGVuYWJsZWQsIGZvY3VzIHdpbGwgYmUgbW92ZWQgaW50byB0aGUgc2lkZW5hdiBpbiBgc2lkZWAgbW9kZSBhcyB3ZWxsLlxuICAgKiBAYnJlYWtpbmctY2hhbmdlIDE0LjAuMCBSZW1vdmUgYm9vbGVhbiBvcHRpb24gZnJvbSBhdXRvRm9jdXMuIFVzZSBzdHJpbmcgb3IgQXV0b0ZvY3VzVGFyZ2V0XG4gICAqIGluc3RlYWQuXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgYXV0b0ZvY3VzKCk6IEF1dG9Gb2N1c1RhcmdldCB8IHN0cmluZyB8IGJvb2xlYW4ge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5fYXV0b0ZvY3VzO1xuXG4gICAgLy8gTm90ZSB0aGF0IHVzdWFsbHkgd2UgZG9uJ3QgYWxsb3cgYXV0b0ZvY3VzIHRvIGJlIHNldCB0byBgZmlyc3QtdGFiYmFibGVgIGluIGBzaWRlYCBtb2RlLFxuICAgIC8vIGJlY2F1c2Ugd2UgZG9uJ3Qga25vdyBob3cgdGhlIHNpZGVuYXYgaXMgYmVpbmcgdXNlZCwgYnV0IGluIHNvbWUgY2FzZXMgaXQgc3RpbGwgbWFrZXNcbiAgICAvLyBzZW5zZSB0byBkbyBpdC4gVGhlIGNvbnN1bWVyIGNhbiBleHBsaWNpdGx5IHNldCBgYXV0b0ZvY3VzYC5cbiAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgaWYgKHRoaXMubW9kZSA9PT0gJ3NpZGUnKSB7XG4gICAgICAgIHJldHVybiAnZGlhbG9nJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAnZmlyc3QtdGFiYmFibGUnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgc2V0IGF1dG9Gb2N1cyh2YWx1ZTogQXV0b0ZvY3VzVGFyZ2V0IHwgc3RyaW5nIHwgQm9vbGVhbklucHV0KSB7XG4gICAgaWYgKHZhbHVlID09PSAndHJ1ZScgfHwgdmFsdWUgPT09ICdmYWxzZScgfHwgdmFsdWUgPT0gbnVsbCkge1xuICAgICAgdmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIH1cbiAgICB0aGlzLl9hdXRvRm9jdXMgPSB2YWx1ZTtcbiAgfVxuICBwcml2YXRlIF9hdXRvRm9jdXM6IEF1dG9Gb2N1c1RhcmdldCB8IHN0cmluZyB8IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGRyYXdlciBpcyBvcGVuZWQuIFdlIG92ZXJsb2FkIHRoaXMgYmVjYXVzZSB3ZSB0cmlnZ2VyIGFuIGV2ZW50IHdoZW4gaXRcbiAgICogc3RhcnRzIG9yIGVuZC5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBvcGVuZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX29wZW5lZDtcbiAgfVxuICBzZXQgb3BlbmVkKHZhbHVlOiBCb29sZWFuSW5wdXQpIHtcbiAgICB0aGlzLnRvZ2dsZShjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpKTtcbiAgfVxuICBwcml2YXRlIF9vcGVuZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKiogSG93IHRoZSBzaWRlbmF2IHdhcyBvcGVuZWQgKGtleXByZXNzLCBtb3VzZSBjbGljayBldGMuKSAqL1xuICBwcml2YXRlIF9vcGVuZWRWaWE6IEZvY3VzT3JpZ2luIHwgbnVsbDtcblxuICAvKiogRW1pdHMgd2hlbmV2ZXIgdGhlIGRyYXdlciBoYXMgc3RhcnRlZCBhbmltYXRpbmcuICovXG4gIHJlYWRvbmx5IF9hbmltYXRpb25TdGFydGVkID0gbmV3IFN1YmplY3Q8QW5pbWF0aW9uRXZlbnQ+KCk7XG5cbiAgLyoqIEVtaXRzIHdoZW5ldmVyIHRoZSBkcmF3ZXIgaXMgZG9uZSBhbmltYXRpbmcuICovXG4gIHJlYWRvbmx5IF9hbmltYXRpb25FbmQgPSBuZXcgU3ViamVjdDxBbmltYXRpb25FdmVudD4oKTtcblxuICAvKiogQ3VycmVudCBzdGF0ZSBvZiB0aGUgc2lkZW5hdiBhbmltYXRpb24uICovXG4gIF9hbmltYXRpb25TdGF0ZTogJ29wZW4taW5zdGFudCcgfCAnb3BlbicgfCAndm9pZCcgPSAndm9pZCc7XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgZHJhd2VyIG9wZW4gc3RhdGUgaXMgY2hhbmdlZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IG9wZW5lZENoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID1cbiAgICAvLyBOb3RlIHRoaXMgaGFzIHRvIGJlIGFzeW5jIGluIG9yZGVyIHRvIGF2b2lkIHNvbWUgaXNzdWVzIHdpdGggdHdvLWJpbmRpbmdzIChzZWUgIzg4NzIpLlxuICAgIG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oLyogaXNBc3luYyAqLyB0cnVlKTtcblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBkcmF3ZXIgaGFzIGJlZW4gb3BlbmVkLiAqL1xuICBAT3V0cHV0KCdvcGVuZWQnKVxuICByZWFkb25seSBfb3BlbmVkU3RyZWFtID0gdGhpcy5vcGVuZWRDaGFuZ2UucGlwZShcbiAgICBmaWx0ZXIobyA9PiBvKSxcbiAgICBtYXAoKCkgPT4ge30pLFxuICApO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGRyYXdlciBoYXMgc3RhcnRlZCBvcGVuaW5nLiAqL1xuICBAT3V0cHV0KClcbiAgcmVhZG9ubHkgb3BlbmVkU3RhcnQ6IE9ic2VydmFibGU8dm9pZD4gPSB0aGlzLl9hbmltYXRpb25TdGFydGVkLnBpcGUoXG4gICAgZmlsdGVyKGUgPT4gZS5mcm9tU3RhdGUgIT09IGUudG9TdGF0ZSAmJiBlLnRvU3RhdGUuaW5kZXhPZignb3BlbicpID09PSAwKSxcbiAgICBtYXBUbyh1bmRlZmluZWQpLFxuICApO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGRyYXdlciBoYXMgYmVlbiBjbG9zZWQuICovXG4gIEBPdXRwdXQoJ2Nsb3NlZCcpXG4gIHJlYWRvbmx5IF9jbG9zZWRTdHJlYW0gPSB0aGlzLm9wZW5lZENoYW5nZS5waXBlKFxuICAgIGZpbHRlcihvID0+ICFvKSxcbiAgICBtYXAoKCkgPT4ge30pLFxuICApO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGRyYXdlciBoYXMgc3RhcnRlZCBjbG9zaW5nLiAqL1xuICBAT3V0cHV0KClcbiAgcmVhZG9ubHkgY2xvc2VkU3RhcnQ6IE9ic2VydmFibGU8dm9pZD4gPSB0aGlzLl9hbmltYXRpb25TdGFydGVkLnBpcGUoXG4gICAgZmlsdGVyKGUgPT4gZS5mcm9tU3RhdGUgIT09IGUudG9TdGF0ZSAmJiBlLnRvU3RhdGUgPT09ICd2b2lkJyksXG4gICAgbWFwVG8odW5kZWZpbmVkKSxcbiAgKTtcblxuICAvKiogRW1pdHMgd2hlbiB0aGUgY29tcG9uZW50IGlzIGRlc3Ryb3llZC4gKi9cbiAgcHJpdmF0ZSByZWFkb25seSBfZGVzdHJveWVkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBkcmF3ZXIncyBwb3NpdGlvbiBjaGFuZ2VzLiAqL1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tb3V0cHV0LW9uLXByZWZpeFxuICBAT3V0cHV0KCdwb3NpdGlvbkNoYW5nZWQnKSByZWFkb25seSBvblBvc2l0aW9uQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAvKiogUmVmZXJlbmNlIHRvIHRoZSBpbm5lciBlbGVtZW50IHRoYXQgY29udGFpbnMgYWxsIHRoZSBjb250ZW50LiAqL1xuICBAVmlld0NoaWxkKCdjb250ZW50JykgX2NvbnRlbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gIC8qKlxuICAgKiBBbiBvYnNlcnZhYmxlIHRoYXQgZW1pdHMgd2hlbiB0aGUgZHJhd2VyIG1vZGUgY2hhbmdlcy4gVGhpcyBpcyB1c2VkIGJ5IHRoZSBkcmF3ZXIgY29udGFpbmVyIHRvXG4gICAqIHRvIGtub3cgd2hlbiB0byB3aGVuIHRoZSBtb2RlIGNoYW5nZXMgc28gaXQgY2FuIGFkYXB0IHRoZSBtYXJnaW5zIG9uIHRoZSBjb250ZW50LlxuICAgKi9cbiAgcmVhZG9ubHkgX21vZGVDaGFuZ2VkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBwcml2YXRlIF9mb2N1c1RyYXBGYWN0b3J5OiBGb2N1c1RyYXBGYWN0b3J5LFxuICAgIHByaXZhdGUgX2ZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLFxuICAgIHByaXZhdGUgX3BsYXRmb3JtOiBQbGF0Zm9ybSxcbiAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9pbnRlcmFjdGl2aXR5Q2hlY2tlcjogSW50ZXJhY3Rpdml0eUNoZWNrZXIsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jOiBhbnksXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChNQVRfRFJBV0VSX0NPTlRBSU5FUikgcHVibGljIF9jb250YWluZXI/OiBNYXREcmF3ZXJDb250YWluZXIsXG4gICkge1xuICAgIHRoaXMub3BlbmVkQ2hhbmdlLnN1YnNjcmliZSgob3BlbmVkOiBib29sZWFuKSA9PiB7XG4gICAgICBpZiAob3BlbmVkKSB7XG4gICAgICAgIGlmICh0aGlzLl9kb2MpIHtcbiAgICAgICAgICB0aGlzLl9lbGVtZW50Rm9jdXNlZEJlZm9yZURyYXdlcldhc09wZW5lZCA9IHRoaXMuX2RvYy5hY3RpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdGFrZUZvY3VzKCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2lzRm9jdXNXaXRoaW5EcmF3ZXIoKSkge1xuICAgICAgICB0aGlzLl9yZXN0b3JlRm9jdXModGhpcy5fb3BlbmVkVmlhIHx8ICdwcm9ncmFtJyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBMaXN0ZW4gdG8gYGtleWRvd25gIGV2ZW50cyBvdXRzaWRlIHRoZSB6b25lIHNvIHRoYXQgY2hhbmdlIGRldGVjdGlvbiBpcyBub3QgcnVuIGV2ZXJ5XG4gICAgICogdGltZSBhIGtleSBpcyBwcmVzc2VkLiBJbnN0ZWFkIHdlIHJlLWVudGVyIHRoZSB6b25lIG9ubHkgaWYgdGhlIGBFU0NgIGtleSBpcyBwcmVzc2VkXG4gICAgICogYW5kIHdlIGRvbid0IGhhdmUgY2xvc2UgZGlzYWJsZWQuXG4gICAgICovXG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIChmcm9tRXZlbnQodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAna2V5ZG93bicpIGFzIE9ic2VydmFibGU8S2V5Ym9hcmRFdmVudD4pXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGZpbHRlcihldmVudCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZXZlbnQua2V5Q29kZSA9PT0gRVNDQVBFICYmICF0aGlzLmRpc2FibGVDbG9zZSAmJiAhaGFzTW9kaWZpZXJLZXkoZXZlbnQpO1xuICAgICAgICAgIH0pLFxuICAgICAgICAgIHRha2VVbnRpbCh0aGlzLl9kZXN0cm95ZWQpLFxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoZXZlbnQgPT5cbiAgICAgICAgICB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgICB9KTtcblxuICAgIC8vIFdlIG5lZWQgYSBTdWJqZWN0IHdpdGggZGlzdGluY3RVbnRpbENoYW5nZWQsIGJlY2F1c2UgdGhlIGBkb25lYCBldmVudFxuICAgIC8vIGZpcmVzIHR3aWNlIG9uIHNvbWUgYnJvd3NlcnMuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8yNDA4NFxuICAgIHRoaXMuX2FuaW1hdGlvbkVuZFxuICAgICAgLnBpcGUoXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCh4LCB5KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHguZnJvbVN0YXRlID09PSB5LmZyb21TdGF0ZSAmJiB4LnRvU3RhdGUgPT09IHkudG9TdGF0ZTtcbiAgICAgICAgfSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKChldmVudDogQW5pbWF0aW9uRXZlbnQpID0+IHtcbiAgICAgICAgY29uc3Qge2Zyb21TdGF0ZSwgdG9TdGF0ZX0gPSBldmVudDtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgKHRvU3RhdGUuaW5kZXhPZignb3BlbicpID09PSAwICYmIGZyb21TdGF0ZSA9PT0gJ3ZvaWQnKSB8fFxuICAgICAgICAgICh0b1N0YXRlID09PSAndm9pZCcgJiYgZnJvbVN0YXRlLmluZGV4T2YoJ29wZW4nKSA9PT0gMClcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5vcGVuZWRDaGFuZ2UuZW1pdCh0aGlzLl9vcGVuZWQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb2N1c2VzIHRoZSBwcm92aWRlZCBlbGVtZW50LiBJZiB0aGUgZWxlbWVudCBpcyBub3QgZm9jdXNhYmxlLCBpdCB3aWxsIGFkZCBhIHRhYkluZGV4XG4gICAqIGF0dHJpYnV0ZSB0byBmb3JjZWZ1bGx5IGZvY3VzIGl0LiBUaGUgYXR0cmlidXRlIGlzIHJlbW92ZWQgYWZ0ZXIgZm9jdXMgaXMgbW92ZWQuXG4gICAqIEBwYXJhbSBlbGVtZW50IFRoZSBlbGVtZW50IHRvIGZvY3VzLlxuICAgKi9cbiAgcHJpdmF0ZSBfZm9yY2VGb2N1cyhlbGVtZW50OiBIVE1MRWxlbWVudCwgb3B0aW9ucz86IEZvY3VzT3B0aW9ucykge1xuICAgIGlmICghdGhpcy5faW50ZXJhY3Rpdml0eUNoZWNrZXIuaXNGb2N1c2FibGUoZWxlbWVudCkpIHtcbiAgICAgIGVsZW1lbnQudGFiSW5kZXggPSAtMTtcbiAgICAgIC8vIFRoZSB0YWJpbmRleCBhdHRyaWJ1dGUgc2hvdWxkIGJlIHJlbW92ZWQgdG8gYXZvaWQgbmF2aWdhdGluZyB0byB0aGF0IGVsZW1lbnQgYWdhaW5cbiAgICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmx1cicsIGNhbGxiYWNrKTtcbiAgICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGNhbGxiYWNrKTtcbiAgICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgndGFiaW5kZXgnKTtcbiAgICAgICAgfTtcblxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBjYWxsYmFjayk7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgY2FsbGJhY2spO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGVsZW1lbnQuZm9jdXMob3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogRm9jdXNlcyB0aGUgZmlyc3QgZWxlbWVudCB0aGF0IG1hdGNoZXMgdGhlIGdpdmVuIHNlbGVjdG9yIHdpdGhpbiB0aGUgZm9jdXMgdHJhcC5cbiAgICogQHBhcmFtIHNlbGVjdG9yIFRoZSBDU1Mgc2VsZWN0b3IgZm9yIHRoZSBlbGVtZW50IHRvIHNldCBmb2N1cyB0by5cbiAgICovXG4gIHByaXZhdGUgX2ZvY3VzQnlDc3NTZWxlY3RvcihzZWxlY3Rvcjogc3RyaW5nLCBvcHRpb25zPzogRm9jdXNPcHRpb25zKSB7XG4gICAgbGV0IGVsZW1lbnRUb0ZvY3VzID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBzZWxlY3RvcixcbiAgICApIGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgICBpZiAoZWxlbWVudFRvRm9jdXMpIHtcbiAgICAgIHRoaXMuX2ZvcmNlRm9jdXMoZWxlbWVudFRvRm9jdXMsIG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNb3ZlcyBmb2N1cyBpbnRvIHRoZSBkcmF3ZXIuIE5vdGUgdGhhdCB0aGlzIHdvcmtzIGV2ZW4gaWZcbiAgICogdGhlIGZvY3VzIHRyYXAgaXMgZGlzYWJsZWQgaW4gYHNpZGVgIG1vZGUuXG4gICAqL1xuICBwcml2YXRlIF90YWtlRm9jdXMoKSB7XG4gICAgaWYgKCF0aGlzLl9mb2N1c1RyYXApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuXG4gICAgLy8gV2hlbiBhdXRvRm9jdXMgaXMgbm90IG9uIHRoZSBzaWRlbmF2LCBpZiB0aGUgZWxlbWVudCBjYW5ub3QgYmUgZm9jdXNlZCBvciBkb2VzXG4gICAgLy8gbm90IGV4aXN0LCBmb2N1cyB0aGUgc2lkZW5hdiBpdHNlbGYgc28gdGhlIGtleWJvYXJkIG5hdmlnYXRpb24gc3RpbGwgd29ya3MuXG4gICAgLy8gV2UgbmVlZCB0byBjaGVjayB0aGF0IGBmb2N1c2AgaXMgYSBmdW5jdGlvbiBkdWUgdG8gVW5pdmVyc2FsLlxuICAgIHN3aXRjaCAodGhpcy5hdXRvRm9jdXMpIHtcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICBjYXNlICdkaWFsb2cnOlxuICAgICAgICByZXR1cm47XG4gICAgICBjYXNlIHRydWU6XG4gICAgICBjYXNlICdmaXJzdC10YWJiYWJsZSc6XG4gICAgICAgIHRoaXMuX2ZvY3VzVHJhcC5mb2N1c0luaXRpYWxFbGVtZW50V2hlblJlYWR5KCkudGhlbihoYXNNb3ZlZEZvY3VzID0+IHtcbiAgICAgICAgICBpZiAoIWhhc01vdmVkRm9jdXMgJiYgdHlwZW9mIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZmlyc3QtaGVhZGluZyc6XG4gICAgICAgIHRoaXMuX2ZvY3VzQnlDc3NTZWxlY3RvcignaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgW3JvbGU9XCJoZWFkaW5nXCJdJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5fZm9jdXNCeUNzc1NlbGVjdG9yKHRoaXMuYXV0b0ZvY3VzISk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXN0b3JlcyBmb2N1cyB0byB0aGUgZWxlbWVudCB0aGF0IHdhcyBvcmlnaW5hbGx5IGZvY3VzZWQgd2hlbiB0aGUgZHJhd2VyIG9wZW5lZC5cbiAgICogSWYgbm8gZWxlbWVudCB3YXMgZm9jdXNlZCBhdCB0aGF0IHRpbWUsIHRoZSBmb2N1cyB3aWxsIGJlIHJlc3RvcmVkIHRvIHRoZSBkcmF3ZXIuXG4gICAqL1xuICBwcml2YXRlIF9yZXN0b3JlRm9jdXMoZm9jdXNPcmlnaW46IEV4Y2x1ZGU8Rm9jdXNPcmlnaW4sIG51bGw+KSB7XG4gICAgaWYgKHRoaXMuYXV0b0ZvY3VzID09PSAnZGlhbG9nJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9lbGVtZW50Rm9jdXNlZEJlZm9yZURyYXdlcldhc09wZW5lZCkge1xuICAgICAgdGhpcy5fZm9jdXNNb25pdG9yLmZvY3VzVmlhKHRoaXMuX2VsZW1lbnRGb2N1c2VkQmVmb3JlRHJhd2VyV2FzT3BlbmVkLCBmb2N1c09yaWdpbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5ibHVyKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fZWxlbWVudEZvY3VzZWRCZWZvcmVEcmF3ZXJXYXNPcGVuZWQgPSBudWxsO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgZm9jdXMgaXMgY3VycmVudGx5IHdpdGhpbiB0aGUgZHJhd2VyLiAqL1xuICBwcml2YXRlIF9pc0ZvY3VzV2l0aGluRHJhd2VyKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGFjdGl2ZUVsID0gdGhpcy5fZG9jLmFjdGl2ZUVsZW1lbnQ7XG4gICAgcmV0dXJuICEhYWN0aXZlRWwgJiYgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGFjdGl2ZUVsKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLl9pc0F0dGFjaGVkID0gdHJ1ZTtcbiAgICB0aGlzLl9mb2N1c1RyYXAgPSB0aGlzLl9mb2N1c1RyYXBGYWN0b3J5LmNyZWF0ZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIHRoaXMuX3VwZGF0ZUZvY3VzVHJhcFN0YXRlKCk7XG5cbiAgICAvLyBPbmx5IHVwZGF0ZSB0aGUgRE9NIHBvc2l0aW9uIHdoZW4gdGhlIHNpZGVuYXYgaXMgcG9zaXRpb25lZCBhdFxuICAgIC8vIHRoZSBlbmQgc2luY2Ugd2UgcHJvamVjdCB0aGUgc2lkZW5hdiBiZWZvcmUgdGhlIGNvbnRlbnQgYnkgZGVmYXVsdC5cbiAgICBpZiAodGhpcy5fcG9zaXRpb24gPT09ICdlbmQnKSB7XG4gICAgICB0aGlzLl91cGRhdGVQb3NpdGlvbkluUGFyZW50KCdlbmQnKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKSB7XG4gICAgLy8gRW5hYmxlIHRoZSBhbmltYXRpb25zIGFmdGVyIHRoZSBsaWZlY3ljbGUgaG9va3MgaGF2ZSBydW4sIGluIG9yZGVyIHRvIGF2b2lkIGFuaW1hdGluZ1xuICAgIC8vIGRyYXdlcnMgdGhhdCBhcmUgb3BlbiBieSBkZWZhdWx0LiBXaGVuIHdlJ3JlIG9uIHRoZSBzZXJ2ZXIsIHdlIHNob3VsZG4ndCBlbmFibGUgdGhlXG4gICAgLy8gYW5pbWF0aW9ucywgYmVjYXVzZSB3ZSBkb24ndCB3YW50IHRoZSBkcmF3ZXIgdG8gYW5pbWF0ZSB0aGUgZmlyc3QgdGltZSB0aGUgdXNlciBzZWVzXG4gICAgLy8gdGhlIHBhZ2UuXG4gICAgaWYgKHRoaXMuX3BsYXRmb3JtLmlzQnJvd3Nlcikge1xuICAgICAgdGhpcy5fZW5hYmxlQW5pbWF0aW9ucyA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuX2ZvY3VzVHJhcCkge1xuICAgICAgdGhpcy5fZm9jdXNUcmFwLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICB0aGlzLl9hbmNob3I/LnJlbW92ZSgpO1xuICAgIHRoaXMuX2FuY2hvciA9IG51bGw7XG4gICAgdGhpcy5fYW5pbWF0aW9uU3RhcnRlZC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX2FuaW1hdGlvbkVuZC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX21vZGVDaGFuZ2VkLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fZGVzdHJveWVkLm5leHQoKTtcbiAgICB0aGlzLl9kZXN0cm95ZWQuY29tcGxldGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVuIHRoZSBkcmF3ZXIuXG4gICAqIEBwYXJhbSBvcGVuZWRWaWEgV2hldGhlciB0aGUgZHJhd2VyIHdhcyBvcGVuZWQgYnkgYSBrZXkgcHJlc3MsIG1vdXNlIGNsaWNrIG9yIHByb2dyYW1tYXRpY2FsbHkuXG4gICAqIFVzZWQgZm9yIGZvY3VzIG1hbmFnZW1lbnQgYWZ0ZXIgdGhlIHNpZGVuYXYgaXMgY2xvc2VkLlxuICAgKi9cbiAgb3BlbihvcGVuZWRWaWE/OiBGb2N1c09yaWdpbik6IFByb21pc2U8TWF0RHJhd2VyVG9nZ2xlUmVzdWx0PiB7XG4gICAgcmV0dXJuIHRoaXMudG9nZ2xlKHRydWUsIG9wZW5lZFZpYSk7XG4gIH1cblxuICAvKiogQ2xvc2UgdGhlIGRyYXdlci4gKi9cbiAgY2xvc2UoKTogUHJvbWlzZTxNYXREcmF3ZXJUb2dnbGVSZXN1bHQ+IHtcbiAgICByZXR1cm4gdGhpcy50b2dnbGUoZmFsc2UpO1xuICB9XG5cbiAgLyoqIENsb3NlcyB0aGUgZHJhd2VyIHdpdGggY29udGV4dCB0aGF0IHRoZSBiYWNrZHJvcCB3YXMgY2xpY2tlZC4gKi9cbiAgX2Nsb3NlVmlhQmFja2Ryb3BDbGljaygpOiBQcm9taXNlPE1hdERyYXdlclRvZ2dsZVJlc3VsdD4ge1xuICAgIC8vIElmIHRoZSBkcmF3ZXIgaXMgY2xvc2VkIHVwb24gYSBiYWNrZHJvcCBjbGljaywgd2UgYWx3YXlzIHdhbnQgdG8gcmVzdG9yZSBmb2N1cy4gV2VcbiAgICAvLyBkb24ndCBuZWVkIHRvIGNoZWNrIHdoZXRoZXIgZm9jdXMgaXMgY3VycmVudGx5IGluIHRoZSBkcmF3ZXIsIGFzIGNsaWNraW5nIG9uIHRoZVxuICAgIC8vIGJhY2tkcm9wIGNhdXNlcyBibHVycyB0aGUgYWN0aXZlIGVsZW1lbnQuXG4gICAgcmV0dXJuIHRoaXMuX3NldE9wZW4oLyogaXNPcGVuICovIGZhbHNlLCAvKiByZXN0b3JlRm9jdXMgKi8gdHJ1ZSwgJ21vdXNlJyk7XG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlIHRoaXMgZHJhd2VyLlxuICAgKiBAcGFyYW0gaXNPcGVuIFdoZXRoZXIgdGhlIGRyYXdlciBzaG91bGQgYmUgb3Blbi5cbiAgICogQHBhcmFtIG9wZW5lZFZpYSBXaGV0aGVyIHRoZSBkcmF3ZXIgd2FzIG9wZW5lZCBieSBhIGtleSBwcmVzcywgbW91c2UgY2xpY2sgb3IgcHJvZ3JhbW1hdGljYWxseS5cbiAgICogVXNlZCBmb3IgZm9jdXMgbWFuYWdlbWVudCBhZnRlciB0aGUgc2lkZW5hdiBpcyBjbG9zZWQuXG4gICAqL1xuICB0b2dnbGUoaXNPcGVuOiBib29sZWFuID0gIXRoaXMub3BlbmVkLCBvcGVuZWRWaWE/OiBGb2N1c09yaWdpbik6IFByb21pc2U8TWF0RHJhd2VyVG9nZ2xlUmVzdWx0PiB7XG4gICAgLy8gSWYgdGhlIGZvY3VzIGlzIGN1cnJlbnRseSBpbnNpZGUgdGhlIGRyYXdlciBjb250ZW50IGFuZCB3ZSBhcmUgY2xvc2luZyB0aGUgZHJhd2VyLFxuICAgIC8vIHJlc3RvcmUgdGhlIGZvY3VzIHRvIHRoZSBpbml0aWFsbHkgZm9jdXNlZCBlbGVtZW50ICh3aGVuIHRoZSBkcmF3ZXIgb3BlbmVkKS5cbiAgICBpZiAoaXNPcGVuICYmIG9wZW5lZFZpYSkge1xuICAgICAgdGhpcy5fb3BlbmVkVmlhID0gb3BlbmVkVmlhO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuX3NldE9wZW4oXG4gICAgICBpc09wZW4sXG4gICAgICAvKiByZXN0b3JlRm9jdXMgKi8gIWlzT3BlbiAmJiB0aGlzLl9pc0ZvY3VzV2l0aGluRHJhd2VyKCksXG4gICAgICB0aGlzLl9vcGVuZWRWaWEgfHwgJ3Byb2dyYW0nLFxuICAgICk7XG5cbiAgICBpZiAoIWlzT3Blbikge1xuICAgICAgdGhpcy5fb3BlbmVkVmlhID0gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgdGhlIG9wZW5lZCBzdGF0ZSBvZiB0aGUgZHJhd2VyLlxuICAgKiBAcGFyYW0gaXNPcGVuIFdoZXRoZXIgdGhlIGRyYXdlciBzaG91bGQgb3BlbiBvciBjbG9zZS5cbiAgICogQHBhcmFtIHJlc3RvcmVGb2N1cyBXaGV0aGVyIGZvY3VzIHNob3VsZCBiZSByZXN0b3JlZCBvbiBjbG9zZS5cbiAgICogQHBhcmFtIGZvY3VzT3JpZ2luIE9yaWdpbiB0byB1c2Ugd2hlbiByZXN0b3JpbmcgZm9jdXMuXG4gICAqL1xuICBwcml2YXRlIF9zZXRPcGVuKFxuICAgIGlzT3BlbjogYm9vbGVhbixcbiAgICByZXN0b3JlRm9jdXM6IGJvb2xlYW4sXG4gICAgZm9jdXNPcmlnaW46IEV4Y2x1ZGU8Rm9jdXNPcmlnaW4sIG51bGw+LFxuICApOiBQcm9taXNlPE1hdERyYXdlclRvZ2dsZVJlc3VsdD4ge1xuICAgIHRoaXMuX29wZW5lZCA9IGlzT3BlbjtcblxuICAgIGlmIChpc09wZW4pIHtcbiAgICAgIHRoaXMuX2FuaW1hdGlvblN0YXRlID0gdGhpcy5fZW5hYmxlQW5pbWF0aW9ucyA/ICdvcGVuJyA6ICdvcGVuLWluc3RhbnQnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9hbmltYXRpb25TdGF0ZSA9ICd2b2lkJztcbiAgICAgIGlmIChyZXN0b3JlRm9jdXMpIHtcbiAgICAgICAgdGhpcy5fcmVzdG9yZUZvY3VzKGZvY3VzT3JpZ2luKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl91cGRhdGVGb2N1c1RyYXBTdGF0ZSgpO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPE1hdERyYXdlclRvZ2dsZVJlc3VsdD4ocmVzb2x2ZSA9PiB7XG4gICAgICB0aGlzLm9wZW5lZENoYW5nZS5waXBlKHRha2UoMSkpLnN1YnNjcmliZShvcGVuID0+IHJlc29sdmUob3BlbiA/ICdvcGVuJyA6ICdjbG9zZScpKTtcbiAgICB9KTtcbiAgfVxuXG4gIF9nZXRXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgPyB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGggfHwgMCA6IDA7XG4gIH1cblxuICAvKiogVXBkYXRlcyB0aGUgZW5hYmxlZCBzdGF0ZSBvZiB0aGUgZm9jdXMgdHJhcC4gKi9cbiAgcHJpdmF0ZSBfdXBkYXRlRm9jdXNUcmFwU3RhdGUoKSB7XG4gICAgaWYgKHRoaXMuX2ZvY3VzVHJhcCkge1xuICAgICAgLy8gVHJhcCBmb2N1cyBvbmx5IGlmIHRoZSBiYWNrZHJvcCBpcyBlbmFibGVkLiBPdGhlcndpc2UsIGFsbG93IGVuZCB1c2VyIHRvIGludGVyYWN0IHdpdGggdGhlXG4gICAgICAvLyBzaWRlbmF2IGNvbnRlbnQuXG4gICAgICB0aGlzLl9mb2N1c1RyYXAuZW5hYmxlZCA9ICEhdGhpcy5fY29udGFpbmVyPy5oYXNCYWNrZHJvcDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgcG9zaXRpb24gb2YgdGhlIGRyYXdlciBpbiB0aGUgRE9NLiBXZSBuZWVkIHRvIG1vdmUgdGhlIGVsZW1lbnQgYXJvdW5kIG91cnNlbHZlc1xuICAgKiB3aGVuIGl0J3MgaW4gdGhlIGBlbmRgIHBvc2l0aW9uIHNvIHRoYXQgaXQgY29tZXMgYWZ0ZXIgdGhlIGNvbnRlbnQgYW5kIHRoZSB2aXN1YWwgb3JkZXJcbiAgICogbWF0Y2hlcyB0aGUgdGFiIG9yZGVyLiBXZSBhbHNvIG5lZWQgdG8gYmUgYWJsZSB0byBtb3ZlIGl0IGJhY2sgdG8gYHN0YXJ0YCBpZiB0aGUgc2lkZW5hdlxuICAgKiBzdGFydGVkIG9mZiBhcyBgZW5kYCBhbmQgd2FzIGNoYW5nZWQgdG8gYHN0YXJ0YC5cbiAgICovXG4gIHByaXZhdGUgX3VwZGF0ZVBvc2l0aW9uSW5QYXJlbnQobmV3UG9zaXRpb246ICdzdGFydCcgfCAnZW5kJykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgcGFyZW50ID0gZWxlbWVudC5wYXJlbnROb2RlITtcblxuICAgIGlmIChuZXdQb3NpdGlvbiA9PT0gJ2VuZCcpIHtcbiAgICAgIGlmICghdGhpcy5fYW5jaG9yKSB7XG4gICAgICAgIHRoaXMuX2FuY2hvciA9IHRoaXMuX2RvYy5jcmVhdGVDb21tZW50KCdtYXQtZHJhd2VyLWFuY2hvcicpITtcbiAgICAgICAgcGFyZW50Lmluc2VydEJlZm9yZSh0aGlzLl9hbmNob3IhLCBlbGVtZW50KTtcbiAgICAgIH1cblxuICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fYW5jaG9yKSB7XG4gICAgICB0aGlzLl9hbmNob3IucGFyZW50Tm9kZSEuaW5zZXJ0QmVmb3JlKGVsZW1lbnQsIHRoaXMuX2FuY2hvcik7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogYDxtYXQtZHJhd2VyLWNvbnRhaW5lcj5gIGNvbXBvbmVudC5cbiAqXG4gKiBUaGlzIGlzIHRoZSBwYXJlbnQgY29tcG9uZW50IHRvIG9uZSBvciB0d28gYDxtYXQtZHJhd2VyPmBzIHRoYXQgdmFsaWRhdGVzIHRoZSBzdGF0ZSBpbnRlcm5hbGx5XG4gKiBhbmQgY29vcmRpbmF0ZXMgdGhlIGJhY2tkcm9wIGFuZCBjb250ZW50IHN0eWxpbmcuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1kcmF3ZXItY29udGFpbmVyJyxcbiAgZXhwb3J0QXM6ICdtYXREcmF3ZXJDb250YWluZXInLFxuICB0ZW1wbGF0ZVVybDogJ2RyYXdlci1jb250YWluZXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWydkcmF3ZXIuY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LWRyYXdlci1jb250YWluZXInLFxuICAgICdbY2xhc3MubWF0LWRyYXdlci1jb250YWluZXItZXhwbGljaXQtYmFja2Ryb3BdJzogJ19iYWNrZHJvcE92ZXJyaWRlJyxcbiAgICAnbmdTa2lwSHlkcmF0aW9uJzogJycsXG4gIH0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBNQVRfRFJBV0VSX0NPTlRBSU5FUixcbiAgICAgIHVzZUV4aXN0aW5nOiBNYXREcmF3ZXJDb250YWluZXIsXG4gICAgfSxcbiAgXSxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW01hdERyYXdlckNvbnRlbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXREcmF3ZXJDb250YWluZXIgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBEb0NoZWNrLCBPbkRlc3Ryb3kge1xuICAvKiogQWxsIGRyYXdlcnMgaW4gdGhlIGNvbnRhaW5lci4gSW5jbHVkZXMgZHJhd2VycyBmcm9tIGluc2lkZSBuZXN0ZWQgY29udGFpbmVycy4gKi9cbiAgQENvbnRlbnRDaGlsZHJlbihNYXREcmF3ZXIsIHtcbiAgICAvLyBXZSBuZWVkIHRvIHVzZSBgZGVzY2VuZGFudHM6IHRydWVgLCBiZWNhdXNlIEl2eSB3aWxsIG5vIGxvbmdlciBtYXRjaFxuICAgIC8vIGluZGlyZWN0IGRlc2NlbmRhbnRzIGlmIGl0J3MgbGVmdCBhcyBmYWxzZS5cbiAgICBkZXNjZW5kYW50czogdHJ1ZSxcbiAgfSlcbiAgX2FsbERyYXdlcnM6IFF1ZXJ5TGlzdDxNYXREcmF3ZXI+O1xuXG4gIC8qKiBEcmF3ZXJzIHRoYXQgYmVsb25nIHRvIHRoaXMgY29udGFpbmVyLiAqL1xuICBfZHJhd2VycyA9IG5ldyBRdWVyeUxpc3Q8TWF0RHJhd2VyPigpO1xuXG4gIEBDb250ZW50Q2hpbGQoTWF0RHJhd2VyQ29udGVudCkgX2NvbnRlbnQ6IE1hdERyYXdlckNvbnRlbnQ7XG4gIEBWaWV3Q2hpbGQoTWF0RHJhd2VyQ29udGVudCkgX3VzZXJDb250ZW50OiBNYXREcmF3ZXJDb250ZW50O1xuXG4gIC8qKiBUaGUgZHJhd2VyIGNoaWxkIHdpdGggdGhlIGBzdGFydGAgcG9zaXRpb24uICovXG4gIGdldCBzdGFydCgpOiBNYXREcmF3ZXIgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhcnQ7XG4gIH1cblxuICAvKiogVGhlIGRyYXdlciBjaGlsZCB3aXRoIHRoZSBgZW5kYCBwb3NpdGlvbi4gKi9cbiAgZ2V0IGVuZCgpOiBNYXREcmF3ZXIgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fZW5kO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gYXV0b21hdGljYWxseSByZXNpemUgdGhlIGNvbnRhaW5lciB3aGVuZXZlclxuICAgKiB0aGUgc2l6ZSBvZiBhbnkgb2YgaXRzIGRyYXdlcnMgY2hhbmdlcy5cbiAgICpcbiAgICogKipVc2UgYXQgeW91ciBvd24gcmlzayEqKiBFbmFibGluZyB0aGlzIG9wdGlvbiBjYW4gY2F1c2UgbGF5b3V0IHRocmFzaGluZyBieSBtZWFzdXJpbmdcbiAgICogdGhlIGRyYXdlcnMgb24gZXZlcnkgY2hhbmdlIGRldGVjdGlvbiBjeWNsZS4gQ2FuIGJlIGNvbmZpZ3VyZWQgZ2xvYmFsbHkgdmlhIHRoZVxuICAgKiBgTUFUX0RSQVdFUl9ERUZBVUxUX0FVVE9TSVpFYCB0b2tlbi5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBhdXRvc2l6ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fYXV0b3NpemU7XG4gIH1cbiAgc2V0IGF1dG9zaXplKHZhbHVlOiBCb29sZWFuSW5wdXQpIHtcbiAgICB0aGlzLl9hdXRvc2l6ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfYXV0b3NpemU6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGRyYXdlciBjb250YWluZXIgc2hvdWxkIGhhdmUgYSBiYWNrZHJvcCB3aGlsZSBvbmUgb2YgdGhlIHNpZGVuYXZzIGlzIG9wZW4uXG4gICAqIElmIGV4cGxpY2l0bHkgc2V0IHRvIGB0cnVlYCwgdGhlIGJhY2tkcm9wIHdpbGwgYmUgZW5hYmxlZCBmb3IgZHJhd2VycyBpbiB0aGUgYHNpZGVgXG4gICAqIG1vZGUgYXMgd2VsbC5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBoYXNCYWNrZHJvcCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZHJhd2VySGFzQmFja2Ryb3AodGhpcy5fc3RhcnQpIHx8IHRoaXMuX2RyYXdlckhhc0JhY2tkcm9wKHRoaXMuX2VuZCk7XG4gIH1cbiAgc2V0IGhhc0JhY2tkcm9wKHZhbHVlOiBCb29sZWFuSW5wdXQpIHtcbiAgICB0aGlzLl9iYWNrZHJvcE92ZXJyaWRlID0gdmFsdWUgPT0gbnVsbCA/IG51bGwgOiBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIF9iYWNrZHJvcE92ZXJyaWRlOiBib29sZWFuIHwgbnVsbDtcblxuICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBkcmF3ZXIgYmFja2Ryb3AgaXMgY2xpY2tlZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGJhY2tkcm9wQ2xpY2s6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAvKiogVGhlIGRyYXdlciBhdCB0aGUgc3RhcnQvZW5kIHBvc2l0aW9uLCBpbmRlcGVuZGVudCBvZiBkaXJlY3Rpb24uICovXG4gIHByaXZhdGUgX3N0YXJ0OiBNYXREcmF3ZXIgfCBudWxsO1xuICBwcml2YXRlIF9lbmQ6IE1hdERyYXdlciB8IG51bGw7XG5cbiAgLyoqXG4gICAqIFRoZSBkcmF3ZXIgYXQgdGhlIGxlZnQvcmlnaHQuIFdoZW4gZGlyZWN0aW9uIGNoYW5nZXMsIHRoZXNlIHdpbGwgY2hhbmdlIGFzIHdlbGwuXG4gICAqIFRoZXkncmUgdXNlZCBhcyBhbGlhc2VzIGZvciB0aGUgYWJvdmUgdG8gc2V0IHRoZSBsZWZ0L3JpZ2h0IHN0eWxlIHByb3Blcmx5LlxuICAgKiBJbiBMVFIsIF9sZWZ0ID09IF9zdGFydCBhbmQgX3JpZ2h0ID09IF9lbmQuXG4gICAqIEluIFJUTCwgX2xlZnQgPT0gX2VuZCBhbmQgX3JpZ2h0ID09IF9zdGFydC5cbiAgICovXG4gIHByaXZhdGUgX2xlZnQ6IE1hdERyYXdlciB8IG51bGw7XG4gIHByaXZhdGUgX3JpZ2h0OiBNYXREcmF3ZXIgfCBudWxsO1xuXG4gIC8qKiBFbWl0cyB3aGVuIHRoZSBjb21wb25lbnQgaXMgZGVzdHJveWVkLiAqL1xuICBwcml2YXRlIHJlYWRvbmx5IF9kZXN0cm95ZWQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIC8qKiBFbWl0cyBvbiBldmVyeSBuZ0RvQ2hlY2suIFVzZWQgZm9yIGRlYm91bmNpbmcgcmVmbG93cy4gKi9cbiAgcHJpdmF0ZSByZWFkb25seSBfZG9DaGVja1N1YmplY3QgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIC8qKlxuICAgKiBNYXJnaW5zIHRvIGJlIGFwcGxpZWQgdG8gdGhlIGNvbnRlbnQuIFRoZXNlIGFyZSB1c2VkIHRvIHB1c2ggLyBzaHJpbmsgdGhlIGRyYXdlciBjb250ZW50IHdoZW4gYVxuICAgKiBkcmF3ZXIgaXMgb3Blbi4gV2UgdXNlIG1hcmdpbiByYXRoZXIgdGhhbiB0cmFuc2Zvcm0gZXZlbiBmb3IgcHVzaCBtb2RlIGJlY2F1c2UgdHJhbnNmb3JtIGJyZWFrc1xuICAgKiBmaXhlZCBwb3NpdGlvbiBlbGVtZW50cyBpbnNpZGUgb2YgdGhlIHRyYW5zZm9ybWVkIGVsZW1lbnQuXG4gICAqL1xuICBfY29udGVudE1hcmdpbnM6IHtsZWZ0OiBudW1iZXIgfCBudWxsOyByaWdodDogbnVtYmVyIHwgbnVsbH0gPSB7bGVmdDogbnVsbCwgcmlnaHQ6IG51bGx9O1xuXG4gIHJlYWRvbmx5IF9jb250ZW50TWFyZ2luQ2hhbmdlcyA9IG5ldyBTdWJqZWN0PHtsZWZ0OiBudW1iZXIgfCBudWxsOyByaWdodDogbnVtYmVyIHwgbnVsbH0+KCk7XG5cbiAgLyoqIFJlZmVyZW5jZSB0byB0aGUgQ2RrU2Nyb2xsYWJsZSBpbnN0YW5jZSB0aGF0IHdyYXBzIHRoZSBzY3JvbGxhYmxlIGNvbnRlbnQuICovXG4gIGdldCBzY3JvbGxhYmxlKCk6IENka1Njcm9sbGFibGUge1xuICAgIHJldHVybiB0aGlzLl91c2VyQ29udGVudCB8fCB0aGlzLl9jb250ZW50O1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgICBwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgdmlld3BvcnRSdWxlcjogVmlld3BvcnRSdWxlcixcbiAgICBASW5qZWN0KE1BVF9EUkFXRVJfREVGQVVMVF9BVVRPU0laRSkgZGVmYXVsdEF1dG9zaXplID0gZmFsc2UsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChBTklNQVRJT05fTU9EVUxFX1RZUEUpIHByaXZhdGUgX2FuaW1hdGlvbk1vZGU/OiBzdHJpbmcsXG4gICkge1xuICAgIC8vIElmIGEgYERpcmAgZGlyZWN0aXZlIGV4aXN0cyB1cCB0aGUgdHJlZSwgbGlzdGVuIGRpcmVjdGlvbiBjaGFuZ2VzXG4gICAgLy8gYW5kIHVwZGF0ZSB0aGUgbGVmdC9yaWdodCBwcm9wZXJ0aWVzIHRvIHBvaW50IHRvIHRoZSBwcm9wZXIgc3RhcnQvZW5kLlxuICAgIGlmIChfZGlyKSB7XG4gICAgICBfZGlyLmNoYW5nZS5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95ZWQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLl92YWxpZGF0ZURyYXdlcnMoKTtcbiAgICAgICAgdGhpcy51cGRhdGVDb250ZW50TWFyZ2lucygpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gU2luY2UgdGhlIG1pbmltdW0gd2lkdGggb2YgdGhlIHNpZGVuYXYgZGVwZW5kcyBvbiB0aGUgdmlld3BvcnQgd2lkdGgsXG4gICAgLy8gd2UgbmVlZCB0byByZWNvbXB1dGUgdGhlIG1hcmdpbnMgaWYgdGhlIHZpZXdwb3J0IGNoYW5nZXMuXG4gICAgdmlld3BvcnRSdWxlclxuICAgICAgLmNoYW5nZSgpXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy51cGRhdGVDb250ZW50TWFyZ2lucygpKTtcblxuICAgIHRoaXMuX2F1dG9zaXplID0gZGVmYXVsdEF1dG9zaXplO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuX2FsbERyYXdlcnMuY2hhbmdlc1xuICAgICAgLnBpcGUoc3RhcnRXaXRoKHRoaXMuX2FsbERyYXdlcnMpLCB0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkKSlcbiAgICAgIC5zdWJzY3JpYmUoKGRyYXdlcjogUXVlcnlMaXN0PE1hdERyYXdlcj4pID0+IHtcbiAgICAgICAgdGhpcy5fZHJhd2Vycy5yZXNldChkcmF3ZXIuZmlsdGVyKGl0ZW0gPT4gIWl0ZW0uX2NvbnRhaW5lciB8fCBpdGVtLl9jb250YWluZXIgPT09IHRoaXMpKTtcbiAgICAgICAgdGhpcy5fZHJhd2Vycy5ub3RpZnlPbkNoYW5nZXMoKTtcbiAgICAgIH0pO1xuXG4gICAgdGhpcy5fZHJhd2Vycy5jaGFuZ2VzLnBpcGUoc3RhcnRXaXRoKG51bGwpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5fdmFsaWRhdGVEcmF3ZXJzKCk7XG5cbiAgICAgIHRoaXMuX2RyYXdlcnMuZm9yRWFjaCgoZHJhd2VyOiBNYXREcmF3ZXIpID0+IHtcbiAgICAgICAgdGhpcy5fd2F0Y2hEcmF3ZXJUb2dnbGUoZHJhd2VyKTtcbiAgICAgICAgdGhpcy5fd2F0Y2hEcmF3ZXJQb3NpdGlvbihkcmF3ZXIpO1xuICAgICAgICB0aGlzLl93YXRjaERyYXdlck1vZGUoZHJhd2VyKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoXG4gICAgICAgICF0aGlzLl9kcmF3ZXJzLmxlbmd0aCB8fFxuICAgICAgICB0aGlzLl9pc0RyYXdlck9wZW4odGhpcy5fc3RhcnQpIHx8XG4gICAgICAgIHRoaXMuX2lzRHJhd2VyT3Blbih0aGlzLl9lbmQpXG4gICAgICApIHtcbiAgICAgICAgdGhpcy51cGRhdGVDb250ZW50TWFyZ2lucygpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcblxuICAgIC8vIEF2b2lkIGhpdHRpbmcgdGhlIE5nWm9uZSB0aHJvdWdoIHRoZSBkZWJvdW5jZSB0aW1lb3V0LlxuICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLl9kb0NoZWNrU3ViamVjdFxuICAgICAgICAucGlwZShcbiAgICAgICAgICBkZWJvdW5jZVRpbWUoMTApLCAvLyBBcmJpdHJhcnkgZGVib3VuY2UgdGltZSwgbGVzcyB0aGFuIGEgZnJhbWUgYXQgNjBmcHNcbiAgICAgICAgICB0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkKSxcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMudXBkYXRlQ29udGVudE1hcmdpbnMoKSk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9jb250ZW50TWFyZ2luQ2hhbmdlcy5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX2RvQ2hlY2tTdWJqZWN0LmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fZHJhd2Vycy5kZXN0cm95KCk7XG4gICAgdGhpcy5fZGVzdHJveWVkLm5leHQoKTtcbiAgICB0aGlzLl9kZXN0cm95ZWQuY29tcGxldGUoKTtcbiAgfVxuXG4gIC8qKiBDYWxscyBgb3BlbmAgb2YgYm90aCBzdGFydCBhbmQgZW5kIGRyYXdlcnMgKi9cbiAgb3BlbigpOiB2b2lkIHtcbiAgICB0aGlzLl9kcmF3ZXJzLmZvckVhY2goZHJhd2VyID0+IGRyYXdlci5vcGVuKCkpO1xuICB9XG5cbiAgLyoqIENhbGxzIGBjbG9zZWAgb2YgYm90aCBzdGFydCBhbmQgZW5kIGRyYXdlcnMgKi9cbiAgY2xvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fZHJhd2Vycy5mb3JFYWNoKGRyYXdlciA9PiBkcmF3ZXIuY2xvc2UoKSk7XG4gIH1cblxuICAvKipcbiAgICogUmVjYWxjdWxhdGVzIGFuZCB1cGRhdGVzIHRoZSBpbmxpbmUgc3R5bGVzIGZvciB0aGUgY29udGVudC4gTm90ZSB0aGF0IHRoaXMgc2hvdWxkIGJlIHVzZWRcbiAgICogc3BhcmluZ2x5LCBiZWNhdXNlIGl0IGNhdXNlcyBhIHJlZmxvdy5cbiAgICovXG4gIHVwZGF0ZUNvbnRlbnRNYXJnaW5zKCkge1xuICAgIC8vIDEuIEZvciBkcmF3ZXJzIGluIGBvdmVyYCBtb2RlLCB0aGV5IGRvbid0IGFmZmVjdCB0aGUgY29udGVudC5cbiAgICAvLyAyLiBGb3IgZHJhd2VycyBpbiBgc2lkZWAgbW9kZSB0aGV5IHNob3VsZCBzaHJpbmsgdGhlIGNvbnRlbnQuIFdlIGRvIHRoaXMgYnkgYWRkaW5nIHRvIHRoZVxuICAgIC8vICAgIGxlZnQgbWFyZ2luIChmb3IgbGVmdCBkcmF3ZXIpIG9yIHJpZ2h0IG1hcmdpbiAoZm9yIHJpZ2h0IHRoZSBkcmF3ZXIpLlxuICAgIC8vIDMuIEZvciBkcmF3ZXJzIGluIGBwdXNoYCBtb2RlIHRoZSBzaG91bGQgc2hpZnQgdGhlIGNvbnRlbnQgd2l0aG91dCByZXNpemluZyBpdC4gV2UgZG8gdGhpcyBieVxuICAgIC8vICAgIGFkZGluZyB0byB0aGUgbGVmdCBvciByaWdodCBtYXJnaW4gYW5kIHNpbXVsdGFuZW91c2x5IHN1YnRyYWN0aW5nIHRoZSBzYW1lIGFtb3VudCBvZlxuICAgIC8vICAgIG1hcmdpbiBmcm9tIHRoZSBvdGhlciBzaWRlLlxuICAgIGxldCBsZWZ0ID0gMDtcbiAgICBsZXQgcmlnaHQgPSAwO1xuXG4gICAgaWYgKHRoaXMuX2xlZnQgJiYgdGhpcy5fbGVmdC5vcGVuZWQpIHtcbiAgICAgIGlmICh0aGlzLl9sZWZ0Lm1vZGUgPT0gJ3NpZGUnKSB7XG4gICAgICAgIGxlZnQgKz0gdGhpcy5fbGVmdC5fZ2V0V2lkdGgoKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fbGVmdC5tb2RlID09ICdwdXNoJykge1xuICAgICAgICBjb25zdCB3aWR0aCA9IHRoaXMuX2xlZnQuX2dldFdpZHRoKCk7XG4gICAgICAgIGxlZnQgKz0gd2lkdGg7XG4gICAgICAgIHJpZ2h0IC09IHdpZHRoO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9yaWdodCAmJiB0aGlzLl9yaWdodC5vcGVuZWQpIHtcbiAgICAgIGlmICh0aGlzLl9yaWdodC5tb2RlID09ICdzaWRlJykge1xuICAgICAgICByaWdodCArPSB0aGlzLl9yaWdodC5fZ2V0V2lkdGgoKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fcmlnaHQubW9kZSA9PSAncHVzaCcpIHtcbiAgICAgICAgY29uc3Qgd2lkdGggPSB0aGlzLl9yaWdodC5fZ2V0V2lkdGgoKTtcbiAgICAgICAgcmlnaHQgKz0gd2lkdGg7XG4gICAgICAgIGxlZnQgLT0gd2lkdGg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSWYgZWl0aGVyIGByaWdodGAgb3IgYGxlZnRgIGlzIHplcm8sIGRvbid0IHNldCBhIHN0eWxlIHRvIHRoZSBlbGVtZW50LiBUaGlzXG4gICAgLy8gYWxsb3dzIHVzZXJzIHRvIHNwZWNpZnkgYSBjdXN0b20gc2l6ZSB2aWEgQ1NTIGNsYXNzIGluIFNTUiBzY2VuYXJpb3Mgd2hlcmUgdGhlXG4gICAgLy8gbWVhc3VyZWQgd2lkdGhzIHdpbGwgYWx3YXlzIGJlIHplcm8uIE5vdGUgdGhhdCB3ZSByZXNldCB0byBgbnVsbGAgaGVyZSwgcmF0aGVyXG4gICAgLy8gdGhhbiBiZWxvdywgaW4gb3JkZXIgdG8gZW5zdXJlIHRoYXQgdGhlIHR5cGVzIGluIHRoZSBgaWZgIGJlbG93IGFyZSBjb25zaXN0ZW50LlxuICAgIGxlZnQgPSBsZWZ0IHx8IG51bGwhO1xuICAgIHJpZ2h0ID0gcmlnaHQgfHwgbnVsbCE7XG5cbiAgICBpZiAobGVmdCAhPT0gdGhpcy5fY29udGVudE1hcmdpbnMubGVmdCB8fCByaWdodCAhPT0gdGhpcy5fY29udGVudE1hcmdpbnMucmlnaHQpIHtcbiAgICAgIHRoaXMuX2NvbnRlbnRNYXJnaW5zID0ge2xlZnQsIHJpZ2h0fTtcblxuICAgICAgLy8gUHVsbCBiYWNrIGludG8gdGhlIE5nWm9uZSBzaW5jZSBpbiBzb21lIGNhc2VzIHdlIGNvdWxkIGJlIG91dHNpZGUuIFdlIG5lZWQgdG8gYmUgY2FyZWZ1bFxuICAgICAgLy8gdG8gZG8gaXQgb25seSB3aGVuIHNvbWV0aGluZyBjaGFuZ2VkLCBvdGhlcndpc2Ugd2UgY2FuIGVuZCB1cCBoaXR0aW5nIHRoZSB6b25lIHRvbyBvZnRlbi5cbiAgICAgIHRoaXMuX25nWm9uZS5ydW4oKCkgPT4gdGhpcy5fY29udGVudE1hcmdpbkNoYW5nZXMubmV4dCh0aGlzLl9jb250ZW50TWFyZ2lucykpO1xuICAgIH1cbiAgfVxuXG4gIG5nRG9DaGVjaygpIHtcbiAgICAvLyBJZiB1c2VycyBvcHRlZCBpbnRvIGF1dG9zaXppbmcsIGRvIGEgY2hlY2sgZXZlcnkgY2hhbmdlIGRldGVjdGlvbiBjeWNsZS5cbiAgICBpZiAodGhpcy5fYXV0b3NpemUgJiYgdGhpcy5faXNQdXNoZWQoKSkge1xuICAgICAgLy8gUnVuIG91dHNpZGUgdGhlIE5nWm9uZSwgb3RoZXJ3aXNlIHRoZSBkZWJvdW5jZXIgd2lsbCB0aHJvdyB1cyBpbnRvIGFuIGluZmluaXRlIGxvb3AuXG4gICAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gdGhpcy5fZG9DaGVja1N1YmplY3QubmV4dCgpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaWJlcyB0byBkcmF3ZXIgZXZlbnRzIGluIG9yZGVyIHRvIHNldCBhIGNsYXNzIG9uIHRoZSBtYWluIGNvbnRhaW5lciBlbGVtZW50IHdoZW4gdGhlXG4gICAqIGRyYXdlciBpcyBvcGVuIGFuZCB0aGUgYmFja2Ryb3AgaXMgdmlzaWJsZS4gVGhpcyBlbnN1cmVzIGFueSBvdmVyZmxvdyBvbiB0aGUgY29udGFpbmVyIGVsZW1lbnRcbiAgICogaXMgcHJvcGVybHkgaGlkZGVuLlxuICAgKi9cbiAgcHJpdmF0ZSBfd2F0Y2hEcmF3ZXJUb2dnbGUoZHJhd2VyOiBNYXREcmF3ZXIpOiB2b2lkIHtcbiAgICBkcmF3ZXIuX2FuaW1hdGlvblN0YXJ0ZWRcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoKGV2ZW50OiBBbmltYXRpb25FdmVudCkgPT4gZXZlbnQuZnJvbVN0YXRlICE9PSBldmVudC50b1N0YXRlKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuX2RyYXdlcnMuY2hhbmdlcyksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKChldmVudDogQW5pbWF0aW9uRXZlbnQpID0+IHtcbiAgICAgICAgLy8gU2V0IHRoZSB0cmFuc2l0aW9uIGNsYXNzIG9uIHRoZSBjb250YWluZXIgc28gdGhhdCB0aGUgYW5pbWF0aW9ucyBvY2N1ci4gVGhpcyBzaG91bGQgbm90XG4gICAgICAgIC8vIGJlIHNldCBpbml0aWFsbHkgYmVjYXVzZSBhbmltYXRpb25zIHNob3VsZCBvbmx5IGJlIHRyaWdnZXJlZCB2aWEgYSBjaGFuZ2UgaW4gc3RhdGUuXG4gICAgICAgIGlmIChldmVudC50b1N0YXRlICE9PSAnb3Blbi1pbnN0YW50JyAmJiB0aGlzLl9hbmltYXRpb25Nb2RlICE9PSAnTm9vcEFuaW1hdGlvbnMnKSB7XG4gICAgICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21hdC1kcmF3ZXItdHJhbnNpdGlvbicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVDb250ZW50TWFyZ2lucygpO1xuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuXG4gICAgaWYgKGRyYXdlci5tb2RlICE9PSAnc2lkZScpIHtcbiAgICAgIGRyYXdlci5vcGVuZWRDaGFuZ2VcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX2RyYXdlcnMuY2hhbmdlcykpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fc2V0Q29udGFpbmVyQ2xhc3MoZHJhd2VyLm9wZW5lZCkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmVzIHRvIGRyYXdlciBvblBvc2l0aW9uQ2hhbmdlZCBldmVudCBpbiBvcmRlciB0b1xuICAgKiByZS12YWxpZGF0ZSBkcmF3ZXJzIHdoZW4gdGhlIHBvc2l0aW9uIGNoYW5nZXMuXG4gICAqL1xuICBwcml2YXRlIF93YXRjaERyYXdlclBvc2l0aW9uKGRyYXdlcjogTWF0RHJhd2VyKTogdm9pZCB7XG4gICAgaWYgKCFkcmF3ZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gTk9URTogV2UgbmVlZCB0byB3YWl0IGZvciB0aGUgbWljcm90YXNrIHF1ZXVlIHRvIGJlIGVtcHR5IGJlZm9yZSB2YWxpZGF0aW5nLFxuICAgIC8vIHNpbmNlIGJvdGggZHJhd2VycyBtYXkgYmUgc3dhcHBpbmcgcG9zaXRpb25zIGF0IHRoZSBzYW1lIHRpbWUuXG4gICAgZHJhd2VyLm9uUG9zaXRpb25DaGFuZ2VkLnBpcGUodGFrZVVudGlsKHRoaXMuX2RyYXdlcnMuY2hhbmdlcykpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLl9uZ1pvbmUub25NaWNyb3Rhc2tFbXB0eS5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuX3ZhbGlkYXRlRHJhd2VycygpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogU3Vic2NyaWJlcyB0byBjaGFuZ2VzIGluIGRyYXdlciBtb2RlIHNvIHdlIGNhbiBydW4gY2hhbmdlIGRldGVjdGlvbi4gKi9cbiAgcHJpdmF0ZSBfd2F0Y2hEcmF3ZXJNb2RlKGRyYXdlcjogTWF0RHJhd2VyKTogdm9pZCB7XG4gICAgaWYgKGRyYXdlcikge1xuICAgICAgZHJhd2VyLl9tb2RlQ2hhbmdlZFxuICAgICAgICAucGlwZSh0YWtlVW50aWwobWVyZ2UodGhpcy5fZHJhd2Vycy5jaGFuZ2VzLCB0aGlzLl9kZXN0cm95ZWQpKSlcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy51cGRhdGVDb250ZW50TWFyZ2lucygpO1xuICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKiogVG9nZ2xlcyB0aGUgJ21hdC1kcmF3ZXItb3BlbmVkJyBjbGFzcyBvbiB0aGUgbWFpbiAnbWF0LWRyYXdlci1jb250YWluZXInIGVsZW1lbnQuICovXG4gIHByaXZhdGUgX3NldENvbnRhaW5lckNsYXNzKGlzQWRkOiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3QgY2xhc3NMaXN0ID0gdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdDtcbiAgICBjb25zdCBjbGFzc05hbWUgPSAnbWF0LWRyYXdlci1jb250YWluZXItaGFzLW9wZW4nO1xuXG4gICAgaWYgKGlzQWRkKSB7XG4gICAgICBjbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICB9XG4gIH1cblxuICAvKiogVmFsaWRhdGUgdGhlIHN0YXRlIG9mIHRoZSBkcmF3ZXIgY2hpbGRyZW4gY29tcG9uZW50cy4gKi9cbiAgcHJpdmF0ZSBfdmFsaWRhdGVEcmF3ZXJzKCkge1xuICAgIHRoaXMuX3N0YXJ0ID0gdGhpcy5fZW5kID0gbnVsbDtcblxuICAgIC8vIEVuc3VyZSB0aGF0IHdlIGhhdmUgYXQgbW9zdCBvbmUgc3RhcnQgYW5kIG9uZSBlbmQgZHJhd2VyLlxuICAgIHRoaXMuX2RyYXdlcnMuZm9yRWFjaChkcmF3ZXIgPT4ge1xuICAgICAgaWYgKGRyYXdlci5wb3NpdGlvbiA9PSAnZW5kJykge1xuICAgICAgICBpZiAodGhpcy5fZW5kICE9IG51bGwgJiYgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkpIHtcbiAgICAgICAgICB0aHJvd01hdER1cGxpY2F0ZWREcmF3ZXJFcnJvcignZW5kJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZW5kID0gZHJhd2VyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuX3N0YXJ0ICE9IG51bGwgJiYgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkpIHtcbiAgICAgICAgICB0aHJvd01hdER1cGxpY2F0ZWREcmF3ZXJFcnJvcignc3RhcnQnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdGFydCA9IGRyYXdlcjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuX3JpZ2h0ID0gdGhpcy5fbGVmdCA9IG51bGw7XG5cbiAgICAvLyBEZXRlY3QgaWYgd2UncmUgTFRSIG9yIFJUTC5cbiAgICBpZiAodGhpcy5fZGlyICYmIHRoaXMuX2Rpci52YWx1ZSA9PT0gJ3J0bCcpIHtcbiAgICAgIHRoaXMuX2xlZnQgPSB0aGlzLl9lbmQ7XG4gICAgICB0aGlzLl9yaWdodCA9IHRoaXMuX3N0YXJ0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9sZWZ0ID0gdGhpcy5fc3RhcnQ7XG4gICAgICB0aGlzLl9yaWdodCA9IHRoaXMuX2VuZDtcbiAgICB9XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgY29udGFpbmVyIGlzIGJlaW5nIHB1c2hlZCB0byB0aGUgc2lkZSBieSBvbmUgb2YgdGhlIGRyYXdlcnMuICovXG4gIHByaXZhdGUgX2lzUHVzaGVkKCkge1xuICAgIHJldHVybiAoXG4gICAgICAodGhpcy5faXNEcmF3ZXJPcGVuKHRoaXMuX3N0YXJ0KSAmJiB0aGlzLl9zdGFydC5tb2RlICE9ICdvdmVyJykgfHxcbiAgICAgICh0aGlzLl9pc0RyYXdlck9wZW4odGhpcy5fZW5kKSAmJiB0aGlzLl9lbmQubW9kZSAhPSAnb3ZlcicpXG4gICAgKTtcbiAgfVxuXG4gIF9vbkJhY2tkcm9wQ2xpY2tlZCgpIHtcbiAgICB0aGlzLmJhY2tkcm9wQ2xpY2suZW1pdCgpO1xuICAgIHRoaXMuX2Nsb3NlTW9kYWxEcmF3ZXJzVmlhQmFja2Ryb3AoKTtcbiAgfVxuXG4gIF9jbG9zZU1vZGFsRHJhd2Vyc1ZpYUJhY2tkcm9wKCkge1xuICAgIC8vIENsb3NlIGFsbCBvcGVuIGRyYXdlcnMgd2hlcmUgY2xvc2luZyBpcyBub3QgZGlzYWJsZWQgYW5kIHRoZSBtb2RlIGlzIG5vdCBgc2lkZWAuXG4gICAgW3RoaXMuX3N0YXJ0LCB0aGlzLl9lbmRdXG4gICAgICAuZmlsdGVyKGRyYXdlciA9PiBkcmF3ZXIgJiYgIWRyYXdlci5kaXNhYmxlQ2xvc2UgJiYgdGhpcy5fZHJhd2VySGFzQmFja2Ryb3AoZHJhd2VyKSlcbiAgICAgIC5mb3JFYWNoKGRyYXdlciA9PiBkcmF3ZXIhLl9jbG9zZVZpYUJhY2tkcm9wQ2xpY2soKSk7XG4gIH1cblxuICBfaXNTaG93aW5nQmFja2Ryb3AoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgICh0aGlzLl9pc0RyYXdlck9wZW4odGhpcy5fc3RhcnQpICYmIHRoaXMuX2RyYXdlckhhc0JhY2tkcm9wKHRoaXMuX3N0YXJ0KSkgfHxcbiAgICAgICh0aGlzLl9pc0RyYXdlck9wZW4odGhpcy5fZW5kKSAmJiB0aGlzLl9kcmF3ZXJIYXNCYWNrZHJvcCh0aGlzLl9lbmQpKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9pc0RyYXdlck9wZW4oZHJhd2VyOiBNYXREcmF3ZXIgfCBudWxsKTogZHJhd2VyIGlzIE1hdERyYXdlciB7XG4gICAgcmV0dXJuIGRyYXdlciAhPSBudWxsICYmIGRyYXdlci5vcGVuZWQ7XG4gIH1cblxuICAvLyBXaGV0aGVyIGFyZ3VtZW50IGRyYXdlciBzaG91bGQgaGF2ZSBhIGJhY2tkcm9wIHdoZW4gaXQgb3BlbnNcbiAgcHJpdmF0ZSBfZHJhd2VySGFzQmFja2Ryb3AoZHJhd2VyOiBNYXREcmF3ZXIgfCBudWxsKSB7XG4gICAgaWYgKHRoaXMuX2JhY2tkcm9wT3ZlcnJpZGUgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuICEhZHJhd2VyICYmIGRyYXdlci5tb2RlICE9PSAnc2lkZSc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2JhY2tkcm9wT3ZlcnJpZGU7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJtYXQtZHJhd2VyLWlubmVyLWNvbnRhaW5lclwiIGNka1Njcm9sbGFibGUgI2NvbnRlbnQ+XHJcbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG48L2Rpdj5cclxuIiwiQGlmIChoYXNCYWNrZHJvcCkge1xuICA8ZGl2IGNsYXNzPVwibWF0LWRyYXdlci1iYWNrZHJvcFwiIChjbGljayk9XCJfb25CYWNrZHJvcENsaWNrZWQoKVwiXG4gICAgICAgW2NsYXNzLm1hdC1kcmF3ZXItc2hvd25dPVwiX2lzU2hvd2luZ0JhY2tkcm9wKClcIj48L2Rpdj5cbn1cblxuPG5nLWNvbnRlbnQgc2VsZWN0PVwibWF0LWRyYXdlclwiPjwvbmctY29udGVudD5cblxuPG5nLWNvbnRlbnQgc2VsZWN0PVwibWF0LWRyYXdlci1jb250ZW50XCI+XG48L25nLWNvbnRlbnQ+XG5cbkBpZiAoIV9jb250ZW50KSB7XG4gIDxtYXQtZHJhd2VyLWNvbnRlbnQ+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICA8L21hdC1kcmF3ZXItY29udGVudD5cbn1cbiJdfQ==