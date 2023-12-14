interface PageProps {
  params: {
    profileId: string;
  };
}

export default function Page({ params }: PageProps) {
  return <h1>Profile: {params.profileId}</h1>;
}
