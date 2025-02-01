import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { degrees } from "@/lib/schema";

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
async function getDegrees() {
  try {
    const degreesGroupedByField = await db
      .select({
        field: degrees.field,
        degrees: sql<{ name: string; id: string }[]>`json_agg(json_build_object('name', ${degrees.name}, 'id', ${degrees.id}))`.as("degrees"),
      })
      .from(degrees)
      .groupBy(degrees.field);

    return NextResponse.json(degreesGroupedByField);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export { getDegrees as GET };
