import { AfterContentInit } from '@angular/core';
import { CdkNestedTreeNode } from '@angular/cdk/tree';
import { CdkTree } from '@angular/cdk/tree';
import { CdkTreeNode } from '@angular/cdk/tree';
import { CdkTreeNodeDef } from '@angular/cdk/tree';
import { CdkTreeNodeOutlet } from '@angular/cdk/tree';
import { CdkTreeNodePadding } from '@angular/cdk/tree';
import { CdkTreeNodeToggle } from '@angular/cdk/tree';
import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/collections';
import { ElementRef } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import * as i0 from '@angular/core';
import * as i1 from '@angular/cdk/tree';
import * as i2 from '@angular/material/core';
import { IterableDiffers } from '@angular/core';
import { Observable } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { TreeControl } from '@angular/cdk/tree';
import { ViewContainerRef } from '@angular/core';

declare namespace i3 {
    export {
        MatTreeNode,
        MatTreeNodeDef,
        MatNestedTreeNode
    }
}

declare namespace i4 {
    export {
        MatTreeNodePadding
    }
}

declare namespace i5 {
    export {
        MatTreeNodeToggle
    }
}

declare namespace i6 {
    export {
        MatTree
    }
}

declare namespace i7 {
    export {
        MatTreeNodeOutlet
    }
}

/**
 * Wrapper for the CdkTree nested node with Material design styles.
 */
