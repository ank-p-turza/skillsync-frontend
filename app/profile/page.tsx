'use client';
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Profile {
    id: string;
    name: string;
    email: string;
    phone: string;
    gender: string;
    imageUrl: string;
    is_verified: boolean;
    bio: string | null;
    specilization: string | null;
    birth_date: string | null;
    role: string;
}

async function getProfileDetails() {
    try {
        const response = await axios.get('/api/learner/profile');
        if (!response) {
            return null;
        }
        else if (response.status === 400 || response.status === 404) {
            return "Profile not found";
        }
        return response.data;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

export default function ProfilePage() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const result = await getProfileDetails();
            setProfile(result);
            setLoading(false);
        };
        fetchProfile();
    }, []);
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!profile) {
        return (
            <div className="w-full flex justify-center" style={{marginTop: "150px"}}>
                <div className="max-w-md p-6">
                    <h1 className="text-3xl font-bold text-red-600">
                        Profile not found
                    </h1>
                </div>
            </div>
        );
    }

    function getPlaceholderImage(name: string) {
        const encodedName = encodeURIComponent(name);
        return `https://placehold.co/400x220?text=${encodedName}`;
    }

    return (
        <div className="w-full flex justify-center bg-amber-50" style={{marginTop: "80px", marginBottom: "0px", paddingTop:"30px", paddingBottom:"50px"}}>
            <div className="child-div m-[20px] max-w-full flex-column rounded-2xl bg-amber-100" style={{padding:"20px"}}>
                <Image
                    src={getPlaceholderImage(profile.name)}
                    alt={profile.name}
                    width={400}
                    height={220}
                    className="course-img"
                    unoptimized
                />
                <div className="max-w-[365px] p-6 ali text-center" style={{margin : "20px"}}>
                    <h1 className="text-3xl font-bold">
                        {profile.name}
                    </h1>
                    <div style={{marginTop : "20px"}}>
                        <h5 className="text-xl font-bold">Email: {profile.email}</h5>
                        <h5 className="text-xl font-bold">Phone: {profile.phone}</h5>
                        <h5 className="text-xl font-bold">Gender: {profile.gender===null? 'male' : ''}</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}