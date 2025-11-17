import { ModalAll } from "./ModalAll";
import React, { useState } from "react";
import { FaSave } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";

export const EditPrinter = ({ printer, openPrinter, setOpenPrinter }) => {
    const [ip_address, setIpAddress] = useState(printer.ip_address);
    const [port, setPort] = useState(printer.port);
    const [port_ack, setPortAck] = useState(printer.port_ack);
    const [line, setLine] = useState(printer.line);
    const [name, setName] = useState(printer.name);
    const [productSum, setProductSum] = useState(printer.product_sum);
    const [error, setError] = useState("");

    const validateIp = (ip) => {
        const regex =
            /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
        return regex.test(ip);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateIp(ip_address)) {
            setError("Format IP Address tidak valid");
            return;
        }

        const data = {
            id: printer.id,
            ip_address,
            port,
            port_ack,
            line,
            name,
            product_sum: productSum,
        };

        window.be.editPrinter(data);
        window.location.reload();
    };

    return (
        <ModalAll isOpen={openPrinter} onClose={() => setOpenPrinter(false)}>
            <div className="flex flex-col gap-4">
                {/* Header */}
                <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
                    <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                        ✏️ Edit Printer
                    </h1>
                    <button
                        onClick={() => setOpenPrinter(false)}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    >
                        <MdOutlineClose className="text-xl text-gray-600 dark:text-gray-300" />
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3 text-gray-800 dark:text-gray-100"
                >
                    <InputField
                        label="IP Address"
                        value={ip_address}
                        onChange={(e) => setIpAddress(e.target.value)}
                        placeholder="192.168.1.10"
                        error={error}
                    />

                    <InputField
                        label="Port"
                        type="number"
                        value={port}
                        onChange={(e) => setPort(e.target.value)}
                        placeholder="8080"
                    />

                    <InputField
                        label="Port Remote"
                        type="number"
                        value={port_ack}
                        onChange={(e) => setPortAck(e.target.value)}
                        placeholder="4096"
                    />

                    <InputField
                        label="Printer Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Device 1"
                    />

                    <InputField
                        label="Sum Product Printed"
                        type="number"
                        value={productSum}
                        onChange={(e) => setProductSum(e.target.value)}
                        placeholder="1"
                    />

                    <InputField
                        label="Line"
                        type="number"
                        value={line}
                        onChange={(e) => setLine(e.target.value)}
                        placeholder="1"
                    />

                    <button
                        type="submit"
                        className="
                            mt-4 flex items-center justify-center gap-2
                            py-2 px-6
                            rounded-xl
                            font-semibold
                            text-white

                            relative overflow-hidden
                            transition-all duration-300

                            bg-gradient-to-r from-[#0a3d62]/90 via-[#0c4a7c]/90 to-[#0a3d62]/80
                            backdrop-blur-xl
                            border border-white/20

                            /* Soft shadow and glow */
                            shadow-[0_4px_20px_rgba(0,0,0,0.25)]
                            hover:shadow-[0_6px_24px_rgba(0,0,0,0.3)]
                            hover:bg-blue-500/90
                            active:scale-[0.97]
                                           "
                    >
                        {/* Subtle Windows 11 Light Shine */}
                        <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-30 pointer-events-none" />
                        <FaSave className="text-white drop-shadow-sm" />
                        Save
                    </button>

                    {error && (
                        <p className="text-sm text-red-500 font-medium mt-2">{error}</p>
                    )}
                </form>
            </div>
        </ModalAll>
    );
};

// 🔹 Komponen kecil reusable untuk input field
const InputField = ({
    label,
    type = "text",
    value,
    onChange,
    placeholder,
    error,
}) => (
    <div>
        <label className="block text-sm font-medium mb-1">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none transition text-gray-800 dark:text-gray-100 ${error ? "border-red-500" : "border-gray-300 dark:border-gray-700"
                }`}
            required
        />
    </div>
);
