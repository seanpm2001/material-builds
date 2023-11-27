/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var MatTestDialogOpener_1;
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, Component, NgModule, ViewEncapsulation, } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
/** Test component that immediately opens a dialog when bootstrapped. */
let MatTestDialogOpener = class MatTestDialogOpener {
    static { MatTestDialogOpener_1 = this; }
    /** Static method that prepares this class to open the provided component. */
    static withComponent(component, config) {
        MatTestDialogOpener_1.component = component;
        MatTestDialogOpener_1.config = config;
        return MatTestDialogOpener_1;
    }
    constructor(dialog) {
        this.dialog = dialog;
        if (!MatTestDialogOpener_1.component) {
            throw new Error(`MatTestDialogOpener does not have a component provided.`);
        }
        this.dialogRef = this.dialog.open(MatTestDialogOpener_1.component, MatTestDialogOpener_1.config || {});
        this._afterClosedSubscription = this.dialogRef.afterClosed().subscribe(result => {
            this.closedResult = result;
        });
    }
    ngOnDestroy() {
        this._afterClosedSubscription.unsubscribe();
        MatTestDialogOpener_1.component = undefined;
        MatTestDialogOpener_1.config = undefined;
    }
};
MatTestDialogOpener = MatTestDialogOpener_1 = __decorate([
    Component({
        selector: 'mat-test-dialog-opener',
        template: '',
        changeDetection: ChangeDetectionStrategy.OnPush,
        encapsulation: ViewEncapsulation.None,
        standalone: true,
    }),
    __metadata("design:paramtypes", [MatDialog])
], MatTestDialogOpener);
export { MatTestDialogOpener };
let MatTestDialogOpenerModule = class MatTestDialogOpenerModule {
};
MatTestDialogOpenerModule = __decorate([
    NgModule({
        imports: [MatDialogModule, NoopAnimationsModule, MatTestDialogOpener],
    })
], MatTestDialogOpenerModule);
export { MatTestDialogOpenerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLW9wZW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9kaWFsb2cvdGVzdGluZy9kaWFsb2ctb3BlbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7O0FBR0gsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsUUFBUSxFQUVSLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsU0FBUyxFQUFtQixlQUFlLEVBQWUsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRyxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUcxRSx3RUFBd0U7QUFRakUsSUFBTSxtQkFBbUIsR0FBekIsTUFBTSxtQkFBbUI7O0lBZTlCLDZFQUE2RTtJQUM3RSxNQUFNLENBQUMsYUFBYSxDQUNsQixTQUEyQixFQUMzQixNQUF3QjtRQUV4QixxQkFBbUIsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzFDLHFCQUFtQixDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDcEMsT0FBTyxxQkFBK0QsQ0FBQztJQUN6RSxDQUFDO0lBRUQsWUFBbUIsTUFBaUI7UUFBakIsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNsQyxJQUFJLENBQUMscUJBQW1CLENBQUMsU0FBUyxFQUFFO1lBQ2xDLE1BQU0sSUFBSSxLQUFLLENBQUMseURBQXlELENBQUMsQ0FBQztTQUM1RTtRQUVELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQy9CLHFCQUFtQixDQUFDLFNBQTZCLEVBQ2pELHFCQUFtQixDQUFDLE1BQU0sSUFBSSxFQUFFLENBQ2pDLENBQUM7UUFDRixJQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDOUUsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM1QyxxQkFBbUIsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzFDLHFCQUFtQixDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7SUFDekMsQ0FBQztDQUNGLENBQUE7QUE1Q1ksbUJBQW1CO0lBUC9CLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSx3QkFBd0I7UUFDbEMsUUFBUSxFQUFFLEVBQUU7UUFDWixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtRQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtRQUNyQyxVQUFVLEVBQUUsSUFBSTtLQUNqQixDQUFDO3FDQTBCMkIsU0FBUztHQXpCekIsbUJBQW1CLENBNEMvQjs7QUFLTSxJQUFNLHlCQUF5QixHQUEvQixNQUFNLHlCQUF5QjtDQUFHLENBQUE7QUFBNUIseUJBQXlCO0lBSHJDLFFBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRSxDQUFDLGVBQWUsRUFBRSxvQkFBb0IsRUFBRSxtQkFBbUIsQ0FBQztLQUN0RSxDQUFDO0dBQ1cseUJBQXlCLENBQUciLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21wb25lbnRUeXBlfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBOZ01vZHVsZSxcbiAgT25EZXN0cm95LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdERpYWxvZywgTWF0RGlhbG9nQ29uZmlnLCBNYXREaWFsb2dNb2R1bGUsIE1hdERpYWxvZ1JlZn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7Tm9vcEFuaW1hdGlvbnNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbi8qKiBUZXN0IGNvbXBvbmVudCB0aGF0IGltbWVkaWF0ZWx5IG9wZW5zIGEgZGlhbG9nIHdoZW4gYm9vdHN0cmFwcGVkLiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LXRlc3QtZGlhbG9nLW9wZW5lcicsXG4gIHRlbXBsYXRlOiAnJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG59KVxuZXhwb3J0IGNsYXNzIE1hdFRlc3REaWFsb2dPcGVuZXI8VCA9IHVua25vd24sIFIgPSB1bmtub3duPiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8qKiBDb21wb25lbnQgdGhhdCBzaG91bGQgYmUgb3BlbmVkIHdpdGggdGhlIE1hdERpYWxvZyBgb3BlbmAgbWV0aG9kLiAqL1xuICBwcm90ZWN0ZWQgc3RhdGljIGNvbXBvbmVudDogQ29tcG9uZW50VHlwZTx1bmtub3duPiB8IHVuZGVmaW5lZDtcblxuICAvKiogQ29uZmlnIHRoYXQgc2hvdWxkIGJlIHByb3ZpZGVkIHRvIHRoZSBNYXREaWFsb2cgYG9wZW5gIG1ldGhvZC4gKi9cbiAgcHJvdGVjdGVkIHN0YXRpYyBjb25maWc6IE1hdERpYWxvZ0NvbmZpZyB8IHVuZGVmaW5lZDtcblxuICAvKiogTWF0RGlhbG9nUmVmIHJldHVybmVkIGZyb20gdGhlIE1hdERpYWxvZyBgb3BlbmAgbWV0aG9kLiAqL1xuICBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxULCBSPjtcblxuICAvKiogRGF0YSBwYXNzZWQgdG8gdGhlIGBNYXREaWFsb2dgIGNsb3NlIG1ldGhvZC4gKi9cbiAgY2xvc2VkUmVzdWx0OiBSIHwgdW5kZWZpbmVkO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgX2FmdGVyQ2xvc2VkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLyoqIFN0YXRpYyBtZXRob2QgdGhhdCBwcmVwYXJlcyB0aGlzIGNsYXNzIHRvIG9wZW4gdGhlIHByb3ZpZGVkIGNvbXBvbmVudC4gKi9cbiAgc3RhdGljIHdpdGhDb21wb25lbnQ8VCA9IHVua25vd24sIFIgPSB1bmtub3duPihcbiAgICBjb21wb25lbnQ6IENvbXBvbmVudFR5cGU8VD4sXG4gICAgY29uZmlnPzogTWF0RGlhbG9nQ29uZmlnLFxuICApIHtcbiAgICBNYXRUZXN0RGlhbG9nT3BlbmVyLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcbiAgICBNYXRUZXN0RGlhbG9nT3BlbmVyLmNvbmZpZyA9IGNvbmZpZztcbiAgICByZXR1cm4gTWF0VGVzdERpYWxvZ09wZW5lciBhcyBDb21wb25lbnRUeXBlPE1hdFRlc3REaWFsb2dPcGVuZXI8VCwgUj4+O1xuICB9XG5cbiAgY29uc3RydWN0b3IocHVibGljIGRpYWxvZzogTWF0RGlhbG9nKSB7XG4gICAgaWYgKCFNYXRUZXN0RGlhbG9nT3BlbmVyLmNvbXBvbmVudCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBNYXRUZXN0RGlhbG9nT3BlbmVyIGRvZXMgbm90IGhhdmUgYSBjb21wb25lbnQgcHJvdmlkZWQuYCk7XG4gICAgfVxuXG4gICAgdGhpcy5kaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuPFQsIFI+KFxuICAgICAgTWF0VGVzdERpYWxvZ09wZW5lci5jb21wb25lbnQgYXMgQ29tcG9uZW50VHlwZTxUPixcbiAgICAgIE1hdFRlc3REaWFsb2dPcGVuZXIuY29uZmlnIHx8IHt9LFxuICAgICk7XG4gICAgdGhpcy5fYWZ0ZXJDbG9zZWRTdWJzY3JpcHRpb24gPSB0aGlzLmRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgdGhpcy5jbG9zZWRSZXN1bHQgPSByZXN1bHQ7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9hZnRlckNsb3NlZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIE1hdFRlc3REaWFsb2dPcGVuZXIuY29tcG9uZW50ID0gdW5kZWZpbmVkO1xuICAgIE1hdFRlc3REaWFsb2dPcGVuZXIuY29uZmlnID0gdW5kZWZpbmVkO1xuICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtNYXREaWFsb2dNb2R1bGUsIE5vb3BBbmltYXRpb25zTW9kdWxlLCBNYXRUZXN0RGlhbG9nT3BlbmVyXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0VGVzdERpYWxvZ09wZW5lck1vZHVsZSB7fVxuIl19