import { CdkDialogContainer, DialogConfig } from '@angular/cdk/dialog';
import { FocusMonitor, FocusTrapFactory, InteractivityChecker } from '@angular/cdk/a11y';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { OverlayRef } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, NgZone, Optional, ViewEncapsulation, } from '@angular/core';
import { matBottomSheetAnimations } from './bottom-sheet-animations';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/a11y";
import * as i2 from "@angular/cdk/dialog";
import * as i3 from "@angular/cdk/overlay";
import * as i4 from "@angular/cdk/layout";
import * as i5 from "@angular/cdk/portal";
/**
 * Internal component that wraps user-provided bottom sheet content.
 * @docs-private
 */
class MatBottomSheetContainer extends CdkDialogContainer {
    constructor(elementRef, focusTrapFactory, document, config, checker, ngZone, overlayRef, breakpointObserver, _changeDetectorRef, focusMonitor) {
        super(elementRef, focusTrapFactory, document, config, checker, ngZone, overlayRef, focusMonitor);
        this._changeDetectorRef = _changeDetectorRef;
        /** The state of the bottom sheet animations. */
        this._animationState = 'void';
        /** Emits whenever the state of the animation changes. */
        this._animationStateChanged = new EventEmitter();
        this._breakpointSubscription = breakpointObserver
            .observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
            .subscribe(() => {
            this._toggleClass('mat-bottom-sheet-container-medium', breakpointObserver.isMatched(Breakpoints.Medium));
            this._toggleClass('mat-bottom-sheet-container-large', breakpointObserver.isMatched(Breakpoints.Large));
            this._toggleClass('mat-bottom-sheet-container-xlarge', breakpointObserver.isMatched(Breakpoints.XLarge));
        });
    }
    /** Begin animation of bottom sheet entrance into view. */
    enter() {
        if (!this._destroyed) {
            this._animationState = 'visible';
            this._changeDetectorRef.detectChanges();
        }
    }
    /** Begin animation of the bottom sheet exiting from view. */
    exit() {
        if (!this._destroyed) {
            this._animationState = 'hidden';
            this._changeDetectorRef.markForCheck();
        }
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this._breakpointSubscription.unsubscribe();
        this._destroyed = true;
    }
    _onAnimationDone(event) {
        if (event.toState === 'visible') {
            this._trapFocus();
        }
        this._animationStateChanged.emit(event);
    }
    _onAnimationStart(event) {
        this._animationStateChanged.emit(event);
    }
    _captureInitialFocus() { }
    _toggleClass(cssClass, add) {
        this._elementRef.nativeElement.classList.toggle(cssClass, add);
    }
}
MatBottomSheetContainer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.7", ngImport: i0, type: MatBottomSheetContainer, deps: [{ token: i0.ElementRef }, { token: i1.FocusTrapFactory }, { token: DOCUMENT, optional: true }, { token: i2.DialogConfig }, { token: i1.InteractivityChecker }, { token: i0.NgZone }, { token: i3.OverlayRef }, { token: i4.BreakpointObserver }, { token: i0.ChangeDetectorRef }, { token: i1.FocusMonitor }], target: i0.ɵɵFactoryTarget.Component });
MatBottomSheetContainer.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.0-next.7", type: MatBottomSheetContainer, selector: "mat-bottom-sheet-container", host: { attributes: { "tabindex": "-1" }, listeners: { "@state.start": "_onAnimationStart($event)", "@state.done": "_onAnimationDone($event)" }, properties: { "attr.role": "_config.role", "attr.aria-modal": "_config.ariaModal", "attr.aria-label": "_config.ariaLabel", "@state": "_animationState" }, classAttribute: "mat-bottom-sheet-container" }, usesInheritance: true, ngImport: i0, template: "<ng-template cdkPortalOutlet></ng-template>\r\n", styles: [".mat-bottom-sheet-container{padding:8px 16px;min-width:100vw;box-sizing:border-box;display:block;outline:0;max-height:80vh;overflow:auto}.cdk-high-contrast-active .mat-bottom-sheet-container{outline:1px solid}.mat-bottom-sheet-container-xlarge,.mat-bottom-sheet-container-large,.mat-bottom-sheet-container-medium{border-top-left-radius:4px;border-top-right-radius:4px}.mat-bottom-sheet-container-medium{min-width:384px;max-width:calc(100vw - 128px)}.mat-bottom-sheet-container-large{min-width:512px;max-width:calc(100vw - 256px)}.mat-bottom-sheet-container-xlarge{min-width:576px;max-width:calc(100vw - 384px)}"], dependencies: [{ kind: "directive", type: i5.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }], animations: [matBottomSheetAnimations.bottomSheetState], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
export { MatBottomSheetContainer };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.7", ngImport: i0, type: MatBottomSheetContainer, decorators: [{
            type: Component,
            args: [{ selector: 'mat-bottom-sheet-container', changeDetection: ChangeDetectionStrategy.Default, encapsulation: ViewEncapsulation.None, animations: [matBottomSheetAnimations.bottomSheetState], host: {
                        'class': 'mat-bottom-sheet-container',
                        'tabindex': '-1',
                        '[attr.role]': '_config.role',
                        '[attr.aria-modal]': '_config.ariaModal',
                        '[attr.aria-label]': '_config.ariaLabel',
                        '[@state]': '_animationState',
                        '(@state.start)': '_onAnimationStart($event)',
                        '(@state.done)': '_onAnimationDone($event)',
                    }, template: "<ng-template cdkPortalOutlet></ng-template>\r\n", styles: [".mat-bottom-sheet-container{padding:8px 16px;min-width:100vw;box-sizing:border-box;display:block;outline:0;max-height:80vh;overflow:auto}.cdk-high-contrast-active .mat-bottom-sheet-container{outline:1px solid}.mat-bottom-sheet-container-xlarge,.mat-bottom-sheet-container-large,.mat-bottom-sheet-container-medium{border-top-left-radius:4px;border-top-right-radius:4px}.mat-bottom-sheet-container-medium{min-width:384px;max-width:calc(100vw - 128px)}.mat-bottom-sheet-container-large{min-width:512px;max-width:calc(100vw - 256px)}.mat-bottom-sheet-container-xlarge{min-width:576px;max-width:calc(100vw - 384px)}"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.FocusTrapFactory }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i2.DialogConfig }, { type: i1.InteractivityChecker }, { type: i0.NgZone }, { type: i3.OverlayRef }, { type: i4.BreakpointObserver }, { type: i0.ChangeDetectorRef }, { type: i1.FocusMonitor }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm90dG9tLXNoZWV0LWNvbnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9ib3R0b20tc2hlZXQvYm90dG9tLXNoZWV0LWNvbnRhaW5lci50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9ib3R0b20tc2hlZXQvYm90dG9tLXNoZWV0LWNvbnRhaW5lci5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVNBLE9BQU8sRUFBQyxrQkFBa0IsRUFBRSxZQUFZLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRSxPQUFPLEVBQUMsWUFBWSxFQUFFLGdCQUFnQixFQUFFLG9CQUFvQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDdkYsT0FBTyxFQUFDLGtCQUFrQixFQUFFLFdBQVcsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3BFLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUVoRCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLE1BQU0sRUFFTixRQUFRLEVBQ1IsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDOzs7Ozs7O0FBRW5FOzs7R0FHRztBQUNILE1Bc0JhLHVCQUF3QixTQUFRLGtCQUFrQjtJQVk3RCxZQUNFLFVBQXNCLEVBQ3RCLGdCQUFrQyxFQUNKLFFBQWEsRUFDM0MsTUFBb0IsRUFDcEIsT0FBNkIsRUFDN0IsTUFBYyxFQUNkLFVBQXNCLEVBQ3RCLGtCQUFzQyxFQUM5QixrQkFBcUMsRUFDN0MsWUFBMkI7UUFFM0IsS0FBSyxDQUNILFVBQVUsRUFDVixnQkFBZ0IsRUFDaEIsUUFBUSxF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eEMsbUJBQW1CLEVBQUUsbUJBQW1CO3dCQUN4QyxVQUFVLEVBQUUsaUJBQWlCO3dCQUM3QixnQkFBZ0IsRUFBRSwyQkFBMkI7d0JBQzdDLGVBQWUsRUFBRSwwQkFBMEI7cUJBQzVDOzswQkFpQkUsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7QW5pbWF0aW9uRXZlbnR9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtDZGtEaWFsb2dDb250YWluZXIsIERpYWxvZ0NvbmZpZ30gZnJvbSAnQGFuZ3VsYXIvY2RrL2RpYWxvZyc7XG5pbXBvcnQge0ZvY3VzTW9uaXRvciwgRm9jdXNUcmFwRmFjdG9yeSwgSW50ZXJhY3Rpdml0eUNoZWNrZXJ9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7QnJlYWtwb2ludE9ic2VydmVyLCBCcmVha3BvaW50c30gZnJvbSAnQGFuZ3VsYXIvY2RrL2xheW91dCc7XG5pbXBvcnQge092ZXJsYXlSZWZ9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7X2dldEZvY3VzZWRFbGVtZW50UGllcmNlU2hhZG93RG9tfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge21hdEJvdHRvbVNoZWV0QW5pbWF0aW9uc30gZnJvbSAnLi9ib3R0b20tc2hlZXQtYW5pbWF0aW9ucyc7XG5cbi8qKlxuICogSW50ZXJuYWwgY29tcG9uZW50IHRoYXQgd3JhcHMgdXNlci1wcm92aWRlZCBib3R0b20gc2hlZXQgY29udGVudC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LWJvdHRvbS1zaGVldC1jb250YWluZXInLFxuICB0ZW1wbGF0ZVVybDogJ2JvdHRvbS1zaGVldC1jb250YWluZXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWydib3R0b20tc2hlZXQtY29udGFpbmVyLmNzcyddLFxuICAvLyBJbiBJdnkgZW1iZWRkZWQgdmlld3Mgd2lsbCBiZSBjaGFuZ2UgZGV0ZWN0ZWQgZnJvbSB0aGVpciBkZWNsYXJhdGlvbiBwbGFjZSwgcmF0aGVyIHRoYW4gd2hlcmVcbiAgLy8gdGhleSB3ZXJlIHN0YW1wZWQgb3V0LiBUaGlzIG1lYW5zIHRoYXQgd2UgY2FuJ3QgaGF2ZSB0aGUgYm90dG9tIHNoZWV0IGNvbnRhaW5lciBiZSBPblB1c2gsXG4gIC8vIGJlY2F1c2UgaXQgbWlnaHQgY2F1c2UgdGhlIHNoZWV0cyB0aGF0IHdlcmUgb3BlbmVkIGZyb20gYSB0ZW1wbGF0ZSBub3QgdG8gYmUgb3V0IG9mIGRhdGUuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp2YWxpZGF0ZS1kZWNvcmF0b3JzXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgYW5pbWF0aW9uczogW21hdEJvdHRvbVNoZWV0QW5pbWF0aW9ucy5ib3R0b21TaGVldFN0YXRlXSxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdtYXQtYm90dG9tLXNoZWV0LWNvbnRhaW5lcicsXG4gICAgJ3RhYmluZGV4JzogJy0xJyxcbiAgICAnW2F0dHIucm9sZV0nOiAnX2NvbmZpZy5yb2xlJyxcbiAgICAnW2F0dHIuYXJpYS1tb2RhbF0nOiAnX2NvbmZpZy5hcmlhTW9kYWwnLFxuICAgICdbYXR0ci5hcmlhLWxhYmVsXSc6ICdfY29uZmlnLmFyaWFMYWJlbCcsXG4gICAgJ1tAc3RhdGVdJzogJ19hbmltYXRpb25TdGF0ZScsXG4gICAgJyhAc3RhdGUuc3RhcnQpJzogJ19vbkFuaW1hdGlvblN0YXJ0KCRldmVudCknLFxuICAgICcoQHN0YXRlLmRvbmUpJzogJ19vbkFuaW1hdGlvbkRvbmUoJGV2ZW50KScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIE1hdEJvdHRvbVNoZWV0Q29udGFpbmVyIGV4dGVuZHMgQ2RrRGlhbG9nQ29udGFpbmVyIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfYnJlYWtwb2ludFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKiBUaGUgc3RhdGUgb2YgdGhlIGJvdHRvbSBzaGVldCBhbmltYXRpb25zLiAqL1xuICBfYW5pbWF0aW9uU3RhdGU6ICd2b2lkJyB8ICd2aXNpYmxlJyB8ICdoaWRkZW4nID0gJ3ZvaWQnO1xuXG4gIC8qKiBFbWl0cyB3aGVuZXZlciB0aGUgc3RhdGUgb2YgdGhlIGFuaW1hdGlvbiBjaGFuZ2VzLiAqL1xuICBfYW5pbWF0aW9uU3RhdGVDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxBbmltYXRpb25FdmVudD4oKTtcblxuICAvKiogV2hldGhlciB0aGUgY29tcG9uZW50IGhhcyBiZWVuIGRlc3Ryb3llZC4gKi9cbiAgcHJpdmF0ZSBfZGVzdHJveWVkOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgZm9jdXNUcmFwRmFjdG9yeTogRm9jdXNUcmFwRmFjdG9yeSxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KERPQ1VNRU5UKSBkb2N1bWVudDogYW55LFxuICAgIGNvbmZpZzogRGlhbG9nQ29uZmlnLFxuICAgIGNoZWNrZXI6IEludGVyYWN0aXZpdHlDaGVja2VyLFxuICAgIG5nWm9uZTogTmdab25lLFxuICAgIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYsXG4gICAgYnJlYWtwb2ludE9ic2VydmVyOiBCcmVha3BvaW50T2JzZXJ2ZXIsXG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIGZvY3VzTW9uaXRvcj86IEZvY3VzTW9uaXRvcixcbiAgKSB7XG4gICAgc3VwZXIoXG4gICAgICBlbGVtZW50UmVmLFxuICAgICAgZm9jdXNUcmFwRmFjdG9yeSxcbiAgICAgIGRvY3VtZW50LFxuICAgICAgY29uZmlnLFxuICAgICAgY2hlY2tlcixcbiAgICAgIG5nWm9uZSxcbiAgICAgIG92ZXJsYXlSZWYsXG4gICAgICBmb2N1c01vbml0b3IsXG4gICAgKTtcblxuICAgIHRoaXMuX2JyZWFrcG9pbnRTdWJzY3JpcHRpb24gPSBicmVha3BvaW50T2JzZXJ2ZXJcbiAgICAgIC5vYnNlcnZlKFtCcmVha3BvaW50cy5NZWRpdW0sIEJyZWFrcG9pbnRzLkxhcmdlLCBCcmVha3BvaW50cy5YTGFyZ2VdKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuX3RvZ2dsZUNsYXNzKFxuICAgICAgICAgICdtYXQtYm90dG9tLXNoZWV0LWNvbnRhaW5lci1tZWRpdW0nLFxuICAgICAgICAgIGJyZWFrcG9pbnRPYnNlcnZlci5pc01hdGNoZWQoQnJlYWtwb2ludHMuTWVkaXVtKSxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5fdG9nZ2xlQ2xhc3MoXG4gICAgICAgICAgJ21hdC1ib3R0b20tc2hlZXQtY29udGFpbmVyLWxhcmdlJyxcbiAgICAgICAgICBicmVha3BvaW50T2JzZXJ2ZXIuaXNNYXRjaGVkKEJyZWFrcG9pbnRzLkxhcmdlKSxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5fdG9nZ2xlQ2xhc3MoXG4gICAgICAgICAgJ21hdC1ib3R0b20tc2hlZXQtY29udGFpbmVyLXhsYXJnZScsXG4gICAgICAgICAgYnJlYWtwb2ludE9ic2VydmVyLmlzTWF0Y2hlZChCcmVha3BvaW50cy5YTGFyZ2UpLFxuICAgICAgICApO1xuICAgICAgfSk7XG4gIH1cblxuICAvKiogQmVnaW4gYW5pbWF0aW9uIG9mIGJvdHRvbSBzaGVldCBlbnRyYW5jZSBpbnRvIHZpZXcuICovXG4gIGVudGVyKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fZGVzdHJveWVkKSB7XG4gICAgICB0aGlzLl9hbmltYXRpb25TdGF0ZSA9ICd2aXNpYmxlJztcbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICAvKiogQmVnaW4gYW5pbWF0aW9uIG9mIHRoZSBib3R0b20gc2hlZXQgZXhpdGluZyBmcm9tIHZpZXcuICovXG4gIGV4aXQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9kZXN0cm95ZWQpIHtcbiAgICAgIHRoaXMuX2FuaW1hdGlvblN0YXRlID0gJ2hpZGRlbic7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBvdmVycmlkZSBuZ09uRGVzdHJveSgpIHtcbiAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuICAgIHRoaXMuX2JyZWFrcG9pbnRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9kZXN0cm95ZWQgPSB0cnVlO1xuICB9XG5cbiAgX29uQW5pbWF0aW9uRG9uZShldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICBpZiAoZXZlbnQudG9TdGF0ZSA9PT0gJ3Zpc2libGUnKSB7XG4gICAgICB0aGlzLl90cmFwRm9jdXMoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9hbmltYXRpb25TdGF0ZUNoYW5nZWQuZW1pdChldmVudCk7XG4gIH1cblxuICBfb25BbmltYXRpb25TdGFydChldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICB0aGlzLl9hbmltYXRpb25TdGF0ZUNoYW5nZWQuZW1pdChldmVudCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgX2NhcHR1cmVJbml0aWFsRm9jdXMoKTogdm9pZCB7fVxuXG4gIHByaXZhdGUgX3RvZ2dsZUNsYXNzKGNzc0NsYXNzOiBzdHJpbmcsIGFkZDogYm9vbGVhbikge1xuICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKGNzc0NsYXNzLCBhZGQpO1xuICB9XG59XG4iLCI8bmctdGVtcGxhdGUgY2RrUG9ydGFsT3V0bGV0PjwvbmctdGVtcGxhdGU+XHJcbiJdfQ==