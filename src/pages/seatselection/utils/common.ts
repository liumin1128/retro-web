export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

export function uniqueValues(values: string[]): string[] {
  return Array.from(new Set(values));
}

export function containsAllValues(
  values: readonly string[] = [],
  requiredValues: readonly string[] = [],
): boolean {
  for (let i = 0; i < requiredValues.length; i += 1) {
    if (!values.includes(requiredValues[i])) {
      return false;
    }
  }

  return true;
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}
