export interface FieldConfig {
  label: string;
  placeholder?: string;
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "select"
    | "checkbox"
    | "radio"
    | "textarea"
    | "date";
  required?: boolean;
  options?: { value: string | number; label: string }[]; // Para selects, radio buttons, etc.
  validation?: (value: any) => string | null;
  inputProps?: Record<string, any>; // Atributos extras do input
}