export declare class MatNestedTreeNode<T, K = T> extends CdkNestedTreeNode<T, K> implements AfterContentInit, OnDestroy, OnInit {
    node: T;
    /**
     * Whether the node is disabled.
     *
     * @deprecated This is an alias for `isDisabled`.
     * @breaking-change 21.0.0 Remove this input
     */
    get disabled(): boolean;
    set disabled(value: boolean);
    /** Tabindex of the node. */
    get tabIndex(): number;
    set tabIndex(value: number);
    private _tabIndex;
    constructor(elementRef: ElementRef<HTMLElement>, tree: CdkTree<T, K>, differs: IterableDiffers, tabIndex: string);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatNestedTreeNode<any, any>, [null, null, null, { attribute: "tabindex"; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatNestedTreeNode<any, any>, "mat-nested-tree-node", ["matNestedTreeNode"], { "node": { "alias": "matNestedTreeNode"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "tabIndex": { "alias": "tabIndex"; "required": false; }; }, { "activation": "activation"; "expandedChange": "expandedChange"; }, never, never, true, never>;
    static ngAcceptInputType_disabled: unknown;
    static ngAcceptInputType_tabIndex: unknown;
}

/**
 * Wrapper for the CdkTable with Material design styles.
 */
export declare class MatTree<T, K = T> extends CdkTree<T, K> {
    _nodeOutlet: MatTreeNodeOutlet;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatTree<any, any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatTree<any, any>, "mat-tree", ["matTree"], {}, {}, never, never, true, never>;
}

/**
 * Data source for flat tree.
 * The data source need to handle expansion/collapsion of the tree node and change the data feed
 * to `MatTree`.
 * The nested tree nodes of type `T` are flattened through `MatTreeFlattener`, and converted
 * to type `F` for `MatTree` to consume.
 *
 * @deprecated Use one of levelAccessor or childrenAccessor instead. To be removed in a future
 * version.
 * @breaking-change 21.0.0
 */
export declare class MatTreeFlatDataSource<T, F, K = F> extends DataSource<F> {
    private _treeControl;
    private _treeFlattener;
    private readonly _flattenedData;
    private readonly _expandedData;
    get data(): T[];
    set data(value: T[]);
    private readonly _data;
    constructor(_treeControl: FlatTreeControl<F, K>, _treeFlattener: MatTreeFlattener<T, F, K>, initialData?: T[]);
    connect(collectionViewer: CollectionViewer): Observable<F[]>;
    disconnect(): void;
}

/**
 * Tree flattener to convert a normal type of node to node with children & level information.
 * Transform nested nodes of type `T` to flattened nodes of type `F`.
 *
 * For example, the input data of type `T` is nested, and contains its children data:
 *   SomeNode: {
 *     key: 'Fruits',
 *     children: [
 *       NodeOne: {
 *         key: 'Apple',
 *       },
 *       NodeTwo: {
 *        key: 'Pear',
 *      }
 *    ]
 *  }
 *  After flattener flatten the tree, the structure will become
 *  SomeNode: {
 *    key: 'Fruits',
 *    expandable: true,
 *    level: 1
 *  },
 *  NodeOne: {
 *    key: 'Apple',
 *    expandable: false,
 *    level: 2
 *  },
 *  NodeTwo: {
 *   key: 'Pear',
 *   expandable: false,
 *   level: 2
 * }
 * and the output flattened type is `F` with additional information.
 *
 * @deprecated Use MatTree#childrenAccessor and MatTreeNode#isExpandable
 * instead. To be removed in a future version.
 * @breaking-change 21.0.0
 */
export declare class MatTreeFlattener<T, F, K = F> {
    transformFunction: (node: T, level: number) => F;
    getLevel: (node: F) => number;
    isExpandable: (node: F) => boolean;
    getChildren: (node: T) => Observable<T[]> | T[] | undefined | null;
    constructor(transformFunction: (node: T, level: number) => F, getLevel: (node: F) => number, isExpandable: (node: F) => boolean, getChildren: (node: T) => Observable<T[]> | T[] | undefined | null);
    _flattenNode(node: T, level: number, resultNodes: F[], parentMap: boolean[]): F[];
    _flattenChildren(children: T[], level: number, resultNodes: F[], parentMap: boolean[]): void;
    /**
     * Flatten a list of node type T to flattened version of node F.
     * Please note that type T may be nested, and the length of `structuredData` may be different
     * from that of returned list `F[]`.
     */
    flattenNodes(structuredData: T[]): F[];
    /**
     * Expand flattened node with current expansion status.
     * The returned list may have different length.
     */
    expandFlattenedNodes(nodes: F[], treeControl: TreeControl<F, K>): F[];
}

export declare class MatTreeModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatTreeModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<MatTreeModule, never, [typeof i1.CdkTreeModule, typeof i2.MatCommonModule, typeof i3.MatNestedTreeNode, typeof i3.MatTreeNodeDef, typeof i4.MatTreeNodePadding, typeof i5.MatTreeNodeToggle, typeof i6.MatTree, typeof i3.MatTreeNode, typeof i7.MatTreeNodeOutlet], [typeof i2.MatCommonModule, typeof i3.MatNestedTreeNode, typeof i3.MatTreeNodeDef, typeof i4.MatTreeNodePadding, typeof i5.MatTreeNodeToggle, typeof i6.MatTree, typeof i3.MatTreeNode, typeof i7.MatTreeNodeOutlet]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<MatTreeModule>;
}

/**
 * Data source for nested tree.
 *
 * The data source for nested tree doesn't have to consider node flattener, or the way to expand
 * or collapse. The expansion/collapsion will be handled by TreeControl and each non-leaf node.
 */
export declare class MatTreeNestedDataSource<T> extends DataSource<T> {
    /**
     * Data for the nested tree
     */
    get data(): T[];
    set data(value: T[]);
    private readonly _data;
    connect(collectionViewer: CollectionViewer): Observable<T[]>;
    disconnect(): void;
}

/**
 * Wrapper for the CdkTree node with Material design styles.
 */
export declare class MatTreeNode<T, K = T> extends CdkTreeNode<T, K> implements OnInit, OnDestroy {
    /**
     * The tabindex of the tree node.
     *
     * @deprecated By default MatTreeNode manages focus using TreeKeyManager instead of tabIndex.
     *   Recommend to avoid setting tabIndex directly to prevent TreeKeyManager form getting into
     *   an unexpected state. Tabindex to be removed in a future version.
     * @breaking-change 21.0.0 Remove this attribute.
     */
    get tabIndexInputBinding(): number;
    set tabIndexInputBinding(value: number);
    private _tabIndexInputBinding;
    /**
     * The default tabindex of the tree node.
     *
     * @deprecated By default MatTreeNode manages focus using TreeKeyManager instead of tabIndex.
     *   Recommend to avoid setting tabIndex directly to prevent TreeKeyManager form getting into
     *   an unexpected state. Tabindex to be removed in a future version.
     * @breaking-change 21.0.0 Remove this attribute.
     */
    defaultTabIndex: number;
    protected _getTabindexAttribute(): number | null;
    /**
     * Whether the component is disabled.
     *
     * @deprecated This is an alias for `isDisabled`.
     * @breaking-change 21.0.0 Remove this input
     */
    get disabled(): boolean;
    set disabled(value: boolean);
    constructor(elementRef: ElementRef<HTMLElement>, tree: CdkTree<T, K>, 
    /**
     * The tabindex of the tree node.
     *
     * @deprecated By default MatTreeNode manages focus using TreeKeyManager instead of tabIndex.
     *   Recommend to avoid setting tabIndex directly to prevent TreeKeyManager form getting into
     *   an unexpected state. Tabindex to be removed in a future version.
     * @breaking-change 21.0.0 Remove this attribute.
     */
    tabIndex: string);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatTreeNode<any, any>, [null, null, { attribute: "tabindex"; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatTreeNode<any, any>, "mat-tree-node", ["matTreeNode"], { "tabIndexInputBinding": { "alias": "tabIndex"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "activation": "activation"; "expandedChange": "expandedChange"; }, never, never, true, never>;
    static ngAcceptInputType_tabIndexInputBinding: unknown;
    static ngAcceptInputType_disabled: unknown;
}

/**
 * Wrapper for the CdkTree node definition with Material design styles.
 * Captures the node's template and a when predicate that describes when this node should be used.
 */
export declare class MatTreeNodeDef<T> extends CdkTreeNodeDef<T> {
    data: T;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatTreeNodeDef<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatTreeNodeDef<any>, "[matTreeNodeDef]", never, { "when": { "alias": "matTreeNodeDefWhen"; "required": false; }; "data": { "alias": "matTreeNode"; "required": false; }; }, {}, never, never, true, never>;
}

/**
 * Outlet for nested CdkNode. Put `[matTreeNodeOutlet]` on a tag to place children dataNodes
 * inside the outlet.
 */
export declare class MatTreeNodeOutlet implements CdkTreeNodeOutlet {
    viewContainer: ViewContainerRef;
    _node?: any | undefined;
    constructor(viewContainer: ViewContainerRef, _node?: any | undefined);
    static ɵfac: i0.ɵɵFactoryDeclaration<MatTreeNodeOutlet, [null, { optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatTreeNodeOutlet, "[matTreeNodeOutlet]", never, {}, {}, never, never, true, never>;
}

/**
 * Wrapper for the CdkTree padding with Material design styles.
 */
export declare class MatTreeNodePadding<T, K = T> extends CdkTreeNodePadding<T, K> {
    /** The level of depth of the tree node. The padding will be `level * indent` pixels. */
    get level(): number;
    set level(value: number);
    /** The indent for each level. Default number 40px from material design menu sub-menu spec. */
    get indent(): number | string;
    set indent(indent: number | string);
    static ɵfac: i0.ɵɵFactoryDeclaration<MatTreeNodePadding<any, any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatTreeNodePadding<any, any>, "[matTreeNodePadding]", never, { "level": { "alias": "matTreeNodePadding"; "required": false; }; "indent": { "alias": "matTreeNodePaddingIndent"; "required": false; }; }, {}, never, never, true, never>;
    static ngAcceptInputType_level: unknown;
}

/**
 * Wrapper for the CdkTree's toggle with Material design styles.
 */
export declare class MatTreeNodeToggle<T, K = T> extends CdkTreeNodeToggle<T, K> {
    static ɵfac: i0.ɵɵFactoryDeclaration<MatTreeNodeToggle<any, any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MatTreeNodeToggle<any, any>, "[matTreeNodeToggle]", never, { "recursive": { "alias": "matTreeNodeToggleRecursive"; "required": false; }; }, {}, never, never, true, never>;
}

export { }
