import { products, categories } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import SubcategoryProductClient from '@/components/category/SubcategoryProductClient';

interface SubcategoryPageProps {
  params: {
    category: string;
    subcategory: string;
  };
}

export async function generateStaticParams() {
  const paths: { category: string; subcategory: string }[] = [];
  
  categories.forEach(category => {
    category.subcategories.forEach(subcategory => {
      paths.push({
        category: category.slug,
        subcategory: subcategory.slug,
      });
    });
  });
  
  return paths;
}

export default function SubcategoryPage({ params }: SubcategoryPageProps) {
  // Find the category and subcategory
  const category = categories.find(cat => cat.slug === params.category);
  const subcategory = category?.subcategories.find(sub => sub.slug === params.subcategory);
  
  if (!category || !subcategory) {
    notFound();
  }

  // Filter products by category and subcategory
  const subcategoryProducts = products.filter(product => 
    product.category.toLowerCase().replace(/\s+/g, '-') === params.category &&
    product.subcategory?.toLowerCase().replace(/\s+/g, '-') === params.subcategory
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-emerald-600">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/category/${category.slug}`} className="hover:text-emerald-600">
              {category.name}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium">{subcategory.name}</span>
          </nav>
        </div>
      </div>

      <SubcategoryProductClient 
        category={category}
        subcategory={subcategory}
        initialProducts={subcategoryProducts}
      />
    </div>
  );
}