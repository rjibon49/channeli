import React from 'react';
import Image from "next/image";
import getPost from '@/lib/getPost';
import parse from 'html-react-parser';
import getAuthorDetails from '@/lib/getAuthorDetails';
import getCategoryDetails from '@/lib/getCategories';
import getTagDetails from '@/lib/getTagDetails';

export default async function PostDetails({ params }) {
    const { slug } = params;
    const post = await getPost(slug);
    const authorData = await getAuthorDetails(slug);
    const categoryData = await getCategoryDetails(slug);
    const tagData = await getTagDetails(slug);

    const {title, featured_image_src, content, date, categories, tags} = post[0];
    const {name, yoast_head_json} = authorData;


    const inputDate = new Date(date);

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        numberingSystem: 'beng',
        calendar: 'beng'
      };

        const formattedDate = inputDate.toLocaleString('bn-BD-u-ca-beng', options);
        const formattedDateWithoutOn = formattedDate.replace(/এ /, '');
    
    return (
        <>
            <div className='mx-auto container'>
                <main className='2xl:w-2/3 sm:w-full mx-4'>
                    <div className="">
                        <h1 className='text-white mt-5 text-5xl font-semibold leading-tight'>{title.rendered}</h1>
                        <div className='flex justify-between my-5 flex-wrap space-x-4 space-y-4'>
                            <div className='flex space-x-4 items-center flex-wrap'>
                                <Image src={yoast_head_json.og_image[0].url} alt='' width={40} height={40} quality={80} className='rounded-full' />
                                <p className='text-white'>{name}</p>
                                <span className='text-white hidden'>-</span>
                                <p>{formattedDateWithoutOn}</p>
                            </div>
                            <div className='flex space-x-3 items-center flex-wrap'>
                                {categories.map((catId) => (
                                    <li key={catId} className='list-none border border-slate-600 px-3 py-1 rounded-full'>{categoryData.find(cat => cat.id === catId)?.name}</li>
                                ))}
                            </div>
                        </div>
                        <Image src={featured_image_src} alt="" width={500} height={500} quality={80} className="postFeatureImage"/>
                        <p className='text-white mt-5 text-lg leading-8'>{parse(`${content.rendered}`)}</p>
                        <div className='flex space-x-3 mt-10'>
                            {tags.map((tagId) => (
                                <li key={tagId} className='list-none border border-slate-600 px-3 py-1 rounded-full'>{tagData.find(tag => tag.id === tagId)?.name}</li>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};