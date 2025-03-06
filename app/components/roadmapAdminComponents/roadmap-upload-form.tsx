// "use client"

// import { useState } from "react"
// import { Button } from "@/app/components/ui/button"
// import { Input } from "@/app/components/ui/input"
// import { Textarea } from "@/app/components/ui/textarea"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"

// export default function RoadmapUploadForm() {
//     const [title, setTitle] = useState("")
//     const [description, setDescription] = useState("")
//     const [pdfFile, setPdfFile] = useState<File | null>(null)
//     const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
//         const file = event.target.files?.[0] || null;
//         setFile(file);
//         if (file) {
//             console.log("Selected file:", file.name);
//         }
//     }

//     return (
//         <div className="flex justify-center items-center p-6 sm:p-12 w-screen">
//             <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
//                 <h1 className="text-xl font-semibold mb-6 text-center">Roadmap Upload Form</h1>

//                 <div className="space-y-6 w-full sm:w-4/5 mx-auto">
//                     {/* Steps indicator */}
//                     <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-8 mb-6">
//                         <div className="flex items-center gap-2">
//                             <div className="w-2 h-2 rounded-full bg-primary"></div>
//                             <span className="text-sm font-medium">Step 1: Title & Description</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                             <div className="w-2 h-2 rounded-full bg-muted"></div>
//                             <span className="text-sm text-muted-foreground">Step 2: File Upload</span>
//                         </div>
//                     </div>

//                     {/* Form */}
//                     <div className="space-y-4">
//                         <div>
//                             <Input 
//                                 placeholder="Title" 
//                                 value={title} 
//                                 onChange={(e) => setTitle(e.target.value)} 
//                                 className="w-full"
//                             />
//                         </div>
//                         <div>
//                             <Textarea
//                                 placeholder="Description"
//                                 value={description}
//                                 onChange={(e) => setDescription(e.target.value)}
//                                 className="min-h-[100px] w-full"
//                             />
//                         </div>
//                         <div className="space-y-2 flex flex-col">
//                             <input 
//                                 type="file" 
//                                 accept="application/pdf" 
//                                 onChange={(e) => handleFileChange(e, setPdfFile)}
//                                 className="hidden"
//                                 id="pdf-upload"
//                             />
//                             <label htmlFor="pdf-upload" className="w-full sm:w-1/2 bg-[#00693E] hover:bg-[#00693E]/90 text-white px-4 py-2 rounded-md cursor-pointer text-center">
//                                 {pdfFile ? `Selected: ${pdfFile.name}` : "Upload Roadmap PDF"}
//                             </label>
                            
//                             <input 
//                                 type="file" 
//                                 accept="image/*" 
//                                 onChange={(e) => handleFileChange(e, setThumbnailFile)}
//                                 className="hidden"
//                                 id="thumbnail-upload"
//                             />
//                             <label htmlFor="thumbnail-upload" className="w-full sm:w-1/2 bg-[#00693E] hover:bg-[#00693E]/90 text-white px-4 py-2 rounded-md cursor-pointer text-center">
//                                 {thumbnailFile ? `Selected: ${thumbnailFile.name}` : "Upload Thumbnail"}
//                             </label>
//                         </div>
//                     </div>

//                     {/* Table */}
//                     <div className="mt-8 overflow-x-auto">
//                         <Table className="w-full">
//                             <TableHeader>
//                                 <TableRow>
//                                     <TableHead>Roadmap Title</TableHead>
//                                     <TableHead>Upload Date</TableHead>
//                                     <TableHead>Actions</TableHead>
//                                 </TableRow>
//                             </TableHeader>
//                             <TableBody>
//                                 <TableRow>
//                                     <TableCell>Project Alpha</TableCell>
//                                     <TableCell>2023-10-01</TableCell>
//                                     <TableCell>
//                                         <Button
//                                             variant="outline"
//                                             className="text-[#00693E] border-[#00693E] hover:bg-[#00693E] hover:text-white"
//                                         >
//                                             View Details
//                                         </Button>
//                                     </TableCell>
//                                 </TableRow>
//                             </TableBody>
//                         </Table>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// "use client";

// import { useState } from "react";
// import { useRoadmap } from "@/app/context/RoadmapContext";
// import { Button } from "@/app/components/ui/button";
// import { Input } from "@/app/components/ui/input";
// import { Textarea } from "@/app/components/ui/textarea";

// export default function RoadmapUploadForm() {
//     const { addRoadmap } = useRoadmap();
//     const [title, setTitle] = useState("");
//     const [pdfFile, setPdfFile] = useState<File | null>(null);
//     const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
//         setFile(event.target.files?.[0] || null);
//     };

