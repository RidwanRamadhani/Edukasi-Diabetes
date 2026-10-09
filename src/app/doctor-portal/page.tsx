"use client";

import { useDiabetesStore } from "@/lib/storage";
import { DoctorReviewPanel } from "@/components/doctor-portal/DoctorReviewPanel";

export default function DoctorPortalPage() {
  const { articles, updateArticleReviewStatus } = useDiabetesStore();

  return (
    <div className="space-y-6">
      <DoctorReviewPanel
        articles={articles}
        onUpdateReviewStatus={updateArticleReviewStatus}
      />
    </div>
  );
}
