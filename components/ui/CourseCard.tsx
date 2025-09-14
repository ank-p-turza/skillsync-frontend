import Link from 'next/link';
import Image from 'next/image';

interface Course {
  id: string;
  title: string;
  description: string;
  price: string;
  status: string;
  isFeatured: boolean;
  instructorId: string;
  created_at: string;
  updated_at: string;
}

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  // Function to truncate description to 3-4 words
  const getTruncatedDescription = (description: string) => {
    const words = description.split(' ');
    if (words.length <= 4) return description;
    return words.slice(0, 4).join(' ') + '...';
  };

  // Generate a placeholder image based on course title
  const getPlaceholderImage = (title: string) => {
    const encodedTitle = encodeURIComponent(title);
    return `https://placehold.co/400x220?text=${encodedTitle}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return 'new-badge';
      case 'featured':
        return 'trending-badge';
      default:
        return 'premium-badge';
    }
  };

  return (
    <Link href={`/courses/${course.id}`} className="course-card-link">
      <div className={`course-card ${course.isFeatured ? 'premium' : ''}`}>
        <div className="course-image">
          <Image
            src={getPlaceholderImage(course.title)}
            alt={course.title}
            width={400}
            height={220}
            className="course-img"
            unoptimized
          />
          
          {course.status && (
            <span className={`course-badge ${getStatusBadge(course.status)}`}>
              {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
            </span>
          )}
          
          {course.isFeatured && (
            <span className="course-badge premium-badge">
              <i className="fas fa-crown"></i>
              Featured
            </span>
          )}
          
          <button className="wishlist-btn" aria-label="Add to wishlist">
            <i className="far fa-heart"></i>
          </button>
        </div>

        <div className="course-content">
          <div className="course-header">
            <h3 className="course-title">
              {course.title}
            </h3>
            <p className="course-description">
              {getTruncatedDescription(course.description)}
            </p>
          </div>

          <div className="course-meta">
            <div className="instructor">
              <Image
                src={`https://placehold.co/32x32?text=I`}
                alt="Instructor"
                width={32}
                height={32}
                unoptimized
              />
              <span>Instructor</span>
            </div>
            <div className="course-rating">
              <span className="rating-value">4.5</span>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={`fas fa-star ${i < 4 ? 'filled' : ''}`}
                  ></i>
                ))}
              </div>
            </div>
          </div>

          <div className="course-info">
            <span><i className="fas fa-clock"></i> 8 weeks</span>
            <span><i className="fas fa-users"></i> 1.2k students</span>
          </div>

          <div className="course-footer">
            <div className="course-price">
              <span className="current-price">${course.price}</span>
            </div>
            <button className="btn btn-primary btn-sm">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}