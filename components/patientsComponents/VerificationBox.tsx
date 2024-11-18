import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "../ui/button"
import Link from "next/link"

export function VerificationBox() {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Verify Your Email</AlertTitle>
      <AlertDescription className="text-xs md:text-sm">
        Please verify your email in order to access full functionalites of the app.<Link href={'/patient/verification_status'} className="underline mr-1 text-blue-500">Verify Now</Link>
      </AlertDescription>
      
      
    </Alert>
  )
}
