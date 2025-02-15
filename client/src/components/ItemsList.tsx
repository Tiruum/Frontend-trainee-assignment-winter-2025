import React, { useState } from 'react';
import { ItemCard } from './ItemCard';
import Listing from '@/types/Listing';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/Pagination';

interface ItemsListProps {
  data: Listing[];
}

export const ItemsList: React.FC<ItemsListProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const nextPage = (pages: number) => {
    if (currentPage < totalPages) {
      setCurrentPage(pages);
    }
  };

  const prevPage = (pages: number) => {
    if (currentPage > 1) {
      setCurrentPage(pages);
    }
  };
  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map(item => (
          <ItemCard
            key={item.id}
            id={item.id}
            type={item.type}
            imageSrc={item.imageSrc}
            title={item.title}
            description={item.description}
            details={item.details}
            price={item.price}
            location={item.location}
          />
        ))}
      </div>

      {/* Навигация пагинации */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => prevPage(currentPage - 1)}
              isActive={currentPage > 1}
            />
          </PaginationItem>
          <PaginationItem>
            {currentPage !== 1 && (
              <PaginationLink onClick={() => prevPage(1)}>{1}</PaginationLink>
            )}
            <PaginationLink>{currentPage}</PaginationLink>
            {currentPage !== totalPages && (
              <PaginationLink onClick={() => nextPage(totalPages)}>
                {totalPages}
              </PaginationLink>
            )}
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => nextPage(currentPage + 1)}
              isActive={currentPage < totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
