"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
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
const fallbackMaterialVersionRange = `~18.2.0-next.3`;
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
        const angularDependencyVersion = ngCoreVersionTag || `^18.0.0-0 || ^18.1.0-0 || ^18.2.0-0 || ^18.3.0-0 || ^19.0.0-0`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvc2NoZW1hdGljcy9uZy1hZGQvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7QUF5QkgsNEJBZ0NDO0FBdERELDREQUEwRjtBQUMxRixxREFBMkY7QUFHM0Y7Ozs7Ozs7O0dBUUc7QUFDSCxNQUFNLDRCQUE0QixHQUFHLG9CQUFvQixDQUFDO0FBRTFEOzs7Ozs7R0FNRztBQUNILG1CQUF5QixPQUFlO0lBQ3RDLE9BQU8sQ0FBQyxJQUFVLEVBQUUsT0FBeUIsRUFBRSxFQUFFO1FBQy9DLDZGQUE2RjtRQUM3RiwyRkFBMkY7UUFDM0YseUNBQXlDO1FBQ3pDLE1BQU0sZ0JBQWdCLEdBQUcsSUFBQSxpREFBZ0MsRUFBQyxJQUFJLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDakYsTUFBTSxvQkFBb0IsR0FBRyxJQUFBLGlEQUFnQyxFQUFDLElBQUksRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3pGLE1BQU0sd0JBQXdCLEdBQUcsZ0JBQWdCLElBQUksVUFBVSxDQUFDO1FBRWhFLDBGQUEwRjtRQUMxRiw2RkFBNkY7UUFDN0YsNkZBQTZGO1FBQzdGLHlGQUF5RjtRQUN6RixnRkFBZ0Y7UUFDaEYsSUFBSSxvQkFBb0IsS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUNsQyxJQUFBLHdDQUF1QixFQUFDLElBQUksRUFBRSxtQkFBbUIsRUFBRSw0QkFBNEIsQ0FBQyxDQUFDO1FBQ25GLENBQUM7UUFFRCxJQUFBLHdDQUF1QixFQUNyQixJQUFJLEVBQ0osY0FBYyxFQUNkLG9CQUFvQixJQUFJLDRCQUE0QixDQUNyRCxDQUFDO1FBQ0YsSUFBQSx3Q0FBdUIsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztRQUMxRSxJQUFBLHdDQUF1QixFQUFDLElBQUksRUFBRSxxQkFBcUIsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO1FBRS9FLDJGQUEyRjtRQUMzRiwrRkFBK0Y7UUFDL0YsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLDhCQUFzQixFQUFFLENBQUMsQ0FBQztRQUVwRSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksd0JBQWdCLENBQUMsc0JBQXNCLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBQzFGLENBQUMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtSdWxlLCBTY2hlbWF0aWNDb250ZXh0LCBUcmVlfSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5pbXBvcnQge05vZGVQYWNrYWdlSW5zdGFsbFRhc2ssIFJ1blNjaGVtYXRpY1Rhc2t9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzL3Rhc2tzJztcbmltcG9ydCB7YWRkUGFja2FnZVRvUGFja2FnZUpzb24sIGdldFBhY2thZ2VWZXJzaW9uRnJvbVBhY2thZ2VKc29ufSBmcm9tICcuL3BhY2thZ2UtY29uZmlnJztcbmltcG9ydCB7U2NoZW1hfSBmcm9tICcuL3NjaGVtYSc7XG5cbi8qKlxuICogVmVyc2lvbiByYW5nZSB0aGF0IHdpbGwgYmUgdXNlZCBmb3IgdGhlIEFuZ3VsYXIgQ0RLIGFuZCBBbmd1bGFyIE1hdGVyaWFsIGlmIHRoaXNcbiAqIHNjaGVtYXRpYyBoYXMgYmVlbiBydW4gb3V0c2lkZSBvZiB0aGUgQ0xJIGBuZyBhZGRgIGNvbW1hbmQuIEluIHRob3NlIGNhc2VzLCB0aGVyZVxuICogY2FuIGJlIG5vIGRlcGVuZGVuY3kgb24gYEBhbmd1bGFyL21hdGVyaWFsYCBpbiB0aGUgYHBhY2thZ2UuanNvbmAgZmlsZSwgYW5kIHdlIG5lZWRcbiAqIHRvIG1hbnVhbGx5IGluc2VydCB0aGUgZGVwZW5kZW5jeSBiYXNlZCBvbiB0aGUgYnVpbGQgdmVyc2lvbiBwbGFjZWhvbGRlci5cbiAqXG4gKiBOb3RlIHRoYXQgdGhlIGZhbGxiYWNrIHZlcnNpb24gcmFuZ2UgZG9lcyBub3QgdXNlIGNhcmV0LCBidXQgdGlsZGUgYmVjYXVzZSB0aGF0IGlzXG4gKiB0aGUgZGVmYXVsdCBmb3IgQW5ndWxhciBmcmFtZXdvcmsgZGVwZW5kZW5jaWVzIGluIENMSSBwcm9qZWN0cy5cbiAqL1xuY29uc3QgZmFsbGJhY2tNYXRlcmlhbFZlcnNpb25SYW5nZSA9IGB+MC4wLjAtUExBQ0VIT0xERVJgO1xuXG4vKipcbiAqIFNjaGVtYXRpYyBmYWN0b3J5IGVudHJ5LXBvaW50IGZvciB0aGUgYG5nLWFkZGAgc2NoZW1hdGljLiBUaGUgbmctYWRkIHNjaGVtYXRpYyB3aWxsIGJlXG4gKiBhdXRvbWF0aWNhbGx5IGV4ZWN1dGVkIGlmIGRldmVsb3BlcnMgcnVuIGBuZyBhZGQgQGFuZ3VsYXIvbWF0ZXJpYWxgLlxuICpcbiAqIFNpbmNlIHRoZSBBbmd1bGFyIE1hdGVyaWFsIHNjaGVtYXRpY3MgZGVwZW5kIG9uIHRoZSBzY2hlbWF0aWMgdXRpbGl0eSBmdW5jdGlvbnMgZnJvbSB0aGUgQ0RLLFxuICogd2UgbmVlZCB0byBpbnN0YWxsIHRoZSBDREsgYmVmb3JlIGxvYWRpbmcgdGhlIHNjaGVtYXRpYyBmaWxlcyB0aGF0IGltcG9ydCBmcm9tIHRoZSBDREsuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChvcHRpb25zOiBTY2hlbWEpOiBSdWxlIHtcbiAgcmV0dXJuIChob3N0OiBUcmVlLCBjb250ZXh0OiBTY2hlbWF0aWNDb250ZXh0KSA9PiB7XG4gICAgLy8gVmVyc2lvbiB0YWcgb2YgdGhlIGBAYW5ndWxhci9jb3JlYCBkZXBlbmRlbmN5IHRoYXQgaGFzIGJlZW4gbG9hZGVkIGZyb20gdGhlIGBwYWNrYWdlLmpzb25gXG4gICAgLy8gb2YgdGhlIENMSSBwcm9qZWN0LiBUaGlzIHRhZyBzaG91bGQgYmUgcHJlZmVycmVkIGJlY2F1c2UgYWxsIEFuZ3VsYXIgZGVwZW5kZW5jaWVzIHNob3VsZFxuICAgIC8vIGhhdmUgdGhlIHNhbWUgdmVyc2lvbiB0YWcgaWYgcG9zc2libGUuXG4gICAgY29uc3QgbmdDb3JlVmVyc2lvblRhZyA9IGdldFBhY2thZ2VWZXJzaW9uRnJvbVBhY2thZ2VKc29uKGhvc3QsICdAYW5ndWxhci9jb3JlJyk7XG4gICAgY29uc3QgbWF0ZXJpYWxWZXJzaW9uUmFuZ2UgPSBnZXRQYWNrYWdlVmVyc2lvbkZyb21QYWNrYWdlSnNvbihob3N0LCAnQGFuZ3VsYXIvbWF0ZXJpYWwnKTtcbiAgICBjb25zdCBhbmd1bGFyRGVwZW5kZW5jeVZlcnNpb24gPSBuZ0NvcmVWZXJzaW9uVGFnIHx8IGAwLjAuMC1OR2A7XG5cbiAgICAvLyBUaGUgQ0xJIGluc2VydHMgYEBhbmd1bGFyL21hdGVyaWFsYCBpbnRvIHRoZSBgcGFja2FnZS5qc29uYCBiZWZvcmUgdGhpcyBzY2hlbWF0aWMgcnVucy5cbiAgICAvLyBUaGlzIG1lYW5zIHRoYXQgd2UgZG8gbm90IG5lZWQgdG8gaW5zZXJ0IEFuZ3VsYXIgTWF0ZXJpYWwgaW50byBgcGFja2FnZS5qc29uYCBmaWxlcyBhZ2Fpbi5cbiAgICAvLyBJbiBzb21lIGNhc2VzIHRob3VnaCwgaXQgY291bGQgaGFwcGVuIHRoYXQgdGhpcyBzY2hlbWF0aWMgcnVucyBvdXRzaWRlIG9mIHRoZSBDTEkgYG5nIGFkZGBcbiAgICAvLyBjb21tYW5kLCBvciBNYXRlcmlhbCBpcyBvbmx5IGxpc3RlZCBhIGRldiBkZXBlbmRlbmN5LiBJZiB0aGF0IGlzIHRoZSBjYXNlLCB3ZSBpbnNlcnQgYVxuICAgIC8vIHZlcnNpb24gYmFzZWQgb24gdGhlIGN1cnJlbnQgYnVpbGQgdmVyc2lvbiAoc3Vic3RpdHV0ZWQgdmVyc2lvbiBwbGFjZWhvbGRlcikuXG4gICAgaWYgKG1hdGVyaWFsVmVyc2lvblJhbmdlID09PSBudWxsKSB7XG4gICAgICBhZGRQYWNrYWdlVG9QYWNrYWdlSnNvbihob3N0LCAnQGFuZ3VsYXIvbWF0ZXJpYWwnLCBmYWxsYmFja01hdGVyaWFsVmVyc2lvblJhbmdlKTtcbiAgICB9XG5cbiAgICBhZGRQYWNrYWdlVG9QYWNrYWdlSnNvbihcbiAgICAgIGhvc3QsXG4gICAgICAnQGFuZ3VsYXIvY2RrJyxcbiAgICAgIG1hdGVyaWFsVmVyc2lvblJhbmdlIHx8IGZhbGxiYWNrTWF0ZXJpYWxWZXJzaW9uUmFuZ2UsXG4gICAgKTtcbiAgICBhZGRQYWNrYWdlVG9QYWNrYWdlSnNvbihob3N0LCAnQGFuZ3VsYXIvZm9ybXMnLCBhbmd1bGFyRGVwZW5kZW5jeVZlcnNpb24pO1xuICAgIGFkZFBhY2thZ2VUb1BhY2thZ2VKc29uKGhvc3QsICdAYW5ndWxhci9hbmltYXRpb25zJywgYW5ndWxhckRlcGVuZGVuY3lWZXJzaW9uKTtcblxuICAgIC8vIFNpbmNlIHRoZSBBbmd1bGFyIE1hdGVyaWFsIHNjaGVtYXRpY3MgZGVwZW5kIG9uIHRoZSBzY2hlbWF0aWMgdXRpbGl0eSBmdW5jdGlvbnMgZnJvbSB0aGVcbiAgICAvLyBDREssIHdlIG5lZWQgdG8gaW5zdGFsbCB0aGUgQ0RLIGJlZm9yZSBsb2FkaW5nIHRoZSBzY2hlbWF0aWMgZmlsZXMgdGhhdCBpbXBvcnQgZnJvbSB0aGUgQ0RLLlxuICAgIGNvbnN0IGluc3RhbGxUYXNrSWQgPSBjb250ZXh0LmFkZFRhc2sobmV3IE5vZGVQYWNrYWdlSW5zdGFsbFRhc2soKSk7XG5cbiAgICBjb250ZXh0LmFkZFRhc2sobmV3IFJ1blNjaGVtYXRpY1Rhc2soJ25nLWFkZC1zZXR1cC1wcm9qZWN0Jywgb3B0aW9ucyksIFtpbnN0YWxsVGFza0lkXSk7XG4gIH07XG59XG4iXX0=