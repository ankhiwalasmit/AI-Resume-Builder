import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../service/GlobalApi'

function ViewResume() {

    const [resumeInfo, setResumeInfo] = useState();
    const [documentId, setDocumentId] = useState(null);
    const { resumeId } = useParams(); // Assuming resumeId is passed in the URL

    useEffect(() => {
        GetResumeInfo();
    }, [])

    const GetResumeInfo = () => {
        GlobalApi.GetResumeById(resumeId).then(resp => {
            const data = resp.data.data;
            console.log(data);
            setResumeInfo(data);
            setDocumentId(data.documentId); // Assuming documentId is part of the resume data from Strapi
        })
    }

    const HandleDownload = () => {
        window.print();
    }

    const HandleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: resumeInfo?.firstName + " " + resumeInfo?.lastName + " resume",
                text: "Hello Everyone, This is my resume. Please open the URL to see it.",
                url: `${import.meta.env.VITE_BASE_URL}/my-resume/${documentId}/view`, // Using documentId here
            })
            .then(() => console.log('Shared successfully!'))
            .catch(error => console.log('Error sharing:', error));
        } else {
            alert('Web Share API is not supported in your browser.');
        }
    }

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }} >
            <div id="no-print">
                <Header />

                <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                    <h2 className='text-center text-2xl font-medium'>
                        Congrats! Your Ultimate AI-generated Resume is ready!
                    </h2>
                    <p className='text-center text-gray-400'>
                        Now you are ready to download your resume and you can share the unique resume URL with your friends and family.
                    </p>
                    <div className='flex justify-between px-44 my-10'>
                        <Button onClick={HandleDownload}>Download</Button>
                        <Button onClick={HandleShare} disabled={!documentId}>Share</Button>
                    </div>
                </div>
            </div>
            <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                <div id="print-area">
                    <ResumePreview />
                </div>
            </div>
        </ResumeInfoContext.Provider>
    )
}

export default ViewResume
