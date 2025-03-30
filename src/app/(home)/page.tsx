"use client"
import React from 'react'
import { Navbar } from './navbar';
import { TamplateGallery } from './template-gallery';
import { usePaginatedQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import { DocumentsTable } from './documents-table';

interface Document {
  _id: Id<"documents">;
  _creationTime: number;
  title: string;
}

const Home = () => {
  //  if i want to add more arguments thats why 
  // i mention below {} mt object its mendetory
  const { results, status, loadMore } = usePaginatedQuery(api.documents.get, {}, { initialNumItems: 5 });

  return (
    <div className='min-h-screen flex flex-col '>
      <div className='fixed top-0 left-0 right-0 z-10 h-16 bg-white'>
        <Navbar />
      </div>

      <div className='mt-16'>
        <TamplateGallery />


        <DocumentsTable
          documents={results}
          loadMore={loadMore}
          status={status}
        />

      
      </div>
    </div>
  )
}

export default Home;