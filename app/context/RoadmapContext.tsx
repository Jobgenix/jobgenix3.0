// "use client";

// import { createContext, useContext, useState, ReactNode } from "react";

// interface Roadmap {
//     id: number;
//     title: string;
//     pdfFile: File;
//     thumbnail: File;
//     date: string;
// }

// interface RoadmapContextType {
//     roadmaps: Roadmap[];
//     addRoadmap: (title: string, pdfFile: File, thumbnail: File) => void;
//     deleteRoadmap: (id: number) => void;
//     editRoadmap: (id: number, title: string) => void;
// }

// const RoadmapContext = createContext<RoadmapContextType | undefined>(undefined);

// export const RoadmapProvider = ({ children }: { children: ReactNode }) => {
//     const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);

//     const addRoadmap = (title: string, pdfFile: File, thumbnail: File) => {
//         const newRoadmap: Roadmap = {
//             id: Date.now(),
//             title,
//             pdfFile,
//             thumbnail,
//             date: new Date().toISOString().split("T")[0], 
//         };
//         setRoadmaps((prev) => [...prev, newRoadmap]);
//     };

//     const deleteRoadmap = (id: number) => {
//         setRoadmaps((prev) => prev.filter((roadmap) => roadmap.id !== id));
//     };

//     const editRoadmap = (id: number, title: string) => {
//         setRoadmaps((prev) =>
//             prev.map((roadmap) =>
//                 roadmap.id === id ? { ...roadmap, title } : roadmap
//             )
//         );
//     };

//     return (
//         <RoadmapContext.Provider value={{ roadmaps, addRoadmap, deleteRoadmap, editRoadmap }}>
//             {children}
//         </RoadmapContext.Provider>
//     );
// };

// export const useRoadmap = () => {
//     const context = useContext(RoadmapContext);
//     if (!context) {
//         throw new Error("useRoadmap must be used within a RoadmapProvider");
//     }
//     return context;
// };


// "use client";

// import { createContext, useContext, useState, ReactNode } from "react";

// interface Roadmap {
//     id: number;
//     title: string;
//     description: string;
//     pdfFile: File;
//     thumbnail: File;
//     date: string;
// }

// interface RoadmapContextType {
//     roadmaps: Roadmap[];
//     addRoadmap: (title: string, description: string, pdfFile: File, thumbnail: File) => void;
//     deleteRoadmap: (id: number) => void;
// }

// const RoadmapContext = createContext<RoadmapContextType | undefined>(undefined);

// export const RoadmapProvider = ({ children }: { children: ReactNode }) => {
//     const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);

//     const addRoadmap = (title: string, description: string, pdfFile: File, thumbnail: File) => {
//         const newRoadmap: Roadmap = {
//             id: Date.now(),
//             title,
//             description,
//             pdfFile,
//             thumbnail,
//             date: new Date().toISOString().split("T")[0], 
//         };
//         setRoadmaps((prev) => [newRoadmap, ...prev]); // Latest roadmap appears first
//     };

//     const deleteRoadmap = (id: number) => {
//         setRoadmaps((prev) => prev.filter((roadmap) => roadmap.id !== id));
//     };

//     return (
//         <RoadmapContext.Provider value={{ roadmaps, addRoadmap, deleteRoadmap }}>
//             {children}
//         </RoadmapContext.Provider>
//     );
// };

// export const useRoadmap = () => {
//     const context = useContext(RoadmapContext);
//     if (!context) {
//         throw new Error("useRoadmap must be used within a RoadmapProvider");
//     }
//     return context;
// };

"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface Roadmap {
    id: number;
    title: string;
    description: string;
    pdfFile: File;
    thumbnail: File;
    date: string;
}

interface RoadmapContextType {
    roadmaps: Roadmap[];
    addRoadmap: (title: string, description: string, pdfFile: File, thumbnail: File) => void;
    deleteRoadmap: (id: number) => void;
    updateRoadmap: (id: number, updatedData: Partial<Roadmap>) => void; // ✅ Added update function
}

const RoadmapContext = createContext<RoadmapContextType | undefined>(undefined);

export const RoadmapProvider = ({ children }: { children: ReactNode }) => {
    const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);

    const addRoadmap = (title: string, description: string, pdfFile: File, thumbnail: File) => {
        const newRoadmap: Roadmap = {
            id: Date.now(),
            title,
            description,
            pdfFile,
            thumbnail,
            date: new Date().toISOString().split("T")[0], 
        };
        setRoadmaps((prev) => [newRoadmap, ...prev]); // Latest roadmap appears first
    };

    const deleteRoadmap = (id: number) => {
        setRoadmaps((prev) => prev.filter((roadmap) => roadmap.id !== id));
    };

    const updateRoadmap = (id: number, updatedData: Partial<Roadmap>) => {
        setRoadmaps((prev) =>
            prev.map((roadmap) =>
                roadmap.id === id ? { ...roadmap, ...updatedData } : roadmap
            )
        );
    };

    return (
        <RoadmapContext.Provider value={{ roadmaps, addRoadmap, deleteRoadmap, updateRoadmap }}>
            {children}
        </RoadmapContext.Provider>
    );
};

export const useRoadmap = () => {
    const context = useContext(RoadmapContext);
    if (!context) {
        throw new Error("useRoadmap must be used within a RoadmapProvider");
    }
    return context;
};
