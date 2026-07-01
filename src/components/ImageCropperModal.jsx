import { useState, useEffect, useRef } from "react";
import { FaCropAlt, FaTimes, FaUndo } from "react-icons/fa";

function ImageCropperModal({ file, onCrop, onClose }) {
  const [imageUrl, setImageUrl] = useState("");
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const frameRef = useRef(null);

  // Frame size for visual display
  const FRAME_SIZE = 288; // 288px (w-72)
  const OUTPUT_SIZE = 400; // Output cropped image is 400x400px

  // Generate object URL for the selected file
  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setZoom(1.0);
    setPosition({ x: 0, y: 0 });

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  // Calculate default display dimensions (cover styling)
  const getImageDimensions = () => {
    if (!imageRef.current) return { w: FRAME_SIZE, h: FRAME_SIZE };
    const img = imageRef.current;
    const nw = img.naturalWidth || FRAME_SIZE;
    const nh = img.naturalHeight || FRAME_SIZE;

    let w, h;
    if (nw > nh) {
      h = FRAME_SIZE;
      w = FRAME_SIZE * (nw / nh);
    } else {
      w = FRAME_SIZE;
      h = FRAME_SIZE * (nh / nw);
    }

    return { w, h };
  };

  // Drag handlers
  const handleDragStart = (clientX, clientY) => {
    setIsDragging(true);
    dragStart.current = {
      x: clientX - position.x,
      y: clientY - position.y,
    };
  };

  const handleDragMove = (clientX, clientY) => {
    if (!isDragging) return;
    const { w, h } = getImageDimensions();
    const sw = w * zoom;
    const sh = h * zoom;

    let newX = clientX - dragStart.current.x;
    let newY = clientY - dragStart.current.y;

    // Boundaries check to make sure the frame is always filled with the image
    const maxX = Math.max(0, (sw - FRAME_SIZE) / 2);
    const minX = -maxX;
    const maxY = Math.max(0, (sh - FRAME_SIZE) / 2);
    const minY = -maxY;

    // Clamp coordinates
    newX = Math.max(minX, Math.min(maxX, newX));
    newY = Math.max(minY, Math.min(maxY, newY));

    setPosition({ x: newX, y: newY });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Canvas crop handler
  const handleApplyCrop = () => {
    if (!imageRef.current) return;

    const img = imageRef.current;
    const { w, h } = getImageDimensions();
    const sw = w * zoom;
    const sh = h * zoom;

    // Calculate base centering offsets in display pixels
    const x0 = (FRAME_SIZE - sw) / 2;
    const y0 = (FRAME_SIZE - sh) / 2;

    // Top left coordinate of the cropped area relative to the image (in display pixels)
    const px = x0 + position.x;
    const py = y0 + position.y;

    // Output ratio
    const ratio = OUTPUT_SIZE / FRAME_SIZE;

    // Create Canvas
    const canvas = document.createElement("canvas");
    canvas.width = OUTPUT_SIZE;
    canvas.height = OUTPUT_SIZE;
    const ctx = canvas.getContext("2d");

    // Enable high-quality image smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Fill background with white in case of transparency issues
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, OUTPUT_SIZE, OUTPUT_SIZE);

    // Draw the image onto the canvas at panned/zoomed positions
    ctx.drawImage(img, px * ratio, py * ratio, sw * ratio, sh * ratio);

    // Convert canvas to blob/file
    canvas.toBlob(
      (blob) => {
        if (blob) {
          const croppedFile = new File([blob], file.name || "cropped_product.png", {
            type: "image/png",
            lastModified: Date.now(),
          });
          onCrop(croppedFile);
        }
      },
      "image/png",
      0.95
    );
  };

  const { w, h } = getImageDimensions();
  const scaledW = w * zoom;
  const scaledH = h * zoom;

  return (
    <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#FAF8F5] border border-gray-100/60 max-w-md w-full p-6 md:p-8 rounded-3xl shadow-2xl space-y-6 text-center animate-scaleIn">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <FaCropAlt className="text-amber-700" />
            <span>Crop & Adjust Image</span>
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Crop Area Container */}
        <div className="flex justify-center py-2">
          <div
            ref={frameRef}
            className="w-72 h-72 border-2 border-dashed border-[#c5a880] relative overflow-hidden rounded-2xl bg-neutral-900 select-none cursor-move shadow-inner"
            onMouseDown={(e) => handleDragStart(e.clientX, e.clientY)}
            onMouseMove={(e) => handleDragMove(e.clientX, e.clientY)}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={(e) => {
              const touch = e.touches[0];
              handleDragStart(touch.clientX, touch.clientY);
            }}
            onTouchMove={(e) => {
              const touch = e.touches[0];
              handleDragMove(touch.clientX, touch.clientY);
            }}
            onTouchEnd={handleDragEnd}
          >
            {imageUrl && (
              <img
                ref={imageRef}
                src={imageUrl}
                alt="Crop preview"
                draggable={false}
                onLoad={() => {
                  // Force re-render to calculate correct image size once loaded
                  setZoom(1.0);
                }}
                className="max-w-none absolute pointer-events-none transition-transform duration-75 origin-center"
                style={{
                  width: `${scaledW}px`,
                  height: `${scaledH}px`,
                  left: "50%",
                  top: "50%",
                  transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px)`,
                }}
              />
            )}
            
            {/* Guide overlay */}
            <div className="absolute inset-0 border border-white/20 pointer-events-none flex flex-col justify-between p-6">
              <div className="flex justify-between w-full">
                <div className="border-t-2 border-l-2 border-white/40 w-4 h-4"></div>
                <div className="border-t-2 border-r-2 border-white/40 w-4 h-4"></div>
              </div>
              <div className="flex justify-between w-full">
                <div className="border-b-2 border-l-2 border-white/40 w-4 h-4"></div>
                <div className="border-b-2 border-r-2 border-white/40 w-4 h-4"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Zoom Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs text-gray-500 font-medium">
            <span>Zoom</span>
            <span>{Math.round(zoom * 100)}%</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-xs">A</span>
            <input
              type="range"
              min="1"
              max="3"
              step="0.01"
              value={zoom}
              onChange={(e) => {
                const newZoom = parseFloat(e.target.value);
                setZoom(newZoom);
                // Adjust position boundary if zooming out
                setPosition({ x: 0, y: 0 });
              }}
              className="flex-grow accent-[#1F4027] h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-gray-600 font-bold text-sm">A+</span>
          </div>
        </div>

        {/* Instructions */}
        <p className="text-xs text-gray-400 font-light">
          Drag to position the image inside the border. Use the slider to zoom.
        </p>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              setPosition({ x: 0, y: 0 });
              setZoom(1.0);
            }}
            className="px-4 py-3 rounded-full border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-semibold transition flex items-center justify-center gap-1.5"
            title="Reset position"
          >
            <FaUndo size={12} /> Reset
          </button>
          
          <button
            type="button"
            onClick={onClose}
            className="flex-grow py-3 rounded-full border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          
          <button
            type="button"
            onClick={handleApplyCrop}
            className="flex-grow py-3 rounded-full bg-[#1F4027] hover:bg-[#152e1c] text-white text-sm font-semibold shadow-md hover:shadow-lg transition flex items-center justify-center gap-1.5"
          >
            Apply Crop
          </button>
        </div>

      </div>
    </div>
  );
}

export default ImageCropperModal;
