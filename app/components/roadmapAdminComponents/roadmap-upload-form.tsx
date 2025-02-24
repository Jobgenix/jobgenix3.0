// "use client"

// import { useState } from "react"
// import { Button } from "@/app/components/ui/button"
// import { Input } from "@/app/components/ui/input"
// import { Textarea } from "@/app/components/ui/textarea"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"


// export default function RoadmapUploadForm() {
//     const [title, setTitle] = useState("")
//     const [description, setDescription] = useState("")

//     const handleUploadPDF = () => {
//         console.log("Uploading PDF...")
//     }

//     const handleUploadThumbnail = () => {
//         console.log("Uploading thumbnail...")
//     }

//     return (
//         <div className="flex justify-center items-center p-6 sm:p-12 w-screen  ">
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
//                         <div className="space-y-2 flex flex-col   ">
//                             <Button className="w-full sm:w-1/2 bg-[#00693E] hover:bg-[#00693E]/90" onClick={handleUploadPDF}>
//                                 Upload Roadmap PDF
//                             </Button>
                            
//                             <Button className="w-full sm:w-1/2 bg-[#00693E] hover:bg-[#00693E]/90" onClick={handleUploadThumbnail}>
//                                 Upload Thumbnail
//                             </Button>
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

"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Textarea } from "@/app/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"

export default function RoadmapUploadForm() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [pdfFile, setPdfFile] = useState<File | null>(null)
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
        const file = event.target.files?.[0] || null;
        setFile(file);
        if (file) {
            console.log("Selected file:", file.name);
        }
    }

    return (
        <div className="flex justify-center items-center p-6 sm:p-12 w-screen">
            <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-xl font-semibold mb-6 text-center">Roadmap Upload Form</h1>

                <div className="space-y-6 w-full sm:w-4/5 mx-auto">
                    {/* Steps indicator */}
                    <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-8 mb-6">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                            <span className="text-sm font-medium">Step 1: Title & Description</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-muted"></div>
                            <span className="text-sm text-muted-foreground">Step 2: File Upload</span>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="space-y-4">
                        <div>
                            <Input 
                                placeholder="Title" 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)} 
                                className="w-full"
                            />
                        </div>
                        <div>
                            <Textarea
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="min-h-[100px] w-full"
                            />
                        </div>
                        <div className="space-y-2 flex flex-col">
                            <input 
                                type="file" 
                                accept="application/pdf" 
                                onChange={(e) => handleFileChange(e, setPdfFile)}
                                className="hidden"
                                id="pdf-upload"
                            />
                            <label htmlFor="pdf-upload" className="w-full sm:w-1/2 bg-[#00693E] hover:bg-[#00693E]/90 text-white px-4 py-2 rounded-md cursor-pointer text-center">
                                {pdfFile ? `Selected: ${pdfFile.name}` : "Upload Roadmap PDF"}
                            </label>
                            
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={(e) => handleFileChange(e, setThumbnailFile)}
                                className="hidden"
                                id="thumbnail-upload"
                            />
                            <label htmlFor="thumbnail-upload" className="w-full sm:w-1/2 bg-[#00693E] hover:bg-[#00693E]/90 text-white px-4 py-2 rounded-md cursor-pointer text-center">
                                {thumbnailFile ? `Selected: ${thumbnailFile.name}` : "Upload Thumbnail"}
                            </label>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="mt-8 overflow-x-auto">
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Roadmap Title</TableHead>
                                    <TableHead>Upload Date</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Project Alpha</TableCell>
                                    <TableCell>2023-10-01</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outline"
                                            className="text-[#00693E] border-[#00693E] hover:bg-[#00693E] hover:text-white"
                                        >
                                            View Details
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}