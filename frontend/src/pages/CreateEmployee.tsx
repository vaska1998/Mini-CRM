import { useNavigate } from "react-router-dom";
import { getConnection } from "../tools/connections.ts";
import Header from "../components/Header.tsx";
import type {CreateEmployeeDto} from "../infrastructure/dto/employee/create.employee.dto.ts";
import React, {useState} from "react";

const CreateEmployee = () => {
    const [employee, setEmployee] = useState<CreateEmployeeDto>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        companies: []
    });
    const navigate = useNavigate();

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
