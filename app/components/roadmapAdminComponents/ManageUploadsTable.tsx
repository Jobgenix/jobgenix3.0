// "use client"

// import { Button } from "@/app/components/ui/button"

// const roadmapData = [
//     {
//         id: 1,
//         thumbnail: "/roadmapAdminImages/roadmapImage.png",
//         title: "New Product Launch",
//         status: ["completed", "draft"],
//         date: "2023-10-05",
//     },
//     {
//         id: 2,
//         thumbnail: "/roadmapAdminImages/roadmapImage.png",
//         title: "Marketing Strategy 2023",
//         status: ["in-progress", "review"],
//         date: "2023-10-10",
//     },
//     {
//         id: 3,
//         thumbnail: "/roadmapAdminImages/roadmapImage.png",
//         title: "Annual Budget Plan",
//         status: ["completed", "finalized"],
//         date: "2023-10-15",
//     },
// ]

// export default function ManageUploadsTable() {
//     return (
//         <div className="p-4 sm:p-8  flex justify-center items-center ">
//             <div className="w-full max-w-4xl bg-white p-4 sm:p-6 rounded-lg shadow-lg">
//                 <h1 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Manage Uploads Table</h1>

//                 <div className="overflow-x-auto">
//                     <table className="w-full border-collapse">
//                         <thead>
//                             <tr className="bg-gray-100 text-left text-sm sm:text-base">
//                                 <th className="p-2 sm:p-3">Thumbnail</th>
//                                 <th className="p-2 sm:p-3">Roadmap to Success</th>
//                                 <th className="p-2 sm:p-3">Status</th>
//                                 <th className="p-2 sm:p-3">Date</th>
//                                 <th className="p-2 sm:p-3">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {roadmapData.map((item) => (
//                                 <tr key={item.id} className="border-b text-sm sm:text-base">
//                                     <td className="p-2 sm:p-3">
//                                         <img src={item.thumbnail} alt="Thumbnail" className="w-12 sm:w-16 h-12 sm:h-16 rounded-md object-cover" />
//                                     </td>
//                                     <td className="p-2 sm:p-3">{item.title}</td>
//                                     <td className="p-2 sm:p-3 flex flex-wrap gap-1 sm:gap-2">
//                                         {item.status.map((status, index) => (
//                                             <span
//                                                 key={index}
//                                                 className="px-2 py-1 text-xs sm:text-sm font-medium rounded-full bg-gray-200"
//                                             >
//                                                 {status}
//                                             </span>
//                                         ))}
//                                     </td>
//                                     <td className="p-2 sm:p-3">{item.date}</td>
//                                     <td className="p-2 sm:p-3">
//                                         <Button className="w-28 sm:w-32 h-9 bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded-md">
//                                             {item.title.includes("Marketing") ? "Edit" : "Delete"}
//                                         </Button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     )
// }


// "use client";

// import { useRoadmap } from "@/app/context/RoadmapContext";
// import { Button } from "@/app/components/ui/button";

// export default function ManageUploadsTable() {
//     const { roadmaps, deleteRoadmap, editRoadmap } = useRoadmap();

//     return (
//         <div className="p-6 flex justify-center items-center">
//             <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
//                 <h1 className="text-xl font-semibold mb-6 text-center">Manage Uploads</h1>

//                 {roadmaps.length === 0 ? (
//                     <p className="text-center text-gray-500">No roadmaps uploaded yet.</p>
//                 ) : (
//                     <table className="w-full border-collapse">
//                         <thead>
//                             <tr className="bg-gray-100 text-left text-sm">
//                                 <th className="p-3">Thumbnail</th>
//                                 <th className="p-3">Title</th>
//                                 <th className="p-3">Date</th>
//                                 <th className="p-3">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {roadmaps.map((roadmap) => (
//                                 <tr key={roadmap.id} className="border-b">
//                                     <td className="p-3">
//                                         <img src={URL.createObjectURL(roadmap.thumbnail)} alt="Thumbnail" className="w-12 h-12 rounded-md object-cover" />
//                                     </td>
//                                     <td className="p-3">{roadmap.title}</td>
//                                     <td className="p-3">{roadmap.date}</td>
//                                     <td className="p-3 flex gap-2">
//                                         <Button onClick={() => window.open(URL.createObjectURL(roadmap.pdfFile))}>View</Button>
//                                         <Button onClick={() => deleteRoadmap(roadmap.id)} className="bg-red-500">Delete</Button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 )}
//             </div>
//         </div>
//     );
// }

// "use client";

// import { useRoadmap } from "@/app/context/RoadmapContext";
// import { Button } from "@/app/components/ui/button";

// export default function ManageUploadsTable() {
//     const { roadmaps, deleteRoadmap } = useRoadmap();

