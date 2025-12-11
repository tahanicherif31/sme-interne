import SigninForm from "./signin-form";
import DesktopView from "../desktop-view";
import MobileView from "../mobile-view";

export default async function SigninPage() {
  return (
    <main className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Section */}
      <div className="relative hidden lg:flex lg:w-3/5">
        <DesktopView />
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden relative h-48">
        <MobileView />
      </div>

      {/* Right Form Section */}
      <div className="flex-1 lg:w-1/3 flex items-center justify-center">
        <SigninForm />
      </div>
    </main>
  );
}
