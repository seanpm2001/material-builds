/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, EventEmitter, Inject, InjectionToken, Input, Optional, Output, booleanAttribute, } from '@angular/core';
import { mixinInitialized } from '@angular/material/core';
import { Subject } from 'rxjs';
import { getSortDuplicateSortableIdError, getSortHeaderMissingIdError, getSortInvalidDirectionError, } from './sort-errors';
import * as i0 from "@angular/core";
/** Injection token to be used to override the default options for `mat-sort`. */
export const MAT_SORT_DEFAULT_OPTIONS = new InjectionToken('MAT_SORT_DEFAULT_OPTIONS');
// Boilerplate for applying mixins to MatSort.
/** @docs-private */
const _MatSortBase = mixinInitialized(class {
});
/** Container for MatSortables to manage the sort state and provide default sort parameters. */
export class MatSort extends _MatSortBase {
    /** The sort direction of the currently active MatSortable. */
    get direction() {
        return this._direction;
    }
    set direction(direction) {
        if (direction &&
            direction !== 'asc' &&
            direction !== 'desc' &&
            (typeof ngDevMode === 'undefined' || ngDevMode)) {
            throw getSortInvalidDirectionError(direction);
        }
        this._direction = direction;
    }
    constructor(_defaultOptions) {
        super();
        this._defaultOptions = _defaultOptions;
        /** Collection of all registered sortables that this directive manages. */
        this.sortables = new Map();
        /** Used to notify any child components listening to state changes. */
        this._stateChanges = new Subject();
        /**
         * The direction to set when an MatSortable is initially sorted.
         * May be overridden by the MatSortable's sort start.
         */
        this.start = 'asc';
        this._direction = '';
        /** Whether the sortable is disabled. */
        this.disabled = false;
        /** Event emitted when the user changes either the active sort or sort direction. */
        this.sortChange = new EventEmitter();
    }
    /**
     * Register function to be used by the contained MatSortables. Adds the MatSortable to the
     * collection of MatSortables.
     */
    register(sortable) {
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            if (!sortable.id) {
                throw getSortHeaderMissingIdError();
            }
            if (this.sortables.has(sortable.id)) {
                throw getSortDuplicateSortableIdError(sortable.id);
            }
        }
        this.sortables.set(sortable.id, sortable);
    }
    /**
     * Unregister function to be used by the contained MatSortables. Removes the MatSortable from the
     * collection of contained MatSortables.
     */
    deregister(sortable) {
        this.sortables.delete(sortable.id);
    }
    /** Sets the active sort id and determines the new sort direction. */
    sort(sortable) {
        if (this.active != sortable.id) {
            this.active = sortable.id;
            this.direction = sortable.start ? sortable.start : this.start;
        }
        else {
            this.direction = this.getNextSortDirection(sortable);
        }
        this.sortChange.emit({ active: this.active, direction: this.direction });
    }
    /** Returns the next sort direction of the active sortable, checking for potential overrides. */
    getNextSortDirection(sortable) {
        if (!sortable) {
            return '';
        }
        // Get the sort direction cycle with the potential sortable overrides.
        const disableClear = sortable?.disableClear ?? this.disableClear ?? !!this._defaultOptions?.disableClear;
        let sortDirectionCycle = getSortDirectionCycle(sortable.start || this.start, disableClear);
        // Get and return the next direction in the cycle
        let nextDirectionIndex = sortDirectionCycle.indexOf(this.direction) + 1;
        if (nextDirectionIndex >= sortDirectionCycle.length) {
            nextDirectionIndex = 0;
        }
        return sortDirectionCycle[nextDirectionIndex];
    }
    ngOnInit() {
        this._markInitialized();
    }
    ngOnChanges() {
        this._stateChanges.next();
    }
    ngOnDestroy() {
        this._stateChanges.complete();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.0", ngImport: i0, type: MatSort, deps: [{ token: MAT_SORT_DEFAULT_OPTIONS, optional: true }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "16.1.0", version: "17.0.0", type: MatSort, isStandalone: true, selector: "[matSort]", inputs: { active: ["matSortActive", "active"], start: ["matSortStart", "start"], direction: ["matSortDirection", "direction"], disableClear: ["matSortDisableClear", "disableClear", booleanAttribute], disabled: ["matSortDisabled", "disabled", booleanAttribute] }, outputs: { sortChange: "matSortChange" }, host: { classAttribute: "mat-sort" }, exportAs: ["matSort"], usesInheritance: true, usesOnChanges: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.0", ngImport: i0, type: MatSort, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matSort]',
                    exportAs: 'matSort',
                    host: {
                        'class': 'mat-sort',
                    },
                    standalone: true,
                }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MAT_SORT_DEFAULT_OPTIONS]
                }] }], propDecorators: { active: [{
                type: Input,
                args: ['matSortActive']
            }], start: [{
                type: Input,
                args: ['matSortStart']
            }], direction: [{
                type: Input,
                args: ['matSortDirection']
            }], disableClear: [{
                type: Input,
                args: [{ alias: 'matSortDisableClear', transform: booleanAttribute }]
            }], disabled: [{
                type: Input,
                args: [{ alias: 'matSortDisabled', transform: booleanAttribute }]
            }], sortChange: [{
                type: Output,
                args: ['matSortChange']
            }] } });
