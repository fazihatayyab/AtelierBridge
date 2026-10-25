import { useState, useEffect, useRef } from "react";

import { useAuth } from "../Context/AuthContext";



function BrandTagInput({ selectedBrand, onSelect }) {
    const { authFetch } = useAuth();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [open, setOpen] = useState(false);
    const debounceRef = useRef(null);

    useEffect(() => {
        //   debounceRef   It's storing the ID of a pending timer, so we can cancel it later.
        // Type "K" → schedule search in 300ms Type "h" (50ms later) → cancel previous timer, schedule a NEW search in 300ms
        if (debounceRef.current) clearTimeout(debounceRef.current);

        if (!query.trim()) {
            setResults([]);
            return;
        }

        debounceRef.current = setTimeout(async () => {
            try {
                const res = await authFetch("get", "/api/brand/searchBrands", null, {
                params: { name: query },
        });
                
                setResults(res.data.brands);
                setOpen(true);
            } catch {
                setResults([]);
            }
        }, 300); // wait 300ms after typing stops before searching

        return () => clearTimeout(debounceRef.current);
    }, [query]);

    function handlePick(brand) {
        onSelect(brand);
        setQuery("");
        setOpen(false);
    }

    function handleClear() {
        onSelect(null);
        setQuery("");
    }

    return (
        <div className="relative">
            <label className="text-sm font-medium text-gray-700">
                Tag a brand (optional)
            </label>

            {selectedBrand ? (
                <div className="mt-1 flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md text-sm">
                    <span className="flex items-center gap-2">
                        {selectedBrand.avatarUrl ? (
                            <img
                                src={selectedBrand.avatarUrl}
                                alt={selectedBrand.name}
                                className="w-5 h-5 rounded-full object-cover"
                            />
                        ) : (
                            <span className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-semibold">
                                {selectedBrand.name?.[0]?.toUpperCase()}
                            </span>
                        )}
                        {selectedBrand.name}
                    </span>
                    <button
                        type="button"
                        onClick={handleClear}
                        className="text-gray-400 hover:text-gray-700 text-xs"
                    >
                        Remove
                    </button>
                </div>
            ) : (
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} 
                    onFocus={() => results.length > 0 && setOpen(true)}
                    placeholder="Search brand name..."
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
            )}

           {open && !selectedBrand && results.length > 0 && (
                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-md max-h-48 overflow-y-auto">
                    {results.map((brand) => (
                        <li
                            key={brand.id}
                            onClick={() => handlePick(brand)}
                            className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                        >
                            {brand.avatarUrl ? (
                                <img
                                    src={brand.avatarUrl}
                                    alt={brand.name}
                                    className="w-6 h-6 rounded-full object-cover"
                                />
                            ) : (
                                <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold">
                                    {brand.name?.[0]?.toUpperCase()}
                                </span>
                            )}
                            {brand.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default BrandTagInput;
