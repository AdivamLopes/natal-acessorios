
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

const ProductCardSkeleton = () => {
  return (
    <Card className="product-card rounded-2xl overflow-hidden shadow-lg group border-none border-tan/20">
      <CardHeader className="p-0 relative aspect-[4/5]">
        <Skeleton className="w-full h-full" />
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-1/4" />
      </CardFooter>
    </Card>
  );
};

export default ProductCardSkeleton;
