import BuilderDetails from '@/components/common/BuilderDetails';

export default function BuilderPage({
  params,
}: {
  params: { id: string };
}): JSX.Element {
  return <BuilderDetails params={params} />;
}
