import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Award,
  CheckCircle,
  File,
  FileText,
  Loader2,
  Upload,
  Users,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface UploadedDoc {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  verified: boolean;
}

const docTypes = [
  { value: "cv", label: "CV / Resume" },
  { value: "qualification", label: "Qualification Certificate" },
  { value: "safe-cert", label: "SAFE Certificate" },
  { value: "teaching-cert", label: "Teaching Certification" },
  { value: "reference", label: "Reference Letter" },
  { value: "work-permit", label: "Work Permit" },
  { value: "id", label: "Identity Document" },
  { value: "other", label: "Other Credential" },
];

const docTypeIcons: Record<string, React.ReactNode> = {
  cv: <FileText className="h-5 w-5 text-primary" />,
  qualification: <Award className="h-5 w-5 text-yellow-600" />,
  "safe-cert": <CheckCircle className="h-5 w-5 text-green-600" />,
  "teaching-cert": <Award className="h-5 w-5 text-teal-600" />,
  reference: <Users className="h-5 w-5 text-purple-600" />,
  other: <File className="h-5 w-5 text-muted-foreground" />,
};

const mockDocs: UploadedDoc[] = [
  {
    id: "d1",
    name: "Sarah_Mitchell_CV_2024.pdf",
    type: "cv",
    size: "342 KB",
    uploadedAt: "3 Jan 2025",
    verified: true,
  },
  {
    id: "d2",
    name: "PGCE_Certificate.pdf",
    type: "qualification",
    size: "1.2 MB",
    uploadedAt: "3 Jan 2025",
    verified: true,
  },
  {
    id: "d3",
    name: "SAFE_Certificate_2024.pdf",
    type: "safe-cert",
    size: "890 KB",
    uploadedAt: "5 Jan 2025",
    verified: false,
  },
];

export default function TeacherDocuments() {
  const [docs, setDocs] = useState<UploadedDoc[]>(mockDocs);
  const [uploading, setUploading] = useState(false);
  const [selectedType, setSelectedType] = useState("cv");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    await new Promise((r) => setTimeout(r, 1500));

    const newDocs: UploadedDoc[] = Array.from(files).map((file, i) => ({
      id: `d_${Date.now()}_${i}`,
      name: file.name,
      type: selectedType,
      size: `${(file.size / 1024).toFixed(0)} KB`,
      uploadedAt: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      verified: false,
    }));

    setDocs((prev) => [...prev, ...newDocs]);
    setUploading(false);
    toast.success(
      `${files.length} document${files.length > 1 ? "s" : ""} uploaded successfully`,
    );
  };

  const removeDoc = (id: string) => {
    setDocs((prev) => prev.filter((d) => d.id !== id));
    toast.success("Document removed");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          My Documents
        </h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Upload your CV, certificates, and supporting documents
        </p>
      </div>

      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-xl p-6 space-y-4"
      >
        <h2 className="font-semibold text-foreground">Upload Document</h2>
        <div>
          <Label>Document Type</Label>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="mt-1.5 w-full sm:w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {docTypes.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Drop zone */}
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleUpload(e.dataTransfer.files);
          }}
          className={`block border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-150 ${
            dragOver
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/30"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            className="hidden"
            onChange={(e) => handleUpload(e.target.files)}
          />
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
              <p className="text-sm text-muted-foreground">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <p className="font-medium text-foreground">
                Drop files here or click to upload
              </p>
              <p className="text-xs text-muted-foreground">
                PDF, DOC, DOCX, JPG, PNG — max 10MB each
              </p>
            </div>
          )}
        </label>
      </motion.div>

      {/* Documents List */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card border border-border rounded-xl p-6"
      >
        <h2 className="font-semibold text-foreground mb-4">
          Uploaded Documents ({docs.length})
        </h2>
        {docs.length === 0 ? (
          <div className="text-center py-8">
            <File className="h-8 w-8 text-muted-foreground/50 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              No documents uploaded yet
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {docs.map((doc, i) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors"
              >
                <div className="shrink-0">
                  {docTypeIcons[doc.type] || docTypeIcons.other}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">
                    {doc.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {docTypes.find((t) => t.value === doc.type)?.label} ·{" "}
                    {doc.size} · Uploaded {doc.uploadedAt}
                  </div>
                </div>
                {doc.verified ? (
                  <span className="flex items-center gap-1 text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded-full border border-green-200 shrink-0">
                    <CheckCircle className="h-3 w-3" /> Verified
                  </span>
                ) : (
                  <span className="text-xs text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full border border-yellow-200 shrink-0">
                    Pending review
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => removeDoc(doc.id)}
                  className="shrink-0 text-muted-foreground hover:text-destructive transition-colors"
                  aria-label="Remove document"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