//     const handleUpload = () => {
//         if (title && pdfFile && thumbnailFile) {
//             addRoadmap(title, pdfFile, thumbnailFile);
//             setTitle("");
//             setPdfFile(null);
//             setThumbnailFile(null);
//         } else {
//             alert("Please fill in all fields.");
//         }
//     };

//     return (
//         <div className="flex justify-center items-center p-6 w-screen">
//             <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
//                 <h1 className="text-xl font-semibold mb-6 text-center">Upload Roadmap</h1>

//                 <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full mb-4" />
                
//                 <input type="file" accept="application/pdf" onChange={(e) => handleFileChange(e, setPdfFile)} />
//                 <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setThumbnailFile)} />
                
//                 <Button onClick={handleUpload} className="mt-4 w-full bg-green-700 text-white">Upload</Button>
//             </div>
//         </div>
//     );
// }


// "use client";

// import { useState } from "react";
// import { useRoadmap } from "@/app/context/RoadmapContext";
// import { Button } from "@/app/components/ui/button";
// import { Input } from "@/app/components/ui/input";
// import { Textarea } from "@/app/components/ui/textarea";

// export default function RoadmapUploadForm() {
//     const { addRoadmap } = useRoadmap();
//     const [step, setStep] = useState(1);
//     const [title, setTitle] = useState("");
//     const [description, setDescription] = useState("");
//     const [pdfFile, setPdfFile] = useState<File | null>(null);
//     const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
//         setFile(event.target.files?.[0] || null);
//     };

//     const handleUpload = () => {
//         if (title && description && pdfFile && thumbnailFile) {
//             addRoadmap(title, description, pdfFile, thumbnailFile);
//             setTitle("");
//             setDescription("");
//             setPdfFile(null);
//             setThumbnailFile(null);
//             setStep(1);
//         } else {
//             alert("Please fill in all fields.");
//         }
//     };

//     return (
//         <div className="flex justify-center items-center p-6 w-screen">
//             <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
//                 <h1 className="text-xl font-semibold text-center mb-4">Roadmap Upload Form</h1>

//                 <div className="flex justify-between border-b mb-6">
//                     <button
//                         className={`w-1/2 pb-2 text-center ${step === 1 ? "border-b-2 border-green-600 font-semibold text-green-700" : "text-gray-500"}`}
//                         onClick={() => setStep(1)}
//                     >
//                         Step 1: Title & Description
//                     </button>
//                     <button
//                         className={`w-1/2 pb-2 text-center ${step === 2 ? "border-b-2 border-green-600 font-semibold text-green-700" : "text-gray-500"}`}
//                         onClick={() => setStep(2)}
//                     >
//                         Step 2: File Upload
//                     </button>
//                 </div>

//                 {step === 1 && (
//                     <>
//                         <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full mb-4" />
//                         <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full mb-4" />
//                         <Button onClick={() => setStep(2)} className="w-full bg-green-700 text-white">Next</Button>
//                     </>
//                 )}

//                 {step === 2 && (
//                     <>
//                         <input type="file" accept="application/pdf" onChange={(e) => handleFileChange(e, setPdfFile)} className="mb-4 w-full border p-2" />
//                         <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setThumbnailFile)} className="mb-4 w-full border p-2" />

//                         <Button onClick={handleUpload} className="w-full bg-green-700 text-white">Upload</Button>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// }

// "use client";

// import { useState } from "react";
// import { useRoadmap } from "@/app/context/RoadmapContext";
// import { Button } from "@/app/components/ui/button";
// import { Input } from "@/app/components/ui/input";
// import { Textarea } from "@/app/components/ui/textarea";

// export default function RoadmapUploadForm() {
//     const { addRoadmap } = useRoadmap();
//     const [step, setStep] = useState(1);
//     const [title, setTitle] = useState("");
//     const [description, setDescription] = useState("");
//     const [pdfFile, setPdfFile] = useState<File | null>(null);
//     const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
//         setFile(event.target.files?.[0] || null);
//     };

//     const handleUpload = () => {
//         if (title && description && pdfFile && thumbnailFile) {
//             addRoadmap(title, description, pdfFile, thumbnailFile);
//             setTitle("");
//             setDescription("");
//             setPdfFile(null);
//             setThumbnailFile(null);
//             setStep(1);
//         } else {
//             alert("Please fill in all fields.");
//         }
//     };

//     return (
//         <div className="flex justify-center items-center p-6 w-screen">
//             <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
//                 <h1 className="text-xl font-semibold text-center mb-4">Roadmap Upload Form</h1>

