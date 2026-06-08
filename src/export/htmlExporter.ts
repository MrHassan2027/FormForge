import { FormField } from "../store/formStore";

function fieldHtml(f: FormField): string {
  const req = f.required ? " required" : "";
  const ph  = f.placeholder ? ` placeholder="${f.placeholder}"` : "";

  switch (f.type) {
    case "textarea":
      return `<textarea name="${f.id}" id="${f.id}"${ph}${req} rows="4"></textarea>`;
    case "select":
      return `<select name="${f.id}" id="${f.id}"${req}>
        <option value="">-- Select --</option>
        ${(f.options ?? []).map(o => `<option value="${o}">${o}</option>`).join("\n        ")}
      </select>`;
    case "radio":
      return (f.options ?? []).map(o =>
        `<label><input type="radio" name="${f.id}" value="${o}"${req}> ${o}</label>`
      ).join("\n      ");
    case "checkbox":
      return `<input type="checkbox" name="${f.id}" id="${f.id}"${req}>`;
    default:
      return `<input type="${f.type}" name="${f.id}" id="${f.id}"${ph}${req}>`;
  }
}

function validationScript(fields: FormField[]): string {
  const checks = fields
    .filter(f => f.required)
    .map(f => `  if (!form["${f.id}"]?.value) { errors.push("${f.label} is required"); }`)
    .join("\n");

  return `<script>
  document.getElementById("generated-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const form = e.target;
    const errors = [];
${checks}
    if (errors.length) { alert(errors.join("\\n")); return; }
    alert("Form submitted successfully!");
  });
</script>`;
}

export function exportHtml(fields: FormField[]): string {
  const formFields = fields.map(f => `
    <div class="form-group">
      <label for="${f.id}">${f.label}${f.required ? " *" : ""}</label>
      ${fieldHtml(f)}
    </div>`).join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Generated Form</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 600px; margin: 40px auto; padding: 0 16px; }
    .form-group { margin-bottom: 16px; }
    label { display: block; font-weight: 600; margin-bottom: 4px; font-size: 14px; }
    input, select, textarea { width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box; }
    input[type=checkbox], input[type=radio] { width: auto; margin-right: 6px; }
    button { background: #2563eb; color: white; padding: 10px 24px; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; }
    button:hover { background: #1d4ed8; }
  </style>
</head>
<body>
  <form id="generated-form">
${formFields}
    <button type="submit">Submit</button>
  </form>
  ${validationScript(fields)}
</body>
</html>`;
}
