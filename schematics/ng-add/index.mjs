"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tasks_1 = require("@angular-devkit/schematics/tasks");
const package_config_1 = require("./package-config");
/**
 * Version range that will be used for the Angular CDK and Angular Material if this
 * schematic has been run outside of the CLI `ng add` command. In those cases, there
 * can be no dependency on `@angular/material` in the `package.json` file, and we need
 * to manually insert the dependency based on the build version placeholder.
 *
 * Note that the fallback version range does not use caret, but tilde because that is
 * the default for Angular framework dependencies in CLI projects.
 */
const fallbackMaterialVersionRange = `~13.3.6`;
/**
 * Schematic factory entry-point for the `ng-add` schematic. The ng-add schematic will be
 * automatically executed if developers run `ng add @angular/material`.
 *
 * Since the Angular Material schematics depend on the schematic utility functions from the CDK,
 * we need to install the CDK before loading the schematic files that import from the CDK.
 */
function default_1(options) {
    return (host, context) => {
        // Version tag of the `@angular/core` dependency that has been loaded from the `package.json`
        // of the CLI project. This tag should be preferred because all Angular dependencies should
        // have the same version tag if possible.
        const ngCoreVersionTag = (0, package_config_1.getPackageVersionFromPackageJson)(host, '@angular/core');
        const materialVersionRange = (0, package_config_1.getPackageVersionFromPackageJson)(host, '@angular/material');
        const angularDependencyVersion = ngCoreVersionTag || `^13.0.0 || ^14.0.0-0`;
        // The CLI inserts `@angular/material` into the `package.json` before this schematic runs.
        // This means that we do not need to insert Angular Material into `package.json` files again.
        // In some cases though, it could happen that this schematic runs outside of the CLI `ng add`
        // command, or Material is only listed a dev dependency. If that is the case, we insert a
        // version based on the current build version (substituted version placeholder).
        if (materialVersionRange === null) {
            (0, package_config_1.addPackageToPackageJson)(host, '@angular/material', fallbackMaterialVersionRange);
        }
        (0, package_config_1.addPackageToPackageJson)(host, '@angular/cdk', materialVersionRange || fallbackMaterialVersionRange);
        (0, package_config_1.addPackageToPackageJson)(host, '@angular/forms', angularDependencyVersion);
        (0, package_config_1.addPackageToPackageJson)(host, '@angular/animations', angularDependencyVersion);
        // Since the Angular Material schematics depend on the schematic utility functions from the
        // CDK, we need to install the CDK before loading the schematic files that import from the CDK.
        const installTaskId = context.addTask(new tasks_1.NodePackageInstallTask());
        context.addTask(new tasks_1.RunSchematicTask('ng-add-setup-project', options), [installTaskId]);
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvc2NoZW1hdGljcy9uZy1hZGQvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7QUFHSCw0REFBMEY7QUFDMUYscURBQTJGO0FBRzNGOzs7Ozs7OztHQVFHO0FBQ0gsTUFBTSw0QkFBNEIsR0FBRyxvQkFBb0IsQ0FBQztBQUUxRDs7Ozs7O0dBTUc7QUFDSCxtQkFBeUIsT0FBZTtJQUN0QyxPQUFPLENBQUMsSUFBVSxFQUFFLE9BQXlCLEVBQUUsRUFBRTtRQUMvQyw2RkFBNkY7UUFDN0YsMkZBQTJGO1FBQzNGLHlDQUF5QztRQUN6QyxNQUFNLGdCQUFnQixHQUFHLElBQUEsaURBQWdDLEVBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ2pGLE1BQU0sb0JBQW9CLEdBQUcsSUFBQSxpREFBZ0MsRUFBQyxJQUFJLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQUN6RixNQUFNLHdCQUF3QixHQUFHLGdCQUFnQixJQUFJLFVBQVUsQ0FBQztRQUVoRSwwRkFBMEY7UUFDMUYsNkZBQTZGO1FBQzdGLDZGQUE2RjtRQUM3Rix5RkFBeUY7UUFDekYsZ0ZBQWdGO1FBQ2hGLElBQUksb0JBQW9CLEtBQUssSUFBSSxFQUFFO1lBQ2pDLElBQUEsd0NBQXVCLEVBQUMsSUFBSSxFQUFFLG1CQUFtQixFQUFFLDRCQUE0QixDQUFDLENBQUM7U0FDbEY7UUFFRCxJQUFBLHdDQUF1QixFQUNyQixJQUFJLEVBQ0osY0FBYyxFQUNkLG9CQUFvQixJQUFJLDRCQUE0QixDQUNyRCxDQUFDO1FBQ0YsSUFBQSx3Q0FBdUIsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztRQUMxRSxJQUFBLHdDQUF1QixFQUFDLElBQUksRUFBRSxxQkFBcUIsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO1FBRS9FLDJGQUEyRjtRQUMzRiwrRkFBK0Y7UUFDL0YsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLDhCQUFzQixFQUFFLENBQUMsQ0FBQztRQUVwRSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksd0JBQWdCLENBQUMsc0JBQXNCLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBQzFGLENBQUMsQ0FBQztBQUNKLENBQUM7QUFoQ0QsNEJBZ0NDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7UnVsZSwgU2NoZW1hdGljQ29udGV4dCwgVHJlZX0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuaW1wb3J0IHtOb2RlUGFja2FnZUluc3RhbGxUYXNrLCBSdW5TY2hlbWF0aWNUYXNrfSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcy90YXNrcyc7XG5pbXBvcnQge2FkZFBhY2thZ2VUb1BhY2thZ2VKc29uLCBnZXRQYWNrYWdlVmVyc2lvbkZyb21QYWNrYWdlSnNvbn0gZnJvbSAnLi9wYWNrYWdlLWNvbmZpZyc7XG5pbXBvcnQge1NjaGVtYX0gZnJvbSAnLi9zY2hlbWEnO1xuXG4vKipcbiAqIFZlcnNpb24gcmFuZ2UgdGhhdCB3aWxsIGJlIHVzZWQgZm9yIHRoZSBBbmd1bGFyIENESyBhbmQgQW5ndWxhciBNYXRlcmlhbCBpZiB0aGlzXG4gKiBzY2hlbWF0aWMgaGFzIGJlZW4gcnVuIG91dHNpZGUgb2YgdGhlIENMSSBgbmcgYWRkYCBjb21tYW5kLiBJbiB0aG9zZSBjYXNlcywgdGhlcmVcbiAqIGNhbiBiZSBubyBkZXBlbmRlbmN5IG9uIGBAYW5ndWxhci9tYXRlcmlhbGAgaW4gdGhlIGBwYWNrYWdlLmpzb25gIGZpbGUsIGFuZCB3ZSBuZWVkXG4gKiB0byBtYW51YWxseSBpbnNlcnQgdGhlIGRlcGVuZGVuY3kgYmFzZWQgb24gdGhlIGJ1aWxkIHZlcnNpb24gcGxhY2Vob2xkZXIuXG4gKlxuICogTm90ZSB0aGF0IHRoZSBmYWxsYmFjayB2ZXJzaW9uIHJhbmdlIGRvZXMgbm90IHVzZSBjYXJldCwgYnV0IHRpbGRlIGJlY2F1c2UgdGhhdCBpc1xuICogdGhlIGRlZmF1bHQgZm9yIEFuZ3VsYXIgZnJhbWV3b3JrIGRlcGVuZGVuY2llcyBpbiBDTEkgcHJvamVjdHMuXG4gKi9cbmNvbnN0IGZhbGxiYWNrTWF0ZXJpYWxWZXJzaW9uUmFuZ2UgPSBgfjAuMC4wLVBMQUNFSE9MREVSYDtcblxuLyoqXG4gKiBTY2hlbWF0aWMgZmFjdG9yeSBlbnRyeS1wb2ludCBmb3IgdGhlIGBuZy1hZGRgIHNjaGVtYXRpYy4gVGhlIG5nLWFkZCBzY2hlbWF0aWMgd2lsbCBiZVxuICogYXV0b21hdGljYWxseSBleGVjdXRlZCBpZiBkZXZlbG9wZXJzIHJ1biBgbmcgYWRkIEBhbmd1bGFyL21hdGVyaWFsYC5cbiAqXG4gKiBTaW5jZSB0aGUgQW5ndWxhciBNYXRlcmlhbCBzY2hlbWF0aWNzIGRlcGVuZCBvbiB0aGUgc2NoZW1hdGljIHV0aWxpdHkgZnVuY3Rpb25zIGZyb20gdGhlIENESyxcbiAqIHdlIG5lZWQgdG8gaW5zdGFsbCB0aGUgQ0RLIGJlZm9yZSBsb2FkaW5nIHRoZSBzY2hlbWF0aWMgZmlsZXMgdGhhdCBpbXBvcnQgZnJvbSB0aGUgQ0RLLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAob3B0aW9uczogU2NoZW1hKTogUnVsZSB7XG4gIHJldHVybiAoaG9zdDogVHJlZSwgY29udGV4dDogU2NoZW1hdGljQ29udGV4dCkgPT4ge1xuICAgIC8vIFZlcnNpb24gdGFnIG9mIHRoZSBgQGFuZ3VsYXIvY29yZWAgZGVwZW5kZW5jeSB0aGF0IGhhcyBiZWVuIGxvYWRlZCBmcm9tIHRoZSBgcGFja2FnZS5qc29uYFxuICAgIC8vIG9mIHRoZSBDTEkgcHJvamVjdC4gVGhpcyB0YWcgc2hvdWxkIGJlIHByZWZlcnJlZCBiZWNhdXNlIGFsbCBBbmd1bGFyIGRlcGVuZGVuY2llcyBzaG91bGRcbiAgICAvLyBoYXZlIHRoZSBzYW1lIHZlcnNpb24gdGFnIGlmIHBvc3NpYmxlLlxuICAgIGNvbnN0IG5nQ29yZVZlcnNpb25UYWcgPSBnZXRQYWNrYWdlVmVyc2lvbkZyb21QYWNrYWdlSnNvbihob3N0LCAnQGFuZ3VsYXIvY29yZScpO1xuICAgIGNvbnN0IG1hdGVyaWFsVmVyc2lvblJhbmdlID0gZ2V0UGFja2FnZVZlcnNpb25Gcm9tUGFja2FnZUpzb24oaG9zdCwgJ0Bhbmd1bGFyL21hdGVyaWFsJyk7XG4gICAgY29uc3QgYW5ndWxhckRlcGVuZGVuY3lWZXJzaW9uID0gbmdDb3JlVmVyc2lvblRhZyB8fCBgMC4wLjAtTkdgO1xuXG4gICAgLy8gVGhlIENMSSBpbnNlcnRzIGBAYW5ndWxhci9tYXRlcmlhbGAgaW50byB0aGUgYHBhY2thZ2UuanNvbmAgYmVmb3JlIHRoaXMgc2NoZW1hdGljIHJ1bnMuXG4gICAgLy8gVGhpcyBtZWFucyB0aGF0IHdlIGRvIG5vdCBuZWVkIHRvIGluc2VydCBBbmd1bGFyIE1hdGVyaWFsIGludG8gYHBhY2thZ2UuanNvbmAgZmlsZXMgYWdhaW4uXG4gICAgLy8gSW4gc29tZSBjYXNlcyB0aG91Z2gsIGl0IGNvdWxkIGhhcHBlbiB0aGF0IHRoaXMgc2NoZW1hdGljIHJ1bnMgb3V0c2lkZSBvZiB0aGUgQ0xJIGBuZyBhZGRgXG4gICAgLy8gY29tbWFuZCwgb3IgTWF0ZXJpYWwgaXMgb25seSBsaXN0ZWQgYSBkZXYgZGVwZW5kZW5jeS4gSWYgdGhhdCBpcyB0aGUgY2FzZSwgd2UgaW5zZXJ0IGFcbiAgICAvLyB2ZXJzaW9uIGJhc2VkIG9uIHRoZSBjdXJyZW50IGJ1aWxkIHZlcnNpb24gKHN1YnN0aXR1dGVkIHZlcnNpb24gcGxhY2Vob2xkZXIpLlxuICAgIGlmIChtYXRlcmlhbFZlcnNpb25SYW5nZSA9PT0gbnVsbCkge1xuICAgICAgYWRkUGFja2FnZVRvUGFja2FnZUpzb24oaG9zdCwgJ0Bhbmd1bGFyL21hdGVyaWFsJywgZmFsbGJhY2tNYXRlcmlhbFZlcnNpb25SYW5nZSk7XG4gICAgfVxuXG4gICAgYWRkUGFja2FnZVRvUGFja2FnZUpzb24oXG4gICAgICBob3N0LFxuICAgICAgJ0Bhbmd1bGFyL2NkaycsXG4gICAgICBtYXRlcmlhbFZlcnNpb25SYW5nZSB8fCBmYWxsYmFja01hdGVyaWFsVmVyc2lvblJhbmdlLFxuICAgICk7XG4gICAgYWRkUGFja2FnZVRvUGFja2FnZUpzb24oaG9zdCwgJ0Bhbmd1bGFyL2Zvcm1zJywgYW5ndWxhckRlcGVuZGVuY3lWZXJzaW9uKTtcbiAgICBhZGRQYWNrYWdlVG9QYWNrYWdlSnNvbihob3N0LCAnQGFuZ3VsYXIvYW5pbWF0aW9ucycsIGFuZ3VsYXJEZXBlbmRlbmN5VmVyc2lvbik7XG5cbiAgICAvLyBTaW5jZSB0aGUgQW5ndWxhciBNYXRlcmlhbCBzY2hlbWF0aWNzIGRlcGVuZCBvbiB0aGUgc2NoZW1hdGljIHV0aWxpdHkgZnVuY3Rpb25zIGZyb20gdGhlXG4gICAgLy8gQ0RLLCB3ZSBuZWVkIHRvIGluc3RhbGwgdGhlIENESyBiZWZvcmUgbG9hZGluZyB0aGUgc2NoZW1hdGljIGZpbGVzIHRoYXQgaW1wb3J0IGZyb20gdGhlIENESy5cbiAgICBjb25zdCBpbnN0YWxsVGFza0lkID0gY29udGV4dC5hZGRUYXNrKG5ldyBOb2RlUGFja2FnZUluc3RhbGxUYXNrKCkpO1xuXG4gICAgY29udGV4dC5hZGRUYXNrKG5ldyBSdW5TY2hlbWF0aWNUYXNrKCduZy1hZGQtc2V0dXAtcHJvamVjdCcsIG9wdGlvbnMpLCBbaW5zdGFsbFRhc2tJZF0pO1xuICB9O1xufVxuIl19