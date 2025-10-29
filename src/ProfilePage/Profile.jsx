import Header from "../MainPage/Header";
import ProfileStrip from "./Components/ProfileStrip";
import ProfileCard from "./Components/ProfileCard";
import MyBioCard from "./Components/BioCard";
import ProfessionalDetailsCard from "./Components/ProfessionalDetails";
import useFetch from "../hooks/useFetch";
import { useState, useEffect } from "react";

function Profile() {
  const [editable, setEditable] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const { data: showProfileData, loading: loading1, error: error1 } = useFetch(
    `${import.meta.env.VITE_BACKEND_SERVER}/profile/showprofile`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const { data: getProfileData, loading: loading2, error: error2 } = useFetch(
    `${import.meta.env.VITE_BACKEND_SERVER}/profile/getprofile`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  useEffect(() => {
    if (showProfileData?.editable) {
      setEditable(showProfileData.editable);
    }
  }, [showProfileData]);

  useEffect(() => {
    if (!getProfileData) return;
    if (getProfileData.message === "Profile not found") {
      (async () => {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_BACKEND_SERVER}/profile/createprofile`,
            {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({}),
            }
          );
          const data = await res.json();
          setProfileData(data);
        } catch (err) {
          console.error("Error creating profile:", err);
        }
      })();
    } else {
      setProfileData(getProfileData);
    }
  }, [getProfileData]);

  if (loading1 || loading2) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Loading profile...
      </div>
    );
  }

  if (error1 || error2) {
    console.error(error1 || error2);
    return (
      <div className="text-red-500 text-center mt-10">
        Failed to load profile.
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-4">
        <Header />
        <div className="mt-3">
          <ProfileStrip name={profileData?.user?.username} email={profileData?.user?.email} chapter={profileData?.chaptername} user_id={profileData?.user?._id}/>
        </div>
        <section className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="order-1">
            <ProfileCard data={
              {
                phone: profileData?.company_phone,
                email: profileData?.company_email,
                address: profileData?.company_address,
                dob: profileData?.dob,
                wedding: profileData?.wedding_date,
                bloodGroup: profileData?.blood_group,
                motherTongue: profileData?.native_place,
                subCaste: profileData?.vagai_category,
                kuladeivam: profileData?.kuladeivam,
                gothram: profileData?.kulam_category
              }
            } editable={editable} />
          </div>
          <div className="order-2">
            <ProfessionalDetailsCard datagiven={
              {
                company: profileData?.company_name,
                website: profileData?.website,
                years: profileData?.years_in_business,
                turnover: profileData?.annual_turnover,
                services: profileData?.services || [],
                verticals: profileData?.vertical_ids || [],
                referral: profileData?.ideal_referral
              }
            } editable={editable} />
          </div>
          <div className="order-3 md:col-span-2 lg:col-span-1">
            <MyBioCard editable={editable} initialBioData={
              [
                {
                  title: "GAINS Profile",
                  content: profileData?.bio,
                  defaultOpen: true
                },
                {
                  title: "30-sec Pitch",
                  content: profileData?.elevator_pitch_30s,
                  defaultOpen: false
                },
                {
                  title: "Why SIB?",
                  content: profileData?.why_sib,
                  defaultOpen: false
                }
              ]
            } />
          </div>
        </section>
      </div>
    </main>
  );
}

export default Profile;

// 6. make the vertical search in frontend with route from backend.
// 7. change the create profile route in such a way that it should have the process of completion of the profile.
// 8. store the profile icon and cover photo in cloudinary instead of storing in backend server.
// 9. it should store the profile letters if no profile icon is uploaded.
// 10. while clicking the share icon it should copy the profile link to clipboard.
// 12. while editing it should use update route.
// 13. make the loading and error display properly
// 14. correct the editability issue for professional details.
