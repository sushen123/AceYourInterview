import { NextRequest, NextResponse } from 'next/server';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { dbConnect } from '@/lib/db'; // Adjust the path as needed

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_CLOUDINARY_API_SECRET,
});

// Check if Cloudinary is configured correctly
if (!cloudinary.config().cloud_name) {
  console.error("Cloudinary is not configured properly. Check your environment variables.");
}

function getStringValue(value: FormDataEntryValue | null): string {
  if (typeof value === 'string') {
    return value;
  }
  return '';
}

// Helper function to safely get boolean value from FormDataEntryValue
function getBooleanValue(value: FormDataEntryValue | null): boolean {
  return value === 'true';
}

// Helper function to safely get number value from FormDataEntryValue
function getNumberValue(value: FormDataEntryValue | null): number {
  const num = Number(value);
  return isNaN(num) ? 0 : num;
}

// Helper function to safely get comma-separated string from FormDataEntryValue
function getCommaSeparatedString(value: FormDataEntryValue | null): string {
  if (typeof value === 'string') {
    return value.split(',').map(item => item.trim()).join(',');
  }
  return '';
}

// Helper function to upload files to Cloudinary
// Helper function to upload files to Cloudinary
const getFileExtension = (filename: string): string => {
  const extension = filename.split('.').pop();
  return extension ? extension.toLowerCase() : ''; // Return an empty string if undefined
};


const getResourceType = (extension: string): string => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
  const pdfExtension = 'pdf';

  if (imageExtensions.includes(extension)) {
    return 'image';
  } else if (extension === pdfExtension) {
    return 'raw';
  } else {
    return 'auto';
  }
};

const uploadFileToCloudinary = (
  buffer: Buffer,
  originalFilename: string,
  folderName: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const extension = getFileExtension(originalFilename);
    const resourceType = getResourceType(extension);

    const sanitizedFilename = originalFilename.replace(/\.[^/.]+$/, "");
    console.log(sanitizedFilename)
    const uploadOptions = {
      resource_type: resourceType,
      folder: folderName,
      use_filename: true,
      unique_filename: true,
      format: extension === 'pdf' ? 'pdf' : undefined,
      type: 'upload',
      access_mode: 'public',

    
    };

    console.log("Upload options:", uploadOptions);
    console.log("Cloudinary config:", cloudinary.config());

    const uploadStream = cloudinary.uploader.upload_stream(
      //@ts-ignore
      uploadOptions,
      (error, result) => {
        if (error) {
          console.error("Upload error:", error);
          return reject(error);
        }
        if (result && result.public_id) {
         

          resolve(result.secure_url);
        } else {
          console.error("Upload result is undefined or missing public_id");
          reject(new Error("Upload failed"));
        }
      }
    );

    uploadStream.end(buffer);
  });
};


