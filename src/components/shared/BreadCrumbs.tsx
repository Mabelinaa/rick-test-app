import Link from 'next/link';

const Breadcrumbs = ({ items }: { items: { name: string; href: string }[] }) => {
  
  return (
    <nav className="flex text-gray-700 text-sm mb-4" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <span className="mx-2">/</span>}
          <Link href={item.href} > {item.name} </Link>
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
