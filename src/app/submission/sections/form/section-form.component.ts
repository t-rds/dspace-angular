
import {
  ChangeDetectorRef,
  Component,
  Inject,
  ViewChild,
} from '@angular/core';
import {
  DynamicFormControlEvent,
  DynamicFormControlModel,
} from '@ng-dynamic-forms/core';
import { TranslateService } from '@ngx-translate/core';
import findIndex from 'lodash/findIndex';
import isEqual from 'lodash/isEqual';
import {
  combineLatest as observableCombineLatest,
  Observable,
  Subscription,
} from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  find,
  map,
  mergeMap,
  take,
  tap,
} from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { ObjectCacheService } from '../../../core/cache/object-cache.service';
import { ConfigObject } from '../../../core/config/models/config.model';
import { FormRowModel } from '../../../core/config/models/config-submission-form.model';
import { SubmissionFormsModel } from '../../../core/config/models/config-submission-forms.model';
import { SubmissionFormsConfigDataService } from '../../../core/config/submission-forms-config-data.service';
import { RemoteData } from '../../../core/data/remote-data';
import { RequestService } from '../../../core/data/request.service';
import { JsonPatchOperationPathCombiner } from '../../../core/json-patch/builder/json-patch-operation-path-combiner';
import {
  getFirstSucceededRemoteData,
  getRemoteDataPayload,
} from '../../../core/shared/operators';
import { SubmissionObject } from '../../../core/submission/models/submission-object.model';
import { WorkflowItem } from '../../../core/submission/models/workflowitem.model';
import { WorkspaceItem } from '../../../core/submission/models/workspaceitem.model';
import { WorkspaceitemSectionFormObject } from '../../../core/submission/models/workspaceitem-section-form.model';
import { SubmissionObjectDataService } from '../../../core/submission/submission-object-data.service';
import { SubmissionScopeType } from '../../../core/submission/submission-scope-type';
import {
  hasValue,
  isEmpty,
  isNotEmpty,
  isUndefined,
} from '../../../shared/empty.util';
import { FormBuilderService } from '../../../shared/form/builder/form-builder.service';
import { FormFieldPreviousValueObject } from '../../../shared/form/builder/models/form-field-previous-value-object';
import { FormComponent } from '../../../shared/form/form.component';
import { FormService } from '../../../shared/form/form.service';
import { ThemedLoadingComponent } from '../../../shared/loading/themed-loading.component';
import { NotificationsService } from '../../../shared/notifications/notifications.service';
import { difference } from '../../../shared/object.util';
import { followLink } from '../../../shared/utils/follow-link-config.model';
import { SubmissionSectionError } from '../../objects/submission-section-error.model';
import { SubmissionSectionObject } from '../../objects/submission-section-object.model';
import { SubmissionService } from '../../submission.service';
import { SectionModelComponent } from '../models/section.model';
import { SectionDataObject } from '../models/section-data.model';
import { SectionsService } from '../sections.service';
import { SectionFormOperationsService } from './section-form-operations.service';

/**
 * This component represents a section that contains a Form.
 */
@Component({
  selector: 'ds-submission-section-form',
  styleUrls: ['./section-form.component.scss'],
  templateUrl: './section-form.component.html',
  imports: [
    FormComponent,
    ThemedLoadingComponent,
  ],
  standalone: true,
})
export class SubmissionSectionFormComponent extends SectionModelComponent {

  /**
   * The form id
   * @type {string}
   */
  public formId: string;

  /**
   * The form model
   * @type {DynamicFormControlModel[]}
   */
  public formModel: DynamicFormControlModel[];

  /**
   * A boolean representing if this section is updating
   * @type {boolean}
   */
  public isUpdating = false;

  /**
   * A boolean representing if this section is loading
   * @type {boolean}
   */
  public isLoading = true;

  /**
   * A map representing all field on their way to be removed
   * @type {Map}
   */
  protected fieldsOnTheirWayToBeRemoved: Map<string, number[]> = new Map();

