import { useNavigate } from "react-router-dom";
import { getConnection } from "../tools/connections.ts";
import Header from "../components/Header.tsx";
import type {CreateEmployeeDto} from "../infrastructure/dto/employee/create.employee.dto.ts";
import React, {useEffect, useState} from "react";
import type {CompanyResDto} from "../infrastructure/dto/company/company.res.dto.ts";

const CreateEmployee = () => {
    const [employee, setEmployee] = useState<CreateEmployeeDto>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        companies: []
    });
    const [companies, setCompanies] = useState<CompanyResDto[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const { client } = getConnection();
        client.company.getAll().then(res => {
            if (res.type === "SUCCESS") {
                setCompanies(res.result);
            }
        })
    }, [])

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!employee) return;
        const { client } = getConnection();
        client.employee.create(employee).then(res => {
            if (res.type === "SUCCESS") {
                navigate(`/employees/${res.result.id}`);
            } else {
                console.error(res);
            }
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEmployee(prev => ({
            ...prev,
            [name]: value,
        }));
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

    return (
        <>
            <Header/>
            <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Create Company</h1>
                <form onSubmit={handleCreate}>
                    <input
                        name="firstName"
                        placeholder="First name"
                        value={employee.firstName ?? ""}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
                    /><input
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
                        Create
                    </button>
                </form>
            </div>
        </>
    );
};

export default CreateEmployee;
