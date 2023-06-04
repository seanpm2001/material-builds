/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ContentContainerComponentHarness, HarnessPredicate, parallel, } from '@angular/cdk/testing';
import { MatFooterRowHarness, MatHeaderRowHarness, MatRowHarness, } from './row-harness';
export class _MatTableHarnessBase extends ContentContainerComponentHarness {
    /** Gets all of the header rows in a table. */
    async getHeaderRows(filter = {}) {
        return this.locatorForAll(this._headerRowHarness.with(filter))();
    }
    /** Gets all of the regular data rows in a table. */
    async getRows(filter = {}) {
        return this.locatorForAll(this._rowHarness.with(filter))();
    }
    /** Gets all of the footer rows in a table. */
    async getFooterRows(filter = {}) {
        return this.locatorForAll(this._footerRowHarness.with(filter))();
    }
    /** Gets the text inside the entire table organized by rows. */
    async getCellTextByIndex() {
        const rows = await this.getRows();
        return parallel(() => rows.map(row => row.getCellTextByIndex()));
    }
    /** Gets the text inside the entire table organized by columns. */
    async getCellTextByColumnName() {
        const [headerRows, footerRows, dataRows] = await parallel(() => [
            this.getHeaderRows(),
            this.getFooterRows(),
            this.getRows(),
        ]);
        const text = {};
        const [headerData, footerData, rowsData] = await parallel(() => [
            parallel(() => headerRows.map(row => row.getCellTextByColumnName())),
            parallel(() => footerRows.map(row => row.getCellTextByColumnName())),
            parallel(() => dataRows.map(row => row.getCellTextByColumnName())),
        ]);
        rowsData.forEach(data => {
            Object.keys(data).forEach(columnName => {
                const cellText = data[columnName];
                if (!text[columnName]) {
                    text[columnName] = {
                        headerText: getCellTextsByColumn(headerData, columnName),
                        footerText: getCellTextsByColumn(footerData, columnName),
                        text: [],
                    };
                }
                text[columnName].text.push(cellText);
            });
        });
        return text;
    }
}
/** Harness for interacting with an MDC-based mat-table in tests. */
export class MatTableHarness extends _MatTableHarnessBase {
    constructor() {
        super(...arguments);
        this._headerRowHarness = MatHeaderRowHarness;
        this._rowHarness = MatRowHarness;
        this._footerRowHarness = MatFooterRowHarness;
    }
    /** The selector for the host element of a `MatTableHarness` instance. */
    static { this.hostSelector = '.mat-mdc-table'; }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a table with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(this, options);
    }
}
/** Extracts the text of cells only under a particular column. */
function getCellTextsByColumn(rowsData, column) {
    const columnTexts = [];
    rowsData.forEach(data => {
        Object.keys(data).forEach(columnName => {
            if (columnName === column) {
                columnTexts.push(data[columnName]);
            }
        });
    });
    return columnTexts;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtaGFybmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tYXRlcmlhbC90YWJsZS90ZXN0aW5nL3RhYmxlLWhhcm5lc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUdMLGdDQUFnQyxFQUNoQyxnQkFBZ0IsRUFDaEIsUUFBUSxHQUNULE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUNMLG1CQUFtQixFQUNuQixtQkFBbUIsRUFDbkIsYUFBYSxHQUVkLE1BQU0sZUFBZSxDQUFDO0FBaUJ2QixNQUFNLE9BQWdCLG9CQWFwQixTQUFRLGdDQUF3QztJQUtoRCw4Q0FBOEM7SUFDOUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxTQUE0QixFQUFFO1FBQ2hELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNuRSxDQUFDO0lBRUQsb0RBQW9EO0lBQ3BELEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBNEIsRUFBRTtRQUMxQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzdELENBQUM7SUFFRCw4Q0FBOEM7SUFDOUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxTQUE0QixFQUFFO1FBQ2hELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNuRSxDQUFDO0lBRUQsK0RBQStEO0lBQy9ELEtBQUssQ0FBQyxrQkFBa0I7UUFDdEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbEMsT0FBTyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsa0VBQWtFO0lBQ2xFLEtBQUssQ0FBQyx1QkFBdUI7UUFDM0IsTUFBTSxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLEdBQUcsTUFBTSxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDOUQsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNwQixJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxPQUFPLEVBQUU7U0FDZixDQUFDLENBQUM7UUFFSCxNQUFNLElBQUksR0FBK0IsRUFBRSxDQUFDO1FBQzVDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxHQUFHLE1BQU0sUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQzlELFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLENBQUMsQ0FBQztZQUNwRSxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUM7WUFDcEUsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDO1NBQ25FLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQ3JDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFFbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtvQkFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHO3dCQUNqQixVQUFVLEVBQUUsb0JBQW9CLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQzt3QkFDeEQsVUFBVSxFQUFFLG9CQUFvQixDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUM7d0JBQ3hELElBQUksRUFBRSxFQUFFO3FCQUNULENBQUM7aUJBQ0g7Z0JBRUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdkMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUNGO0FBRUQsb0VBQW9FO0FBQ3BFLE1BQU0sT0FBTyxlQUFnQixTQUFRLG9CQU9wQztJQVBEOztRQVVZLHNCQUFpQixHQUFHLG1CQUFtQixDQUFDO1FBQ3hDLGdCQUFXLEdBQUcsYUFBYSxDQUFDO1FBQzVCLHNCQUFpQixHQUFHLG1CQUFtQixDQUFDO0lBYXBELENBQUM7SUFqQkMseUVBQXlFO2FBQ2xFLGlCQUFZLEdBQUcsZ0JBQWdCLEFBQW5CLENBQW9CO0lBS3ZDOzs7O09BSUc7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUVULFVBQStCLEVBQUU7UUFFakMsT0FBTyxJQUFJLGdCQUFnQixDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM3QyxDQUFDOztBQUdILGlFQUFpRTtBQUNqRSxTQUFTLG9CQUFvQixDQUFDLFFBQW9DLEVBQUUsTUFBYztJQUNoRixNQUFNLFdBQVcsR0FBYSxFQUFFLENBQUM7SUFFakMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNyQyxJQUFJLFVBQVUsS0FBSyxNQUFNLEVBQUU7Z0JBQ3pCLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7YUFDcEM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxXQUFXLENBQUM7QUFDckIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBDb21wb25lbnRIYXJuZXNzLFxuICBDb21wb25lbnRIYXJuZXNzQ29uc3RydWN0b3IsXG4gIENvbnRlbnRDb250YWluZXJDb21wb25lbnRIYXJuZXNzLFxuICBIYXJuZXNzUHJlZGljYXRlLFxuICBwYXJhbGxlbCxcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Rlc3RpbmcnO1xuaW1wb3J0IHtcbiAgTWF0Rm9vdGVyUm93SGFybmVzcyxcbiAgTWF0SGVhZGVyUm93SGFybmVzcyxcbiAgTWF0Um93SGFybmVzcyxcbiAgTWF0Um93SGFybmVzc0NvbHVtbnNUZXh0LFxufSBmcm9tICcuL3Jvdy1oYXJuZXNzJztcbmltcG9ydCB7Um93SGFybmVzc0ZpbHRlcnMsIFRhYmxlSGFybmVzc0ZpbHRlcnN9IGZyb20gJy4vdGFibGUtaGFybmVzcy1maWx0ZXJzJztcblxuLyoqIFRleHQgZXh0cmFjdGVkIGZyb20gYSB0YWJsZSBvcmdhbml6ZWQgYnkgY29sdW1ucy4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWF0VGFibGVIYXJuZXNzQ29sdW1uc1RleHQge1xuICBbY29sdW1uTmFtZTogc3RyaW5nXToge1xuICAgIHRleHQ6IHN0cmluZ1tdO1xuICAgIGhlYWRlclRleHQ6IHN0cmluZ1tdO1xuICAgIGZvb3RlclRleHQ6IHN0cmluZ1tdO1xuICB9O1xufVxuXG5pbnRlcmZhY2UgUm93QmFzZSBleHRlbmRzIENvbXBvbmVudEhhcm5lc3Mge1xuICBnZXRDZWxsVGV4dEJ5Q29sdW1uTmFtZSgpOiBQcm9taXNlPE1hdFJvd0hhcm5lc3NDb2x1bW5zVGV4dD47XG4gIGdldENlbGxUZXh0QnlJbmRleCgpOiBQcm9taXNlPHN0cmluZ1tdPjtcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIF9NYXRUYWJsZUhhcm5lc3NCYXNlPFxuICBIZWFkZXJSb3dUeXBlIGV4dGVuZHMgQ29tcG9uZW50SGFybmVzc0NvbnN0cnVjdG9yPEhlYWRlclJvdz4gJiB7XG4gICAgd2l0aDogKG9wdGlvbnM/OiBSb3dIYXJuZXNzRmlsdGVycykgPT4gSGFybmVzc1ByZWRpY2F0ZTxIZWFkZXJSb3c+O1xuICB9LFxuICBIZWFkZXJSb3cgZXh0ZW5kcyBSb3dCYXNlLFxuICBSb3dUeXBlIGV4dGVuZHMgQ29tcG9uZW50SGFybmVzc0NvbnN0cnVjdG9yPFJvdz4gJiB7XG4gICAgd2l0aDogKG9wdGlvbnM/OiBSb3dIYXJuZXNzRmlsdGVycykgPT4gSGFybmVzc1ByZWRpY2F0ZTxSb3c+O1xuICB9LFxuICBSb3cgZXh0ZW5kcyBSb3dCYXNlLFxuICBGb290ZXJSb3dUeXBlIGV4dGVuZHMgQ29tcG9uZW50SGFybmVzc0NvbnN0cnVjdG9yPEZvb3RlclJvdz4gJiB7XG4gICAgd2l0aDogKG9wdGlvbnM/OiBSb3dIYXJuZXNzRmlsdGVycykgPT4gSGFybmVzc1ByZWRpY2F0ZTxGb290ZXJSb3c+O1xuICB9LFxuICBGb290ZXJSb3cgZXh0ZW5kcyBSb3dCYXNlLFxuPiBleHRlbmRzIENvbnRlbnRDb250YWluZXJDb21wb25lbnRIYXJuZXNzPHN0cmluZz4ge1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgX2hlYWRlclJvd0hhcm5lc3M6IEhlYWRlclJvd1R5cGU7XG4gIHByb3RlY3RlZCBhYnN0cmFjdCBfcm93SGFybmVzczogUm93VHlwZTtcbiAgcHJvdGVjdGVkIGFic3RyYWN0IF9mb290ZXJSb3dIYXJuZXNzOiBGb290ZXJSb3dUeXBlO1xuXG4gIC8qKiBHZXRzIGFsbCBvZiB0aGUgaGVhZGVyIHJvd3MgaW4gYSB0YWJsZS4gKi9cbiAgYXN5bmMgZ2V0SGVhZGVyUm93cyhmaWx0ZXI6IFJvd0hhcm5lc3NGaWx0ZXJzID0ge30pOiBQcm9taXNlPEhlYWRlclJvd1tdPiB7XG4gICAgcmV0dXJuIHRoaXMubG9jYXRvckZvckFsbCh0aGlzLl9oZWFkZXJSb3dIYXJuZXNzLndpdGgoZmlsdGVyKSkoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIGFsbCBvZiB0aGUgcmVndWxhciBkYXRhIHJvd3MgaW4gYSB0YWJsZS4gKi9cbiAgYXN5bmMgZ2V0Um93cyhmaWx0ZXI6IFJvd0hhcm5lc3NGaWx0ZXJzID0ge30pOiBQcm9taXNlPFJvd1tdPiB7XG4gICAgcmV0dXJuIHRoaXMubG9jYXRvckZvckFsbCh0aGlzLl9yb3dIYXJuZXNzLndpdGgoZmlsdGVyKSkoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIGFsbCBvZiB0aGUgZm9vdGVyIHJvd3MgaW4gYSB0YWJsZS4gKi9cbiAgYXN5bmMgZ2V0Rm9vdGVyUm93cyhmaWx0ZXI6IFJvd0hhcm5lc3NGaWx0ZXJzID0ge30pOiBQcm9taXNlPEZvb3RlclJvd1tdPiB7XG4gICAgcmV0dXJuIHRoaXMubG9jYXRvckZvckFsbCh0aGlzLl9mb290ZXJSb3dIYXJuZXNzLndpdGgoZmlsdGVyKSkoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSB0ZXh0IGluc2lkZSB0aGUgZW50aXJlIHRhYmxlIG9yZ2FuaXplZCBieSByb3dzLiAqL1xuICBhc3luYyBnZXRDZWxsVGV4dEJ5SW5kZXgoKTogUHJvbWlzZTxzdHJpbmdbXVtdPiB7XG4gICAgY29uc3Qgcm93cyA9IGF3YWl0IHRoaXMuZ2V0Um93cygpO1xuICAgIHJldHVybiBwYXJhbGxlbCgoKSA9PiByb3dzLm1hcChyb3cgPT4gcm93LmdldENlbGxUZXh0QnlJbmRleCgpKSk7XG4gIH1cblxuICAvKiogR2V0cyB0aGUgdGV4dCBpbnNpZGUgdGhlIGVudGlyZSB0YWJsZSBvcmdhbml6ZWQgYnkgY29sdW1ucy4gKi9cbiAgYXN5bmMgZ2V0Q2VsbFRleHRCeUNvbHVtbk5hbWUoKTogUHJvbWlzZTxNYXRUYWJsZUhhcm5lc3NDb2x1bW5zVGV4dD4ge1xuICAgIGNvbnN0IFtoZWFkZXJSb3dzLCBmb290ZXJSb3dzLCBkYXRhUm93c10gPSBhd2FpdCBwYXJhbGxlbCgoKSA9PiBbXG4gICAgICB0aGlzLmdldEhlYWRlclJvd3MoKSxcbiAgICAgIHRoaXMuZ2V0Rm9vdGVyUm93cygpLFxuICAgICAgdGhpcy5nZXRSb3dzKCksXG4gICAgXSk7XG5cbiAgICBjb25zdCB0ZXh0OiBNYXRUYWJsZUhhcm5lc3NDb2x1bW5zVGV4dCA9IHt9O1xuICAgIGNvbnN0IFtoZWFkZXJEYXRhLCBmb290ZXJEYXRhLCByb3dzRGF0YV0gPSBhd2FpdCBwYXJhbGxlbCgoKSA9PiBbXG4gICAgICBwYXJhbGxlbCgoKSA9PiBoZWFkZXJSb3dzLm1hcChyb3cgPT4gcm93LmdldENlbGxUZXh0QnlDb2x1bW5OYW1lKCkpKSxcbiAgICAgIHBhcmFsbGVsKCgpID0+IGZvb3RlclJvd3MubWFwKHJvdyA9PiByb3cuZ2V0Q2VsbFRleHRCeUNvbHVtbk5hbWUoKSkpLFxuICAgICAgcGFyYWxsZWwoKCkgPT4gZGF0YVJvd3MubWFwKHJvdyA9PiByb3cuZ2V0Q2VsbFRleHRCeUNvbHVtbk5hbWUoKSkpLFxuICAgIF0pO1xuXG4gICAgcm93c0RhdGEuZm9yRWFjaChkYXRhID0+IHtcbiAgICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goY29sdW1uTmFtZSA9PiB7XG4gICAgICAgIGNvbnN0IGNlbGxUZXh0ID0gZGF0YVtjb2x1bW5OYW1lXTtcblxuICAgICAgICBpZiAoIXRleHRbY29sdW1uTmFtZV0pIHtcbiAgICAgICAgICB0ZXh0W2NvbHVtbk5hbWVdID0ge1xuICAgICAgICAgICAgaGVhZGVyVGV4dDogZ2V0Q2VsbFRleHRzQnlDb2x1bW4oaGVhZGVyRGF0YSwgY29sdW1uTmFtZSksXG4gICAgICAgICAgICBmb290ZXJUZXh0OiBnZXRDZWxsVGV4dHNCeUNvbHVtbihmb290ZXJEYXRhLCBjb2x1bW5OYW1lKSxcbiAgICAgICAgICAgIHRleHQ6IFtdLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICB0ZXh0W2NvbHVtbk5hbWVdLnRleHQucHVzaChjZWxsVGV4dCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0ZXh0O1xuICB9XG59XG5cbi8qKiBIYXJuZXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIGFuIE1EQy1iYXNlZCBtYXQtdGFibGUgaW4gdGVzdHMuICovXG5leHBvcnQgY2xhc3MgTWF0VGFibGVIYXJuZXNzIGV4dGVuZHMgX01hdFRhYmxlSGFybmVzc0Jhc2U8XG4gIHR5cGVvZiBNYXRIZWFkZXJSb3dIYXJuZXNzLFxuICBNYXRIZWFkZXJSb3dIYXJuZXNzLFxuICB0eXBlb2YgTWF0Um93SGFybmVzcyxcbiAgTWF0Um93SGFybmVzcyxcbiAgdHlwZW9mIE1hdEZvb3RlclJvd0hhcm5lc3MsXG4gIE1hdEZvb3RlclJvd0hhcm5lc3Ncbj4ge1xuICAvKiogVGhlIHNlbGVjdG9yIGZvciB0aGUgaG9zdCBlbGVtZW50IG9mIGEgYE1hdFRhYmxlSGFybmVzc2AgaW5zdGFuY2UuICovXG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPSAnLm1hdC1tZGMtdGFibGUnO1xuICBwcm90ZWN0ZWQgX2hlYWRlclJvd0hhcm5lc3MgPSBNYXRIZWFkZXJSb3dIYXJuZXNzO1xuICBwcm90ZWN0ZWQgX3Jvd0hhcm5lc3MgPSBNYXRSb3dIYXJuZXNzO1xuICBwcm90ZWN0ZWQgX2Zvb3RlclJvd0hhcm5lc3MgPSBNYXRGb290ZXJSb3dIYXJuZXNzO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgYEhhcm5lc3NQcmVkaWNhdGVgIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvciBhIHRhYmxlIHdpdGggc3BlY2lmaWMgYXR0cmlidXRlcy5cbiAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgbmFycm93aW5nIHRoZSBzZWFyY2hcbiAgICogQHJldHVybiBhIGBIYXJuZXNzUHJlZGljYXRlYCBjb25maWd1cmVkIHdpdGggdGhlIGdpdmVuIG9wdGlvbnMuXG4gICAqL1xuICBzdGF0aWMgd2l0aDxUIGV4dGVuZHMgTWF0VGFibGVIYXJuZXNzPihcbiAgICB0aGlzOiBDb21wb25lbnRIYXJuZXNzQ29uc3RydWN0b3I8VD4sXG4gICAgb3B0aW9uczogVGFibGVIYXJuZXNzRmlsdGVycyA9IHt9LFxuICApOiBIYXJuZXNzUHJlZGljYXRlPFQ+IHtcbiAgICByZXR1cm4gbmV3IEhhcm5lc3NQcmVkaWNhdGUodGhpcywgb3B0aW9ucyk7XG4gIH1cbn1cblxuLyoqIEV4dHJhY3RzIHRoZSB0ZXh0IG9mIGNlbGxzIG9ubHkgdW5kZXIgYSBwYXJ0aWN1bGFyIGNvbHVtbi4gKi9cbmZ1bmN0aW9uIGdldENlbGxUZXh0c0J5Q29sdW1uKHJvd3NEYXRhOiBNYXRSb3dIYXJuZXNzQ29sdW1uc1RleHRbXSwgY29sdW1uOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gIGNvbnN0IGNvbHVtblRleHRzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIHJvd3NEYXRhLmZvckVhY2goZGF0YSA9PiB7XG4gICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaChjb2x1bW5OYW1lID0+IHtcbiAgICAgIGlmIChjb2x1bW5OYW1lID09PSBjb2x1bW4pIHtcbiAgICAgICAgY29sdW1uVGV4dHMucHVzaChkYXRhW2NvbHVtbk5hbWVdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNvbHVtblRleHRzO1xufVxuIl19