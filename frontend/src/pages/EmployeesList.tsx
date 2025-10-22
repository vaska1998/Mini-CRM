import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Header from "../components/Header.tsx";
import Pagination from "../components/Pagination.tsx";
import type {EmployeeDto} from "../infrastructure/dto/employee/employee.dto.ts";
import {getConnection} from "../tools/connections.ts";
import type {CompanyResDto} from "../infrastructure/dto/company/company.res.dto.ts";

const EmployeesList = () => {
    const [employees, setEmployees] = useState<EmployeeDto[]>([]);
    const [companies, setCompanies] = useState<CompanyResDto[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<string>('');
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [total, setTotal] = useState(0);
    const limit = 10;
    const navigate = useNavigate();

    useEffect(() => {
        const {client} = getConnection();
        client.company.getAll().then(res => {
            if (res.type === 'SUCCESS') {
                setCompanies(res.result)
            } else {
                console.error(res);
            }
        })
    }, []);

    useEffect(() => {
        const {client} = getConnection();
        client.employee.getEmployeesByFilter(search, selectedCompany, page, limit).then(res => {
            if (res.type === 'SUCCESS') {
                setEmployees(res.result.data)
                setTotal(res.result.total)
            } else {
                console.error(res);
            }
        })

    }, [search, page, limit, selectedCompany]);

    const deleteEmployee = (id: string) => {
        const {client} = getConnection();
        client.employee.delete(id).then(res => {
            if (res.type === 'SUCCESS') {
                setEmployees(employees.filter(employee => employee.id !== id))
            } else {
                console.error(res);
            }
        })
    }

    return(
        <div className="min-h-screen bg-gray-100">
            <Header/>
            <div className="p-6 max-w-5xl mx-auto bg-white shadow rounded mt-6">
                <div className="flex justify-between items-center mb-4">
                    <input
                        type="text"
                        placeholder="Search employees..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border rounded px-3 py-2 w-1/3"
                    />
                    <select
                        value={selectedCompany}
                        onChange={(e) => setSelectedCompany(e.target.value)}
                        className="border rounded px-3 py-2"
                    >
                        <option value="">All Companies</option>
                        {companies.map((com) => (
                            <option key={com.id} value={com.id}>
                                {com.name}
                            </option>
                        ))}
                    </select>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer" onClick={() => navigate('/employees/create')}>+ Add Employee</button>
                </div>
                <table className="w-full border border-gray-200 text-left">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="p-2 border-b">#</th>
                        <th className="p-2 border-b">Name</th>
                        <th className="p-2 border-b">Email</th>
                        <th className="p-2 border-b">Phone</th>
                        <th className="p-2 border-b">Companies Id</th>
                        <th className="p-2 border-b">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employees.map((employee, i) => (
                        <tr key={employee.id} className="hover:bg-gray-50">
                            <td className="p-2 border-b">{(page - 1) * limit + i + 1}</td>
                            <td className="p-2 border-b">{employee.firstName + ' ' + employee.lastName}</td>
                            <td className="p-2 border-b">{employee.email}</td>
                            <td className="p-2 border-b">{employee.phone}</td>
                            <td className="p-2 border-b">{employee.companies.map((company, index) => (
                                <p key={index}>{company}</p>
                            ))}</td>
                            <td className="p-2 border-b">
                                <button className="text-blue-500 mr-2 cursor-pointer" onClick={() => navigate(`${employee.id}`)}>Edit</button>
                                <button className="text-red-500 cursor-pointer" onClick={() => deleteEmployee(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Pagination page={page} total={total} limit={limit} onPageChange={setPage} />
            </div>
        </div>
        )

};
export default EmployeesList;
