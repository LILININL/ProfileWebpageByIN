import { useCallback, useMemo, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImage } from "../utils/cropImage.js";

const ACCEPT = ["image/png", "image/jpeg", "image/gif"];

function AvatarEditor({ value, onChange }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(value || null);
  const inputRef = useRef(null);

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const openFilePicker = () => inputRef.current?.click();

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!ACCEPT.includes(file.type)) {
      alert("รองรับเฉพาะไฟล์ .jpg .png .gif เท่านั้น");
      return;
    }
    const url = URL.createObjectURL(file);
    setImageSrc(url);
    setZoom(1);
  };

  const reset = () => {
    setImageSrc(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  const confirmCrop = useCallback(async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    const blob = await getCroppedImage(
      imageSrc,
      croppedAreaPixels,
      "image/png",
      0.92
    );
    const objectUrl = URL.createObjectURL(blob);
    setPreviewUrl(objectUrl);
    onChange?.({ blob, url: objectUrl });
    reset();
  }, [imageSrc, croppedAreaPixels, onChange]);

  const preview = useMemo(() => previewUrl, [previewUrl]);

  return (
    <div className="flex w-full flex-col gap-4">
      {!imageSrc && (
        <div className="flex items-center justify-center gap-4">
          <div
            className="group relative h-24 w-24 cursor-pointer overflow-hidden rounded-full border border-white/20 bg-white/10"
            role="button"
            tabIndex={0}
            aria-label="เลือกหรือเปลี่ยนรูปโปรไฟล์"
            onClick={openFilePicker}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") openFilePicker();
            }}
          >
            {preview ? (
              <img
                src={preview}
                alt="avatar"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="absolute inset-0 flex items-center justify-center text-xs text-white/60">
                ไม่มีรูป
              </span>
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-25 transition-opacity duration-200 ease-out group-hover:opacity-40">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-6 w-6 text-white/80"
                aria-hidden
              >
                <path d="M9 4h6l1 2h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3l1-2zm3 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
              </svg>
            </div>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/gif"
            className="hidden"
            onChange={handleFile}
          />
        </div>
      )}

      {imageSrc ? (
        <div className="flex w-full flex-col gap-3 rounded-2xl border border-white/10 bg-white/10 p-3">
          <div className="relative w-full h-full aspect-square overflow-hidden rounded-2xl bg-black/20 mx-auto">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              objectFit="contain"
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={reset}
              className="rounded-full border border-white/20 px-4 py-2 text-sm text-white hover:bg-white/15"
            >
              ยกเลิก
            </button>
            <button
              type="button"
              onClick={confirmCrop}
              className="rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(16,185,129,0.35)] hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(16,185,129,0.45)] transition"
            >
              ใช้รูปนี้
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default AvatarEditor;
