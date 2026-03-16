import AdvisorProfileClient from "./AdvisorProfileClient";

// Required for static export with dynamic routes
export function generateStaticParams() {
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
  ];
}

export default function AdvisorProfilePage({ params }: { params: { id: string } }) {
  return <AdvisorProfileClient advisorId={params.id} />;
}
