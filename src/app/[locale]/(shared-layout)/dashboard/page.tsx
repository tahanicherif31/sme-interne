import DynamicBreadcrumb from "@/components/breadcrumb";
import CardProfile from "./cardProfile";
import CardEvent from "./cardEvent";
import MeServerProvider from "@/server-providers/me-server-provider";

const DashboardPage = () => {
  return (
    <MeServerProvider>
      <main className="bg-[#F7F9FC]">
        <section className="bg-[url('/hero_dashboard.jpg')] bg-cover bg-center bg-no-repeat h-72 flex items-end justify-center pb-2">
          <h1 className="text-center text-white text-6xl font-bold mb-4">
            Dashboard
          </h1>
        </section>
        <DynamicBreadcrumb currentTab="Dashboard" />
        <section className="section-paddings px-10 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-lg p-8">
            <CardProfile />
            <CardEvent />
          </div>
        </section>
      </main>
    </MeServerProvider>
  );
};

export default DashboardPage;
