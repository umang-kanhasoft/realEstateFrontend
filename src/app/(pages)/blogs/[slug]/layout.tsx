interface BlogLayoutProps {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return <article>{children}</article>;
}