/** Returns the sort direction cycle to use given the provided parameters of order and clear. */
function getSortDirectionCycle(start, disableClear) {
    let sortOrder = ['asc', 'desc'];
    if (start == 'desc') {
        sortOrder.reverse();
    }
    if (!disableClear) {
        sortOrder.push('');
    }
    return sortOrder;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9zb3J0L3NvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLGNBQWMsRUFDZCxLQUFLLEVBSUwsUUFBUSxFQUNSLE1BQU0sRUFDTixnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFpQixnQkFBZ0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFN0IsT0FBTyxFQUNMLCtCQUErQixFQUMvQiwyQkFBMkIsRUFDM0IsNEJBQTRCLEdBQzdCLE1BQU0sZUFBZSxDQUFDOztBQWtDdkIsaUZBQWlGO0FBQ2pGLE1BQU0sQ0FBQyxNQUFNLHdCQUF3QixHQUFHLElBQUksY0FBYyxDQUN4RCwwQkFBMEIsQ0FDM0IsQ0FBQztBQUVGLDhDQUE4QztBQUM5QyxvQkFBb0I7QUFDcEIsTUFBTSxZQUFZLEdBQUcsZ0JBQWdCLENBQUM7Q0FBUSxDQUFDLENBQUM7QUFFaEQsK0ZBQStGO0FBUy9GLE1BQU0sT0FBTyxPQUFRLFNBQVEsWUFBWTtJQWdCdkMsOERBQThEO0lBQzlELElBQ0ksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBQ0QsSUFBSSxTQUFTLENBQUMsU0FBd0I7UUFDcEMsSUFDRSxTQUFTO1lBQ1QsU0FBUyxLQUFLLEtBQUs7WUFDbkIsU0FBUyxLQUFLLE1BQU07WUFDcEIsQ0FBQyxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQUksU0FBUyxDQUFDLEVBQy9DO1lBQ0EsTUFBTSw0QkFBNEIsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUMvQztRQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO0lBQzlC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QUMsRUFBRSxDQUFDLENBQUM7S0FDcEI7SUFFRCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIEluamVjdGlvblRva2VuLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgYm9vbGVhbkF0dHJpYnV0ZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0hhc0luaXRpYWxpemVkLCBtaXhpbkluaXRpYWxpemVkfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7U3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1NvcnREaXJlY3Rpb259IGZyb20gJy4vc29ydC1kaXJlY3Rpb24nO1xuaW1wb3J0IHtcbiAgZ2V0U29ydER1cGxpY2F0ZVNvcnRhYmxlSWRFcnJvcixcbiAgZ2V0U29ydEhlYWRlck1pc3NpbmdJZEVycm9yLFxuICBnZXRTb3J0SW52YWxpZERpcmVjdGlvbkVycm9yLFxufSBmcm9tICcuL3NvcnQtZXJyb3JzJztcblxuLyoqIFBvc2l0aW9uIG9mIHRoZSBhcnJvdyB0aGF0IGRpc3BsYXlzIHdoZW4gc29ydGVkLiAqL1xuZXhwb3J0IHR5cGUgU29ydEhlYWRlckFycm93UG9zaXRpb24gPSAnYmVmb3JlJyB8ICdhZnRlcic7XG5cbi8qKiBJbnRlcmZhY2UgZm9yIGEgZGlyZWN0aXZlIHRoYXQgaG9sZHMgc29ydGluZyBzdGF0ZSBjb25zdW1lZCBieSBgTWF0U29ydEhlYWRlcmAuICovXG5leHBvcnQgaW50ZXJmYWNlIE1hdFNvcnRhYmxlIHtcbiAgLyoqIFRoZSBpZCBvZiB0aGUgY29sdW1uIGJlaW5nIHNvcnRlZC4gKi9cbiAgaWQ6IHN0cmluZztcblxuICAvKiogU3RhcnRpbmcgc29ydCBkaXJlY3Rpb24uICovXG4gIHN0YXJ0OiBTb3J0RGlyZWN0aW9uO1xuXG4gIC8qKiBXaGV0aGVyIHRvIGRpc2FibGUgY2xlYXJpbmcgdGhlIHNvcnRpbmcgc3RhdGUuICovXG4gIGRpc2FibGVDbGVhcjogYm9vbGVhbjtcbn1cblxuLyoqIFRoZSBjdXJyZW50IHNvcnQgc3RhdGUuICovXG5leHBvcnQgaW50ZXJmYWNlIFNvcnQge1xuICAvKiogVGhlIGlkIG9mIHRoZSBjb2x1bW4gYmVpbmcgc29ydGVkLiAqL1xuICBhY3RpdmU6IHN0cmluZztcblxuICAvKiogVGhlIHNvcnQgZGlyZWN0aW9uLiAqL1xuICBkaXJlY3Rpb246IFNvcnREaXJlY3Rpb247XG59XG5cbi8qKiBEZWZhdWx0IG9wdGlvbnMgZm9yIGBtYXQtc29ydGAuICAqL1xuZXhwb3J0IGludGVyZmFjZSBNYXRTb3J0RGVmYXVsdE9wdGlvbnMge1xuICAvKiogV2hldGhlciB0byBkaXNhYmxlIGNsZWFyaW5nIHRoZSBzb3J0aW5nIHN0YXRlLiAqL1xuICBkaXNhYmxlQ2xlYXI/OiBib29sZWFuO1xuICAvKiogUG9zaXRpb24gb2YgdGhlIGFycm93IHRoYXQgZGlzcGxheXMgd2hlbiBzb3J0ZWQuICovXG4gIGFycm93UG9zaXRpb24/OiBTb3J0SGVhZGVyQXJyb3dQb3NpdGlvbjtcbn1cblxuLyoqIEluamVjdGlvbiB0b2tlbiB0byBiZSB1c2VkIHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0IG9wdGlvbnMgZm9yIGBtYXQtc29ydGAuICovXG5leHBvcnQgY29uc3QgTUFUX1NPUlRfREVGQVVMVF9PUFRJT05TID0gbmV3IEluamVjdGlvblRva2VuPE1hdFNvcnREZWZhdWx0T3B0aW9ucz4oXG4gICdNQVRfU09SVF9ERUZBVUxUX09QVElPTlMnLFxuKTtcblxuLy8gQm9pbGVycGxhdGUgZm9yIGFwcGx5aW5nIG1peGlucyB0byBNYXRTb3J0LlxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmNvbnN0IF9NYXRTb3J0QmFzZSA9IG1peGluSW5pdGlhbGl6ZWQoY2xhc3Mge30pO1xuXG4vKiogQ29udGFpbmVyIGZvciBNYXRTb3J0YWJsZXMgdG8gbWFuYWdlIHRoZSBzb3J0IHN0YXRlIGFuZCBwcm92aWRlIGRlZmF1bHQgc29ydCBwYXJhbWV0ZXJzLiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdFNvcnRdJyxcbiAgZXhwb3J0QXM6ICdtYXRTb3J0JyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtc29ydCcsXG4gIH0sXG4gIHN0YW5kYWxvbmU6IHRydWUsXG59KVxuZXhwb3J0IGNsYXNzIE1hdFNvcnQgZXh0ZW5kcyBfTWF0U29ydEJhc2UgaW1wbGVtZW50cyBIYXNJbml0aWFsaXplZCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIC8qKiBDb2xsZWN0aW9uIG9mIGFsbCByZWdpc3RlcmVkIHNvcnRhYmxlcyB0aGF0IHRoaXMgZGlyZWN0aXZlIG1hbmFnZXMuICovXG4gIHNvcnRhYmxlcyA9IG5ldyBNYXA8c3RyaW5nLCBNYXRTb3J0YWJsZT4oKTtcblxuICAvKiogVXNlZCB0byBub3RpZnkgYW55IGNoaWxkIGNvbXBvbmVudHMgbGlzdGVuaW5nIHRvIHN0YXRlIGNoYW5nZXMuICovXG4gIHJlYWRvbmx5IF9zdGF0ZUNoYW5nZXMgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIC8qKiBUaGUgaWQgb2YgdGhlIG1vc3QgcmVjZW50bHkgc29ydGVkIE1hdFNvcnRhYmxlLiAqL1xuICBASW5wdXQoJ21hdFNvcnRBY3RpdmUnKSBhY3RpdmU6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGRpcmVjdGlvbiB0byBzZXQgd2hlbiBhbiBNYXRTb3J0YWJsZSBpcyBpbml0aWFsbHkgc29ydGVkLlxuICAgKiBNYXkgYmUgb3ZlcnJpZGRlbiBieSB0aGUgTWF0U29ydGFibGUncyBzb3J0IHN0YXJ0LlxuICAgKi9cbiAgQElucHV0KCdtYXRTb3J0U3RhcnQnKSBzdGFydDogU29ydERpcmVjdGlvbiA9ICdhc2MnO1xuXG4gIC8qKiBUaGUgc29ydCBkaXJlY3Rpb24gb2YgdGhlIGN1cnJlbnRseSBhY3RpdmUgTWF0U29ydGFibGUuICovXG4gIEBJbnB1dCgnbWF0U29ydERpcmVjdGlvbicpXG4gIGdldCBkaXJlY3Rpb24oKTogU29ydERpcmVjdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMuX2RpcmVjdGlvbjtcbiAgfVxuICBzZXQgZGlyZWN0aW9uKGRpcmVjdGlvbjogU29ydERpcmVjdGlvbikge1xuICAgIGlmIChcbiAgICAgIGRpcmVjdGlvbiAmJlxuICAgICAgZGlyZWN0aW9uICE9PSAnYXNjJyAmJlxuICAgICAgZGlyZWN0aW9uICE9PSAnZGVzYycgJiZcbiAgICAgICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpXG4gICAgKSB7XG4gICAgICB0aHJvdyBnZXRTb3J0SW52YWxpZERpcmVjdGlvbkVycm9yKGRpcmVjdGlvbik7XG4gICAgfVxuICAgIHRoaXMuX2RpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgfVxuICBwcml2YXRlIF9kaXJlY3Rpb246IFNvcnREaXJlY3Rpb24gPSAnJztcblxuICAvKipcbiAgICogV2hldGhlciB0byBkaXNhYmxlIHRoZSB1c2VyIGZyb20gY2xlYXJpbmcgdGhlIHNvcnQgYnkgZmluaXNoaW5nIHRoZSBzb3J0IGRpcmVjdGlvbiBjeWNsZS5cbiAgICogTWF5IGJlIG92ZXJyaWRkZW4gYnkgdGhlIE1hdFNvcnRhYmxlJ3MgZGlzYWJsZSBjbGVhciBpbnB1dC5cbiAgICovXG4gIEBJbnB1dCh7YWxpYXM6ICdtYXRTb3J0RGlzYWJsZUNsZWFyJywgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlfSlcbiAgZGlzYWJsZUNsZWFyOiBib29sZWFuO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBzb3J0YWJsZSBpcyBkaXNhYmxlZC4gKi9cbiAgQElucHV0KHthbGlhczogJ21hdFNvcnREaXNhYmxlZCcsIHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZX0pXG4gIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgdXNlciBjaGFuZ2VzIGVpdGhlciB0aGUgYWN0aXZlIHNvcnQgb3Igc29ydCBkaXJlY3Rpb24uICovXG4gIEBPdXRwdXQoJ21hdFNvcnRDaGFuZ2UnKSByZWFkb25seSBzb3J0Q2hhbmdlOiBFdmVudEVtaXR0ZXI8U29ydD4gPSBuZXcgRXZlbnRFbWl0dGVyPFNvcnQ+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKClcbiAgICBASW5qZWN0KE1BVF9TT1JUX0RFRkFVTFRfT1BUSU9OUylcbiAgICBwcml2YXRlIF9kZWZhdWx0T3B0aW9ucz86IE1hdFNvcnREZWZhdWx0T3B0aW9ucyxcbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBmdW5jdGlvbiB0byBiZSB1c2VkIGJ5IHRoZSBjb250YWluZWQgTWF0U29ydGFibGVzLiBBZGRzIHRoZSBNYXRTb3J0YWJsZSB0byB0aGVcbiAgICogY29sbGVjdGlvbiBvZiBNYXRTb3J0YWJsZXMuXG4gICAqL1xuICByZWdpc3Rlcihzb3J0YWJsZTogTWF0U29ydGFibGUpOiB2b2lkIHtcbiAgICBpZiAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSB7XG4gICAgICBpZiAoIXNvcnRhYmxlLmlkKSB7XG4gICAgICAgIHRocm93IGdldFNvcnRIZWFkZXJNaXNzaW5nSWRFcnJvcigpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5zb3J0YWJsZXMuaGFzKHNvcnRhYmxlLmlkKSkge1xuICAgICAgICB0aHJvdyBnZXRTb3J0RHVwbGljYXRlU29ydGFibGVJZEVycm9yKHNvcnRhYmxlLmlkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNvcnRhYmxlcy5zZXQoc29ydGFibGUuaWQsIHNvcnRhYmxlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVbnJlZ2lzdGVyIGZ1bmN0aW9uIHRvIGJlIHVzZWQgYnkgdGhlIGNvbnRhaW5lZCBNYXRTb3J0YWJsZXMuIFJlbW92ZXMgdGhlIE1hdFNvcnRhYmxlIGZyb20gdGhlXG4gICAqIGNvbGxlY3Rpb24gb2YgY29udGFpbmVkIE1hdFNvcnRhYmxlcy5cbiAgICovXG4gIGRlcmVnaXN0ZXIoc29ydGFibGU6IE1hdFNvcnRhYmxlKTogdm9pZCB7XG4gICAgdGhpcy5zb3J0YWJsZXMuZGVsZXRlKHNvcnRhYmxlLmlkKTtcbiAgfVxuXG4gIC8qKiBTZXRzIHRoZSBhY3RpdmUgc29ydCBpZCBhbmQgZGV0ZXJtaW5lcyB0aGUgbmV3IHNvcnQgZGlyZWN0aW9uLiAqL1xuICBzb3J0KHNvcnRhYmxlOiBNYXRTb3J0YWJsZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmFjdGl2ZSAhPSBzb3J0YWJsZS5pZCkge1xuICAgICAgdGhpcy5hY3RpdmUgPSBzb3J0YWJsZS5pZDtcbiAgICAgIHRoaXMuZGlyZWN0aW9uID0gc29ydGFibGUuc3RhcnQgPyBzb3J0YWJsZS5zdGFydCA6IHRoaXMuc3RhcnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGlyZWN0aW9uID0gdGhpcy5nZXROZXh0U29ydERpcmVjdGlvbihzb3J0YWJsZSk7XG4gICAgfVxuXG4gICAgdGhpcy5zb3J0Q2hhbmdlLmVtaXQoe2FjdGl2ZTogdGhpcy5hY3RpdmUsIGRpcmVjdGlvbjogdGhpcy5kaXJlY3Rpb259KTtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIHRoZSBuZXh0IHNvcnQgZGlyZWN0aW9uIG9mIHRoZSBhY3RpdmUgc29ydGFibGUsIGNoZWNraW5nIGZvciBwb3RlbnRpYWwgb3ZlcnJpZGVzLiAqL1xuICBnZXROZXh0U29ydERpcmVjdGlvbihzb3J0YWJsZTogTWF0U29ydGFibGUpOiBTb3J0RGlyZWN0aW9uIHtcbiAgICBpZiAoIXNvcnRhYmxlKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgLy8gR2V0IHRoZSBzb3J0IGRpcmVjdGlvbiBjeWNsZSB3aXRoIHRoZSBwb3RlbnRpYWwgc29ydGFibGUgb3ZlcnJpZGVzLlxuICAgIGNvbnN0IGRpc2FibGVDbGVhciA9XG4gICAgICBzb3J0YWJsZT8uZGlzYWJsZUNsZWFyID8/IHRoaXMuZGlzYWJsZUNsZWFyID8/ICEhdGhpcy5fZGVmYXVsdE9wdGlvbnM/LmRpc2FibGVDbGVhcjtcbiAgICBsZXQgc29ydERpcmVjdGlvbkN5Y2xlID0gZ2V0U29ydERpcmVjdGlvbkN5Y2xlKHNvcnRhYmxlLnN0YXJ0IHx8IHRoaXMuc3RhcnQsIGRpc2FibGVDbGVhcik7XG5cbiAgICAvLyBHZXQgYW5kIHJldHVybiB0aGUgbmV4dCBkaXJlY3Rpb24gaW4gdGhlIGN5Y2xlXG4gICAgbGV0IG5leHREaXJlY3Rpb25JbmRleCA9IHNvcnREaXJlY3Rpb25DeWNsZS5pbmRleE9mKHRoaXMuZGlyZWN0aW9uKSArIDE7XG4gICAgaWYgKG5leHREaXJlY3Rpb25JbmRleCA+PSBzb3J0RGlyZWN0aW9uQ3ljbGUubGVuZ3RoKSB7XG4gICAgICBuZXh0RGlyZWN0aW9uSW5kZXggPSAwO1xuICAgIH1cbiAgICByZXR1cm4gc29ydERpcmVjdGlvbkN5Y2xlW25leHREaXJlY3Rpb25JbmRleF07XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9tYXJrSW5pdGlhbGl6ZWQoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMuX3N0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9zdGF0ZUNoYW5nZXMuY29tcGxldGUoKTtcbiAgfVxufVxuXG4vKiogUmV0dXJucyB0aGUgc29ydCBkaXJlY3Rpb24gY3ljbGUgdG8gdXNlIGdpdmVuIHRoZSBwcm92aWRlZCBwYXJhbWV0ZXJzIG9mIG9yZGVyIGFuZCBjbGVhci4gKi9cbmZ1bmN0aW9uIGdldFNvcnREaXJlY3Rpb25DeWNsZShzdGFydDogU29ydERpcmVjdGlvbiwgZGlzYWJsZUNsZWFyOiBib29sZWFuKTogU29ydERpcmVjdGlvbltdIHtcbiAgbGV0IHNvcnRPcmRlcjogU29ydERpcmVjdGlvbltdID0gWydhc2MnLCAnZGVzYyddO1xuICBpZiAoc3RhcnQgPT0gJ2Rlc2MnKSB7XG4gICAgc29ydE9yZGVyLnJldmVyc2UoKTtcbiAgfVxuICBpZiAoIWRpc2FibGVDbGVhcikge1xuICAgIHNvcnRPcmRlci5wdXNoKCcnKTtcbiAgfVxuXG4gIHJldHVybiBzb3J0T3JkZXI7XG59XG4iXX0=