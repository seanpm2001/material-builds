/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { BACKSPACE, DELETE, SPACE } from '@angular/cdk/keycodes';
import { Platform } from '@angular/cdk/platform';
import { ContentChild, Directive, ElementRef, EventEmitter, forwardRef, Inject, Input, NgZone, Optional, Output, ChangeDetectorRef, } from '@angular/core';
import { MAT_RIPPLE_GLOBAL_OPTIONS, mixinColor, mixinDisabled, mixinDisableRipple, RippleRenderer, } from '@angular/material/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
/**
 * Represents an event fired on an individual `mat-chip`.
 * @record
 */
export function MatChipEvent() { }
if (false) {
    /**
     * The chip the event was fired on.
     * @type {?}
     */
    MatChipEvent.prototype.chip;
}
/**
 * Event object emitted by MatChip when selected or deselected.
 */
export class MatChipSelectionChange {
    /**
     * @param {?} source
     * @param {?} selected
     * @param {?=} isUserInput
     */
    constructor(source, selected, isUserInput = false) {
        this.source = source;
        this.selected = selected;
        this.isUserInput = isUserInput;
    }
}
if (false) {
    /**
     * Reference to the chip that emitted the event.
     * @type {?}
     */
    MatChipSelectionChange.prototype.source;
    /**
     * Whether the chip that emitted the event is selected.
     * @type {?}
     */
    MatChipSelectionChange.prototype.selected;
    /**
     * Whether the selection change was a result of a user interaction.
     * @type {?}
     */
    MatChipSelectionChange.prototype.isUserInput;
}
// Boilerplate for applying mixins to MatChip.
/**
 * \@docs-private
 */