//                 {/* Step Navigation */}
//                 <div className="flex justify-between border-b mb-6">
//                     <button
//                         className={`w-1/2 pb-2 text-center ${step === 1 ? "border-b-2 border-green-600 font-semibold text-green-700" : "text-gray-500"}`}
//                         onClick={() => setStep(1)}
//                     >
//                         Step 1: Title & Description
//                     </button>
//                     <button
//                         className={`w-1/2 pb-2 text-center ${step === 2 ? "border-b-2 border-green-600 font-semibold text-green-700" : "text-gray-500"}`}
//                         onClick={() => setStep(2)}
//                     >
//                         Step 2: File Upload
//                     </button>
//                 </div>

//                 {/* Step 1: Title & Description */}
//                 {step === 1 && (
//                     <>
//                         <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full mb-4" />
//                         <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full mb-4" />
//                         <Button onClick={() => setStep(2)} className="w-3/5 bg-green-700 text-white">Next</Button>
//                     </>
//                 )}

//                 {/* Step 2: File Upload */}
//                 {step === 2 && (
//                     <>
//                         {/* <label className="block text-gray-700 font-semibold mb-2">Upload Roadmap PDF</label> */}
//                         <input type="file" accept="application/pdf" onChange={(e) => handleFileChange(e, setPdfFile)} className="hidden" id="pdf-upload" />
//                         <label htmlFor="pdf-upload" className="block w-3/5 text-center bg-green-700 text-white font-semibold py-2 rounded-lg cursor-pointer mb-4">
//                             Upload Roadmap PDF
//                         </label>

//                         {/* <label className="block text-gray-700 font-semibold mb-2">Upload Thumbnail</label> */}
//                         <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setThumbnailFile)} className="hidden" id="thumbnail-upload" />
//                         <label htmlFor="thumbnail-upload" className="block w-3/5 text-center bg-green-700 text-white font-semibold py-2 rounded-lg cursor-pointer mb-4">
//                             Upload Thumbnail
//                         </label>

//                         <Button onClick={handleUpload} className="w-3/5 bg-green-700 text-white">Upload</Button>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// }

"use client";

import { useState } from "react";
import { useRoadmap } from "@/app/context/RoadmapContext";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";

export default function RoadmapUploadForm() {
    const { addRoadmap } = useRoadmap();
    const [step, setStep] = useState(1);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        setFile: React.Dispatch<React.SetStateAction<File | null>>
    ) => {
        setFile(event.target.files?.[0] || null);
    };

    const handleUpload = () => {
        if (title && description && pdfFile && thumbnailFile) {
            addRoadmap(title, description, pdfFile, thumbnailFile);
            setTitle("");
            setDescription("");
            setPdfFile(null);
            setThumbnailFile(null);
            setStep(1);
        } else {
            alert("Please fill in all fields.");
        }
    };

    return (
        <div className="flex justify-center items-center p-6 w-screen">
            <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-xl font-semibold text-center mb-4">Roadmap Upload Form</h1>

                {/* Step Navigation */}
                <div className="flex justify-between border-b mb-6">
                    <button
                        className={`w-1/2 pb-2 text-center ${
                            step === 1 ? "border-b-2 border-green-600 font-semibold text-green-700" : "text-gray-500"
                        }`}
                        onClick={() => setStep(1)}
                    >
                        Step 1: Title & Description
                    </button>
                    <button
                        className={`w-1/2 pb-2 text-center ${
                            step === 2 ? "border-b-2 border-green-600 font-semibold text-green-700" : "text-gray-500"
                        }`}
                        onClick={() => setStep(2)}
                    >
                        Step 2: File Upload
                    </button>
                </div>

                {/* Step 1: Title & Description */}
                {step === 1 && (
                    <>
                        <Input
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full mb-4"
                        />
                        <Textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full mb-4"
                        />
                        <Button onClick={() => setStep(2)} className="w-3/5 bg-green-700 text-white">
                            Next
                        </Button>
                    </>
                )}

                {/* Step 2: File Upload */}
                {step === 2 && (
                    <>
                        {/* Roadmap PDF Upload */}
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => handleFileChange(e, setPdfFile)}
                            className="hidden"
                            id="pdf-upload"
                        />
                        <label
                            htmlFor="pdf-upload"
                            className="block w-3/5 text-center bg-green-700 text-white font-semibold py-2 rounded-lg cursor-pointer mb-4"
                        >
                            {pdfFile ? pdfFile.name : "Upload Roadmap PDF"}
                        </label>

                        {/* Thumbnail Upload */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, setThumbnailFile)}
                            className="hidden"
                            id="thumbnail-upload"
                        />
                        <label
                            htmlFor="thumbnail-upload"
                            className="block w-3/5 text-center bg-green-700 text-white font-semibold py-2 rounded-lg cursor-pointer mb-4"
                        >
                            {thumbnailFile ? thumbnailFile.name : "Upload Thumbnail"}
                        </label>

                        <Button onClick={handleUpload} className="w-3/5 bg-green-700 text-white">
                            Upload
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}
