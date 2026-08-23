import RegistrationsChart from "./RegistrationsChart";
import RecentProducts from "./RecentProducts";
import RecentUsers from "./RecentUsers";
import ContactInfoSection from "./ContactInfoSection";
import ContactMessagesSection from "./ContactMessagesSection";
import ShowcaseImagesManager from "./ShowcaseImagesManager";

export default function DashboardSections() {
  return (
    <>
      <RegistrationsChart />
      <ShowcaseImagesManager />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <RecentProducts />
        <RecentUsers />
      </div>
      <ContactInfoSection />
      <ContactMessagesSection />
    </>
  );
}
