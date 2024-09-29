import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormSection from '../../components/FormSection';
import ResumePreview from '../../components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from './../../../../../service/GlobalApi';

function EditResume() {
    const { resumeId } = useParams();
    const [resumeInfo, setResumeInfo] = useState(null);  // Initial state as null
    const [loading, setLoading] = useState(true);  // To handle loading state
    const [error, setError] = useState(null);  // To handle any errors

    useEffect(() => {
        GetResumeInfo();
    }, [resumeId]);  // Added dependency on resumeId

    const GetResumeInfo = async () => {
        try {
            const resp = await GlobalApi.GetResumeById(resumeId);
            setResumeInfo(resp.data.data);
        } catch (err) {
            setError('Failed to fetch resume data');  // Handle API error
        } finally {
            setLoading(false);  // Always set loading to false after fetch attempt
        }
    };

    if (loading) return <p>Loading...</p>;  // Display a loading message while fetching data

    if (error) return <p>{error}</p>;  // Display an error message if fetching failed

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
                {/* Form Section */}
                <FormSection />
                {/* Preview Section */}
                {resumeInfo && <ResumePreview />}  {/* Render ResumePreview only if resumeInfo is available */}
            </div>
        </ResumeInfoContext.Provider>
    );
}

export default EditResume;

// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import FormSection from '../../components/FormSection';
// import ResumePreview from '../../components/ResumePreview';
// import { ResumeInfoContext } from '@/context/ResumeInfoContext';
// import dummy from '@/data/dummy';
// import GlobalApi from './../../../../../service/GlobalApi';

// function EditResume() {
//     const {resumeId}=useParams();
//     const [resumeInfo,setResumeInfo]=useState(null);
//     useEffect(()=>{
       
//         GetResumeInfo();
//     },[])


//     const GetResumeInfo=()=>{
//         GlobalApi.GetResumeById(resumeId).then(resp=>{
//           console.log(resp.data.data);
//           setResumeInfo(resp.data.data);
//         })
//     }

//   return (
//     <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
//     <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
//         {/* Form Section  */}
//           <FormSection/>
//         {/* Preview Section  */}
//          <ResumePreview/>
//     </div>
//     </ResumeInfoContext.Provider>
//   )
// }

// export default EditResume