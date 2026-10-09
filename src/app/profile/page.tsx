"use client";

import { useDiabetesStore } from "@/lib/storage";
import { ProfileView } from "@/components/profile/ProfileView";

export default function ProfilePage() {
  const { profile, updateProfile } = useDiabetesStore();

  return (
    <div className="space-y-6">
      <ProfileView profile={profile} onUpdateProfile={updateProfile} />
    </div>
  );
}
