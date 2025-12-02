'use client';
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Model } from './Model';
import { Suspense } from './Suspense';
export const SuspenseModel = ({ entry, draco, fallback = _jsxs("div", { className: "text-white", children: ["Loading model ", entry.id, "..."] }), children, }) => {
    return (_jsx(Suspense, { fallback: fallback, children: _jsx(Model, { entry: entry, draco: draco, children: (model) => children?.(model) }) }));
};
//# sourceMappingURL=SuspenseModel.js.map