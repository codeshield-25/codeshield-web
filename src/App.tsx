// import LoginPage from './components/LoginPage'
import SecurityScannerExtension from './components/SecurityScannerExtension';
import { AuthProvider } from './components/AuthContext';
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <AuthProvider>
      <>
        <SecurityScannerExtension />
        {/* <LoginPage /> */}
        <Toaster />
      </>
    </AuthProvider>
  );
}

export default App;