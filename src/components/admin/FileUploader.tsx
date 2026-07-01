import { useState } from "react";
import { Upload, Check, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Props {
  label: string;
  folder: string;
  accept: string;
  onUpload: (url: string) => void;
}

export function FileUploader({ label, folder, accept, onUpload }: Props) {
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setStatus("Uploading...");

    const path = `${folder}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("portfolio").upload(path, file);

    if (error) {
      setStatus(`Error: ${error.message}`);
    } else {
      const { data } = supabase.storage.from("portfolio").getPublicUrl(path);
      onUpload(data.publicUrl);
      setStatus("Uploaded");
    }
    setUploading(false);
    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <label className="flex cursor-pointer items-center justify-between rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10 hover:bg-white/10">
      <span className="text-sm text-white/70">{label}</span>
      <input type="file" accept={accept} onChange={handleFile} disabled={uploading} className="hidden" />
      <span className="flex items-center gap-2 text-xs text-white/50">
        {status === "Uploaded" ? <Check className="h-4 w-4 text-emerald-400" /> : status?.startsWith("Error") ? <AlertCircle className="h-4 w-4 text-rose-400" /> : <Upload className="h-4 w-4" />}
        {status || "Upload"}
      </span>
    </label>
  );
}