class MatChipBase {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
if (false) {
    /** @type {?} */
    MatChipBase.prototype._elementRef;
}
/** @type {?} */
const _MatChipMixinBase = mixinColor(mixinDisableRipple(mixinDisabled(MatChipBase)), 'primary');
/**
 * Dummy directive to add CSS class to chip avatar.
 * \@docs-private
 */
export class MatChipAvatar {
}
MatChipAvatar.decorators = [
    { type: Directive, args: [{
                selector: 'mat-chip-avatar, [matChipAvatar]',
                host: { 'class': 'mat-chip-avatar' }
            },] }
];
/**
 * Dummy directive to add CSS class to chip trailing icon.
 * \@docs-private
 */
export class MatChipTrailingIcon {
}
MatChipTrailingIcon.decorators = [
    { type: Directive, args: [{
                selector: 'mat-chip-trailing-icon, [matChipTrailingIcon]',
                host: { 'class': 'mat-chip-trailing-icon' }
            },] }
];
/**
 * Material design styled Chip component. Used inside the MatChipList component.
 */
export class MatChip extends _MatChipMixinBase {
    /**
     * @param {?} _elementRef
     * @param {?} _ngZone
     * @param {?} platform
     * @param {?} globalRippleOptions
     * @param {?=} animationMode
     * @param {?=} _changeDetectorRef
     */
    constructor(_elementRef, _ngZone, platform, globalRippleOptions, 
    // @breaking-change 8.0.0 `animationMode` parameter to become required.
    animationMode, _changeDetectorRef) {
        super(_elementRef);
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        this._changeDetectorRef = _changeDetectorRef;
        /**
         * Whether the chip has focus.
         */
        this._hasFocus = false;
        /**
         * Whether the chip list is selectable
         */
        this.chipListSelectable = true;
        /**
         * Whether the chip list is in multi-selection mode.
         */
        this._chipListMultiple = false;
        this._selected = false;
        this._selectable = true;
        this._removable = true;
        /**
         * Emits when the chip is focused.
         */
        this._onFocus = new Subject();
        /**
         * Emits when the chip is blured.
         */
        this._onBlur = new Subject();
        /**
         * Emitted when the chip is selected or deselected.
         */
        this.selectionChange = new EventEmitter();
        /**
         * Emitted when the chip is destroyed.
         */
        this.destroyed = new EventEmitter();
        /**
         * Emitted when a chip is to be removed.
         */
        this.removed = new EventEmitter();
        this._addHostClassName();
        this._chipRipple = new RippleRenderer(this, _ngZone, _elementRef, platform);
        this._chipRipple.setupTriggerEvents(_elementRef);
        this.rippleConfig = globalRippleOptions || {};
        this._animationsDisabled = animationMode === 'NoopAnimations';
    }
    /**
     * Whether ripples are disabled on interaction
     * \@docs-private
     * @return {?}
     */
    get rippleDisabled() {
        return this.disabled || this.disableRipple || !!this.rippleConfig.disabled;
    }
    /**
     * Whether the chip is selected.
     * @return {?}
     */
    get selected() { return this._selected; }
    /**
     * @param {?} value
     * @return {?}
     */
    set selected(value) {
        /** @type {?} */
        const coercedValue = coerceBooleanProperty(value);
        if (coercedValue !== this._selected) {
            this._selected = coercedValue;
            this._dispatchSelectionChange();
        }
    }
    /**
     * The value of the chip. Defaults to the content inside `<mat-chip>` tags.
     * @return {?}
     */
    get value() {
        return this._value !== undefined
            ? this._value
            : this._elementRef.nativeElement.textContent;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) { this._value = value; }
    /**
     * Whether or not the chip is selectable. When a chip is not selectable,
     * changes to its selected state are always ignored. By default a chip is
     * selectable, and it becomes non-selectable if its parent chip list is
     * not selectable.
     * @return {?}
     */
    get selectable() { return this._selectable && this.chipListSelectable; }
    /**
     * @param {?} value
     * @return {?}
     */
    set selectable(value) {
        this._selectable = coerceBooleanProperty(value);
    }
    /**
     * Determines whether or not the chip displays the remove styling and emits (removed) events.
     * @return {?}
     */
    get removable() { return this._removable; }
    /**
     * @param {?} value
     * @return {?}
     */
    set removable(value) {
        this._removable = coerceBooleanProperty(value);
    }
    /**
     * The ARIA selected applied to the chip.
     * @return {?}
     */
    get ariaSelected() {
        // Remove the `aria-selected` when the chip is deselected in single-selection mode, because
        // it adds noise to NVDA users where "not selected" will be read out for each chip.
        return this.selectable && (this._chipListMultiple || this.selected) ?
            this.selected.toString() : null;
    }
    /**
     * @return {?}
     */
    _addHostClassName() {
        /** @type {?} */
        const basicChipAttrName = 'mat-basic-chip';
        /** @type {?} */
        const element = (/** @type {?} */ (this._elementRef.nativeElement));
        if (element.hasAttribute(basicChipAttrName) ||
            element.tagName.toLowerCase() === basicChipAttrName) {
            element.classList.add(basicChipAttrName);
            return;
        }
        else {
            element.classList.add('mat-standard-chip');
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroyed.emit({ chip: this });
        this._chipRipple._removeTriggerEvents();
    }
    /**
     * Selects the chip.
     * @return {?}
     */
    select() {
        if (!this._selected) {
            this._selected = true;
            this._dispatchSelectionChange();
            this._markForCheck();
        }
    }
    /**
     * Deselects the chip.
     * @return {?}
     */
    deselect() {
        if (this._selected) {
            this._selected = false;
            this._dispatchSelectionChange();
            this._markForCheck();
        }
    }
    /**
     * Select this chip and emit selected event
     * @return {?}
     */
    selectViaInteraction() {
        if (!this._selected) {
            this._selected = true;
            this._dispatchSelectionChange(true);
            this._markForCheck();
        }
    }
    /**
     * Toggles the current selected state of this chip.
     * @param {?=} isUserInput
     * @return {?}
     */
    toggleSelected(isUserInput = false) {
        this._selected = !this.selected;
        this._dispatchSelectionChange(isUserInput);
        this._markForCheck();
        return this.selected;
    }
    /**
     * Allows for programmatic focusing of the chip.
     * @return {?}
     */
    focus() {
        if (!this._hasFocus) {
            this._elementRef.nativeElement.focus();
            this._onFocus.next({ chip: this });
        }
        this._hasFocus = true;
    }
    /**
     * Allows for programmatic removal of the chip. Called by the MatChipList when the DELETE or
     * BACKSPACE keys are pressed.
     *
     * Informs any listeners of the removal request. Does not remove the chip from the DOM.
     * @return {?}
     */
    remove() {
        if (this.removable) {
            this.removed.emit({ chip: this });
        }
    }
    /**
     * Handles click events on the chip.
     * @param {?} event
     * @return {?}
     */
    _handleClick(event) {
        if (this.disabled) {
            event.preventDefault();
        }
        else {
            event.stopPropagation();
        }
    }
    /**
     * Handle custom key presses.
     * @param {?} event
     * @return {?}
     */
    _handleKeydown(event) {
        if (this.disabled) {
            return;
        }
        switch (event.keyCode) {
            case DELETE:
            case BACKSPACE:
                // If we are removable, remove the focused chip
                this.remove();
                // Always prevent so page navigation does not occur
                event.preventDefault();
                break;
            case SPACE:
                // If we are selectable, toggle the focused chip
                if (this.selectable) {
                    this.toggleSelected(true);
                }
                // Always prevent space from scrolling the page since the list has focus
                event.preventDefault();
                break;
        }
    }
    /**
     * @return {?}
     */
    _blur() {
        // When animations are enabled, Angular may end up removing the chip from the DOM a little
        // earlier than usual, causing it to be blurred and throwing off the logic in the chip list
        // that moves focus not the next item. To work around the issue, we defer marking the chip
        // as not focused until the next time the zone stabilizes.
        this._ngZone.onStable
            .asObservable()
            .pipe(take(1))
            .subscribe((/**
         * @return {?}
         */
        () => {
            this._ngZone.run((/**
             * @return {?}
             */
            () => {
                this._hasFocus = false;
                this._onBlur.next({ chip: this });
            }));
        }));
    }
    /**
     * @private
     * @param {?=} isUserInput
     * @return {?}
     */
    _dispatchSelectionChange(isUserInput = false) {
        this.selectionChange.emit({
            source: this,
            isUserInput,
            selected: this._selected
        });
    }
    /**
     * @private
     * @return {?}
     */
    _markForCheck() {
        // @breaking-change 9.0.0 Remove this method once the _changeDetectorRef is a required param.
        if (this._changeDetectorRef) {
            this._changeDetectorRef.markForCheck();
        }
    }
}
MatChip.decorators = [
    { type: Directive, args: [{
                selector: `mat-basic-chip, [mat-basic-chip], mat-chip, [mat-chip]`,
                inputs: ['color', 'disabled', 'disableRipple'],
                exportAs: 'matChip',
                host: {
                    'class': 'mat-chip',
                    '[attr.tabindex]': 'disabled ? null : -1',
                    'role': 'option',
                    '[class.mat-chip-selected]': 'selected',
                    '[class.mat-chip-with-avatar]': 'avatar',
                    '[class.mat-chip-with-trailing-icon]': 'trailingIcon || removeIcon',
                    '[class.mat-chip-disabled]': 'disabled',
                    '[class._mat-animation-noopable]': '_animationsDisabled',
                    '[attr.disabled]': 'disabled || null',
                    '[attr.aria-disabled]': 'disabled.toString()',
                    '[attr.aria-selected]': 'ariaSelected',
                    '(click)': '_handleClick($event)',
                    '(keydown)': '_handleKeydown($event)',
                    '(focus)': 'focus()',
                    '(blur)': '_blur()',
                },
            },] }
];
/** @nocollapse */
MatChip.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: Platform },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_RIPPLE_GLOBAL_OPTIONS,] }] },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [ANIMATION_MODULE_TYPE,] }] },
    { type: ChangeDetectorRef }
];
MatChip.propDecorators = {
    avatar: [{ type: ContentChild, args: [MatChipAvatar,] }],
    trailingIcon: [{ type: ContentChild, args: [MatChipTrailingIcon,] }],
    removeIcon: [{ type: ContentChild, args: [forwardRef((/**
                 * @return {?}
                 */
                () => MatChipRemove)),] }],
    selected: [{ type: Input }],
    value: [{ type: Input }],
    selectable: [{ type: Input }],
    removable: [{ type: Input }],
    selectionChange: [{ type: Output }],
    destroyed: [{ type: Output }],
    removed: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    MatChip.ngAcceptInputType_selected;
    /** @type {?} */
    MatChip.ngAcceptInputType_selectable;
    /** @type {?} */
    MatChip.ngAcceptInputType_removable;
    /** @type {?} */
    MatChip.ngAcceptInputType_disabled;
    /** @type {?} */
    MatChip.ngAcceptInputType_disableRipple;
    /**
     * Reference to the RippleRenderer for the chip.
     * @type {?}
     * @private
     */
    MatChip.prototype._chipRipple;
    /**
     * Ripple configuration for ripples that are launched on pointer down. The ripple config
     * is set to the global ripple options since we don't have any configurable options for
     * the chip ripples.
     * \@docs-private
     * @type {?}
     */
    MatChip.prototype.rippleConfig;
    /**
     * Whether the chip has focus.
     * @type {?}
     */
    MatChip.prototype._hasFocus;
    /**
     * Whether animations for the chip are enabled.
     * @type {?}
     */
    MatChip.prototype._animationsDisabled;
    /**
     * Whether the chip list is selectable
     * @type {?}
     */
    MatChip.prototype.chipListSelectable;
    /**
     * Whether the chip list is in multi-selection mode.
     * @type {?}
     */
    MatChip.prototype._chipListMultiple;
    /**
     * The chip avatar
     * @type {?}
     */
    MatChip.prototype.avatar;
    /**
     * The chip's trailing icon.
     * @type {?}
     */
    MatChip.prototype.trailingIcon;
    /**
     * The chip's remove toggler.
     * @type {?}
     */
    MatChip.prototype.removeIcon;
    /**
     * @type {?}
     * @protected
     */
    MatChip.prototype._selected;
    /**
     * @type {?}
     * @protected
     */
    MatChip.prototype._value;
    /**
     * @type {?}
     * @protected
     */
    MatChip.prototype._selectable;
    /**
     * @type {?}
     * @protected
     */
    MatChip.prototype._removable;
    /**
     * Emits when the chip is focused.
     * @type {?}
     */
    MatChip.prototype._onFocus;
    /**
     * Emits when the chip is blured.
     * @type {?}
     */
    MatChip.prototype._onBlur;
    /**
     * Emitted when the chip is selected or deselected.
     * @type {?}
     */
    MatChip.prototype.selectionChange;
    /**
     * Emitted when the chip is destroyed.
     * @type {?}
     */
    MatChip.prototype.destroyed;
    /**
     * Emitted when a chip is to be removed.
     * @type {?}
     */
    MatChip.prototype.removed;
    /** @type {?} */
    MatChip.prototype._elementRef;
    /**
     * @type {?}
     * @private
     */
    MatChip.prototype._ngZone;
    /**
     * @type {?}
     * @private
     */
    MatChip.prototype._changeDetectorRef;
}
/**
 * Applies proper (click) support and adds styling for use with the Material Design "cancel" icon
 * available at https://material.io/icons/#ic_cancel.
 *
 * Example:
 *
 *     `<mat-chip>
 *       <mat-icon matChipRemove>cancel</mat-icon>
 *     </mat-chip>`
 *
 * You *may* use a custom icon, but you may need to override the `mat-chip-remove` positioning
 * styles to properly center the icon within the chip.
 */
