import React, { useState } from "react";
import Image from "next/image";

export default function UploadCv() {
    const [fileName, setFileName] = useState("");
    const [fileUrl, setFileUrl] = useState("");

    const upload = () => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = ".pdf,.doc,.docx";

        fileInput.onchange = (event) => {
            const target = event.target as HTMLInputElement | null;
            const file = target?.files?.[0];

            if (file) {
                setFileName(file.name);
                
                const url = URL.createObjectURL(file);
                setFileUrl(url);
            }
        };

        fileInput.click();
    };

    const removeFile = () => {
        setFileName("");
        setFileUrl("");
    };

    return (
        <div className="h-auto sm:mt-5 ml-6 xl:mt-[-5%] xl:ml-20 w-[90%] bg-[#e6f6ec] rounded-lg p-4">
            <div className="header flex flex-col sm:flex-row sm:h-10 items-center gap-2 sm:gap-0">
                <h1 className="font-semibold text-lg sm:text-xl ml-0 sm:ml-5 text-center sm:text-left">CV/Resume Management</h1>
                <button 
                    className="bg-[#01a768] p-2 w-full sm:w-40 sm:ml-auto sm:mr-5 rounded-lg text-white" 
                    onClick={upload}
                >
                   &uarr; Upload your CV
                </button>
            </div>

            <div className="cv h-auto sm:h-16 w-full sm:w-[95%] mx-auto sm:ml-5 mt-5 border border-black flex flex-col sm:flex-row items-center gap-3 p-2">
                {fileName ? (
                    <>
                        <Image src="/images2/pdf.png" height={30} width={30} alt="file icon" />
                        <span className="text-lg text-center sm:text-left">{fileName}</span>

                        {fileUrl && fileName.endsWith(".pdf") && (
                            <a 
                                href={fileUrl} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="text-white rounded-lg text-sm"
                            >
                                <Image src="/images2/view.png" className="sm:absolute sm:right-48 " alt="" height={25} width={25}/>
                            </a>
                        )}

                        <button 
                            onClick={removeFile} 
                            className="text-white px-3 py-1 rounded-lg text-sm"
                        >
                            <Image src="/images2/trash.png" className="sm:absolute sm:right-40 mt-[-0.2%]" alt="" height={25} width={25}/>
                        </button>
                    </>
                ) : (
                    <span className="text-gray-500 text-center">No file selected</span>
                )}
            </div>
        </div>
    );
}