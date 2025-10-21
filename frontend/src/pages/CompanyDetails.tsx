import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getConnection } from "../tools/connections.ts";
import type { CompanyResDto } from "../infrastructure/dto/company/company.res.dto.ts";
import CompanyForm from "../components/companyForm.tsx";
import Header from "../components/Header.tsx";
import type {LogoDto} from "../infrastructure/dto/company/logo.dto.ts";

const CompanyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [company, setCompany] = useState<CompanyResDto | null>(null);
    const [logo, setLogo] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const bufferToDataURL = (logo: LogoDto) => {
        if (logo.mimeType === 'image/svg+xml') {
            return `data:${logo.mimeType};base64,${logo.data}`;
        }

        return `data:${logo.mimeType};base64,${logo.data}`;
    }

    useEffect(() => {
        const { client } = getConnection();
        client.company.getCompany(id!).then(res => {
            if (res.type === "SUCCESS") {
                setCompany(res.result);
            } else {
                navigate("/companies");
            }
        });
        client.company.getLogo(id!).then(res => {
            if (res.type === "SUCCESS") {
                const src = bufferToDataURL(res.result);
                setLogo(src)
            }
        });
    }, [id]);

    if (!company) return <div className="text-center mt-10">Loading company...</div>;

    return (
        <>
            <Header/>
            <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">Company Details</h1>
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
                    <CompanyForm
                        initialData={{ ...company }}
                        onSubmit={(data) => {
                            const { client } = getConnection();
                            client.company.update(id!, data).then(res => {
                                if (res.type === "SUCCESS") {
                                    setCompany(res.result);
                                    setIsEditing(false);
                                } else {
                                    console.error(res);
                                }
                            });
                        }}
                        logo={logo}
                        submitText="Save"
                    />
                ) : (
                    <div className="space-y-3">
                        <p>
                            <strong className="text-gray-700">Name:</strong> {company.name}
                        </p>
                        <p>
                            <strong className="text-gray-700">Email:</strong> {company.email || "-"}
                        </p>
                        <p>
                            <strong className="text-gray-700">Website:</strong> {company.website || "-"}
                        </p>
                        {logo && (
                            <div className="mt-2">
                                <p className="text-gray-600 text-sm">Logo:</p>
                                <img src={logo} alt="Company Logo" className="w-24 h-24 object-cover rounded-md border" />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default CompanyDetails;
