"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FolderOpen, Upload, ExternalLink, FileText, Loader2 } from "lucide-react";

type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
  createdTime?: string;
};

type Props = {
  folderId: string;
};

const FOLDER_MIME = "application/vnd.google-apps.folder";

export function PartenaireDrive({ folderId }: Props) {
  const [subfolders, setSubfolders] = useState<DriveFile[]>([]);
  const [filesByFolder, setFilesByFolder] = useState<Record<string, DriveFile[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploadingTo, setUploadingTo] = useState<string | null>(null);
  const inputs = useRef<Record<string, HTMLInputElement | null>>({});

  const loadFiles = useCallback(async (id: string) => {
    const res = await fetch(`/api/drive-files?folder_id=${encodeURIComponent(id)}`);
    const data = await res.json();
    return (data.files ?? []) as DriveFile[];
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const children = await loadFiles(folderId);
      const folders = children.filter((f) => f.mimeType === FOLDER_MIME);
      setSubfolders(folders);

      const map: Record<string, DriveFile[]> = {};
      await Promise.all(
        folders.map(async (folder) => {
          const files = await loadFiles(folder.id);
          map[folder.id] = files.filter((f) => f.mimeType !== FOLDER_MIME);
        }),
      );
      setFilesByFolder(map);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }, [folderId, loadFiles]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function handleUpload(subfolderId: string, file: File) {
    setUploadingTo(subfolderId);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder_id", subfolderId);
      const res = await fetch("/api/upload-drive", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Échec de l'envoi");
      await refresh();
    } catch (err) {
      setError(String(err));
    } finally {
      setUploadingTo(null);
    }
  }

  if (loading) {
    return (
      <p className="field-hint" style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Loader2 size={16} className="spin" aria-hidden /> Chargement du dossier Drive…
      </p>
    );
  }

  if (error) {
    return <p className="form-error">{error}</p>;
  }

  return (
    <div className="partenaire-drive">
      {subfolders.length === 0 && <p className="field-hint">Aucun sous-dossier trouvé dans le dossier Drive.</p>}
      {subfolders.map((folder) => {
        const files = filesByFolder[folder.id] ?? [];
        return (
          <section key={folder.id} className="partenaire-drive-folder">
            <header>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <FolderOpen size={17} aria-hidden /> <strong>{folder.name}</strong>
                <span className="field-hint" style={{ margin: 0 }}>
                  ({files.length})
                </span>
              </span>
              <div style={{ display: "flex", gap: 8 }}>
                {folder.webViewLink && (
                  <a className="back-link" href={folder.webViewLink} target="_blank" rel="noopener noreferrer">
                    Ouvrir <ExternalLink size={13} aria-hidden />
                  </a>
                )}
                <button
                  type="button"
                  className="secondary-action"
                  disabled={uploadingTo === folder.id}
                  onClick={() => inputs.current[folder.id]?.click()}
                >
                  {uploadingTo === folder.id ? (
                    <Loader2 size={14} className="spin" aria-hidden />
                  ) : (
                    <Upload size={14} aria-hidden />
                  )}{" "}
                  Déposer
                </button>
                <input
                  ref={(el) => {
                    inputs.current[folder.id] = el;
                  }}
                  type="file"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUpload(folder.id, file);
                    e.target.value = "";
                  }}
                />
              </div>
            </header>
            {files.length > 0 && (
              <ul className="partenaire-drive-files">
                {files.map((file) => (
                  <li key={file.id}>
                    <FileText size={14} aria-hidden />
                    {file.webViewLink ? (
                      <a href={file.webViewLink} target="_blank" rel="noopener noreferrer">
                        {file.name}
                      </a>
                    ) : (
                      <span>{file.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}
