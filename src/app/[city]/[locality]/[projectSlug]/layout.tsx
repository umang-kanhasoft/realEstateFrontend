interface ProjectLayoutProps {
  children: React.ReactNode;
  params: {
    city: string;
    locality: string;
    projectSlug: string;
  };
}

export default function ProjectLayout({ children }: ProjectLayoutProps) {
  return <section>{children}</section>;
}
