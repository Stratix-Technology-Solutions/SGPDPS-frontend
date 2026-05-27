import type { Option } from './form.types'

export const toOptions = <T extends string>(values: readonly T[],): Option<T>[] => {
  return values.map((value) => ({
    label: value,
    value,
  }))
}

export const objectToOptions = <T, LabelKey extends keyof T, ValueKey extends keyof T>(
  items: T[],
  labelKey: LabelKey,
  valueKey: ValueKey,
): Option<string>[] => {
  return items.map((item) => ({
    label: String(item[labelKey]),
    value: String(item[valueKey]),
  }))
}
