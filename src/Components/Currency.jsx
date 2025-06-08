import React, { useState } from 'react';
import { motion } from "framer-motion";

function Currency() {
    const [amount, setAmount] = useState(1);
    const [from, setFrom] = useState("USD");
    const [to, setTo] = useState("TRY");
    const [result, setResult] = useState(null);

    const convertCurrency = async () => {
        const apiKey = "fca_live_VAXZVU8zm4LVXtbjDbjuhVg2c6JXOdf4SNmbLeN9";
        const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&base_currency=${from}&currencies=${to}`;

        const res = await fetch(url);
        const data = await res.json();

        const rate = data.data[to];
        setResult((amount * rate).toFixed(2));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 to-purple-200 p-6">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{
                    scale: 1.02,
                    borderColor: "#a855f7", // Tailwind purple-500
                    transition: { duration: 0.3 }
                }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-xl bg-white border-2 border-transparent rounded-2xl shadow-2xl p-8"
            >
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Currency Converter
                </h1>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <input
                        type="number"
                        className="col-span-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />

                    <select
                        className="col-span-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                    >
                        <option value="USD">USD</option>
                        <option value="TRY">TRY</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                    </select>

                    <select
                        className="col-span-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                    >
                        <option value="TRY">TRY</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                    </select>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={convertCurrency}
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg shadow-md transition-all duration-300"
                >
                    Convert
                </motion.button>

                {result && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-6 text-center text-xl font-semibold text-gray-700"
                    >
                        {amount} {from} ={" "}
                        <span className="text-purple-600">
                            {result} {to}
                        </span>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}

export default Currency;
