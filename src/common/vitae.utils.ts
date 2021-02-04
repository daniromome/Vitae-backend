import { ValidationError } from "class-validator";

function formatValidationErrors(errors: ValidationError[]) {
    const result: string[] = []
    for (const e of errors) {
        const messagesArray = Object.values(e.constraints!).map(m => `Expected ${m.replace('must', 'to')} (${e.value})`);
        result.push(...messagesArray);
    }
    return result;
}

export function throwValidationErrors(errors: ValidationError[]) {
    const formattedErrors = formatValidationErrors(errors);
    const error = new Error(`Data failed validation checks: ${formattedErrors.join(', ')}`);
    console.error(error);
    return { success: false, error: 'Data failed validation checks', details: formattedErrors };
}