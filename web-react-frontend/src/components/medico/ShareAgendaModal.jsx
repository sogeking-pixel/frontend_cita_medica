import React, { useRef, useState, useEffect } from "react";
import Modal from "../Modal";
import { QRCodeCanvas } from "qrcode.react";
import { FiCopy, FiDownload } from "react-icons/fi";

export default function ShareAgendaModal({
  open,
  onClose,
  agenda,
  clinicName = "Cita Express",
  iconUrl = "https://cita-express-three.vercel.app/assets/Logo-TdVtws3l.svg",
}) {

    const containerRef = useRef(null);
    const [copied, setCopied] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [link, setLink] = useState(null)
    const baseUrl = window.location.origin;
    useEffect(() => {
        if (!agenda || !agenda.id) return;
        const link_temporal = `${baseUrl}/elegir-tiempo-doctor?agenda=${agenda.id}`;
        setLink(link_temporal);
      }, [agenda]); 

    if (!open || !agenda) return null;

    const handleCopy = async () => {
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(link);
        } else {
        const ta = document.createElement("textarea");
        ta.value = link;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
    } catch (err) {
        console.error("Error copiando:", err);
        alert("No se pudo copiar al portapapeles");
    }
    };

    const handleDownload = () => {
    const canvas = containerRef.current?.querySelector("canvas");
    if (!canvas) {
        alert("No se encontró el QR para descargar.");
        return;
    }

    setDownloading(true);

    try {
       
        const image = new Image();
        image.crossOrigin = "Anonymous"; 
        image.src = iconUrl;

        image.onload = () => {
        const margin = 32;
        const scale = 3;
        const headerHeight = 120 * scale;

        const origW = canvas.width;
        const origH = canvas.height;
        const outW = (origW + margin * 2) * scale;
        const outH = (origH + margin * 2) * scale + headerHeight;

        const tmp = document.createElement("canvas");
        tmp.width = outW;
        tmp.height = outH;
        const ctx = tmp.getContext("2d");

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, outW, outH);

        const iconSize = 60 * scale;
        const iconX = (outW - iconSize) / 2;
        const iconY = 30 * scale;
        ctx.drawImage(image, iconX, iconY, iconSize, iconSize);
        const textY = iconY + iconSize + 25 * scale;
        ctx.font = `bold ${20 * scale}px Arial`;
        ctx.fillStyle = "#333333";
        ctx.textAlign = "center";
        ctx.fillText(clinicName, outW / 2, textY);
        ctx.drawImage(
            canvas,
            0,
            0,
            origW,
            origH,
            margin * scale,
            headerHeight + margin * scale,
            origW * scale,
            origH * scale
        );

        ctx.strokeStyle = "#63a3a3ff";
        ctx.lineWidth = 6 * scale;
        const pad = 12 * scale;
        ctx.strokeRect(pad, pad, outW - pad * 2, outH - pad * 2);

        const url = tmp.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = url;
        a.download = "qr-agenda-clinica.png";
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => setDownloading(false), 1400);
        };

        image.onerror = () => {
        setDownloading(false);
        alert(
            "No se pudo cargar el logo de la clínica. Revisa la ruta de la imagen."
        );
        };
    } catch (err) {
        console.error("Error al descargar:", err);
        alert("No se pudo descargar el QR.");
        setDownloading(false);
    }
    };

    return (
    <Modal
        title={`Compartir Agenda`}
        onClose={onClose}
        titleClose="Cerrar"
        buttonAccept={
        <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#63a3a3ff] text-white"
            title="Descargar QR"
            aria-label="Descargar QR"
            disabled={downloading}
        >
            <FiDownload />
            <span>{downloading ? "Descargando..." : "Descargar QR"}</span>
        </button>
        }
    >
        <div className="flex flex-col items-center gap-4">
        <div className="relative w-full">
            <input
            type="text"
            value={link}
            readOnly
            className="w-full pr-12 border p-2 rounded"
            aria-label="Link para compartir"
            />
            <button
            onClick={handleCopy}
            className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-2 px-3 py-1 rounded bg-[#63a3a3ff] text-white text-sm"
            title="Copiar link"
            aria-label="Copiar link"
            >
            <FiCopy />
            <span className="hidden sm:inline">
                {copied ? "Copiado!" : "Copiar"}
            </span>
            </button>
        </div>

        <div
            ref={containerRef}
            className="relative inline-block p-4 bg-white rounded-2xl shadow-md"
            style={{ border: "4px solid #63a3a3ff" }}
        >
            <QRCodeCanvas
            value={link}
            size={250}
            bgColor="#ffffff"
            fgColor="#63a3a3ff"
            level="H"
            />
        </div>
        </div>
    </Modal>
    );
}