  /**
   * The form config
   * @type {SubmissionFormsModel}
   */
  protected formConfig: SubmissionFormsModel;

  /**
   * The form data
   * @type {any}
   */
  protected formData: any = Object.create({});

  /**
   * Store the
   * @protected
   */
  protected sectionMetadata: string[];

  /**
   * The [JsonPatchOperationPathCombiner] object
   * @type {JsonPatchOperationPathCombiner}
   */
  protected pathCombiner: JsonPatchOperationPathCombiner;

  /**
   * The [FormFieldPreviousValueObject] object
   * @type {FormFieldPreviousValueObject}
   */
  protected previousValue: FormFieldPreviousValueObject = new FormFieldPreviousValueObject();

  /**
   * The list of Subscription
   * @type {Array}
   */
  protected subs: Subscription[] = [];

  protected submissionObject: SubmissionObject;

  /**
   * A flag representing if this section is readonly
   */
  protected isSectionReadonly = false;

  /**
   * The FormComponent reference
   */
  @ViewChild('formRef') private formRef: FormComponent;

  /**
   * Initialize instance variables
   *
   * @param {ChangeDetectorRef} cdr
   * @param {FormBuilderService} formBuilderService
   * @param {SectionFormOperationsService} formOperationsService
   * @param {FormService} formService
   * @param {SubmissionFormsConfigDataService} formConfigService
   * @param {NotificationsService} notificationsService
   * @param {SectionsService} sectionService
   * @param {SubmissionService} submissionService
   * @param {TranslateService} translate
   * @param {SubmissionObjectDataService} submissionObjectService
   * @param {ObjectCacheService} objectCache
   * @param {RequestService} requestService
   * @param {string} injectedCollectionId
   * @param {SectionDataObject} injectedSectionData
   * @param {string} injectedSubmissionId
   */
  constructor(protected cdr: ChangeDetectorRef,
              protected formBuilderService: FormBuilderService,
              protected formOperationsService: SectionFormOperationsService,
              protected formService: FormService,
              protected formConfigService: SubmissionFormsConfigDataService,
              protected notificationsService: NotificationsService,
              protected sectionService: SectionsService,
              protected submissionService: SubmissionService,
              protected translate: TranslateService,
              protected submissionObjectService: SubmissionObjectDataService,
              protected objectCache: ObjectCacheService,
              protected requestService: RequestService,
              @Inject('collectionIdProvider') public injectedCollectionId: string,
              @Inject('sectionDataProvider') public injectedSectionData: SectionDataObject,
              @Inject('submissionIdProvider') public injectedSubmissionId: string) {
    super(injectedCollectionId, injectedSectionData, injectedSubmissionId);
  }

