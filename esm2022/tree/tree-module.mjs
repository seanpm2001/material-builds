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
import * as i0 from "@angular/core";
const MAT_TREE_DIRECTIVES = [
    MatNestedTreeNode,
    MatTreeNodeDef,
    MatTreeNodePadding,
    MatTreeNodeToggle,
    MatTree,
    MatTreeNode,
    MatTreeNodeOutlet,
];
export class MatTreeModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.0-next.2", ngImport: i0, type: MatTreeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.2.0-next.2", ngImport: i0, type: MatTreeModule, imports: [CdkTreeModule, MatCommonModule, MatNestedTreeNode,
            MatTreeNodeDef,
            MatTreeNodePadding,
            MatTreeNodeToggle,
            MatTree,
            MatTreeNode,
            MatTreeNodeOutlet], exports: [MatCommonModule, MatNestedTreeNode,
            MatTreeNodeDef,
            MatTreeNodePadding,
            MatTreeNodeToggle,
            MatTree,
            MatTreeNode,
            MatTreeNodeOutlet] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.2.0-next.2", ngImport: i0, type: MatTreeModule, imports: [CdkTreeModule, MatCommonModule, MatCommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.0-next.2", ngImport: i0, type: MatTreeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CdkTreeModule, MatCommonModule, ...MAT_TREE_DIRECTIVES],
                    exports: [MatCommonModule, MAT_TREE_DIRECTIVES],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvdHJlZS90cmVlLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXZDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFDLGlCQUFpQixFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFDdEUsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUMvQixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDM0MsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQzNDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLFdBQVcsQ0FBQzs7QUFFN0MsTUFBTSxtQkFBbUIsR0FBRztJQUMxQixpQkFBaUI7SUFDakIsY0FBYztJQUNkLGtCQUFrQjtJQUNsQixpQkFBaUI7SUFDakIsT0FBTztJQUNQLFdBQVc7SUFDWCxpQkFBaUI7Q0FDbEIsQ0FBQztBQU1GLE1BQU0sT0FBTyxhQUFhO3FIQUFiLGFBQWE7c0hBQWIsYUFBYSxZQUhkLGFBQWEsRUFBRSxlQUFlLEVBVnhDLGlCQUFpQjtZQUNqQixjQUFjO1lBQ2Qsa0JBQWtCO1lBQ2xCLGlCQUFpQjtZQUNqQixPQUFPO1lBQ1AsV0FBVztZQUNYLGlCQUFpQixhQUtQLGVBQWUsRUFYekIsaUJBQWlCO1lBQ2pCLGNBQWM7WUFDZCxrQkFBa0I7WUFDbEIsaUJBQWlCO1lBQ2pCLE9BQU87WUFDUCxXQUFXO1lBQ1gsaUJBQWlCO3NIQU9OLGFBQWEsWUFIZCxhQUFhLEVBQUUsZUFBZSxFQUM5QixlQUFlOztrR0FFZCxhQUFhO2tCQUp6QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGFBQWEsRUFBRSxlQUFlLEVBQUUsR0FBRyxtQkFBbUIsQ0FBQztvQkFDakUsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFFLG1CQUFtQixDQUFDO2lCQUNoRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtDZGtUcmVlTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvdHJlZSc7XG5pbXBvcnQge01hdENvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQge01hdE5lc3RlZFRyZWVOb2RlLCBNYXRUcmVlTm9kZURlZiwgTWF0VHJlZU5vZGV9IGZyb20gJy4vbm9kZSc7XG5pbXBvcnQge01hdFRyZWV9IGZyb20gJy4vdHJlZSc7XG5pbXBvcnQge01hdFRyZWVOb2RlVG9nZ2xlfSBmcm9tICcuL3RvZ2dsZSc7XG5pbXBvcnQge01hdFRyZWVOb2RlT3V0bGV0fSBmcm9tICcuL291dGxldCc7XG5pbXBvcnQge01hdFRyZWVOb2RlUGFkZGluZ30gZnJvbSAnLi9wYWRkaW5nJztcblxuY29uc3QgTUFUX1RSRUVfRElSRUNUSVZFUyA9IFtcbiAgTWF0TmVzdGVkVHJlZU5vZGUsXG4gIE1hdFRyZWVOb2RlRGVmLFxuICBNYXRUcmVlTm9kZVBhZGRpbmcsXG4gIE1hdFRyZWVOb2RlVG9nZ2xlLFxuICBNYXRUcmVlLFxuICBNYXRUcmVlTm9kZSxcbiAgTWF0VHJlZU5vZGVPdXRsZXQsXG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ2RrVHJlZU1vZHVsZSwgTWF0Q29tbW9uTW9kdWxlLCAuLi5NQVRfVFJFRV9ESVJFQ1RJVkVTXSxcbiAgZXhwb3J0czogW01hdENvbW1vbk1vZHVsZSwgTUFUX1RSRUVfRElSRUNUSVZFU10sXG59KVxuZXhwb3J0IGNsYXNzIE1hdFRyZWVNb2R1bGUge31cbiJdfQ==