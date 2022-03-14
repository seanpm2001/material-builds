/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { animate, state, style, transition, trigger, query, animateChild, group, } from '@angular/animations';
/**
 * Animations used by MatDialog.
 * @docs-private
 */
export const matDialogAnimations = {
    /** Animation that is applied on the dialog container by default. */
    dialogContainer: trigger('dialogContainer', [
        // Note: The `enter` animation transitions to `transform: none`, because for some reason
        // specifying the transform explicitly, causes IE both to blur the dialog content and
        // decimate the animation performance. Leaving it as `none` solves both issues.
        state('void, exit', style({ opacity: 0, transform: 'scale(0.7)' })),
        state('enter', style({ transform: 'none' })),
        transition('* => enter', group([
            animate('{{enterAnimationDuration}} cubic-bezier(0, 0, 0.2, 1)', style({ transform: 'none', opacity: 1 })),
            query('@*', animateChild(), { optional: true }),
        ])),
        transition('* => void, * => exit', group([
            animate('{{exitAnimationDuration}} cubic-bezier(0.4, 0.0, 0.2, 1)', style({ opacity: 0 })),
            query('@*', animateChild(), { optional: true }),
        ])),
    ]),
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWFuaW1hdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbWF0ZXJpYWwvZGlhbG9nL2RpYWxvZy1hbmltYXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUNILE9BQU8sRUFDTCxPQUFPLEVBQ1AsS0FBSyxFQUNMLEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxFQUVQLEtBQUssRUFDTCxZQUFZLEVBQ1osS0FBSyxHQUNOLE1BQU0scUJBQXFCLENBQUM7QUFFN0I7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBRTVCO0lBQ0Ysb0VBQW9FO0lBQ3BFLGVBQWUsRUFBRSxPQUFPLENBQUMsaUJBQWlCLEVBQUU7UUFDMUMsd0ZBQXdGO1FBQ3hGLHFGQUFxRjtRQUNyRiwrRUFBK0U7UUFDL0UsS0FBSyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUMsQ0FBQyxDQUFDO1FBQ2pFLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUM7UUFDMUMsVUFBVSxDQUNSLFlBQVksRUFDWixLQUFLLENBQUM7WUFDSixPQUFPLENBQ0wsdURBQXVELEVBQ3ZELEtBQUssQ0FBQyxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQ3ZDO1lBQ0QsS0FBSyxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQztTQUM5QyxDQUFDLENBQ0g7UUFDRCxVQUFVLENBQ1Isc0JBQXNCLEVBQ3RCLEtBQUssQ0FBQztZQUNKLE9BQU8sQ0FBQywwREFBMEQsRUFBRSxLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztZQUN4RixLQUFLLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDO1NBQzlDLENBQUMsQ0FDSDtLQUNGLENBQUM7Q0FDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge1xuICBhbmltYXRlLFxuICBzdGF0ZSxcbiAgc3R5bGUsXG4gIHRyYW5zaXRpb24sXG4gIHRyaWdnZXIsXG4gIEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSxcbiAgcXVlcnksXG4gIGFuaW1hdGVDaGlsZCxcbiAgZ3JvdXAsXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG4vKipcbiAqIEFuaW1hdGlvbnMgdXNlZCBieSBNYXREaWFsb2cuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBjb25zdCBtYXREaWFsb2dBbmltYXRpb25zOiB7XG4gIHJlYWRvbmx5IGRpYWxvZ0NvbnRhaW5lcjogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhO1xufSA9IHtcbiAgLyoqIEFuaW1hdGlvbiB0aGF0IGlzIGFwcGxpZWQgb24gdGhlIGRpYWxvZyBjb250YWluZXIgYnkgZGVmYXVsdC4gKi9cbiAgZGlhbG9nQ29udGFpbmVyOiB0cmlnZ2VyKCdkaWFsb2dDb250YWluZXInLCBbXG4gICAgLy8gTm90ZTogVGhlIGBlbnRlcmAgYW5pbWF0aW9uIHRyYW5zaXRpb25zIHRvIGB0cmFuc2Zvcm06IG5vbmVgLCBiZWNhdXNlIGZvciBzb21lIHJlYXNvblxuICAgIC8vIHNwZWNpZnlpbmcgdGhlIHRyYW5zZm9ybSBleHBsaWNpdGx5LCBjYXVzZXMgSUUgYm90aCB0byBibHVyIHRoZSBkaWFsb2cgY29udGVudCBhbmRcbiAgICAvLyBkZWNpbWF0ZSB0aGUgYW5pbWF0aW9uIHBlcmZvcm1hbmNlLiBMZWF2aW5nIGl0IGFzIGBub25lYCBzb2x2ZXMgYm90aCBpc3N1ZXMuXG4gICAgc3RhdGUoJ3ZvaWQsIGV4aXQnLCBzdHlsZSh7b3BhY2l0eTogMCwgdHJhbnNmb3JtOiAnc2NhbGUoMC43KSd9KSksXG4gICAgc3RhdGUoJ2VudGVyJywgc3R5bGUoe3RyYW5zZm9ybTogJ25vbmUnfSkpLFxuICAgIHRyYW5zaXRpb24oXG4gICAgICAnKiA9PiBlbnRlcicsXG4gICAgICBncm91cChbXG4gICAgICAgIGFuaW1hdGUoXG4gICAgICAgICAgJ3t7ZW50ZXJBbmltYXRpb25EdXJhdGlvbn19IGN1YmljLWJlemllcigwLCAwLCAwLjIsIDEpJyxcbiAgICAgICAgICBzdHlsZSh7dHJhbnNmb3JtOiAnbm9uZScsIG9wYWNpdHk6IDF9KSxcbiAgICAgICAgKSxcbiAgICAgICAgcXVlcnkoJ0AqJywgYW5pbWF0ZUNoaWxkKCksIHtvcHRpb25hbDogdHJ1ZX0pLFxuICAgICAgXSksXG4gICAgKSxcbiAgICB0cmFuc2l0aW9uKFxuICAgICAgJyogPT4gdm9pZCwgKiA9PiBleGl0JyxcbiAgICAgIGdyb3VwKFtcbiAgICAgICAgYW5pbWF0ZSgne3tleGl0QW5pbWF0aW9uRHVyYXRpb259fSBjdWJpYy1iZXppZXIoMC40LCAwLjAsIDAuMiwgMSknLCBzdHlsZSh7b3BhY2l0eTogMH0pKSxcbiAgICAgICAgcXVlcnkoJ0AqJywgYW5pbWF0ZUNoaWxkKCksIHtvcHRpb25hbDogdHJ1ZX0pLFxuICAgICAgXSksXG4gICAgKSxcbiAgXSksXG59O1xuIl19