  /**
   * Initialize all instance variables and retrieve form configuration
   */
  onSectionInit() {
    this.pathCombiner = new JsonPatchOperationPathCombiner('sections', this.sectionData.id);
    this.formId = this.formService.getUniqueId(this.sectionData.id);
    this.sectionService.dispatchSetSectionFormId(this.submissionId, this.sectionData.id, this.formId);
    this.formConfigService.findByHref(this.sectionData.config).pipe(
      map((configData: RemoteData<ConfigObject>) => configData.payload),
      tap((config: SubmissionFormsModel) => this.formConfig = config),
      mergeMap(() =>
        observableCombineLatest([
          this.sectionService.getSectionData(this.submissionId, this.sectionData.id, this.sectionData.sectionType),
          this.submissionObjectService.findById(this.submissionId, true, false, followLink('item')).pipe(
            getFirstSucceededRemoteData(),
            getRemoteDataPayload()),
          this.sectionService.isSectionReadOnly(this.submissionId, this.sectionData.id, this.submissionService.getSubmissionScope()),
        ])),
      take(1))
      .subscribe(([sectionData, submissionObject, isSectionReadOnly]: [WorkspaceitemSectionFormObject, SubmissionObject, boolean]) => {
        if (isUndefined(this.formModel)) {
          // this.sectionData.errorsToShow = [];
          this.submissionObject = submissionObject;
          this.isSectionReadonly = isSectionReadOnly;
          // Is the first loading so init form
          this.initForm(sectionData, this.sectionData.errorsToShow, this.sectionData.serverValidationErrors);
          this.sectionData.data = sectionData;
          this.subscriptions();
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
  }

  /**
   * Unsubscribe from all subscriptions
   */
  onSectionDestroy() {
    this.subs
      .filter((subscription) => hasValue(subscription))
      .forEach((subscription) => subscription.unsubscribe());
  }

  /**
   * Get section status
   *
   * @return Observable<boolean>
   *     the section status
   */
  protected getSectionStatus(): Observable<boolean> {
    const formStatus$ = this.formService.isValid(this.formId);
    const serverValidationStatus$ = this.sectionService.getSectionServerErrors(this.submissionId, this.sectionData.id).pipe(
      map((validationErrors) => isEmpty(validationErrors)),
    );

    return observableCombineLatest([formStatus$, serverValidationStatus$]).pipe(
      map(([formValidation, serverSideValidation]: [boolean, boolean]) => formValidation && serverSideValidation),
    );
  }

  /**
   * Check if the section data has been enriched by the server
   *
   * @param sectionData
   *    the section data retrieved from the server
   */
  hasMetadataEnrichment(sectionData: WorkspaceitemSectionFormObject): boolean {

    const sectionDataToCheck = {};
    Object.keys(sectionData).forEach((key) => {
      // todo: removing Relationships works due to a bug -- dspace.entity.type is included in sectionData, which is what triggers the update;
      //       if we use this.sectionMetadata.includes(key), this field is filtered out and removed Relationships won't disappear from the form.
      if (this.inCurrentSubmissionScope(key)) {
        sectionDataToCheck[key] = sectionData[key];
      }
    });

    const diffResult = [];

    // compare current form data state with section data retrieved from store
    const diffObj = difference(sectionDataToCheck, this.formData);

    // iterate over differences to check whether they are actually different
    Object.keys(diffObj)
      .forEach((key) => {
        diffObj[key].forEach((value) => {
          // the findIndex extra check excludes values already present in the form but in different positions
          if (value.hasOwnProperty('value') && findIndex(this.formData[key], { value: value.value }) < 0) {
            diffResult.push(value);
          }
        });
      });
    return isNotEmpty(diffResult);
  }

  /**
   * Whether a specific field is editable in the current scope. Unscoped fields always return true.
   * @private
   */
  private inCurrentSubmissionScope(field: string): boolean {
    const scope = this.formConfig?.rows.find((row: FormRowModel) => {
      if (row.fields?.[0]?.selectableMetadata) {
        return row.fields?.[0]?.selectableMetadata?.[0]?.metadata === field;
      } else if (row.fields?.[0]?.selectableRelationship) {
        return row.fields?.[0]?.selectableRelationship.relationshipType === field.replace(/^relationship\./g, '');
      } else {
        return false;
      }
    })?.fields?.[0]?.scope;

    switch (scope) {
      case SubmissionScopeType.WorkspaceItem.valueOf(): {
        return (this.submissionObject as any).type === WorkspaceItem.type.value;
      }
      case SubmissionScopeType.WorkflowItem.valueOf(): {
        return (this.submissionObject as any).type === WorkflowItem.type.value;
      }
      default: {
        return true;
      }
    }
  }

  /**
   * Initialize form model
   *
   * @param sectionData
   *    the section data retrieved from the server
   */
  initForm(sectionData: WorkspaceitemSectionFormObject, errorsToShow: SubmissionSectionError[], serverValidationErrors: SubmissionSectionError[]): void {
    try {
      this.formModel = this.formBuilderService.modelFromConfiguration(
        this.submissionId,
        this.formConfig,
        this.collectionId,
        sectionData,
        this.submissionService.getSubmissionScope(),
        this.isSectionReadonly,
      );
      const sectionMetadata = this.sectionService.computeSectionConfiguredMetadata(this.formConfig);
      this.sectionService.updateSectionData(this.submissionId, this.sectionData.id, sectionData, errorsToShow, serverValidationErrors, sectionMetadata);
    } catch (e: unknown) {
      const msg: string = this.translate.instant('error.submission.sections.init-form-error') + (e as Error).toString();
      const sectionError: SubmissionSectionError = {
        message: msg,
        path: '/sections/' + this.sectionData.id,
      };
      if (e instanceof Error) {
        console.error(e.stack);
      }
      this.sectionService.setSectionError(this.submissionId, this.sectionData.id, sectionError);
    }
  }

  /**
   * Update form model
   *
   * @param sectionState
   *    the section state retrieved from the server
   */
  updateForm(sectionState: SubmissionSectionObject): void {

    const sectionData = sectionState.data as WorkspaceitemSectionFormObject;
    const errors = sectionState.errorsToShow;

    if (isNotEmpty(sectionData) && !isEqual(sectionData, this.sectionData.data)) {
      this.sectionData.data = sectionData;
      if (this.hasMetadataEnrichment(sectionData)) {
        this.isUpdating = true;
        this.formModel = null;
        this.cdr.detectChanges();
        this.initForm(sectionData, errors, sectionState.serverValidationErrors);
        this.checksForErrors(errors);
        this.isUpdating = false;
        this.cdr.detectChanges();
      } else if (isNotEmpty(errors) || isNotEmpty(this.sectionData.errorsToShow)) {
        this.checksForErrors(errors);
      }
    } else if (isNotEmpty(errors) || isNotEmpty(this.sectionData.errorsToShow)) {
      this.checksForErrors(errors);
    }

  }

  /**
   * Check if there are form validation error retrieved from server
   *
   * @param errors
   *    the section errors retrieved from the server
   */
  checksForErrors(errors: SubmissionSectionError[]): void {
    this.formService.isFormInitialized(this.formId).pipe(
      find((status: boolean) => status === true && !this.isUpdating))
      .subscribe(() => {
        this.sectionService.checkSectionErrors(this.submissionId, this.sectionData.id, this.formId, errors, this.sectionData.errorsToShow);
        this.sectionData.errorsToShow = errors;
        this.cdr.detectChanges();
      });
  }

  /**
   * Initialize all subscriptions
   */
  subscriptions(): void {
    this.subs.push(
      /**
       * Subscribe to form's data
       */
      this.formService.getFormData(this.formId).pipe(
        distinctUntilChanged())
        .subscribe((formData) => {
          this.formData = formData;
        }),

      /**
       * Subscribe to section state
       */
      this.sectionService.getSectionState(this.submissionId, this.sectionData.id, this.sectionData.sectionType).pipe(
        filter((sectionState: SubmissionSectionObject) => {
          return isNotEmpty(sectionState) && (isNotEmpty(sectionState.data) || isNotEmpty(sectionState.errorsToShow));
        }),
        distinctUntilChanged())
        .subscribe((sectionState: SubmissionSectionObject) => {
          this.fieldsOnTheirWayToBeRemoved = new Map();
          this.sectionMetadata = sectionState.metadata;
          this.updateForm(sectionState);
        }),
    );
  }

  /**
   * Method called when a form dfChange event is fired.
   * Dispatch form operations based on changes.
   *
   * @param event
   *    the [[DynamicFormControlEvent]] emitted
   */
  onChange(event: DynamicFormControlEvent): void {
    this.formOperationsService.dispatchOperationsFromEvent(
      this.pathCombiner,
      event,
      this.previousValue,
      this.hasStoredValue(this.formBuilderService.getId(event.model), this.formOperationsService.getArrayIndexFromEvent(event)));
    const metadata = this.formOperationsService.getFieldPathSegmentedFromChangeEvent(event);
    const value = this.formOperationsService.getFieldValueFromChangeEvent(event);

    if ((environment.submission.autosave.metadata.indexOf(metadata) !== -1 && isNotEmpty(value)) || this.hasRelatedCustomError(metadata)) {
      this.submissionService.dispatchSave(this.submissionId);
    }
  }

  private hasRelatedCustomError(medatata): boolean {
    const index = findIndex(this.sectionData.errorsToShow, { path: this.pathCombiner.getPath(medatata).path });
    if (index  !== -1) {
      const error = this.sectionData.errorsToShow[index];
      const validator = error.message.replace('error.validation.', '');
      return !environment.form.validatorMap.hasOwnProperty(validator);
    } else {
      return false;
    }
  }

  /**
   * Method called when a form dfFocus event is fired.
   * Initialize [FormFieldPreviousValueObject] instance.
   *
   * @param event
   *    the [[DynamicFormControlEvent]] emitted
   */
  onFocus(event: DynamicFormControlEvent): void {
    const value = this.formOperationsService.getFieldValueFromChangeEvent(event);
    const path = this.formBuilderService.getPath(event.model);
    if (this.formBuilderService.hasMappedGroupValue(event.model)) {
      this.previousValue.path = path;
      this.previousValue.value = this.formOperationsService.getQualdropValueMap(event);
    } else if (isNotEmpty(value) && ((typeof value === 'object' && isNotEmpty(value.value)) || (typeof value === 'string'))) {
      this.previousValue.path = path;
      this.previousValue.value = value;
    }
  }

  /**
   * Method called when a form remove event is fired.
   * Dispatch form operations based on changes.
   *
   * @param event
   *    the [[DynamicFormControlEvent]] emitted
   */
  onRemove(event: DynamicFormControlEvent): void {
    const fieldId = this.formBuilderService.getId(event.model);
    const fieldIndex = this.formOperationsService.getArrayIndexFromEvent(event);

    // Keep track that this field will be removed
    if (this.fieldsOnTheirWayToBeRemoved.has(fieldId)) {
      const indexes = this.fieldsOnTheirWayToBeRemoved.get(fieldId);
      indexes.push(fieldIndex);
      this.fieldsOnTheirWayToBeRemoved.set(fieldId, indexes);
    } else {
      this.fieldsOnTheirWayToBeRemoved.set(fieldId, [fieldIndex]);
    }

    this.formOperationsService.dispatchOperationsFromEvent(
      this.pathCombiner,
      event,
      this.previousValue,
      this.hasStoredValue(fieldId, fieldIndex));

  }

  /**
   * Check if the specified form field has already a value stored
   *
   * @param fieldId
   *    the section data retrieved from the serverù
   * @param index
   *    the section data retrieved from the server
   */
  hasStoredValue(fieldId, index): boolean {
    if (isNotEmpty(this.sectionData.data)) {
      return this.sectionData.data.hasOwnProperty(fieldId) &&
        isNotEmpty(this.sectionData.data[fieldId][index]) &&
        !this.isFieldToRemove(fieldId, index);
    } else {
      return false;
    }
  }

  /**
   * Check if the specified field is on the way to be removed
   *
   * @param fieldId
   *    the section data retrieved from the serverù
   * @param index
   *    the section data retrieved from the server
   */
  isFieldToRemove(fieldId, index) {
    return this.fieldsOnTheirWayToBeRemoved.has(fieldId) && this.fieldsOnTheirWayToBeRemoved.get(fieldId).includes(index);
  }

  /**
   * Handle the customEvent (ex. drag-drop move event).
   * The customEvent is stored inside event.$event
   * @param $event
   */
  onCustomEvent(event: DynamicFormControlEvent) {
    this.formOperationsService.dispatchOperationsFromEvent(
      this.pathCombiner,
      event,
      this.previousValue,
      null);
  }
}
