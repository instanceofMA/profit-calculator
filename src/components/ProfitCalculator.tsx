"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

export function ProfitCalculator() {
    const [initialPrice, setInitialPrice] = useState<string>("");
    const [finalPrice, setFinalPrice] = useState<string>("");
    const [investment, setInvestment] = useState<string>("");
    const [tokens, setTokens] = useState<string>("");
    const [result, setResult] = useState<{
        profit: number;
        finalAmount: number;
    } | null>(null);

    useEffect(() => {
        const calculateProfit = () => {
            if (!initialPrice || !finalPrice || (!investment && !tokens)) {
                setResult({
                    profit: 0,
                    finalAmount: 0,
                });
                return;
            }

            const initial = parseFloat(initialPrice);
            const final = parseFloat(finalPrice);
            let tokensAmount: number;

            if (investment) {
                tokensAmount = parseFloat(investment) / initial;
            } else if (tokens) {
                tokensAmount = parseFloat(tokens);
            } else {
                return;
            }

            const finalAmount = tokensAmount * final;
            const profit = finalAmount - tokensAmount * initial;

            setResult({
                profit,
                finalAmount,
            });
        };

        calculateProfit();
    }, [initialPrice, finalPrice, investment, tokens]);

    return (
        <div className="bg-background w-full max-w-xl mx-auto space-y-6 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">
                Crypto Profit/Loss Calculator
            </h2>

            <div className="space-y-4">
                <div className="flex flex-col space-y-4">
                    <div>
                        <label className="text-sm font-normal text-muted-foreground">
                            Initial Price ($)
                        </label>
                        <div className="relative">
                            <Input
                                type="number"
                                placeholder="0"
                                value={initialPrice}
                                onChange={(e) =>
                                    setInitialPrice(e.target.value)
                                }
                                min="0"
                                step="any"
                                className="ring-0 hover:ring-1 hover:ring-input-selected focus-visible:ring-input-selected transition-all duration-200 ease-in-out"
                            />
                            {initialPrice && (
                                <button
                                    onClick={() => setInitialPrice("")}
                                    className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 clear-button"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-normal text-muted-foreground">
                            Final Price ($)
                        </label>
                        <div className="relative">
                            <Input
                                type="number"
                                placeholder="0"
                                value={finalPrice}
                                onChange={(e) => setFinalPrice(e.target.value)}
                                min="0"
                                step="any"
                                className="ring-0 hover:ring-1 hover:ring-input-selected focus-visible:ring-input-selected transition-all duration-200 ease-in-out"
                            />
                            {finalPrice && (
                                <button
                                    onClick={() => setFinalPrice("")}
                                    className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 clear-button"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-5 flex flex-col">
                            <label className="text-sm font-normal text-muted-foreground mb-2">
                                Investment Amount ($)
                            </label>
                            <div className="relative">
                                <Input
                                    type="number"
                                    placeholder="0"
                                    value={investment}
                                    onChange={(e) => {
                                        setInvestment(e.target.value);
                                        setTokens("");
                                    }}
                                    min="0"
                                    step="any"
                                    disabled={!!tokens}
                                    className="h-10 ring-0 hover:ring-1 hover:ring-input-selected focus-visible:ring-input-selected transition-all duration-200 ease-in-out"
                                />
                                {investment && (
                                    <button
                                        onClick={() => setInvestment("")}
                                        className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 clear-button"
                                    >
                                        <X size={14} />
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="col-span-2 flex items-center justify-center">
                            <span className="px-4 py-2 rounded-md font-normal text-muted-foreground text-sm">
                                OR
                            </span>
                        </div>
                        <div className="col-span-5 flex flex-col">
                            <label className="text-sm font-normal text-muted-foreground mb-2">
                                Number of Tokens
                            </label>
                            <div className="relative">
                                <Input
                                    type="number"
                                    placeholder="0"
                                    value={tokens}
                                    onChange={(e) => {
                                        setTokens(e.target.value);
                                        setInvestment("");
                                    }}
                                    min="0"
                                    step="any"
                                    disabled={!!investment}
                                    className="h-10 ring-0 hover:ring-1 hover:ring-input-selected focus-visible:ring-input-selected transition-all duration-200 ease-in-out"
                                />
                                {tokens && (
                                    <button
                                        onClick={() => setTokens("")}
                                        className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 clear-button"
                                    >
                                        <X size={14} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {result && (
                <div
                    className={`mt-6 p-4 bg-background rounded-md border-2 ${
                        result.profit > 0
                            ? "border-success"
                            : result.profit < 0
                            ? "border-warning"
                            : "border-gray-300"
                    }`}
                >
                    <h3 className="text-lg font-semibold mb-2">Results</h3>
                    <div className="space-y-2">
                        <p className="text-sm">
                            {result.profit >= 0 ? "Profit" : "Loss"}:{" "}
                            <span className="font-medium">
                                ${Math.abs(result.profit).toFixed(2)}
                            </span>
                        </p>
                        <p className="text-sm">
                            Final Amount:{" "}
                            <span className="font-medium">
                                ${result.finalAmount.toFixed(2)}
                            </span>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
