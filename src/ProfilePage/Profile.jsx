import Header from "../MainPage/Header";
import ProfileStrip from "./Components/ProfileStrip";
import ProfileCard from "./Components/ProfileCard";
import MyBioCard from "./Components/BioCard";
import ProfessionalDetailsCard from "./Components/ProfessionalDetails";

function Profile() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-4">
        <Header />
        <div className="mt-3">
          <ProfileStrip />
        </div>
        <section className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="order-1">
            <ProfileCard />
          </div>
          <div className="order-2">
            <ProfessionalDetailsCard />
          </div>
          <div className="order-3 md:col-span-2 lg:col-span-1">
            <MyBioCard />
          </div>
        </section>
      </div>
    </main>
  );
}

export default Profile;
