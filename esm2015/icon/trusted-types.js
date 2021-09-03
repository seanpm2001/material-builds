/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * The Trusted Types policy, or null if Trusted Types are not
 * enabled/supported, or undefined if the policy has not been created yet.
 */
let policy;
/**
 * Returns the Trusted Types policy, or null if Trusted Types are not
 * enabled/supported. The first call to this function will create the policy.
 */
function getPolicy() {
    if (policy === undefined) {
        policy = null;
        if (typeof window !== 'undefined') {
            const ttWindow = window;
            if (ttWindow.trustedTypes !== undefined) {
                policy = ttWindow.trustedTypes.createPolicy('angular#components', {
                    createHTML: (s) => s,
                });
            }
        }
    }
    return policy;
}
/**
 * Unsafely promote a string to a TrustedHTML, falling back to strings when
 * Trusted Types are not available.
 * @security This is a security-sensitive function; any use of this function
 * must go through security review. In particular, it must be assured that the
 * provided string will never cause an XSS vulnerability if used in a context
 * that will be interpreted as HTML by a browser, e.g. when assigning to
 * element.innerHTML.
 */
export function trustedHTMLFromString(html) {
    var _a;
    return ((_a = getPolicy()) === null || _a === void 0 ? void 0 : _a.createHTML(html)) || html;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJ1c3RlZC10eXBlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC9pY29uL3RydXN0ZWQtdHlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBMEJIOzs7R0FHRztBQUNILElBQUksTUFBd0MsQ0FBQztBQUU3Qzs7O0dBR0c7QUFDSCxTQUFTLFNBQVM7SUFDaEIsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO1FBQ3hCLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDZCxJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRTtZQUNqQyxNQUFNLFFBQVEsR0FBRyxNQUE4RCxDQUFDO1lBQ2hGLElBQUksUUFBUSxDQUFDLFlBQVksS0FBSyxTQUFTLEVBQUU7Z0JBQ3ZDLE1BQU0sR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsRUFBRTtvQkFDaEUsVUFBVSxFQUFFLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUM3QixDQUFDLENBQUM7YUFDSjtTQUNGO0tBQ0Y7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRUQ7Ozs7Ozs7O0dBUUc7QUFDSCxNQUFNLFVBQVUscUJBQXFCLENBQUMsSUFBWTs7SUFDaEQsT0FBTyxDQUFBLE1BQUEsU0FBUyxFQUFFLDBDQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSSxJQUE4QixDQUFDO0FBQ3pFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuLyoqXG4gKiBAZmlsZW92ZXJ2aWV3XG4gKiBBIG1vZHVsZSB0byBmYWNpbGl0YXRlIHVzZSBvZiBhIFRydXN0ZWQgVHlwZXMgcG9saWN5IGludGVybmFsbHkgd2l0aGluXG4gKiBBbmd1bGFyIE1hdGVyaWFsLiBJdCBsYXppbHkgY29uc3RydWN0cyB0aGUgVHJ1c3RlZCBUeXBlcyBwb2xpY3ksIHByb3ZpZGluZ1xuICogaGVscGVyIHV0aWxpdGllcyBmb3IgcHJvbW90aW5nIHN0cmluZ3MgdG8gVHJ1c3RlZCBUeXBlcy4gV2hlbiBUcnVzdGVkIFR5cGVzXG4gKiBhcmUgbm90IGF2YWlsYWJsZSwgc3RyaW5ncyBhcmUgdXNlZCBhcyBhIGZhbGxiYWNrLlxuICogQHNlY3VyaXR5IEFsbCB1c2Ugb2YgdGhpcyBtb2R1bGUgaXMgc2VjdXJpdHktc2Vuc2l0aXZlIGFuZCBzaG91bGQgZ28gdGhyb3VnaFxuICogc2VjdXJpdHkgcmV2aWV3LlxuICovXG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBUcnVzdGVkSFRNTCB7XG4gIF9fYnJhbmRfXzogJ1RydXN0ZWRIVE1MJztcbn1cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIFRydXN0ZWRUeXBlUG9saWN5RmFjdG9yeSB7XG4gIGNyZWF0ZVBvbGljeShwb2xpY3lOYW1lOiBzdHJpbmcsIHBvbGljeU9wdGlvbnM6IHtcbiAgICBjcmVhdGVIVE1MPzogKGlucHV0OiBzdHJpbmcpID0+IHN0cmluZyxcbiAgfSk6IFRydXN0ZWRUeXBlUG9saWN5O1xufVxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgVHJ1c3RlZFR5cGVQb2xpY3kge1xuICBjcmVhdGVIVE1MKGlucHV0OiBzdHJpbmcpOiBUcnVzdGVkSFRNTDtcbn1cblxuLyoqXG4gKiBUaGUgVHJ1c3RlZCBUeXBlcyBwb2xpY3ksIG9yIG51bGwgaWYgVHJ1c3RlZCBUeXBlcyBhcmUgbm90XG4gKiBlbmFibGVkL3N1cHBvcnRlZCwgb3IgdW5kZWZpbmVkIGlmIHRoZSBwb2xpY3kgaGFzIG5vdCBiZWVuIGNyZWF0ZWQgeWV0LlxuICovXG5sZXQgcG9saWN5OiBUcnVzdGVkVHlwZVBvbGljeXxudWxsfHVuZGVmaW5lZDtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBUcnVzdGVkIFR5cGVzIHBvbGljeSwgb3IgbnVsbCBpZiBUcnVzdGVkIFR5cGVzIGFyZSBub3RcbiAqIGVuYWJsZWQvc3VwcG9ydGVkLiBUaGUgZmlyc3QgY2FsbCB0byB0aGlzIGZ1bmN0aW9uIHdpbGwgY3JlYXRlIHRoZSBwb2xpY3kuXG4gKi9cbmZ1bmN0aW9uIGdldFBvbGljeSgpOiBUcnVzdGVkVHlwZVBvbGljeXxudWxsIHtcbiAgaWYgKHBvbGljeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcG9saWN5ID0gbnVsbDtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnN0IHR0V2luZG93ID0gd2luZG93IGFzIHVua25vd24gYXMge3RydXN0ZWRUeXBlcz86IFRydXN0ZWRUeXBlUG9saWN5RmFjdG9yeX07XG4gICAgICBpZiAodHRXaW5kb3cudHJ1c3RlZFR5cGVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcG9saWN5ID0gdHRXaW5kb3cudHJ1c3RlZFR5cGVzLmNyZWF0ZVBvbGljeSgnYW5ndWxhciNjb21wb25lbnRzJywge1xuICAgICAgICAgIGNyZWF0ZUhUTUw6IChzOiBzdHJpbmcpID0+IHMsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcG9saWN5O1xufVxuXG4vKipcbiAqIFVuc2FmZWx5IHByb21vdGUgYSBzdHJpbmcgdG8gYSBUcnVzdGVkSFRNTCwgZmFsbGluZyBiYWNrIHRvIHN0cmluZ3Mgd2hlblxuICogVHJ1c3RlZCBUeXBlcyBhcmUgbm90IGF2YWlsYWJsZS5cbiAqIEBzZWN1cml0eSBUaGlzIGlzIGEgc2VjdXJpdHktc2Vuc2l0aXZlIGZ1bmN0aW9uOyBhbnkgdXNlIG9mIHRoaXMgZnVuY3Rpb25cbiAqIG11c3QgZ28gdGhyb3VnaCBzZWN1cml0eSByZXZpZXcuIEluIHBhcnRpY3VsYXIsIGl0IG11c3QgYmUgYXNzdXJlZCB0aGF0IHRoZVxuICogcHJvdmlkZWQgc3RyaW5nIHdpbGwgbmV2ZXIgY2F1c2UgYW4gWFNTIHZ1bG5lcmFiaWxpdHkgaWYgdXNlZCBpbiBhIGNvbnRleHRcbiAqIHRoYXQgd2lsbCBiZSBpbnRlcnByZXRlZCBhcyBIVE1MIGJ5IGEgYnJvd3NlciwgZS5nLiB3aGVuIGFzc2lnbmluZyB0b1xuICogZWxlbWVudC5pbm5lckhUTUwuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cnVzdGVkSFRNTEZyb21TdHJpbmcoaHRtbDogc3RyaW5nKTogVHJ1c3RlZEhUTUwge1xuICByZXR1cm4gZ2V0UG9saWN5KCk/LmNyZWF0ZUhUTUwoaHRtbCkgfHwgaHRtbCBhcyB1bmtub3duIGFzIFRydXN0ZWRIVE1MO1xufVxuIl19