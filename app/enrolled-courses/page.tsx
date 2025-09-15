'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Enrollment {
    id: string;
    enrolled_at: string;
    courseId: string;
    learnerId: string;
    created_at: string;
    updated_at: string;
}

interface Course {
    id: string;
    title: string;
    description: string;
    price: number;
    instructor: {
        id: string;
        name: string;
    };
}

interface EnrolledCourse extends Enrollment {
    course: Course;
}

export default function EnrolledCourses() {
    const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            try {
                const enrollmentsResponse = await axios.get('/api/enrollments/my-enrollments');

                const enrollments: Enrollment[] = enrollmentsResponse.data;

                const coursesWithDetails = await Promise.all(
                    enrollments.map(async (enrollment) => {
                        try {
                            const courseResponse = await axios.get(
                                `/api/courses/${enrollment.courseId}`
                            );
                            return {
                                ...enrollment,
                                course: courseResponse.data
                            };
                        } catch (courseError) {
                            console.error(`Failed to fetch course ${enrollment.courseId}:`, courseError);
                            return null;
                        }
                    })
                );

                // Filter out any failed course fetches
                const validCourses = coursesWithDetails.filter(course => course !== null) as EnrolledCourse[];
                setEnrolledCourses(validCourses);
            } catch (error: any) {
                console.error('Failed to fetch enrolled courses:', error);
                setError('Failed to load enrolled courses');
            } finally {
                setLoading(false);
            }
        };

        fetchEnrolledCourses();
    }, []);

    if (loading) {
        return (
            <div className="w-full flex justify-center" style={{ marginTop: "150px" }}>
                <div className="max-w-md p-6">
                    <h1 className="text-2xl font-bold text-gray-600">
                        Loading your enrolled courses...
                    </h1>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full flex justify-center" style={{ marginTop: "150px" }}>
                <div className="max-w-md p-6">
                    <h1 className="text-3xl font-bold text-red-600">
                        {error}
                    </h1>
                </div>
            </div>
        );
    }

    if (enrolledCourses.length === 0) {
        return (
            <div className="w-full flex justify-center" style={{ marginTop: "150px" }}>
                <div className="max-w-md p-6 text-center">
                    <h1 className="text-3xl font-bold text-gray-600 mb-4">
                        No Enrolled Courses
                    </h1>
                    <p className="text-gray-500 mb-4">
                        You haven't enrolled in any courses yet.
                    </p>
                    <Link 
                        href="/courses" 
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                        Browse Courses
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4" style={{ marginTop: "100px", marginBottom: "50px" }}>
            <h1 className="text-4xl font-bold text-center mb-8">My Enrolled Courses</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((enrolledCourse) => (
                    <div 
                        key={enrolledCourse.id} 
                        className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                    >
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">
                                {enrolledCourse.course.title}
                            </h3>
                            <p className="text-gray-600 mb-4 line-clamp-3">
                                {enrolledCourse.course.description}
                            </p>
                            <div className="mb-4">
                                <p className="text-sm text-gray-500">
                                    <strong>Instructor:</strong> {enrolledCourse.course.instructor.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    <strong>Enrolled:</strong> {new Date(enrolledCourse.enrolled_at).toLocaleDateString()}
                                </p>
                            </div>
                            <Link 
                                href={`/courses/${enrolledCourse.courseId}`}
                                className="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-2 px-4 rounded-lg transition-colors"
                            >
                                Continue Learning
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}