export async function GET(req: NextRequest) {
  try {
    const prisma = await dbConnect();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const jobProfile = await prisma.jobProfile.findMany({
      where: { userId: userId },
    });

    const user = await prisma.user.findUnique({
      where: {
          id: userId || ""
      },
      select: {
          totalJobsApplied: true,
          email: true, // Include the email field
          extensionKey: true,// Include the passkey field
          
      }
  });

    if (!jobProfile) {
      return NextResponse.json({ error: 'Job profile not found' }, { status: 404 });
    }

    return NextResponse.json({
      jobProfile: jobProfile,
      userDetails: user
    });
  } catch (error) {
    console.error('Error in GET /api/jobProfile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    const prisma = await dbConnect();

    // Handle file uploads
    const resumeFile = formData.get('resume') as File | null;
    const coverLetterFile = formData.get('coverLetter') as File | null;

    let resumeUrl = null;
    let coverLetterUrl = null;

    if (resumeFile) {
      try {
        const buffer = Buffer.from(await resumeFile.arrayBuffer());
        resumeUrl = await uploadFileToCloudinary(buffer, resumeFile.name, "resume");
       
      } catch (error) {
        console.error('Error uploading resume:', error);
        // Decide how you want to handle this error. You might want to continue
        // with the profile creation even if the file upload fails.
      }
    }

    if (coverLetterFile) {
      try {
        const buffer = Buffer.from(await coverLetterFile.arrayBuffer());
        coverLetterUrl = await uploadFileToCloudinary(buffer, coverLetterFile.name, "coverLetter");
      } catch (error) {
        console.error('Error uploading cover letter:', error);
        // Decide how you want to handle this error.
      }
    }
    console.log(getStringValue(formData.get('desiredJobTitle')))
    // Create a new JobProfile
    const newJobProfile = await prisma.jobProfile.create({
      data: {
        userId: "12134",
        fullName: getStringValue(formData.get('fullName')),
        email: "sushensame1@gmail.com",
        phone: getStringValue(formData.get('phone')),
        workAddress: getStringValue(formData.get('workAddress')),
        address: getStringValue(formData.get('address')),
        linkedIn: getStringValue(formData.get('linkedIn')),
        desiredJobTitle: getStringValue(formData.get('desiredJobTitle')),
        jobType: getStringValue(formData.get('jobType')),
        workLocation: getStringValue(formData.get('workLocation')),
        willingToRelocate: getBooleanValue(formData.get('willingToRelocate')),
        salaryRange: getStringValue(formData.get('salaryRange')),
        availability: getStringValue(formData.get('availability')),
        currentEmploymentStatus: getStringValue(formData.get('currentEmploymentStatus')),
        yearsOfExperience: getNumberValue(formData.get('yearsOfExperience')),
        highestEducation: getStringValue(formData.get('highestEducation')),
        fieldOfStudy: getStringValue(formData.get('fieldOfStudy')),
        graduationYear: getNumberValue(formData.get('graduationYear')),
        primarySkills: getCommaSeparatedString(formData.get('primarySkills')),
        languages: getCommaSeparatedString(formData.get('languages')),
        resume: resumeUrl,
        coverLetter: coverLetterUrl,
        personalStatement: getStringValue(formData.get('personalStatement')),
        heardAboutUs: getStringValue(formData.get('heardAboutUs')),
      },
    });

    // Log job activity
    await prisma.jobActivity.create({
      data: {
        jobId: newJobProfile.id,
        type: "APPLICATION",
      },
    });

    return NextResponse.json({ jobProfile: newJobProfile }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/jobProfile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();
    const jobId = getStringValue(formData.get('jobId'))
  

    if (!jobId) {
      return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
    }

    const prisma = await dbConnect();
    
    // Fetch the existing job profile
    const existingJobProfile = await prisma.jobProfile.findUnique({
      where: { id: parseInt(jobId) },
    });

    if (!existingJobProfile) {
      return NextResponse.json({ error: 'Job profile not found' }, { status: 404 });
    }

    // Prepare update data
    const updateData: any = {
      
      fullName: getStringValue(formData.get('fullName')),
      email: getStringValue(formData.get('primaryEmailAddress')),
      phone: getStringValue(formData.get('phone')),
      workAddress: getStringValue(formData.get('workAddress')),
      address: getStringValue(formData.get('address')),
      linkedIn: getStringValue(formData.get('linkedIn')),
      desiredJobTitle: getStringValue(formData.get('desiredJobTitle')),
      jobType: getStringValue(formData.get('jobType')),
      workLocation: getStringValue(formData.get('workLocation')),
      willingToRelocate: getBooleanValue(formData.get('willingToRelocate')),
      salaryRange: getStringValue(formData.get('salaryRange')),
      availability: getStringValue(formData.get('availability')),
      currentEmploymentStatus: getStringValue(formData.get('currentEmploymentStatus')),
      yearsOfExperience: getNumberValue(formData.get('yearsOfExperience')),
      highestEducation: getStringValue(formData.get('highestEducation')),
      fieldOfStudy: getStringValue(formData.get('fieldOfStudy')),
      graduationYear: getNumberValue(formData.get('graduationYear')),
      primarySkills: getCommaSeparatedString(formData.get('primarySkills')),
      languages: getCommaSeparatedString(formData.get('languages')),
      personalStatement: getStringValue(formData.get('personalStatement')),
      heardAboutUs: getStringValue(formData.get('heardAboutUs')),
    
    };

    // Handle file uploads
    const resumeFile = formData.get('resume') as File | null;
    const coverLetterFile = formData.get('coverLetter') as File | null;

    let resumeUrl = null;
    let coverLetterUrl = null;

    if (resumeFile) {
      try {
        const buffer = Buffer.from(await resumeFile.arrayBuffer());
        resumeUrl = await uploadFileToCloudinary(buffer, resumeFile.name, "resume");
      } catch (error) {
        console.error('Error uploading resume:', error);
        // Decide how you want to handle this error. You might want to continue
        // with the profile creation even if the file upload fails.
      }
    }

   

    if (coverLetterFile) {
      try {
        const buffer = Buffer.from(await coverLetterFile.arrayBuffer());
        coverLetterUrl = await uploadFileToCloudinary(buffer, coverLetterFile.name, "coverLetter");
      } catch (error) {
        console.error('Error uploading cover letter:', error);
        // Decide how you want to handle this error.
      }
    }

    // Update the JobProfile
    const updatedJobProfile = await prisma.jobProfile.update({
      where: { id: parseInt(jobId) },
      data: updateData,
    });

    return NextResponse.json({ jobProfile: updatedJobProfile }, { status: 200 });
  } catch (error) {
    console.error('Error in PUT /api/jobProfile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest) {

  const body = await req.json()
  console.log(body, "DELETE")
  const prisma =  await dbConnect()

  try {

    const jobActivity = await prisma.jobActivity.deleteMany({
      where: {
        jobId: body.id
      }
    })

    const jobProfile = await prisma.jobProfile.delete({
      where:  {
        id: body.id
      }
    })
    

    return NextResponse.json({
      message: "Deleted Successfully"
    }, {
      status: 200
    })

  } catch (error) {
    console.error("Error in DELETE jobProfile", error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }




}