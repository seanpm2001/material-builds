/**
 * @fileoverview added by tsickle
 * Generated from: src/material/tree/tree-module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatCommonModule } from '@angular/material/core';
import { MatNestedTreeNode, MatTreeNodeDef, MatTreeNode } from './node';
import { MatTree } from './tree';
import { MatTreeNodeToggle } from './toggle';
import { MatTreeNodeOutlet } from './outlet';
import { MatTreeNodePadding } from './padding';
/** @type {?} */
const MAT_TREE_DIRECTIVES = [
    MatNestedTreeNode,
    MatTreeNodeDef,
    MatTreeNodePadding,
    MatTreeNodeToggle,
    MatTree,
    MatTreeNode,
    MatTreeNodeOutlet
];
export class MatTreeModule {
}
MatTreeModule.decorators = [
    { type: NgModule, args: [{
                imports: [CdkTreeModule, MatCommonModule],
                exports: [MatCommonModule, MAT_TREE_DIRECTIVES],
                declarations: MAT_TREE_DIRECTIVES,
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvdHJlZS90cmVlLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXZDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFDLGlCQUFpQixFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFDdEUsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUMvQixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDM0MsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQzNDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLFdBQVcsQ0FBQzs7TUFFdkMsbUJBQW1CLEdBQUc7SUFDMUIsaUJBQWlCO0lBQ2pCLGNBQWM7SUFDZCxrQkFBa0I7SUFDbEIsaUJBQWlCO0lBQ2pCLE9BQU87SUFDUCxXQUFXO0lBQ1gsaUJBQWlCO0NBQ2xCO0FBT0QsTUFBTSxPQUFPLGFBQWE7OztZQUx6QixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsYUFBYSxFQUFFLGVBQWUsQ0FBQztnQkFDekMsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFFLG1CQUFtQixDQUFDO2dCQUMvQyxZQUFZLEVBQUUsbUJBQW1CO2FBQ2xDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0Nka1RyZWVNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay90cmVlJztcbmltcG9ydCB7TWF0Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7TWF0TmVzdGVkVHJlZU5vZGUsIE1hdFRyZWVOb2RlRGVmLCBNYXRUcmVlTm9kZX0gZnJvbSAnLi9ub2RlJztcbmltcG9ydCB7TWF0VHJlZX0gZnJvbSAnLi90cmVlJztcbmltcG9ydCB7TWF0VHJlZU5vZGVUb2dnbGV9IGZyb20gJy4vdG9nZ2xlJztcbmltcG9ydCB7TWF0VHJlZU5vZGVPdXRsZXR9IGZyb20gJy4vb3V0bGV0JztcbmltcG9ydCB7TWF0VHJlZU5vZGVQYWRkaW5nfSBmcm9tICcuL3BhZGRpbmcnO1xuXG5jb25zdCBNQVRfVFJFRV9ESVJFQ1RJVkVTID0gW1xuICBNYXROZXN0ZWRUcmVlTm9kZSxcbiAgTWF0VHJlZU5vZGVEZWYsXG4gIE1hdFRyZWVOb2RlUGFkZGluZyxcbiAgTWF0VHJlZU5vZGVUb2dnbGUsXG4gIE1hdFRyZWUsXG4gIE1hdFRyZWVOb2RlLFxuICBNYXRUcmVlTm9kZU91dGxldFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0Nka1RyZWVNb2R1bGUsIE1hdENvbW1vbk1vZHVsZV0sXG4gIGV4cG9ydHM6IFtNYXRDb21tb25Nb2R1bGUsIE1BVF9UUkVFX0RJUkVDVElWRVNdLFxuICBkZWNsYXJhdGlvbnM6IE1BVF9UUkVFX0RJUkVDVElWRVMsXG59KVxuZXhwb3J0IGNsYXNzIE1hdFRyZWVNb2R1bGUge31cbiJdfQ==