//     return (
//         <div className="p-6 flex justify-center items-center">
//             <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
//                 <h1 className="text-xl font-semibold mb-6 text-center">Manage Uploads</h1>

//                 {roadmaps.length === 0 ? (
//                     <p className="text-center text-gray-500">No roadmaps uploaded yet.</p>
//                 ) : (
//                     <table className="w-full border-collapse">
//                         <thead>
//                             <tr className="bg-gray-100 text-left text-sm">
//                                 <th className="p-3">Thumbnail</th>
//                                 <th className="p-3">Title</th>
//                                 <th className="p-3">Date</th>
//                                 <th className="p-3">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {roadmaps.map((roadmap) => (
//                                 <tr key={roadmap.id} className="border-b">
//                                     <td className="p-3">
//                                         <img src={URL.createObjectURL(roadmap.thumbnail)} alt="Thumbnail" className="w-12 h-12 rounded-md object-cover" />
//                                     </td>
//                                     <td className="p-3">{roadmap.title}</td>
//                                     <td className="p-3">{roadmap.date}</td>
//                                     <td className="p-3 flex gap-2">
//                                         <Button onClick={() => window.open(URL.createObjectURL(roadmap.pdfFile))}>View</Button>
//                                         <Button onClick={() => deleteRoadmap(roadmap.id)} className="bg-red-500">Delete</Button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 )}
//             </div>
//         </div>
//     );
// }

// "use client";

// import { useRoadmap } from "@/app/context/RoadmapContext";
// import { Button } from "@/app/components/ui/button";

// export default function ManageUploadsTable() {
//     const { roadmaps, deleteRoadmap } = useRoadmap();

//     return (
//         <div className="p-6 flex justify-center items-center">
//             <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
//                 {/* <h1 className="text-xl font-semibold mb-6 text-center">Roadmaps</h1> */}

//                 {roadmaps.length === 0 ? (
//                     <p className="text-center text-gray-500">No roadmaps uploaded yet.</p>
//                 ) : (
//                     <table className="w-full border-collapse">
//                         <thead>
//                             <tr className="bg-gray-100 text-left text-sm">
//                                 <th className="p-3">Title</th>
//                                 <th className="p-3">Date</th>
//                                 <th className="p-3">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {roadmaps.map((roadmap) => (
//                                 <tr key={roadmap.id} className="border-b">
//                                     <td className="p-3">{roadmap.title}</td>
//                                     <td className="p-3">{roadmap.date}</td>
//                                     <td className="p-3 flex gap-2">
//                                         <Button onClick={() => window.open(URL.createObjectURL(roadmap.pdfFile))}>View</Button>
//                                         <Button onClick={() => deleteRoadmap(roadmap.id)} className="bg-red-500">Delete</Button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 )}
//             </div>
//         </div>
//     );
// }


// "use client";

// import { useRoadmap } from "@/app/context/RoadmapContext";
// import { Button } from "@/app/components/ui/button";
// import { useState } from "react";

// export default function ManageUploadsTable() {
//     const { roadmaps, deleteRoadmap, updateRoadmap } = useRoadmap();
//     const [editingId, setEditingId] = useState(null);

//     const handleFileChange = (event, roadmapId) => {
//         const file = event.target.files[0];
//         if (file) {
//             updateRoadmap(roadmapId, file);
//             setEditingId(null); // Exit edit mode after updating
//         }
//     };

//     return (
//         <div className="p-6 flex justify-center items-center">
//             <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
//                 {roadmaps.length === 0 ? (
//                     <p className="text-center text-gray-500">No roadmaps uploaded yet.</p>
//                 ) : (
//                     <table className="w-full border-collapse">
//                         <thead>
//                             <tr className="bg-gray-100 text-left text-sm">
//                                 <th className="p-3">Title</th>
//                                 <th className="p-3">Date</th>
//                                 <th className="p-3">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {roadmaps.map((roadmap) => (
//                                 <tr key={roadmap.id} className="border-b">
//                                     <td className="p-3">{roadmap.title}</td>
//                                     <td className="p-3">{roadmap.date}</td>
//                                     <td className="p-3 flex gap-2">
//                                         <Button onClick={() => window.open(URL.createObjectURL(roadmap.pdfFile))}>View</Button>
//                                         <Button onClick={() => deleteRoadmap(roadmap.id)} className="bg-red-500">Delete</Button>
//                                         {editingId === roadmap.id ? (
//                                             <input
//                                                 type="file"
//                                                 accept="application/pdf"
//                                                 onChange={(e) => handleFileChange(e, roadmap.id)}
//                                                 className="hidden"
//                                                 id={`edit-upload-${roadmap.id}`}
//                                             />
//                                         ) : (
//                                             <label
//                                                 htmlFor={`edit-upload-${roadmap.id}`}
//                                                 className="bg-blue-500 text-white px-3 py-1 rounded-md cursor-pointer"
//                                                 onClick={() => setEditingId(roadmap.id)}
//                                             >
//                                                 Edit
//                                             </label>
//                                         )}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 )}
//             </div>
//         </div>
//     );
// }

