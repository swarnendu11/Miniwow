import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="glass p-8 rounded-[2.5rem] border-white/5 relative group">
        <div className="absolute inset-0 bg-blue-600/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-blue-600/10 transition-all duration-700" />
        <SignIn 
          appearance={{
            elements: {
              formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-sm font-bold rounded-xl h-11",
              card: "bg-transparent shadow-none border-none",
              headerTitle: "text-white font-bold",
              headerSubtitle: "text-gray-400",
              socialButtonsBlockButton: "bg-white/5 border-white/10 hover:bg-white/10 text-white rounded-xl",
              socialButtonsBlockButtonText: "text-white font-medium",
              dividerLine: "bg-white/10",
              dividerText: "text-gray-500",
              formFieldLabel: "text-gray-400 font-bold",
              formFieldInput: "bg-white/5 border-white/10 text-white rounded-xl h-11",
              footerActionText: "text-gray-400",
              footerActionLink: "text-blue-400 hover:text-blue-300 font-bold"
            }
          }}
        />
      </div>
    </div>
  );
}
