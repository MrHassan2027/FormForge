import { useState } from "react";
import { useFormStore, type FieldType } from "./store/formStore";
import { exportHtml } from "./export/htmlExporter";

const FIELD_TYPES: FieldType[] = ["text","email","number","textarea","select","checkbox","radio","date","file"];

export default function App() {
  const { fields, addField, updateField, removeField } = useFormStore();
  const [preview, setPreview] = useState(false);
  const [exported, setExported] = useState("");

  const download = () => {
    const blob = new Blob([exported], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "form.html";
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-48 bg-white border-r border-gray-200 p-4 shrink-0">
        <h2 className="text-xs font-semibold text-gray-500 uppercase mb-3">Fields</h2>
        {FIELD_TYPES.map(t => (
          <button key={t} onClick={() => addField(t)}
            className="w-full text-left px-3 py-2 text-sm rounded hover:bg-blue-50 hover:text-blue-700 mb-1 capitalize">
            + {t}
          </button>
        ))}
      </aside>
      <main className="flex-1 p-8">
        <div className="flex gap-2 mb-6">
          <button onClick={() => setPreview(false)} className={`px-4 py-1.5 text-sm rounded ${!preview ? "bg-blue-600 text-white" : "bg-white border"}`}>Edit</button>
          <button onClick={() => setPreview(true)} className={`px-4 py-1.5 text-sm rounded ${preview ? "bg-blue-600 text-white" : "bg-white border"}`}>Preview</button>
          <button onClick={() => setExported(exportHtml(fields))} className="ml-auto px-4 py-1.5 text-sm bg-green-600 text-white rounded">Export HTML</button>
        </div>
        {!preview ? (
          <div className="space-y-3 max-w-xl">
            {fields.length === 0 && <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center text-gray-400">Click a field type on the left to add it</div>}
            {fields.map(f => (
              <div key={f.id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex gap-2 mb-2">
                  <input value={f.label} onChange={e => updateField(f.id, { label: e.target.value })} className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm font-medium" />
                  <label className="flex items-center gap-1 text-xs text-gray-500"><input type="checkbox" checked={f.required} onChange={e => updateField(f.id, { required: e.target.checked })} /> Required</label>
                  <button onClick={() => removeField(f.id)} className="text-red-400 hover:text-red-600 text-xs">✕</button>
                </div>
                <div className="text-xs text-gray-400 uppercase">{f.type}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-xl bg-white border rounded-lg p-8 space-y-4">
            {fields.map(f => (
              <div key={f.id}>
                <label className="block text-sm font-medium mb-1">{f.label}{f.required && " *"}</label>
                {f.type === "textarea" ? <textarea className="w-full border rounded px-3 py-2 text-sm" rows={3} /> :
                 f.type === "select"   ? <select className="w-full border rounded px-3 py-2 text-sm"><option>-- Select --</option></select> :
                 <input type={f.type} className="w-full border rounded px-3 py-2 text-sm" placeholder={f.placeholder} />}
              </div>
            ))}
          </div>
        )}
        {exported && (
          <div className="mt-6 max-w-xl">
            <div className="flex justify-between mb-2"><span className="text-sm font-medium">Exported HTML</span><button onClick={download} className="text-xs text-blue-600 hover:underline">Download</button></div>
            <pre className="bg-gray-900 text-gray-300 text-xs p-4 rounded overflow-auto max-h-64">{exported}</pre>
          </div>
        )}
      </main>
    </div>
  );
}
