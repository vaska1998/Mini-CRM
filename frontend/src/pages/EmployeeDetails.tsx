import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getConnection } from "../tools/connections.ts";
import Header from "../components/Header.tsx";
import type {EmployeeDto} from "../infrastructure/dto/employee/employee.dto.ts";
import EmployeeForm from "../components/employeeFrom.tsx";

const EmployeeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState<EmployeeDto| null>(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const { client } = getConnection();
        client.employee.getEmployee(id!).then(res => {
            if (res.type === "SUCCESS") {
                setEmployee(res.result);
            } else {
                navigate("/employees");
            }
        });
    }, [id]);

    if (!employee) return <div className="text-center mt-10">Loading employee...</div>;

    return (
        <>
            <Header/>
            <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">Employee Details</h1>
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="text-blue-500 hover:underline font-medium cursor-pointer"
                        >
                            Edit
                        </button>
                    )}
                </div>

                {isEditing ? (
                    <EmployeeForm
                        initialData={{ ...employee }}
                        onSubmit={(data) => {
                            const { client } = getConnection();
                            client.employee.update(id!, data).then(res => {
                                if (res.type === "SUCCESS") {
                                    setEmployee(res.result);
                                    setIsEditing(false);
                                } else {
                                    console.error(res);
                                }
                            });
                        }}
                        submitText="Save"
                    />
                ) : (
                    <div className="space-y-3">
                        <p>
                            <strong className="text-gray-700">Name:</strong> {employee.firstName + " " + employee.lastName}
                        </p>
                        <p>
                            <strong className="text-gray-700">Email:</strong> {employee.email || "-"}
                        </p>
                        <p>
                            <strong className="text-gray-700">Phone:</strong> {employee.phone || "-"}
                        </p>
                        <p>
                            <strong className="text-gray-700">Phone:</strong> {employee.companies.map((company, index) => (
                            <p key={index}>{company}</p>
                        ))}
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};

export default EmployeeDetails;
