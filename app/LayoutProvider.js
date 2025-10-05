import { Toaster } from "sonner";
import { WebProvider } from "./context/WebContext";

export default function LayOutProvider({children}) {
    return (
        <WebProvider>
        <div>
            {children}
            <Toaster position="top-right" richColors />
        </div>
        </WebProvider>
    )
}