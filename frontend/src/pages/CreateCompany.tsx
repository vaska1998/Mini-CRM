import { useNavigate } from "react-router-dom";
import { getConnection } from "../tools/connections.ts";
import CompanyForm from "../components/companyForm.tsx";
import Header from "../components/Header.tsx";

const CreateCompany = () => {
    const navigate = useNavigate();

    const handleCreate = (data: FormData) => {
        const { client } = getConnection();
        client.company.create(data).then(res => {
            if (res.type === "SUCCESS") {
                navigate(`/companies/${res.result.id}`);
            } else {
                console.error(res);
            }
        });
    };

    return (
        <>
            <Header/>
            <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Create Company</h1>
                <CompanyForm onSubmit={handleCreate} submitText="Create" />
            </div>
        </>
    );
};

export default CreateCompany;
