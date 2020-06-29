/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { InjectionToken } from '@angular/core';
/** Injection token to be used to override the default options for `mat-checkbox`. */
export const MAT_CHECKBOX_DEFAULT_OPTIONS = new InjectionToken('mat-checkbox-default-options', {
    providedIn: 'root',
    factory: MAT_CHECKBOX_DEFAULT_OPTIONS_FACTORY
});
/** @docs-private */
export function MAT_CHECKBOX_DEFAULT_OPTIONS_FACTORY() {
    return {
        color: 'accent',
        clickAction: 'check-indeterminate',
    };
}
/**
 * Injection token that can be used to specify the checkbox click behavior.
 * @deprecated Injection token will be removed, use `MAT_CHECKBOX_DEFAULT_OPTIONS` instead.
 * @breaking-change 10.0.0-sha-27f52711c
 */
export const MAT_CHECKBOX_CLICK_ACTION = new InjectionToken('mat-checkbox-click-action');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL2NoZWNrYm94L2NoZWNrYm94LWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFDSCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBUzdDLHFGQUFxRjtBQUNyRixNQUFNLENBQUMsTUFBTSw0QkFBNEIsR0FDckMsSUFBSSxjQUFjLENBQTRCLDhCQUE4QixFQUFFO0lBQzVFLFVBQVUsRUFBRSxNQUFNO0lBQ2xCLE9BQU8sRUFBRSxvQ0FBb0M7Q0FDOUMsQ0FBQyxDQUFDO0FBRVAsb0JBQW9CO0FBQ3BCLE1BQU0sVUFBVSxvQ0FBb0M7SUFDbEQsT0FBTztRQUNMLEtBQUssRUFBRSxRQUFRO1FBQ2YsV0FBVyxFQUFFLHFCQUFxQjtLQUNuQyxDQUFDO0FBQ0osQ0FBQztBQVdEOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsTUFBTSx5QkFBeUIsR0FDbEMsSUFBSSxjQUFjLENBQXlCLDJCQUEyQixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7SW5qZWN0aW9uVG9rZW59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtUaGVtZVBhbGV0dGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuXG4vKiogRGVmYXVsdCBgbWF0LWNoZWNrYm94YCBvcHRpb25zIHRoYXQgY2FuIGJlIG92ZXJyaWRkZW4uICovXG5leHBvcnQgaW50ZXJmYWNlIE1hdENoZWNrYm94RGVmYXVsdE9wdGlvbnMge1xuICBjb2xvcj86IFRoZW1lUGFsZXR0ZTtcbiAgY2xpY2tBY3Rpb24/OiBNYXRDaGVja2JveENsaWNrQWN0aW9uO1xufVxuXG4vKiogSW5qZWN0aW9uIHRva2VuIHRvIGJlIHVzZWQgdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHQgb3B0aW9ucyBmb3IgYG1hdC1jaGVja2JveGAuICovXG5leHBvcnQgY29uc3QgTUFUX0NIRUNLQk9YX0RFRkFVTFRfT1BUSU9OUyA9XG4gICAgbmV3IEluamVjdGlvblRva2VuPE1hdENoZWNrYm94RGVmYXVsdE9wdGlvbnM+KCdtYXQtY2hlY2tib3gtZGVmYXVsdC1vcHRpb25zJywge1xuICAgICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICAgICAgZmFjdG9yeTogTUFUX0NIRUNLQk9YX0RFRkFVTFRfT1BUSU9OU19GQUNUT1JZXG4gICAgfSk7XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgZnVuY3Rpb24gTUFUX0NIRUNLQk9YX0RFRkFVTFRfT1BUSU9OU19GQUNUT1JZKCk6IE1hdENoZWNrYm94RGVmYXVsdE9wdGlvbnMge1xuICByZXR1cm4ge1xuICAgIGNvbG9yOiAnYWNjZW50JyxcbiAgICBjbGlja0FjdGlvbjogJ2NoZWNrLWluZGV0ZXJtaW5hdGUnLFxuICB9O1xufVxuXG4vKipcbiAqIENoZWNrYm94IGNsaWNrIGFjdGlvbiB3aGVuIHVzZXIgY2xpY2sgb24gaW5wdXQgZWxlbWVudC5cbiAqIG5vb3A6IERvIG5vdCB0b2dnbGUgY2hlY2tlZCBvciBpbmRldGVybWluYXRlLlxuICogY2hlY2s6IE9ubHkgdG9nZ2xlIGNoZWNrZWQgc3RhdHVzLCBpZ25vcmUgaW5kZXRlcm1pbmF0ZS5cbiAqIGNoZWNrLWluZGV0ZXJtaW5hdGU6IFRvZ2dsZSBjaGVja2VkIHN0YXR1cywgc2V0IGluZGV0ZXJtaW5hdGUgdG8gZmFsc2UuIERlZmF1bHQgYmVoYXZpb3IuXG4gKiB1bmRlZmluZWQ6IFNhbWUgYXMgYGNoZWNrLWluZGV0ZXJtaW5hdGVgLlxuICovXG5leHBvcnQgdHlwZSBNYXRDaGVja2JveENsaWNrQWN0aW9uID0gJ25vb3AnIHwgJ2NoZWNrJyB8ICdjaGVjay1pbmRldGVybWluYXRlJyB8IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBjYW4gYmUgdXNlZCB0byBzcGVjaWZ5IHRoZSBjaGVja2JveCBjbGljayBiZWhhdmlvci5cbiAqIEBkZXByZWNhdGVkIEluamVjdGlvbiB0b2tlbiB3aWxsIGJlIHJlbW92ZWQsIHVzZSBgTUFUX0NIRUNLQk9YX0RFRkFVTFRfT1BUSU9OU2AgaW5zdGVhZC5cbiAqIEBicmVha2luZy1jaGFuZ2UgMTAuMC4wXG4gKi9cbmV4cG9ydCBjb25zdCBNQVRfQ0hFQ0tCT1hfQ0xJQ0tfQUNUSU9OID1cbiAgICBuZXcgSW5qZWN0aW9uVG9rZW48TWF0Q2hlY2tib3hDbGlja0FjdGlvbj4oJ21hdC1jaGVja2JveC1jbGljay1hY3Rpb24nKTtcbiJdfQ==