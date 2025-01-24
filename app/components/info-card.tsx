import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Lightbulb } from "lucide-react";

export function Infocard(){
    return (
        <Card className="bg-green-100 border-none">
            <CardHeader className="flex flex-row items-start space-x-2">
              <Lightbulb className="h-6 w-6 text-green-600" />
              <div>
                <h3 className="font-semibold">Guidelines</h3>
                <p className="text-sm text-muted-foreground">
                  Adhere to these guidelines for quicker approval:
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  • Choose a suitable role from the suggestions to automatically
                  fill in other fields.
                </li>
                <li className="flex items-start gap-2">
                  • Clearly define the minimum requirements to receive relevant
                  applications.
                </li>
                <li className="flex items-start gap-2">
                  • Avoid matching applicants based on caste, religion, or other
                  discriminatory factors.
                </li>
                <li className="flex items-start gap-2">
                  • Do not charge any application fees.
                </li>
              </ul>
            </CardContent>
          </Card>
    )
}