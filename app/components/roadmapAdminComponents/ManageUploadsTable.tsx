"use client"

import { Button } from "@/app/components/ui/button"

const roadmapData = [
    {
        id: 1,
        thumbnail: "/roadmapAdminImages/roadmapImage.png",
        title: "New Product Launch",
        status: ["completed", "draft"],
        date: "2023-10-05",
    },
    {
        id: 2,
        thumbnail: "/roadmapAdminImages/roadmapImage.png",
        title: "Marketing Strategy 2023",
        status: ["in-progress", "review"],
        date: "2023-10-10",
    },
    {
        id: 3,
        thumbnail: "/roadmapAdminImages/roadmapImage.png",
        title: "Annual Budget Plan",
        status: ["completed", "finalized"],
        date: "2023-10-15",
    },
]

export default function ManageUploadsTable() {
    return (
        <div className="p-4 sm:p-8  flex justify-center items-center ">
            <div className="w-full max-w-4xl bg-white p-4 sm:p-6 rounded-lg shadow-lg">
                <h1 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Manage Uploads Table</h1>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-left text-sm sm:text-base">
                                <th className="p-2 sm:p-3">Thumbnail</th>
                                <th className="p-2 sm:p-3">Roadmap to Success</th>
                                <th className="p-2 sm:p-3">Status</th>
                                <th className="p-2 sm:p-3">Date</th>
                                <th className="p-2 sm:p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roadmapData.map((item) => (
                                <tr key={item.id} className="border-b text-sm sm:text-base">
                                    <td className="p-2 sm:p-3">
                                        <img src={item.thumbnail} alt="Thumbnail" className="w-12 sm:w-16 h-12 sm:h-16 rounded-md object-cover" />
                                    </td>
                                    <td className="p-2 sm:p-3">{item.title}</td>
                                    <td className="p-2 sm:p-3 flex flex-wrap gap-1 sm:gap-2">
                                        {item.status.map((status, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 text-xs sm:text-sm font-medium rounded-full bg-gray-200"
                                            >
                                                {status}
                                            </span>
                                        ))}
                                    </td>
                                    <td className="p-2 sm:p-3">{item.date}</td>
                                    <td className="p-2 sm:p-3">
                                        <Button className="w-28 sm:w-32 h-9 bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded-md">
                                            {item.title.includes("Marketing") ? "Edit" : "Delete"}
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
