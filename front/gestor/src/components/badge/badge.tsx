import React from "react";

export const StatusBadge = ({ status }: { status: string }) => {
    const colorMap: Record<string, string> = {
        Start: "bg-green-100 text-green-700",
        Restart: "bg-yellow-100 text-yellow-700",
        "In Process": "bg-blue-100 text-blue-700",
        Stop: "bg-red-100 text-red-700"
    };

    const translationMap: Record<string, string> = {
        Start: "Iniciado",
        Restart: "Reiniciado",
        "In Process": "En proceso",
        Stop: "Detenido"
    };

    return (
        <span
            className={`text-xs  p-1 rounded-full font-semibold ${colorMap[status] || "bg-gray-100 text-gray-700"}`}
        >
            {translationMap[status] || status}
        </span>
    );
};