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
const fallbackMaterialVersionRange = `~10.1.0-next.0-sha-b441bdf6b`;
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
        const ngCoreVersionTag = package_config_1.getPackageVersionFromPackageJson(host, '@angular/core');
        const materialVersionRange = package_config_1.getPackageVersionFromPackageJson(host, '@angular/material');
        const angularDependencyVersion = ngCoreVersionTag || `^10.0.0 || ^11.0.0-0`;
        // The CLI inserts `@angular/material` into the `package.json` before this schematic runs.
        // This means that we do not need to insert Angular Material into `package.json` files again.
        // In some cases though, it could happen that this schematic runs outside of the CLI `ng add`
        // command, or Material is only listed a dev dependency. If that is the case, we insert a
        // version based on the current build version (substituted version placeholder).
        if (materialVersionRange === null) {
            package_config_1.addPackageToPackageJson(host, '@angular/material', fallbackMaterialVersionRange);
        }
        package_config_1.addPackageToPackageJson(host, '@angular/cdk', materialVersionRange || fallbackMaterialVersionRange);
        package_config_1.addPackageToPackageJson(host, '@angular/forms', angularDependencyVersion);
        package_config_1.addPackageToPackageJson(host, '@angular/animations', angularDependencyVersion);
        // Since the Angular Material schematics depend on the schematic utility functions from the
        // CDK, we need to install the CDK before loading the schematic files that import from the CDK.
        const installTaskId = context.addTask(new tasks_1.NodePackageInstallTask());
        context.addTask(new tasks_1.RunSchematicTask('ng-add-setup-project', options), [installTaskId]);
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvc2NoZW1hdGljcy9uZy1hZGQvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7QUFHSCw0REFBMEY7QUFDMUYscURBQTJGO0FBRzNGOzs7Ozs7OztHQVFHO0FBQ0gsTUFBTSw0QkFBNEIsR0FBRyxvQkFBb0IsQ0FBQztBQUUxRDs7Ozs7O0dBTUc7QUFDSCxtQkFBd0IsT0FBZTtJQUNyQyxPQUFPLENBQUMsSUFBVSxFQUFFLE9BQXlCLEVBQUUsRUFBRTtRQUMvQyw2RkFBNkY7UUFDN0YsMkZBQTJGO1FBQzNGLHlDQUF5QztRQUN6QyxNQUFNLGdCQUFnQixHQUFHLGlEQUFnQyxDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQztRQUNqRixNQUFNLG9CQUFvQixHQUFHLGlEQUFnQyxDQUFDLElBQUksRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3pGLE1BQU0sd0JBQXdCLEdBQUcsZ0JBQWdCLElBQUksVUFBVSxDQUFDO1FBRWhFLDBGQUEwRjtRQUMxRiw2RkFBNkY7UUFDN0YsNkZBQTZGO1FBQzdGLHlGQUF5RjtRQUN6RixnRkFBZ0Y7UUFDaEYsSUFBSSxvQkFBb0IsS0FBSyxJQUFJLEVBQUU7WUFDakMsd0NBQXVCLENBQUMsSUFBSSxFQUFFLG1CQUFtQixFQUFFLDRCQUE0QixDQUFDLENBQUM7U0FDbEY7UUFFRCx3Q0FBdUIsQ0FDbkIsSUFBSSxFQUFFLGNBQWMsRUFBRSxvQkFBb0IsSUFBSSw0QkFBNEIsQ0FBQyxDQUFDO1FBQ2hGLHdDQUF1QixDQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO1FBQzFFLHdDQUF1QixDQUFDLElBQUksRUFBRSxxQkFBcUIsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO1FBRS9FLDJGQUEyRjtRQUMzRiwrRkFBK0Y7UUFDL0YsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLDhCQUFzQixFQUFFLENBQUMsQ0FBQztRQUVwRSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksd0JBQWdCLENBQUMsc0JBQXNCLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBQzFGLENBQUMsQ0FBQztBQUNKLENBQUM7QUE3QkQsNEJBNkJDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7UnVsZSwgU2NoZW1hdGljQ29udGV4dCwgVHJlZX0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuaW1wb3J0IHtOb2RlUGFja2FnZUluc3RhbGxUYXNrLCBSdW5TY2hlbWF0aWNUYXNrfSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcy90YXNrcyc7XG5pbXBvcnQge2FkZFBhY2thZ2VUb1BhY2thZ2VKc29uLCBnZXRQYWNrYWdlVmVyc2lvbkZyb21QYWNrYWdlSnNvbn0gZnJvbSAnLi9wYWNrYWdlLWNvbmZpZyc7XG5pbXBvcnQge1NjaGVtYX0gZnJvbSAnLi9zY2hlbWEnO1xuXG4vKipcbiAqIFZlcnNpb24gcmFuZ2UgdGhhdCB3aWxsIGJlIHVzZWQgZm9yIHRoZSBBbmd1bGFyIENESyBhbmQgQW5ndWxhciBNYXRlcmlhbCBpZiB0aGlzXG4gKiBzY2hlbWF0aWMgaGFzIGJlZW4gcnVuIG91dHNpZGUgb2YgdGhlIENMSSBgbmcgYWRkYCBjb21tYW5kLiBJbiB0aG9zZSBjYXNlcywgdGhlcmVcbiAqIGNhbiBiZSBubyBkZXBlbmRlbmN5IG9uIGBAYW5ndWxhci9tYXRlcmlhbGAgaW4gdGhlIGBwYWNrYWdlLmpzb25gIGZpbGUsIGFuZCB3ZSBuZWVkXG4gKiB0byBtYW51YWxseSBpbnNlcnQgdGhlIGRlcGVuZGVuY3kgYmFzZWQgb24gdGhlIGJ1aWxkIHZlcnNpb24gcGxhY2Vob2xkZXIuXG4gKlxuICogTm90ZSB0aGF0IHRoZSBmYWxsYmFjayB2ZXJzaW9uIHJhbmdlIGRvZXMgbm90IHVzZSBjYXJldCwgYnV0IHRpbGRlIGJlY2F1c2UgdGhhdCBpc1xuICogdGhlIGRlZmF1bHQgZm9yIEFuZ3VsYXIgZnJhbWV3b3JrIGRlcGVuZGVuY2llcyBpbiBDTEkgcHJvamVjdHMuXG4gKi9cbmNvbnN0IGZhbGxiYWNrTWF0ZXJpYWxWZXJzaW9uUmFuZ2UgPSBgfjAuMC4wLVBMQUNFSE9MREVSYDtcblxuLyoqXG4gKiBTY2hlbWF0aWMgZmFjdG9yeSBlbnRyeS1wb2ludCBmb3IgdGhlIGBuZy1hZGRgIHNjaGVtYXRpYy4gVGhlIG5nLWFkZCBzY2hlbWF0aWMgd2lsbCBiZVxuICogYXV0b21hdGljYWxseSBleGVjdXRlZCBpZiBkZXZlbG9wZXJzIHJ1biBgbmcgYWRkIEBhbmd1bGFyL21hdGVyaWFsYC5cbiAqXG4gKiBTaW5jZSB0aGUgQW5ndWxhciBNYXRlcmlhbCBzY2hlbWF0aWNzIGRlcGVuZCBvbiB0aGUgc2NoZW1hdGljIHV0aWxpdHkgZnVuY3Rpb25zIGZyb20gdGhlIENESyxcbiAqIHdlIG5lZWQgdG8gaW5zdGFsbCB0aGUgQ0RLIGJlZm9yZSBsb2FkaW5nIHRoZSBzY2hlbWF0aWMgZmlsZXMgdGhhdCBpbXBvcnQgZnJvbSB0aGUgQ0RLLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zOiBTY2hlbWEpOiBSdWxlIHtcbiAgcmV0dXJuIChob3N0OiBUcmVlLCBjb250ZXh0OiBTY2hlbWF0aWNDb250ZXh0KSA9PiB7XG4gICAgLy8gVmVyc2lvbiB0YWcgb2YgdGhlIGBAYW5ndWxhci9jb3JlYCBkZXBlbmRlbmN5IHRoYXQgaGFzIGJlZW4gbG9hZGVkIGZyb20gdGhlIGBwYWNrYWdlLmpzb25gXG4gICAgLy8gb2YgdGhlIENMSSBwcm9qZWN0LiBUaGlzIHRhZyBzaG91bGQgYmUgcHJlZmVycmVkIGJlY2F1c2UgYWxsIEFuZ3VsYXIgZGVwZW5kZW5jaWVzIHNob3VsZFxuICAgIC8vIGhhdmUgdGhlIHNhbWUgdmVyc2lvbiB0YWcgaWYgcG9zc2libGUuXG4gICAgY29uc3QgbmdDb3JlVmVyc2lvblRhZyA9IGdldFBhY2thZ2VWZXJzaW9uRnJvbVBhY2thZ2VKc29uKGhvc3QsICdAYW5ndWxhci9jb3JlJyk7XG4gICAgY29uc3QgbWF0ZXJpYWxWZXJzaW9uUmFuZ2UgPSBnZXRQYWNrYWdlVmVyc2lvbkZyb21QYWNrYWdlSnNvbihob3N0LCAnQGFuZ3VsYXIvbWF0ZXJpYWwnKTtcbiAgICBjb25zdCBhbmd1bGFyRGVwZW5kZW5jeVZlcnNpb24gPSBuZ0NvcmVWZXJzaW9uVGFnIHx8IGAwLjAuMC1OR2A7XG5cbiAgICAvLyBUaGUgQ0xJIGluc2VydHMgYEBhbmd1bGFyL21hdGVyaWFsYCBpbnRvIHRoZSBgcGFja2FnZS5qc29uYCBiZWZvcmUgdGhpcyBzY2hlbWF0aWMgcnVucy5cbiAgICAvLyBUaGlzIG1lYW5zIHRoYXQgd2UgZG8gbm90IG5lZWQgdG8gaW5zZXJ0IEFuZ3VsYXIgTWF0ZXJpYWwgaW50byBgcGFja2FnZS5qc29uYCBmaWxlcyBhZ2Fpbi5cbiAgICAvLyBJbiBzb21lIGNhc2VzIHRob3VnaCwgaXQgY291bGQgaGFwcGVuIHRoYXQgdGhpcyBzY2hlbWF0aWMgcnVucyBvdXRzaWRlIG9mIHRoZSBDTEkgYG5nIGFkZGBcbiAgICAvLyBjb21tYW5kLCBvciBNYXRlcmlhbCBpcyBvbmx5IGxpc3RlZCBhIGRldiBkZXBlbmRlbmN5LiBJZiB0aGF0IGlzIHRoZSBjYXNlLCB3ZSBpbnNlcnQgYVxuICAgIC8vIHZlcnNpb24gYmFzZWQgb24gdGhlIGN1cnJlbnQgYnVpbGQgdmVyc2lvbiAoc3Vic3RpdHV0ZWQgdmVyc2lvbiBwbGFjZWhvbGRlcikuXG4gICAgaWYgKG1hdGVyaWFsVmVyc2lvblJhbmdlID09PSBudWxsKSB7XG4gICAgICBhZGRQYWNrYWdlVG9QYWNrYWdlSnNvbihob3N0LCAnQGFuZ3VsYXIvbWF0ZXJpYWwnLCBmYWxsYmFja01hdGVyaWFsVmVyc2lvblJhbmdlKTtcbiAgICB9XG5cbiAgICBhZGRQYWNrYWdlVG9QYWNrYWdlSnNvbihcbiAgICAgICAgaG9zdCwgJ0Bhbmd1bGFyL2NkaycsIG1hdGVyaWFsVmVyc2lvblJhbmdlIHx8IGZhbGxiYWNrTWF0ZXJpYWxWZXJzaW9uUmFuZ2UpO1xuICAgIGFkZFBhY2thZ2VUb1BhY2thZ2VKc29uKGhvc3QsICdAYW5ndWxhci9mb3JtcycsIGFuZ3VsYXJEZXBlbmRlbmN5VmVyc2lvbik7XG4gICAgYWRkUGFja2FnZVRvUGFja2FnZUpzb24oaG9zdCwgJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnLCBhbmd1bGFyRGVwZW5kZW5jeVZlcnNpb24pO1xuXG4gICAgLy8gU2luY2UgdGhlIEFuZ3VsYXIgTWF0ZXJpYWwgc2NoZW1hdGljcyBkZXBlbmQgb24gdGhlIHNjaGVtYXRpYyB1dGlsaXR5IGZ1bmN0aW9ucyBmcm9tIHRoZVxuICAgIC8vIENESywgd2UgbmVlZCB0byBpbnN0YWxsIHRoZSBDREsgYmVmb3JlIGxvYWRpbmcgdGhlIHNjaGVtYXRpYyBmaWxlcyB0aGF0IGltcG9ydCBmcm9tIHRoZSBDREsuXG4gICAgY29uc3QgaW5zdGFsbFRhc2tJZCA9IGNvbnRleHQuYWRkVGFzayhuZXcgTm9kZVBhY2thZ2VJbnN0YWxsVGFzaygpKTtcblxuICAgIGNvbnRleHQuYWRkVGFzayhuZXcgUnVuU2NoZW1hdGljVGFzaygnbmctYWRkLXNldHVwLXByb2plY3QnLCBvcHRpb25zKSwgW2luc3RhbGxUYXNrSWRdKTtcbiAgfTtcbn1cbiJdfQ==