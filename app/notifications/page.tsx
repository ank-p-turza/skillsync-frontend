export default function Notifications() {
  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h1>
          <i className="fas fa-bell"></i>{" "}
          Notifications
        </h1>
        <p>Stay updated with your learning journey</p>
      </div>

      <div className="notifications-filters">
        <button className="notifications-filter-btn active">All</button>
        <button className="notifications-filter-btn">Course Updates</button>
        <button className="notifications-filter-btn">Achievements</button>
        <button className="notifications-filter-btn">Reminders</button>
      </div>

      <div className="notifications-list">
        <div className="notification-item unread">
          <div className="notification-icon course">
            <i className="fas fa-book-open"></i>
          </div>
          <div className="notification-content">
            <h4>New lesson available in React Development</h4>
            <p>Lesson 9: "State Management with Redux" is now available</p>
            <span className="notification-time">2 hours ago</span>
          </div>
          <div className="notification-actions">
            <button className="action-btn">View</button>
            <button className="action-btn secondary">Mark as Read</button>
          </div>
        </div>

        <div className="notification-item unread">
          <div className="notification-icon achievement">
            <i className="fas fa-trophy"></i>
          </div>
          <div className="notification-content">
            <h4>Achievement Unlocked!</h4>
            <p>You've completed 5 courses this month. Keep up the great work!</p>
            <span className="notification-time">1 day ago</span>
          </div>
          <div className="notification-actions">
            <button className="action-btn">View Certificate</button>
            <button className="action-btn secondary">Mark as Read</button>
          </div>
        </div>

        <div className="notification-item">
          <div className="notification-icon reminder">
            <i className="fas fa-clock"></i>
          </div>
          <div className="notification-content">
            <h4>Study Reminder</h4>
            <p>Don't forget to continue your Advanced JavaScript course</p>
            <span className="notification-time">2 days ago</span>
          </div>
          <div className="notification-actions">
            <button className="action-btn">Continue Learning</button>
          </div>
        </div>

        <div className="notification-item">
          <div className="notification-icon course">
            <i className="fas fa-graduation-cap"></i>
          </div>
          <div className="notification-content">
            <h4>Course Completion</h4>
            <p>Congratulations! You've completed "Introduction to Web Development"</p>
            <span className="notification-time">3 days ago</span>
          </div>
          <div className="notification-actions">
            <button className="action-btn">Download Certificate</button>
          </div>
        </div>

        <div className="notification-item">
          <div className="notification-icon system">
            <i className="fas fa-info-circle"></i>
          </div>
          <div className="notification-content">
            <h4>System Update</h4>
            <p>SkillSync has been updated with new features and improvements</p>
            <span className="notification-time">1 week ago</span>
          </div>
          <div className="notification-actions">
            <button className="action-btn">Learn More</button>
          </div>
        </div>

        <div className="notification-item">
          <div className="notification-icon course">
            <i className="fas fa-star"></i>
          </div>
          <div className="notification-content">
            <h4>Course Recommendation</h4>
            <p>Based on your progress, we recommend "Advanced React Patterns"</p>
            <span className="notification-time">1 week ago</span>
          </div>
          <div className="notification-actions">
            <button className="action-btn">View Course</button>
          </div>
        </div>
      </div>

      <div className="notifications-footer">
        <button className="footer-btn">Mark All as Read</button>
        <button className="footer-btn secondary">Notification Settings</button>
      </div>
    </div>
  );
}