import { ProductCard } from '@/components/ui/product-card';
import { Badge } from '@/components/ui/badge';
import { products, categories } from '@/lib/data';
import { notFound } from 'next/navigation';
import CategoryProductClient from '@/components/category/CategoryProductClient';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export default function CategoryPage({ params }: CategoryPageProps) {
  // Find the category
  const category = categories.find(cat => cat.slug === params.category);
  
  if (!category) {
    notFound();
  }

  // Filter products by category
  const categoryProducts = products.filter(product => 
    product.category.toLowerCase().replace(/\s+/g, '-') === params.category
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <CategoryProductClient 
        category={category}
        initialProducts={categoryProducts}
      />
    </div>
  );
}