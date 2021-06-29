"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeElementFromHtml = void 0;
/**
 * Removes the specified element. Additionally, preceding whitespace will be removed
 * to not leave empty lines in the resulting HTML.
 */
function removeElementFromHtml(element, recorder) {
    // sourceCodeLocation is always set since we parse with location info enabled.
    const { startOffset, endOffset } = element.sourceCodeLocation;
    const parentIndex = element.parentNode.childNodes.indexOf(element);
    const precedingTextSibling = element.parentNode.childNodes.find((f, i) => f.nodeName === '#text' && i === parentIndex - 1);
    recorder.remove(startOffset, endOffset - startOffset);
    // If we found a preceding text node which just consists of whitespace, remove it.
    if (precedingTextSibling && /^\s+$/.test(precedingTextSibling.value)) {
        const textSiblingLocation = precedingTextSibling.sourceCodeLocation;
        recorder.remove(textSiblingLocation.startOffset, textSiblingLocation.endOffset - textSiblingLocation.startOffset);
    }
}
exports.removeElementFromHtml = removeElementFromHtml;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3ZlLWVsZW1lbnQtZnJvbS1odG1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21hdGVyaWFsL3NjaGVtYXRpY3MvbmctdXBkYXRlL21pZ3JhdGlvbnMvaGFtbWVyLWdlc3R1cmVzLXY5L3JlbW92ZS1lbGVtZW50LWZyb20taHRtbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOzs7QUFLSDs7O0dBR0c7QUFDSCxTQUFnQixxQkFBcUIsQ0FBQyxPQUF1QixFQUFFLFFBQXdCO0lBQ3JGLDhFQUE4RTtJQUM5RSxNQUFNLEVBQUMsV0FBVyxFQUFFLFNBQVMsRUFBQyxHQUFHLE9BQU8sQ0FBQyxrQkFBbUIsQ0FBQztJQUM3RCxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkUsTUFBTSxvQkFBb0IsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQzNELENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBd0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEtBQUssT0FBTyxJQUFJLENBQUMsS0FBSyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFFckYsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsU0FBUyxHQUFHLFdBQVcsQ0FBQyxDQUFDO0lBRXRELGtGQUFrRjtJQUNsRixJQUFJLG9CQUFvQixJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDcEUsTUFBTSxtQkFBbUIsR0FBRyxvQkFBb0IsQ0FBQyxrQkFBbUIsQ0FBQztRQUNyRSxRQUFRLENBQUMsTUFBTSxDQUNYLG1CQUFtQixDQUFDLFdBQVcsRUFDL0IsbUJBQW1CLENBQUMsU0FBUyxHQUFHLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQ3RFO0FBQ0gsQ0FBQztBQWhCRCxzREFnQkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtVcGRhdGVSZWNvcmRlcn0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuaW1wb3J0IHtwYXJzZTV9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY2hlbWF0aWNzJztcblxuLyoqXG4gKiBSZW1vdmVzIHRoZSBzcGVjaWZpZWQgZWxlbWVudC4gQWRkaXRpb25hbGx5LCBwcmVjZWRpbmcgd2hpdGVzcGFjZSB3aWxsIGJlIHJlbW92ZWRcbiAqIHRvIG5vdCBsZWF2ZSBlbXB0eSBsaW5lcyBpbiB0aGUgcmVzdWx0aW5nIEhUTUwuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVFbGVtZW50RnJvbUh0bWwoZWxlbWVudDogcGFyc2U1LkVsZW1lbnQsIHJlY29yZGVyOiBVcGRhdGVSZWNvcmRlcikge1xuICAvLyBzb3VyY2VDb2RlTG9jYXRpb24gaXMgYWx3YXlzIHNldCBzaW5jZSB3ZSBwYXJzZSB3aXRoIGxvY2F0aW9uIGluZm8gZW5hYmxlZC5cbiAgY29uc3Qge3N0YXJ0T2Zmc2V0LCBlbmRPZmZzZXR9ID0gZWxlbWVudC5zb3VyY2VDb2RlTG9jYXRpb24hO1xuICBjb25zdCBwYXJlbnRJbmRleCA9IGVsZW1lbnQucGFyZW50Tm9kZS5jaGlsZE5vZGVzLmluZGV4T2YoZWxlbWVudCk7XG4gIGNvbnN0IHByZWNlZGluZ1RleHRTaWJsaW5nID0gZWxlbWVudC5wYXJlbnROb2RlLmNoaWxkTm9kZXMuZmluZChcbiAgICAgIChmLCBpKTogZiBpcyBwYXJzZTUuVGV4dE5vZGUgPT4gZi5ub2RlTmFtZSA9PT0gJyN0ZXh0JyAmJiBpID09PSBwYXJlbnRJbmRleCAtIDEpO1xuXG4gIHJlY29yZGVyLnJlbW92ZShzdGFydE9mZnNldCwgZW5kT2Zmc2V0IC0gc3RhcnRPZmZzZXQpO1xuXG4gIC8vIElmIHdlIGZvdW5kIGEgcHJlY2VkaW5nIHRleHQgbm9kZSB3aGljaCBqdXN0IGNvbnNpc3RzIG9mIHdoaXRlc3BhY2UsIHJlbW92ZSBpdC5cbiAgaWYgKHByZWNlZGluZ1RleHRTaWJsaW5nICYmIC9eXFxzKyQvLnRlc3QocHJlY2VkaW5nVGV4dFNpYmxpbmcudmFsdWUpKSB7XG4gICAgY29uc3QgdGV4dFNpYmxpbmdMb2NhdGlvbiA9IHByZWNlZGluZ1RleHRTaWJsaW5nLnNvdXJjZUNvZGVMb2NhdGlvbiE7XG4gICAgcmVjb3JkZXIucmVtb3ZlKFxuICAgICAgICB0ZXh0U2libGluZ0xvY2F0aW9uLnN0YXJ0T2Zmc2V0LFxuICAgICAgICB0ZXh0U2libGluZ0xvY2F0aW9uLmVuZE9mZnNldCAtIHRleHRTaWJsaW5nTG9jYXRpb24uc3RhcnRPZmZzZXQpO1xuICB9XG59XG4iXX0=