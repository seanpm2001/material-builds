/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directionality } from '@angular/cdk/bidi';
import { CdkStep, CdkStepper, StepperOptions } from '@angular/cdk/stepper';
import { AnimationEvent } from '@angular/animations';
import { AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, QueryList, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher, ThemePalette } from '@angular/material/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subject } from 'rxjs';
import { MatStepHeader } from './step-header';
import { MatStepLabel } from './step-label';
import { MatStepperIcon, MatStepperIconContext } from './stepper-icon';
import { MatStepContent } from './step-content';
import * as i0 from "@angular/core";
export declare class MatStep extends CdkStep implements ErrorStateMatcher, AfterContentInit, OnDestroy {
    private _errorStateMatcher;
    private _viewContainerRef;
    private _isSelected;
    /** Content for step label given by `<ng-template matStepLabel>`. */
    stepLabel: MatStepLabel;
    /** Theme color for the particular step. */
    color: ThemePalette;
    /** Content that will be rendered lazily. */
    _lazyContent: MatStepContent;
    /** Currently-attached portal containing the lazy content. */
    _portal: TemplatePortal;
    constructor(stepper: MatStepper, _errorStateMatcher: ErrorStateMatcher, _viewContainerRef: ViewContainerRef, stepperOptions?: StepperOptions);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    /** Custom error state matcher that additionally checks for validity of interacted form. */
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatStep, [null, { skipSelf: true; }, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatStep, "mat-step", ["matStep"], { "color": "color"; }, {}, ["stepLabel", "_lazyContent"], ["*"]>;
}
export declare class MatStepper extends CdkStepper implements AfterContentInit {
    /** The list of step headers of the steps in the stepper. */
    _stepHeader: QueryList<MatStepHeader>;
    /** Full list of steps inside the stepper, including inside nested steppers. */
    _steps: QueryList<MatStep>;
    /** Steps that belong to the current stepper, excluding ones from nested steppers. */
    readonly steps: QueryList<MatStep>;
    /** Custom icon overrides passed in by the consumer. */
    _icons: QueryList<MatStepperIcon>;
    /** Event emitted when the current step is done transitioning in. */
    readonly animationDone: EventEmitter<void>;
    /** Whether ripples should be disabled for the step headers. */
    disableRipple: boolean;
    /** Theme color for all of the steps in stepper. */
    color: ThemePalette;
    /**
     * Whether the label should display in bottom or end position.
     * Only applies in the `horizontal` orientation.
     */
    labelPosition: 'bottom' | 'end';
    /**
     * Position of the stepper's header.
     * Only applies in the `horizontal` orientation.
     */
    headerPosition: 'top' | 'bottom';
    /** Consumer-specified template-refs to be used to override the header icons. */
    _iconOverrides: Record<string, TemplateRef<MatStepperIconContext>>;
    /** Stream of animation `done` events when the body expands/collapses. */
    readonly _animationDone: Subject<AnimationEvent>;
    constructor(dir: Directionality, changeDetectorRef: ChangeDetectorRef, elementRef: ElementRef<HTMLElement>);
    ngAfterContentInit(): void;
    _stepIsNavigable(index: number, step: MatStep): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatStepper, [{ optional: true; }, null, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatStepper, "mat-stepper, mat-vertical-stepper, mat-horizontal-stepper, [matStepper]", ["matStepper", "matVerticalStepper", "matHorizontalStepper"], { "selectedIndex": "selectedIndex"; "disableRipple": "disableRipple"; "color": "color"; "labelPosition": "labelPosition"; "headerPosition": "headerPosition"; }, { "animationDone": "animationDone"; }, ["_steps", "_icons"], never>;
}
