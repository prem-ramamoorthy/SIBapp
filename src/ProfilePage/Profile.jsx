import Header from "../MainPage/Header";
import ProfileStrip from "./Components/ProfileStrip";
import ProfileCard from "./Components/ProfileCard";
import MyBioCard from "./Components/BioCard";
import ProfessionalDetailsCard from "./Components/ProfessionalDetails";
import useFetch from "../hooks/useFetch";
import { useState, useEffect } from "react";

function Profile() {

  const [editable, setEditable] = useState(false);

  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_BACKEND_SERVER}/profile/showprofile`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  useEffect(() => {
    if (data && data.editable) {
      setEditable(data.editable);
    }
  }, [data]);

  if (error) {
    console.error(error);
    return <div className="text-red-500">Failed to load profile.</div>;
  }

  return (
    <main className="min-h-screen ">
      <div className="container mx-auto px-4 py-4">
        <Header />
        <div className="mt-3">
          <ProfileStrip />
        </div>
        <section className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {error ? console.log(error) : loading ? <div className="order-1">
            <ProfileCard />
          </div> : <div className="order-1">
            <ProfileCard editable={editable} />
          </div>}
          {error ? console.log(error) : loading ? <div className="order-3 md:col-span-2 lg:col-span-1">
            <MyBioCard />
          </div> : <div className="order-3 md:col-span-2 lg:col-span-1">
            <MyBioCard editable={editable} />
          </div>}
          {error ? console.log(error) : loading ? <div className="order-2">
            <ProfessionalDetailsCard />
          </div> : <div className="order-2">
            <ProfessionalDetailsCard editable={editable} />
          </div>}
        </section>
      </div>
    </main>
  );
}

export default Profile;
