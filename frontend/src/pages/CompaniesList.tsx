import {useEffect, useState} from "react";
import type {CompanyResDto} from "../infrastructure/dto/company/company.res.dto.ts";
import {getConnection} from "../tools/connections.ts";
import type {StateFetchedBatch, StateNamed} from "../infrastructure/state.ts";
import type {ClientErrorResponse} from "../infrastructure/client/response.ts";
import Header from "../components/Header.tsx";
import Pagination from "../components/Pagination.tsx";
import {useNavigate} from "react-router-dom";

type State = StateFetchedBatch<CompanyResDto, ClientErrorResponse> | StateNamed<'FETCH'>;

const CompaniesList = () => {
    const [companies, setCompanies] = useState<CompanyResDto[]>([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [, setState] = useState<State>({ type: 'EMPTY'});
    const [total, setTotal] = useState(0);
    const limit = 10;
    const navigate = useNavigate();

    useEffect(() => {
        const {client} = getConnection();
        setState({
            type: 'FETCH',
        });
        client.company.getCompanies(search, '', page, limit).then(res => {
            if (res.type === 'SUCCESS') {
                setState({
                    type: "EMPTY"
                });
                setCompanies(res.result.data);
                setTotal(res.result.total);
            } else {
                setState({
                    type: 'ERROR',
                    error: res,
                });
            }
        })
    }, [search, page, limit])

    const deleteCompany = (id: string) => {
        const {client} = getConnection();
        client.company.delete(id).then(res => {
            if (res.type === 'SUCCESS') {
                setState({
                    type: "EMPTY"
                });
                setCompanies(companies.filter(c => c.id !== id));
            } else {
                setState({
                    type: 'ERROR',
                    error: res,
                })
            }
        })
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Header/>
            <div className="p-6 max-w-5xl mx-auto bg-white shadow rounded mt-6">
                <div className="flex justify-between items-center mb-4">
                    <input
                        type="text"
                        placeholder="Search companies..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border rounded px-3 py-2 w-1/3"
                    />
                    <button className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer" onClick={() => navigate('/companies/create')}>+ Add Company</button>
                </div>
                <table className="w-full border border-gray-200 text-left">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="p-2 border-b">#</th>
                        <th className="p-2 border-b">Name</th>
                        <th className="p-2 border-b">Email</th>
                        <th className="p-2 border-b">Website</th>
                        <th className="p-2 border-b">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {companies.map((c, i) => (
                        <tr key={c.id} className="hover:bg-gray-50">
                            <td className="p-2 border-b">{(page - 1) * limit + i + 1}</td>
                            <td className="p-2 border-b">{c.name}</td>
                            <td className="p-2 border-b">{c.email}</td>
                            <td className="p-2 border-b">{c.website}</td>
                            <td className="p-2 border-b">
                                <button className="text-blue-500 mr-2 cursor-pointer" onClick={() => navigate(`${c.id}`)}>Edit</button>
                                <button className="text-red-500 cursor-pointer" onClick={() => deleteCompany(c.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Pagination page={page} total={total} limit={limit} onPageChange={setPage} />
            </div>
        </div>
    )
}

export default CompaniesList;
