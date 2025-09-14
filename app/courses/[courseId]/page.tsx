import axios from "axios";

async function getCourse(courseId:string) {
    try{
        const response = await axios.get(`http://localhost:4000/courses/${courseId}`);
        if(!response){
            return null;
        }
        else if(response.status === 400 || response.status === 404){
            return "Course nor found";
        }
        //console.log(response.data);
        return response.data;

    }
    catch(error){
        console.log(error);
    }    
}

export default async function getCourseDetails({params} :  { params : Promise<{courseId : string}>}){
    const course = await getCourse((await params).courseId);
    return(<></>);
}