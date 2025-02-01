import { sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { degrees } from "@/lib/schema";
import { capitalizeWords } from "@/utils/stringUtility";
import { getCacheDegrees, setCacheDegrees } from "@/utils/redisDegrees";

// export async function GET(request: NextRequest) {
//     try {
//         const result = await db.query(`
//             SELECT field, json_agg(degrees) as degrees
//             FROM degrees
//             GROUP BY field
//         `);

//         return NextResponse.json(result.rows);
//     } catch (error) {
//         return NextResponse.json({ error: "Failed to fetch degrees" }, { status: 500 });
//     }
// }
async function getDegrees(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const JobUpload = searchParams.get("upload")
    if (parseInt(JobUpload!)) {
      const cacheDegrees = await getCacheDegrees(true);
      if (cacheDegrees)
        return NextResponse.json(cacheDegrees);
      const degreesGroupedByField = await db
        .select({
          field: degrees.field,
          degrees: sql<{ name: string; id: string }[]>`json_agg(json_build_object('name', ${degrees.name}, 'id', ${degrees.id}))`.as("degrees"),
        })
        .from(degrees)
        .groupBy(degrees.field);

      await setCacheDegrees(degreesGroupedByField, true);

      return NextResponse.json(degreesGroupedByField);

    }
    else {
      const cacheDegrees = await getCacheDegrees();
      if (cacheDegrees)
        return NextResponse.json(cacheDegrees);
      const degreesGroupedByField = await db
        .select({
          field: degrees.field,
          degrees: sql<{ name: string; id: string }[]>`json_agg(json_build_object('name', ${degrees.name}, 'id', ${degrees.id}))`.as("degrees"),
        })
        .from(degrees)
        .groupBy(degrees.field);

      // Transform the response to match the required format
      const formattedDegrees = degreesGroupedByField.flatMap(group =>
        group.degrees.map(degree => ({
          value: degree.id.toLowerCase(), // Convert ID to lowercase for consistency
          label: capitalizeWords(degree.name),
        }))
      );
      await setCacheDegrees(formattedDegrees);

      return NextResponse.json(formattedDegrees);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}


export { getDegrees as GET };
