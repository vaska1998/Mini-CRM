import React, { useState } from "react";
import type { UpdateCompanyDto } from "../infrastructure/dto/company/update.company.dto.ts";

interface CompanyFormProps {
    initialData?: UpdateCompanyDto;
    logo?: string | null;
    onSubmit: (data: FormData) => void;
    submitText?: string;
}

const CompanyForm: React.FC<CompanyFormProps> = ({ initialData = {}, logo, onSubmit, submitText = "Save" }) => {
    const [formData, setFormData] = useState<Partial<UpdateCompanyDto>>(initialData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setFormData(prev => ({ ...prev, logo: file }));
    };

    const handleSubmit = () => {
        const data = new FormData();
        if (formData.name) data.append("name", formData.name);
        if (formData.email) data.append("email", formData.email);
        if (formData.website) data.append("website", formData.website);
        if (formData.logo) data.append("logo", formData.logo);

        onSubmit(data);
    };

    return (
        <div className="space-y-4">
            <input
                name="name"
                placeholder="Company name"
                value={formData.name ?? ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
                name="email"
                placeholder="Email"
                value={formData.email ?? ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
                name="website"
                placeholder="Website"
                value={formData.website ?? ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {logo && !formData.logo && (
                <div className="mb-2">
                    <p className="text-sm text-gray-600">Current logo:</p>
                    <img
                        src={logo}
                        alt="Current Logo"
                        className="w-24 h-24 object-cover rounded-md border"
                    />
                </div>
            )}

            <div className="flex items-center gap-4">
                <div className="flex-1 p-4 border-2 border-dashed border-gray-300 rounded-md bg-gray-50 flex items-center justify-center">
                    {formData.logo ? (
                        <span>{formData.logo.name}</span>
                    ) : (
                        <span className="text-gray-400">No file selected</span>
                    )}
                </div>
                <label className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition-colors">
                    Choose File
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>
            </div>
            {formData.logo && <p className="mt-2 text-sm text-gray-600">Selected file: {formData.logo.name}</p>}

            <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition-colors cursor-pointer"
            >
                {submitText}
            </button>
        </div>
    );
};

export default CompanyForm;
