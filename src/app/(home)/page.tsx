"use client"
import React from 'react'
import { Navbar } from './navbar';
import { TamplateGallery } from './template-gallery';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';

interface Document {
  _id: Id<"documents">;
  _creationTime: number;
  title: string;
}

const Home = () => {
  const documents = useQuery(api.documents.get);

  if (documents === undefined) {
    return <p>Loading...</p>
  }

  return (
    <div className='min-h-screen flex flex-col '>
      <div className='fixed top-0 left-0 right-0 z-10 h-16 bg-white'>
        <Navbar />
      </div>

      <div className='mt-16'>
        <TamplateGallery />

        {documents?.map((document: Document) => {
          return (
            <div key={document._id}>
              <span>{document.title}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home;