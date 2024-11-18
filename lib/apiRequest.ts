import { useToast } from "@/components/ui/use-toast"
import { PostRequestProps } from "./types";



export async function makePostRequest({setLoading,
    endpoint,
    data,
    toastSuccess,
    toastError,
    reset}:PostRequestProps) {

    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        setLoading(false);
       reset();
        
      } else {
        setLoading(false);
        if (response.status === 500) {
         
        } else {
          
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  