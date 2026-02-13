import BuilderDetails from '@/components/builders/BuilderDetails';

export default function BuilderPage({
  params,
}: {
  params: { id: string };
}): JSX.Element {
  return <BuilderDetails params={params} />;
}
