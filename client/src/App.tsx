// import LoginPage from './components/LoginPage'
import SecurityScannerExtension from './components/SecurityScannerExtension';
import Landing from './components/Landing';
import GitData from './components/GitData';
import { AuthProvider } from './components/AuthContext';
import { Toaster } from "@/components/ui/toaster";

function App() {

  return (
    <AuthProvider>
      <>
        
        <Landing/>
        {/* <LoginPage /> */}
        <Toaster />
      </>
    </AuthProvider>
  );
}

export default App;