export class MatChipRemove {
    /**
     * @param {?} _parentChip
     */
    constructor(_parentChip) {
        this._parentChip = _parentChip;
    }
    /**
     * Calls the parent chip's public `remove()` method if applicable.
     * @param {?} event
     * @return {?}
     */
    _handleClick(event) {
        /** @type {?} */
        const parentChip = this._parentChip;
        if (parentChip.removable && !parentChip.disabled) {
            parentChip.remove();
        }
        // We need to stop event propagation because otherwise the event will bubble up to the
        // form field and cause the `onContainerClick` method to be invoked. This method would then
        // reset the focused chip that has been focused after chip removal. Usually the parent
        // the parent click listener of the `MatChip` would prevent propagation, but it can happen
        // that the chip is being removed before the event bubbles up.
        event.stopPropagation();
    }
}
MatChipRemove.decorators = [
    { type: Directive, args: [{
                selector: '[matChipRemove]',
                host: {
                    'class': 'mat-chip-remove mat-chip-trailing-icon',
                    '(click)': '_handleClick($event)',
                }
            },] }
];
/** @nocollapse */
MatChipRemove.ctorParameters = () => [
    { type: MatChip }
];
if (false) {
    /**
     * @type {?}
     * @protected
     */
    MatChipRemove.prototype._parentChip;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9jaGlwcy9jaGlwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBU0EsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDNUQsT0FBTyxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDL0QsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQy9DLE9BQU8sRUFDTCxZQUFZLEVBQ1osU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUVOLFFBQVEsRUFDUixNQUFNLEVBQ04saUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFPTCx5QkFBeUIsRUFDekIsVUFBVSxFQUNWLGFBQWEsRUFDYixrQkFBa0IsRUFHbEIsY0FBYyxHQUVmLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM3QixPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEMsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7Ozs7O0FBSTNFLGtDQUdDOzs7Ozs7SUFEQyw0QkFBYzs7Ozs7QUFJaEIsTUFBTSxPQUFPLHNCQUFzQjs7Ozs7O0lBQ2pDLFlBRVMsTUFBZSxFQUVmLFFBQWlCLEVBRWpCLGNBQWMsS0FBSztRQUpuQixXQUFNLEdBQU4sTUFBTSxDQUFTO1FBRWYsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUVqQixnQkFBVyxHQUFYLFdBQVcsQ0FBUTtJQUFJLENBQUM7Q0FDbEM7Ozs7OztJQUxHLHdDQUFzQjs7Ozs7SUFFdEIsMENBQXdCOzs7OztJQUV4Qiw2Q0FB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YXRCLDhCQUFzQzs7Ozs7SUFVdEMsNkJBQXFDOzs7OztJQUdyQywyQkFBZ0Q7Ozs7O0lBR2hELDBCQUErQzs7Ozs7SUFHL0Msa0NBQytDOzs7OztJQUcvQyw0QkFBNEY7Ozs7O0lBRzVGLDBCQUEwRjs7SUFVOUUsOEJBQTJDOzs7OztJQUMzQywwQkFBdUI7Ozs7O0lBT3ZCLHFDQUE4Qzs7Ozs7Ozs7Ozs7Ozs7O0FBbUw1RCxNQUFNLE9BQU8sYUFBYTs7OztJQUN4QixZQUFzQixXQUFvQjtRQUFwQixnQkFBVyxHQUFYLFdBQVcsQ0FBUztJQUFHLENBQUM7Ozs7OztJQUc5QyxZQUFZLENBQUMsS0FBWTs7Y0FDakIsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXO1FBRW5DLElBQUksVUFBVSxDQUFDLFNBQVMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUU7WUFDaEQsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3JCO1FBRUQsc0ZBQXNGO1FBQ3RGLDJGQUEyRjtRQUMzRixzRkFBc0Y7UUFDdEYsMEZBQTBGO1FBQzFGLDhEQUE4RDtRQUM5RCxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDMUIsQ0FBQzs7O1lBeEJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixJQUFJLEVBQUU7b0JBQ0osT0FBTyxFQUFFLHdDQUF3QztvQkFDakQsU0FBUyxFQUFFLHNCQUFzQjtpQkFDbEM7YUFDRjs7OztZQUVvQyxPQUFPOzs7Ozs7O0lBQTlCLG9DQUE4QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0ZvY3VzYWJsZU9wdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHtjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge0JBQ0tTUEFDRSwgREVMRVRFLCBTUEFDRX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7UGxhdGZvcm19IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQge1xuICBDb250ZW50Q2hpbGQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ2FuQ29sb3IsXG4gIENhbkNvbG9yQ3RvcixcbiAgQ2FuRGlzYWJsZSxcbiAgQ2FuRGlzYWJsZUN0b3IsXG4gIENhbkRpc2FibGVSaXBwbGUsXG4gIENhbkRpc2FibGVSaXBwbGVDdG9yLFxuICBNQVRfUklQUExFX0dMT0JBTF9PUFRJT05TLFxuICBtaXhpbkNvbG9yLFxuICBtaXhpbkRpc2FibGVkLFxuICBtaXhpbkRpc2FibGVSaXBwbGUsXG4gIFJpcHBsZUNvbmZpZyxcbiAgUmlwcGxlR2xvYmFsT3B0aW9ucyxcbiAgUmlwcGxlUmVuZGVyZXIsXG4gIFJpcHBsZVRhcmdldCxcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHt0YWtlfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge0FOSU1BVElPTl9NT0RVTEVfVFlQRX0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcblxuXG4vKiogUmVwcmVzZW50cyBhbiBldmVudCBmaXJlZCBvbiBhbiBpbmRpdmlkdWFsIGBtYXQtY2hpcGAuICovXG5leHBvcnQgaW50ZXJmYWNlIE1hdENoaXBFdmVudCB7XG4gIC8qKiBUaGUgY2hpcCB0aGUgZXZlbnQgd2FzIGZpcmVkIG9uLiAqL1xuICBjaGlwOiBNYXRDaGlwO1xufVxuXG4vKiogRXZlbnQgb2JqZWN0IGVtaXR0ZWQgYnkgTWF0Q2hpcCB3aGVuIHNlbGVjdGVkIG9yIGRlc2VsZWN0ZWQuICovXG5leHBvcnQgY2xhc3MgTWF0Q2hpcFNlbGVjdGlvbkNoYW5nZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIC8qKiBSZWZlcmVuY2UgdG8gdGhlIGNoaXAgdGhhdCBlbWl0dGVkIHRoZSBldmVudC4gKi9cbiAgICBwdWJsaWMgc291cmNlOiBNYXRDaGlwLFxuICAgIC8qKiBXaGV0aGVyIHRoZSBjaGlwIHRoYXQgZW1pdHRlZCB0aGUgZXZlbnQgaXMgc2VsZWN0ZWQuICovXG4gICAgcHVibGljIHNlbGVjdGVkOiBib29sZWFuLFxuICAgIC8qKiBXaGV0aGVyIHRoZSBzZWxlY3Rpb24gY2hhbmdlIHdhcyBhIHJlc3VsdCBvZiBhIHVzZXIgaW50ZXJhY3Rpb24uICovXG4gICAgcHVibGljIGlzVXNlcklucHV0ID0gZmFsc2UpIHsgfVxufVxuXG5cbi8vIEJvaWxlcnBsYXRlIGZvciBhcHBseWluZyBtaXhpbnMgdG8gTWF0Q2hpcC5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5jbGFzcyBNYXRDaGlwQmFzZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cblxuY29uc3QgX01hdENoaXBNaXhpbkJhc2U6IENhbkNvbG9yQ3RvciAmIENhbkRpc2FibGVSaXBwbGVDdG9yICYgQ2FuRGlzYWJsZUN0b3IgJiB0eXBlb2YgTWF0Q2hpcEJhc2UgPVxuICAgIG1peGluQ29sb3IobWl4aW5EaXNhYmxlUmlwcGxlKG1peGluRGlzYWJsZWQoTWF0Q2hpcEJhc2UpKSwgJ3ByaW1hcnknKTtcblxuLyoqXG4gKiBEdW1teSBkaXJlY3RpdmUgdG8gYWRkIENTUyBjbGFzcyB0byBjaGlwIGF2YXRhci5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbWF0LWNoaXAtYXZhdGFyLCBbbWF0Q2hpcEF2YXRhcl0nLFxuICBob3N0OiB7J2NsYXNzJzogJ21hdC1jaGlwLWF2YXRhcid9XG59KVxuZXhwb3J0IGNsYXNzIE1hdENoaXBBdmF0YXIge31cblxuLyoqXG4gKiBEdW1teSBkaXJlY3RpdmUgdG8gYWRkIENTUyBjbGFzcyB0byBjaGlwIHRyYWlsaW5nIGljb24uXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ21hdC1jaGlwLXRyYWlsaW5nLWljb24sIFttYXRDaGlwVHJhaWxpbmdJY29uXScsXG4gIGhvc3Q6IHsnY2xhc3MnOiAnbWF0LWNoaXAtdHJhaWxpbmctaWNvbid9XG59KVxuZXhwb3J0IGNsYXNzIE1hdENoaXBUcmFpbGluZ0ljb24ge31cblxuLyoqXG4gKiBNYXRlcmlhbCBkZXNpZ24gc3R5bGVkIENoaXAgY29tcG9uZW50LiBVc2VkIGluc2lkZSB0aGUgTWF0Q2hpcExpc3QgY29tcG9uZW50LlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6IGBtYXQtYmFzaWMtY2hpcCwgW21hdC1iYXNpYy1jaGlwXSwgbWF0LWNoaXAsIFttYXQtY2hpcF1gLFxuICBpbnB1dHM6IFsnY29sb3InLCAnZGlzYWJsZWQnLCAnZGlzYWJsZVJpcHBsZSddLFxuICBleHBvcnRBczogJ21hdENoaXAnLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1jaGlwJyxcbiAgICAnW2F0dHIudGFiaW5kZXhdJzogJ2Rpc2FibGVkID8gbnVsbCA6IC0xJyxcbiAgICAncm9sZSc6ICdvcHRpb24nLFxuICAgICdbY2xhc3MubWF0LWNoaXAtc2VsZWN0ZWRdJzogJ3NlbGVjdGVkJyxcbiAgICAnW2NsYXNzLm1hdC1jaGlwLXdpdGgtYXZhdGFyXSc6ICdhdmF0YXInLFxuICAgICdbY2xhc3MubWF0LWNoaXAtd2l0aC10cmFpbGluZy1pY29uXSc6ICd0cmFpbGluZ0ljb24gfHwgcmVtb3ZlSWNvbicsXG4gICAgJ1tjbGFzcy5tYXQtY2hpcC1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICdbY2xhc3MuX21hdC1hbmltYXRpb24tbm9vcGFibGVdJzogJ19hbmltYXRpb25zRGlzYWJsZWQnLFxuICAgICdbYXR0ci5kaXNhYmxlZF0nOiAnZGlzYWJsZWQgfHwgbnVsbCcsXG4gICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJ2Rpc2FibGVkLnRvU3RyaW5nKCknLFxuICAgICdbYXR0ci5hcmlhLXNlbGVjdGVkXSc6ICdhcmlhU2VsZWN0ZWQnLFxuICAgICcoY2xpY2spJzogJ19oYW5kbGVDbGljaygkZXZlbnQpJyxcbiAgICAnKGtleWRvd24pJzogJ19oYW5kbGVLZXlkb3duKCRldmVudCknLFxuICAgICcoZm9jdXMpJzogJ2ZvY3VzKCknLFxuICAgICcoYmx1ciknOiAnX2JsdXIoKScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdENoaXAgZXh0ZW5kcyBfTWF0Q2hpcE1peGluQmFzZSBpbXBsZW1lbnRzIEZvY3VzYWJsZU9wdGlvbiwgT25EZXN0cm95LCBDYW5Db2xvcixcbiAgICBDYW5EaXNhYmxlLCBDYW5EaXNhYmxlUmlwcGxlLCBSaXBwbGVUYXJnZXQge1xuXG4gIC8qKiBSZWZlcmVuY2UgdG8gdGhlIFJpcHBsZVJlbmRlcmVyIGZvciB0aGUgY2hpcC4gKi9cbiAgcHJpdmF0ZSBfY2hpcFJpcHBsZTogUmlwcGxlUmVuZGVyZXI7XG5cbiAgLyoqXG4gICAqIFJpcHBsZSBjb25maWd1cmF0aW9uIGZvciByaXBwbGVzIHRoYXQgYXJlIGxhdW5jaGVkIG9uIHBvaW50ZXIgZG93bi4gVGhlIHJpcHBsZSBjb25maWdcbiAgICogaXMgc2V0IHRvIHRoZSBnbG9iYWwgcmlwcGxlIG9wdGlvbnMgc2luY2Ugd2UgZG9uJ3QgaGF2ZSBhbnkgY29uZmlndXJhYmxlIG9wdGlvbnMgZm9yXG4gICAqIHRoZSBjaGlwIHJpcHBsZXMuXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIHJpcHBsZUNvbmZpZzogUmlwcGxlQ29uZmlnICYgUmlwcGxlR2xvYmFsT3B0aW9ucztcblxuICAvKipcbiAgICogV2hldGhlciByaXBwbGVzIGFyZSBkaXNhYmxlZCBvbiBpbnRlcmFjdGlvblxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBnZXQgcmlwcGxlRGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5kaXNhYmxlUmlwcGxlIHx8ICEhdGhpcy5yaXBwbGVDb25maWcuZGlzYWJsZWQ7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgY2hpcCBoYXMgZm9jdXMuICovXG4gIF9oYXNGb2N1czogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIGFuaW1hdGlvbnMgZm9yIHRoZSBjaGlwIGFyZSBlbmFibGVkLiAqL1xuICBfYW5pbWF0aW9uc0Rpc2FibGVkOiBib29sZWFuO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBjaGlwIGxpc3QgaXMgc2VsZWN0YWJsZSAqL1xuICBjaGlwTGlzdFNlbGVjdGFibGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBjaGlwIGxpc3QgaXMgaW4gbXVsdGktc2VsZWN0aW9uIG1vZGUuICovXG4gIF9jaGlwTGlzdE11bHRpcGxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIFRoZSBjaGlwIGF2YXRhciAqL1xuICBAQ29udGVudENoaWxkKE1hdENoaXBBdmF0YXIpIGF2YXRhcjogTWF0Q2hpcEF2YXRhcjtcblxuICAvKiogVGhlIGNoaXAncyB0cmFpbGluZyBpY29uLiAqL1xuICBAQ29udGVudENoaWxkKE1hdENoaXBUcmFpbGluZ0ljb24pIHRyYWlsaW5nSWNvbjogTWF0Q2hpcFRyYWlsaW5nSWNvbjtcblxuICAvKiogVGhlIGNoaXAncyByZW1vdmUgdG9nZ2xlci4gKi9cbiAgQENvbnRlbnRDaGlsZChmb3J3YXJkUmVmKCgpID0+IE1hdENoaXBSZW1vdmUpKSByZW1vdmVJY29uOiBNYXRDaGlwUmVtb3ZlO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBjaGlwIGlzIHNlbGVjdGVkLiAqL1xuICBASW5wdXQoKVxuICBnZXQgc2VsZWN0ZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9zZWxlY3RlZDsgfVxuICBzZXQgc2VsZWN0ZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBjb25zdCBjb2VyY2VkVmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuXG4gICAgaWYgKGNvZXJjZWRWYWx1ZSAhPT0gdGhpcy5fc2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuX3NlbGVjdGVkID0gY29lcmNlZFZhbHVlO1xuICAgICAgdGhpcy5fZGlzcGF0Y2hTZWxlY3Rpb25DaGFuZ2UoKTtcbiAgICB9XG4gIH1cbiAgcHJvdGVjdGVkIF9zZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKiBUaGUgdmFsdWUgb2YgdGhlIGNoaXAuIERlZmF1bHRzIHRvIHRoZSBjb250ZW50IGluc2lkZSBgPG1hdC1jaGlwPmAgdGFncy4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlICE9PSB1bmRlZmluZWRcbiAgICAgID8gdGhpcy5fdmFsdWVcbiAgICAgIDogdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnRleHRDb250ZW50O1xuICB9XG4gIHNldCB2YWx1ZSh2YWx1ZTogYW55KSB7IHRoaXMuX3ZhbHVlID0gdmFsdWU7IH1cbiAgcHJvdGVjdGVkIF92YWx1ZTogYW55O1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIG9yIG5vdCB0aGUgY2hpcCBpcyBzZWxlY3RhYmxlLiBXaGVuIGEgY2hpcCBpcyBub3Qgc2VsZWN0YWJsZSxcbiAgICogY2hhbmdlcyB0byBpdHMgc2VsZWN0ZWQgc3RhdGUgYXJlIGFsd2F5cyBpZ25vcmVkLiBCeSBkZWZhdWx0IGEgY2hpcCBpc1xuICAgKiBzZWxlY3RhYmxlLCBhbmQgaXQgYmVjb21lcyBub24tc2VsZWN0YWJsZSBpZiBpdHMgcGFyZW50IGNoaXAgbGlzdCBpc1xuICAgKiBub3Qgc2VsZWN0YWJsZS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBzZWxlY3RhYmxlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fc2VsZWN0YWJsZSAmJiB0aGlzLmNoaXBMaXN0U2VsZWN0YWJsZTsgfVxuICBzZXQgc2VsZWN0YWJsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3NlbGVjdGFibGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByb3RlY3RlZCBfc2VsZWN0YWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgd2hldGhlciBvciBub3QgdGhlIGNoaXAgZGlzcGxheXMgdGhlIHJlbW92ZSBzdHlsaW5nIGFuZCBlbWl0cyAocmVtb3ZlZCkgZXZlbnRzLlxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IHJlbW92YWJsZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3JlbW92YWJsZTsgfVxuICBzZXQgcmVtb3ZhYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmVtb3ZhYmxlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcm90ZWN0ZWQgX3JlbW92YWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgLyoqIEVtaXRzIHdoZW4gdGhlIGNoaXAgaXMgZm9jdXNlZC4gKi9cbiAgcmVhZG9ubHkgX29uRm9jdXMgPSBuZXcgU3ViamVjdDxNYXRDaGlwRXZlbnQ+KCk7XG5cbiAgLyoqIEVtaXRzIHdoZW4gdGhlIGNoaXAgaXMgYmx1cmVkLiAqL1xuICByZWFkb25seSBfb25CbHVyID0gbmV3IFN1YmplY3Q8TWF0Q2hpcEV2ZW50PigpO1xuXG4gIC8qKiBFbWl0dGVkIHdoZW4gdGhlIGNoaXAgaXMgc2VsZWN0ZWQgb3IgZGVzZWxlY3RlZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IHNlbGVjdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPE1hdENoaXBTZWxlY3Rpb25DaGFuZ2U+ID1cbiAgICAgIG5ldyBFdmVudEVtaXR0ZXI8TWF0Q2hpcFNlbGVjdGlvbkNoYW5nZT4oKTtcblxuICAvKiogRW1pdHRlZCB3aGVuIHRoZSBjaGlwIGlzIGRlc3Ryb3llZC4gKi9cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGRlc3Ryb3llZDogRXZlbnRFbWl0dGVyPE1hdENoaXBFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1hdENoaXBFdmVudD4oKTtcblxuICAvKiogRW1pdHRlZCB3aGVuIGEgY2hpcCBpcyB0byBiZSByZW1vdmVkLiAqL1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgcmVtb3ZlZDogRXZlbnRFbWl0dGVyPE1hdENoaXBFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE1hdENoaXBFdmVudD4oKTtcblxuICAvKiogVGhlIEFSSUEgc2VsZWN0ZWQgYXBwbGllZCB0byB0aGUgY2hpcC4gKi9cbiAgZ2V0IGFyaWFTZWxlY3RlZCgpOiBzdHJpbmcgfCBudWxsIHtcbiAgICAvLyBSZW1vdmUgdGhlIGBhcmlhLXNlbGVjdGVkYCB3aGVuIHRoZSBjaGlwIGlzIGRlc2VsZWN0ZWQgaW4gc2luZ2xlLXNlbGVjdGlvbiBtb2RlLCBiZWNhdXNlXG4gICAgLy8gaXQgYWRkcyBub2lzZSB0byBOVkRBIHVzZXJzIHdoZXJlIFwibm90IHNlbGVjdGVkXCIgd2lsbCBiZSByZWFkIG91dCBmb3IgZWFjaCBjaGlwLlxuICAgIHJldHVybiB0aGlzLnNlbGVjdGFibGUgJiYgKHRoaXMuX2NoaXBMaXN0TXVsdGlwbGUgfHwgdGhpcy5zZWxlY3RlZCkgP1xuICAgICAgICB0aGlzLnNlbGVjdGVkLnRvU3RyaW5nKCkgOiBudWxsO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsXG4gICAgICAgICAgICAgIHBsYXRmb3JtOiBQbGF0Zm9ybSxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChNQVRfUklQUExFX0dMT0JBTF9PUFRJT05TKVxuICAgICAgICAgICAgICBnbG9iYWxSaXBwbGVPcHRpb25zOiBSaXBwbGVHbG9iYWxPcHRpb25zIHwgbnVsbCxcbiAgICAgICAgICAgICAgLy8gQGJyZWFraW5nLWNoYW5nZSA4LjAuMCBgYW5pbWF0aW9uTW9kZWAgcGFyYW1ldGVyIHRvIGJlY29tZSByZXF1aXJlZC5cbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChBTklNQVRJT05fTU9EVUxFX1RZUEUpIGFuaW1hdGlvbk1vZGU/OiBzdHJpbmcsXG4gICAgICAgICAgICAgIC8vIEBicmVha2luZy1jaGFuZ2UgOS4wLjAgYF9jaGFuZ2VEZXRlY3RvclJlZmAgcGFyYW1ldGVyIHRvIGJlY29tZSByZXF1aXJlZC5cbiAgICAgICAgICAgICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY/OiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHN1cGVyKF9lbGVtZW50UmVmKTtcblxuICAgIHRoaXMuX2FkZEhvc3RDbGFzc05hbWUoKTtcblxuICAgIHRoaXMuX2NoaXBSaXBwbGUgPSBuZXcgUmlwcGxlUmVuZGVyZXIodGhpcywgX25nWm9uZSwgX2VsZW1lbnRSZWYsIHBsYXRmb3JtKTtcbiAgICB0aGlzLl9jaGlwUmlwcGxlLnNldHVwVHJpZ2dlckV2ZW50cyhfZWxlbWVudFJlZik7XG4gICAgdGhpcy5yaXBwbGVDb25maWcgPSBnbG9iYWxSaXBwbGVPcHRpb25zIHx8IHt9O1xuICAgIHRoaXMuX2FuaW1hdGlvbnNEaXNhYmxlZCA9IGFuaW1hdGlvbk1vZGUgPT09ICdOb29wQW5pbWF0aW9ucyc7XG4gIH1cblxuICBfYWRkSG9zdENsYXNzTmFtZSgpIHtcbiAgICBjb25zdCBiYXNpY0NoaXBBdHRyTmFtZSA9ICdtYXQtYmFzaWMtY2hpcCc7XG4gICAgY29uc3QgZWxlbWVudCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcblxuICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZShiYXNpY0NoaXBBdHRyTmFtZSkgfHxcbiAgICAgICAgZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IGJhc2ljQ2hpcEF0dHJOYW1lKSB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoYmFzaWNDaGlwQXR0ck5hbWUpO1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21hdC1zdGFuZGFyZC1jaGlwJyk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5kZXN0cm95ZWQuZW1pdCh7Y2hpcDogdGhpc30pO1xuICAgIHRoaXMuX2NoaXBSaXBwbGUuX3JlbW92ZVRyaWdnZXJFdmVudHMoKTtcbiAgfVxuXG4gIC8qKiBTZWxlY3RzIHRoZSBjaGlwLiAqL1xuICBzZWxlY3QoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9zZWxlY3RlZCkge1xuICAgICAgdGhpcy5fc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgdGhpcy5fZGlzcGF0Y2hTZWxlY3Rpb25DaGFuZ2UoKTtcbiAgICAgIHRoaXMuX21hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBEZXNlbGVjdHMgdGhlIGNoaXAuICovXG4gIGRlc2VsZWN0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9zZWxlY3RlZCkge1xuICAgICAgdGhpcy5fc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuX2Rpc3BhdGNoU2VsZWN0aW9uQ2hhbmdlKCk7XG4gICAgICB0aGlzLl9tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICAvKiogU2VsZWN0IHRoaXMgY2hpcCBhbmQgZW1pdCBzZWxlY3RlZCBldmVudCAqL1xuICBzZWxlY3RWaWFJbnRlcmFjdGlvbigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX3NlbGVjdGVkKSB7XG4gICAgICB0aGlzLl9zZWxlY3RlZCA9IHRydWU7XG4gICAgICB0aGlzLl9kaXNwYXRjaFNlbGVjdGlvbkNoYW5nZSh0cnVlKTtcbiAgICAgIHRoaXMuX21hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBUb2dnbGVzIHRoZSBjdXJyZW50IHNlbGVjdGVkIHN0YXRlIG9mIHRoaXMgY2hpcC4gKi9cbiAgdG9nZ2xlU2VsZWN0ZWQoaXNVc2VySW5wdXQ6IGJvb2xlYW4gPSBmYWxzZSk6IGJvb2xlYW4ge1xuICAgIHRoaXMuX3NlbGVjdGVkID0gIXRoaXMuc2VsZWN0ZWQ7XG4gICAgdGhpcy5fZGlzcGF0Y2hTZWxlY3Rpb25DaGFuZ2UoaXNVc2VySW5wdXQpO1xuICAgIHRoaXMuX21hcmtGb3JDaGVjaygpO1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkO1xuICB9XG5cbiAgLyoqIEFsbG93cyBmb3IgcHJvZ3JhbW1hdGljIGZvY3VzaW5nIG9mIHRoZSBjaGlwLiAqL1xuICBmb2N1cygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2hhc0ZvY3VzKSB7XG4gICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIHRoaXMuX29uRm9jdXMubmV4dCh7Y2hpcDogdGhpc30pO1xuICAgIH1cbiAgICB0aGlzLl9oYXNGb2N1cyA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQWxsb3dzIGZvciBwcm9ncmFtbWF0aWMgcmVtb3ZhbCBvZiB0aGUgY2hpcC4gQ2FsbGVkIGJ5IHRoZSBNYXRDaGlwTGlzdCB3aGVuIHRoZSBERUxFVEUgb3JcbiAgICogQkFDS1NQQUNFIGtleXMgYXJlIHByZXNzZWQuXG4gICAqXG4gICAqIEluZm9ybXMgYW55IGxpc3RlbmVycyBvZiB0aGUgcmVtb3ZhbCByZXF1ZXN0LiBEb2VzIG5vdCByZW1vdmUgdGhlIGNoaXAgZnJvbSB0aGUgRE9NLlxuICAgKi9cbiAgcmVtb3ZlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJlbW92YWJsZSkge1xuICAgICAgdGhpcy5yZW1vdmVkLmVtaXQoe2NoaXA6IHRoaXN9KTtcbiAgICB9XG4gIH1cblxuICAvKiogSGFuZGxlcyBjbGljayBldmVudHMgb24gdGhlIGNoaXAuICovXG4gIF9oYW5kbGVDbGljayhldmVudDogRXZlbnQpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEhhbmRsZSBjdXN0b20ga2V5IHByZXNzZXMuICovXG4gIF9oYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgIGNhc2UgREVMRVRFOlxuICAgICAgY2FzZSBCQUNLU1BBQ0U6XG4gICAgICAgIC8vIElmIHdlIGFyZSByZW1vdmFibGUsIHJlbW92ZSB0aGUgZm9jdXNlZCBjaGlwXG4gICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgIC8vIEFsd2F5cyBwcmV2ZW50IHNvIHBhZ2UgbmF2aWdhdGlvbiBkb2VzIG5vdCBvY2N1clxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgU1BBQ0U6XG4gICAgICAgIC8vIElmIHdlIGFyZSBzZWxlY3RhYmxlLCB0b2dnbGUgdGhlIGZvY3VzZWQgY2hpcFxuICAgICAgICBpZiAodGhpcy5zZWxlY3RhYmxlKSB7XG4gICAgICAgICAgdGhpcy50b2dnbGVTZWxlY3RlZCh0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFsd2F5cyBwcmV2ZW50IHNwYWNlIGZyb20gc2Nyb2xsaW5nIHRoZSBwYWdlIHNpbmNlIHRoZSBsaXN0IGhhcyBmb2N1c1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBfYmx1cigpOiB2b2lkIHtcbiAgICAvLyBXaGVuIGFuaW1hdGlvbnMgYXJlIGVuYWJsZWQsIEFuZ3VsYXIgbWF5IGVuZCB1cCByZW1vdmluZyB0aGUgY2hpcCBmcm9tIHRoZSBET00gYSBsaXR0bGVcbiAgICAvLyBlYXJsaWVyIHRoYW4gdXN1YWwsIGNhdXNpbmcgaXQgdG8gYmUgYmx1cnJlZCBhbmQgdGhyb3dpbmcgb2ZmIHRoZSBsb2dpYyBpbiB0aGUgY2hpcCBsaXN0XG4gICAgLy8gdGhhdCBtb3ZlcyBmb2N1cyBub3QgdGhlIG5leHQgaXRlbS4gVG8gd29yayBhcm91bmQgdGhlIGlzc3VlLCB3ZSBkZWZlciBtYXJraW5nIHRoZSBjaGlwXG4gICAgLy8gYXMgbm90IGZvY3VzZWQgdW50aWwgdGhlIG5leHQgdGltZSB0aGUgem9uZSBzdGFiaWxpemVzLlxuICAgIHRoaXMuX25nWm9uZS5vblN0YWJsZVxuICAgICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuX25nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMuX2hhc0ZvY3VzID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5fb25CbHVyLm5leHQoe2NoaXA6IHRoaXN9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rpc3BhdGNoU2VsZWN0aW9uQ2hhbmdlKGlzVXNlcklucHV0ID0gZmFsc2UpIHtcbiAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHtcbiAgICAgIHNvdXJjZTogdGhpcyxcbiAgICAgIGlzVXNlcklucHV0LFxuICAgICAgc2VsZWN0ZWQ6IHRoaXMuX3NlbGVjdGVkXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9tYXJrRm9yQ2hlY2soKSB7XG4gICAgLy8gQGJyZWFraW5nLWNoYW5nZSA5LjAuMCBSZW1vdmUgdGhpcyBtZXRob2Qgb25jZSB0aGUgX2NoYW5nZURldGVjdG9yUmVmIGlzIGEgcmVxdWlyZWQgcGFyYW0uXG4gICAgaWYgKHRoaXMuX2NoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfc2VsZWN0ZWQ6IGJvb2xlYW4gfCBzdHJpbmc7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9zZWxlY3RhYmxlOiBib29sZWFuIHwgc3RyaW5nO1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfcmVtb3ZhYmxlOiBib29sZWFuIHwgc3RyaW5nO1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IGJvb2xlYW4gfCBzdHJpbmc7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlUmlwcGxlOiBib29sZWFuIHwgc3RyaW5nO1xufVxuXG5cbi8qKlxuICogQXBwbGllcyBwcm9wZXIgKGNsaWNrKSBzdXBwb3J0IGFuZCBhZGRzIHN0eWxpbmcgZm9yIHVzZSB3aXRoIHRoZSBNYXRlcmlhbCBEZXNpZ24gXCJjYW5jZWxcIiBpY29uXG4gKiBhdmFpbGFibGUgYXQgaHR0cHM6Ly9tYXRlcmlhbC5pby9pY29ucy8jaWNfY2FuY2VsLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICAgIGA8bWF0LWNoaXA+XG4gKiAgICAgICA8bWF0LWljb24gbWF0Q2hpcFJlbW92ZT5jYW5jZWw8L21hdC1pY29uPlxuICogICAgIDwvbWF0LWNoaXA+YFxuICpcbiAqIFlvdSAqbWF5KiB1c2UgYSBjdXN0b20gaWNvbiwgYnV0IHlvdSBtYXkgbmVlZCB0byBvdmVycmlkZSB0aGUgYG1hdC1jaGlwLXJlbW92ZWAgcG9zaXRpb25pbmdcbiAqIHN0eWxlcyB0byBwcm9wZXJseSBjZW50ZXIgdGhlIGljb24gd2l0aGluIHRoZSBjaGlwLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0Q2hpcFJlbW92ZV0nLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1jaGlwLXJlbW92ZSBtYXQtY2hpcC10cmFpbGluZy1pY29uJyxcbiAgICAnKGNsaWNrKSc6ICdfaGFuZGxlQ2xpY2soJGV2ZW50KScsXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2hpcFJlbW92ZSB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBfcGFyZW50Q2hpcDogTWF0Q2hpcCkge31cblxuICAvKiogQ2FsbHMgdGhlIHBhcmVudCBjaGlwJ3MgcHVibGljIGByZW1vdmUoKWAgbWV0aG9kIGlmIGFwcGxpY2FibGUuICovXG4gIF9oYW5kbGVDbGljayhldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBwYXJlbnRDaGlwID0gdGhpcy5fcGFyZW50Q2hpcDtcblxuICAgIGlmIChwYXJlbnRDaGlwLnJlbW92YWJsZSAmJiAhcGFyZW50Q2hpcC5kaXNhYmxlZCkge1xuICAgICAgcGFyZW50Q2hpcC5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICAvLyBXZSBuZWVkIHRvIHN0b3AgZXZlbnQgcHJvcGFnYXRpb24gYmVjYXVzZSBvdGhlcndpc2UgdGhlIGV2ZW50IHdpbGwgYnViYmxlIHVwIHRvIHRoZVxuICAgIC8vIGZvcm0gZmllbGQgYW5kIGNhdXNlIHRoZSBgb25Db250YWluZXJDbGlja2AgbWV0aG9kIHRvIGJlIGludm9rZWQuIFRoaXMgbWV0aG9kIHdvdWxkIHRoZW5cbiAgICAvLyByZXNldCB0aGUgZm9jdXNlZCBjaGlwIHRoYXQgaGFzIGJlZW4gZm9jdXNlZCBhZnRlciBjaGlwIHJlbW92YWwuIFVzdWFsbHkgdGhlIHBhcmVudFxuICAgIC8vIHRoZSBwYXJlbnQgY2xpY2sgbGlzdGVuZXIgb2YgdGhlIGBNYXRDaGlwYCB3b3VsZCBwcmV2ZW50IHByb3BhZ2F0aW9uLCBidXQgaXQgY2FuIGhhcHBlblxuICAgIC8vIHRoYXQgdGhlIGNoaXAgaXMgYmVpbmcgcmVtb3ZlZCBiZWZvcmUgdGhlIGV2ZW50IGJ1YmJsZXMgdXAuXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cbn1cbiJdfQ==