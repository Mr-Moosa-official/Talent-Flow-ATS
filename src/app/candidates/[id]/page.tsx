import { candidates } from '@/lib/data';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/layout/header';
import { CandidateProfileClient } from './candidate-profile-client';

export default function CandidateProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const candidate = candidates.find((c) => c.id === params.id);

  if (!candidate) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader title="Candidate Profile" />
      <CandidateProfileClient candidate={candidate} />
    </div>
  );
}
