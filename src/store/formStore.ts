import { create } from "zustand";

export type FieldType = "text" | "email" | "number" | "select" | "checkbox" | "radio" | "date" | "file" | "textarea";

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  min?: string;
  max?: string;
  pattern?: string;
}

interface FormStore {
  fields: FormField[];
  addField: (type: FieldType) => void;
  updateField: (id: string, patch: Partial<FormField>) => void;
  removeField: (id: string) => void;
  moveField: (fromIdx: number, toIdx: number) => void;
  reorder: (fields: FormField[]) => void;
}

let _counter = 0;
function newId() { return `field_${++_counter}`; }

const DEFAULTS: Record<FieldType, Partial<FormField>> = {
  text:     { label: "Text Field",    placeholder: "Enter text..." },
  email:    { label: "Email",         placeholder: "you@example.com" },
  number:   { label: "Number",        placeholder: "0" },
  select:   { label: "Dropdown",      options: ["Option 1", "Option 2"] },
  checkbox: { label: "Checkbox" },
  radio:    { label: "Radio Group",   options: ["Option A", "Option B"] },
  date:     { label: "Date" },
  file:     { label: "File Upload" },
  textarea: { label: "Text Area",     placeholder: "Enter details..." },
};

export const useFormStore = create<FormStore>((set) => ({
  fields: [],
  addField: (type) => set(s => ({
    fields: [...s.fields, { id: newId(), type, required: false, ...DEFAULTS[type] } as FormField]
  })),
  updateField: (id, patch) => set(s => ({
    fields: s.fields.map(f => f.id === id ? { ...f, ...patch } : f)
  })),
  removeField: (id) => set(s => ({ fields: s.fields.filter(f => f.id !== id) })),
  moveField: (from, to) => set(s => {
    const fields = [...s.fields];
    const [moved] = fields.splice(from, 1);
    fields.splice(to, 0, moved);
    return { fields };
  }),
  reorder: (fields) => set({ fields }),
}));
