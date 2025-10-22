import React, {useEffect, useState} from "react";
import type {UpdateEmployeeDto} from "../infrastructure/dto/employee/update.employee.dto.ts";
import {getConnection} from "../tools/connections.ts";
import type {CompanyResDto} from "../infrastructure/dto/company/company.res.dto.ts";

interface CompanyFormProps {
    initialData: UpdateEmployeeDto;
    onSubmit: (data: UpdateEmployeeDto) => void;
    submitText?: string;
}

const EmployeeForm: React.FC<CompanyFormProps> = ({ initialData, onSubmit, submitText = "Save" }) => {
    const [employee, setEmployee] = useState<UpdateEmployeeDto>(initialData);
    const [companies, setCompanies] = useState<CompanyResDto[]>([]);

    useEffect(() => {
        const { client } = getConnection();
        client.company.getAll().then(res => {
            if (res.type === "SUCCESS") {
                setCompanies(res.result);
            }
        })
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEmployee(prev => ({ ...prev, [name]: value }));
    };

    const toggleCompany = (companyId: string) => {
        setEmployee((prev) => {
            const exists = prev.companies?.includes(companyId);
            return {
                ...prev,
                companies: exists
                    ? prev.companies!.filter((id) => id !== companyId)
                    : [...(prev.companies || []), companyId],
            };
        });
    };

    const updateFormData = () => {
        onSubmit(employee);
    }
    return (
        <div className="space-y-4">
            <form onSubmit={updateFormData}>
                <input
                    name="firstName"
                    placeholder="First name"
                    value={employee.firstName ?? ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
                />
                <input
                name="lastName"
                placeholder="Last Name"
                value={employee.lastName ?? ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
                />
                <input
                    name="email"
                    placeholder="Email"
                    value={employee.email ?? ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
                />
                <input
                    name="phone"
                    placeholder="phone"
                    value={employee.phone ?? ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
                />
                <div className="mb-4">
                    <h2 className="text-lg font-medium text-gray-700 mb-2">
                        Assign Companies
                    </h2>
                    <div className="space-y-2 max-h-64 overflow-y-auto border border-gray-200 rounded-md p-3">
                        {companies.map((c) => (
                            <label
                                key={c.id}
                                className="flex items-center space-x-2 text-gray-700"
                            >
                                <input
                                    type="checkbox"
                                    checked={employee.companies?.includes(c.id) ?? false}
                                    onChange={() => toggleCompany(c.id)}
                                    className="form-checkbox h-4 w-4 text-blue-500 rounded"
                                />
                                <span>{c.name}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition-colors cursor-pointer"
                >
                    {submitText}
                </button>
            </form>

        </div>
    );
};

export default EmployeeForm;
