
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from "@angular/forms";
import {forwardRef, Component, ChangeDetectionStrategy, Input} from "@angular/core";
const CHEKCBOX_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TeslaClimateComponent),
  multi: true
};

@Component({
  selector: 'tesla-climate',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="tesla-climate">
      <label 
        class="tesla-climate__item"
        [class.tesla-climate__item--active]="value"
        [class.tesla-climate__item--focused]="focused === value"
        [class.tesla-heat]="!limit">
        <p>{{ (limit ? 'ac' : 'heat') }} {{ value ? 'on' : 'off' }}</p>
        <i class="tesla-climate__icon"></i>
      <input type="checkbox"
        name="climate"
        [checked]="value"
        (change)="onChange($event)"
        (blur)="onBlur($event)"
        (focus)="onFocus($event)">
      </label>
    </div>
  `,
  providers: [CHEKCBOX_VALUE_ACCESSOR],
  styleUrls: ['./tesla-climate.component.scss']
})

export class TeslaClimateComponent implements ControlValueAccessor {

  @Input() limit: boolean;

  value: boolean;
  focused: boolean;

  private onTouch: Function;
  private onModelChange: Function;

  private onChange(value: boolean) {
    this.value = value;
    this.onModelChange(this.value);
  }

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }

  writeValue(value: boolean) {
    this.value = value;
  }

  private onBlur(value: boolean) {
    this.focused = false;
  }

  private onFocus(value: boolean) {
    this.focused = value;
    this.onTouch();
  }
}
