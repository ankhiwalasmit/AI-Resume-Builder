import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext } from 'react';
import PersonalDetailPreview from './preview/PersonalDetailPreview';
import SummeryPreview from './preview/SummeryPreview';
import ExperiencePreview from './preview/ExperiencePreview';
import EducationalPreview from './preview/EducationalPreview';
import SkillsPreview from './preview/SkillsPreview';

function ResumePreview() {
    const { resumeInfo } = useContext(ResumeInfoContext);

    if (!resumeInfo) {
        return <p>No resume data available</p>;  // Handle case when resumeInfo is not yet loaded
    }

    return (
        <div
            className='shadow-lg h-full p-14 border-t-[20px]'
            style={{
                borderColor: resumeInfo?.themeColor || '#000',  // Provide a fallback color
            }}
        >
            {/* Personal Detail */}
            <PersonalDetailPreview resumeInfo={resumeInfo} />
            {/* Summary */}
            <SummeryPreview resumeInfo={resumeInfo} />
            {/* Professional Experience */}
            {resumeInfo?.Experience?.length > 0 && <ExperiencePreview resumeInfo={resumeInfo} />}
            {/* Educational */}
            {resumeInfo?.education?.length > 0 && <EducationalPreview resumeInfo={resumeInfo} />}
            {/* Skills */}
            {resumeInfo?.skills?.length > 0 && <SkillsPreview resumeInfo={resumeInfo} />}
        </div>
    );
}

export default ResumePreview;


// import { ResumeInfoContext } from '@/context/ResumeInfoContext'
// import React, { useContext } from 'react'
// import PersonalDetailPreview from './preview/PersonalDetailPreview'
// import SummeryPreview from './preview/SummeryPreview'
// import ExperiencePreview from './preview/ExperiencePreview'
// import EducationalPreview from './preview/EducationalPreview'
// import SkillsPreview from './preview/SkillsPreview'

// function ResumePreview() {

//     const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)

//   return (
//     <div className='shadow-lg h-full p-14 border-t-[20px]'
//     style={{
//         borderColor:resumeInfo?.themeColor
//     }}>
//         {/* Personal Detail  */}
//             <PersonalDetailPreview resumeInfo={resumeInfo} />
//         {/* Summery  */}
//             <SummeryPreview resumeInfo={resumeInfo} />
//         {/* Professional Experience  */}
//            {resumeInfo?.Experience?.length>0&& <ExperiencePreview resumeInfo={resumeInfo} />}
//         {/* Educational  */}
//         {resumeInfo?.education?.length>0&&   <EducationalPreview resumeInfo={resumeInfo} />}
//         {/* Skilss  */}
//         {resumeInfo?.skills?.length>0&&    <SkillsPreview resumeInfo={resumeInfo}/>}
//     </div>
//   )
// }

// export default ResumePreview