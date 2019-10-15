/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { InjectionToken } from '@angular/core';
/**
 * Injection token used to provide the parent menu to menu-specific components.
 * \@docs-private
 * @type {?}
 */
export const MAT_MENU_PANEL = new InjectionToken('MAT_MENU_PANEL');
/**
 * Interface for a custom menu panel that can be used with `matMenuTriggerFor`.
 * \@docs-private
 * @record
 * @template T
 */
export function MatMenuPanel() { }
if (false) {
    /** @type {?} */
    MatMenuPanel.prototype.xPosition;
    /** @type {?} */
    MatMenuPanel.prototype.yPosition;
    /** @type {?} */
    MatMenuPanel.prototype.overlapTrigger;
    /** @type {?} */
    MatMenuPanel.prototype.templateRef;
    /** @type {?} */
    MatMenuPanel.prototype.close;
    /** @type {?|undefined} */
    MatMenuPanel.prototype.parentMenu;
    /** @type {?|undefined} */
    MatMenuPanel.prototype.direction;
    /** @type {?} */
    MatMenuPanel.prototype.focusFirstItem;
    /** @type {?} */
    MatMenuPanel.prototype.resetActiveItem;
    /** @type {?|undefined} */
    MatMenuPanel.prototype.setPositionClasses;
    /** @type {?|undefined} */
    MatMenuPanel.prototype.lazyContent;
    /** @type {?|undefined} */
    MatMenuPanel.prototype.backdropClass;
    /** @type {?|undefined} */
    MatMenuPanel.prototype.hasBackdrop;
    /** @type {?|undefined} */
    MatMenuPanel.prototype.panelId;
    /**
     * @deprecated To be removed.
     * \@breaking-change 8.0.0
     * @type {?|undefined}
     */
    MatMenuPanel.prototype.addItem;
    /**
     * @deprecated To be removed.
     * \@breaking-change 8.0.0
     * @type {?|undefined}
     */
    MatMenuPanel.prototype.removeItem;
    /**
     * @param {?} depth
     * @return {?}
     */
    MatMenuPanel.prototype.setElevation = function (depth) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1wYW5lbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9tZW51L21lbnUtcGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQTRCLGNBQWMsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0FBVXhFLE1BQU0sT0FBTyxjQUFjLEdBQUcsSUFBSSxjQUFjLENBQWUsZ0JBQWdCLENBQUM7Ozs7Ozs7QUFNaEYsa0NBNEJDOzs7SUEzQkMsaUNBQXlCOztJQUN6QixpQ0FBeUI7O0lBQ3pCLHNDQUF3Qjs7SUFDeEIsbUNBQThCOztJQUM5Qiw2QkFBd0Q7O0lBQ3hELGtDQUFzQzs7SUFDdEMsaUNBQXNCOztJQUN0QixzQ0FBK0M7O0lBQy9DLHVDQUE0Qjs7SUFDNUIsMENBQWtFOztJQUVsRSxtQ0FBNkI7O0lBQzdCLHFDQUF1Qjs7SUFDdkIsbUNBQXNCOztJQUN0QiwrQkFBMEI7Ozs7OztJQU0xQiwrQkFBNEI7Ozs7OztJQU01QixrQ0FBK0I7Ozs7O0lBaEIvQiwyREFBbUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIFRlbXBsYXRlUmVmLCBJbmplY3Rpb25Ub2tlbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01lbnVQb3NpdGlvblgsIE1lbnVQb3NpdGlvbll9IGZyb20gJy4vbWVudS1wb3NpdGlvbnMnO1xuaW1wb3J0IHtEaXJlY3Rpb259IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7Rm9jdXNPcmlnaW59IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7TWF0TWVudUNvbnRlbnR9IGZyb20gJy4vbWVudS1jb250ZW50JztcblxuLyoqXG4gKiBJbmplY3Rpb24gdG9rZW4gdXNlZCB0byBwcm92aWRlIHRoZSBwYXJlbnQgbWVudSB0byBtZW51LXNwZWNpZmljIGNvbXBvbmVudHMuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBjb25zdCBNQVRfTUVOVV9QQU5FTCA9IG5ldyBJbmplY3Rpb25Ub2tlbjxNYXRNZW51UGFuZWw+KCdNQVRfTUVOVV9QQU5FTCcpO1xuXG4vKipcbiAqIEludGVyZmFjZSBmb3IgYSBjdXN0b20gbWVudSBwYW5lbCB0aGF0IGNhbiBiZSB1c2VkIHdpdGggYG1hdE1lbnVUcmlnZ2VyRm9yYC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBNYXRNZW51UGFuZWw8VCA9IGFueT4ge1xuICB4UG9zaXRpb246IE1lbnVQb3NpdGlvblg7XG4gIHlQb3NpdGlvbjogTWVudVBvc2l0aW9uWTtcbiAgb3ZlcmxhcFRyaWdnZXI6IGJvb2xlYW47XG4gIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBjbG9zZTogRXZlbnRFbWl0dGVyPHZvaWQgfCAnY2xpY2snIHwgJ2tleWRvd24nIHwgJ3RhYic+O1xuICBwYXJlbnRNZW51PzogTWF0TWVudVBhbmVsIHwgdW5kZWZpbmVkO1xuICBkaXJlY3Rpb24/OiBEaXJlY3Rpb247XG4gIGZvY3VzRmlyc3RJdGVtOiAob3JpZ2luPzogRm9jdXNPcmlnaW4pID0+IHZvaWQ7XG4gIHJlc2V0QWN0aXZlSXRlbTogKCkgPT4gdm9pZDtcbiAgc2V0UG9zaXRpb25DbGFzc2VzPzogKHg6IE1lbnVQb3NpdGlvblgsIHk6IE1lbnVQb3NpdGlvblkpID0+IHZvaWQ7XG4gIHNldEVsZXZhdGlvbj8oZGVwdGg6IG51bWJlcik6IHZvaWQ7XG4gIGxhenlDb250ZW50PzogTWF0TWVudUNvbnRlbnQ7XG4gIGJhY2tkcm9wQ2xhc3M/OiBzdHJpbmc7XG4gIGhhc0JhY2tkcm9wPzogYm9vbGVhbjtcbiAgcmVhZG9ubHkgcGFuZWxJZD86IHN0cmluZztcblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVG8gYmUgcmVtb3ZlZC5cbiAgICogQGJyZWFraW5nLWNoYW5nZSA4LjAuMFxuICAgKi9cbiAgYWRkSXRlbT86IChpdGVtOiBUKSA9PiB2b2lkO1xuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBUbyBiZSByZW1vdmVkLlxuICAgKiBAYnJlYWtpbmctY2hhbmdlIDguMC4wXG4gICAqL1xuICByZW1vdmVJdGVtPzogKGl0ZW06IFQpID0+IHZvaWQ7XG59XG4iXX0=