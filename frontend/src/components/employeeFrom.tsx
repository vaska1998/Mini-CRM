import React, { useState } from "react";
import type {UpdateEmployeeDto} from "../infrastructure/dto/employee/update.employee.dto.ts";

interface CompanyFormProps {
    initialData: UpdateEmployeeDto;
    onSubmit: (data: UpdateEmployeeDto) => void;
    submitText?: string;
}

const EmployeeForm: React.FC<CompanyFormProps> = ({ initialData, onSubmit, submitText = "Save" }) => {
    const [employee, setEmployee] = useState<UpdateEmployeeDto>(initialData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEmployee(prev => ({ ...prev, [name]: value }));
    };

    const updateFormData = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
