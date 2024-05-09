"use server";
import { storePost } from '@/lib/posts';
import { redirect } from 'next/navigation';


export async function createPost(prevState, formData) {

    const title = formData.get('title');
    const image = formData.get('image');
    const content = formData.get('content');

    let errors = [];

    if (!title || title.trim().length === 0) {
        errors.push('Title is required.')
    }

    if (!image) {
        errors.push('Image is required.')

    }
    if (!content || content.trim().length === 0) {
        errors.push('Content is required.')

    }


    await storePost({
        imageUrl: '',
        title,
        content,
        userId: 1
    })

    redirect('/feed');
}