// "use client";

// import { useRoadmap } from "@/app/context/RoadmapContext";
// import { Button } from "@/app/components/ui/button";
// import { useState } from "react";

// export default function ManageUploadsTable() {
//     const { roadmaps, deleteRoadmap, updateRoadmap } = useRoadmap();
//     const [editingId, setEditingId] = useState<number | null>(null);

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, roadmapId: number) => {
//         const file = event.target.files?.[0];
//         if (file) {
//             updateRoadmap(roadmapId, { pdfFile: file });
//             setEditingId(null); // Exit edit mode
//         }
//     };

//     return (
//         <div className="p-6 flex justify-center items-center">
//             <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
//                 {roadmaps.length === 0 ? (
//                     <p className="text-center text-gray-500">No roadmaps uploaded yet.</p>
//                 ) : (
//                     <table className="w-full border-collapse">
//                         <thead>
//                             <tr className="bg-gray-100 text-left text-sm">
//                                 <th className="p-3">Title</th>
//                                 <th className="p-3">Date</th>
//                                 <th className="p-3">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {roadmaps.map((roadmap) => (
//                                 <tr key={roadmap.id} className="border-b">
//                                     <td className="p-3">{roadmap.title}</td>
//                                     <td className="p-3">{roadmap.date}</td>
//                                     <td className="p-3 flex gap-2">
//                                         <Button onClick={() => window.open(URL.createObjectURL(roadmap.pdfFile))}>
//                                             View
//                                         </Button>
//                                         <Button onClick={() => deleteRoadmap(roadmap.id)} className="bg-red-500">
//                                             Delete
//                                         </Button>
//                                         {editingId === roadmap.id ? (
//                                             <>
//                                                 <input
//                                                     type="file"
//                                                     accept="application/pdf"
//                                                     className="hidden"
//                                                     id={`file-input-${roadmap.id}`}
//                                                     onChange={(e) => handleFileChange(e, roadmap.id)}
//                                                 />
//                                                 <label
//                                                     htmlFor={`file-input-${roadmap.id}`}
//                                                     className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
//                                                 >
//                                                     Upload New File
//                                                 </label>
//                                             </>
//                                         ) : (
//                                             <Button
//                                                 onClick={() => setEditingId(roadmap.id)}
//                                                 className="bg-blue-500"
//                                             >
//                                                 Edit
//                                             </Button>
//                                         )}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 )}
//             </div>
//         </div>
//     );
// }

"use client";

import { useRoadmap } from "@/app/context/RoadmapContext";
import { Button } from "@/app/components/ui/button";
import { useState } from "react";

export default function ManageUploadsTable() {
    const { roadmaps, deleteRoadmap, updateRoadmap } = useRoadmap();
    const [editingId, setEditingId] = useState<number | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, roadmapId: number) => {
        const file = event.target.files?.[0];
        if (file) {
            updateRoadmap(roadmapId, { pdfFile: file });
            setEditingId(null); // Exit edit mode
        }
    };

    return (
        <div className="p-6 flex justify-center items-center">
            <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
                {roadmaps.length === 0 ? (
                    <p className="text-center text-gray-500">No roadmaps uploaded yet.</p>
                ) : (
                    <div className="overflow-x-auto"> {/* Added for horizontal scrolling */}
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100 text-left text-sm">
                                    <th className="p-3">Title</th>
                                    <th className="p-3">Date</th>
                                    <th className="p-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roadmaps.map((roadmap) => (
                                    <tr key={roadmap.id} className="border-b">
                                        <td className="p-3">{roadmap.title}</td>
                                        <td className="p-3">{roadmap.date}</td>
                                        <td className="p-3 flex gap-2">
                                            <Button onClick={() => window.open(URL.createObjectURL(roadmap.pdfFile))}>
                                                View
                                            </Button>
                                            <Button onClick={() => deleteRoadmap(roadmap.id)} className="bg-red-500">
                                                Delete
                                            </Button>
                                            {editingId === roadmap.id ? (
                                                <>
                                                    <input
                                                        type="file"
                                                        accept="application/pdf"
                                                        className="hidden"
                                                        id={`file-input-${roadmap.id}`}
                                                        onChange={(e) => handleFileChange(e, roadmap.id)}
                                                    />
                                                    <label
                                                        htmlFor={`file-input-${roadmap.id}`}
                                                        className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
                                                    >
                                                        Upload New File
                                                    </label>
                                                </>
                                            ) : (
                                                <Button
                                                    onClick={() => setEditingId(roadmap.id)}
                                                    className="bg-blue-500"
                                                >
                                                    Edit
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
